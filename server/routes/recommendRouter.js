// recommendationRouter : 상품 추천 api 라우터 관리

const express = require("express"); // express 모듈
const router = express.Router(); // 라우터 객체 생성
const recommendationController = require("../controllers/userController"); // 응답/요청 처리한 파일 연결
const authToken = require('../middleware/authMiddleware');

router.post("/deposit", authToken, recommendationController.signup); // 회원가입

module.exports = router; 