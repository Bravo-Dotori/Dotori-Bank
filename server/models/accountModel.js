const pool = require("../db");

// 내 계좌 조회
exports.getAccounts = async (user_id) => {
  const sql = `
    select *
    from accounts
    where user_id=?
  `
  const [rows] = await pool.query(sql, [user_id]);
  return rows;
}

// 계좌 상세 조회
exports.getAccountDetail = async(user_id, account_id) => {
  const sql = `
    select * from accounts where id=? and user_id=?
  `
  const [rows] = await pool.query(sql, [account_id, user_id]);
  return rows[0];
}

// 입출금 계좌 조회(트랜잭션 용)
exports.getDemandAccountForUpdate = async (conn, user_id) => {
  const sql = `
    select
      id,
      user_id,
      account_number,
      balance,
      account_type,
      is_active
    from accounts
    where user_id = ?
      and account_type = 'demand'
      and is_active = true
    limit 1
    for update
  `
  const [rows] = await conn.query(sql, [user_id]);
  return rows[0];
}

// 입출금 계좌 생성
exports.createAccount = async (conn, user_id, account_number, account_type, balance) => {
  const sql = `
    insert into 
      accounts (user_id, account_number, account_type, balance)
    values (?, ?, ?, ?)
  `
  const [rows] = await conn.query(sql, [user_id, account_number, account_type, balance]);
  return rows;
}

// 상품 가입시 내 상품에 등록
exports.createMyProduct = async (conn, product_id, user_id, account_id, interest_rate) => {
  const sql = `
    insert into user_products
      (product_id, user_id, account_id, target_amount, target_period_months, interest_rate, join_date, maturity_date)
    values
      (?, ?, ?, 3000000, null, ?, now(), null)
  `
  const [rows] = await conn.query(sql, [
    product_id,
    user_id,
    account_id,
    interest_rate
  ]);
  return rows;
}

// 예금 계좌 조회
exports.getDepositAccountForUpdate = async (conn, account_id, user_id) => {
  const sql = `
    select
      id,
      user_id,
      account_number,
      balance,
      account_type,
      is_active
    from accounts
    where id = ?
      and user_id = ?
      and account_type = 'deposit'
      and is_active = true
    for update
  `;

  const [rows] = await conn.query(sql, [account_id, user_id]);
  return rows[0];
}

// 예금 계좌 해지 처리
exports.deactivateDepositAccount = async (conn, account_id, user_id) => {
  const sql = `
    update accounts
    set
      balance = 0,
      is_active = false
    where id = ?
      and user_id = ?
      and account_type = 'deposit'
      and is_active = true
  `;

  const [rows] = await conn.query(sql, [account_id, user_id]);
  return rows;
}
