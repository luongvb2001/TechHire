package com.hust.techhire.service;

import com.hust.techhire.domain.payload.request.JobRequest;
import com.hust.techhire.domain.payload.request.RecruiterUpdateRequest;
import com.hust.techhire.domain.payload.request.SendEmailRequest;
import com.hust.techhire.domain.payload.response.MessageResponse;
import com.hust.techhire.domain.payload.response.RecruiterResponse;
import com.hust.techhire.domain.payload.response.RecruitmentResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import com.hust.techhire.domain.payload.response.JobResponse;

import javax.mail.MessagingException;
import java.io.IOException;

public interface RecruitersService {
    RecruiterResponse getRecruiterInfo();

    String editProfileOfRecruiter(RecruiterUpdateRequest recruiterUpdateRequest);

    String recruiterAddJob(JobRequest jobRequest);

    Page<JobResponse> getAllJobOfRecruiter(Integer pageNo, Integer pageSize);

    JobResponse getJobOfRecruiterById(Long id);

    String editJobInfo(Long id, JobRequest jobRequest);

    void deleteJob(Long id);

    String contactWithJobseeker(Long id, SendEmailRequest sendEmailRequest) throws MessagingException, IOException;

    Page<RecruitmentResponse> getRecruitmentOfRecruiter(String createAt, String jobName, Integer pageNo, Integer pageSize);

    void acceptRecruitment(Long id);

    MessageResponse editProfileOfRecruiter(String recruiterAddress, String recruiterPhone, String skypeAccount, String workplace, String companyAddress, String companyName, String description, MultipartFile image, Integer personalSize, String website);
}
