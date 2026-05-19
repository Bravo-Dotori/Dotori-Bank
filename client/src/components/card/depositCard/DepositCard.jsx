import styles from "./depositCard.module.css"

import Btn from "@/components/button/Btn"

const DepositCard = ({
    rank,
    title,
    rate,
    period,
    maxPeriod,
    description,
    onClick,
    value,
    btnText,
    isLoading,
    isError,
    type 
}) => {
    if (isLoading) {
        return  <div>로딩 발생</div>;
    }

    if (isError) {
        return <div>에러 발생</div>;
    }
    return (
        <div className={styles.card}>
            <div>
                {rank && (
                    <div className={styles.rank}>
                        {rank}순위
                    </div>
                )}

                <div className={styles.title}>
                    {title}
                </div>

                <div className={styles.rate}>
                    {maxPeriod ? `최대 연 ${rate}%` : `연 ${rate}%`}
                </div>

                {type === "deposit" && (
                    <div className={styles.period}>
                        {maxPeriod
                            ? `최대 ${maxPeriod}개월 가입`
                            : `${period}개월 가입`}
                    </div>
                )}
                <div className={styles.description}>
                    {description}
                </div>
            </div>

            <Btn
                name={btnText || "자세히 보기"}
                size="big"
                value={value}
                onClick={onClick}
            />
        </div>
    )
}

export default DepositCard