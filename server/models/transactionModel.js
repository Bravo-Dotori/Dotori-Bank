const pool = require("../db");

const addUserTransactionFilters = (sql, params, account_id, period, type) => {
  const periodNumber = Number(period);

  if (period !== "all" && Number.isInteger(periodNumber) && periodNumber > 0) {
    sql += `
      and t.transaction_at >= date_sub(now(), interval ? month)
    `;
    params.push(periodNumber);
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
  } else if (String(type).toUpperCase() === "TRANSFER") {
    sql += `
      and t.type = 'TRANSFER'
    `;
  }

  return sql;
};

exports.getTransactions = async (account_id, period, type, limit, offset) => {
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
  sql = addUserTransactionFilters(sql, params, account_id, period, type);

  sql += `
    order by t.transaction_at desc
    limit ? offset ?
  `;
  params.push(limit, offset);

  const [rows] = await pool.query(sql, params);
  return rows;
};

exports.getTransactionsCount = async (account_id, period, type) => {
  let sql = `
    select count(*) as total_count
    from transactions t
    where (
      t.from_account_id = ?
      or t.to_account_id = ?
    )
  `;

  const params = [account_id, account_id];
  sql = addUserTransactionFilters(sql, params, account_id, period, type);

  const [rows] = await pool.query(sql, params);
  return rows[0].total_count;
};

const normalizeAdminTransactionType = (type) => {
  if (!type || type === "all") {
    return null;
  }

  const upperType = String(type).toUpperCase();
  const typeMap = {
    IN: "DEPOSIT",
    OUT: "WITHDRAWAL",
    DEPOSIT: "DEPOSIT",
    WITHDRAWAL: "WITHDRAWAL",
    TRANSFER: "TRANSFER"
  };

  return typeMap[upperType] || null;
};

const addAdminTransactionFilters = (sql, params, { keyword = "", period = "all", type = "all" }) => {
  const periodNumber = Number(period);

  if (keyword.trim()) {
    sql += `
      and (
        from_account.account_number like ?
        or to_account.account_number like ?
        or t.description like ?
      )
    `;

    const search = `%${keyword}%`;
    params.push(search, search, search);
  }

  if (period !== "all" && Number.isInteger(periodNumber) && periodNumber > 0) {
    sql += `
      and t.transaction_at >= date_sub(now(), interval ? month)
    `;
    params.push(periodNumber);
  }

  const transactionType = normalizeAdminTransactionType(type);

  if (transactionType) {
    sql += `
      and t.type = ?
    `;
    params.push(transactionType);
  }

  return sql;
};

exports.getAdminTransactions = async (filters, limit, offset) => {
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

    where 1 = 1
  `;

  const params = [];
  sql = addAdminTransactionFilters(sql, params, filters);

  sql += `
    order by t.transaction_at desc
    limit ? offset ?
  `;
  params.push(limit, offset);

  const [rows] = await pool.query(sql, params);
  return rows;
};

exports.getAdminTransactionsCount = async (filters) => {
  let sql = `
    select count(*) as total_count
    from transactions t
    left join accounts from_account
      on t.from_account_id = from_account.id
    left join accounts to_account
      on t.to_account_id = to_account.id
    where 1 = 1
  `;

  const params = [];
  sql = addAdminTransactionFilters(sql, params, filters);

  const [rows] = await pool.query(sql, params);
  return rows[0].total_count;
};
