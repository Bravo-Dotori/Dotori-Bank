const productModel = require("../models/productModel");

exports.getProductDetail = async function (productId) {
  try {
    const rows = await productModel.findProductDetailById(productId);

    if (rows.length === 0) {
      return {
        success: false,
        message: "상품을 찾을 수 없습니다."
      };
    }

    const product = rows[0];

    const productDetail = {
      id: product.id,
      product_name: product.product_name,
      product_code: product.product_code,
      product_type: product.product_type,
      min_period_months: product.min_period_months,
      max_period_months: product.max_period_months,
      min_amount: product.min_amount,
      max_amount: product.max_amount,
      interests: rows.map((row) => {
        return {
          period_months: row.period_months,
          interest_rate: Number(Number(row.interest_rate).toFixed(1)),
          early_termination_rate: row.early_termination_rate === null
            ? null
            : Number(Number(row.early_termination_rate).toFixed(1))
        };
      })
    };

    return {
      success: true,
      product: productDetail
    };
  } catch (err) {
    console.error("service 상품 상세 조회 에러:", err);

    return {
      success: false,
      message: "상품 상세 조회 중 오류가 발생했습니다."
    };
  }
};
