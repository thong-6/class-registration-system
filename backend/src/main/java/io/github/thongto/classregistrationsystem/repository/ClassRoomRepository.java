package io.github.thongto.classregistrationsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thongto.classregistrationsystem.entity.ClassRoom;

public interface ClassRoomRepository extends JpaRepository<ClassRoom, Long> {

}
