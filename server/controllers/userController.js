const userService = require("../services/userService"); 
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// 회원가입
exports.signup = async(req, res) => {
  try {
    const { name, user_id, pwd } = req.body
    const result = await userService.signup(name, user_id, pwd);
    res.json(result);
  } catch (err) {
    console.error("controller 에러: ", err);
    res.json({
      success: false,
      message: "controller 회원가입 에러"
    }); 
  }
}

// 로그인
exports.login = async(req, res) => {
  try {
    const {user_id, pwd} = req.body;
    const result = await userService.login(user_id, pwd);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax", 
      path: '/',
      maxAge: 60 * 60 * 1000 
    });

    res.json({
      success: true,
      result: "로그인 성공",
      user: result.user,
      token: result.token
    });
  } catch (err) {
    console.error("controller 로그인 실패: ", err);
    res.json({
      success: false,
      message : "controller 로그인 실패"
    })
  }
} 

// 로그인 - jwt 검증
exports.verify = (req, res) => {
  try {
    const token = req.cookies.token;

    if(!token) { 
      return res.status(401).json({success: false});
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.json({ success: false });
      res.json({ success: true, user: decoded }); 
    });
  } catch (err) { 
    console.error("controller 인증 에러: ", err);
    res.json({
      success: false,
      message: "로그인 실패"
    });
  }
} 

// 로그아웃
exports.logout = (req, res) => {
  try {
    res.clearCookie("token", { 
      httpOnly: true, 
      sameSite: "lax", 
      path: "/" 
    });

    res.json({
      success: true,
      message: "로그아웃 성공"
    });

  } catch (err) {
    console.error("controller 로그아웃 에러:", err);

    res.json({
      success: false,
      message: "로그아웃 실패"
    });
  }
};