package io.github.thongto.classregistrationsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ClassSectionDTO {
    private Long id;
    private String sectionCode;
    private Long courseId;
    private String courseName;
    private Long semesterId;
    private String semesterName;
    private Long instructorId;
    private String instructorName;
    private Integer maxStudents;
    private Integer currentStudents;
    private String status;
    private String notes;
}
