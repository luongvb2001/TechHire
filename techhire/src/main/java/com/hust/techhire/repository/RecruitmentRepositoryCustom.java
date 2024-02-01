package com.hust.techhire.repository;

import com.hust.techhire.domain.models.Recruitment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RecruitmentRepositoryCustom {
    Page<Recruitment> getRecruitmentOfRecruiter(Pageable pageable, String createAt, Long jobseekerId, Long recruiterId, String jobName);
}
