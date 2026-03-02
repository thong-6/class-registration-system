package io.github.thongto.classregistrationsystem.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.thongto.classregistrationsystem.dto.CourseDTO;
import io.github.thongto.classregistrationsystem.service.CourseService;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/admin/course")
@PreAuthorize("hasAuthority('Admin')")
@AllArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @GetMapping
    public List<CourseDTO> getAllCourse() {
        return courseService.getAllCourse();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> getACourse(@PathVariable Long id) {
        CourseDTO dto = courseService.getACourse(id);
        if (dto == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<CourseDTO> createACourse(@RequestBody CourseDTO req) {
        CourseDTO created = courseService.createACourse(req);
        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseDTO> updateACourse(@PathVariable Long id, @RequestBody CourseDTO req) {
        CourseDTO updated = courseService.updateACourse(id, req);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CourseDTO> deleteACourse(@PathVariable Long id) {
        courseService.deleteACourse(id);
        return ResponseEntity.noContent().build();
    }
}
