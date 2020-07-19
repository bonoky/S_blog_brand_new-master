package com.projects.blog.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserJoinRequestDto {
    private String userName;
    private String password;
}
