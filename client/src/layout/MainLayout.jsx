import { Outlet } from 'react-router-dom';

import styles from './layout.module.css'

import Gnb from '@/components/topbar/Gnb';
import Snb from '@/components/sidebar/Snb';

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      {/* 고정 영역 */}
      <header>
        <Gnb />
      </header>

      {/* 바뀌는 영역 */}
      <main>
        <Snb />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;