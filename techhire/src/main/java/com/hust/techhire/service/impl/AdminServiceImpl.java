package com.hust.techhire.service.impl;

import com.hust.techhire.domain.enums.JobStatus;
import com.hust.techhire.domain.models.Advertisement;
import com.hust.techhire.domain.models.Category;
import com.hust.techhire.domain.models.Job;
import com.hust.techhire.domain.models.User;
import com.hust.techhire.domain.payload.request.CategoryRequest;
import com.hust.techhire.domain.payload.response.AdvertisementResponse;
import com.hust.techhire.domain.payload.response.MessageResponse;
import com.hust.techhire.domain.payload.response.UserDetailResponse;
import com.hust.techhire.exception.BadRequestException;
import com.hust.techhire.repository.*;
import com.hust.techhire.service.AdminService;
import com.hust.techhire.service.BaseService;
import com.hust.techhire.service.FileStorageService;
import com.hust.techhire.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.hust.techhire.domain.payload.response.JobDetailResponse;
import com.hust.techhire.repository.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl extends BaseService implements AdminService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final MapperUtils mapper;
    private final AdvertisementRepository advertisementRepository;
    private final FileStorageService fileStorageService;
    private final AdvertisementRepositoryCustom advertisementRepositoryCustom;
    private final CategoryRepository categoryRepository;
    private final JobRepositoryCustom jobRepositoryCustom;

    @Override
    public Page<JobDetailResponse> getPageJobOfRecruiters(Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);

        return mapper.convertToResponsePage(jobRepositoryCustom.getAllJob(pageable), JobDetailResponse.class, pageable);
    }

    @Override
    public Page<UserDetailResponse> getPageAccountManager(Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);

        return mapper.convertToResponsePage(userRepository.getAllAccount(pageable), UserDetailResponse.class, pageable);
    }

    @Override
    public void lockAccountOfRecruiterAndJobseeker(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        if (user.getIsLocked().equals(true)) {
            user.setIsLocked(false);
        } else {
            user.setIsLocked(true);
        }

        userRepository.save(user);
    }

    @Override
    public String addAdvertisement(String title,
                                   MultipartFile image,
                                   String description) {
        String imageFile = fileStorageService.storeFile(image);
        Advertisement advertisement = new Advertisement(title, imageFile ,description, getUser());
        advertisementRepository.save(advertisement);
        return "Thêm quảng cáo thành công";
    }

    @Override
    public Page<AdvertisementResponse> getPageAdvertisement(String title, Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);

        return mapper.convertToResponsePage(
                advertisementRepositoryCustom.searchingForAdvertisement(title,pageable),
                AdvertisementResponse.class, pageable
        );
    }

    @Override
    public void deleteAdvertisement(Long id) {
        advertisementRepository.deleteById(id);
    }

    @Override
    public AdvertisementResponse getAdvertisementById(Long id) {
        return mapper.convertToResponse(advertisementRepository.findById(id).orElseThrow(),AdvertisementResponse.class);
    }

    @Override
    public void updateAdvertisement(Long id , String title, MultipartFile image, String description) {
        String imageFile = fileStorageService.storeFile(image);

        Advertisement advertisement = advertisementRepository.findById(id).orElseThrow();
        advertisement.setDescription(description);
        advertisement.setImage(imageFile);
        advertisement.setTitle(title);

        advertisementRepository.save(advertisement);
    }

    @Override
    public Page<Category> getPageCategory(Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        List<Category> categories = categoryRepository.findAll();
        return new PageImpl<>(categories, pageable, categories.size());
    }

    @Override
    public MessageResponse addCategory(CategoryRequest categoryRequest) {
        Category category = new Category();
        category.setName(categoryRequest.getName());
        categoryRepository.save(category);
        return MessageResponse.builder().message("Thêm danh mục thành công").build();
    }

    @Override
    public Category getCategory(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new BadRequestException("Danh mục không tồn tại"));
    }

    @Override
    public MessageResponse updateCategory(Long id, CategoryRequest categoryRequest) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new BadRequestException("Danh mục không tồn tại"));
        category.setName(categoryRequest.getName());
        categoryRepository.save(category);
        return MessageResponse.builder().message("Cập nhật thành công").build();
    }

    public void updateStatusJob() {
        LocalDateTime timeNow = LocalDateTime.now();
        List<Job> jobDisable = jobRepository.findByDeadlineBeforeAndStatusNot(timeNow, JobStatus.valueOf("DISABLE"));

        for(Job job : jobDisable){
            job.setStatus(JobStatus.valueOf("DISABLE"));
            jobRepository.save(job);
        }
    }

    private User getUser(){
        return userRepository.findById(getUserId()).orElseThrow(() -> new IllegalArgumentException("Tài khoản không tồn tại!!!!"));
    }
}
