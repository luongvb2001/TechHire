package com.hust.techhire.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.hust.techhire.domain.models.CurriculumVitae;
import com.hust.techhire.domain.models.Jobseeker;

import java.util.List;

@Repository
public interface CurriculumVitaeRepository extends JpaRepository<CurriculumVitae , Long> {
    List<CurriculumVitae> findAllByJobseeker(Jobseeker jobseeker);
}
