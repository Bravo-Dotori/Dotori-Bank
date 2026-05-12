import styles from "./login.module.css"
import keyVisual from "@/assets/key-visual.png"

import PageHeader from "@/components/pageHeader/PageHeader"
import Form from "@/components/form/Form"
import Btn from "@/components/button/Btn"
import AuthRedirect from "@/components/authRedirect/AuthRedirect"

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
        <div className={styles.login}>
          <PageHeader
            title="로그인"
            description="아이디와 비밀번호로 로그인하세요"
          />
          <div className={styles.formArea}>
            <Form
              name="아이디"
              type="text"
              placeholder="아이디를 입력하세요"
            />
            <Form
              name="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <Btn
            name="로그인"
            size="big"
            active
          />
          <AuthRedirect
            text="아직 회원이 아니신가요?"
            linkText="회원가입"
            to="/signup"
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage