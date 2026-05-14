const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController"); 
const authMiddleware = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorizeMiddleware');

// account router
router.get("/", authMiddleware, accountController.getAccounts); // 내 계좌 조회
router.post("/", authMiddleware, accountController.createAccount); // 내 계좌 조회

module.exports = router; 