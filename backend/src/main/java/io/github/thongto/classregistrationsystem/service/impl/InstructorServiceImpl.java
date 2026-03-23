package io.github.thongto.classregistrationsystem.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import io.github.thongto.classregistrationsystem.dto.InstructorDTO;
import io.github.thongto.classregistrationsystem.entity.Department;
import io.github.thongto.classregistrationsystem.entity.Instructor;
import io.github.thongto.classregistrationsystem.entity.User;
import io.github.thongto.classregistrationsystem.repository.DepartmentRepository;
import io.github.thongto.classregistrationsystem.repository.InstructorRepository;
import io.github.thongto.classregistrationsystem.repository.UserRepository;
import io.github.thongto.classregistrationsystem.service.InstructorService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InstructorServiceImpl implements InstructorService {
    private final InstructorRepository instructorRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;

    private InstructorDTO mapToDTO(Instructor instructor) {
        Department department = instructor.getDepartment();
        Long departmentId = department != null ? department.getId() : null;
        String departmentName = department != null ? department.getName() : null;

        return new InstructorDTO(
                instructor.getUserId(),
                instructor.getInstructorCode(),
                departmentId,
                departmentName,
                instructor.getAcademicDegree());
    }

    @Override
    public List<InstructorDTO> getAllInstructor() {
        return instructorRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public InstructorDTO getAInstructor(Long id) {
        Instructor instructor = instructorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));
        return mapToDTO(instructor);
    }

    @Override
    public InstructorDTO createAInstructor(InstructorDTO dto) {
        if (dto.getUserId() == null) {
            throw new RuntimeException("userId is required");
        }

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Department department = null;
        if (dto.getDepartmentId() != null) {
            department = departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
        }

        if (instructorRepository.existsById(dto.getUserId())) {
            throw new RuntimeException("Instructor already exists for this user");
        }

        Instructor instructor = new Instructor();
        instructor.setUser(user);
        instructor.setInstructorCode(dto.getInstructorCode());
        instructor.setDepartment(department);
        instructor.setAcademicDegree(dto.getAcademicDegree());
        Instructor savedInstructor = instructorRepository.save(instructor);
        return mapToDTO(savedInstructor);
    }

    @Override
    public InstructorDTO updateAInstructor(Long id, InstructorDTO dto) {
        Instructor instructor = instructorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        if (dto.getDepartmentId() != null) {
            Department department = departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            instructor.setDepartment(department);
        } else {
            instructor.setDepartment(null);
        }

        instructor.setInstructorCode(dto.getInstructorCode());
        instructor.setAcademicDegree(dto.getAcademicDegree());

        Instructor savedInstructor = instructorRepository.save(instructor);
        return mapToDTO(savedInstructor);
    }

    @Override
    public void deleteAInstructor(Long id) {
        Instructor instructor = instructorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));
        instructorRepository.delete(instructor);
    }
}
