const accountModel = require("../models/accountModel");
const createAccountNumber = require("../utils/accountNumber")

// 내 계좌 조회
exports.getAccounts = async(user_id) => {
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

// 입출금 생성
exports.createAccount = async(user_id) => {
  try {
    const accountNumber = createAccountNumber();
    const result = await accountModel.createAccount(user_id, accountNumber);

    return {
      success: true,
      data: result
    }
  } catch (err) {
    console.error("service 입출금 생성 에러 : ", err)
    return {
      success: false,
      message: "service 입출금 서버 에러"
    }
  }
}