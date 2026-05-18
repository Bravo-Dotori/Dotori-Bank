import { useState } from "react"
import { useNavigate } from "react-router-dom"

import styles from "./login.module.css"
import keyVisual from "@/assets/key-visual.png"

import PageHeader from "@/components/pageHeader/PageHeader"
import Form from "@/components/form/Form"
import Btn from "@/components/button/Btn"
import AuthRedirect from "@/components/authRedirect/AuthRedirect"
import { useState } from "react"
import useStore from "@/store/useStore";
import { login } from "../../api/loginApi"
import { useNavigate } from "react-router-dom"


const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userId: "",
    password: "",
  });

  const handleSubmitClick = async () => {
    setErrors({
      userId: "",
      password: "",
    });

    if (!form.userId) {
      setErrors((prev) => ({
        ...prev,
        userId: "아이디를 입력해주세요",
      }));

      return;
    }

    if (!form.password) {
      setErrors((prev) => ({
        ...prev,
        password: "비밀번호를 입력해주세요",
      }));

      return;
    }

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          user_id: form.userId,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.message.includes("아이디")) {
          setErrors((prev) => ({
            ...prev,
            userId: data.message,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            password: data.message || "로그인에 실패했어요",
          }));
        }

        return;
      }

      console.log(data.user);

      navigate("/");
    } catch (error) {
      console.log(error);

      setErrors((prev) => ({
        ...prev,
        password: "서버 오류가 발생했어요",
      }));
    }
  };

  const navigator = useNavigate();
  const setLogin = useStore((state) => state.setLogin);
  
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");

  const loginEvent = async () => {
      try {
          const data = await login(user_id, password);
          setLogin(data.user);
          navigator("/account")
      } catch (err) {
          alert(err.message);
      }
  }
  return (
    <div className={styles.main}>
      <div className={styles.leftPanel}>
        <div className={styles.title}>도토리은행</div>

        <div className={styles.subTitle}>
          내 도토리, 태산이 되다
        </div>

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
              value={form.userId}
              onChange={(e) =>
                setForm({
                  ...form,
                  userId: e.target.value,
                })
              }
              error={errors.userId}
              onChange={(e) => setUser_id(e.target.value)}
            />

            <Form
              name="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              error={errors.password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Btn
            name="로그인"
            size="big"
            active
            onClick={handleSubmitClick}
            onClick={loginEvent}
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