const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

// 회원가입
exports.signup = async(name, user_id, pwd) => {
  try {
    const exist = await userModel.checkId(user_id);
    if(exist.length > 0) {
      return {
        success: false,
        message: "이미 존재하는 아이디입니다."
      }
    }
    const hash = await bcrypt.hash(pwd, 10);
    const result = await userModel.signup(name, user_id, hash);

    if(result.affectedRows === 1) {
      return {
        success: true,
        message: "회원 가입 성공"
      }
    }
    return {
      success: false,
      message: "service 회원 가입 실패"
    };

  } catch (err) {
    console.error("회원가입 에러 : ", err);
    if(err.code === "ER_DUP_ENTRY") { // 동일 아이디 존재
      return {
        success: false,
        message: "이미 존재하는 아이디"
      }
    }
    return {
      success: false,
      message: "service 회원가입 에러"
    }
  }
}

// 로그인
exports.login = async(user_id, pwd) => {
  const result = await userModel.login(user_id);
  const user = result[0];
  try { 
    if(!user) {
      return {
        success: false,
        message: "service : 아이디가 존재하지 않습니다."
      }
    }
    if(!(await bcrypt.compare(pwd, user.pwd))) {
      return {
        success: false,
        message: "service : 비밀번호가 틀렸습니다."
      }
    }
    if(user && await bcrypt.compare(pwd, user.pwd)) {
      const token = jwt.sign({user_id: user.user_id, name: user.name }, JWT_SECRET, {expiresIn: '12h'});
      return {
        success: true,
        token,
        user: { 
          user_id: user.user_id,
          name: user.name
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