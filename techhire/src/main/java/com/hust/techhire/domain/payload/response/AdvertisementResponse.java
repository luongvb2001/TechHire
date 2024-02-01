package com.hust.techhire.domain.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdvertisementResponse {
    private Long id;
    private String title;
    private String image;
    private String description;
}
