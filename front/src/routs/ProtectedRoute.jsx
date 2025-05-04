import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function ProtectedRoute({ children, role }) {
  const location = useLocation();
  const token = Cookies.get('jwtToken');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.roleId === 1 ? "USER" : decodedToken.roleId === 2 ? "ADMIN" : "MASTER";
    if (userRole === role) {
      return children;
    } else {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  } catch (error) {
    console.error('Ошибка декодирования токена:', error);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default ProtectedRoute;