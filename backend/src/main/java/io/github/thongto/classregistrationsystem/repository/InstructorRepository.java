package io.github.thongto.classregistrationsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thongto.classregistrationsystem.entity.Instructor;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {
    Optional<Instructor> findByUserId(Long instructorId);
}
