package io.github.thongto.classregistrationsystem.controller.admin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.github.thongto.classregistrationsystem.dto.SemesterDTO;
import io.github.thongto.classregistrationsystem.service.SemesterService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('Admin')")
@RequiredArgsConstructor
public class SemesterController {
    private final SemesterService semesterService;

    @GetMapping("/semester")
    public List<SemesterDTO> getASemesters() {
        return semesterService.getAllSemesters();
    }

}
