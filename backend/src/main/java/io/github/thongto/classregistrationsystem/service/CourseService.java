package io.github.thongto.classregistrationsystem.service;

import java.util.List;

import io.github.thongto.classregistrationsystem.dto.courseDTO.CourseDetailDTO;
import io.github.thongto.classregistrationsystem.dto.courseDTO.CourseRequestDTO;
import io.github.thongto.classregistrationsystem.dto.courseDTO.CourseResponseDTO;

public interface CourseService {
    List<CourseResponseDTO> getAllCourse();

    CourseDetailDTO getACourse(Long id);

    CourseDetailDTO createACourse(CourseRequestDTO dto);

    CourseDetailDTO updateACourse(Long id, CourseRequestDTO dto);

    void deleteACourse(Long id);
}
