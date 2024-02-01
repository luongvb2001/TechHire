package com.hust.techhire.service;

import com.hust.techhire.domain.models.Category;
import com.hust.techhire.domain.payload.request.CategoryRequest;
import com.hust.techhire.domain.payload.response.AdvertisementResponse;
import com.hust.techhire.domain.payload.response.MessageResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import com.hust.techhire.domain.payload.response.JobDetailResponse;
import com.hust.techhire.domain.payload.response.UserDetailResponse;

public interface AdminService {
    Page<JobDetailResponse> getPageJobOfRecruiters(Integer pageNo, Integer pageSize);

    Page<UserDetailResponse> getPageAccountManager(Integer pageNo, Integer pageSize);

    void lockAccountOfRecruiterAndJobseeker(Long id);

    //ADVERTISEMENT
    String addAdvertisement(String title,
                            MultipartFile image,
                            String description);

    Page<AdvertisementResponse> getPageAdvertisement(String title, Integer pageNo, Integer pageSize);

    void deleteAdvertisement(Long id);

    AdvertisementResponse getAdvertisementById(Long id);

    void updateAdvertisement(Long id,String title, MultipartFile image, String description);

    Page<Category> getPageCategory(Integer pageNo, Integer pageSize);

    MessageResponse addCategory(CategoryRequest categoryRequest);

    Category getCategory(Long id);

    MessageResponse updateCategory(Long id, CategoryRequest categoryRequest);

    void updateStatusJob();
}