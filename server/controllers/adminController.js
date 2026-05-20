const adminService = require("../services/adminService");

// 관리자 거래 내역 조회
exports.getAdminTransactions = async (req, res) => {
  try {
    const result = await adminService.getAdminTransactions(req.query);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json({
      success: true,
      message: "관리자 거래 내역 조회 성공",
      data: {
        total_count: result.totalCount,
        page: result.page,
        limit: result.limit,
        transactions: result.adminTransaction
      }
    });
  } catch (err) {
    console.error("관리자 거래 내역 조회 컨트롤러 에러:", err);

    return res.status(500).json({
      success: false,
      message: "관리자 거래 내역 조회 서버 에러"
    });
  }
};

// 관리자 고객 내역 조회
exports.getAdminAccounts = async (req, res) => {
  try {
    const result = await adminService.getAdminAccounts(req.query);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json({
      success: true,
      message: "관리자 고객내역 조회 성공",
      data: {
        total_count: result.totalCount,
        page: result.page,
        limit: result.limit,
        accounts: result.adminAccounts
      }
    });
  } catch (err) {
    console.error("관리자 고객내역 조회 컨트롤러 에러:", err);

    return res.status(500).json({
      success: false,
      message: "관리자 고객내역 조회 서버 에러"
    });
  }
};

// 관리자 계좌 활성 여부 변경
exports.updateAccountActiveStatus = async (req, res) => {
  try {
    const { account_id } = req.params;
    const { is_active } = req.body;

    const result = await adminService.updateAccountActiveStatus(account_id, is_active);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    console.error("관리자 계좌 활성화 변경 컨트롤러 에러:", err);

    return res.status(500).json({
      success: false,
      message: "계좌 활성화 여부 변경 서버 에러"
    });
  }
};
