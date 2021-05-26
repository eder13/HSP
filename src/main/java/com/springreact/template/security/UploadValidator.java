package com.springreact.template.security;

import com.springreact.template.db.Upload;
import com.springreact.template.db.UploadRepository;
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

        if(target instanceof Upload) {

            Upload upload = (Upload) target;

            // Only allow the field 'name' to be altered (PATCH)
            Long foundId = uploadRepository.getUploadByIdAndFileNameAndCreatedOn(upload.getId(), upload.getFileName(), upload.getCreatedOn());
            boolean denyAltering = foundId == null;

            if(denyAltering) {
                errors.reject("");
            }
        }
    }
}
