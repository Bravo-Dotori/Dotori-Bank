-- Database setup
CREATE DATABASE IF NOT EXISTS testdb
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci;

-- User setup
CREATE USER IF NOT EXISTS 'testuser'@'localhost'
IDENTIFIED BY '1234';

GRANT ALL PRIVILEGES
ON testdb.*
TO 'testuser'@'localhost';

FLUSH PRIVILEGES;

USE testdb;
