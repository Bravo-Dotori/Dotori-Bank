const pool = require("../db");

// 내 계좌 조회
exports.getAccounts = async (user_id) => {
  const sql = `
    select a.*
    from accounts a join users u on a.user_id = u.id
    where a.user_id=?
  `
  const [rows] = await pool.query(sql, [user_id]);
  return rows;
}

// 입출금 계좌 생성
exports.createAccount = async (user_id, account_number) => {
  const sql = `
    insert into 
      accounts (user_id, account_number, balance)
    values (?,?, 3000000)
  `
  const [rows] = await pool.query(sql, [user_id, account_number]);
  return rows;
}

// 상품 가입시 내 상품에 등록
exports.createMyProduct = async (
  product_id, 
  user_id, 
  account_id, 
  target_amount, 
  target_period_months, 
  interest_rate, 
  join_date, 
  maturity_date) => {
  const sql = `
    insert into products
      (product_id, user_id, account_id, target_amount, target_period_months, interest_rate, join_date, maturity_date)
    values
      (?, ?, ?, ?, ?, ?, ?, ?)
  `
  const [rows] = await pool.query(sql, [
    product_id, 
    user_id, 
    account_id, 
    target_amount, 
    target_period_months, 
    interest_rate, 
    join_date, 
    maturity_date
  ]);
  return rows;
}