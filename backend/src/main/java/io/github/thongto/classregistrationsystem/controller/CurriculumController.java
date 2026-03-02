package io.github.thongto.classregistrationsystem.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.thongto.classregistrationsystem.dto.CurriculumDTO;
import io.github.thongto.classregistrationsystem.service.CurriculumService;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/admin/curriculum")
@AllArgsConstructor
public class CurriculumController {
    private final CurriculumService curriculumService;

    @GetMapping
    public ResponseEntity<List<CurriculumDTO>> getAllCurriculum() {
        return ResponseEntity.ok(curriculumService.getAllCurriculum());
    }

}
