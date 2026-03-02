package io.github.thongto.classregistrationsystem.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.thongto.classregistrationsystem.dto.ClassSectionDTO;
import io.github.thongto.classregistrationsystem.service.ClassSectionService;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/class-section")
@AllArgsConstructor
public class ClassSectionController {
    private final ClassSectionService classSectionService;

    @GetMapping
    public ResponseEntity<List<ClassSectionDTO>> getAllClassSection() {
        return ResponseEntity.ok(classSectionService.getAllClassSection());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassSectionDTO> getAClassSection(@RequestParam Long id) {
        return ResponseEntity.ok(classSectionService.getAClassSection(id));
    }

    @PostMapping
    public ResponseEntity<ClassSectionDTO> createAClassSection(@RequestBody ClassSectionDTO dto) {
        ClassSectionDTO created = classSectionService.createAClassSection(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClassSectionDTO> updateAClassSection(@PathVariable Long id,
            @RequestBody ClassSectionDTO dto) {
        ClassSectionDTO updated = classSectionService.updateAClassSection(id, dto);
        return ResponseEntity.ok(updated);
    }
}
