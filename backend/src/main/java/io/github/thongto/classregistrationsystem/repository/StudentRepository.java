package io.github.thongto.classregistrationsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thongto.classregistrationsystem.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}
