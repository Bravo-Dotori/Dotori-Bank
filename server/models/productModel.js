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

// 예금 상품 목록 조회
exports.products = async () => {
    const sql = `
        select 
            p.id,
            p.product_name,
            p.product_type,
            p.max_period_months,
            round(max(i.interest_rate), 2) as interest_rate,
            p.product_desc
        from products p join interests i on p.id = i.product_id
        where p.product_type = "deposit"
        group by
            p.id,
            p.product_name,
            p.product_type,
            p.max_period_months,
            p.product_desc
    `

    const [rows] = await pool.query(sql);
    return rows;
}

// 내 상품 목록 조회
exports.myProducts = async (user_id) => {
    const sql = `
        select 
            u.id,
            p.product_name,
            p.product_type,
            u.target_period_months,
            u.interest_rate,
            p.product_desc
        from user_products u 
            join products p on u.product_id = p.id
        where u.user_id = ? and u.status = "ACTIVE"
        order by u.created_at desc
    `

    const [rows] = await pool.query(sql, [user_id]);
    return rows;
}

// 내 상품 상세 조회
exports.myProductDetail = async (user_product_id, user_id) => {
    const sql = `
        select
            u.id,
            p.product_name,
            p.product_type,
            u.target_period_months,
            u.interest_rate,
            p.product_desc,
            a.balance
        from user_products u
        join products p
            on u.product_id = p.id
            join accounts a on u.account_id = a.id
        where u.id = ?
            AND u.user_id = ?
    `;

    const [rows] = await pool.query(sql, [user_product_id, user_id]);
    return rows;
}

// 내 상품 해지
exports.productCancel = async (productId, user_id) => {
    const sql = `
        update user_products
        set status = 'CANCELLED'
        where id = ? and user_id = ?
    `;

    const [rows] = await pool.query(sql, [productId, user_id]);
    return rows;
}
