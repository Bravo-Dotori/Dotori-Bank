const pool = require("../db");
const accountModel = require("../models/accountModel");
const productModel = require("../models/productModel");
const userProductModel = require("../models/userProductModel");
const transferModel = require("../models/transferModel");
const {createAccountNumber} = require("../utils/accountNumber");

// 트랜잭션 밖
// 1. 예금 상품 조회
// 2. 상품 타입/기간/금액 검증
// 3. 만기일 계산
// 4. 예금 계좌번호 생성

// 트랜잭션 시작
// 5. 입출금 계좌 조회 + row lock
// 6. 잔액 부족 확인
// 7. 예금 계좌 생성(balance 0)
// 8. user_products 등록
// 9. 입출금 계좌 출금
// 10. 예금 계좌 입금
// 11. 거래내역 저장
// 트랜잭션 종료

exports.joinDeposit = async (user_id, product_id, target_period_months, target_amount) => {
  const conn = await pool.getConnection();
  let transactionStarted = false;
  try {
    // 1. 예금 상품 조회
    const products = await productModel.findProductDetailById(product_id);
    const product = products[0];

    if (!product) {
      return {
        success: false,
        statusCode: 404,
        message: "해당 상품 없음"
      };
    }

    // 2. 예금 상품/기간/금액 검증
    if (product.product_type !== "deposit") {
      return {
        success: false,
        statusCode: 400,
        message: "예금 상품이 아닙니다"
      };
    }

    const selectedInterest = products.find((row) => {
      return Number(row.period_months) === Number(target_period_months);
    });

    if (!selectedInterest) {
      return {
        success: false,
        statusCode: 404,
        message: "해당 가입 기간의 금리 정보 없음"
      };
    }
    const depositAmount = Number(target_amount);
    const depositPeriodMonths = Number(target_period_months);
    const minAmount = Number(product.min_amount);
    const maxAmount = Number(product.max_amount);
    const interestRate = Number(selectedInterest.interest_rate);

    if (depositAmount < minAmount || depositAmount > maxAmount) {
      return {
        success: false,
        statusCode: 400,
        message: "가입 금액이 상품 가입 범위를 벗어났습니다"
      };
    }
    // 3. 만기일 계산
    const maturityDate = new Date();
    maturityDate.setMonth(maturityDate.getMonth() + depositPeriodMonths);

    const maturityDateString = [
      maturityDate.getFullYear(),
      String(maturityDate.getMonth() + 1).padStart(2, "0"),
      String(maturityDate.getDate()).padStart(2, "0"),
    ].join("-");


    // 4. 예금 계좌번호 생성
    const accountNumber = createAccountNumber();

    await conn.beginTransaction();

    // 5. 입출금 계좌 조회
    const demandAccount = await accountModel.getDemandAccountForUpdate(conn, user_id);
    
    if (!demandAccount) {
        throw new Error("입출금 계좌 없음");
    }

    // 6. 잔액 부족 확인
    if(Number(demandAccount.balance) < depositAmount){
        throw new Error("입출금 계좌 잔액 부족");
    }

    // 7. 예금 계좌 생성(balance 0)
    const depositAccountResult = await accountModel.createAccount(
        conn,
        user_id,
        accountNumber,
        "deposit",
        0
    );

    if (!depositAccountResult || !depositAccountResult.insertId) {
        throw new Error("예금 계좌 생성 실패");
    }

    const depositAccountId = depositAccountResult.insertId;
    // 8. user_products 등록
    const userProductResult = await userProductModel.createDepositSubscription(
        conn,
        product_id,
        user_id,
        depositAccountId,
        depositAmount,
        depositPeriodMonths,
        interestRate,
        maturityDateString
    );

    if (!userProductResult || userProductResult.affectedRows !== 1) {
        throw new Error("예금 상품 가입 등록 실패");
    }

    // 9. 입출금 계좌 출금
    const fromBalanceAfter = Number(demandAccount.balance) - depositAmount;

    const withdrawResult = await transferModel.withdraw(
        conn,
        demandAccount.id,
        fromBalanceAfter
    );

    if (!withdrawResult || withdrawResult.affectedRows !== 1) {
        throw new Error("입출금 계좌 출금 실패");
    }

    // 10. 예금 계좌 입금
    const depositBalanceAfter = depositAmount;

    const depositResult = await transferModel.deposit(
        conn,
        accountNumber,
        depositBalanceAfter
    );

    if (!depositResult || depositResult.affectedRows !== 1) {
        throw new Error("예금 계좌 입금 실패");
    }
    // 11. 거래내역 저장
    const transactionResult = await transferModel.createTransaction(
        conn,
        demandAccount.id,
        depositAccountId,
        "DEPOSIT",
        depositAmount,
        fromBalanceAfter,
        "예금 가입"
    );

    if (!transactionResult || transactionResult.affectedRows !== 1) {
        throw new Error("거래내역 저장 실패");
    }

    // 트랜잭션 종료
    await conn.commit();

    return {
        success: true,
        message: "예금 가입 성공",
        data: {
            depositAccountId,
            depositAccountNumber: accountNumber,
            targetAmount: depositAmount,
            targetPeriodMonths: depositPeriodMonths,
            interestRate,
            maturityDate: maturityDateString
        }
    };
    
  } catch (err) {
    await conn.rollback();

    console.error("service 예금 가입 에러 : ", err);
    return {
      success: false,
      statusCode: err.statusCode || 500,
      message: err.message || "예금 가입 서버 에러"
    }
  } finally {
    // db 연결 반납
    conn.release();
  }

}