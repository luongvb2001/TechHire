package com.hust.techhire.repository;

import com.hust.techhire.domain.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepositoryCustom {
    Page<User> getAllAccount(Pageable pageable);
}
