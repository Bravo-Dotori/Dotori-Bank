const accountService = require("../services/accountService");

// 내 계좌 조회
exports.getAccounts = async(req, res) => {
  try {
    const user_id = req.user.id;

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
    });
  } catch (err) {
    console.error("계좌 조회 에러 : ", err);

    return res.status(500).json({
      success: false,
      errorCode: 'ACCOUNT_SERVER_ERROR',
      message: '계좌 조회 서버 에러'
    });
  }
}

// 받는 계좌 조회
exports.getToAccounts = async(req, res) => {
  try {
    const { account_number } = req.body;

    // 필수값 검사
    if (!account_number) {
      return res.status(400).json({
        success: false,
        message: "필수값 누락"
      });
    }
    
    const result = await accountService.getToAccount(account_number);

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
    });
  } catch (err) {
    console.error("계좌 조회 에러 : ", err);

    return res.status(500).json({
      success: false,
      errorCode: 'ACCOUNT_SERVER_ERROR',
      message: '계좌 조회 서버 에러'
    });
  }
}

// 내 계좌 상세 조회 
exports.getAccountDetail = async (req, res) => {
  try {
    const user_id = req.user.id;
    const {account_id} = req.params;

    const result = await accountService.getAccountDetail(user_id, account_id);

    if(!result) {
      return res.status(404).json({
        success: false,
        errorCode: 'ACCOUNT_NOT_FOUND',
        message: '계좌 정보 없음'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "계좌 조회 성공",
      data: result.account
    });
  } catch (err) {
    console.error("계좌 조회 에러 : ", err);

    return res.status(500).json({
      success: false,
      errorCode: 'ACCOUNT_SERVER_ERROR',
      message: '계좌 조회 서버 에러'
    });
  }
}

// 입출금 계좌 생성
exports.createAccount = async(req, res) => {
  try {
    const user_id = req.user.id

    const result = await accountService.createAccount(user_id);

    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);

  } catch(err) {
    console.error("입출금 생성 에러 : ", err);

    return res.status(500).json({
      success: false,
      errorCode: 'ACCOUNT_SERVER_ERROR',
      message: '계좌 조회 서버 에러'
    });
  }
}