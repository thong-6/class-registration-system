package io.github.thongto.classregistrationsystem.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SemesterDTO {
    private Long id;
    private String name;
    private Integer year;
    private Integer term;
    private LocalDate startDate;
    private LocalDate enDate;
    private LocalDate registrationStart;
    private LocalDate registrationEnd;
    private Boolean isCurrent;
    private Boolean isRegistrationOpen;

}
