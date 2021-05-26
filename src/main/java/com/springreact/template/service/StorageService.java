package com.springreact.template.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.springreact.template.db.Upload;
import com.springreact.template.db.UploadRepository;
import com.springreact.template.db.User;
import com.springreact.template.db.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

@Service
@Slf4j
public class StorageService {

    @Value("${application.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UploadRepository uploadRepository;

    public String uploadFile(MultipartFile file, User user) {
        // TODO: Validate File ending
        File fileObject = convertMultiPartFileToFile(file);
        String fileName = System.currentTimeMillis()+"_"+file.getOriginalFilename();

        // TODO: Try Catch Block with putObject
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObject));
        fileObject.delete();
        int uploadNumber = (int)Math.floor(Math.random()*(99999-11111+1)+11111);
        String tempName = "My Upload #" + uploadNumber;
        Upload up = uploadRepository.save(new Upload(tempName, fileName, new Date(), user, null));
        return "{ \"url\": \"/api/uploads/" + up.getId() + "\" }";
    }

    public byte[] downloadFile(String fileName) {
        S3Object s3Object = s3Client.getObject(bucketName, fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            return IOUtils.toByteArray(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String deleteFile(String fileName) {
        s3Client.deleteObject(bucketName, fileName);
        return fileName + " removed ...";
    }

    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }

}
