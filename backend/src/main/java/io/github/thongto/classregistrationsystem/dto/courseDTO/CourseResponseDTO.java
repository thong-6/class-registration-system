package io.github.thongto.classregistrationsystem.dto.courseDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CourseResponseDTO {
    private Long id;
    private String courseCode;
    private String name;
    private Integer credits;
    private String nameDepartment;
    private Boolean isActive;
}
