const pool = require("../db");

// 회원가입
exports.signup = async (name, user_id, pwd) => {
  const sql = `
    insert into users (name, user_id, pwd)
    values (?,?,?)
  `
  const [rows] = await pool.query(sql, [name, user_id, pwd]);
  return rows;
}

// 로그인
exports.login = async(user_id) => {
  const sql = `
    select * from users where user_id=?
  `
  const [rows] = await pool.query(sql, [user_id]);
  
  return rows;
}