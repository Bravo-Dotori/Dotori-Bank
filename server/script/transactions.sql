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

INSERT INTO transactions
(from_account_id, to_account_id, type, amount, balance_after, description)
VALUES
(3, 1, 'TRANSFER', 3000000, 97000000, '초기 입출금 계좌 지급'),
(3, 2, 'TRANSFER', 5000000, 92000000, '초기 입출금 계좌 지급');
