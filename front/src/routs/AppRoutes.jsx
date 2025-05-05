import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Shop from '../pages/Shop';
import Support from '../pages/Support';
import LoginPage from '../pages/LoginPage';
import AdminPanel from '../pages/AdminPages/AdminPanel.jsx';
import AdminShop from '../pages/AdminPages/AdminShop.jsx';
import Home from '../pages/Home';
import User from '../pages/User';
import AdminAnswer from '../pages/AdminPages/AdminAnswer.jsx';
import TopUpForm from '../pages/TopUpForm';
import ForgotPassword from '../components/SupportComponents/ForgotPassword.jsx';
import ResetPassword from '../components/SupportComponents/ResetPassword.jsx';
import ProductDetails from '../components/ShopComponents/ProductDetails.jsx';
import AuthModal from '../components/Modal/AuthModal.jsx';
import OrderPage from '../pages/OrderPage';
import AdminOrders from '../pages/AdminPages/AdminOrders.jsx';
import AdminProduct from '../pages/AdminPages/AdminProduct.jsx';
import MasterPanel from '../pages/MasterPanel';
import { useAuthStore } from '../store/authStore';
import { useModalStore } from '../store/modalStore';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  const { isLoggedIn, isAdmin, isLoading } = useAuthStore();
  const { isAuthModalOpen } = useModalStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/topup"
          element={isLoggedIn && !isLoading ? <TopUpForm /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/user"
          element={isLoggedIn && !isLoading ? <User /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/order/new"
          element={isLoggedIn && !isLoading ? <OrderPage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/admin"
          element={<ProtectedRoute role="ADMIN"><AdminPanel /></ProtectedRoute>}
        />
        <Route
          path="/admin/shop"
          element={<ProtectedRoute role="ADMIN"><AdminShop /></ProtectedRoute>}
        />
        <Route
          path="/admin/answer"
          element={<ProtectedRoute role="ADMIN"><AdminAnswer /></ProtectedRoute>}
        />
        <Route
          path="/admin/orders"
          element={<ProtectedRoute role="ADMIN"><AdminOrders /></ProtectedRoute>}
        />
        <Route
          path="/admin/products"
          element={<ProtectedRoute role="ADMIN"><AdminProduct /></ProtectedRoute>}
        />
        <Route
          path="/master"
          element={<ProtectedRoute role="MASTER"><MasterPanel /></ProtectedRoute>}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {isAuthModalOpen && <AuthModal />}
    </Router>
  );
}

export default AppRoutes;