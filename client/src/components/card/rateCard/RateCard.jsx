import '@/App.css'
import styles from './rateCard.module.css'

const RateCard = ({
    baseRate,
}) => {
    return (
        <div className={styles.rateCard}>
            <div className={styles.rateBox}>
                <div className={styles.rateTitle}>
                    기본 금리
                </div>

                <div className={styles.rate}>
                    연 {baseRate.toFixed(1)}%
                </div>
            </div>
        </div>
    );
};

export default RateCard;