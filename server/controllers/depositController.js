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

exports.cancelDeposit = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { productId } = req.params;

        const result = await depositService.cancelDeposit(user_id, productId);

        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        } 

        return res.status(200).json({
            success: true,
            message: "상품 해지 성공했습니다.",
            products: result.products
        });

    } catch (err) {
        console.error("내 상품 해지 에러:", err);

        return res.status(500).json({
            success: false,
            message: "상품 해지를 실패했습니다."
        });
    }
};
