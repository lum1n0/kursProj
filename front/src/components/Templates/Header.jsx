import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import { useModalStore } from '../../store/modalStore.js';
import { useThemeStore } from '../../store/themeStore.js';
import { logout as apiLogout } from '../../api/ApiClient.js'; // Добавь импорт функции logout
import Swal from 'sweetalert2'; // Если используешь SweetAlert для уведомлений
import '../../assets/styles/Header.scss';

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, user } = useAuthStore();
  const { openAuthModal } = useModalStore();
  const { isDarkTheme, toggleTheme } = useThemeStore();

  const isMaster = user && user.roleId === 3; // Предполагаем, что MASTER имеет roleId = 3

  const handleLogout = async () => { // Сделай функцию асинхронной
    try {
      await apiLogout(); // Вызываем API для выхода
      setIsLoggedIn(false);
      setIsAdmin(false);
      // Если у тебя есть функция для очистки данных пользователя в сторе, вызови её:
      // if (clearUser) {
      //   clearUser();
      // }
      // Или вручную:
      useAuthStore.setState({ user: null }); // Очищаем пользователя из стора

      navigate('/');
      Swal.fire('Успех', 'Вы успешно вышли из системы.', 'success');
    } catch (error) {
      Swal.fire('Ошибка', 'Не удалось выйти из системы. Попробуйте снова.', 'error');
    }
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
              <Link to="/user" className="nav_link" style={{ padding: '7px 0 0 0' }}>Профиль</Link>
              {isAdmin && (
                <Link to="/admin" className="nav_link" style={{ padding: '7px 0 0 0' }}>Админ-панель</Link>
              )}
              {isMaster && (
                <Link to="/master" className="nav_link" style={{ padding: '7px 0 0 0' }}>Панель мастера</Link>
              )}
              <button onClick={handleLogout} className="logout-btn">Выйти</button>
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