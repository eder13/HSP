package com.springreact.template.security;

import com.springreact.template.db.Upload;
import com.springreact.template.db.UploadRepository;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Checks if the Body consists only of a name field
 */
@Component
public class UploadValidator implements Validator {

    private final UploadRepository uploadRepository;

    public UploadValidator(UploadRepository uploadRepository) {
        this.uploadRepository = uploadRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return Upload.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {

        System.out.println("Upload Validator");

        if(target instanceof Upload) {

            Upload upload = (Upload) target;

            System.out.println("uploadId: " + upload.getId());
            System.out.println("name: " + upload.getName());
            System.out.println("fileName: " + upload.getFileName());
            System.out.println("createdOn: " + upload.getCreatedOn());
            System.out.println("user_id: " + upload.getUser().getId());
            System.out.println("users_downloads not provided?: " + upload.getUsers().isEmpty());

            System.out.println(uploadRepository.getUploadByUserAndUploadId(upload.getUser(), upload.getId()));

            // TODO: Now compare with current database and check if
            //       oder stuff is not altered
            //if(altered)
            //  errors.reject("");
        }

        // check if object is an instance of Upload

        // OAuth2User oauth2user = ((OAuth2AuthenticationToken) a).getPrincipal();

        // if (a instanceof OAuth2AuthenticationToken) {
        //Upload upload = (Upload) target;

        //errors.reject("DIE");
    }
}
