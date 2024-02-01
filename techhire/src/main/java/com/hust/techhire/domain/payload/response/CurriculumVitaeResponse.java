package com.hust.techhire.domain.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CurriculumVitaeResponse {

    private Long id;
    private String name;
    private String fileCV;
    private Boolean status;
    private String avatar;
    private String cvDetail;
    private Boolean upload;
}
