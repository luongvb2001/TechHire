package com.hust.techhire.domain.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tbl_curriculum_vitae")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CurriculumVitae {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Column(name = "file_cv")
    private String fileCV;
    private Boolean status;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "cv_detail")
    private String cvDetail;

    @Column(name = "upload")
    private Boolean upload;

    @ManyToOne
    @JoinColumn(name = "jobseeker_id")
    private Jobseeker jobseeker;

    public CurriculumVitae(String name, String fileCV, Boolean status, Boolean upload, Jobseeker jobseeker) {
        this.name = name;
        this.fileCV = fileCV;
        this.status = status;
        this.upload = upload;
        this.jobseeker = jobseeker;
    }

    public CurriculumVitae(String name, Boolean status, String avatar, String cvDetail, Boolean upload, Jobseeker jobseeker) {
        this.name = name;
        this.status = status;
        this.avatar = avatar;
        this.cvDetail = cvDetail;
        this.upload = upload;
        this.jobseeker = jobseeker;
    }
}
