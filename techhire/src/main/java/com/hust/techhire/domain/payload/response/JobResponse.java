package com.hust.techhire.domain.payload.response;

import com.hust.techhire.domain.models.Category;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class JobResponse {
    private Long id;
    private String jobTitle;
    private String level;
    private String typesOfCV;
    private String address;
    private BigDecimal minSalary;
    private BigDecimal maxSalary;
    private String description;
    private String requireJob;
    private String welfare;
    private String language;
    private String status;
    private LocalDateTime deadline;
    private int applied;
    private int target;
    private Category category;

}
