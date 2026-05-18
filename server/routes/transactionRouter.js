const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");

// 거래 내역 조회
router.get("/", authMiddleware, transactionController.getTransactions);

module.exports = router;