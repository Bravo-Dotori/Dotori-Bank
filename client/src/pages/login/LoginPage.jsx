import styles from "./login.module.css";
import keyVisual from "@/assets/key-visual.png";

import PageHeader from "@/components/pageHeader/PageHeader";
import Form from "@/components/form/Form";
import Btn from "@/components/button/Btn";
import AuthRedirect from "@/components/authRedirect/AuthRedirect";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useStore from "@/store/useStore";
import { login } from "../../api/loginApi";
import Seo from "@/components/seo/Seo";

const LoginPage = () => {
  const navigator = useNavigate();
  const setLogin = useStore((state) => state.setLogin);

  const [form, setForm] = useState({
    userId: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userId: "",
    password: "",
  });

  const loginEvent = async () => {
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
        const data = await login(form.userId, form.password);
        setLogin(data.user);
        
        if (data.user.role === "admin") {
            navigator("/admin");
        } else {
            navigator("/account");
        }
    } catch (err) {
        if (err.message === "존재하지 않는 아이디입니다.") {
            setErrors((prev) => ({
            ...prev,
            userId: err.message,
            }));
        } else {
            setErrors((prev) => ({
            ...prev,
            password: err.message,
            }));
        }
    }
  };

  return (
    <>
        <Seo
            title="도토리뱅크 로그인"
            description="로그인 페이지"
        />
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
                    value={form.userId}
                    error={errors.userId}
                    onChange={(e) =>  {
                        setForm((prev) => ({
                        ...prev,
                        userId: e.target.value,
                        }))
                        setErrors((prev) => ({
                        ...prev,
                        userId: "",
                        }));
                    }}
                    />

                    <Form
                    name="비밀번호"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={form.password}
                    error={errors.password}
                    onChange={(e) =>{
                        setForm((prev) => ({
                        ...prev,
                        password: e.target.value,
                        }))
                        setErrors((prev) => ({
                        ...prev,
                        password: "",
                        }));
                    }}
                    />
                </div>

                <Btn
                    name="로그인"
                    size="big"
                    active
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
    </>
  );
};

export default LoginPage;