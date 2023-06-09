CREATE TABLE login_attempts (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('success', 'fail') NOT NULL
);