const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

// 회원가입
exports.signup = async(email, user_id, password_hash, name, birth_date) => {
  try {
    const existEmail = await userModel.findByEmail(email);
    const existId = await userModel.findById(user_id);

    // 이메일 중복 체크
    if(existEmail.length > 0) {
      return {
        success: false,
        message: "service 1. 이메일 중복"
      }
    }
    // 아이디 중복 체크
    if(existId.length > 0) {
      return {
        success: false,
        message: "service 2. 아이디 중복"
      }
    }
    
    const hash = await bcrypt.hash(password_hash, 10);
    const result = await userModel.signup(email, user_id, hash, name, birth_date);

    if(result.affectedRows === 1) {
      return {
        success: true,
        message: "service 회원 가입 성공"
      }
    }

  } catch (err) {
    console.error("service 회원가입 에러 : ", err);
    if(err.code === "ER_DUP_ENTRY") { // 동일 아이디 존재
      return {
        success: false,
        message: "service 4. 중복 회원"
      }
    }
    return {
      success: false,
      message: "service 5. service 서버 오류"
    }
  }
}

// 로그인
exports.login = async(user_id, password) => {
  const result = await userModel.findById(user_id);
  const user = result[0];
  try { 
    if(!user) {
      return {
        success: false,
        message: "1. 아이디 없음"
      }
    }

    const pwd = await bcrypt.compare(password, user.password_hash);

    if(!pwd) {
      return {
        success: false,
        message: "2. 비번 틀림"
      }
    }
    if(user && pwd) {
      const token = jwt.sign({user_id: user.user_id, name: user.name, role: user.role }, JWT_SECRET, {expiresIn: '12h'});
      return {
        success: true,
        token,
        user: { 
          user_id: user.user_id,
          name: user.name,
          role: user.role
        }
      }
    }

  } catch (err) {
    console.error("service error: ", err);
    return {
      success: false,
      message: "service 로그인 에러"
    }
  }
}