package com.hust.techhire.domain.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailResponse {
    private Long id;

    private String name;

    private String email;

    private Boolean isLocked;

    private JobseekerDetail jobseeker;

    private RecruiterDetail recruiter;
}
