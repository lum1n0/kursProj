import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Shop from '../pages/Shop';
import Pay from '../pages/Pay';
import Support from '../pages/Support';
import Modem from '../pages/Modem';
import LoginPage from '../pages/LoginPage';
import AdminPanel from '../components/AdminPanel';
import AdminShop from '../pages/AdminShop';
import Home from '../pages/Home'; //  Импортируем компонент Home
import App from '../App'; 
import User from '../pages/User';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<App isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/user" element={<User />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/support" element={<Support />} />
        <Route path="/modem" element={<Modem />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/admin/shop" element={<ProtectedRoute><AdminShop /></ProtectedRoute>} /> 
      </Routes>
    </Router>
  );
}

export default AppRoutes;
