package io.github.thongto.classregistrationsystem.entity;

import java.time.LocalDate;
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
@Table(name = "curriculum")
@Getter
@Setter
public class Curriculum {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "curriculum_seq")
    @SequenceGenerator(name = "curriculum_seq", sequenceName = "curriculum_seq", allocationSize = 1)
    private Long id;
    @Column(nullable = false)
    private String name;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "major_id", nullable = false)
    private Major major;
    @Column(name = "total_credits")
    private Integer totalCredits;
    private Integer duration;
    @Column(name = "effective_date")
    private LocalDate effectiveDate;
    @OneToMany(mappedBy = "curriculum", fetch = FetchType.LAZY)
    private List<Course> courses;
}
