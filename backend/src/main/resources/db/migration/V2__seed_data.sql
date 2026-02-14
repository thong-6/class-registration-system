-- =========================
-- XÓA DỮ LIỆU CŨ (RESET)
-- =========================
-- Xóa theo thứ tự từ bảng con đến bảng cha để tránh vi phạm khóa ngoại
TRUNCATE TABLE payment RESTART IDENTITY CASCADE;
TRUNCATE TABLE announcement RESTART IDENTITY CASCADE;
TRUNCATE TABLE grade RESTART IDENTITY CASCADE;
TRUNCATE TABLE schedule RESTART IDENTITY CASCADE;
TRUNCATE TABLE enrollment RESTART IDENTITY CASCADE;
TRUNCATE TABLE class_section RESTART IDENTITY CASCADE;
TRUNCATE TABLE semester RESTART IDENTITY CASCADE;
TRUNCATE TABLE course RESTART IDENTITY CASCADE;
TRUNCATE TABLE curriculum RESTART IDENTITY CASCADE;
TRUNCATE TABLE instructor RESTART IDENTITY CASCADE;
TRUNCATE TABLE student RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;
TRUNCATE TABLE major RESTART IDENTITY CASCADE;
TRUNCATE TABLE department RESTART IDENTITY CASCADE;
TRUNCATE TABLE role RESTART IDENTITY CASCADE;
TRUNCATE TABLE classroom RESTART IDENTITY CASCADE;

-- =========================
-- INSERT DỮ LIỆU MẪU
-- =========================

-- 1. ROLE
INSERT INTO role (role_name) VALUES
    ('Admin'),
    ('Instructor'),
    ('Student');

-- 2. DEPARTMENT
INSERT INTO department (code, name, description) VALUES
    ('CNTT', 'Công nghệ thông tin', 'Khoa Công nghệ thông tin - Đại học XYZ'),
    ('KT', 'Kinh tế', 'Khoa Kinh tế - Quản lý'),
    ('NN', 'Ngoại ngữ', 'Khoa Ngoại ngữ');

-- 3. USERS
-- Mật khẩu đã được hash giả (dùng cho mục đích test)
INSERT INTO users (username, email, password, role_id, full_name, date_of_birth, gender, phone, address) VALUES
    ('admin', 'admin@school.edu', '$2a$10$hashed_admin_password', 1, 'Admin', '1980-01-01', 'Nam', '0901111111', 'VP Khoa CNTT'),
    ('ins1', 'instructor1@school.edu', '$2a$10$hashed_ins1', 2, 'Nguyễn Văn A', '1985-05-10', 'Nam', '0902222222', 'Khoa CNTT'),
    ('ins2', 'instructor2@school.edu', '$2a$10$hashed_ins2', 2, 'Trần Thị B', '1990-08-15', 'Nữ', '0903333333', 'Khoa Kinh tế'),
    ('stu1', 'student1@school.edu', '$2a$10$hashed_stu1', 3, 'Lê Văn C', '2003-02-20', 'Nam', '0904444444', 'Ký túc xá A'),
    ('stu2', 'student2@school.edu', '$2a$10$hashed_stu2', 3, 'Phạm Thị D', '2004-07-12', 'Nữ', '0905555555', 'Ký túc xá B'),
    ('stu3', 'student3@school.edu', '$2a$10$hashed_stu3', 3, 'Hoàng Văn E', '2003-11-30', 'Nam', '0906666666', 'Nhà trọ số 5'),
    ('stu4', 'student4@school.edu', '$2a$10$hashed_stu4', 3, 'Ngô Thị F', '2004-09-05', 'Nữ', '0907777777', 'Nhà trọ số 10');

-- 4. MAJOR
INSERT INTO major (code, name, department_id, description) VALUES
    ('KHMT', 'Khoa học máy tính', 1, 'Chuyên ngành Khoa học máy tính'),
    ('HTTT', 'Hệ thống thông tin', 1, 'Chuyên ngành Hệ thống thông tin'),
    ('QTKD', 'Quản trị kinh doanh', 2, 'Chuyên ngành Quản trị kinh doanh'),
    ('TCNH', 'Tài chính ngân hàng', 2, 'Chuyên ngành Tài chính ngân hàng'),
    ('NNA', 'Ngôn ngữ Anh', 3, 'Chuyên ngành Ngôn ngữ Anh');

-- 5. STUDENT
INSERT INTO student (user_id, student_code, major_id, gpa, total_credits, status) VALUES
    (4, 'SV001', 1, 3.45, 45, 'Đang học'),
    (5, 'SV002', 3, 3.20, 30, 'Đang học'),
    (6, 'SV003', 2, 2.90, 20, 'Đang học'),
    (7, 'SV004', 4, 3.60, 35, 'Đang học');

-- 6. INSTRUCTOR
INSERT INTO instructor (user_id, instructor_code, department_id, academic_degree) VALUES
    (2, 'GV001', 1, 'Thạc sĩ'),
    (3, 'GV002', 2, 'Tiến sĩ');

-- 7. CURRICULUM
INSERT INTO curriculum (name, major_id, total_credits, duration, effective_date) VALUES
    ('CTDT KHMT 2021', 1, 140, 4, '2021-09-01'),
    ('CTDT HTTT 2021', 2, 138, 4, '2021-09-01'),
    ('CTDT QTKD 2021', 3, 130, 4, '2021-09-01'),
    ('CTDT TCNH 2021', 4, 132, 4, '2021-09-01'),
    ('CTDT NNA 2021', 5, 125, 4, '2021-09-01');

-- 8. COURSE
INSERT INTO course (course_code, name, credits, description, department_id, curriculum_id, prerequisites, corequisites, is_active) VALUES
    ('IT101', 'Lập trình C', 3, 'Nhập môn lập trình với C', 1, 1, NULL, NULL, TRUE),
    ('IT102', 'Cấu trúc dữ liệu', 3, 'Các cấu trúc dữ liệu cơ bản', 1, 1, 'IT101', NULL, TRUE),
    ('IT103', 'Cơ sở dữ liệu', 3, 'Thiết kế và truy vấn CSDL', 1, 2, NULL, NULL, TRUE),
    ('EC101', 'Kinh tế vi mô', 3, 'Nguyên lý kinh tế vi mô', 2, 3, NULL, NULL, TRUE),
    ('EC102', 'Nguyên lý kế toán', 3, 'Nhập môn kế toán', 2, 3, NULL, NULL, TRUE),
    ('FL101', 'Tiếng Anh cơ bản', 4, 'Kỹ năng tiếng Anh tổng quát', 3, 5, NULL, NULL, TRUE),
    ('FL102', 'Tiếng Anh chuyên ngành', 3, 'Tiếng Anh cho kinh tế', 3, 5, 'FL101', NULL, TRUE);

-- 9. SEMESTER
INSERT INTO semester (name, year, term, start_date, end_date, registration_start, registration_end, is_current, is_registration_open) VALUES
    ('Học kỳ 1 2023-2024', 2023, 1, '2023-09-01', '2023-12-31', '2023-08-01', '2023-08-31', FALSE, FALSE),
    ('Học kỳ 2 2023-2024', 2024, 2, '2024-01-15', '2024-05-15', '2023-12-01', '2023-12-31', FALSE, FALSE),
    ('Học kỳ 1 2024-2025', 2024, 1, '2024-09-01', '2024-12-31', '2024-08-01', '2024-08-31', TRUE, TRUE);

-- 10. CLASS SECTION
INSERT INTO class_section (section_code, course_id, semester_id, instructor_id, max_students, current_students, status, notes) VALUES
    ('IT101-01', 1, 3, 2, 50, 40, 'Đang mở', 'Lớp C sáng thứ 2'),
    ('IT102-01', 2, 3, 2, 40, 35, 'Đang mở', 'Lớp chiều thứ 4'),
    ('IT103-01', 3, 3, 2, 45, 20, 'Đang mở', 'Lớp tối thứ 6'),
    ('EC101-01', 4, 3, 3, 60, 55, 'Đang mở', 'Lớp sáng thứ 3'),
    ('FL101-01', 6, 3, NULL, 30, 25, 'Đang mở', 'Chưa có GV');

-- 11. ENROLLMENT
INSERT INTO enrollment (student_id, class_section_id, enrollment_date, status, final_grade, gpa_credits, attendance_rate) VALUES
    (4, 1, '2024-08-10 10:30:00', 'Đã đăng ký', NULL, NULL, NULL),
    (4, 2, '2024-08-10 10:35:00', 'Đã đăng ký', NULL, NULL, NULL),
    (5, 4, '2024-08-11 09:00:00', 'Đã đăng ký', NULL, NULL, NULL),
    (6, 1, '2024-08-12 14:20:00', 'Đã đăng ký', NULL, NULL, NULL),
    (6, 3, '2024-08-12 14:25:00', 'Đã đăng ký', NULL, NULL, NULL),
    (7, 4, '2024-08-13 08:15:00', 'Đã đăng ký', NULL, NULL, NULL),
    (7, 5, '2024-08-13 08:20:00', 'Đã đăng ký', NULL, NULL, NULL);

-- 12. GRADE
INSERT INTO grade (enrollment_id, component, score, weight, max_score, graded_by, graded_at, note) VALUES
    (1, 'Giữa kỳ', 8.5, 0.3, 10, 2, '2024-10-20 14:00:00', NULL),
    (1, 'Cuối kỳ', 7.5, 0.5, 10, 2, '2024-12-15 09:00:00', NULL),
    (1, 'Bài tập', 9.0, 0.2, 10, 2, '2024-12-10 11:30:00', NULL),
    (3, 'Giữa kỳ', 6.0, 0.4, 10, 3, '2024-10-18 10:00:00', NULL),
    (3, 'Cuối kỳ', 7.0, 0.6, 10, 3, '2024-12-12 13:00:00', NULL);

-- 13. CLASSROOM
INSERT INTO classroom (room_number, building, capacity) VALUES
    ('A101', 'A', 60),
    ('A102', 'A', 40),
    ('B201', 'B', 50);

-- 14. SCHEDULE
INSERT INTO schedule (class_section_id, day_of_week, period_start, period_end, room_id, week_pattern) VALUES
    (1, 2, 1, 3, 1, 'Hàng tuần'),
    (2, 4, 4, 6, 2, 'Hàng tuần'),
    (3, 6, 7, 9, 3, 'Hàng tuần'),
    (4, 3, 1, 3, 1, 'Hàng tuần'),
    (5, 5, 4, 6, 2, 'Hàng tuần');

-- 15. ANNOUNCEMENT
INSERT INTO announcement (title, content, target_audience, publish_date, expire_date, priority, created_by) VALUES
    ('Khai giảng học kỳ mới', 'Thông báo lịch khai giảng học kỳ 1 năm 2024-2025', 'Sinh viên', '2024-08-15 08:00:00', '2024-09-15 23:59:59', 'Cao', 1),
    ('Đăng ký học phần', 'Thời gian đăng ký học phần từ 01/08 đến 31/08', 'Sinh viên', '2024-07-20 09:30:00', '2024-09-01 23:59:59', 'Trung bình', 1),
    ('Họp khoa CNTT', 'Họp toàn thể giảng viên khoa CNTT', 'Giảng viên', '2024-08-25 10:00:00', '2024-08-30 17:00:00', 'Thấp', 1);

-- 16. PAYMENT
INSERT INTO payment (student_id, semester_id, amount, description, payment_method, transaction_id, status, paid_at) VALUES
    (4, 3, 5000000, 'Học phí HK1 2024-2025', 'Chuyển khoản', 'TXN123456', 'Đã thanh toán', '2024-08-05 11:20:00'),
    (5, 3, 5500000, 'Học phí HK1 2024-2025', 'Tiền mặt', NULL, 'Chưa thanh toán', NULL),
    (6, 3, 4800000, 'Học phí HK1 2024-2025', 'Chuyển khoản', 'TXN789012', 'Đã thanh toán', '2024-08-07 14:45:00'),
    (7, 3, 5300000, 'Học phí HK1 2024-2025', 'Chuyển khoản', 'TXN345678', 'Đã thanh toán', '2024-08-10 09:10:00');