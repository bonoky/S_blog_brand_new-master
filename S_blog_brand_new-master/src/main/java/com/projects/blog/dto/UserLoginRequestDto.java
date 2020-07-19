package com.projects.blog.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginRequestDto {
    private String userName;
    private String password;
    private long userId;
}
