import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080';

const ApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
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
    const response = await ApiClient.post('/auth/login', { login, password });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
      const response = await ApiClient.get('/product-categories');
      return response.data;
  } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await ApiClient.get('/api/shop/products');
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const logout = () => {
  Cookies.remove('jwtToken', { path: '/' });
};

export { ApiClient };