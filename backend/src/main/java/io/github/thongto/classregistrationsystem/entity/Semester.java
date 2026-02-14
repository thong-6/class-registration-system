package io.github.thongto.classregistrationsystem.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "semester")
@Getter
@Setter
public class Semester {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "semester_seq")
    @SequenceGenerator(name = "semester_seq", sequenceName = "semester_seq", allocationSize = 1)
    private Long id;
    @Column(nullable = false)
    private String name;
    private Integer year;
    private Integer term;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;
    @Column(name = "registration_start")
    private LocalDate registrationStart;
    @Column(name = "registration_end")
    private LocalDate registrationEnd;
    @Column(name = "is_current")
    private Boolean isCurrent;
    @Column(name = "is_registration_open")
    private Boolean isRegistrationOpen;
    @OneToMany(mappedBy = "semester", fetch = FetchType.LAZY)
    private List<ClassSection> classSections;
}
