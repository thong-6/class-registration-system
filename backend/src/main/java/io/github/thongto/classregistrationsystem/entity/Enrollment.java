package io.github.thongto.classregistrationsystem.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
@Table(name = "enrollment")
@Getter
@Setter
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "enrollment_seq")
    @SequenceGenerator(name = "enrollment_seq", sequenceName = "enrollment_seq", allocationSize = 1)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_section_id")
    private ClassSection classSection;
    @Column(name = "enrollment_date")
    private LocalDateTime enrollmentDate;
    private String status;
    @Column(name = "final_grade", precision = 4, scale = 2)
    private BigDecimal finalGrade;
    @Column(name = "gpa_credits")
    private Integer gpaCredits;
    @Column(name = "attendance_rate", precision = 5, scale = 2)
    private BigDecimal attendanceRate;
    @OneToMany(mappedBy = "enrollment", fetch = FetchType.LAZY)
    private List<Grade> grades;
}
