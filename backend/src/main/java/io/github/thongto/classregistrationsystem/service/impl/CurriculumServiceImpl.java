package io.github.thongto.classregistrationsystem.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import io.github.thongto.classregistrationsystem.dto.CurriculumDTO;
import io.github.thongto.classregistrationsystem.repository.CurriculumRepository;
import io.github.thongto.classregistrationsystem.service.CurriculumService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CurriculumServiceImpl implements CurriculumService {
    private final CurriculumRepository curriculumRepository;

    @Override
    public List<CurriculumDTO> getAllCurriculum() {
        return curriculumRepository.findAll().stream().map(
                s -> new CurriculumDTO(s.getId(), s.getName())).toList();
    }
}
