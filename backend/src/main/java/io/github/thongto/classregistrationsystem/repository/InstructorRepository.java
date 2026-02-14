package io.github.thongto.classregistrationsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thongto.classregistrationsystem.entity.Instructor;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {

}
