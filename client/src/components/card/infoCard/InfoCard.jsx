import styles from "./infoCard.module.css"

const InfoCard = ({ items }) => {
    return (
        <div className={styles.infoCard}>
            {items.map((item) => (
                <div
                    key={item.label}
                    className={styles.infoRow}
                >
                    <div className={styles.infoLabel}>
                        {item.label}
                    </div>

                    <div className={styles.infoValue}>
                        {item.value}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default InfoCard