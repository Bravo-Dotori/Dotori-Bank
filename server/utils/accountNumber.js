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