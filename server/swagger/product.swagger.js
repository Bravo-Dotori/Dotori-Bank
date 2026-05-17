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

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: 상품 목록 조회
 *     description: 가입 가능한 전체 상품 목록을 조회합니다.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: 상품 목록 조회 성공
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
 *                   example: 상품 목록 조회에 성공했습니다.
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_name:
 *                         type: string
 *                         example: 도토리 자유예금
 *                       interest_rate:
 *                         type: number
 *                         format: float
 *                         example: 3.5
 *                       max_period_months:
 *                         type: integer
 *                         example: 24
 *                       product_desc:
 *                         type: string
 *                         example: 자유롭게 예치 가능한 예금 상품
 *             example:
 *               success: true
 *               message: 상품 목록 조회에 성공했습니다.
 *               products:
 *                 - product_name: 도토리 자유예금
 *                   interest_rate: 3.5
 *                   max_period_months: 24
 *                   product_desc: 자유롭게 예치 가능한 예금 상품
 *                 - product_name: 도토리 목돈예금
 *                   interest_rate: 4.0
 *                   max_period_months: 36
 *                   product_desc: 목돈 마련을 위한 고금리 상품
 *
 *       404:
 *         description: 상품이 존재하지 않음
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 상품이 없습니다.
 *
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 상품 목록 조회를 다시 시도해주세요.
 * 
 */
/**
 * @swagger
 * /api/products/myProducts:
 *   get:
 *     summary: 내 상품 목록 조회
 *     description: 로그인한 사용자의 가입 상품 목록을 조회합니다.
 *     tags: [Products]
 *     
 *     security:
 *       - cookieAuth: []
 *
 *     responses:
 *       200:
 *         description: 내 상품 목록 조회 성공
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
 *                   example: 상품 목록 조회에 성공했습니다.
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       product_name:
 *                         type: string
 *                         example: 도토리 정기예금 12개월
 *                       product_type:
 *                         type: string
 *                         example: deposit
 *                       target_period_months:
 *                         type: integer
 *                         example: 12
 *                       interest_rate:
 *                         type: number
 *                         format: float
 *                         example: 3.8
 *                       product_desc:
 *                         type: string
 *                         example: 안정적으로 목돈을 모을 수 있는 예금 상품입니다.
 *
 *             example:
 *               success: true
 *               message: 상품 목록 조회에 성공했습니다.
 *               products:
 *                 - id: 1
 *                   product_name: 도토리 정기예금 12개월
 *                   product_type: deposit
 *                   target_period_months: 12
 *                   interest_rate: 3.8
 *                   product_desc: 안정적으로 목돈을 모을 수 있는 예금 상품입니다.
 *
 *                 - id: 2
 *                   product_name: 도토리 자유적금
 *                   product_type: savings
 *                   target_period_months: 24
 *                   interest_rate: 4.2
 *                   product_desc: 자유롭게 납입 가능한 적금 상품입니다.
 *
 *       401:
 *         description: 로그인 필요
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               errorCode: TOKEN_REQUIRED
 *               message: 로그인 필요
 *
 *       404:
 *         description: 가입한 상품 없음
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 상품을 찾을 수 없습니다.
 *
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 상품 목록 조회를 다시 시도해주세요.
 */