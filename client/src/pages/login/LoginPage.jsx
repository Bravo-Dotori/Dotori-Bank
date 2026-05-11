import styles from "./login.module.css"
import keyVisual from "@/assets/key-visual.png"

const LoginPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.leftPanel}>
        <div className={styles.title}>도토리은행</div>
        <div className={styles.subTitle}>내 도토리, 태산이 되다</div>
        <div className={styles.description}>
          작은 도토리도 꾸준히 모으면 큰 산이 됩니다
        </div>

        <img
          src={keyVisual}
          className={styles.keyVisualImg}
          alt="key-visual"
        />
      </div>

      <div className={styles.rightPanel}>
        {/* 로그인 폼 들어갈 자리 */}
      </div>
    </div>
  )
}

export default LoginPage