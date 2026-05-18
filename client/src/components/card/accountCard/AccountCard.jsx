import styles from "./accountCard.module.css"

import Btn from "@/components/button/Btn"

const AccountCard = ({ account }) => {

    return (
        <div className={styles.accountCard}>
            <div className={styles.accountInfo}>
                <div className={styles.label}>
                    입출금계좌
                </div>

                <div className={styles.accountNumber}>
                    {account.bank} {account.account_number}
                </div>
            </div>

            <div className={styles.balanceWrapper}>
                <div className={styles.label}>
                    현재 잔액
                </div>

                <div className={styles.balance}>
                    {account.balance.toLocaleString()}원
                </div>
            </div>

            <div className={styles.buttonWrapper}>
                <Btn
                    name="이체하기"
                    size="big"
                    value="/transfer"
                />

                <Btn
                    name="거래내역 조회"
                    size="big"
                    value="/history"
                />
            </div>
        </div>
    )
}

export default AccountCard