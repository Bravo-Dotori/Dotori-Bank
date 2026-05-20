import { Outlet, useLocation } from 'react-router-dom';
import { Suspense, useRef, useState } from 'react';

import styles from './layout.module.css';

import Gnb from '@/components/topbar/Gnb';
import Snb from '@/components/sidebar/Snb';

import StatusCard from '@/components/card/StatusCard/StatusCard';

const MainLayout = () => {
    const location = useLocation();

    const hideSnbPaths = ['/login', '/signup', '/admin'];

    const isHideSnb = hideSnbPaths.includes(location.pathname);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuBtnRef = useRef(null);

    return (
        <div className={styles.layout}>
            <header>
                <Gnb
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    menuBtnRef={menuBtnRef}
                />
            </header>

            <main className={isHideSnb ? styles.main : styles.mainLayout}>
                <Snb
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    menuBtnRef={menuBtnRef}
                    isHideSnb={isHideSnb}
                    className={
                        isHideSnb ? styles.hide : ''
                    }
                />

                <Suspense fallback={<StatusCard title="잠시만 기다려주세요" />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    );
};

export default MainLayout;