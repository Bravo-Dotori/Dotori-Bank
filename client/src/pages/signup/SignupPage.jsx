import styles from "./signup.module.css"
import keyVisual from "@/assets/key-visual.png"

import PageHeader from "@/components/pageHeader/PageHeader"
import Form from "@/components/form/Form"
import Btn from "@/components/button/Btn"
import AuthRedirect from "@/components/authRedirect/AuthRedirect"

const SignupPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.leftPanel}>
        <div className={styles.title}>도토리은행</div>
        <div className={styles.subTitle}>내 도토리, 태산이 되다</div>
        <div className={styles.description}>
          작은 도토리도 꾸준히 모으면 큰 산이 됩니다
        </div>

        <div className={styles.welcomeCard}>
          <div className={styles.cardTitle}>가입 축하금</div>

          <div className={styles.amount}>300만원</div>

          <div className={styles.cardDescription}>
            입출금계좌로 즉시 입금
          </div>
        </div>

        <ul className={styles.benefitList}>
          <li>입출금계좌 자동 개설</li>
          <li>맞춤 예금 상품 추천</li>
          <li>만기 알림 자동 발송</li>
        </ul>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.login}>
          <PageHeader
            title="회원가입"
            description="이메일과 휴대폰 번호로 가입하세요"
          />
          <div className={styles.formArea}>
            <Form
              name="이메일"
              type="text"
              placeholder="name@example.com"
            />
            <Form
              name="아이디"
              type="text"
              placeholder="4~16자 영문/숫자"
            />
            <Form
              name="비밀번호"
              type="password"
              placeholder="8자 이상 입력"
            />
            <Form
              name="비밀번호 확인"
              type="password"
              placeholder="8자 이상 입력"
            />
            <Form
              name="이름"
              type="text"
              placeholder="예) 홍길동"
            />
            <Form
              name="생년월일"
              type="text"
              placeholder="YYYY-MM-DD"
            />
          </div>
          <Btn
            name="가입하기"
            size="big"
            active
          />
          <AuthRedirect
            text="이미 회원이신가요?"
            linkText="로그인"
            to="/login"
          />
        </div>
      </div>
    </div>
  )
}

export default SignupPage