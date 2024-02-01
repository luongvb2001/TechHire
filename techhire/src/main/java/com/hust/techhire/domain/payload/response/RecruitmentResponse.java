package com.hust.techhire.domain.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RecruitmentResponse {
    private Long id;
    private JobseekerResponse jobseeker;
    private JobResponse job;
    private Boolean isAnswer;
    private String cv;
    private String avatar;
    private String cvDetail;
    private Boolean upload;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
