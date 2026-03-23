package io.github.thongto.classregistrationsystem.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.thongto.classregistrationsystem.dto.InstructorDTO;
import io.github.thongto.classregistrationsystem.service.InstructorService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/instructor")
@RequiredArgsConstructor
public class InstructorController {
    private final InstructorService instructorService;

    @GetMapping
    public ResponseEntity<List<InstructorDTO>> getAllInstructor() {
        return ResponseEntity.ok(instructorService.getAllInstructor());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstructorDTO> getAInstructor(@PathVariable Long id) {
        return ResponseEntity.ok(instructorService.getAInstructor(id));
    }

    @PostMapping
    public ResponseEntity<InstructorDTO> createAInstructor(@RequestBody InstructorDTO dto) {
        InstructorDTO created = instructorService.createAInstructor(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InstructorDTO> updateAInstructor(@PathVariable Long id, @RequestBody InstructorDTO dto) {
        return ResponseEntity.ok(instructorService.updateAInstructor(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAInstructor(@PathVariable Long id) {
        instructorService.deleteAInstructor(id);
        return ResponseEntity.noContent().build();
    }
}
