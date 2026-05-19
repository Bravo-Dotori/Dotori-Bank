import { Outlet, useLocation } from 'react-router-dom';

import styles from './layout.module.css'

import Gnb from '@/components/topbar/Gnb';
import Snb from '@/components/sidebar/Snb';
import { useState } from 'react';

const MainLayout = () => {
  const location = useLocation();

  const hideSnbPaths = ['/login', '/signup'];

//   const isHideSnb = hideSnbPaths.includes(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <header>
        <Gnb 
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}/>
      </header>

      <main>
        <Snb
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;