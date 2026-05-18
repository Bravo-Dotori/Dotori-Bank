import { useNavigate } from "react-router-dom";

import styles from "./transactionSection.module.css";

const TransactionSection = ({
  title,
  transactions,
  accountId,
  more,
  totalCount
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.transactionSection}>
      <div className={styles.transactionHeader}>
        <div className={styles.transactionTitle}>
          {title} · {totalCount}건
        </div>

        {more && (
          <div
            className={styles.more}
            onClick={() => navigate("/history")}
          >
            전체보기 ›
          </div>
        )}
      </div>

      <div className={styles.transactionList}>
        {transactions.map((item) => {
          const isDeposit =
            accountId === item.to_account_id;

          return (
            <div
              key={item.id}
              className={styles.transactionItem}
            >
              <div className={styles.transactionLeft}>
                <div
                  className={`
                    ${styles.icon}
                    ${
                      isDeposit
                        ? styles.deposit
                        : styles.withdraw
                    }
                  `}
                >
                  {isDeposit ? "↓" : "↑"}
                </div>

                <div className={styles.transactionInfo}>
                  <div className={styles.transactionName}>
                    {item.type === "TRANSFER" && isDeposit
                      ? `${item.from_user_name}에게 받음`
                      : item.type === "TRANSFER" && !isDeposit
                      ? `${item.to_user_name}에게 보냄`
                      : item.type === "DEPOSIT" 
                      ? `예금 입금`
                      : "출금"
                    }
                  </div>

                  <div
                    className={
                      styles.transactionDescription
                    }
                  >
                    {
                        item.type === "TRANSFER" && isDeposit
                            ? "이체 받음"
                            : item.type === "TRANSFER" && !isDeposit
                            ? "이체 보냄"
                            : item.type === "DEPOSIT"
                            ? "예금 입금"
                            : "출금"
                    }
                    <span> · </span>
                    {item.type !== "DEPOSIT" && (
                        <>
                            {item.description}
                            <span> · </span>
                        </>
                    )}
                    {new Date(
                      item.transaction_at
                    ).toLocaleString("ko-KR")}
                  </div>
                </div>
              </div>

              <div
                className={`
                  ${styles.amount}
                  ${
                    isDeposit
                      ? styles.plus
                      : styles.minus
                  }
                `}
              >
                {isDeposit ? "+" : "-"}
                {item.amount.toLocaleString()}원
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionSection;