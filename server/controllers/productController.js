const productService = require("../services/productService"); 

exports.productDetail = async(req, res) => {
  try {
    const productId = Number(req.params.productId);

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "상품 ID가 필요합니다."
      });
    }

    const result = await productService.getProductDetail(productId);

    if (!result.success) {
      return res.status(404).json(result);
    } 

    return res.json(result);

  } catch (err) {
    console.error("controller 상품 상세 조회 에러:", err);

    return res.status(500).json({
      success: false,
      message: "상품 상세 조회 중 오류가 발생했습니다."
    });
  }
};