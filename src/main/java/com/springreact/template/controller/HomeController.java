package com.springreact.template.controller;

import com.github.mkopylec.recaptcha.validation.RecaptchaValidator;
import com.springreact.template.db.Upload;
import com.springreact.template.db.UploadRepository;
import com.springreact.template.db.User;
import com.springreact.template.db.UserRepository;
import com.springreact.template.service.StorageService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Set;

@Controller
public class HomeController {

    public static int MAX_UPLOADS = 20;

    private final StorageService service;
    private final UserRepository userRepository;
    private final UploadRepository uploadRepository;
    private final RecaptchaValidator recaptchaValidator;

    public HomeController(UserRepository userRepository, StorageService service, UploadRepository uploadRepository, @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection") RecaptchaValidator recaptchaValidator) {
        this.userRepository = userRepository;
        this.service = service;
        this.uploadRepository = uploadRepository;
        this.recaptchaValidator = recaptchaValidator;
    }

    @GetMapping("/")
    public String index(HttpServletRequest request) {
        request.getSession().setAttribute("validated", false);
        return "index";
    }

    @ResponseBody
    @GetMapping("/user")
    public ResponseEntity<String> user(@AuthenticationPrincipal OAuth2User principal, HttpServletRequest request) {
        request.getSession().setAttribute("validated", false);

        User user = userRepository.findUserByEmail(principal.getAttribute("email"));

        HttpHeaders respHeader = new HttpHeaders();
        respHeader.set("Content-Type", "application/json");

        return ResponseEntity.ok()
                .headers(respHeader)
                .body("{" +
                        "\"id\": " + user.getId() + "," +
                        "\"email\":" + "\"" + user.getEmail() + "\"" +
                        "}"
                );
    }

    @PostMapping("/captcha")
    public ResponseEntity<String> validateCaptcha(@AuthenticationPrincipal OAuth2User principal, HttpServletRequest request) {

        HttpHeaders respHeader = new HttpHeaders();
        respHeader.set("Content-Type", "application/json");

        boolean validated = recaptchaValidator.validate(request).isSuccess();
        request.getSession().setAttribute("validated", validated);

        if(validated) {
            return ResponseEntity.ok()
                    .headers(respHeader)
                    .body("{}");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .headers(respHeader)
                    .body("{" +
                            "\"message\": " + "\"failed to validate captcha.\"" +
                            "}"
                    );
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@AuthenticationPrincipal OAuth2User principal, @RequestParam(value = "file") MultipartFile file, HttpServletRequest request) {

        // get Currently logged In User Data
        User user = userRepository.findUserByEmail(principal.getAttribute("email"));
        HttpHeaders respHeader = new HttpHeaders();
        respHeader.set("Content-Type", "application/json");

        if(user.getUploadCount() <= MAX_UPLOADS) {

            if ((boolean) request.getSession().getAttribute("validated")) {

                /// TODO: Malware Scan (v0.0.2)

                String response = service.uploadFile(file, user);

                if(response.isEmpty()) {
                    request.getSession().setAttribute("validated", false);
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .headers(respHeader)
                            .body("{" +
                                    "\"message\": " + "\"invalid file type.\"" +
                                    "}"
                            );
                } else if(!response.contains("url")) {
                    request.getSession().setAttribute("validated", false);
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .headers(respHeader)
                            .body(response);
                }

                request.getSession().setAttribute("validated", false);
                user.setUploadCount(user.getUploadCount()+1);
                userRepository.save(user);

                return ResponseEntity.ok()
                        .headers(respHeader)
                        .body(response);

            } else {
                request.getSession().setAttribute("validated", false);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .headers(respHeader)
                        .body("{" +
                                "\"message\": " + "\"failed to validate captcha.\"" +
                                "}"
                        );
            }

        } else {
            request.getSession().setAttribute("validated", false);
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .headers(respHeader)
                    .body("{" +
                            "\"message\": " + "\"You exceeded your max Uploads.\"" +
                            "}"
                    );
        }
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@AuthenticationPrincipal OAuth2User principal, @PathVariable String fileName, HttpServletRequest request) {
        request.getSession().setAttribute("validated", false);

        User user = userRepository.findUserByEmail(principal.getAttribute("email"));
        Upload upload = uploadRepository.findUploadByFileName(fileName);

        if(upload == null) {
            return ResponseEntity.notFound().build();
        }

        if(uploadRepository.getUploadByUserAndUploadId(user, upload.getId()) == null) {
            Set<Upload> downloads = user.getDownloads();
            if(!downloads.contains(upload)) {
                downloads.add(upload);
                user.setDownloads(downloads);
                userRepository.save(user);
            }
        }

        byte[] data = service.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);

        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }

    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteFile(@AuthenticationPrincipal OAuth2User principal, @PathVariable String fileName, HttpServletRequest request) {
        request.getSession().setAttribute("validated", false);

        // check if the user is the owner of the Upload
        User user = userRepository.findUserByEmail(principal.getAttribute("email"));
        Upload upload = uploadRepository.findUploadByFileName(fileName);

        if(upload == null) {
            return ResponseEntity.notFound().build();
        }

        if(uploadRepository.getUploadByUserAndUploadId(user, upload.getId()) == null) {

            HttpHeaders respHeader = new HttpHeaders();
            respHeader.set("Content-Type", "application/json");

            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .headers(respHeader)
                    .body("{" +
                            "\"message\": " + "\"You can not delete Uploads that don't belong to you.\"" +
                            "}"
                    );
        }

        // 1. delete all associations
        for(User u : userRepository.findAll()) {
            if(u.getDownloads().contains(upload)) {
                Set<Upload> downloads = u.getDownloads();
                downloads.remove(upload);
                u.setDownloads(downloads);
                userRepository.save(u);
            }
        }

        // 2. delete the user association
        Set<Upload> uploads = user.getUploads();
        uploads.remove(upload);
        user.setUploads(uploads);
        user.setUploadCount(Math.max(user.getUploadCount() - 1, 0));
        userRepository.save(user);

        // 3. delete the upload database entry
        uploadRepository.delete(upload);

        // 4. delete it inside the bucket
        return new ResponseEntity<>(service.deleteFile(fileName), HttpStatus.OK);
    }
}