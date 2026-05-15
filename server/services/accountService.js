const pool = require("../db");
const accountModel = require("../models/accountModel");
const productModel = require("../models/productModel");
const {createAccountNumber} = require("../utils/accountNumber");

// 내 계좌 조회
exports.getAccounts = async (user_id) => {
  try {
    const result = await accountModel.getAccounts(user_id);

    if(result.length === 0) {
      return {
        success: false,
        message: "계좌 정보 없음"
      }
    }
    
    return {
      success: true,
      accounts: result
    }
  } catch (err) {
    console.error("service 계좌 조회 에러 : ", err);

    return {
      success: false,
      message: "service 계좌 서버 에러"
    }
  }
}

// 계좌 상세 조회
exports.getAccountDetail = async (user_id, account_id) => {
  try {
    const result = await accountModel.getAccountDetail(user_id, account_id);

    if(!result) {
      return {
        success: false,
        message: "계좌 정보 없음"
      }
    }

    return {
      success: true,
      account: result
    }
  } catch (err) {
    console.error("계좌 상세 조회 실패 : ", err);
    
    return {
      success: false,
      message: "계좌 상세 조회 실패"
    }
  }
}

// 입출금 계좌 생성
exports.createAccount = async (user_id) => {
  const conn = await pool.getConnection();
  try {
    const accountNumber = createAccountNumber(); // 계좌번호 랜덤 생성

    const products = await productModel.findProductsByType("demand", 0); // 입출금 상품 정보 조회
    const product = products[0];

    if(!product) {
      return {
        success: false,
        message: "가입 상품 없음"
      };
    }

    const product_id = product.id;
    const interest_rate = product.interest_rate;

    if(!product_id || interest_rate === undefined || interest_rate === null) {
      return {
        success: false,
        message: "가입 상품 정보 오류"
      };
    }

    await conn.beginTransaction();

     // 1. 계좌 생성
    const result = await accountModel.createAccount(conn, user_id, accountNumber, "demand", 3000000);

    if(!result) {
      throw new Error("계좌 생성 실패");
    }

    // 2. 유저 상품 등록
    const account_id = result.insertId; // 생성된 계좌 pk

    const productresult = await accountModel.createMyProduct(
      conn,
      product_id,
      user_id,
      account_id,
      interest_rate
    );
    
    if(!productresult) {
      throw new Error("가입 상품 등록 실패");
    }
    
    await conn.commit();

    return {
      "success": true,
      "data": {
        account_id,
        account_number: accountNumber,
      }
    }
    
  } catch (err) {
    await conn.rollback();
    
    console.error("service 입출금 생성 에러 : ", err);
    return {
      success: false,
      message: "service 입출금 서버 에러"
    }
  } finally {
    // db 연결 반납
    conn.release();
  }

}