package io.github.thongto.classregistrationsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DepartmentDTO {
    private Long id;
    private String code;
    private String name;
    private String description;
}
