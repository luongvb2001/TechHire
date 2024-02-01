package com.hust.techhire.repository;

import com.hust.techhire.domain.models.Advertisement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdvertisementRepositoryCustom {
    Page<Advertisement> searchingForAdvertisement(String name, Pageable pageable);
}
