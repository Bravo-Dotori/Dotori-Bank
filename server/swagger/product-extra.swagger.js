/**
 * @swagger
 * /api/products/myProducts/{productId}:
 *   get:
 *     summary: 내 상품 상세 조회
 *     description: 로그인한 사용자의 가입 상품 상세 정보를 조회합니다.
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: user_products 기준 가입 상품 id
 *         schema:
 *           type: integer
 *         example: 1
 *
 *     responses:
 *       200:
 *         description: 내 상품 상세 조회 성공
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
 *                   example: 내 상품 상세 조회 성공
 *                 product:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       subscription_id:
 *                         type: integer
 *                         example: 1
 *                       product_id:
 *                         type: integer
 *                         example: 11
 *                       product_name:
 *                         type: string
 *                         example: 도토리 입출금통장
 *                       product_type:
 *                         type: string
 *                         example: demand
 *                       account_id:
 *                         type: integer
 *                         example: 2
 *                       target_amount:
 *                         type: integer
 *                         example: 3000000
 *                       interest_rate:
 *                         type: number
 *                         example: 0.1
 *                       join_date:
 *                         type: string
 *                         format: date
 *                         example: 2026-05-18
 *                       maturity_date:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       status:
 *                         type: string
 *                         example: ACTIVE
 *
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errorCode: TOKEN_REQUIRED
 *               message: 로그인 필요
 *       404:
 *         description: 가입 상품 없음
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 상품을 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 상품 상세 조회 서버 에러
 */

/**
 * @swagger
 * /api/products/myProducts/{productId}/cancel:
 *   patch:
 *     summary: 내 상품 해지
 *     description: 로그인한 사용자의 가입 상품을 해지합니다.
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: user_products 기준 해지할 가입 상품 id
 *         schema:
 *           type: integer
 *         example: 1
 *
 *     responses:
 *       200:
 *         description: 상품 해지 성공
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
 *                   example: 상품 해지 성공
 *
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errorCode: TOKEN_REQUIRED
 *               message: 로그인 필요
 *       404:
 *         description: 해지할 상품 없음
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 상품을 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 상품 해지 서버 에러
 */
