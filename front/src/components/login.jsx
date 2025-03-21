// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируй useNavigate

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Инициализируй useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Login:", login);
    console.log("Password:", password);
    try {
      await login(login, password);
      navigate('/admin'); //  Перенаправление после успешного входа
    } catch (error) {
      console.error("Login failed", error);
      alert("Неверное имя пользователя или пароль");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}> {/* Добавь обработчик onSubmit */}
      <input
        type="text"
        placeholder="Имя пользователя"
        value={login}
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
      <button type="submit">Войти</button>
    </form>
  );
}

export default Login;
