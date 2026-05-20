import React from 'react'
import DataTable from '@/components/dataTable/DataTable';
import AdminUser from './AdminUser';
import AdminTransaction from './adminTransaction';
import styles from "./AdminTransaction.module.css";
import Gnb from '@/components/topbar/Gnb';
import Snb from '@/components/sidebar/Snb';

const Adminpage = () => {
  return (
    <>
        <div className="main">
            <AdminTransaction />
            <AdminUser />
        </div>
    </>
  )
}

export default Adminpage