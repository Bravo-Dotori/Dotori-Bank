require('dotenv').config(); 
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser"); 
const app = express(); 
const port = 5000;
const userRouter = require('./routes/userRouter');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

// Express 미들웨어 설정 - api 요청 들어오기 전에 실행되는 전처리 단계 (모든 서버에서 적용)
// cors : 리액트 개발 서버에서 해당 서버로 api 요청 들어올 때 cors 허용 (로컬 개발용)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
})); 
// json 파일 파싱
app.use(express.json()); 

// 쿠키 사용
app.use(cookieParser());

// 라우터 설정
app.use("/api/user", userRouter); // "/api/user"로 시작하는 모든 요청은 userRouter에서 처리
// app.use("/api/recommend", recommendRouter);

// 빌드 설정용
app.use(express.static(path.join(__dirname, 'static'))); // static 폴더를 정적 파일 제공 폴더로 설정
app.get('/favicon.ico', (_, res) => res.status(204)); // 파비콘 무시

// Swagger UI 설정
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// local 실행
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    console.log("연결 성공")
});