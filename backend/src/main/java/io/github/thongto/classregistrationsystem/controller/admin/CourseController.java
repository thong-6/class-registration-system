package io.github.thongto.classregistrationsystem.controller.admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.thongto.classregistrationsystem.dto.courseDTO.CourseDetailDTO;
import io.github.thongto.classregistrationsystem.dto.courseDTO.CourseRequestDTO;
import io.github.thongto.classregistrationsystem.dto.courseDTO.CourseResponseDTO;
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
    public List<CourseResponseDTO> getAllCourse() {
        return courseService.getAllCourse();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDetailDTO> getACourse(@PathVariable Long id) {
        CourseDetailDTO dto = courseService.getACourse(id);
        if (dto == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<CourseDetailDTO> createACourse(@RequestBody CourseRequestDTO req) {
        CourseDetailDTO created = courseService.createACourse(req);
        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseDetailDTO> putMethodName(@PathVariable Long id, @RequestBody CourseRequestDTO req) {
        CourseDetailDTO updated = courseService.updateACourse(id, req);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CourseDetailDTO> deleteACourse(@PathVariable Long id) {
        courseService.deleteACourse(id);
        return ResponseEntity.noContent().build();
    }
}
