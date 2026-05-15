const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/:productId", productController.productDetail); // 상품 상세 조회
router.get("/", productController.products); // 전체 상품 목록 조회

module.exports = router;
