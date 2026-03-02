package io.github.thongto.classregistrationsystem.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import io.github.thongto.classregistrationsystem.dto.DepartmentDTO;
import io.github.thongto.classregistrationsystem.repository.DepartmentRepository;
import io.github.thongto.classregistrationsystem.service.DepartmentService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {
    private final DepartmentRepository departmentRepository;

    @Override
    public List<DepartmentDTO> getAllDepartment() {
        return departmentRepository.findAll().stream().map(
                s -> new DepartmentDTO(s.getId(), s.getCode(), s.getName(), s.getDescription())).toList();
    }
}
