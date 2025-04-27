import { create } from 'zustand';
import { checkAuth, login } from '../api/ApiClient';

export const useAuthStore = create((set, get) => ({
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  isLoading: true,
  isChecking: false,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setIsAdmin: (admin) => set({ isAdmin: admin }),
  checkAuth: async () => {
    const { isChecking } = get();
    if (isChecking) return;

    set({ isChecking: true, isLoading: true });
    try {
      const userData = await checkAuth();
      console.log('Данные пользователя загружены:', userData); // Логируем данные
      set({
        isLoggedIn: true,
        isAdmin: userData.roleId === 2,
        user: userData,
        isLoading: false,
        isChecking: false,
      });
    } catch (error) {
      console.error('Ошибка при проверке аутентификации:', error); // Логируем ошибку
      set({
        isLoggedIn: false,
        isAdmin: false,
        user: null,
        isLoading: false,
        isChecking: false,
      });
    }
  },
  login: async (loginData) => {
    try {
      const response = await login(loginData.login, loginData.password);
      console.log('Успешный вход, данные пользователя:', response); // Логируем успешный вход
      set({
        isLoggedIn: true,
        isAdmin: response.roleId === 2,
        user: response,
      });
      return response;
    } catch (error) {
      console.error('Ошибка при входе:', error); // Логируем ошибку входа
      throw error;
    }
  },
}));