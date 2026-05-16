import { useNavigate } from "react-router-dom";

import styles from "./transactionSection.module.css"

const TransactionSection = ({ title, transactions, more }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.transactionSection}>
            <div className={styles.transactionHeader}>
                <div className={styles.transactionTitle}>
                    {title} · {transactions.length}건
                </div>

                {more && (
                    <div
                        className={styles.more}
                        onClick={() => navigate('/history')}
                    >
                        전체보기 ›
                    </div>
                )}
            </div>

            <div className={styles.transactionList}>
                {transactions.map((item) => (
                    <div
                        key={item.id}
                        className={styles.transactionItem}
                    >
                        <div className={styles.transactionLeft}>
                            <div
                                className={`
                                    ${styles.icon}
                                    ${item.type === "deposit"
                                        ? styles.deposit
                                        : styles.withdraw
                                    }
                                `}
                            >
                                {item.type === "deposit" ? "↓" : "↑"}
                            </div>

                            <div className={styles.transactionInfo}>
                                <div className={styles.transactionName}>
                                    {item.title}
                                </div>

                                <div className={styles.transactionDescription}>
                                    {item.description}
                                    <span> · </span>
                                    {item.date}
                                </div>
                            </div>
                        </div>

                        <div
                            className={`
                                ${styles.amount}
                                ${item.type === "deposit"
                                    ? styles.plus
                                    : styles.minus
                                }
                            `}
                        >
                            {item.amount}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TransactionSection