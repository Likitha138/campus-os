-- =========================================================
-- CAMPUS OS DATABASE
-- =========================================================

CREATE DATABASE IF NOT EXISTS campus_os;

USE campus_os;


-- =========================================================
-- USERS
-- =========================================================

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    student_id VARCHAR(50) UNIQUE NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    role ENUM('student', 'admin')
        NOT NULL DEFAULT 'student',

    department VARCHAR(100) NULL,

    phone VARCHAR(20) NULL,

    profile_image VARCHAR(500) NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- =========================================================
-- ATTENDANCE
-- =========================================================

CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    subject VARCHAR(150) NOT NULL,

    attendance_date DATE NOT NULL,

    status ENUM(
        'present',
        'absent',
        'late'
    ) NOT NULL DEFAULT 'present',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    INDEX idx_attendance_user_id (user_id),

    INDEX idx_attendance_date (attendance_date)
);


-- =========================================================
-- MARKS
-- =========================================================

CREATE TABLE IF NOT EXISTS marks (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    subject VARCHAR(150) NOT NULL,

    exam_type VARCHAR(100) NOT NULL,

    marks_obtained DECIMAL(6,2) NOT NULL DEFAULT 0,

    total_marks DECIMAL(6,2) NOT NULL DEFAULT 100,

    grade VARCHAR(5) NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    INDEX idx_marks_user_id (user_id)
);


-- =========================================================
-- ASSIGNMENTS
-- =========================================================

CREATE TABLE IF NOT EXISTS assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    subject VARCHAR(150) NOT NULL,

    title VARCHAR(200) NOT NULL,

    description TEXT NULL,

    due_date DATE NOT NULL,

    status ENUM(
        'pending',
        'submitted',
        'overdue'
    ) NOT NULL DEFAULT 'pending',

    submitted_at TIMESTAMP NULL DEFAULT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    INDEX idx_assignments_user_id (user_id),

    INDEX idx_assignments_due_date (due_date)
);


-- =========================================================
-- EVENTS
-- =========================================================

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(200) NOT NULL,

    description TEXT NULL,

    location VARCHAR(200) NULL,

    event_date DATE NULL,

    start_time TIME NULL,

    end_time TIME NULL,

    category VARCHAR(100) NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- ALERTS
-- =========================================================

CREATE TABLE IF NOT EXISTS alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(200) NOT NULL,

    message TEXT NOT NULL,

    severity ENUM(
        'low',
        'medium',
        'high',
        'critical'
    ) NOT NULL DEFAULT 'medium',

    target_role ENUM(
        'all',
        'student',
        'admin'
    ) NOT NULL DEFAULT 'all',

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- NOTIFICATIONS
-- =========================================================

CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NULL,

    title VARCHAR(200) NOT NULL,

    message TEXT NOT NULL,

    type VARCHAR(50) DEFAULT 'general',

    is_read BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- =========================================================
-- BUILDINGS
-- =========================================================

CREATE TABLE IF NOT EXISTS buildings (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    code VARCHAR(50) NULL,

    description TEXT NULL,

    latitude DECIMAL(10,7) NULL,

    longitude DECIMAL(10,7) NULL,

    floors INT DEFAULT 1,

    capacity INT DEFAULT 0,

    status ENUM(
        'active',
        'maintenance',
        'closed'
    ) NOT NULL DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- ROOMS
-- =========================================================

CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,

    building_id INT NOT NULL,

    room_number VARCHAR(50) NOT NULL,

    room_type VARCHAR(100) NULL,

    capacity INT DEFAULT 0,

    status ENUM(
        'available',
        'occupied',
        'maintenance'
    ) NOT NULL DEFAULT 'available',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (building_id)
        REFERENCES buildings(id)
        ON DELETE CASCADE
);


-- =========================================================
-- BOOKINGS
-- =========================================================

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    room_id INT NOT NULL,

    booking_date DATE NOT NULL,

    start_time TIME NOT NULL,

    end_time TIME NOT NULL,

    purpose VARCHAR(255) NULL,

    status ENUM(
        'pending',
        'approved',
        'rejected',
        'cancelled'
    ) NOT NULL DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (room_id)
        REFERENCES rooms(id)
        ON DELETE CASCADE
);


-- =========================================================
-- TRAFFIC
-- =========================================================

CREATE TABLE IF NOT EXISTS traffic (
    id INT AUTO_INCREMENT PRIMARY KEY,

    zone VARCHAR(100) NOT NULL,

    traffic_level ENUM(
        'low',
        'moderate',
        'high',
        'critical'
    ) NOT NULL DEFAULT 'low',

    vehicle_count INT DEFAULT 0,

    average_speed DECIMAL(6,2) DEFAULT 0,

    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- ACTIVITY
-- =========================================================

CREATE TABLE IF NOT EXISTS activity (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NULL,

    activity_type VARCHAR(100) NOT NULL,

    description TEXT NULL,

    metadata JSON NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);


-- =========================================================
-- VEHICLES
-- =========================================================

CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,

    vehicle_id VARCHAR(50) NOT NULL UNIQUE,

    vehicle_type ENUM(
        'car',
        'bus',
        'bike',
        'other'
    ) NOT NULL DEFAULT 'car',

    plate_number VARCHAR(50) NULL,

    zone VARCHAR(100) NULL,

    latitude DECIMAL(10,7) NULL,

    longitude DECIMAL(10,7) NULL,

    speed DECIMAL(6,2) DEFAULT 0,

    direction VARCHAR(50) NULL,

    traffic_status VARCHAR(50) NULL,

    movement_status ENUM(
        'moving',
        'stopped'
    ) NOT NULL DEFAULT 'stopped',

    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- =========================================================
-- DASHBOARD STATISTICS
-- =========================================================

CREATE TABLE IF NOT EXISTS dashboard_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,

    stat_name VARCHAR(100) NOT NULL UNIQUE,

    stat_value DECIMAL(12,2) DEFAULT 0,

    description VARCHAR(255) NULL,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);