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
import ProductDetails from '../components/ProductDetails';
import AuthModal from '../components/AuthModal';
import OrderForm from '../components/OrderForm'; // Новый компонент для выбора адреса доставки
import AdminOrders from '../pages/AdminOrders';
import { useAuthStore } from '../store/authStore';
import { useModalStore } from '../store/modalStore';
import ProtectedRoute from './ProtectedRoute'; // Импортируем ProtectedRoute

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
                {/* Общие маршруты */}
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/support" element={<Support />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Защищенные маршруты для авторизованных пользователей */}
                <Route
                    path="/topup"
                    element={isLoggedIn ? <TopUpForm /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/user"
                    element={isLoggedIn ? <User /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/order/new"
                    element={isLoggedIn ? <OrderForm /> : <Navigate to="/login" replace />}
                />

                {/* Защищенные маршруты для админов с использованием ProtectedRoute */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminPanel />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/shop"
                    element={
                        <ProtectedRoute>
                            <AdminShop />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/answer"
                    element={
                        <ProtectedRoute>
                            <AdminAnswer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/orders"
                    element={
                        <ProtectedRoute>
                            <AdminOrders />
                        </ProtectedRoute>
                    }
                />

                {/* Обработка неизвестных маршрутов */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {isAuthModalOpen && <AuthModal />}
        </Router>
    );
}

export default AppRoutes;