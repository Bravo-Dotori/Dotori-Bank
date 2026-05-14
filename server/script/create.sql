-- 데이터베이스 생성
CREATE DATABASE bank_db
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci;

-- 사용자 생성
CREATE USER 'testuser'@'localhost'
IDENTIFIED BY '1234';

-- 권한 부여
GRANT ALL PRIVILEGES
ON testdb.*
TO 'testuser'@'localhost';

FLUSH PRIVILEGES;

-- DB 선택
USE testdb;
