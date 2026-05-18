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
 *     description: 로그인한 사용자의 전체 계좌 목록을 조회합니다.
 *     tags: [Accounts]
 *     security:
 *       - cookieAuth: []
 *
 *     responses:
 *       200:
 *         description: 계좌 조회 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: 계좌 조회 성공
 *               data:
 *                 - id: 2
 *                   user_id: 2
 *                   account_number: 100-1111-111111
 *                   account_type: demand
 *                   balance: 3000000
 *                   transfer_limit: 3000000
 *                   is_active: true
 *                   created_at: 2026-05-14T11:20:30.000Z
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errorCode: TOKEN_REQUIRED
 *               message: 로그인 필요
 *       404:
 *         description: 계좌 정보 없음
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errorCode: ACCOUNT_NOT_FOUND
 *               message: 계좌 정보 없음
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errorCode: ACCOUNT_SERVER_ERROR
 *               message: 계좌 조회 서버 에러
 */

/**
 * @swagger
 * /api/accounts:
 *   post:
 *     summary: 입출금 계좌 생성
 *     description: 로그인한 사용자에게 기본 입출금 계좌를 생성합니다.
 *     tags: [Accounts]
 *     security:
 *       - cookieAuth: []
 *
 *     responses:
 *       201:
 *         description: 입출금 계좌 생성 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 account_id: 13
 *                 account_number: 100-1234-567890
 *       400:
 *         description: 계좌 생성 실패
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 계좌 생성 실패
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errorCode: TOKEN_REQUIRED
 *               message: 로그인 필요
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errorCode: ACCOUNT_SERVER_ERROR
 *               message: 계좌 생성 서버 에러
 */

/**
 * @swagger
 * /api/accounts/toAccount:
 *   post:
 *     summary: 받는 계좌 조회
 *     description: 계좌번호로 받는 계좌 정보를 조회합니다.
 *     tags: [Accounts]
 *     security:
 *       - cookieAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - account_number
 *             properties:
 *               account_number:
 *                 type: string
 *                 example: 100-1111-111111
 *
 *     responses:
 *       200:
 *         description: 받는 계좌 조회 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: 계좌 조회 성공
 *               data:
 *                 - id: 2
 *                   user_id: 2
 *                   account_number: 100-1111-111111
 *                   account_type: demand
 *                   balance: 3000000
 *                   name: 김이슬
 *       400:
 *         description: 필수값 누락
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 필수값 누락
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errorCode: TOKEN_REQUIRED
 *               message: 로그인 필요
 *       404:
 *         description: 계좌 정보 없음
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errorCode: ACCOUNT_NOT_FOUND
 *               message: 계좌 정보 없음
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errorCode: ACCOUNT_SERVER_ERROR
 *               message: 계좌 조회 서버 에러
 */

/**
 * @swagger
 * /api/accounts/{account_id}:
 *   get:
 *     summary: 계좌 상세 조회
 *     description: 로그인한 사용자의 특정 계좌 상세 정보를 조회합니다.
 *     tags: [Accounts]
 *     security:
 *       - cookieAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: account_id
 *         required: true
 *         description: 조회할 계좌 id
 *         schema:
 *           type: integer
 *         example: 2
 *
 *     responses:
 *       200:
 *         description: 계좌 상세 조회 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: 계좌 조회 성공
 *               data:
 *                 id: 2
 *                 user_id: 2
 *                 account_number: 100-1111-111111
 *                 account_type: demand
 *                 balance: 3000000
 *                 is_active: true
 *                 created_at: 2026-05-14T11:20:30.000Z
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errorCode: TOKEN_REQUIRED
 *               message: 로그인 필요
 *       404:
 *         description: 계좌 정보 없음
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errorCode: ACCOUNT_NOT_FOUND
 *               message: 계좌 정보 없음
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errorCode: ACCOUNT_SERVER_ERROR
 *               message: 계좌 조회 서버 에러
 */
