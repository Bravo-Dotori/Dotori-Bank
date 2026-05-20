const pool = require("../db");

exports.getAccounts = async (user_id) => {
  const sql = `
    select *
    from accounts
    where user_id=?
  `;
  const [rows] = await pool.query(sql, [user_id]);
  return rows;
};

exports.getToAccount = async (account_number) => {
  const sql = `
    select *
    from accounts a join users u on a.user_id = u.id
    where a.account_number = ?
  `;
  const [rows] = await pool.query(sql, [account_number]);
  return rows;
};

exports.getAccountDetail = async(user_id, account_id) => {
  const sql = `
    select * from accounts where id=? and user_id=?
  `;
  const [rows] = await pool.query(sql, [account_id, user_id]);
  return rows[0];
};

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
  `;
  const [rows] = await conn.query(sql, [user_id]);
  return rows[0];
};

exports.createAccount = async (conn, user_id, account_number, account_type, balance) => {
  const sql = `
    insert into
      accounts (user_id, account_number, account_type, balance)
    values (?, ?, ?, ?)
  `;
  const [rows] = await conn.query(sql, [user_id, account_number, account_type, balance]);
  return rows;
};

exports.createMyProduct = async (
  conn,
  product_id,
  user_id,
  account_id,
  interest_rate
) => {
  const sql = `
    insert into user_products
    (product_id, user_id, account_id, target_amount, target_period_months, interest_rate, join_date, maturity_date)
    values
    (?, ?, ?, 3000000, null, ?, CURDATE(), null)
  `;

  const [rows] = await conn.query(sql, [
    product_id,
    user_id,
    account_id,
    interest_rate
  ]);

  return rows;
};

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
};

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
};

const addAdminAccountFilters = (sql, params, { keyword = "", period = "all" }) => {
  const periodNumber = Number(period);

  if (keyword.trim()) {
    sql += `
      and (
        u.name like ?
        or a.account_number like ?
      )
    `;

    const search = `%${keyword}%`;
    params.push(search, search);
  }

  if (period !== "all" && Number.isInteger(periodNumber) && periodNumber > 0) {
    sql += `
      and a.created_at >= date_sub(now(), interval ? month)
    `;
    params.push(periodNumber);
  }

  return sql;
};

exports.getAdminAccounts = async (filters, limit, offset) => {
  let sql = `
    select
      a.id,
      a.created_at,
      a.account_number,
      a.account_type,
      a.balance,
      a.is_active,
      a.is_admin,
      u.id as user_id,
      u.name as user_name,
      u.role as user_role
    from accounts a
    join users u
      on a.user_id = u.id
    where 1 = 1
  `;

  const params = [];
  sql = addAdminAccountFilters(sql, params, filters);

  sql += `
    order by a.created_at desc
    limit ? offset ?
  `;
  params.push(limit, offset);

  const [rows] = await pool.query(sql, params);
  return rows;
};

exports.getAdminAccountsCount = async (filters) => {
  let sql = `
    select count(*) as total_count
    from accounts a
    join users u
      on a.user_id = u.id
    where 1 = 1
  `;

  const params = [];
  sql = addAdminAccountFilters(sql, params, filters);

  const [rows] = await pool.query(sql, params);
  return rows[0].total_count;
};

exports.updateAccountActiveStatus = async (account_id, is_active) => {
  const sql = `
    update accounts
    set is_active = ?
    where id = ?
  `;

  const [rows] = await pool.query(sql, [is_active, account_id]);
  return rows;
};
