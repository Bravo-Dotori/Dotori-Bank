import styles from "./transferAccountCard.module.css"

const TransferAccountCard = ({
    type,
    bank,
    accountNumber,
    accountName,
    balance,
    userName,
    errorMessage,
    onChange
}) => {
    const isSender = type === "send";

    return (
        <div
            className={`
                ${styles.card}
                ${isSender ? styles.sendCard : ''}
            `}
        >
            <div className={styles.title}>
                {isSender ? '보내는 계좌' : '받는 계좌'}
            </div>

            {isSender ? (
                <div className={styles.accountInfo}>
                    <div>
                        <div className={styles.accountName}>
                            {accountName}
                        </div>

                        <div className={styles.accountNumber}>
                            {accountNumber}
                        </div>
                    </div>

                    <div className={styles.balanceWrapper}>
                        <div className={styles.balanceLabel}>
                            잔액
                        </div>

                        <div className={styles.balance}>
                            {balance.toLocaleString()}원
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className={styles.inputWrapper}>
                        <input
                            className={styles.bankInput}
                            value={bank}
                            readOnly
                        />

                        <input
                            className={styles.accountInput}
                            value={accountNumber}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="계좌번호를 입력하세요"
                        />
                    </div>

                    {userName ? (
                        <div className={styles.userCard}>
                            <div className={styles.userCircle} />

                            <div>
                                <div className={styles.userCheck}>
                                    받는 분 확인 완료
                                </div>

                                <div className={styles.userName}>
                                    {userName}님 ({bank})
                                </div>
                            </div>
                        </div>
                    ) : (
                        errorMessage && (
                            <div className={styles.userCardError}>
                                <div className={styles.userCircleError} />

                                <div>
                                    <div className={styles.userCheck}>
                                        {errorMessage}
                                    </div>

                                    <div className={styles.userName}>
                                        다시 시도해주세요.
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </>
            )}
        </div>
    )
}

export default TransferAccountCard