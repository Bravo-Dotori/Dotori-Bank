import styles from "./depositCard.module.css"

import Btn from "@/components/button/Btn"

const DepositCard = ({
    rank,
    title,
    rate,
    period,
    description,
    onClick,
    value
}) => {
    return (
        <div className={styles.card}>
            {rank && (
                <div className={styles.rank}>
                    {rank}순위
                </div>
            )}

            <div className={styles.title}>
                {title}
            </div>

            <div className={styles.rate}>
                연 {rate}%
            </div>

            <div className={styles.period}>
                {period} 가입
            </div>

            <div className={styles.description}>
                {description}
            </div>

            <Btn
                name="자세히 보기"
                size="big"
                value={value}
            />
        </div>
    )
}

export default DepositCard