const transactionModel = require("../models/transactionModel");
const accountModel = require("../models/accountModel");

exports.getAdminTransactions = async (keyword = "") => {
    try {
    const adminTransaction = await transactionModel.getAdminTransactions(keyword);

    return {
      success: true,
      adminTransaction
    };

    } catch (err) {
        console.error("관리자 거래 내역 조회 서비스 에러:", err);

        return {
            success: false,
            message: "관리자 거래 내역 조회 실패"
        };
    }
}

exports.getAdminAccounts = async (keyword = "") => {
    try {
    const adminAccounts = await accountModel.getAdminAccounts(keyword);

    return {
      success: true,
      adminAccounts
    };

    } catch (err) {
        console.error("관리자 고객내역 조회 서비스 에러:", err);

        return {
            success: false,
            message: "관리자 고객내역 조회 실패"
        };
    }
}

exports.updateAccountActiveStatus = async (account_id, is_active) => {
    try {

    if (typeof is_active !== "boolean") {
      return {
        success: false,
        message: "is_active 값은 boolean이어야 합니다."
      };
    }

    const result = await accountModel.updateAccountActiveStatus(account_id, is_active);

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "계좌를 찾을 수 없습니다."
      };
    }

    return {
      success: true,
      message: "계좌 활성화 여부 변경 성공"
    };

    } catch (err) {
        console.error("관리자 계좌 활성화 변경 서비스 에러:", err);

        return {
            success: false,
            message: "계좌 활성화 여부 변경 실패"
        };
    }
}