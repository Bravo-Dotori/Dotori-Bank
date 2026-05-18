CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_id VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(50) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    birth_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Password is 1234 for all seed users.
INSERT INTO users
(id, email, user_id, password_hash, name, role, birth_date)
VALUES
(1, 'yiseul@example.com', 'yiseul', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '김이슬', 'user', '1998-04-12'),
(2, 'dotorimember@example.com', 'dotori', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '도토리', 'user', '1997-09-20'),
(3, 'admin@example.com', 'admin', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '관리자', 'admin', '1990-01-01');
