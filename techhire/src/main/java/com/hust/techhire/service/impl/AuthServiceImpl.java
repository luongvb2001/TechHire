package com.hust.techhire.service.impl;

import com.hust.techhire.domain.enums.AuthProvider;
import com.hust.techhire.domain.enums.RoleName;
import com.hust.techhire.domain.models.*;
import com.hust.techhire.domain.payload.request.LoginRequest;
import com.hust.techhire.domain.payload.request.SignUpRequest;
import com.hust.techhire.exception.BadRequestException;
import com.hust.techhire.repository.*;
import com.hust.techhire.security.TokenProvider;
import com.hust.techhire.service.AuthService;
import com.hust.techhire.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.hust.techhire.domain.models.*;
import com.hust.techhire.repository.*;

import java.net.URI;
import java.util.Collections;

@Service
public class AuthServiceImpl extends BaseService implements AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    RecruiterRepository recruiterRepository;

    @Autowired
    JobseekerRepository jobseekerRepository;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;


    @Override
    public URI registerAccount(SignUpRequest signUpRequest) {
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }

        // Creating user's account
        User user = new User();
        User result = null;
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);
        user.setIsLocked(false);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (RoleName.ROLE_JOBSEEKER.equals(signUpRequest.getRole())) {
            Role userRole = roleRepository.findByName(RoleName.ROLE_JOBSEEKER)
                    .orElseThrow(() -> new IllegalArgumentException("User Role not set."));

            user.setRoles(Collections.singleton(userRole));
            result = userRepository.save(user);
            jobseekerRepository.save(new Jobseeker(user));
        } else if(RoleName.ROLE_RECRUITER.equals(signUpRequest.getRole())){
            Role userRole = roleRepository.findByName(RoleName.ROLE_RECRUITER)
                    .orElseThrow(() -> new IllegalArgumentException("User Role not set."));

            user.setRoles(Collections.singleton(userRole));
            result = userRepository.save(user);
            addRecruiterInfoAndCompanyInfo(user, signUpRequest);
        } else {
            throw new IllegalArgumentException("Bạn không có quyền tạo tài khoản!!!!");
        }

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();
        return location;
    }

    @Override
    public String login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = tokenProvider.createToken(authentication);
        System.out.println("Access Token: " + accessToken);
        return accessToken;
    }

    private void addRecruiterInfoAndCompanyInfo(User user,SignUpRequest signUpRequest){


        Company company  = new Company(
                signUpRequest.getRecruiterRequest().getCompanyName(),
                signUpRequest.getRecruiterRequest().getAddress()
        );

        companyRepository.save(company);
        Boolean gender = null;
        if (signUpRequest.getRecruiterRequest().getGender() == "0") {
            gender = false;
        } else {
            gender = true;
        }

        Recruiter recruiter = new Recruiter(
                signUpRequest.getRecruiterRequest().getWorkplace(),
                gender,
                signUpRequest.getRecruiterRequest().getSkypeAccount(),
                signUpRequest.getRecruiterRequest().getPhone(),
                user, company
        );

        recruiterRepository.save(recruiter);

    }
}
