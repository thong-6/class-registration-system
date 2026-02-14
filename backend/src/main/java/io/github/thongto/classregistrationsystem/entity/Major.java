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
@Table(name = "major")
@Getter
@Setter
public class Major {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "major_seq")
    @SequenceGenerator(name = "major_seq", sequenceName = "major_seq", allocationSize = 1)
    private Long id;
    @Column(nullable = false, unique = true)
    private String code;
    @Column(nullable = false)
    private String name;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
    private String description;
    @OneToMany(mappedBy = "major", fetch = FetchType.LAZY)
    private List<Student> students;
    @OneToMany(mappedBy = "major", fetch = FetchType.LAZY)
    private List<Curriculum> curriculums;
}
