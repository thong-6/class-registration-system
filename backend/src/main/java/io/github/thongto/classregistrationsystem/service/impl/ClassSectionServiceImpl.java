package io.github.thongto.classregistrationsystem.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import io.github.thongto.classregistrationsystem.dto.ClassSectionDTO;
import io.github.thongto.classregistrationsystem.entity.ClassSection;
import io.github.thongto.classregistrationsystem.entity.Course;
import io.github.thongto.classregistrationsystem.entity.Instructor;
import io.github.thongto.classregistrationsystem.entity.Semester;
import io.github.thongto.classregistrationsystem.repository.ClassSectionRepository;
import io.github.thongto.classregistrationsystem.repository.CourseRepository;
import io.github.thongto.classregistrationsystem.repository.InstructorRepository;
import io.github.thongto.classregistrationsystem.repository.SemesterRepository;
import io.github.thongto.classregistrationsystem.service.ClassSectionService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ClassSectionServiceImpl implements ClassSectionService {
    private final ClassSectionRepository classSectionRepository;
    private final CourseRepository courseRepository;
    private final SemesterRepository semesterRepository;
    private final InstructorRepository instructorRepository;

    @Override
    public List<ClassSectionDTO> getAllClassSection() {
        return classSectionRepository.findAll().stream().map(
                s -> new ClassSectionDTO(
                        s.getId(),
                        s.getSectionCode(),
                        s.getCourse().getId(),
                        s.getCourse().getName(),
                        s.getSemester().getId(),
                        s.getSemester().getName(),
                        s.getInstructor().getUserId(),
                        s.getInstructor().getUser().getFullName(),
                        s.getMaxStudents(),
                        s.getCurrentStudents(),
                        s.getStatus(),
                        s.getNotes()))
                .toList();
    }

    @Override
    public ClassSectionDTO getAClassSection(Long id) {
        ClassSection classSection = classSectionRepository.findById(id).get();
        return new ClassSectionDTO(
                classSection.getId(),
                classSection.getSectionCode(),
                classSection.getCourse().getId(),
                classSection.getCourse().getName(),
                classSection.getSemester().getId(),
                classSection.getSemester().getName(),
                classSection.getInstructor().getUserId(),
                classSection.getInstructor().getUser().getFullName(),
                classSection.getMaxStudents(),
                classSection.getCurrentStudents(),
                classSection.getStatus(),
                classSection.getNotes());
    }

    @Override
    public ClassSectionDTO createAClassSection(ClassSectionDTO dto) {
        Course course = courseRepository.findById(dto.getCourseId()).get();
        Instructor instructor = instructorRepository.findByUserId(dto.getInstructorId()).get();
        Semester semester = semesterRepository.findById(dto.getSemesterId()).get();
        ClassSection classSection = new ClassSection();
        classSection.setSectionCode(dto.getSectionCode());
        classSection.setCourse(course);
        classSection.setSemester(semester);
        classSection.setInstructor(instructor);
        classSection.setMaxStudents(dto.getMaxStudents());
        classSection.setCurrentStudents(dto.getCurrentStudents());
        classSection.setStatus(dto.getStatus());
        classSection.setNotes(dto.getNotes());
        classSectionRepository.save(classSection);
        return dto;
    }

    @Override
    public ClassSectionDTO updateAClassSection(Long id, ClassSectionDTO dto) {
        ClassSection classSection = classSectionRepository.findById(id).get();
        Course course = courseRepository.findById(dto.getCourseId()).get();
        Instructor instructor = instructorRepository.findByUserId(dto.getInstructorId()).get();
        Semester semester = semesterRepository.findById(dto.getSemesterId()).get();
        classSection.setId(id);
        classSection.setCourse(course);
        classSection.setSemester(semester);
        classSection.setInstructor(instructor);
        classSection.setMaxStudents(dto.getMaxStudents());
        classSection.setCurrentStudents(dto.getCurrentStudents());
        classSection.setStatus(dto.getStatus());
        classSection.setStatus(dto.getStatus());
        classSectionRepository.save(classSection);
        return dto;
    }

}
