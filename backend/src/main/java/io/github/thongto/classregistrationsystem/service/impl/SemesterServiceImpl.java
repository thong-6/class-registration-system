package io.github.thongto.classregistrationsystem.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import io.github.thongto.classregistrationsystem.dto.SemesterDTO;
import io.github.thongto.classregistrationsystem.entity.Semester;
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

    @Override
    public Semester createASemester(SemesterDTO dto) {
        Semester newSemester = new Semester();
        newSemester.setName(dto.getName());
        newSemester.setYear(dto.getYear());
        newSemester.setTerm(dto.getTerm());
        newSemester.setStartDate(dto.getStartDate());
        newSemester.setEndDate(dto.getEndDate());
        newSemester.setRegistrationStart(dto.getRegistrationStart());
        newSemester.setRegistrationEnd(dto.getRegistrationEnd());
        newSemester.setIsCurrent(dto.getIsCurrent());
        newSemester.setIsRegistrationOpen(dto.getIsRegistrationOpen());
        return semesterRepository.save(newSemester);
    }

    @Override
    public Semester updateASemester(Long id, SemesterDTO dto) {
        Semester semester = semesterRepository.findById(id).get();
        semester.setName(dto.getName());
        semester.setYear(dto.getYear());
        semester.setTerm(dto.getTerm());
        semester.setStartDate(dto.getStartDate());
        semester.setEndDate(dto.getEndDate());
        semester.setRegistrationStart(dto.getRegistrationStart());
        semester.setRegistrationEnd(dto.getRegistrationEnd());
        semester.setIsCurrent(dto.getIsCurrent());
        semester.setIsRegistrationOpen(dto.getIsRegistrationOpen());
        return semesterRepository.save(semester);
    }

    @Override
    public void deleteASemester(Long id) {
        Semester semester = semesterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Semester not found"));
        semesterRepository.delete(semester);

    }
}
