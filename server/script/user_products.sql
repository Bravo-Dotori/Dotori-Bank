CREATE TABLE user_products (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '내부 식별용 PK',

    product_id INT NOT NULL COMMENT '상품 ID',
    user_id INT NOT NULL COMMENT '사용자 ID',
    account_id INT NOT NULL COMMENT '계좌 ID',

    target_amount INT NOT NULL COMMENT '전체 납입 금액(예금 최초 예치금)',
    target_period_months INT NOT NULL COMMENT '전체 개월 수',

    interest_rate DECIMAL(3,2) NOT NULL COMMENT '가입 당시 확정 금리',

    join_date DATE NOT NULL COMMENT '상품 가입 시작일',
    maturity_date DATE NOT NULL COMMENT '상품 종료 예정일',

    status ENUM('ACTIVE', 'MATURED', 'CANCELLED')
        NOT NULL
        DEFAULT 'ACTIVE'
        COMMENT '가입중, 만기, 해지',

    created_at TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        COMMENT '최초 등록 시 자동 저장',

    updated_at TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
        COMMENT '수정 시 자동 갱신',

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