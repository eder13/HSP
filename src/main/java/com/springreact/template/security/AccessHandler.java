package com.springreact.template.security;

import com.springreact.template.db.UploadRepository;
import com.springreact.template.db.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Component
public class AccessHandler {

    private final UserRepository userRepository;
    private final UploadRepository uploadRepository;

    public AccessHandler(UserRepository userRepository, UploadRepository uploadRepository) {
        this.userRepository = userRepository;
        this.uploadRepository = uploadRepository;
    }

    public boolean isOwner(Authentication a, Long id) {

        if (a instanceof OAuth2AuthenticationToken) {
            // get email of currently logged in user
            OAuth2User oauth2user = ((OAuth2AuthenticationToken) a).getPrincipal();
            String email = oauth2user.getAttribute("email");

            Long foundId = uploadRepository.getUploadByUserAndUploadId(userRepository.findUserByEmail(email), id);

            System.out.println("#####################################################################");
            System.out.println("isOwner Check");
            System.out.print("User Access Allowed: ");
            System.out.println(foundId != null);
            System.out.println("#####################################################################");

            return foundId != null;

        } else {
            return false;
        }
    }
}
