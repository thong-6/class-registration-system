package io.github.thongto.classregistrationsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thongto.classregistrationsystem.entity.Semester;

public interface SemesterRepository extends JpaRepository<Semester, Long> {

}
