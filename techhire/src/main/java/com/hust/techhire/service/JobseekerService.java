package com.hust.techhire.service;

import com.hust.techhire.domain.payload.request.ContactRequest;
import com.hust.techhire.domain.payload.request.PhoneRequest;
import com.hust.techhire.domain.payload.response.*;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import com.hust.techhire.domain.payload.response.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.math.BigDecimal;

public interface JobseekerService {
    String editJobseekerInformation(PhoneRequest phoneRequest);

    JobseekerResponse getJobseekerByToken();

    Page<JobDetailResponse> getPageForJobseeker(Integer pageNo,
                                                Integer pageSize,
                                                BigDecimal minSalary,
                                                BigDecimal maxSalary,
                                                String companyName,
                                                String jobName,
                                                String level,
                                                Long categoryId);

    String addCV(String name, MultipartFile fileCv);

    String createCV(String name, MultipartFile avatarCv, String cvDetail);

    void changeStatusCV (Long id);

    Page<CurriculumVitaeResponse> getAllCvOfJobseeker();

    void deleteCvById(Long id);

    void submitRecruitment(Long jobId);

    Page<RecruitmentResponse> getRecruitmentOfSeeker(String createAt, String jobName, Integer pageNo, Integer pageSize);

    void deleteRecruitmentById(Long id);

    JobDetailResponse getJobById(Long id);

    MessageResponse editJobseekerInformation(String phone, MultipartFile file);

    MessageResponse sendEmailOfContact(ContactRequest contactRequest) throws MessagingException, IOException;
}
