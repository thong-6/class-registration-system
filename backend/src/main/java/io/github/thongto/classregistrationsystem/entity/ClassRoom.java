package io.github.thongto.classregistrationsystem.entity;

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
@Table(name = "classroom")
@Getter
@Setter
public class ClassRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "classroom_seq")
    @SequenceGenerator(name = "classroom_seq", sequenceName = "classroom_seq", allocationSize = 1)
    private Long id;
    @Column(name = "room_number")
    private String roomNumber;
    private String building;
    private Integer capacity;
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Schedule> schedules;
}
