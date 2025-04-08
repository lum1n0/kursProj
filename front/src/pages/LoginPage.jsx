import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/ApiClient';
import { useAuth } from '../store/authStore';

const schema = yup.object({
  login: yup.string().required('Логин обязателен'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
}).required();

function LoginPage() {
  const { setIsLoggedIn, setIsAdmin } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data.login, data.password);
      localStorage.setItem('jwtToken', response.token);
      setIsLoggedIn(true);
      setIsAdmin(response.roleId === 2);
      navigate('/admin');
    } catch (error) {
      console.error("Login failed", error);
      alert("Неверное имя пользователя или пароль");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Имя пользователя"
            {...register('login')}
          />
          {errors.login && <p>{errors.login.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            {...register('password')}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default LoginPage;