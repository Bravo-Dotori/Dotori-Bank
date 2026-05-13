import '@/App.css'
import styles from './snb.module.css'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useMenuStore from '@/store/useMenuStore';

const Snb = () => {
  const navigate = useNavigate();

  const { activeMenu, setActiveMenu } = useMenuStore();

  const handleClick = (menu) => {
    setActiveMenu(menu);
    navigate(`/${menu}`);
  };

  return (
    <div className={styles.snb}>
      <button
        className={`${styles.menu} ${activeMenu === 'deposit' ? styles.active : ''}`}
        onClick={() => handleClick('deposit')}
      >
        예금 상품
      </button>
      
      <button
        className={`${styles.menu} ${activeMenu === 'account' ? styles.active : ''}`}
        onClick={() => handleClick('account')}
      >
        내 계좌
      </button>

      <button
        className={`${styles.menu} ${activeMenu === 'transfer' ? styles.active : ''}`}
        onClick={() => handleClick('transfer')}
      >
        이체하기
      </button>

      <button
        className={`${styles.menu} ${activeMenu === 'history' ? styles.active : ''}`}
        onClick={() => handleClick('history')}
      >
        거래 내역
      </button>

      <button
        className={`${styles.menu} ${activeMenu === 'products' ? styles.active : ''}`}
        onClick={() => handleClick('products')}
      >
        가입 상품
      </button>
    </div>
  );
}

export default Snb;
