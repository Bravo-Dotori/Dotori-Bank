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

INSERT INTO accounts
(id, user_id, account_number, account_type, balance, transfer_limit, is_admin, is_active)
VALUES
(1, 1, '100-1111-111111', 'demand', 3000000, 3000000, FALSE, TRUE),
(2, 2, '100-2222-222222', 'demand', 5000000, 3000000, FALSE, TRUE),
(3, 3, '100-0000-000000', 'demand', 100000000, 100000000, TRUE, TRUE);
