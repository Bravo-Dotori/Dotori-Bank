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

exports.findByIdForUpdate = async (conn, user_product_id, user_id) => {
  const sql = `
    select
      id,
      product_id,
      user_id,
      account_id,
      target_amount,
      target_period_months,
      interest_rate,
      join_date,
      maturity_date,
      status
    from user_products
    where id = ?
      and user_id = ?
    for update
  `;

  const [rows] = await conn.query(sql, [user_product_id, user_id]);
  return rows[0];
};

exports.updateStatus = async (conn, user_product_id, user_id, status) => {
  const sql = `
    update user_products
    set status = ?
    where id = ?
      and user_id = ?
      and status = 'ACTIVE'
  `;

  const [rows] = await conn.query(sql, [status, user_product_id, user_id]);
  return rows;
};
