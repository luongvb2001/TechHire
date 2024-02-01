package com.hust.techhire.domain.payload.response;

import com.hust.techhire.domain.enums.RoleName;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleResponse {

    private Long id;

    private RoleName name;
}
