package io.github.thongto.classregistrationsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thongto.classregistrationsystem.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleName(String roleName);
}
