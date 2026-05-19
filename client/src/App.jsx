import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '@/layout/MainLayout';

import Login from '@/pages/login/LoginPage';
import Signup from '@/pages/signup/SignupPage';

import Account from '@/pages/account/AccountPage';
import Transfer from '@/pages/transfer/TransferPage';
import History from '@/pages/history/HistoryPage';

import Products from '@/pages/products/ProductsPage';
import ProductsDetail from '@/pages/products/ProductsDetailPage';

import Deposit from '@/pages/deposit/DepositPage';
import DepositDetail from '@/pages/deposit/DepositDetailPage';
import DepositApply from '@/pages/deposit/DepositApplyPage';

import Onboarding from '@/pages/onboarding/OnboardingPage';
import Recommend from '@/pages/recommend/RecommendPage';
import Admin from '@/pages/admin/AdminPage';

import useStore from '@/store/useStore';

import ProtectedRoute from '@/routes/ProtectedRoute';

const App = () => {
  const { user, setLogin, logout, isAuthChecked, setAuthChecked } = useStore();

  useEffect(() => {
    const verifyUser = async () => {
        try {
            const response = await fetch('/api/user/verify', {
                method: 'GET',
                credentials: 'include',
            });
            if (response.status === 401) {
                logout();
                return;
            }
            console.log(response.status);
            if (!response.ok) {
                throw new Error();
            }
            const data = await response.json();
            if (!data.user) {
                logout();
                return;
            }
            setLogin(data.user);
        } catch (error) {
            console.error(error);
        } finally {
            setAuthChecked(true);
        }
    };

    verifyUser();
    
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/admin" element={
            !isAuthChecked ? null : !user ? (
                <Navigate to="/login" />
            ) : user.role === "admin" ? (
                <Admin />
            ) : (
                <Navigate to="/" />
            )}
        />
        <Route path="/" element={<MainLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          <Route
            path="account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />

          <Route
            path="transfer"
            element={
              <ProtectedRoute>
                <Transfer />
              </ProtectedRoute>
            }
          />

          <Route
            path="history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductsDetail />} />

          <Route index element={<Deposit />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="depositDetail/:depositId" element={<DepositDetail />} />

          <Route
            path="depositApply/:depositId"
            element={
              <ProtectedRoute>
                <DepositApply />
              </ProtectedRoute>
            }
          />

          <Route path="onboarding" element={<Onboarding />} />
          <Route path="recommend" element={<Recommend />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;