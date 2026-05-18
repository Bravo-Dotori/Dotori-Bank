import Btn from "../../button/Btn"
import styles from "./bannerCard.module.css"

const BannerCard = ({ badge, title, desc, btnText, img, imgAlt, value }) => {
    return (
        <div className={styles.bannerCard}>
            <div className={`${styles.bannerInfo} bannerInfo`}>
                <span className={styles.badge}>{badge}</span>
                <div className={styles.title}>{title}</div>
                <div className={styles.desc}>{desc}</div>
                <Btn name={btnText} size="middle" value={value} />
            </div>
            <div className={styles.bannerImg}>
                <div className={styles.img}>
                    <img src={img} alt={imgAlt} />
                </div>
            </div>
        </div>
    )
}

export default BannerCard