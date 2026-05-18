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
