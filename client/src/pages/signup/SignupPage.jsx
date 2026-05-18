import { useEffect, useState } from "react"

import styles from "./signup.module.css"

import keyVisual from "@/assets/key-visual.png"

import PageHeader from "@/components/pageHeader/PageHeader"
import Form from "@/components/form/Form"
import Btn from "@/components/button/Btn"
import AuthRedirect from "@/components/authRedirect/AuthRedirect"
import Modal from "@/components/modal/Modal"

import useStore from "@/store/useStore";

const SignupPage = () => {
  const setLogin = useStore((state) => state.setLogin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    userId: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthDate: ""
  });
  const [errors, setErrors] = useState({
    email: '',
    confirmPassword: '',
  });

  const validateEmail = () => {
    const isValidEmail =
      form.email.includes('@') &&
      form.email.includes('.');

    if (!isValidEmail) {
      setErrors({
        ...errors,
        email: '올바른 이메일 형식이 아니에요',
      });

      return false;
    }

    setErrors({
      ...errors,
      email: '',
    });

    return true;
  };

  const validatePassword = () => {
    if (form.password !== form.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: '비밀번호가 일치하지 않습니다',
      });

      return false;
    }

    setErrors({
      ...errors,
      confirmPassword: '',
    });

    return true;
  };

  const handleBirthDateChange = (e) => {
    let value = e.target.value;

    value = value.replace(/\D/g, '');

    value = value.slice(0, 8);

    if (value.length >= 5 && value.length <= 6) {
      value = `${value.slice(0, 4)}-${value.slice(4)}`;
    } else if (value.length >= 7) {
      value = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6)}`;
    }

    setForm({
      ...form,
      birthDate: value,
    });
  };

  const handleSubmitClick = async () => {
    try {
      // 유효성 검사
      const isValidEmail = validateEmail();
      const isValidPassword = validatePassword();
      if (!isValidEmail || !isValidPassword) return;

      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          user_id: form.userId,
          password: form.password,
          name: form.name,
          birth_date: form.birthDate,
        }),
      });
      const data = await response.json();

      setLogin(data.user);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

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
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              error={errors.email}
            />
            <Form
              name="아이디"
              type="text"
              placeholder="영문/숫자 가능"
              value={form.userId}
              onChange={(e) =>
                setForm({
                  ...form,
                  userId: e.target.value,
                })
              }
            />
            <Form
              name="비밀번호"
              type="password"
              placeholder="영문/숫자 가능"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
            <Form
              name="비밀번호 확인"
              type="password"
              placeholder="영문/숫자 가능"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
              error={errors.confirmPassword}
            />
            <Form
              name="이름"
              type="text"
              placeholder="홍길동"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
            <Form
              name="생년월일"
              type="text"
              placeholder="YYYY-MM-DD"
              value={form.birthDate}
              onChange={handleBirthDateChange}
            />
          </div>
          <Btn
            name="가입하기"
            size="big"
            active
            onClick={() => handleSubmitClick()}
            disabled={
              !form.email.includes('@') ||
              !form.email.includes('.') ||
              !form.userId ||
              form.password !== form.confirmPassword ||
              form.birthDate.length !== 10
            }
          />
          <AuthRedirect
            text="이미 회원이신가요?"
            linkText="로그인"
            to="/login"
          />
        </div>
      </div>


      {isModalOpen && (
        <Modal
          showLogo
          title='환영합니다, 도토리님!'
          description='회원가입이 완료되었어요'
          rewardLabel='가입 축하금 도착'
          reward='+ 300만원'
          rewardDescription='입출금계좌로 즉시 입금되었어요'
          buttons={[
            {
              name: '설문하고 맞춤 상품 추천받기',
              value: '/onboarding',
              active: true,
            },
            {
              name: '전체 상품 둘러보기',
              value: '/',
            },
          ]}
        />
      )}
    </div>
  )
}

export default SignupPage