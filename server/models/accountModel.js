const pool = require("../db");

// 내 계좌 조회
exports.getAccounts = async (user_id) => {

  console.log("조회 userId:", user_id);

  const sql = `
    select a.*
    from accounts a join users u on a.user_id = u.id
    where a.user_id=?
  `
  const [rows] = await pool.query(sql, [user_id]);
  return rows;
}
