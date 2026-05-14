// 권한 인가 미들웨어
const authorize = (roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ 
          success: false, 
          message: '관리자만 가능' 
        });
      }
      
      next();
    } catch (err) {
      console.error("인가 에러 : ", err);

      return res.status(401).json({
        success: false,
        message: "권한 인가 실패"
      })
    }
  }
  
}

module.exports = authorize;