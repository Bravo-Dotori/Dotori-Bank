import '@/App.css'
import styles from './gnb.module.css'

import { useNavigate } from 'react-router-dom';

import logo from "@/assets/logo.png"
import SmallBtn from '@/components/button/SmallBtn'

import useMenuStore from '@/store/useMenuStore';

const Gnb = () => {
  const navigate = useNavigate();

  const { activeMenu, setActiveMenu } = useMenuStore();

  const handleClick = (menu) => {
    setActiveMenu(menu);
    navigate(`/`);
  }

  return (
    <header className={styles.gnb}>
      <div className={styles.logo} onClick={() => handleClick('deposit')}>
        <img src={logo} className={styles.logoImg} alt='로고 이미지' />
        <div className={styles.logoName}>Dotori Bank</div>
      </div>

      <div className={styles.authBtns}>
        <SmallBtn
          name="로그인"
          value="/login"
          active={activeMenu === 'login'}
          onClick={() => setActiveMenu('login')}
        />

        <SmallBtn
          name="회원가입"
          value="/signup"
          active={activeMenu === 'signup'}
          onClick={() => setActiveMenu('signup')}
        />
      </div>
    </header>
  );
}

export default Gnb;
