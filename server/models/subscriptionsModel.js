const pool = require("../db");

exports.findSubscriptionsByUserId = async (userId) => {
  const sql = `
    SELECT
        up.id AS subscription_id,
        up.product_id,
        p.product_name,
        p.product_code,
        p.product_type,
        up.user_id,
        up.account_id,
        up.target_amount,
        up.target_period_months,
        up.interest_rate,
        up.join_date,
        up.maturity_date,
        up.status,
        up.created_at,
        up.updated_at
    FROM user_products up
    JOIN products p
        ON up.product_id = p.id
    WHERE up.user_id = ?
    ORDER BY up.created_at DESC;
  `;

  const [rows] = await pool.query(sql, [productType, periodMonths]);
  return rows;
};

exports.findSubscriptionDetailByIdAndUserId = async (subscriptionId, userId) => {
  const sql = `
    SELECT
        up.id AS subscription_id,
        up.product_id,
        p.product_name,
        p.product_code,
        p.product_type,
        up.user_id,
        up.account_id,
        up.target_amount,
        up.target_period_months,
        up.interest_rate,
        up.join_date,
        up.maturity_date,
        up.status,
        up.created_at,
        up.updated_at
    FROM user_products up
    JOIN products p
        ON up.product_id = p.id
    WHERE up.id = ?
        AND up.user_id = ?;
  `;

  const [rows] = await pool.query(sql, [productType, periodMonths]);
  return rows;
};