package com.projects.blog.domain.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
@Entity
public class User {

  @Id
  @Column(name = "USER_ID")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String userName;

  private String password;

  @Builder
  public User(String userName, String password) {
    this.userName = userName;
    this.password = password;
  }

}
