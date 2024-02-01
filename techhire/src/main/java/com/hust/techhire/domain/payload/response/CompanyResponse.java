package com.hust.techhire.domain.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyResponse {
    private Long id;
    private String name;
    private String address;
    private String description;
    private String image;
    private String website;
    private Integer personalSize;
}
