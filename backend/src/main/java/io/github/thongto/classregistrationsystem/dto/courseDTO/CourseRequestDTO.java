package io.github.thongto.classregistrationsystem.dto.courseDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CourseRequestDTO {
    private String courseCode;
    private String name;
    private Integer credits;
    private Long departmentId;
    private Long curriculumId;
    private String prerequisites;
    private String corequisites;
    private String description;
    private String learningOutComes;
    private Boolean isActive;
}
