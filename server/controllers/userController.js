const userService = require("../services/userService"); 
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const isValidDateString = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

// 회원가입
exports.signup = async(req, res) => {
  try {
    const { email, user_id, password, name, birth_date } = req.body

    // 필수값 누락 에러
    if(!email || !user_id || !password || !name || !birth_date) {
      return res.status(400).json({
        success: false,
        message: "필수값 누락"
      }); 
    }

    if (!isValidDateString(birth_date)) {
      return res.status(400).json({
        success: false,
        message: "올바른 생년월일을 입력해주세요."
      });
    }

    const result = await userService.signup(email, user_id, password, name, birth_date);
    // 중복회원 에러
    if(!result.success) {
      return res.status(409).json(result);
    }

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax", 
      path: '/',
      maxAge: 60 * 60 * 1000 
    });

    
    // 성공
    return res.status(201).json({
      success: true,
      message: "회원가입 성공",
      user: result.user
    }); 
 
  } catch (error) {
    console.error("error  ", error);
    return res.status(500).json({
      success: false,
      message: "controller 회원가입 실패"
    }); 
  }
}

// 로그인
exports.login = async(req, res) => {
  try {
    const {user_id, password} = req.body;

    if(!user_id || !password) {
      return res.status(400).json({
        success: false,
        message: "필수값 누락"
      })
    }

    const result = await userService.login(user_id, password);
    
    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message
      });
    }

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: true, 
      sameSite: "lax", 
      path: '/',
      maxAge: 60 * 60 * 1000 
    });

    return res.status(200).json({
      success: true,
      message: "로그인 성공",
      user: result.user
    });

  } catch (error) {
    console.error("1. controller 로그인 실패: ", error);
    return res.status(500).json({
      success: false,
      message : "2. controller 로그인 실패"
    })
  }
} 

// 로그인 - jwt 검증
exports.verify = (req, res) => {
  try {
    const token = req.cookies.token;

    if(!token || token === "undefined") { 
      return res.status(200).json({
        success: false,
        message: "토큰 검증 실패"
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({
      success: true,
      user: {
        id: decoded.id,
        user_id: decoded.user_id,
        name: decoded.name,
        role: decoded.role
      }
    });

  } catch (error) { 
    console.error("controller 토큰 검증 에러: ", error);
    return res.status(401).json({
      success: false,
      message: "토큰 검증 실패"
    });
  }
} 

// 로그아웃
exports.logout = (req, res) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "인증되지 않은 사용자"
      });
    }

    res.clearCookie("token", { 
      httpOnly: true, 
      sameSite: "lax", 
      path: "/" 
    });

    return res.status(200).json({
      success: true,
      message: "로그아웃 성공"
    });

  } catch (error) {
    console.error("controller 로그아웃 에러:", error);

    return res.status(500).json({
      success: false,
      message: "로그아웃 실패"
    });
  }
};