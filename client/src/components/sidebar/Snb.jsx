import '@/App.css'
import styles from './snb.module.css'

import { useNavigate, useLocation } from 'react-router-dom';

import useStore from '@/store/useStore';
import { useEffect, useRef } from 'react';

const Snb = ({ isMenuOpen, setIsMenuOpen, menuBtnRef, isHideSnb }) => {
    const isLogin = useStore((state) => state.isLogin);
    const navigate = useNavigate();
    const location = useLocation();
    const menuRef = useRef(null);

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

    useEffect(() => {

        const handleClickOutside = (e) => {

            if (
                isMenuOpen &&
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                !menuBtnRef.current.contains(e.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, [isMenuOpen]);

    const movePage = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };


  return (
    <aside ref={menuRef} className={`${styles.snb} ${isMenuOpen ? styles.open : ''} ${isHideSnb ? styles.hide : ''}`}>
      <button
        className={`
          ${styles.menu}
          ${depositMenus.includes(pathname)
            ? styles.active
            : ''}
        `}
        onClick={() => movePage('/deposit')}
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
                onClick={() => movePage('/account')}
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
                onClick={() => movePage('/transfer')}
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
                onClick={() => movePage('/history')}
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
                onClick={() => movePage('/products')}
            >
                가입 상품
            </button>
        </>
      )}
      
    </aside>
  );
}

export default Snb;