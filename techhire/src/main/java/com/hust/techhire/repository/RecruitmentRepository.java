package com.hust.techhire.repository;

import com.hust.techhire.domain.models.Jobseeker;
import com.hust.techhire.domain.models.Recruitment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitmentRepository extends JpaRepository<Recruitment, Long> {
    List<Recruitment> findByJobseeker(Jobseeker jobseeker);
}
