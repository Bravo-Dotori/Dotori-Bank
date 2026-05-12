import { Outlet, useLocation } from 'react-router-dom';

import styles from './layout.module.css'

import Gnb from '@/components/topbar/Gnb';
import Snb from '@/components/sidebar/Snb';

const MainLayout = () => {
  const location = useLocation();

  const hideSnbPaths = ['/login', '/signup'];

  const isHideSnb = hideSnbPaths.includes(location.pathname);

  return (
    <div className={styles.layout}>
      <header>
        <Gnb />
      </header>

      <main>
        {!isHideSnb && <Snb />}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;