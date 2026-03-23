package io.github.thongto.classregistrationsystem.service;

import java.util.List;

import io.github.thongto.classregistrationsystem.dto.InstructorDTO;

public interface InstructorService {
    List<InstructorDTO> getAllInstructor();

    InstructorDTO getAInstructor(Long id);

    InstructorDTO createAInstructor(InstructorDTO dto);

    InstructorDTO updateAInstructor(Long id, InstructorDTO dto);

    void deleteAInstructor(Long id);
}
