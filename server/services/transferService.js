const pool = require("../db");
const transferModel = require("../models/transferModel");

/**
 * 트랜잭션처리
 * 1. 출금계좌 조회
 * 2. 입금계좌 조회
 * 3. 잔액 계산
 * 4. 출금
 * 5. 입금
 * 6. 거래내역 저장
 * 7. 커밋/롤백
 */

// 계좌이체
exports.transfer = async (
  user_id,
  from_account_id,
  to_account_number,
  amount,
  memo
) => {

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction(); // 트랜잭션 시작

    // 1. 출금계좌 조회
    const fromAccount =await transferModel.getFromAccount(conn, from_account_id);

    if(!fromAccount) {
      throw new Error("출금 계좌 없음");
    }

    if(fromAccount.is_active == false) {
      throw new Error("출금 계좌 비활성");
    }

    // 2. 입금계좌 조회
    const toAccount =await transferModel.getToAccount(conn, to_account_number);

    if(!toAccount) {
      throw new Error("입금 계좌 없음");
    }

    if(toAccount.is_active == false) {
      throw new Error("입금 계좌 비활성");
    }

    // 본인 계좌 확인
    if(fromAccount.user_id !== user_id) {
      throw new Error("본인 계좌만 출금 가능");
    }

    // 동일 계좌 이체 불가
    if(fromAccount.account_number === to_account_number) {
      throw new Error("동일 계좌 이체 불가");
    }

    // 잔액 부족
    if(fromAccount.balance < amount) {
      throw new Error("잔액 부족");
    }

    // 3. 잔액 계산
    const fromBalanceAfter =fromAccount.balance - amount;

    const toBalanceAfter =toAccount.balance + amount;

    // 4. 출금
    await transferModel.withdraw(conn, from_account_id, fromBalanceAfter);

    // 5. 입금
    await transferModel.deposit(conn, to_account_number, toBalanceAfter);

    // 6. 거래내역 저장
    await transferModel.createTransaction(conn, from_account_id, toAccount.id, "TRANSFER", amount, fromBalanceAfter, memo);

    // 커밋
    await conn.commit();

    return {
      success: true,
      message: "계좌이체 성공"
    };

  } catch (err) {
    // 롤백
    await conn.rollback();

    console.error("service 계좌이체 에러 :",err);

    return {
      success: false,
      message: err.message
    };

  } finally {
    // db 연결 반납
    conn.release();
  }
}
