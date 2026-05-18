import styles from "./selectedCard.module.css";

const SelectedCard = ({
    title,
    interestRate,
    period,
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.left}>
                <div className={styles.badge}>
                    선택한 상품
                </div>

                <div className={styles.title}>
                    {title}
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.rate}>
                    연 {interestRate.toFixed(1)}%
                </div>

                <div className={styles.period}>
                    {period}개월 기준
                </div>
            </div>
        </div>
    );
};

export default SelectedCard;