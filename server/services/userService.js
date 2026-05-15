const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

// 회원가입
exports.signup = async(email, user_id, password, name, birth_date) => {
  try {
    const existEmail = await userModel.findByEmail(email);
    const existId = await userModel.findById(user_id);

    // 이메일 중복 체크
    if(existEmail.length > 0) {
      return {
        success: false,
        message: "이미 사용 중인 이메일입니다."
      }
    }
    // 아이디 중복 체크
    if(existId.length > 0) {
      return {
        success: false,
        message: "이미 사용 중인 아이디입니다."
      }
    }
    
    const hash = await bcrypt.hash(password, 10);
    const result = await userModel.signup(email, user_id, hash, name, birth_date);

    if(result.affectedRows === 1) {
      return {
        success: true,
        message: "회원가입 성공하였습니다."
      }
    }

  } catch (error) {
    console.error("service 회원가입 에러 : ", error);
    if(error.code === "ER_DUP_ENTRY") { // 동일 아이디 존재
      return {
        success: false,
        message: "이미 존재하는 회원입니다."
      }
    }
    return {
      success: false,
      message: "회원가입을 다시 시도해주세요."
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
        message: "존재하지 않는 아이디입니다."
      }
    }

    const pwd = await bcrypt.compare(password, user.password_hash);

    if(!pwd) {
      return {
        success: false,
        message: "비밀번호가 틀렸습니다."
      }
    }
    if(user && pwd) {
      const token = jwt.sign({id: user.id, user_id: user.user_id, name: user.name, role: user.role }, JWT_SECRET, {expiresIn: '12h'});
      return {
        success: true,
        token,
        user: { 
          id: user.id,
          user_id: user.user_id,
          name: user.name,
          role: user.role
        }
      }
    }

  } catch (error) {
    console.error("service error: ", error);
    return {
      success: false,
      message: "로그인을 다시 시도해주세요."
    }
  }
}