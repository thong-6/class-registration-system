package io.github.thongto.classregistrationsystem.service;

import java.util.List;

import io.github.thongto.classregistrationsystem.dto.SemesterDTO;
import io.github.thongto.classregistrationsystem.entity.Semester;

public interface SemesterService {
    List<SemesterDTO> getAllSemesters();

    Semester createASemester(SemesterDTO dto);

    Semester updateASemester(Long id, SemesterDTO dto);

    void deleteASemester(Long id);
}
