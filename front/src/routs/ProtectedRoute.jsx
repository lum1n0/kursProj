import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = Cookies.get('jwtToken');

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.roleId == 2) { // Проверяем поле roleId
      return children;
    }
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default ProtectedRoute;