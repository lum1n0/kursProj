import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../api/ApiClient';
import { useAuthStore } from '../store/authStore'; // Исправлено: useAuth → useAuthStore
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  login: yup.string().required('Логин обязателен'),
  password: yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Пароль обязателен'),
}).required();

function Login() {
  const { setIsLoggedIn, setIsAdmin } = useAuthStore(); // Исправлено: useAuth → useAuthStore
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data.login, data.password);
      setIsLoggedIn(true);
      setIsAdmin(response.roleId === 2);
      navigate('/admin');
    } catch (error) {
      console.error('Login failed', error);
      alert('Неверное имя пользователя или пароль');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('login')} placeholder="Имя пользователя" />
        {errors.login && <p>{errors.login.message}</p>}
      </div>
      <div>
        <input type="password" {...register('password')} placeholder="Пароль" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Войти</button>
    </form>
  );
}

export default Login;