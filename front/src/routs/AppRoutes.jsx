import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Shop from '../pages/Shop';
import Support from '../pages/Support';
import LoginPage from '../pages/LoginPage';
import AdminPanel from '../pages/AdminPanel';
import AdminShop from '../pages/AdminShop';
import Home from '../pages/Home';
import User from '../pages/User';
import AdminAnswer from '../pages/AdminAnswer';
import TopUpForm from '../pages/TopUpForm';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';
import AuthModal from '../components/AuthModal';
import { useAuthStore } from '../store/authStore';
import { useModalStore } from '../store/modalStore';

function AppRoutes() {
    const { isLoggedIn, isAdmin, checkAuth, isLoading } = useAuthStore();
    const { isAuthModalOpen } = useModalStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isLoading) {
        return <div>Проверка аутентификации...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/support" element={<Support />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                    path="/topup"
                    element={isLoggedIn ? <TopUpForm /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/user"
                    element={isLoggedIn ? <User /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/admin"
                    element={isLoggedIn && isAdmin ? <AdminPanel /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/admin/shop"
                    element={isLoggedIn && isAdmin ? <AdminShop /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/admin/answer"
                    element={isLoggedIn && isAdmin ? <AdminAnswer /> : <Navigate to="/login" replace />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {isAuthModalOpen && <AuthModal />}
        </Router>
    );
}

export default AppRoutes;