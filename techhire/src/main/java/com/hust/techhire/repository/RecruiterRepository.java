package com.hust.techhire.repository;

import com.hust.techhire.domain.models.Recruiter;
import com.hust.techhire.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter, Long> {

    Optional<Recruiter> findByUser(User user);
}
