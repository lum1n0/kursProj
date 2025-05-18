import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const ApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleResponse = async (response) => {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Request failed with status: ${response.status}`);
  }
  return response.data;
};

export { ApiClient };

export const checkAuth = async () => {
  try {
    const response = await ApiClient.get('/auth/me');
    return handleResponse(response);
  } catch (error) {
    console.error('Ошибка проверки аутентификации:', error);
    throw error;
  }
};

export const login = async (login, password) => {
  try {
    const response = await ApiClient.post('/auth/login', { login, password });
    return handleResponse(response);
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await ApiClient.post('/auth/register', userData);
    return handleResponse(response);
  } catch (error) {
    console.error('Register failed:', error);
    throw error;
  }
};

export const fetchData = async (url) => {
  try {
    const response = await ApiClient.get(url);
    return handleResponse(response);
  } catch (error) {
    console.error(`Fetch data failed from ${url}:`, error);
    throw error;
  }
};

export const postData = async (url, data, config = {}) => {
  try {
    const response = await ApiClient.post(url, data, {
      ...config,
      headers: { 'Content-Type': 'application/json', ...config.headers },
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Post data failed to ${url}:`, error);
    throw error;
  }
};

export const putData = async (url, data) => {
  try {
    const response = await ApiClient.put(url, data);
    return handleResponse(response);
  } catch (error) {
    console.error(`Put data failed to ${url}:`, error);
    throw error;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await ApiClient.delete(url);
    return handleResponse(response);
  } catch (error) {
    console.error(`Delete data failed from ${url}:`, error);
    throw error;
  }
};

export const getCategories = async () => {
  return fetchData('/product-categories');
};

export const getProducts = async () => {
  return fetchData('/api/shop/products');
};

export const getUserOrdersByCategories = async (userId) => {
  try {
    const response = await ApiClient.get(`/api/orders/user/${userId}/categories/1-2`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Failed to fetch orders for user ${userId}:`, error);
    throw error;
  }
};

export const getSpendingReport = async (userId, year, month) => {
  try {
    const response = await ApiClient.get('/api/orders/spending-report', {
      params: { userId, year, month }
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Failed to fetch spending report:`, error);
    throw error;
  }
};

export const getUserMasterRequests = async (userId) => {
  try {
    const response = await ApiClient.get(`/api/master-requests/user/${userId}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Failed to fetch master requests for user ${userId}:`, error);
    throw error;
  }
};

export const logout = async () => {
  try {
    // Используем POST, так как это изменяет состояние сессии на сервере
    const response = await ApiClient.post('/auth/logout');
    return handleResponse(response); // handleResponse должен быть настроен на обработку успешных ответов
  } catch (error) {
    console.error('Logout failed:', error);
    // Можно специфично обработать ошибки сети или ответа сервера
    if (error.response) {
      // Запрос был сделан, и сервер ответил кодом состояния, который выходит за пределы 2xx
      console.error('Logout server error:', error.response.data);
    } else if (error.request) {
      // Запрос был сделан, но ответ не был получен
      console.error('Logout network error:', error.request);
    } else {
      // Что-то случилось при настройке запроса, вызвавшее ошибку
      console.error('Logout setup error:', error.message);
    }
    throw error; // Перебрасываем ошибку для дальнейшей обработки в компоненте
  }
};