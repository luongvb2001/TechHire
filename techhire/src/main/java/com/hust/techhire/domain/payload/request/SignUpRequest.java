package com.hust.techhire.domain.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import com.hust.techhire.domain.enums.RoleName;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class SignUpRequest {
    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    private RoleName role;

    @JsonProperty("recruiter_info")
    private RecruiterRequest recruiterRequest;
}