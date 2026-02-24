package io.github.thongto.classregistrationsystem.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import io.github.thongto.classregistrationsystem.dto.courseDTO.CourseDetailDTO;
import io.github.thongto.classregistrationsystem.dto.courseDTO.CourseRequestDTO;
import io.github.thongto.classregistrationsystem.dto.courseDTO.CourseResponseDTO;
import io.github.thongto.classregistrationsystem.entity.Course;
import io.github.thongto.classregistrationsystem.entity.Curriculum;
import io.github.thongto.classregistrationsystem.entity.Department;
import io.github.thongto.classregistrationsystem.repository.CourseRepository;
import io.github.thongto.classregistrationsystem.repository.CurriculumRepository;
import io.github.thongto.classregistrationsystem.repository.DepartmentRepository;
import io.github.thongto.classregistrationsystem.service.CourseService;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;
    private final DepartmentRepository departmentRepository;
    private final CurriculumRepository curriculumRepository;

    private CourseDetailDTO mapToDetailDTO(Course course) {
        return new CourseDetailDTO(
                course.getId(),
                course.getCourseCode(),
                course.getName(),
                course.getCredits(),
                course.getDepartment().getId(),
                course.getDepartment().getName(),
                course.getCurriculum().getId(),
                course.getCurriculum().getName(),
                course.getPrerequisites(),
                course.getCorequisites(),
                course.getDescription(),
                course.getLearningOutcomes(),
                course.getIsActive());
    }

    @Override
    public List<CourseResponseDTO> getAllCourse() {
        return courseRepository.findAll().stream().map(
                s -> new CourseResponseDTO(
                        s.getId(),
                        s.getCourseCode(),
                        s.getName(),
                        s.getCredits(),
                        s.getCorequisites(),
                        s.getIsActive()))
                .toList();
    }

    @Override
    public CourseDetailDTO getACourse(Long id) {
        Course detail = courseRepository.findById(id).get();
        return new CourseDetailDTO(
                detail.getId(),
                detail.getCourseCode(),
                detail.getName(),
                detail.getCredits(),
                detail.getDepartment().getId(),
                detail.getDepartment().getName(),
                detail.getCurriculum().getId(),
                detail.getCurriculum().getName(),
                detail.getPrerequisites(),
                detail.getCorequisites(),
                detail.getDescription(),
                detail.getLearningOutcomes(),
                detail.getIsActive());
    }

    @Override
    public CourseDetailDTO createACourse(CourseRequestDTO dto) {
        Course newCourse = new Course();
        Department department = departmentRepository.findById(dto.getDepartmentId()).get();
        Curriculum curriculum = curriculumRepository.findById(dto.getCurriculumId()).get();
        newCourse.setCourseCode(dto.getCourseCode());
        newCourse.setName(dto.getName());
        newCourse.setCredits(dto.getCredits());
        newCourse.setCurriculum(curriculum);
        newCourse.setDepartment(department);
        newCourse.setPrerequisites(dto.getPrerequisites());
        newCourse.setCorequisites(dto.getCorequisites());
        newCourse.setDescription(dto.getDescription());
        newCourse.setLearningOutcomes(dto.getLearningOutComes());
        newCourse.setIsActive(dto.getIsActive());
        courseRepository.save(newCourse);
        return mapToDetailDTO(newCourse);
    }

    @Override
    public CourseDetailDTO updateACourse(Long id, CourseRequestDTO dto) {
        Department department = departmentRepository.findById(dto.getDepartmentId()).get();
        Curriculum curriculum = curriculumRepository.findById(dto.getCurriculumId()).get();
        Course course = courseRepository.findById(id).get();
        course.setCourseCode(dto.getCourseCode());
        course.setName(dto.getName());
        course.setCredits(dto.getCredits());
        course.setDepartment(department);
        course.setCurriculum(curriculum);
        course.setPrerequisites(dto.getPrerequisites());
        course.setCorequisites(dto.getCorequisites());
        course.setDescription(dto.getDescription());
        course.setLearningOutcomes(dto.getLearningOutComes());
        course.setIsActive(dto.getIsActive());
        courseRepository.save(course);
        return mapToDetailDTO(course);
    }

    @Override
    public void deleteACourse(Long id) {
        courseRepository.deleteById(id);
    }
}
