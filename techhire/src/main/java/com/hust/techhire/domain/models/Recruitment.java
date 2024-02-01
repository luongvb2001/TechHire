package com.hust.techhire.domain.models;

import com.hust.techhire.domain.models.audit.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tbl_recruitment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recruitment extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "jobseeker_id")
    private Jobseeker jobseeker;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @Column(name = "is_answer")
    private Boolean isAnswer;

    @Column(name = "is_accept")
    private  Boolean isAccept;

    @Column(name = "cv")
    private String cv;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "cv_detail")
    private String cvDetail;

    @Column(name = "upload")
    private Boolean upload;

    public Recruitment(Job job, User user) {
        super();
        this.jobseeker = user.getJobseeker();
        this.job = job;
    }
}
