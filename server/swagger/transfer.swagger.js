/**
 * @swagger
 * tags:
 *   name: Transfer
 *   description: 계좌이체 API
 */

/**
 * @swagger
 * /api/transfer:
 *   post:
 *     summary: 계좌이체
 *     tags: [Transfer]
 *     security:
 *       - cookieAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               from_account_id:
 *                 type: integer
 *                 example: 1
 *
 *               to_account_number:
 *                 type: string
 *                 example: 100-7390-410339
 *
 *               amount:
 *                 type: integer
 *                 example: 10000
 *
 *               memo:
 *                 type: string
 *                 example: 테스트 이체
 *
 *     responses:
 *
 *       201:
 *         description: 계좌이체 성공
 *
 *         content:
 *           application/json:
 *
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: 계좌이체 성공
 *
 *       400:
 *         description: 잘못된 요청
 *
 *         content:
 *           application/json:
 *
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 message:
 *                   type: string
 *
 *                   examples:
 *                     inputError:
 *                       value: 입력값 누락
 *
 *                     amountError:
 *                       value: 금액 오류
 *
 *                     balanceError:
 *                       value: 잔액 부족
 *
 *                     sameAccount:
 *                       value: 동일 계좌 이체 불가
 *
 *       404:
 *         description: 계좌 없음
 *
 *         content:
 *           application/json:
 *
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 message:
 *                   type: string
 *
 *                   examples:
 *                     fromAccount:
 *                       value: 출금 계좌 없음
 *
 *                     toAccount:
 *                       value: 입금 계좌 없음
 *
 *       500:
 *         description: 서버 오류
 *
 *         content:
 *           application/json:
 *
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 message:
 *                   type: string
 *                   example: 계좌 이체 서버 에러
 */