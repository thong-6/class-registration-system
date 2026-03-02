package io.github.thongto.classregistrationsystem.service;

import java.util.List;

import io.github.thongto.classregistrationsystem.dto.CourseDTO;

public interface CourseService {
    List<CourseDTO> getAllCourse();

    CourseDTO getACourse(Long id);

    CourseDTO createACourse(CourseDTO dto);

    CourseDTO updateACourse(Long id, CourseDTO dto);

    void deleteACourse(Long id);
}
