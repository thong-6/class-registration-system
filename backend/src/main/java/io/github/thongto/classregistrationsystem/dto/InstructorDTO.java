package io.github.thongto.classregistrationsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InstructorDTO {
    private Long userId;
    private String instructorCode;
    private Long departmentId;
    private String departmentName;
    private String academicDegree;

}
