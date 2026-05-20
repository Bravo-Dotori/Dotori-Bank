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
exports.getAdminTransactions = async (keyword = "") => {
  let sql = ` 
    select 
      t.id,
      t.transaction_at,
      t.from_account_id,
      t.to_account_id,
      t.type,
      t.amount,
      t.is_suspicious,
      t.description,

      from_account.account_number as from_account_number,
      to_account.account_number as to_account_number

    from transactions t

    left join accounts from_account
      on t.from_account_id = from_account.id
    left join accounts to_account
      on t.to_account_id = to_account.id
 
    where 1=1
  `
  
  const params = []; // 검색어 들어갈 배열

  if(keyword.trim()) { // 빈 문자열 방지
    sql += `
        and (
            from_account.account_number LIKE ?
            OR to_account.account_number LIKE ?
            OR t.description LIKE ?
        )
    `

   const search = `%${keyword}%`
    params.push(
      search,
      search,
      search
    );
  }

  sql += `
    order by t.transaction_at DESC
  `

  const [rows] = await pool.query(sql, params);
    return rows;
}
