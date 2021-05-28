package com.springreact.template.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.util.IOUtils;
import com.springreact.template.controller.HomeController;
import com.springreact.template.db.Upload;
import com.springreact.template.db.UploadRepository;
import com.springreact.template.db.User;
import com.springreact.template.db.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.concurrent.Executors;

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

        File fileObject = convertMultiPartFileToFile(file);
        if(fileObject == null)
            return "";
        String fileName = System.currentTimeMillis()+"_"+file.getOriginalFilename();

        int maxUploadThreads = 5;
        TransferManager tm = TransferManagerBuilder
                .standard()
                .withS3Client(s3Client)
                .withMultipartUploadThreshold((long) (5 * 1024 * 1024))
                .withExecutorFactory(() -> Executors.newFixedThreadPool(maxUploadThreads))
                .build();

        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName, fileObject);

        try {
            tm.upload(putObjectRequest).waitForCompletion();
            fileObject.delete(); // delete temporary file
            HomeController.validated = false;
            // save to database
            int uploadNumber = (int)Math.floor(Math.random()*(99999-11111+1)+11111);
            String tempName = "My Upload #" + uploadNumber;
            Upload up = uploadRepository.save(new Upload(tempName, fileName, new Date(), user, null));
            return "{ \"url\": \"/api/uploads/" + up.getId() + "\" }";
        }
        catch (InterruptedException e) {
            HomeController.validated = false;
            e.printStackTrace();
            return "{ \"message\": \"" + e.getMessage() + "\" }";
        }
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

        if(file.isEmpty())
            return null;

        try {
            Tika tika = new Tika();
            // File Types see: https://tika.apache.org/1.26/formats.html
            if(!tika.detect(file.getBytes()).equals("application/pdf")) {
                return null;
            }
        } catch(IOException e) {
            System.out.print("### Could not getBytes for Tika validation: ");
            System.out.println(e.getMessage());
            return null;
        }

        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            System.out.print("### Could not Parse Multipart to File: ");
            System.out.println(e.getMessage());
            return null;
        }

        return convertedFile;
    }

}
