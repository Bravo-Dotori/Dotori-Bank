const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const pool = require("../db");

const accountService = require("./accountService");

const JWT_SECRET = process.env.JWT_SECRET;


// 회원가입
exports.signup = async(email, user_id, password, name, birth_date) => {

  const conn = await pool.getConnection();

  try {

    // 트랜잭션 시작
    await conn.beginTransaction();

    const existEmail = await userModel.findByEmail(email);
    const existId = await userModel.findById(user_id);

    // 이메일 중복 체크
    if(existEmail.length > 0) {

      // 에러시 롤백처리
      await conn.rollback();

      return {
        success: false,
        message: "이미 사용 중인 이메일입니다."
      };
    }

    // 아이디 중복 체크
    if(existId.length > 0) {

      // 에러시 롤백처리
      await conn.rollback();

      return {
        success: false,
        message: "이미 사용 중인 아이디입니다."
      };
    }
    
    // 비밀번호 해시 처리
    const hash = await bcrypt.hash(password, 10);

    // 회원 생성
    const result = await userModel.signup(conn, email, user_id, hash, name, birth_date);

    // 생성된 회원 pk
    const newUserId = result.insertId;

    // 기본 입출금 계좌 생성
    await accountService.createAccount(conn, newUserId);

    // 트랜잭션 커밋 처리
    await conn.commit();

    // 자동 로그인 처리
    // JWT 토큰 발급
    const token = jwt.sign(
      {
        id: newUserId,
        user_id,
        name,
        role: "user"
      },
      JWT_SECRET,
      {
        expiresIn: "12h"
      }
    );

    return {
        success: true,
        message: "회원가입 성공하였습니다.",
        token,
        user: {
            id: newUserId,
            user_id,
            name,
            role: "user"
        }
    };

  } catch (error) {

    // 에러시 롤백처리 
    await conn.rollback();

    console.error("service 회원가입 에러 : ", error);

    if(error.code === "ER_DUP_ENTRY") {
      return {
        success: false,
        message: "이미 존재하는 회원입니다."
      };
    }

    return {
      success: false,
      message: "회원가입을 다시 시도해주세요."
    };

  } finally {

    conn.release();

  }
};


// 로그인
exports.login = async(user_id, password) => {
  try {
    const result = await userModel.findById(user_id);
    const user = result[0];

    // 아이디 없음
    if(!user) {
      return {
        success: false,
        message: "존재하지 않는 아이디입니다."
      };
    }

    // 비밀번호 검증
    const pwd = await bcrypt.compare(
      password,
      user.password_hash
    );

    // 비밀번호 틀림
    if(!pwd) {
      return {
        success: false,
        message: "비밀번호가 틀렸습니다."
      };
    }

    // JWT 토큰 발급
    const token = jwt.sign(
      {
        id: user.id,
        user_id: user.user_id,
        name: user.name,
        role: user.role
      },
      JWT_SECRET,
      {
        expiresIn: "12h"
      }
    );

    return {
      success: true,
      token,
      user: { 
        id: user.id,
        user_id: user.user_id,
        name: user.name,
        role: user.role
      }
    };

  } catch (error) {

    console.error("service 로그인 에러 : ", error);

    return {
      success: false,
      message: "로그인을 다시 시도해주세요."
    };

  }
};