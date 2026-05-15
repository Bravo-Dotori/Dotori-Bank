CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '거래 ID',

    from_account_id INT
        NOT NULL
        COMMENT '출금 계좌 ID',

    to_account_id INT
        NULL
        COMMENT '입금 계좌 ID',

    type ENUM(
        'DEPOSIT',
        'WITHDRAWAL',
        'TRANSFER',
        'INTEREST',
        'CANCEL'
    )
        NOT NULL
        COMMENT '거래 유형 (납입 / 출금 / 이체 / 이자지급 / 해지)',

    amount BIGINT
        NOT NULL
        COMMENT '거래 금액(원 단위)',

    balance_after BIGINT
        NOT NULL
        COMMENT '거래 후 잔액(from_account 기준)',

    description VARCHAR(255)
        NULL
        COMMENT '거래 메모',

    is_suspicious BOOLEAN
        NOT NULL
        DEFAULT FALSE
        COMMENT '이상거래 여부',

    transaction_at TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        COMMENT '실제 거래 발생 시각',

    created_at TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        COMMENT 'DB 등록 시간',

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