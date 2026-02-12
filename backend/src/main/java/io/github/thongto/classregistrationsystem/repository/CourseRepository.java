package io.github.thongto.classregistrationsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thongto.classregistrationsystem.entity.Course;

public interface CourseRepository extends JpaRepository<Course, String> {

}
