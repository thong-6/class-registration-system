package io.github.thongto.classregistrationsystem.entity;

import java.util.List;

import io.github.thongto.classregistrationsystem.enums.SemesterStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "semesters")
@Getter
@Setter
public class Semester {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String semesterName;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SemesterStatus status;
    @OneToMany(mappedBy = "semester")
    private List<Classes> classes;
}
