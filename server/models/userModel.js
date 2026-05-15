const pool = require("../db");

// 회원가입
exports.signup = async (email, user_id, password_hash, name, birth_date) => {
  const sql = `
    insert into users (email, user_id, password_hash, name, birth_date)
    values (?,?,?,?,?)
  `
  const [rows] = await pool.query(sql, [email, user_id, password_hash, name, birth_date]);
  return rows;
}

// 회원가입 - 이메일 중복확인
exports.findByEmail = async (email) => {
  const sql = `
    select * from users where email=?
  `
  const [rows] = await pool.query(sql, [email]);
  return rows;
}

// 로그인, 회원가입 - 아이디 중복확인
exports.findById = async (user_id) => {
  const sql = `
    select 
      id,
      user_id,
      password_hash,
      name,
      role
    from users 
    where user_id=?
  `
  const [rows] = await pool.query(sql, [user_id]);
  return rows;
}