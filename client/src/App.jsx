import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';

import Login from '@/pages/login/LoginPage';
import Signup from '@/pages/signup/SignupPage';

import Account from '@/pages/account/AccountPage';
import Transfer from '@/pages/transfer/TransferPage';
import History from '@/pages/history/HistoryPage';
import Products from '@/pages/products/ProductsPage';
import Deposit from '@/pages/deposit/DepositPage';
import Admin from './pages/admin/AdminPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="login" element={<Login />} />
          <Route path='signup' element={<Signup />} />

          <Route path="account" element={<Account />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="history" element={<History />} />
          <Route path="products" element={<Products />} />
          <Route index element={<Deposit />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;