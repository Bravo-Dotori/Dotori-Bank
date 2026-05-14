CREATE TABLE user_products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    product_id BIGINT NOT NULL,
    user_id INT NOT NULL,
    account_id INT NOT NULL,

    target_amount BIGINT NOT NULL,

    target_period_months INT NOT NULL,

    interest_rate DECIMAL(3,2) NOT NULL,

    join_date DATE NOT NULL,

    maturity_date DATE NOT NULL,

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