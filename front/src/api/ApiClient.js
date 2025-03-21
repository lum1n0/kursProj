// src/api/ApiClient.js
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080';

const ApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Разрешить отправку cookies
});
ApiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const register = async (userData) => {
  try {
    const response = await ApiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const login = async (login, password) => { 
  try {
    const response = await ApiClient.post('/auth/login', { login, password }); //  Изменено: username -> login
    // Cookie устанавливается бэкендом, здесь ничего не делаем с токеном
    return response.data; //  вернуть данные пользователя или что-то еще полезное
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await ApiClient.get('/products');
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const logout = () => {
  Cookies.remove('jwtToken', { path: '/' });
};
export { ApiClient }; //  Explicitly export ApiClient
