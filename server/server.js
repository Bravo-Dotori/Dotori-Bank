require('dotenv').config(); 
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser"); 
const cors = require('cors');
const app = express(); 
const port = 5000;
const userRouter = require('./routes/userRouter');
const accountRouter = require('./routes/accountRouter');
const recommendRouter = require('./routes/recommendRouter');
const productRouter = require("./routes/productRouter");
const transferRouter = require('./routes/transferRouter');
const depositRouter = require('./routes/depositRouter');

// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

// cors 설정
app.use(cors({
  origin: true,
  credentials: true
})); 

// json 파일 파싱
app.use(express.json()); 

// 쿠키 사용
app.use(cookieParser());

// 라우터 설정
app.use("/api/user", userRouter); 
app.use("/api/accounts", accountRouter); 
app.use("/api/recommend", recommendRouter);
app.use("/api/products", productRouter);
app.use("/api/transfer", transferRouter);
app.use("/api/deposits", depositRouter);

// 빌드 설정용
app.use(express.static(path.join(__dirname, 'static'))); // static 폴더를 정적 파일 제공 폴더로 설정
app.get('/favicon.ico', (_, res) => res.status(204)); // 파비콘 무시  

// Swagger UI 설정
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// React 라우팅 대응
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('/*rest', function (req, res) {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});
// local 실행
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    console.log("연결 성공")
});