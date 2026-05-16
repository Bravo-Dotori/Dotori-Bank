import Btn from "@/components/button/Btn"

import styles from "./transferAmountCard.module.css"

const TransferAmountCard = ({
    amount,
    setAmount,
    handleAmount,
    userAmount,
}) => {
    const handleChangeAmount = (e) => {
        const value = e.target.value.replaceAll(',', '');

        if (!/^\d*$/.test(value)) return;

        setAmount(Number(value));
    };

    return (
        <div className={styles.amountCard}>
            <div className={styles.title}>
                이체 금액
            </div>

            <div className={styles.amountWrapper}>
                <input
                    className={styles.amountInput}
                    value={amount.toLocaleString()}
                    onChange={handleChangeAmount}
                />

                <span className={styles.won}>
                    원
                </span>
            </div>

            <div className={styles.line} />

            <div className={styles.buttonWrapper}>
                {[
                    { label: '+ 1만', value: 10000 },
                    { label: '+ 5만', value: 50000 },
                    { label: '+ 10만', value: 100000 },
                    { label: '+ 50만', value: 500000 },
                    { label: '+ 100만', value: 1000000 },
                ].map((item) => (
                    <Btn
                        key={item.value}
                        name={item.label}
                        onClick={() => handleAmount(item.value)}
                    />
                ))}

                <Btn
                    name="초기화"
                    onClick={() => setAmount(0)}
                />
            </div>

            <div className={styles.bottomInfo}>
                <div className={styles.balanceText}>
                    잔액
                </div>

                <div className={styles.limit}>
                    {userAmount.toLocaleString()}원 ・ 1일 이체 한도 1,000만원
                </div>
            </div>
        </div>
    )
}

export default TransferAmountCard