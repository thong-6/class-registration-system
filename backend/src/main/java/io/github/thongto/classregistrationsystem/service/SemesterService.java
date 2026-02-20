package io.github.thongto.classregistrationsystem.service;

import java.util.List;

import io.github.thongto.classregistrationsystem.dto.SemesterDTO;

public interface SemesterService {
    List<SemesterDTO> getAllSemesters();
}
