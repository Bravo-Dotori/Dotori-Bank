/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: 거래 내역 API
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: 거래 내역 조회
 *     description: |
 *       로그인한 사용자의 입출금 계좌 기준 거래 내역을 조회합니다.
 *
 *       요청 필드명 정리
 *       - period: 기간 필터입니다. all, 1, 3, 6, 12 중 하나를 보냅니다.
 *       - type: 입출금 방향 필터입니다. all, in, out 중 하나를 보냅니다.
 *
 *       값 의미
 *       - period=all: 전체 기간
 *       - period=1: 최근 1개월
 *       - period=3: 최근 3개월
 *       - period=6: 최근 6개월
 *       - period=12: 최근 12개월
 *       - type=all: 전체 거래
 *       - type=in: 입금 거래
 *       - type=out: 출금 거래
 *
 *       프론트 처리
 *       - data.account_id와 transaction.to_account_id가 같으면 입금입니다.
 *       - data.account_id와 transaction.from_account_id가 같으면 출금입니다.
 *       - 입금 title은 from_user_name, 출금 title은 to_user_name을 사용하면 됩니다.
 *       - 금액 표시는 입금이면 +, 출금이면 -를 붙여 표시합니다.
 *     tags: [Transactions]
 *     security:
 *       - cookieAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: period
 *         required: false
 *         description: 기간 필터. all, 1, 3, 6, 12 중 하나를 사용합니다.
 *         schema:
 *           type: string
 *           enum: [all, "1", "3", "6", "12"]
 *           default: all
 *         example: "3"
 *
 *       - in: query
 *         name: type
 *         required: false
 *         description: 입출금 방향 필터. all은 전체, in은 입금, out은 출금입니다.
 *         schema:
 *           type: string
 *           enum: [all, in, out]
 *           default: all
 *         example: in
 *
 *     responses:
 *       200:
 *         description: 거래 내역 조회 성공
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
 *                   example: 거래 내역 조회 성공
 *                 data:
 *                   type: object
 *                   properties:
 *                     account_id:
 *                       type: integer
 *                       example: 1
 *                     total_count:
 *                       type: integer
 *                       example: 12
 *                     transactions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 10
 *                           transaction_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-05-09T14:30:00.000Z
 *                           from_account_id:
 *                             type: integer
 *                             example: 3
 *                           to_account_id:
 *                             type: integer
 *                             example: 1
 *                           type:
 *                             type: string
 *                             example: TRANSFER
 *                           amount:
 *                             type: integer
 *                             example: 3000000
 *                           balance_after:
 *                             type: integer
 *                             example: 3000000
 *                           description:
 *                             type: string
 *                             example: 가입 축하금
 *                           is_suspicious:
 *                             type: boolean
 *                             example: false
 *                           from_user_name:
 *                             type: string
 *                             example: 관리자
 *                           to_user_name:
 *                             type: string
 *                             example: 김이슬
 *
 *       400:
 *         description: 거래 내역 조회 실패
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
 *                   example: 입출금 계좌가 없습니다.
 *
 *       401:
 *         description: 인증 실패
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
 *                   example: 거래 내역 조회 서버 에러
 */
