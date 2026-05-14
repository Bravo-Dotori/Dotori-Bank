// 로그인 인증 정보 미들웨어
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authToken = (req, res, next) => { 
  try {
    const token = req.cookies?.token;

    if(!token) {
      return res.status(401).json({
        success: false,
        errorCode: 'TOKEN_REQUIRED',
        message: "로그인 필요"
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: decoded.id,
      user_id: decoded.user_id,
      role: decoded.role,
      name: decoded.name
    };

    next();
  } catch (err) {
    console.error("인증 에러 : ", err);
    
    return res.status(401).json({
      success: false,
      errorCode: 'INVALID_TOKEN',
      message: "토큰 인증 실패"
    })
  }
}
module.exports = authToken;