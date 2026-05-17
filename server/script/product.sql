CREATE TABLE products (
    id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
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

-- Seed data for product recommendation tests
DELETE FROM products;

ALTER TABLE products AUTO_INCREMENT = 1;

INSERT INTO products
(product_name, product_code, product_type, product_desc, min_period_months, max_period_months, min_amount, max_amount)
VALUES
('도토리 정기예금 6개월', 'DOTORI_DEPOSIT_006', 'deposit', '6개월 단기 정기예금 상품', 6, 6, 100000, 10000000),
('도토리 정기예금 12개월', 'DOTORI_DEPOSIT_012', 'deposit', '12개월 표준 정기예금 상품', 12, 12, 1000000, 50000000),
('도토리 정기예금 24개월', 'DOTORI_DEPOSIT_024', 'deposit', '24개월 고금리 정기예금 상품', 24, 24, 1000000, 100000000),
('도토리 자유예금', 'DOTORI_DEPOSIT_FREE', 'deposit', '3개월부터 12개월까지 선택 가능한 예금', 3, 12, 10000, 30000000),
('도토리 목돈예금', 'DOTORI_DEPOSIT_BIG', 'deposit', '목돈 굴리기에 적합한 예금', 12, 24, 5000000, 200000000),
('도토리 단기예금', 'DOTORI_DEPOSIT_SHORT', 'deposit', '짧게 이용하는 단기 예금', 3, 6, 100000, 5000000),
('도토리 안정예금', 'DOTORI_DEPOSIT_STABLE', 'deposit', '안정적인 금리의 예금', 12, 24, 500000, 30000000),
('도토리 프리미엄예금', 'DOTORI_DEPOSIT_PREMIUM', 'deposit', '고액 가입자를 위한 프리미엄 예금', 24, 24, 10000000, 300000000),
('도토리 자유적금', 'DOTORI_SAVINGS_FREE', 'savings', '매월 자유롭게 납입하는 적금', 6, 24, 10000, 1000000),
('도토리 청년적금', 'DOTORI_SAVINGS_YOUTH', 'savings', '청년 고객 대상 적금', 12, 36, 10000, 500000),
('도토리 입출금 통장', 'DOTORI_DEMAND_BASIC', 'demand', '기본 입출금 계좌 상품', NULL, NULL, NULL, NULL);
