package io.github.thongto.classregistrationsystem.auth.dto;

import io.github.thongto.classregistrationsystem.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserInfo {
    private String username;
    private String role;
}
