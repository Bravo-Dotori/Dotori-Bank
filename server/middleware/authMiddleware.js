// 로그인 인증 정보 미들웨어
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authToken = (req, res, next) => { 
  const token = req.cookies?.token;
  
  if(!token) return res.json({success: false});

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if(err) return res.json({success: false});
    req.user = decoded;

    next();
  })
}

module.exports = authToken;