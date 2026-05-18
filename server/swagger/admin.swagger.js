/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: 관리자 API
 */

/**
 * @swagger
 * /api/admin/transactions:
 *   get:
 *     summary: 관리자 거래 내역 조회
 *     description: |
 *       관리자가 전체 거래 내역을 조회합니다.
 *
 *       프론트 처리
 *       - from_account_number: 출금 계좌번호
 *       - to_account_number: 입금 계좌번호
 *       - is_suspicious가 true이면 의심 거래 상태 뱃지를 표시합니다.
 *       - total_count는 조회된 전체 거래 건수입니다.
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *
 *     responses:
 *       200:
 *         description: 관리자 거래 내역 조회 성공
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
 *                   example: 관리자 거래 내역 조회 성공
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_count:
 *                       type: integer
 *                       example: 9
 *                     transactions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           transaction_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-16T14:48:02.000Z
 *                           from_account_id:
 *                             type: integer
 *                             example: 1
 *                           to_account_id:
 *                             type: integer
 *                             example: 2
 *                           type:
 *                             type: string
 *                             example: TRANSFER
 *                           amount:
 *                             type: integer
 *                             example: 3000000
 *                           is_suspicious:
 *                             type: boolean
 *                             example: false
 *                           description:
 *                             type: string
 *                             example: 초기 입출금 계좌 지급
 *                           from_account_number:
 *                             type: string
 *                             example: 100-0000-000000
 *                           to_account_number:
 *                             type: string
 *                             example: 100-1111-111111
 *
 *       400:
 *         description: 관리자 거래 내역 조회 실패
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 관리자 권한 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/admin/accounts:
 *   get:
 *     summary: 관리자 고객 계좌 내역 조회
 *     description: |
 *       관리자가 전체 고객 계좌 내역을 조회합니다.
 *
 *       프론트 처리
 *       - accounts 배열을 테이블에 표시합니다.
 *       - is_active가 true이면 토글 ON, false이면 토글 OFF로 표시합니다.
 *       - is_admin이 true이면 관리자 계좌로 표시할 수 있습니다.
 *       - total_count는 조회된 전체 계좌 건수입니다.
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *
 *     responses:
 *       200:
 *         description: 관리자 고객 계좌 내역 조회 성공
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
 *                   example: 관리자 고객내역 조회 성공
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_count:
 *                       type: integer
 *                       example: 12
 *                     accounts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-05-16T14:48:02.000Z
 *                           account_number:
 *                             type: string
 *                             example: 100-0000-000000
 *                           account_type:
 *                             type: string
 *                             example: demand
 *                           balance:
 *                             type: integer
 *                             example: 100000000
 *                           is_active:
 *                             type: boolean
 *                             example: true
 *                           is_admin:
 *                             type: boolean
 *                             example: true
 *                           user_id:
 *                             type: integer
 *                             example: 1
 *                           user_name:
 *                             type: string
 *                             example: 관리자
 *                           user_role:
 *                             type: string
 *                             example: admin
 *
 *       400:
 *         description: 관리자 고객 계좌 내역 조회 실패
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 관리자 권한 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/admin/accounts/{account_id}/active:
 *   patch:
 *     summary: 관리자 계좌 활성화 여부 변경
 *     description: |
 *       관리자가 계좌의 활성화 여부를 변경합니다.
 *
 *       요청 필드명 정리
 *       - account_id: URL path에 들어가는 계좌 id입니다.
 *       - is_active: 변경할 활성화 여부입니다. true 또는 false를 보냅니다.
 *
 *       프론트 처리
 *       - 토글을 켤 때는 is_active=true를 보냅니다.
 *       - 토글을 끌 때는 is_active=false를 보냅니다.
 *       - 성공 후 /api/admin/accounts를 다시 조회하거나, 해당 row의 is_active 값을 갱신합니다.
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: account_id
 *         required: true
 *         description: 활성화 여부를 변경할 계좌 id
 *         schema:
 *           type: integer
 *         example: 2
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - is_active
 *             properties:
 *               is_active:
 *                 type: boolean
 *                 example: false
 *
 *     responses:
 *       200:
 *         description: 계좌 활성화 여부 변경 성공
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
 *                   example: 계좌 활성화 여부 변경 성공
 *
 *       400:
 *         description: 요청값 오류 또는 계좌 없음
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 관리자 권한 없음
 *       500:
 *         description: 서버 오류
 */
