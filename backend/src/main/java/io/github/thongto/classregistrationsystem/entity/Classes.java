package io.github.thongto.classregistrationsystem.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "classes")
@Getter
@Setter
public class Classes {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "courseId")
    private Course course;
    private LocalDate startTime;
    private LocalDate endTime;
    private Long dayOfWeek;
    @ManyToOne
    @JoinColumn(name = "semesterId")
    private Semester semester;
    @OneToMany(mappedBy = "classes")
    private List<EnrollmentClass> enrollmentClass;
}
