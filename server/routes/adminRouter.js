const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeMiddleware");

// 관리자 거래 내역 조회
router.get("/transactions", authMiddleware, authorize("admin"), adminController.getAdminTransactions);
router.get("/accounts", authMiddleware, authorize("admin"), adminController.getAdminAccounts);
router.patch("/accounts/:account_id/active", authMiddleware, authorize("admin"), adminController.updateAccountActiveStatus);

module.exports = router;