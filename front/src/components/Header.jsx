import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useModalStore } from '../store/modalStore';
import { useThemeStore } from '../store/themeStore';
import '../assets/styles/Header.scss';

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useAuthStore();
  const { openAuthModal } = useModalStore();
  const { isDarkTheme, toggleTheme } = useThemeStore();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
  };

  return (
      <header className="head_conteiner">
        <nav className="nav_bar">
          <div className="left">
            <Link to="/">
              <img src="/img/white_on_trans1.svg" alt="Логотип" className="logo" />
            </Link>
            <div className="links">
              <Link to="/shop" className="nav_link">Shop</Link>
              <Link to="/topup" className="nav_link">Пополнение счёта</Link>
              <Link to="/support" className="nav_link">Поддержка</Link>
            </div>
          </div>
          <div className="right">
            {isLoggedIn ? (
                <div className="auth-links">
                  <Link to="/user" className="nav_link">Профиль</Link>
                  {isAdmin && (
                      <Link to="/admin" className="nav_link">Админ-панель</Link>
                  )}
                  <button onClick={handleLogout} className="nav_link logout-btn">Выйти</button>
                </div>
            ) : (
                <button onClick={openAuthModal} className="login-btn">Войти / Зарегистрироваться</button>
            )}
            <button onClick={toggleTheme} className="theme-toggle-btn">
              {isDarkTheme ? 'Светлая тема' : 'Тёмная тема'}
            </button>
          </div>
        </nav>
      </header>
  );
}

export default Header;