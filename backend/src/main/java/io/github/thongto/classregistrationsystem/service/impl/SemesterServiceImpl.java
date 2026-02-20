package io.github.thongto.classregistrationsystem.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import io.github.thongto.classregistrationsystem.dto.SemesterDTO;
import io.github.thongto.classregistrationsystem.repository.SemesterRepository;
import io.github.thongto.classregistrationsystem.service.SemesterService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SemesterServiceImpl implements SemesterService {
    private final SemesterRepository semesterRepository;

    @Override
    public List<SemesterDTO> getAllSemesters() {
        return semesterRepository.findAll()
                .stream()
                .map(s -> new SemesterDTO(
                        s.getId(),
                        s.getName(),
                        s.getYear(),
                        s.getTerm(),
                        s.getStartDate(),
                        s.getEndDate(),
                        s.getRegistrationStart(),
                        s.getRegistrationEnd(),
                        s.getIsCurrent(),
                        s.getIsRegistrationOpen()))
                .toList();
    }
}
