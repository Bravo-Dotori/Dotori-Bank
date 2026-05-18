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

// 받는 계좌 조회
exports.getToAccount = async (account_number, name) => {
  try {
    const result = await accountModel.getToAccount(account_number, name);

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

// 입출금 계좌 생성 (호출시 트랜잭션 처리 필요)
exports.createAccount = async (conn, user_id) => {

  const accountNumber = createAccountNumber();

  const products = await productModel.findProductsByType("demand",0);

  const product = products[0];

  if(!product) {
    throw new Error("해당 상품 없음");
  }

  const product_id = product.id;
  const interest_rate = product.interest_rate;

  if(!product_id || interest_rate === undefined || interest_rate === null) {
    throw new Error("해당 상품 정보 오류");
  }

  // 1. 계좌 생성
  const result = await accountModel.createAccount(conn, user_id, accountNumber, "demand", 3000000);

  if(!result) {
    throw new Error("계좌 생성 실패");
  }

  // 2. 유저 상품 등록
  const account_id = result.insertId;

  const productResult = await accountModel.createMyProduct(conn, product_id, user_id, account_id, interest_rate);

  if(!productResult) {
    throw new Error("가입 상품 등록 실패");
  }

  return {
    account_id,
    account_number: accountNumber,
  };
}