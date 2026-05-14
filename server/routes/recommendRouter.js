const express = require("express");
const router = express.Router();
const recommendController = require("../controllers/recommendController"); 

// user router
router.post("/deposits", recommendController.recommendDeposit); // 예금 추천

module.exports = router; 