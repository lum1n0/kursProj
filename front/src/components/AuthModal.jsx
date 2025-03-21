// src/components/AuthModal.jsx
import React, { useState } from 'react';
import { login, register } from '../api/ApiClient'; // Импортируй login и register

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loginValue, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handleLogin called");
    try {
      await login(loginValue, password);
      console.log("Login successful");
      onClose();
      onLoginSuccess(); 
    } catch (error) {
      console.error("Login failed", error);
      alert("Неверное имя пользователя или пароль");
    }
  };
  
  
  


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        login: loginValue,  // Исправлено: login -> loginValue
        password: password,
        confirmPassword: password, 
        email: email,
      };
      await register(userData);
      alert("Registration successful! Please log in.");
      setIsLogin(true); 
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed: " + error.response?.data?.message || "Unknown error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2> {/* Раскомментируй заголовок */}
        <form onSubmit={isLogin ? handleLogin : handleRegister}> {/*  Добавь обработчик onSubmit */}
          {!isLogin && ( 
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input
            type="text"
            placeholder="Имя пользователя"
            value={loginValue} 
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button> {/* Раскомментируй кнопку */}
        </form>
        <button onClick={() => setIsLogin(!isLogin)}> {/* Раскомментируй кнопку переключения */}
          {isLogin ? 'Создать аккаунт' : 'У меня есть аккаунт'} 
        </button>
      </div>
    </div>
  );
}

export default AuthModal;
