const pool = require("../db");

// 거래 내역 조회
exports.getTransactions = async (user_id, period, type) => {

  let sql = `
    select

      거래일시 transactions
    from 
  `
}

// 관리자 거래 내역 조회
exports.adminTransaction = async (  
) => {
  let sql = ` 
    select 
      transaction_at,
      from_account_id,
      to_account_id,
      amount,
      is_suspicious,
      description
    from transactions
    order by transaction_ad desc


    ORDER BY
      transaction_at DESC

    LIMIT 20
  `
}
