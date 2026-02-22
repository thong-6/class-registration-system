package io.github.thongto.classregistrationsystem.controller.admin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.github.thongto.classregistrationsystem.dto.SemesterDTO;
import io.github.thongto.classregistrationsystem.entity.Semester;
import io.github.thongto.classregistrationsystem.repository.SemesterRepository;
import io.github.thongto.classregistrationsystem.service.SemesterService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/admin/semester")
@PreAuthorize("hasAuthority('Admin')")
@RequiredArgsConstructor
public class SemesterController {
    private final SemesterService semesterService;

    @GetMapping
    public List<SemesterDTO> getASemesters() {
        return semesterService.getAllSemesters();
    }

    @PostMapping
    public ResponseEntity<Semester> createASemester(@RequestBody SemesterDTO semesterDTO) {
        Semester created = semesterService.createASemester(semesterDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Semester> updateASemester(@PathVariable Long id, @RequestBody SemesterDTO semesterDTO) {
        Semester updated = semesterService.updateASemester(id, semesterDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Semester> deleteASemester(@PathVariable Long id) {
        semesterService.deleteASemester(id);
        return ResponseEntity.noContent().build();
    }

}
