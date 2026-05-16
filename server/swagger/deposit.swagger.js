/**
 * @swagger
 * tags:
 *   name: Deposits
 *   description: 예금 API
 */

/**
 * @swagger
 * /api/deposits:
 *   post:
 *     summary: 예금 상품 가입
 *     tags: [Deposits]
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
 *               - product_id
 *               - target_period_months
 *               - target_amount
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 1
 *               target_period_months:
 *                 type: integer
 *                 example: 6
 *               target_amount:
 *                 type: integer
 *                 example: 100000
 *
 *     responses:
 *       201:
 *         description: 예금 가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 예금 가입 성공
 *                 data:
 *                   type: object
 *                   properties:
 *                     depositAccountId:
 *                       type: integer
 *                       example: 6
 *                     depositAccountNumber:
 *                       type: string
 *                       example: 100-7445-734254
 *                     targetAmount:
 *                       type: integer
 *                       example: 100000
 *                     targetPeriodMonths:
 *                       type: integer
 *                       example: 6
 *                     interestRate:
 *                       type: number
 *                       example: 3.1
 *                     maturityDate:
 *                       type: string
 *                       format: date
 *                       example: 2026-11-15
 *
 *       400:
 *         description: 요청값 오류 또는 가입 조건 불일치
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 필수값 누락
 *
 *       404:
 *         description: 상품 또는 계좌 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 해당 상품 없음
 *
 *       409:
 *         description: 잔액 부족 등 현재 상태와 충돌
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 입출금 계좌 잔액 부족
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
 *                 message:
 *                   type: string
 *                   example: 예금 가입 서버 에러
 */
