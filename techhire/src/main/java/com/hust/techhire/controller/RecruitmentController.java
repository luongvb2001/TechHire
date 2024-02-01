package com.hust.techhire.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hust.techhire.domain.payload.response.RecruitmentResponse;
import com.hust.techhire.service.JobseekerService;
import com.hust.techhire.service.RecruitersService;

@RestController
@RequestMapping("/recruitment")
@RequiredArgsConstructor
public class RecruitmentController {

    private final RecruitersService recruitersService;

    private final JobseekerService jobseekerService;

    @GetMapping()
    private ResponseEntity<Page<RecruitmentResponse>> getPageRecruitmentOfRecruiter(@RequestParam(required = false) String createAt,
                                                                                    @RequestParam(required = false) String jobName,
                                                                                    @RequestParam Integer pageNo,
                                                                                    @RequestParam Integer pageSize){
        return ResponseEntity.ok(recruitersService.getRecruitmentOfRecruiter(createAt, jobName, pageNo, pageSize));
    }

    @PostMapping("/accept/{id}")
    private ResponseEntity<String> acceptRecruitment(@PathVariable Long id) {
        recruitersService.acceptRecruitment(id);
        return ResponseEntity.ok("Đã chấp nhận ứng viên này");
    }

    @GetMapping("/jobseeker")
    private ResponseEntity<Page<RecruitmentResponse>> getPageRecruitmentOfJobseeker(@RequestParam(required = false) String createAt,
                                                                                    @RequestParam(required = false) String jobName,
                                                                                    @RequestParam Integer pageNo,
                                                                                    @RequestParam Integer pageSize){
        return ResponseEntity.ok(jobseekerService.getRecruitmentOfSeeker(createAt, jobName, pageNo, pageSize));
    }
}
