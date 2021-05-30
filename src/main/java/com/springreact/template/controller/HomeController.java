package com.springreact.template.controller;

import com.github.mkopylec.recaptcha.validation.RecaptchaValidator;
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
import java.util.Collections;
import java.util.Map;

@Controller
public class HomeController {

    public static int MAX_UPLOADS = 20;

    private final StorageService service;
    private final UserRepository userRepository;
    private final RecaptchaValidator recaptchaValidator;

    public HomeController(UserRepository userRepository, StorageService service, @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection") RecaptchaValidator recaptchaValidator) {
        this.userRepository = userRepository;
        this.service = service;
        this.recaptchaValidator = recaptchaValidator;
    }

    @GetMapping("/")
    public String index(HttpServletRequest request) {
        request.getSession().setAttribute("validated", false);
        return "index";
    }

    @ResponseBody
    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal, HttpServletRequest request) {
        request.getSession().setAttribute("validated", false);
        return Collections.singletonMap("email", principal.getAttribute("email"));
    }

    @GetMapping("/userid")
    public ResponseEntity<String> userId(@RequestParam("email") String email, @AuthenticationPrincipal OAuth2User principal, HttpServletRequest request) {
        request.getSession().setAttribute("validated", false);

        // security check: users can only query their own id
        Map<String, Object> map = Collections.singletonMap("email", principal.getAttribute("email"));
        String currentUserMail = map.get("email").toString();

        if (!currentUserMail.equals(email)) {

            HttpHeaders respHeader = new HttpHeaders();
            respHeader.set("Content-Type", "application/json");

            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .headers(respHeader)
                    .body("{" +
                            "\"error\": " + "\"You do not have the privileges to search ids from other Users!\"" +
                            "}");

        }

        User user = userRepository.findUserByEmail(email);
        HttpHeaders respHeader = new HttpHeaders();
        respHeader.set("Content-Type", "application/json");

        if (user != null) {
            return ResponseEntity.ok()
                    .headers(respHeader)
                    .body("{" +
                            "\"id\": " + user.getId() +
                            "}"
                    );
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // if validated
    // /validate - when done uploading - set valitaded to false again
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
                //userRepository.save() // update counter

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

    @PostMapping("/test")
    public ResponseEntity<String> validateCaptcha(@RequestBody String name, HttpServletRequest request) {
        HttpHeaders respHeader = new HttpHeaders();
        respHeader.set("Content-Type", "application/json");

        System.out.println(name);

        if (recaptchaValidator.validate(request).isSuccess()) {
            return ResponseEntity.ok()
                    .headers(respHeader)
                    .body("{" +
                            "\"message\": " + "\"successfully uploaded!\"" +
                            "}"
                    );
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .headers(respHeader)
                .body("{" +
                        "\"message\": " + "\"failed to validate captcha\"" +
                        "}"
                );
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        request.getSession().setAttribute("validated", false);
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
    public ResponseEntity<String> deleteFile(@PathVariable String fileName, HttpServletRequest request) {
        request.getSession().setAttribute("validated", false);
        return new ResponseEntity<>(service.deleteFile(fileName), HttpStatus.OK);
    }

}