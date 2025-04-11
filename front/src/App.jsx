import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import Shop from './pages/Shop';
import User from './pages/User';
import AdminAnswer from './components/AdminAnswer';
import { useAuthStore } from './store/authStore';
import { useModalStore } from './store/modalStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/style__css/style.css';

function App() {
  const { isLoggedIn, setIsLoggedIn, isAdmin } = useAuthStore();
  const { isAuthModalOpen } = useModalStore();

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={isAdmin ? <AdminPage /> : <Home />} />
          <Route path="/admin/answer" element={isAdmin ? <AdminAnswer /> : <Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={isLoggedIn ? <User /> : <Home />} />
        </Routes>
      </main>
      <Footer />
      {isAuthModalOpen && (
        <AuthModal
          onLoginSuccess={() => {
            console.log('onLoginSuccess called');
            setIsLoggedIn(true);
          }}
        />
      )}
    </div>
  );
}

export default App;