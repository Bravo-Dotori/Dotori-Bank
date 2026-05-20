import React, { lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '@/layout/MainLayout';

import Login from '@/pages/login/LoginPage';
import Signup from '@/pages/signup/SignupPage';
import Deposit from '@/pages/deposit/DepositPage';
import Admin from '@/pages/admin/AdminPage';

import AccountPage from '@/pages/account/AccountPage';
import TransferPage from '@/pages/transfer/TransferPage';
import HistoryPage from '@/pages/history/HistoryPage';
import ProductsPage from '@/pages/products/ProductsPage';
import DepositApplyPage from '@/pages/deposit/DepositApplyPage';
import OnboardingPage from '@/pages/onboarding/OnboardingPage';

import useStore from '@/store/useStore';
import ProtectedRoute from '@/routes/ProtectedRoute';

const ProductsDetail = lazy(() => import('@/pages/products/ProductsDetailPage'));
const DepositDetail = lazy(() => import('@/pages/deposit/DepositDetailPage'));
const Recommend = lazy(() => import('@/pages/recommend/RecommendPage'));

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
                <Route path="/" element={<MainLayout />}>
                    <Route
                        path="/admin"
                        element={
                            !isAuthChecked ? null : !user ? (
                                <Navigate to="/login" />
                            ) : user.role === 'admin' ? (
                                <Admin />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />

                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />

                    <Route path="account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
                    <Route path="transfer" element={<ProtectedRoute><TransferPage /></ProtectedRoute>} />
                    <Route path="history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />

                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/:productId" element={<ProductsDetail />} />

                    <Route index element={<Deposit />} />
                    <Route path="deposit" element={<Deposit />} />

                    <Route path="depositDetail/:depositId" element={<DepositDetail />} />

                    <Route
                        path="depositApply/:depositId"
                        element={<ProtectedRoute><DepositApplyPage /></ProtectedRoute>}
                    />

                    <Route path="onboarding" element={<OnboardingPage />} />
                    <Route path="recommend" element={<Recommend />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;