package io.github.thongto.classregistrationsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thongto.classregistrationsystem.entity.EnrollmentClass;

public interface EnrollmentClassRepository extends JpaRepository<EnrollmentClass, Long> {

}
