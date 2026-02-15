package io.github.thongto.classregistrationsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thongto.classregistrationsystem.entity.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
}
