import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login, register } from '../api/ApiClient';
import { useAuthStore } from '../store/authStore';
import { useModalStore } from '../store/modalStore';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../assets/styles/AuthModal.scss';

const loginSchema = yup.object({
  login: yup.string().required('Логин обязателен'),
  password: yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Пароль обязателен'),
}).required();

const registerSchema = yup.object({
  login: yup.string().required('Логин обязателен'),
  password: yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Пароль обязателен'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
  email: yup.string().email('Некорректный email').required('Email обязателен'),
}).required();

function AuthModal() {
  const { setIsLoggedIn, setIsAdmin } = useAuthStore();
  const { isAuthModalOpen, closeAuthModal } = useModalStore();
  const [isLogin, setIsLogin] = useState(true);

  const { register: formRegister, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        const response = await login(data.login, data.password);
        setIsLoggedIn(true);
        setIsAdmin(response.roleId === 2);
        closeAuthModal();
        Swal.fire('Успех', 'Вы успешно вошли', 'success');
      } else {
        await register(data);
        Swal.fire('Успех', 'Регистрация успешна! Пожалуйста, войдите.', 'success');
        setIsLogin(true);
      }
    } catch (error) {
      Swal.fire('Ошибка', isLogin ? 'Неверное имя пользователя или пароль' : 'Ошибка регистрации', 'error');
    }
  };

  if (!isAuthModalOpen) return null;

  return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeAuthModal}>×</span>
          <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!isLogin && (
                <div>
                  <input {...formRegister('email')} placeholder="Email" />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
            )}
            <div>
              <input {...formRegister('login')} placeholder="Имя пользователя" />
              {errors.login && <p>{errors.login.message}</p>}
            </div>
            <div>
              <input type="password" {...formRegister('password')} placeholder="Пароль" />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            {!isLogin && (
                <div>
                  <input type="password" {...formRegister('confirmPassword')} placeholder="Подтвердите пароль" />
                  {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>
            )}
            <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
          </form>
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Создать аккаунт' : 'У меня есть аккаунт'}
          </button>
          <Link to="/forgot-password">Забыли пароль?</Link>
        </div>
      </div>
  );
}

export default AuthModal;