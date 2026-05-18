const pool = require("../db");

// 거래 내역 조회
exports.getTransactions = async (account_id, period, type) => {

  let sql = `
    select 
      t.id,
      t.transaction_at,
      t.from_account_id,
      t.to_account_id,
      t.type,
      t.amount,
      t.balance_after,
      t.description,
      t.is_suspicious,

      from_user.name as from_user_name,
      to_user.name as to_user_name

    from transactions t

    left join accounts from_account
      on t.from_account_id = from_account.id
    left join users from_user
      on from_account.user_id = from_user.id

    left join accounts to_account
      on t.to_account_id = to_account.id
    left join users to_user
      on to_account.user_id = to_user.id

    where (
      t.from_account_id = ?
      or t.to_account_id = ?
    )
  `;

  const params = [account_id, account_id];

  if (period !== "all") {
    sql += `
      and t.transaction_at >= date_sub(now(), interval ? month)
    `;
    params.push(Number(period));
  }

  if (type === "in") {
    sql += `
      and t.to_account_id = ?
    `;
    params.push(account_id);
  } else if (type === "out") {
    sql += `
      and t.from_account_id = ?
    `;
    params.push(account_id);
  }

  sql += `
    order by t.transaction_at desc
  `;

  const [rows] = await pool.query(sql, params);
  return rows;
}

// 관리자 거래 내역 조회
exports.adminTransaction = async (  
) => {
  let sql = ` 
    select 
      transaction_at,
      from_account_id,
      to_account_id,
      amount,
      is_suspicious,
      description
    from transactions
    order by transaction_ad desc


    ORDER BY
      transaction_at DESC

    LIMIT 20
  `
}
