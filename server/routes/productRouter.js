const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require('../middlewares/authMiddleware');

router.get("/myProducts", authMiddleware, productController.myProducts); // 내 상품 목록 조회
router.get("/myProducts/:productId", authMiddleware, productController.myProductDetail); // 내 상품 상세 조회
router.patch("/myProducts/:productId/cancel", authMiddleware, productController.productCancel);
router.get("/", productController.products); // 전체 상품 목록 조회
router.get("/:productId", productController.productDetail); // 상품 상세 조회
module.exports = router;
