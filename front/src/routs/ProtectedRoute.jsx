import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import AppRoutes from './AppRoutes';

function ProtectedRoute({ children, requiredRole = 'ADMIN' }) {
  const token = Cookies.get('jwtToken');
  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    if (userRole !== requiredRole) {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error('Ошибка декодирования токена:', error);
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;