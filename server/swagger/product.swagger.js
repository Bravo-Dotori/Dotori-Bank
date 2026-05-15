/**
 * @swagger
 * tags:
 *   name: Products
 *   description: 상품 조회 API
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: 상품 상세 조회
 *     description: 상품 ID를 기준으로 상품 상세 정보와 기간별 금리 목록을 조회합니다.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 상품 ID
 *         example: 5
 *     responses:
 *       200:
 *         description: 상품 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     product_name:
 *                       type: string
 *                       example: 도토리 목돈예금
 *                     product_code:
 *                       type: string
 *                       example: DOTORI_DEPOSIT_BIG
 *                     product_type:
 *                       type: string
 *                       example: deposit
 *                     min_period_months:
 *                       type: integer
 *                       nullable: true
 *                       example: 12
 *                     max_period_months:
 *                       type: integer
 *                       nullable: true
 *                       example: 24
 *                     min_amount:
 *                       type: integer
 *                       nullable: true
 *                       example: 5000000
 *                     max_amount:
 *                       type: integer
 *                       nullable: true
 *                       example: 200000000
 *                     interests:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           period_months:
 *                             type: integer
 *                             example: 12
 *                           interest_rate:
 *                             type: number
 *                             format: float
 *                             example: 4.0
 *                           early_termination_rate:
 *                             type: number
 *                             format: float
 *                             nullable: true
 *                             example: 2.0
 *             example:
 *               success: true
 *               product:
 *                 id: 5
 *                 product_name: 도토리 목돈예금
 *                 product_code: DOTORI_DEPOSIT_BIG
 *                 product_type: deposit
 *                 min_period_months: 12
 *                 max_period_months: 24
 *                 min_amount: 5000000
 *                 max_amount: 200000000
 *                 interests:
 *                   - period_months: 12
 *                     interest_rate: 4.0
 *                     early_termination_rate: 2.0
 *                   - period_months: 24
 *                     interest_rate: 4.4
 *                     early_termination_rate: 2.2
 *       400:
 *         description: 상품 ID 누락 또는 잘못된 요청
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 상품 ID가 필요합니다.
 *       404:
 *         description: 상품을 찾을 수 없음
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
 *               message: 상품 상세 조회 중 오류가 발생했습니다.
 */
