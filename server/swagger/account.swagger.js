/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: 계좌 API
 */

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: 내 계좌 목록 조회
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: 계좌 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: 계좌 조회 성공
 *
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *
 *                       user_id:
 *                         type: integer
 *                         example: 1
 *
 *                       account_number:
 *                         type: string
 *                         example: 100-1234-567890
 *
 *                       account_type:
 *                         type: string
 *                         example: demand
 *
 *                       balance:
 *                         type: integer
 *                         example: 3000000
 *
 *                       transfer_limit:
 *                         type: integer
 *                         example: 5000000
 *
 *                       is_active:
 *                         type: boolean
 *                         example: true
 *
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-05-14T11:20:30.000Z
 *
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 errorCode:
 *                   type: string
 *                   example: INVALID_TOKEN
 *
 *                 message:
 *                   type: string
 *                   example: 토큰 인증 실패
 *
 *       404:
 *         description: 계좌 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 errorCode:
 *                   type: string
 *                   example: ACCOUNT_NOT_FOUND
 *
 *                 message:
 *                   type: string
 *                   example: 계좌 정보 없음
 *
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 errorCode:
 *                   type: string
 *                   example: ACCOUNT_SERVER_ERROR
 *
 *                 message:
 *                   type: string
 *                   example: 계좌 조회 서버 에러
 */


/**
 * @swagger
 * /api/accounts/{account_id}:
 *   get:
 *     summary: 내 계좌 상세 조회
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: account_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *
 *     responses:
 *       200:
 *         description: 계좌 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: 계좌 조회 성공
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *
 *                     user_id:
 *                       type: integer
 *                       example: 1
 *
 *                     account_number:
 *                       type: string
 *                       example: 100-1234-567890
 *
 *                     account_type:
 *                       type: string
 *                       example: demand
 *
 *                     balance:
 *                       type: integer
 *                       example: 3000000
 *
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-05-14T11:20:30.000Z
 *
 *       401:
 *         description: 인증 실패
 *
 *       404:
 *         description: 계좌 정보 없음
 *
 *       500:
 *         description: 서버 오류
 */
/**
 * @swagger
 * /api/accounts:
 *   post:
 *     summary: 입출금 계좌 생성
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       201:
 *         description: 입출금 계좌 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     account_id:
 *                       type: integer
 *                       example: 1
 *
 *                     account_number:
 *                       type: string
 *                       example: 100-1234-567890
 *
 *       400:
 *         description: 계좌 생성 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 message:
 *                   type: string
 *                   example: 계좌 생성 실패
 *
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 errorCode:
 *                   type: string
 *                   example: INVALID_TOKEN
 *
 *                 message:
 *                   type: string
 *                   example: 토큰 인증 실패
 *
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 errorCode:
 *                   type: string
 *                   example: ACCOUNT_SERVER_ERROR
 *
 *                 message:
 *                   type: string
 *                   example: 계좌 생성 서버 에러
 */

/**
 * @swagger
 * /api/accounts/toAccount:
 *   post:
 *     summary: 받는 계좌 조회
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_number:
 *                 type: string
 *                 example: 100-5958-120061
 *
 *               name:
 *                 type: string
 *                 example: 홍길동
 *
 *     responses:
 *       200:
 *         description: 계좌 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: 계좌 조회 성공
 *
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *
 *                       user_id:
 *                         type: integer
 *                         example: 1
 *
 *                       account_number:
 *                         type: string
 *                         example: 100-1234-567890
 *
 *                       account_type:
 *                         type: string
 *                         example: demand
 *
 *                       balance:
 *                         type: integer
 *                         example: 3000000
 *
 *                       is_active:
 *                         type: boolean
 *                         example: true
 *
 *                       name:
 *                         type: string
 *                         example: 홍길동
 *
 *       400:
 *         description: 필수값 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 message:
 *                   type: string
 *                   example: 필수값 누락
 *
 *       404:
 *         description: 계좌 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 errorCode:
 *                   type: string
 *                   example: ACCOUNT_NOT_FOUND
 *
 *                 message:
 *                   type: string
 *                   example: 계좌 정보 없음
 *
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 errorCode:
 *                   type: string
 *                   example: ACCOUNT_SERVER_ERROR
 *
 *                 message:
 *                   type: string
 *                   example: 계좌 조회 서버 에러
 */