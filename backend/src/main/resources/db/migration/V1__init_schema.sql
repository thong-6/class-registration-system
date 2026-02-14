-- =========================
-- SEQUENCES
-- =========================

CREATE SEQUENCE role_seq START 1;
CREATE SEQUENCE user_seq START 1;
CREATE SEQUENCE department_seq START 1;
CREATE SEQUENCE major_seq START 1;
CREATE SEQUENCE curriculum_seq START 1;
CREATE SEQUENCE course_seq START 1;
CREATE SEQUENCE semester_seq START 1;
CREATE SEQUENCE class_section_seq START 1;
CREATE SEQUENCE enrollment_seq START 1;
CREATE SEQUENCE grade_seq START 1;
CREATE SEQUENCE classroom_seq START 1;
CREATE SEQUENCE schedule_seq START 1;
CREATE SEQUENCE announcement_seq START 1;
CREATE SEQUENCE payment_seq START 1;

-- =========================
-- ROLE
-- =========================

CREATE TABLE role (
    id BIGINT PRIMARY KEY DEFAULT nextval('role_seq'),
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- =========================
-- USER
-- =========================

CREATE TABLE users (
    id BIGINT PRIMARY KEY DEFAULT nextval('user_seq'),
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id BIGINT NOT NULL,
    full_name VARCHAR(150),
    date_of_birth DATE,
    gender VARCHAR(20),
    phone VARCHAR(20),
    address VARCHAR(255),

    CONSTRAINT fk_user_role
        FOREIGN KEY (role_id) REFERENCES role(id)
);

-- =========================
-- DEPARTMENT
-- =========================

CREATE TABLE department (
    id BIGINT PRIMARY KEY DEFAULT nextval('department_seq'),
    code VARCHAR(20) UNIQUE,
    name VARCHAR(150) NOT NULL,
    description TEXT
);

-- =========================
-- MAJOR
-- =========================

CREATE TABLE major (
    id BIGINT PRIMARY KEY DEFAULT nextval('major_seq'),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    department_id BIGINT NOT NULL,
    description VARCHAR(255),

    CONSTRAINT fk_major_department
        FOREIGN KEY (department_id) REFERENCES department(id)
);

-- =========================
-- STUDENT (1-1 User)
-- =========================

CREATE TABLE student (
    user_id BIGINT PRIMARY KEY,
    student_code VARCHAR(50) NOT NULL UNIQUE,
    major_id BIGINT NOT NULL,
    gpa NUMERIC(3,2),
    total_credits INT,
    status VARCHAR(50),

    CONSTRAINT fk_student_user
        FOREIGN KEY (user_id) REFERENCES users(id),

    CONSTRAINT fk_student_major
        FOREIGN KEY (major_id) REFERENCES major(id)
);

-- =========================
-- INSTRUCTOR (1-1 User)
-- =========================

CREATE TABLE instructor (
    user_id BIGINT PRIMARY KEY,
    instructor_code VARCHAR(50) NOT NULL UNIQUE,
    department_id BIGINT,
    academic_degree VARCHAR(100),

    CONSTRAINT fk_instructor_user
        FOREIGN KEY (user_id) REFERENCES users(id),

    CONSTRAINT fk_instructor_department
        FOREIGN KEY (department_id) REFERENCES department(id)
);

-- =========================
-- CURRICULUM
-- =========================

CREATE TABLE curriculum (
    id BIGINT PRIMARY KEY DEFAULT nextval('curriculum_seq'),
    name VARCHAR(150) NOT NULL,
    major_id BIGINT NOT NULL,
    total_credits INT,
    duration INT,
    effective_date DATE,

    CONSTRAINT fk_curriculum_major
        FOREIGN KEY (major_id) REFERENCES major(id)
);

-- =========================
-- COURSE
-- =========================

CREATE TABLE course (
    id BIGINT PRIMARY KEY DEFAULT nextval('course_seq'),
    course_code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    credits INT NOT NULL,
    description TEXT,
    learning_outcomes TEXT,
    department_id BIGINT,
    curriculum_id BIGINT,
    prerequisites VARCHAR(255),
    corequisites VARCHAR(255),
    is_active BOOLEAN,

    CONSTRAINT fk_course_department
        FOREIGN KEY (department_id) REFERENCES department(id),

    CONSTRAINT fk_course_curriculum
        FOREIGN KEY (curriculum_id) REFERENCES curriculum(id)
);

-- =========================
-- SEMESTER
-- =========================

CREATE TABLE semester (
    id BIGINT PRIMARY KEY DEFAULT nextval('semester_seq'),
    name VARCHAR(100) NOT NULL,
    year INT,
    term INT,
    start_date DATE,
    end_date DATE,
    registration_start DATE,
    registration_end DATE,
    is_current BOOLEAN,
    is_registration_open BOOLEAN
);

-- =========================
-- CLASS SECTION
-- =========================

CREATE TABLE class_section (
    id BIGINT PRIMARY KEY DEFAULT nextval('class_section_seq'),
    section_code VARCHAR(50) NOT NULL UNIQUE,
    course_id BIGINT,
    semester_id BIGINT,
    instructor_id BIGINT,
    max_students INT,
    current_students INT,
    status VARCHAR(50),
    notes TEXT,

    CONSTRAINT fk_section_course
        FOREIGN KEY (course_id) REFERENCES course(id),

    CONSTRAINT fk_section_semester
        FOREIGN KEY (semester_id) REFERENCES semester(id),

    CONSTRAINT fk_section_instructor
        FOREIGN KEY (instructor_id) REFERENCES instructor(user_id)
);

-- =========================
-- ENROLLMENT
-- =========================

CREATE TABLE enrollment (
    id BIGINT PRIMARY KEY DEFAULT nextval('enrollment_seq'),
    student_id BIGINT,
    class_section_id BIGINT,
    enrollment_date TIMESTAMP,
    status VARCHAR(50),
    final_grade NUMERIC(4,2),
    gpa_credits INT,
    attendance_rate NUMERIC(5,2),

    CONSTRAINT fk_enrollment_student
        FOREIGN KEY (student_id) REFERENCES student(user_id),

    CONSTRAINT fk_enrollment_section
        FOREIGN KEY (class_section_id) REFERENCES class_section(id)
);

-- =========================
-- GRADE
-- =========================

CREATE TABLE grade (
    id BIGINT PRIMARY KEY DEFAULT nextval('grade_seq'),
    enrollment_id BIGINT,
    component VARCHAR(100),
    score NUMERIC(5,2),
    weight NUMERIC(5,2),
    max_score NUMERIC(5,2),
    graded_by BIGINT,
    graded_at TIMESTAMP,
    note TEXT,

    CONSTRAINT fk_grade_enrollment
        FOREIGN KEY (enrollment_id) REFERENCES enrollment(id),

    CONSTRAINT fk_grade_instructor
        FOREIGN KEY (graded_by) REFERENCES instructor(user_id)
);

-- =========================
-- CLASSROOM
-- =========================

CREATE TABLE classroom (
    id BIGINT PRIMARY KEY DEFAULT nextval('classroom_seq'),
    room_number VARCHAR(50),
    building VARCHAR(100),
    capacity INT
);

-- =========================
-- SCHEDULE
-- =========================

CREATE TABLE schedule (
    id BIGINT PRIMARY KEY DEFAULT nextval('schedule_seq'),
    class_section_id BIGINT,
    day_of_week INT,
    period_start INT,
    period_end INT,
    room_id BIGINT,
    week_pattern VARCHAR(50),

    CONSTRAINT fk_schedule_section
        FOREIGN KEY (class_section_id) REFERENCES class_section(id),

    CONSTRAINT fk_schedule_room
        FOREIGN KEY (room_id) REFERENCES classroom(id)
);

-- =========================
-- ANNOUNCEMENT
-- =========================

CREATE TABLE announcement (
    id BIGINT PRIMARY KEY DEFAULT nextval('announcement_seq'),
    title VARCHAR(255),
    content TEXT,
    target_audience VARCHAR(100),
    publish_date TIMESTAMP,
    expire_date TIMESTAMP,
    priority VARCHAR(50),
    created_by BIGINT,

    CONSTRAINT fk_announcement_user
        FOREIGN KEY (created_by) REFERENCES users(id)
);

-- =========================
-- PAYMENT
-- =========================

CREATE TABLE payment (
    id BIGINT PRIMARY KEY DEFAULT nextval('payment_seq'),
    student_id BIGINT,
    semester_id BIGINT,
    amount NUMERIC(12,2),
    description TEXT,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    status VARCHAR(50),
    paid_at TIMESTAMP,

    CONSTRAINT fk_payment_student
        FOREIGN KEY (student_id) REFERENCES student(user_id),

    CONSTRAINT fk_payment_semester
        FOREIGN KEY (semester_id) REFERENCES semester(id)
);
