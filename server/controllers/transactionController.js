const transactionService = require("../services/transactionService");

// 거래 내역 조회
exports.getTransactions = async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await transactionService.getTransactions(
      user_id,
      req.query
    );

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json({
      success: true,
      message: "거래 내역 조회 성공",
      data: {
        account_id: result.account_id,
        total_count: result.totalCount,
        page: result.page,
        limit: result.limit,
        transactions: result.transactions
      }
    });
  } catch (err) {
    console.error("거래 내역 조회 컨트롤러 에러:", err);

    return res.status(500).json({
      success: false,
      message: "거래 내역 조회 서버 에러"
    });
  }
};
