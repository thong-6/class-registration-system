package io.github.thongto.classregistrationsystem.service;

import java.util.List;

import io.github.thongto.classregistrationsystem.dto.ClassSectionDTO;

public interface ClassSectionService {
    List<ClassSectionDTO> getAllClassSection();

    ClassSectionDTO getAClassSection(Long id);

    ClassSectionDTO createAClassSection(ClassSectionDTO dto);

    ClassSectionDTO updateAClassSection(Long id, ClassSectionDTO dto);

    // void deleteAClassSection(Long id);
}
