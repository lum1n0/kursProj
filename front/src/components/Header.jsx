import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import AuthModal from './AuthModal';


function Header({ isLoggedIn, setIsLoggedIn }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Состояние для проверки роли администратора
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const token = Cookies.get('jwtToken');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log('Decoded token:', decodedToken); // Для отладки
          setIsAdmin(decodedToken.roleId == 2); // Проверяем поле admin
        } catch (error) {
          console.error('Ошибка декодирования токена:', error);
        }
      }
    } else {
      setIsAdmin(false);
    }
  }, [isLoggedIn]);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const toggleBurgerMenu = () => setIsBurgerMenuOpen(!isBurgerMenuOpen);

  const handleLogout = () => {
    Cookies.remove('jwtToken');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <header className="head_conteiner">
      <section className="#">
        <nav className="padge_burg">
          <div className="nav_bar">
            <div className="left">
              <Link to="/">
                <img src="img/white_on_trans1.svg" alt="" className="logo" />
              </Link>
            </div>
            <div className="right">
              <div className="left">
                <div className="links">
                  <Link to="/shop" className="nav_link">Shop</Link>
                  <Link to="/pay" className="nav_link">Оплата услуг</Link>
                  <Link to="/support" className="nav_link">Поддержка</Link>
                  <Link to="/modem" className="nav_link">Модем</Link>
                </div>
              </div>
              {isLoggedIn ? (
                <div className="burger-menu_prof" onClick={toggleBurgerMenu}>
                  <div className="burger-icon" id="burger-icon2">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  {isBurgerMenuOpen && (
                    <div className="menu-items2" id="menu-items">
                      <Link to="/user" className="nav_link">Профиль</Link>
                      {isAdmin && (
                        <Link to="/admin" className="nav_link">Админ-панель</Link>
                      )}
                      <button onClick={handleLogout} className="nav_link">Выйти</button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={openAuthModal}>Войти / Зарегистрироваться</button>
              )}
            </div>
          </div>
        </nav>
      </section>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    </header>
  );
}

export default Header;
