package io.github.thongto.classregistrationsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thongto.classregistrationsystem.entity.Curriculum;

public interface CurriculumRepository extends JpaRepository<Curriculum, Long> {

}
