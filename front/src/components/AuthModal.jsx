import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login, register } from '../api/ApiClient';
import { useAuth } from '../store/authStore';
import { useModalStore } from '../store/modalStore';

const loginSchema = yup.object({
  login: yup.string().required('Логин обязателен'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
}).required();

const registerSchema = yup.object({
  login: yup.string().required('Логин обязателен'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
  email: yup.string().email('Некорректный email').required('Email обязателен'),
}).required();

function AuthModal() {
  const { setIsLoggedIn, setIsAdmin } = useAuth();
  const { isAuthModalOpen, closeAuthModal } = useModalStore();
  const [isLogin, setIsLogin] = React.useState(true);

  const { register: formRegister, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        const response = await login(data.login, data.password);
        localStorage.setItem('jwtToken', response.token);
        setIsLoggedIn(true);
        setIsAdmin(response.roleId === 2);
      } else {
        await register({
          login: data.login,
          password: data.password,
          confirmPassword: data.confirmPassword,
          email: data.email,
        });
        alert("Registration successful! Please log in.");
        setIsLogin(true);
      }
      closeAuthModal();
      reset();
    } catch (error) {
      console.error(isLogin ? "Login failed" : "Registration failed", error);
      alert(isLogin ? "Неверное имя пользователя или пароль" : "Registration failed: " + error.response?.data?.message || "Unknown error");
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
              <input
                type="email"
                placeholder="Email"
                {...formRegister('email')}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          )}
          <div>
            <input
              type="text"
              placeholder="Имя пользователя"
              {...formRegister('login')}
            />
            {errors.login && <p>{errors.login.message}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Пароль"
              {...formRegister('password')}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          {!isLogin && (
            <div>
              <input
                type="password"
                placeholder="Подтвердите пароль"
                {...formRegister('confirmPassword')}
              />
              {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>
          )}
          <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Создать аккаунт' : 'У меня есть аккаунт'}
        </button>
      </div>
    </div>
  );
}

export default AuthModal;