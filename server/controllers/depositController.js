const depositService = require("../services/depositService");

exports.joinDeposit = async (req, res) => {
  try {
    const user_id = req.user?.id || 1;
    const { product_id, target_period_months, target_amount } = req.body;

    if (!product_id || !target_period_months || !target_amount) {
      return res.status(400).json({
        success: false,
        message: "필수값 누락"
      });
    }

    const result = await depositService.joinDeposit(
      user_id,
      product_id,
      target_period_months,
      target_amount
    );

    if (!result.success) {
      return res.status(result.statusCode || 400).json({
        success: false,
        message: result.message
      });
    }

    return res.status(201).json(result);
  } catch (err) {
    console.error("controller 예금 가입 에러 : ", err);

    return res.status(500).json({
      success: false,
      message: "예금 가입 서버 에러"
    });
  }
};
