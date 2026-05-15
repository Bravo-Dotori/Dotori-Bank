const pool = require("../db");

/**
 * 1. 출금계좌 조회
 * 2. 입금계좌 조회
 * 3. 출금
 * 4. 입금
 * 5. 거래내역 저장
 */


// 1. 출금 계좌 조회
exports.getFromAccount = async (conn, from_account_id) => {
  const sql = `
    select 
      id,
      user_id,
      balance,
      account_number,
      is_active
    from accounts
    where id=?
    for update
  `

  const [rows] = await conn.query(sql, [from_account_id]);
  return rows[0]; 
}

// 2. 입금 계좌 조회
exports.getToAccount = async (conn, to_account_number) => {
  const sql = `
    select 
      id,
      user_id,
      balance,
      account_number,
      is_active
    from accounts 
    where account_number =?
    for update
  `

  const [rows] = await conn.query(sql, [to_account_number]);
  return rows[0]; 
}

// 3. 출금
exports.withdraw = async (conn, from_account_id, fromBalanceAfter) => {  
  const sql = `
    update accounts
    set balance = ?
    where id = ?
  `

  const [rows] = await conn.query(sql, [fromBalanceAfter, from_account_id]);
  return rows; 
}

// 4. 입금
exports.deposit = async (conn, to_account_number,toBalanceAfter) => {
  const sql = `
    update accounts
    set balance = ?
    where account_number =?
  `

  const [rows] = await conn.query(sql, [toBalanceAfter, to_account_number]);
  return rows; 
}

// 5. 거래내역 저장
exports.createTransaction = async (conn, from_account_id, to_account_id, amount, balance_after, memo) => {
  const sql=`
    insert into transactions(from_account_id, to_account_id, type, amount, balance_after, description) values (?, ?, 'TRANSFER', ?, ?, ?)
  `

  const [rows] = await conn.query(sql, [from_account_id, to_account_id, amount, balance_after, memo]);
  return rows; 
}
