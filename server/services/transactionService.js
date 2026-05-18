const transactionModel = require("../models/transactionModel");
const accountModel = require("../models/accountModel");

exports.getTransactions = async (user_id, period, type) => {
    try {
    const accounts = await accountModel.getAccounts(user_id);

    const demandAccount = accounts.find(
      (account) => account.account_type === "demand" && Boolean(account.is_active)
    );

    if (!demandAccount) {
      return {
        success: false,
        message: "입출금 계좌가 없습니다."
      };
    }

    const transactions = await transactionModel.getTransactions(
      demandAccount.id,
      period,
      type
    );

    return {
      success: true,
      account_id: demandAccount.id,
      transactions
    };

    } catch (err) {
        console.error("거래 내역 조회 서비스 에러:", err);

        return {
            success: false,
            message: "거래 내역 조회 실패"
        };
    }
}