const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); 

// user router
router.post("/signup", userController.signup); // 회원가입
router.post("/login", userController.login); // 로그인
router.get("/verify", userController.verify); // 로그인 - jwt 토큰 검증
router.post("/logout", userController.logout); // 로그아웃 - 쿠키 삭제

module.exports = router; 