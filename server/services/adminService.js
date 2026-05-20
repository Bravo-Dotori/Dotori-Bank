const transactionModel = require("../models/transactionModel");
const accountModel = require("../models/accountModel");

const ADMIN_PAGE_LIMIT = 10;

const getPagination = (page) => {
    const pageNumber = Number(page);
    const currentPage = Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;

    return {
        page: currentPage,
        limit: ADMIN_PAGE_LIMIT,
        offset: (currentPage - 1) * ADMIN_PAGE_LIMIT
    };
};

exports.getAdminTransactions = async (query = {}) => {
    try {
    const { keyword = "", period = "all", type = "all", page = 1 } = query;
    const pagination = getPagination(page);
    const filters = { keyword, period, type };
    const [adminTransaction, totalCount] = await Promise.all([
      transactionModel.getAdminTransactions(filters, pagination.limit, pagination.offset),
      transactionModel.getAdminTransactionsCount(filters)
    ]);

    return {
      success: true,
      totalCount,
      page: pagination.page,
      limit: pagination.limit,
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

exports.getAdminAccounts = async (query = {}) => {
    try {
    const { keyword = "", period = "all", page = 1 } = query;
    const pagination = getPagination(page);
    const filters = { keyword, period };
    const [adminAccounts, totalCount] = await Promise.all([
      accountModel.getAdminAccounts(filters, pagination.limit, pagination.offset),
      accountModel.getAdminAccountsCount(filters)
    ]);

    return {
      success: true,
      totalCount,
      page: pagination.page,
      limit: pagination.limit,
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
