import { create } from 'zustand';
import { checkAuth } from '../api/ApiClient';

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  isAdmin: false,
  user: null, // Храним данные пользователя
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setIsAdmin: (admin) => set({ isAdmin: admin }),
  checkAuth: async () => {
    try {
      const userData = await checkAuth();
      set({
        isLoggedIn: true,
        isAdmin: userData.roleId === 2, // Предполагаем, что roleId 2 — это администратор
        user: userData,
      });
    } catch (error) {
      set({
        isLoggedIn: false,
        isAdmin: false,
        user: null,
      });
    }
  },
}));