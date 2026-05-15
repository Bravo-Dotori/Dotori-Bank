const transferService = require("../services/transferService");

// 이체
exports.transfer = async (req, res) => {
  try {
    const user_id = req.user.id;
    const {from_account_id, to_account_number, amount, memo} = req.body;
    const sendAmount = Number(amount);

    // 필수값 누락
    if(!from_account_id || !to_account_number || !amount || !memo) {
      return res.status(400).json({
        success: false,
        message: "입력값 누락"
      });
    }

    // 금액 오류
    if(sendAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "금액 오류"
      });
    }

    const result = await transferService.transfer(
      user_id,
      from_account_id,
      to_account_number,
      sendAmount,
      memo
    );

    if(!result.success) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (err) {
    console.error("계좌 이체 에러 : ", err);

    return res.status(500).json({
      success: false,
      message: "계좌 이체 서버 에러"
    });
  }
}
