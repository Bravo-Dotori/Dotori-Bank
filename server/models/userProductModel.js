const pool = require("../db");

exports.createDepositSubscription = async (
  conn,
  product_id,
  user_id,
  account_id,
  target_amount,
  target_period_months,
  interest_rate,
  maturity_date
) => {
  const sql = `
    insert into user_products
      (product_id, 
       user_id, 
       account_id, 
       target_amount, 
       target_period_months, 
       interest_rate, 
       join_date, 
       maturity_date)
    values
      (?, ?, ?, ?, ?, ?, curdate(), ?)
  `;

  const [rows] = await conn.query(sql, [
    product_id,
    user_id,
    account_id,
    target_amount,
    target_period_months,
    interest_rate,
    maturity_date
  ]);

  return rows;
};