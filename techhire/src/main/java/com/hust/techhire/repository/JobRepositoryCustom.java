package com.hust.techhire.repository;

import com.hust.techhire.domain.models.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.math.BigDecimal;

public interface JobRepositoryCustom {
    Page<Job> searchJob(Integer pageNo,
                        Integer pageSize,
                        BigDecimal minSalary,
                        BigDecimal maxSalary,
                        String companyName,
                        String jobName,
                        String level,
                        Long categoryId);

    Page<Job> getAllJob(Pageable pageable);
}
