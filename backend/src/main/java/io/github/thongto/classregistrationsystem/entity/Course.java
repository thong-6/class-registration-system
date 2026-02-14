package io.github.thongto.classregistrationsystem.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "course")
@Getter
@Setter
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "course_seq")
    @SequenceGenerator(name = "course_seq", sequenceName = "course_seq", allocationSize = 1)
    private Long id;
    @Column(name = "course_code", nullable = false, unique = true)
    private String courseCode;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private Integer credits;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(name = "learning_outcomes", columnDefinition = "TEXT")
    private String learningOutcomes;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "curriculum_id")
    private Curriculum curriculum;
    private String prerequisites;
    private String corequisites;
    @Column(name = "is_active")
    private Boolean isActive;
    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<ClassSection> classSections;
}
