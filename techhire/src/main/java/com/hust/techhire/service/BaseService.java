package com.hust.techhire.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import com.hust.techhire.repository.UserRepository;
import com.hust.techhire.security.UserPrincipal;


public abstract class BaseService {
    @Autowired
    UserRepository userRepository;

    public String getUsername(){
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return user.getUsername();
    }

    public Long getUserId(){
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return user.getId();
    }

}
