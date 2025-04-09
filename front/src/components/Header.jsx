import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../store/authStore';
import { useModalStore } from '../store/modalStore';

function Header() {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useAuth();
    const { isAuthModalOpen, openAuthModal, closeAuthModal } = useModalStore();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setIsLoggedIn(true);
                    setIsAdmin(decodedToken.roleId === 2);
                } catch (error) {
                    console.error('Ошибка декодирования токена:', error);
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                }
            } else {
                setIsLoggedIn(false);
                setIsAdmin(false);
            }
        };

        checkAuth();
    }, [setIsLoggedIn, setIsAdmin]);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
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
                                <div>
                                    <Link to="/user" className="nav_link">Профиль</Link>
                                    {isAdmin && (
                                        <Link to="/admin" className="nav_link">Админ-панель</Link>
                                    )}
                                    <button onClick={handleLogout} className="nav_link">Выйти</button>
                                </div>
                            ) : (
                                <button onClick={openAuthModal}>Войти / Зарегистрироваться</button>
                            )}
                        </div>
                    </div>
                </nav>
            </section>
            {/* <AuthModal
                isOpen={isAuthModalOpen}
                onClose={closeAuthModal}
            /> */}
        </header>
    );
}

export default Header;
