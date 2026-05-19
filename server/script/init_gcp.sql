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
    target_amount BIGINT,
    target_period_months INT,
    interest_rate DECIMAL(3,2) NOT NULL,
    join_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    maturity_date DATE,
    status ENUM('ACTIVE', 'MATURED', 'CANCELLED')
        NOT NULL
        DEFAULT 'ACTIVE',
    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

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
(1, 'admin@example.com', 'admin', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '관리자', 'admin', '1990-01-01'),
(2, 'yiseul@example.com', 'yiseul', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '김이슬', 'user', '1998-04-12'),
(3, 'dotorimember@example.com', 'dotori', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '도토리', 'user', '1997-09-20'),
(4, 'gildong@example.com', 'gildong', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '홍길동', 'user', '1995-03-15'),
(5, 'minju@example.com', 'minju', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '김민주', 'user', '1996-07-21'),
(6, 'jo@example.com', 'jo', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '주문국', 'user', '1989-11-02'),
(7, 'jiwon@example.com', 'jiwon', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '박지원', 'user', '1993-02-10'),
(8, 'seul@example.com', 'seul', '$2b$10$0djZ8Gb1/LyGkP6YxCGlHOvP990dost3JQxGhhVG4U5zFLaM4lMN6', '김이슬2', 'user', '1999-05-08');

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

INSERT INTO user_products
(product_id, user_id, account_id, target_amount, target_period_months, interest_rate, join_date, maturity_date, status)
VALUES
(11, 1, 1, 100000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
(11, 2, 2, 3000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
(11, 3, 3, 5000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
(11, 4, 4, 3000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
(1, 4, 5, 100000, 6, 3.100, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 'ACTIVE'),
(1, 4, 6, 100000, 6, 3.100, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 'ACTIVE'),
(1, 4, 7, 100000, 6, 3.100, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 'ACTIVE'),
(11, 5, 8, 3000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
(11, 6, 9, 50000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
(11, 7, 10, 15000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
(11, 8, 11, 9500000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
(2, 8, 12, 9500000, 12, 3.800, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 12 MONTH), 'ACTIVE');

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


INSERT INTO products
(id, product_name, product_code, product_type, product_desc, min_period_months, max_period_months, min_amount, max_amount)
VALUES
(1, '기본 입출금통장', 'DEMAND_BASIC_001', 'demand', '일상적인 입출금 거래를 위한 기본 계좌 상품', 0, 0, 0, 0),

(2, '스마트 정기예금', 'DEPOSIT_SMART_001', 'deposit', '비대면 가입 고객을 위한 표준 정기예금 상품', 3, 12, 100000, 30000000),
(3, '프라임 정기예금', 'DEPOSIT_PRIME_001', 'deposit', '안정적인 목돈 운용을 위한 대표 정기예금 상품', 6, 24, 1000000, 100000000),
(4, '세이프 정기예금', 'DEPOSIT_SAFE_001', 'deposit', '원금 보전을 중시하는 고객을 위한 안정형 정기예금', 3, 18, 500000, 50000000),
(5, '플러스 정기예금', 'DEPOSIT_PLUS_001', 'deposit', '기간별 금리 혜택을 제공하는 정기예금 상품', 6, 36, 1000000, 200000000),
(6, '우대금리 정기예금', 'DEPOSIT_PREFERRED_001', 'deposit', '조건 충족 시 우대금리를 기대할 수 있는 정기예금', 12, 36, 1000000, 100000000),
(7, '목돈관리 정기예금', 'DEPOSIT_LUMP_001', 'deposit', '목돈을 일정 기간 안정적으로 예치하는 상품', 3, 24, 3000000, 300000000),
(8, '안심 정기예금', 'DEPOSIT_SECURE_001', 'deposit', '예치 기간을 선택해 안정적으로 운용하는 정기예금', 6, 18, 100000, 50000000),
(9, '프리미엄 정기예금', 'DEPOSIT_PREMIUM_001', 'deposit', '고액 예치 고객을 위한 프리미엄 정기예금', 12, 36, 10000000, 500000000),
(10, '하이브리드 정기예금', 'DEPOSIT_HYBRID_001', 'deposit', '중단기 운용에 적합한 금리형 정기예금', 3, 15, 500000, 80000000),

(11, '든든 정기예금', 'DEPOSIT_STABLE_001', 'deposit', '생활자금과 여유자금을 안정적으로 분리 운용하는 예금', 6, 24, 1000000, 150000000),
(12, '미래설계 정기예금', 'DEPOSIT_FUTURE_001', 'deposit', '중장기 자금 계획을 위한 정기예금 상품', 12, 36, 1000000, 200000000),
(13, '자산관리 정기예금', 'DEPOSIT_ASSET_001', 'deposit', '자산 포트폴리오의 안정성을 높이는 예금 상품', 6, 30, 5000000, 300000000),
(14, '밸런스 정기예금', 'DEPOSIT_BALANCE_001', 'deposit', '기간과 금리의 균형을 고려한 정기예금', 3, 24, 500000, 100000000),
(15, '시그니처 정기예금', 'DEPOSIT_SIGNATURE_001', 'deposit', '주요 고객을 위한 대표 정기예금 상품', 12, 36, 5000000, 500000000),
(16, '온택트 정기예금', 'DEPOSIT_ONTACT_001', 'deposit', '온라인 가입에 최적화된 비대면 정기예금', 3, 18, 100000, 50000000),
(17, '웰컴 정기예금', 'DEPOSIT_WELCOME_001', 'deposit', '신규 고객의 첫 목돈 운용을 위한 정기예금', 6, 24, 100000, 30000000),
(18, '더드림 정기예금', 'DEPOSIT_DREAM_001', 'deposit', '목표 자금 마련을 돕는 안정형 정기예금', 6, 36, 500000, 100000000),
(19, '마이플랜 정기예금', 'DEPOSIT_MYPLAN_001', 'deposit', '고객의 예치 계획에 맞춰 기간을 선택하는 정기예금', 3, 30, 100000, 150000000),
(20, '골든 정기예금', 'DEPOSIT_GOLDEN_001', 'deposit', '장기 예치 고객에게 적합한 고금리형 정기예금', 12, 36, 1000000, 300000000),

(21, '리워드 정기예금', 'DEPOSIT_REWARD_001', 'deposit', '예치 기간에 따라 금리 혜택을 제공하는 정기예금', 6, 30, 1000000, 200000000),
(22, '클래식 정기예금', 'DEPOSIT_CLASSIC_001', 'deposit', '기본에 충실한 표준형 정기예금 상품', 3, 12, 100000, 50000000),
(23, '스텝업 정기예금', 'DEPOSIT_STEPUP_001', 'deposit', '기간이 길수록 금리 매력이 커지는 정기예금', 6, 36, 1000000, 250000000),
(24, '노블 정기예금', 'DEPOSIT_NOBLE_001', 'deposit', '고액 자산 고객을 위한 안정 운용 정기예금', 12, 36, 20000000, 700000000),
(25, '이지 정기예금', 'DEPOSIT_EASY_001', 'deposit', '간편하게 가입하고 관리하는 정기예금 상품', 3, 18, 100000, 30000000),
(26, '세이브 정기예금', 'DEPOSIT_SAVE_001', 'deposit', '여유자금을 안정적으로 보관하는 정기예금', 6, 24, 500000, 100000000),
(27, '올라운드 정기예금', 'DEPOSIT_ALLROUND_001', 'deposit', '다양한 기간 선택이 가능한 범용 정기예금', 3, 36, 100000, 200000000),
(28, '베이직 정기예금', 'DEPOSIT_BASIC_001', 'deposit', '누구나 쉽게 가입할 수 있는 기본형 정기예금', 3, 24, 100000, 50000000),
(29, '챌린지 정기예금', 'DEPOSIT_CHALLENGE_001', 'deposit', '목표 기간 동안 목돈을 유지하는 정기예금 상품', 6, 30, 500000, 150000000),
(30, '퍼스트 정기예금', 'DEPOSIT_FIRST_001', 'deposit', '첫 예금 가입 고객에게 적합한 정기예금 상품', 3, 12, 100000, 30000000);

INSERT INTO interests
(product_id, period_months, interest_rate, early_termination_rate)
WITH RECURSIVE months AS (
  SELECT 0 AS month_value
  UNION ALL
  SELECT month_value + 1
  FROM months
  WHERE month_value < 36
)
SELECT
  p.id AS product_id,
  m.month_value AS period_months,
  CASE
    WHEN p.product_type = 'demand' THEN 0.100
    ELSE ROUND(2.200 + (m.month_value * 0.045) + (p.id * 0.012), 3)
  END AS interest_rate,
  CASE
    WHEN p.product_type = 'demand' THEN NULL
    ELSE ROUND((2.200 + (m.month_value * 0.045) + (p.id * 0.012)) * 0.5, 3)
  END AS early_termination_rate
FROM products p
JOIN months m
  ON m.month_value BETWEEN p.min_period_months AND p.max_period_months;