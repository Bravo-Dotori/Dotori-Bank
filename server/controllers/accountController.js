const accountService = require("../services/accountService");

// 내 계좌 조회
exports.getAccounts = async(req, res) => {
  try {
    const user_id = req.user.id;

    console.log(req.user);
    console.log(user_id);

    const result = await accountService.getAccounts(user_id);

    if(!result.success) {
      return res.status(404).json({
        success: false,
        errorCode: 'ACCOUNT_NOT_FOUND',
        message: '계좌 정보 없음'
      });
    }

    return res.status(200).json({
      success: true,
      message: "계좌 조회 성공",
      data: result.accounts
    })
  } catch (err) {
    console.error("계좌 조회 에러 : ", err);

    return res.status(500).json({
      success: false,
      errorCode: 'ACCOUNT_SERVER_ERROR',
      message: '계좌 조회 서버 에러'
    });
  }
}