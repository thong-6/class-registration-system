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
@Table(name = "class_section")
@Getter
@Setter
public class ClassSection {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "class_section_seq")
    @SequenceGenerator(name = "class_section_seq", sequenceName = "class_section_seq", allocationSize = 1)
    private Long id;
    @Column(name = "section_code", nullable = false, unique = true)
    private String sectionCode;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "semester_id")
    private Semester semester;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;
    @Column(name = "max_students")
    private Integer maxStudents;
    @Column(name = "current_students")
    private Integer currentStudents;
    private String status;
    @Column(columnDefinition = "TEXT")
    private String notes;
    @OneToMany(mappedBy = "classSection", fetch = FetchType.LAZY)
    private List<Enrollment> enrollments;
}
