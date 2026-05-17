-- Dotori Bank GCP/MySQL 초기 세팅 스크립트
-- 실행 예시:
-- mysql -u root -p < init_gcp.sql
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS user_products;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS interests;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

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

CREATE TABLE products (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    product_code VARCHAR(100) NOT NULL UNIQUE,
    product_type ENUM('demand', 'deposit', 'savings') NOT NULL,
    product_desc TEXT DEFAULT NULL,
    min_period_months INT DEFAULT NULL,
    max_period_months INT DEFAULT NULL,
    min_amount BIGINT DEFAULT NULL,
    max_amount BIGINT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE interests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    period_months INT NOT NULL,
    interest_rate DECIMAL(5,3) NOT NULL,
    early_termination_rate DECIMAL(5,3) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_interests_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

CREATE TABLE accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    account_number VARCHAR(30) NOT NULL UNIQUE,
    account_type ENUM('demand', 'deposit', 'savings') DEFAULT 'demand',
    balance BIGINT DEFAULT 0,
    transfer_limit BIGINT DEFAULT 3000000,
    is_admin BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_accounts_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_accounts_user_id
ON accounts(user_id);

CREATE TABLE user_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    account_id INT NOT NULL,
    target_amount BIGINT NOT NULL,
    target_period_months INT,
    interest_rate DECIMAL(5,3) NOT NULL,
    join_date DATE NOT NULL,
    maturity_date DATE,
    status ENUM('ACTIVE', 'MATURED', 'CANCELLED') NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_products_product
        FOREIGN KEY (product_id)
        REFERENCES products(id),

    CONSTRAINT fk_user_products_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_user_products_account
        FOREIGN KEY (account_id)
        REFERENCES accounts(id)
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_account_id INT NOT NULL,
    to_account_id INT NULL,
    type ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'INTEREST', 'CANCEL') NOT NULL,
    amount BIGINT NOT NULL,
    balance_after BIGINT NOT NULL,
    description VARCHAR(255) NULL,
    is_suspicious BOOLEAN NOT NULL DEFAULT FALSE,
    transaction_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_transactions_from_account
        FOREIGN KEY (from_account_id)
        REFERENCES accounts(id),

    CONSTRAINT fk_transactions_to_account
        FOREIGN KEY (to_account_id)
        REFERENCES accounts(id)
);

CREATE INDEX idx_transactions_from_account
ON transactions(from_account_id);

CREATE INDEX idx_transactions_to_account
ON transactions(to_account_id);

CREATE INDEX idx_transactions_date
ON transactions(transaction_at);

-- 비밀번호는 모두 1234
INSERT INTO users
(id, email, user_id, password_hash, name, role, birth_date)
VALUES
(1, 'yiseul@example.com', 'yiseul', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '김이슬', 'user', '1998-04-12'),
(2, 'dotorimember@example.com', 'dotori', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '도토리', 'user', '1997-09-20'),
(3, 'admin@example.com', 'admin', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '관리자', 'admin', '1990-01-01');

INSERT INTO products
(id, product_name, product_code, product_type, product_desc, min_period_months, max_period_months, min_amount, max_amount)
VALUES
(1, '도토리 정기예금 6개월', 'DOTORI_DEPOSIT_006', 'deposit', '6개월 단기 정기예금 상품', 6, 6, 100000, 10000000),
(2, '도토리 정기예금 12개월', 'DOTORI_DEPOSIT_012', 'deposit', '12개월 표준 정기예금 상품', 12, 12, 1000000, 50000000),
(3, '도토리 정기예금 24개월', 'DOTORI_DEPOSIT_024', 'deposit', '24개월 고금리 정기예금 상품', 24, 24, 1000000, 100000000),
(4, '도토리 자유예금', 'DOTORI_DEPOSIT_FREE', 'deposit', '3개월부터 12개월까지 선택 가능한 예금', 3, 12, 10000, 30000000),
(5, '도토리 목돈예금', 'DOTORI_DEPOSIT_BIG', 'deposit', '목돈 굴리기에 적합한 예금', 12, 24, 5000000, 200000000),
(6, '도토리 단기예금', 'DOTORI_DEPOSIT_SHORT', 'deposit', '짧게 운용하는 단기 예금', 3, 6, 100000, 5000000),
(7, '도토리 안정예금', 'DOTORI_DEPOSIT_STABLE', 'deposit', '안정적인 금리의 예금', 12, 24, 500000, 30000000),
(8, '도토리 프리미엄예금', 'DOTORI_DEPOSIT_PREMIUM', 'deposit', '고액 가입자용 프리미엄 예금', 24, 24, 10000000, 300000000),
(9, '도토리 자유적금', 'DOTORI_SAVINGS_FREE', 'savings', '매월 자유롭게 납입하는 적금', 6, 24, 10000, 1000000),
(10, '도토리 청년적금', 'DOTORI_SAVINGS_YOUTH', 'savings', '청년 고객 대상 적금', 12, 36, 10000, 500000),
(11, '도토리 입출금통장', 'DOTORI_DEMAND_BASIC', 'demand', '기본 입출금 계좌 상품', 0, 0, 0, 0);

INSERT INTO interests
(product_id, period_months, interest_rate, early_termination_rate)
VALUES
(1, 6, 3.100, 1.550),
(2, 12, 3.800, 1.900),
(3, 24, 4.300, 2.150),
(4, 3, 2.600, 1.300),
(4, 6, 2.900, 1.450),
(4, 12, 3.100, 1.550),
(5, 12, 4.000, 2.000),
(5, 24, 4.400, 2.200),
(6, 3, 2.400, 1.200),
(6, 6, 2.700, 1.350),
(7, 12, 3.900, 1.950),
(7, 24, 4.100, 2.050),
(8, 24, 4.500, 2.250),
(9, 6, 2.000, 1.000),
(9, 12, 2.300, 1.150),
(9, 24, 2.600, 1.300),
(10, 12, 3.000, 1.500),
(10, 24, 3.300, 1.650),
(10, 36, 3.600, 1.800),
(11, 0, 0.100, NULL);

INSERT INTO accounts
(id, user_id, account_number, account_type, balance, transfer_limit, is_admin, is_active)
VALUES
(1, 1, '100-1111-111111', 'demand', 3000000, 3000000, FALSE, TRUE),
(2, 2, '100-2222-222222', 'demand', 5000000, 3000000, FALSE, TRUE),
(3, 3, '100-0000-000000', 'demand', 100000000, 100000000, TRUE, TRUE);

INSERT INTO user_products
(product_id, user_id, account_id, target_amount, target_period_months, interest_rate, join_date, maturity_date, status)
VALUES
(11, 1, 1, 3000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
(11, 2, 2, 5000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
(11, 3, 3, 100000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE');

INSERT INTO transactions
(from_account_id, to_account_id, type, amount, balance_after, description)
VALUES
(3, 1, 'TRANSFER', 3000000, 97000000, '초기 입출금 계좌 지급'),
(3, 2, 'TRANSFER', 5000000, 92000000, '초기 입출금 계좌 지급');
