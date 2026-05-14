/**
 * @swagger
 * tags:
 *   name: Recommend
 *   description: 예금 상품 추천 API
 */

/**
 * @swagger
 * /api/recommend/deposits:
 *   post:
 *     summary: 예금 상품 추천
 *     description: 설문 답변을 기반으로 예금 상품 TOP 3를 추천합니다.
 *     tags: [Recommend]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - goalType
 *               - amountRange
 *               - periodMonths
 *               - incomeRange
 *               - preferenceType
 *             properties:
 *               goalType:
 *                 type: string
 *                 description: 저축 목표
 *                 enum: [emergency, travel, lump_sum, housing, investment]
 *                 example: lump_sum
 *               amountRange:
 *                 type: string
 *                 description: 예치 가능 금액 범위
 *                 enum: [under_100, 100_400, 400_700, 700_1000, over_1000]
 *                 example: 100_400
 *               periodMonths:
 *                 type: integer
 *                 description: 가입 기간
 *                 enum: [3, 6, 12, 24]
 *                 example: 12
 *               incomeRange:
 *                 type: string
 *                 description: 월 소득 범위
 *                 enum: [under_100, 100_200, 200_300, over_300]
 *                 example: 100_200
 *               preferenceType:
 *                 type: string
 *                 description: 추천 성향
 *                 enum: [stable, balanced, profit]
 *                 example: balanced
 *           example:
 *             goalType: lump_sum
 *             amountRange: 100_400
 *             periodMonths: 12
 *             incomeRange: 100_200
 *             preferenceType: balanced
 *     responses:
 *       200:
 *         description: 예금 상품 추천 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 7
 *                       product_name:
 *                         type: string
 *                         example: 도토리 안정예금
 *                       product_code:
 *                         type: string
 *                         example: DOTORI_DEPOSIT_STABLE
 *                       product_type:
 *                         type: string
 *                         example: deposit
 *                       min_period_months:
 *                         type: integer
 *                         nullable: true
 *                         example: 12
 *                       max_period_months:
 *                         type: integer
 *                         nullable: true
 *                         example: 24
 *                       min_amount:
 *                         type: integer
 *                         nullable: true
 *                         example: 500000
 *                       max_amount:
 *                         type: integer
 *                         nullable: true
 *                         example: 30000000
 *                       period_months:
 *                         type: integer
 *                         example: 12
 *                       interest_rate:
 *                         type: string
 *                         example: "3.900"
 *                       early_termination_rate:
 *                         type: string
 *                         nullable: true
 *                         example: "1.950"
 *                       score:
 *                         type: number
 *                         format: float
 *                         example: 71.6
 *             example:
 *               success: true
 *               recommendations:
 *                 - id: 7
 *                   product_name: 도토리 안정예금
 *                   product_code: DOTORI_DEPOSIT_STABLE
 *                   product_type: deposit
 *                   min_period_months: 12
 *                   max_period_months: 24
 *                   min_amount: 500000
 *                   max_amount: 30000000
 *                   period_months: 12
 *                   interest_rate: "3.900"
 *                   early_termination_rate: "1.950"
 *                   score: 71.6
 *       400:
 *         description: 필수 설문 답변 누락 또는 잘못된 요청
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 필수 설문 답변이 누락되었습니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 상품 추천 중 오류가 발생했습니다.
 */
