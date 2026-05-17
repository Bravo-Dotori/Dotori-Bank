import styles from "./recommendDepositCard.module.css"

import Btn from "@/components/button/Btn"

const RecommendDepositCard = ({
    name,
    title,
    rate,
    period,
    minAmount,
    description,
    reasons = [],
}) => {

    return (
        <div className={styles.card}>
            <div className={styles.top}>
                <div className={styles.badge}>
                    🏆 1순위 추천
                </div>

                <div className={styles.matchText}>
                    {name}님 답변과 가장 잘 맞아요
                </div>
            </div>

            <div className={styles.title}>
                {title}
            </div>

            <div className={styles.rate}>
                연 {rate}%
            </div>

            <div className={styles.infoWrapper}>
                <div className={styles.infoBox}>
                    <div className={styles.infoTitle}>
                        가입 기간
                    </div>

                    <div className={styles.infoValue}>
                        {period}
                    </div>
                </div>

                <div className={styles.infoBox}>
                    <div className={styles.infoTitle}>
                        최소 금액
                    </div>

                    <div className={styles.infoValue}>
                        {minAmount}
                    </div>
                </div>

                <div className={styles.infoBox}>
                    <div className={styles.infoTitle}>
                        상품 특징
                    </div>

                    <div className={styles.infoValue}>
                        {description}
                    </div>
                </div>
            </div>

            <div className={styles.reasonBox}>
                <div className={styles.reasonTitle}>
                    왜 추천하나요?
                </div>

                {reasons.map((reason, index) => (
                    <div
                        key={index}
                        className={styles.reason}
                    >
                        · {reason}
                    </div>
                ))}
            </div>

            <Btn
                name="가입하기"
                size="big"
                active
                value="/depositDetail"
            />
        </div>
    )
}

export default RecommendDepositCard