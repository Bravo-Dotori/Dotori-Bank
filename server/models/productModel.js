const pool = require("../db");

exports.findProductsByType = async (productType, periodMonths) => {
  const sql = `
    SELECT
        p.id,
        p.product_name,
        p.product_code,
        p.product_type,
        p.min_period_months,
        p.max_period_months,
        p.min_amount,
        p.max_amount,
        i.period_months,
        i.interest_rate,
        i.early_termination_rate
    FROM products p
    JOIN interests i
        ON p.id = i.product_id
    WHERE p.product_type = ?
        AND i.period_months = ?
    `;

    const [rows] = await pool.query(sql, [productType, periodMonths]);
    return rows;
};

exports.findProductDetailById = async (product_id) => {
  const sql = `
    SELECT
      p.id,
      p.product_name,
      p.product_code,
      p.product_type,
      p.min_period_months,
      p.max_period_months,
      p.min_amount,
      p.max_amount,
      i.period_months,
      i.interest_rate,
      i.early_termination_rate
    FROM products p
    JOIN interests i
      ON p.id = i.product_id
    WHERE p.id = ?
    ORDER BY i.period_months ASC
  `;

  const [rows] = await pool.query(sql, [product_id]);
  return rows;
};

// 전체 상품 목록 조회
exports.products = async () => {
    const sql = `
        select 
            p.product_name,
            p.max_period_months,
            i.interest_rate,
            p.product_desc
        from products p join interests i on p.id = i.product_id
    `

    const [rows] = await pool.query(sql);
    return rows;
}