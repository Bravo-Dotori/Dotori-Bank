import styles from "./selectedCard.module.css";

const SelectedCard = ({ interestRate }) => {
    return (
        <div className={styles.card}>
            <div className={styles.left}>
                <div className={styles.badge}>
                    선택한 상품
                </div>
                <div className={styles.title}>
                    도토리 정기예금
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.rate}>
                    연 {interestRate.toFixed(1)}%
                </div>

                <div className={styles.period}>
                    24개월 기준
                </div>
            </div>
        </div>
    );
};

export default SelectedCard;