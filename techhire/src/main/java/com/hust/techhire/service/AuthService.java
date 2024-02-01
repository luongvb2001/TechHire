package com.hust.techhire.service;


import com.hust.techhire.domain.payload.request.LoginRequest;
import com.hust.techhire.domain.payload.request.SignUpRequest;

import java.net.URI;

public interface AuthService {
    URI registerAccount(SignUpRequest signUpRequest);

    String login(LoginRequest loginRequest);
}
