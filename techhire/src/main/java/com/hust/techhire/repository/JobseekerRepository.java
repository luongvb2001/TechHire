package com.hust.techhire.repository;

import com.hust.techhire.domain.models.Jobseeker;
import com.hust.techhire.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface JobseekerRepository extends JpaRepository<Jobseeker, Long> {
    Optional<Jobseeker> findByUser(User user);
}
