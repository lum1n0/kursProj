import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

function ProtectedRoute({ children, role }) {
  const location = useLocation();
  const { isLoggedIn, user, isLoading } = useAuthStore();

  // Если проверка аутентификации еще идет, показываем загрузку
  if (isLoading) {
    return <div>Проверка аутентификации...</div>;
  }

  // Если пользователь не авторизован, перенаправляем на страницу логина
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Проверяем роль пользователя
  const userRole = user && user.roleId === 1 ? "USER" : user.roleId === 2 ? "ADMIN" : "MASTER";
  if (userRole === role) {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
}

export default ProtectedRoute;