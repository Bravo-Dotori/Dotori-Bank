const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController"); 
const authMiddleware = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorizeMiddleware');

// user router
router.get("/account", authMiddleware, accountController.getAccounts); // 내 계좌 조회

module.exports = router; 