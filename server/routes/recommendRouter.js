const express = require("express");
const router = express.Router();
const recommendController = require("../controllers/recommendController"); 
const authMiddleware = require('../middlewares/authMiddleware');

// user router
router.post("/deposits", authMiddleware, recommendController.recommendDeposit); // 예금 추천

module.exports = router; 