import { Outlet, useLocation } from 'react-router-dom';

import styles from './layout.module.css'

import Gnb from '@/components/topbar/Gnb';
import Snb from '@/components/sidebar/Snb';
import { useRef, useState } from 'react';

const MainLayout = () => {
  const location = useLocation();

  const hideSnbPaths = ['/login', '/signup'];

//   const isHideSnb = hideSnbPaths.includes(location.pathname);
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

      <main>
            <Snb
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                menuBtnRef={menuBtnRef}
            />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;