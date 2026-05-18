/**
 * @swagger
 * tags:
 *   name: User
 *   description: 사용자 인증 API
 */

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: 회원가입
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, user_id, password, name, birth_date]
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               user_id:
 *                 type: string
 *                 example: testuser
 *               password:
 *                 type: string
 *                 example: "1234"
 *               name:
 *                 type: string
 *                 example: 홍길동
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 example: 2000-01-01
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: 로그인 성공
 *               user:
 *                 id: 9
 *                 user_id: testuser
 *                 name: 홍길동
 *                 role: user
 *       400:
 *         description: 필수값 누락
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 필수값 누락
 *       409:
 *         description: 중복 회원
 *         content:
 *           application/json:
 *             examples:
 *               duplicateEmail:
 *                 value:
 *                   success: false
 *                   message: 이미 사용 중인 이메일입니다.
 *               duplicateUserId:
 *                 value:
 *                   success: false
 *                   message: 이미 사용 중인 아이디입니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: controller 회원가입 실패
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: 로그인
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, password]
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: 로그인 성공
 *               user:
 *                 id: 1
 *                 user_id: admin
 *                 name: 관리자
 *                 role: admin
 *       400:
 *         description: 필수값 누락
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 필수값 누락
 *       401:
 *         description: 로그인 실패
 *         content:
 *           application/json:
 *             examples:
 *               notFound:
 *                 value:
 *                   success: false
 *                   message: 존재하지 않는 아이디입니다.
 *               invalidPassword:
 *                 value:
 *                   success: false
 *                   message: 비밀번호가 틀렸습니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: controller 로그인 실패
 */

/**
 * @swagger
 * /api/user/verify:
 *   get:
 *     summary: JWT 쿠키 인증
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: JWT 쿠키 인증 결과
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   success: true
 *                   user:
 *                     id: 1
 *                     user_id: admin
 *                     name: 관리자
 *                     role: admin
 *               failed:
 *                 value:
 *                   success: false
 *                   message: 토큰 검증 실패
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 토큰 검증 실패
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 토큰 검증 실패
 */

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: 로그아웃
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: 로그아웃 성공
 *       401:
 *         description: 인증되지 않은 사용자
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 인증되지 않은 사용자
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 로그아웃 실패
 */
