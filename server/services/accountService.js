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
  try {
    const accountNumber = createAccountNumber(); // 계좌번호 랜덤 생성

     // 1. 계좌 생성
    const result = await accountModel.createAccount(user_id, accountNumber);

    // 2. 유저 상품 등록
    const account_id = result.insertId; // 생성된 계좌 pk
    const products = await productModel.findProductsByType("demand", 0); // 입출금 상품 정보 조회
    const product = products[0];
    const product_id = product.id;
    const interest_rate = product.interest_rate;

    await accountModel.createMyProduct(
      product_id,
      user_id,
      account_id,
      interest_rate
    );
 
    return {
      "success": true,
      "data": {
        account_id,
        account_number: accountNumber,
      }
    }
  } catch (err) {
    console.error("service 입출금 생성 에러 : ", err);
    return {
      success: false,
      message: "service 입출금 서버 에러"
    }
  }
}