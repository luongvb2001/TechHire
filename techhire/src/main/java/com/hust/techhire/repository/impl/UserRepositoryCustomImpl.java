package com.hust.techhire.repository.impl;

import com.hust.techhire.domain.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.hust.techhire.repository.BaseRepository;
import com.hust.techhire.repository.UserRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    private static final String FROM_TABLE = " from users u where u.email not in ('master@gmail.com')";

    @Override
    public Page<User> getAllAccount(Pageable pageable) {
        Map<String, Object> params = new HashMap<>();
        String strSelectQuery = "SELECT * " + FROM_TABLE;

        String strCountQuery = "SELECT COUNT(DISTINCT u.id)" + FROM_TABLE;
        return BaseRepository.getPagedNativeQuery(em, strSelectQuery, strCountQuery, params, pageable, User.class);
    }
}
