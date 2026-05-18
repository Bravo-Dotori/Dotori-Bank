CREATE TABLE user_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    account_id INT NOT NULL,
    target_amount BIGINT,
    target_period_months INT,
    interest_rate DECIMAL(5,3) NOT NULL,
    join_date DATE NOT NULL DEFAULT (CURRENT_DATE),
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

INSERT INTO user_products
(product_id, user_id, account_id, target_amount, target_period_months, interest_rate, join_date, maturity_date, status)
VALUES
(11, 1, 1, 3000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
(11, 2, 2, 5000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE'),
(11, 3, 3, 100000000, NULL, 0.100, CURDATE(), NULL, 'ACTIVE');
