// package io.github.thongto.classregistrationsystem.config;

// import java.util.ArrayList;
// import java.util.List;

// import org.springframework.boot.CommandLineRunner;
// import org.springframework.context.annotation.Profile;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Component;

// import io.github.thongto.classregistrationsystem.entity.Role;
// import io.github.thongto.classregistrationsystem.entity.User;
// import io.github.thongto.classregistrationsystem.repository.ClassRepository;
// import io.github.thongto.classregistrationsystem.repository.CourseRepository;
// import
// io.github.thongto.classregistrationsystem.repository.EnrollmentClassRepository;
// import io.github.thongto.classregistrationsystem.repository.RoleRepository;
// import
// io.github.thongto.classregistrationsystem.repository.SemesterRepository;
// import io.github.thongto.classregistrationsystem.repository.UserRepository;
// import lombok.RequiredArgsConstructor;
// import net.datafaker.Faker;

// @Component
// @Profile("dev")
// @RequiredArgsConstructor
// public class DataInitializer implements CommandLineRunner {
// private final UserRepository userRepository;
// private final RoleRepository roleRepository;
// private final EnrollmentClassRepository enrollmentClassRepository;
// private final ClassRepository classRepository;
// private final SemesterRepository semesterRepository;
// private final CourseRepository courseRepository;
// private final Faker faker = new Faker();
// private final PasswordEncoder passwordEncoder;

// @Override
// public void run(String... args) {
// if (roleRepository.count() == 0) {
// seedRole(1);
// }
// }

// private void seedRole(int count) {
// Role roleAdmin = new Role();
// roleAdmin.setRole_name("ADMIN");
// roleAdmin.setDescription("A ADMIN has full access rights.");
// roleRepository.save(roleAdmin);
// Role roleStudent = new Role();
// roleStudent.setRole_name("STUDENT");
// roleStudent.setDescription(
// "A STUDENT can only register for classes, view their own information, and see
// their personal schedule.");
// roleRepository.save(roleStudent);
// }

// private void seedUser(int count) {
// List<User> users = new ArrayList<>();
// String encoded = passwordEncoder.encode("123456");
// for (int i = 0; i < count; i++) {
// User user =
// User.builder().userName(faker.name().fullName()).passWord(encoded).email(
// faker.internet().emailAddress()).numberPhone(faker.phoneNumber().phoneNumber()).role(null).build();
// }
// }

// }
