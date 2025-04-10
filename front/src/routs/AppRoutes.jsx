import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Shop from '../pages/Shop';
import Pay from '../pages/Pay';
import Support from '../pages/Support';
import Modem from '../pages/Modem';
import LoginPage from '../pages/LoginPage';
import AdminPanel from '../components/AdminPanel';
import AdminShop from '../pages/AdminShop';
import Home from '../pages/Home';
import App from '../App';
import User from '../pages/User';
import AdminAnswer from '../components/AdminAnswer';
import { useAuthStore } from '../store/authStore';

function AppRoutes() {
  const { isLoggedIn, isAdmin, checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Показываем индикатор загрузки, пока данные пользователя загружаются
  if (isLoading) {
    return <div>Проверка аутентификации...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/user" element={<User />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/support" element={<Support />} /> {/* Доступен всем */}
        <Route path="/modem" element={<Modem />} />
        <Route path="/login" element={<LoginPage />} />
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
      </Routes>
    </Router>
  );
}

export default AppRoutes;