-- Dotori Bank GCP/MySQL initialization script
-- Usage:
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
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    birth_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
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
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    period_months INT NOT NULL,
    interest_rate DECIMAL(5,3) NOT NULL,
    early_termination_rate DECIMAL(5,3) DEFAULT NULL,
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
    account_type ENUM('demand', 'deposit', 'savings') NOT NULL DEFAULT 'demand',
    balance BIGINT NOT NULL DEFAULT 0,
    transfer_limit BIGINT NOT NULL DEFAULT 3000000,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_accounts_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE user_products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    account_id INT NOT NULL,
    target_amount BIGINT DEFAULT NULL,
    target_period_months INT DEFAULT NULL,
    interest_rate DECIMAL(5,3) NOT NULL,
    join_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    maturity_date DATE DEFAULT NULL,
    status ENUM('ACTIVE', 'MATURED', 'CANCELLED') NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

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
    id INT PRIMARY KEY AUTO_INCREMENT,
    from_account_id INT NOT NULL,
    to_account_id INT DEFAULT NULL,
    type ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'INTEREST', 'CANCEL') NOT NULL,
    amount BIGINT NOT NULL,
    balance_after BIGINT NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
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

CREATE INDEX idx_users_user_id
ON users(user_id);

CREATE INDEX idx_transactions_from_account
ON transactions(from_account_id);

CREATE INDEX idx_transactions_to_account
ON transactions(to_account_id);

CREATE INDEX idx_transactions_date
ON transactions(transaction_at);

-- 예금 상품 목록 조회를 위한 인덱스 추가
CREATE INDEX idx_interests_product_id ON interests(product_id);

-- Required seed data
-- Default password: 1234
INSERT INTO users
    (id, email, user_id, password_hash, name, role, birth_date)
VALUES
    (1, 'admin@example.com', 'admin', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '관리자', 'admin', '1990-01-01');

INSERT INTO products
    (id, product_name, product_code, product_type, product_desc, min_period_months, max_period_months, min_amount, max_amount)
VALUES
    (1, '도토리 입출금통장', 'DOTORI_DEMAND_BASIC', 'demand', '기본 입출금 계좌 상품', 0, 0, 0, 0);

INSERT INTO interests
    (product_id, period_months, interest_rate, early_termination_rate)
VALUES
    (1, 0, 0.100, NULL);

-- Optional dummy data
-- Run this block later only when sample users, accounts, products, and
-- transactions are needed. The required seed above keeps product_id = 1
-- for the demand account product, so the original deposit/savings products
-- are arranged from product_id = 2.

-- Sample users
-- Default password: 1234
INSERT INTO users
    (id, email, user_id, password_hash, name, role, birth_date)
VALUES
    (2, 'yiseul@example.com', 'yiseul', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '김이슬', 'user', '1998-04-12'),
    (3, 'dotorimember@example.com', 'dotori', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '도토리', 'user', '1997-09-20'),
    (4, 'gildong@example.com', 'gildong', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '홍길동', 'user', '1995-03-15'),
    (5, 'minju@example.com', 'minju', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '김민주', 'user', '1996-07-21'),
    (6, 'jo@example.com', 'jo', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '주문국', 'user', '1989-11-02'),
    (7, 'jiwon@example.com', 'jiwon', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '박지원', 'user', '1993-02-10'),
    (8, 'seul@example.com', 'seul', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '김이슬2', 'user', '1999-05-08');

-- Sample products
INSERT INTO products
    (id, product_name, product_code, product_type, product_desc, min_period_months, max_period_months, min_amount, max_amount)
VALUES
    (2, '도토리 정기예금 6개월', 'DOTORI_DEPOSIT_006', 'deposit', '6개월 단기 정기예금 상품', 6, 6, 100000, 10000000),
    (3, '도토리 정기예금 12개월', 'DOTORI_DEPOSIT_012', 'deposit', '12개월 표준 정기예금 상품', 12, 12, 1000000, 50000000),
    (4, '도토리 정기예금 24개월', 'DOTORI_DEPOSIT_024', 'deposit', '24개월 고금리 정기예금 상품', 24, 24, 1000000, 100000000),
    (5, '도토리 자유예금', 'DOTORI_DEPOSIT_FREE', 'deposit', '3개월부터 12개월까지 선택 가능한 예금', 3, 12, 10000, 30000000),
    (6, '도토리 목돈예금', 'DOTORI_DEPOSIT_BIG', 'deposit', '목돈 굴리기에 적합한 예금', 12, 24, 5000000, 200000000),
    (7, '도토리 단기예금', 'DOTORI_DEPOSIT_SHORT', 'deposit', '짧게 운용하는 단기 예금', 3, 6, 100000, 5000000),
    (8, '도토리 안정예금', 'DOTORI_DEPOSIT_STABLE', 'deposit', '안정적인 금리의 예금', 12, 24, 500000, 30000000),
    (9, '도토리 프리미엄예금', 'DOTORI_DEPOSIT_PREMIUM', 'deposit', '고액 가입자용 프리미엄 예금', 24, 24, 10000000, 300000000),
    (10, '도토리 자유적금', 'DOTORI_SAVINGS_FREE', 'savings', '매월 자유롭게 납입하는 적금', 6, 24, 10000, 1000000),
    (11, '도토리 청년적금', 'DOTORI_SAVINGS_YOUTH', 'savings', '청년 고객 대상 적금', 12, 36, 10000, 500000);

-- Sample interest rates
INSERT INTO interests
    (product_id, period_months, interest_rate, early_termination_rate)
VALUES
    (2, 6, 3.100, 1.550),
    (3, 12, 3.800, 1.900),
    (4, 24, 4.300, 2.150),
    (5, 3, 2.600, 1.300),
    (5, 6, 2.900, 1.450),
    (5, 12, 3.100, 1.550),
    (6, 12, 4.000, 2.000),
    (6, 24, 4.400, 2.200),
    (7, 3, 2.400, 1.200),
    (7, 6, 2.700, 1.350),
    (8, 12, 3.900, 1.950),
    (8, 24, 4.100, 2.050),
    (9, 24, 4.500, 2.250),
    (10, 6, 2.000, 1.000),
    (10, 12, 2.300, 1.150),
    (10, 24, 2.600, 1.300),
    (11, 12, 3.000, 1.500),
    (11, 24, 3.300, 1.650),
    (11, 36, 3.600, 1.800);

-- Sample accounts
INSERT INTO accounts
    (id, user_id, account_number, account_type, balance, transfer_limit, is_admin, is_active)
VALUES
    (1, 1, '100-0000-000000', 'demand', 100000000, 100000000, TRUE, TRUE),
    (2, 2, '100-1111-111111', 'demand', 3000000, 3000000, FALSE, TRUE),
    (3, 3, '100-2222-222222', 'demand', 5000000, 3000000, FALSE, TRUE),
    (4, 4, '100-6078-719420', 'demand', 2700000, 3000000, FALSE, TRUE),
    (5, 4, '100-2291-778306', 'deposit', 100000, 3000000, FALSE, TRUE),
    (6, 4, '100-9443-570314', 'deposit', 100000, 3000000, FALSE, TRUE),
    (7, 4, '100-4123-475145', 'deposit', 100000, 3000000, FALSE, TRUE),
    (8, 5, '1234-56-789012', 'demand', 3000000, 3000000, FALSE, TRUE),
    (9, 6, '987-65-432109', 'demand', 50000, 3000000, FALSE, FALSE),
    (10, 7, '555-12-345678', 'demand', 15000000, 3000000, FALSE, TRUE),
    (11, 8, '444-55-667788', 'demand', 9500000, 3000000, FALSE, TRUE),
    (12, 8, '333-22-111000', 'deposit', 9500000, 3000000, FALSE, FALSE);

-- Sample user product subscriptions
INSERT INTO user_products
    (product_id, user_id, account_id, target_amount, target_period_months, interest_rate, join_date, maturity_date, status)
VALUES
    (1, 1, 1, 100000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
    (1, 2, 2, 3000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
    (1, 3, 3, 5000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
    (1, 4, 4, 3000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
    (2, 4, 5, 100000, 6, 3.100, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 'ACTIVE'),
    (2, 4, 6, 100000, 6, 3.100, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 'ACTIVE'),
    (2, 4, 7, 100000, 6, 3.100, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 'ACTIVE'),
    (1, 5, 8, 3000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
    (1, 6, 9, 50000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
    (1, 7, 10, 15000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
    (1, 8, 11, 9500000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
    (3, 8, 12, 9500000, 12, 3.800, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 12 MONTH), 'ACTIVE');

-- Sample transactions
INSERT INTO transactions
    (from_account_id, to_account_id, type, amount, balance_after, description, is_suspicious)
VALUES
    (1, 2, 'TRANSFER', 3000000, 97000000, '초기 입출금 계좌 지급', FALSE),
    (1, 3, 'TRANSFER', 5000000, 92000000, '초기 입출금 계좌 지급', FALSE),
    (1, 8, 'TRANSFER', 3000000, 89000000, '가입 축하금', FALSE),
    (8, 9, 'TRANSFER', 50000, 2950000, '계좌 이체', FALSE),
    (10, 11, 'TRANSFER', 15000000, 0, '고액 이체', TRUE),
    (11, 12, 'DEPOSIT', 9500000, 0, '예금 가입', TRUE),
    (4, 5, 'DEPOSIT', 100000, 2600000, '예금 가입', FALSE),
    (4, 6, 'DEPOSIT', 100000, 2500000, '예금 가입', FALSE),
    (4, 7, 'DEPOSIT', 100000, 2400000, '예금 가입', FALSE);
