package io.github.thongto.classregistrationsystem.controller;

import org.springframework.web.bind.annotation.RestController;

import io.github.thongto.classregistrationsystem.dto.DepartmentDTO;
import io.github.thongto.classregistrationsystem.service.DepartmentService;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/admin/department")
@AllArgsConstructor
public class DepartmentController {
    private final DepartmentService departmentService;

    @GetMapping
    public ResponseEntity<List<DepartmentDTO>> getMethodName() {
        return ResponseEntity.ok(departmentService.getAllDepartment());
    }
}
