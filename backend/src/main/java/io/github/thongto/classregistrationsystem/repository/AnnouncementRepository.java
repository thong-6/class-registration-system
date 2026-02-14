package io.github.thongto.classregistrationsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.thongto.classregistrationsystem.entity.Announcement;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

}
