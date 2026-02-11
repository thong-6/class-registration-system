package io.github.thongto.classregistrationsystem.entity;

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
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String userName;
    private String passWord;
    private String email;
    private String numberPhone;
    @ManyToOne
    @JoinColumn(name = "roleId", nullable = false)
    private Role role;
    @OneToMany(mappedBy = "user")
    private List<EnrollmentClass> enrollmentClass;
}
