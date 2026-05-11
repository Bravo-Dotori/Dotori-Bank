/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 회원 API
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: 회원가입
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               user_id:
 *                 type: string
 *               pwd:
 *                 type: string
 *     responses:
 *       200:
 *         description: 회원가입 성공
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: 로그인
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               pwd:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 */