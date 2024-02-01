package com.hust.techhire.repository;

import com.hust.techhire.domain.enums.JobStatus;
import com.hust.techhire.domain.models.Recruiter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.hust.techhire.domain.models.Job;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findAllByRecruiter(Recruiter recruiter);

    List<Job> findByDeadlineBeforeAndStatusNot(LocalDateTime timeNow, JobStatus status);
}
