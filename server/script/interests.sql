CREATE TABLE interests (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '금리 ID',

    product_id INT
        NOT NULL
        COMMENT '상품 ID',

    period_months INT
        NOT NULL
        COMMENT '3개월/6개월/12개월/24개월',

    interest_rate DECIMAL(5,3)
        NOT NULL
        COMMENT '기본 금리',

    early_termination_rate DECIMAL(5,3)
        NULL
        COMMENT '중도해지 시 적용 금리 / NULL이면 이자 없음',

    created_at TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        COMMENT '최초 등록 시 자동 저장',

    updated_at TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
        COMMENT '수정 시 자동 갱신',

    CONSTRAINT fk_interests_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
);

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
(8, 24, 4.500, 2.250);

