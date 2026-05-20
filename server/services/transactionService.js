const transactionModel = require("../models/transactionModel");
const accountModel = require("../models/accountModel");

const TRANSACTION_PAGE_LIMIT = 10;

const getPagination = (page) => {
    const pageNumber = Number(page);
    const currentPage = Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;

    return {
      page: currentPage,
      limit: TRANSACTION_PAGE_LIMIT,
      offset: (currentPage - 1) * TRANSACTION_PAGE_LIMIT
    };
};

exports.getTransactions = async (user_id, query = {}) => {
    try {
    const { period = "all", type = "all", page = 1 } = query;
    const pagination = getPagination(page);
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

    const [transactions, totalCount] = await Promise.all([
      transactionModel.getTransactions(
        demandAccount.id,
        period,
        type,
        pagination.limit,
        pagination.offset
      ),
      transactionModel.getTransactionsCount(demandAccount.id, period, type)
    ]);

    return {
      success: true,
      account_id: demandAccount.id,
      totalCount,
      page: pagination.page,
      limit: pagination.limit,
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
