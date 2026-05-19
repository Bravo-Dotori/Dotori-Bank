import '@/App.css'
import styles from './snb.module.css'

import { useNavigate, useLocation } from 'react-router-dom';

import useStore from '@/store/useStore';

const Snb = () => {
  const isLogin = useStore((state) => state.isLogin);
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  const depositMenus = [
    '/',
    '/deposit',
    '/depositDetail',
    '/depositApply',
  ];
  const productsMenus = [
    '/products',
    '/productsDetail',
  ];

  return (
    <div className={styles.snb}>
      <button
        className={`
          ${styles.menu}
          ${depositMenus.includes(pathname)
            ? styles.active
            : ''}
        `}
        onClick={() => navigate('/deposit')}
      >
        예금 상품
      </button>
      {isLogin && (
        <>
            <button
                className={`
                ${styles.menu}
                ${pathname === '/account'
                    ? styles.active
                    : ''}
                `}
                onClick={() => navigate('/account')}
            >
                내 계좌
            </button>

            <button
                className={`
                ${styles.menu}
                ${pathname === '/transfer'
                    ? styles.active
                    : ''}
                `}
                onClick={() => navigate('/transfer')}
            >
                이체하기
            </button>

            <button
                className={`
                ${styles.menu}
                ${pathname === '/history'
                    ? styles.active
                    : ''}
                `}
                onClick={() => navigate('/history')}
            >
                거래 내역
            </button>

            <button
                className={`
                ${styles.menu}
                ${productsMenus.includes(pathname)
                    ? styles.active
                    : ''}
                `}
                onClick={() => navigate('/products')}
            >
                가입 상품
            </button>
        </>
      )}
      
    </div>
  );
}

export default Snb;