exports.createAccountNumber = () => {
  const bankCode = "100";

  const middle = Math.floor(
    1000 + Math.random() * 9000
  );

  const last = Math.floor(
    100000 + Math.random() * 900000
  );

  return `${bankCode}-${middle}-${last}`;
};

// const MAX_ACCOUNT_NUMBER_RETRY = 5;

// let accountResult;
// let accountNumber;

// for (let i = 0; i < MAX_ACCOUNT_NUMBER_RETRY; i++) {
//   accountNumber = createAccountNumber();

//   try {
//     accountResult = await accountModel.createAccount(
//       conn,
//       user_id,
//       accountNumber,
//       "deposit",
//       0
//     );

//     break;
//   } catch (err) {
//     if (err.code === "ER_DUP_ENTRY") {
//       continue;
//     }

//     throw err;
//   }
// }

// if (!accountResult || !accountResult.insertId) {
//   throw new Error("계좌번호 생성 실패");
// }