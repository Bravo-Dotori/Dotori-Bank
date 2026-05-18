import React from 'react'
import DataTable from '@/components/dataTable/DataTable';
import AdminUser from './AdminUser';
import AdminTransaction from './adminTransaction';
import styles from "./AdminTransaction.module.css";

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