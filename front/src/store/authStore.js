import { create } from 'zustand';
import { checkAuth } from '../api/ApiClient';

export const useAuthStore = create((set, get) => ({
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  isLoading: true,
  isChecking: false, // Флаг для предотвращения повторных вызовов
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setIsAdmin: (admin) => set({ isAdmin: admin }),
  checkAuth: async () => {
    const { isChecking } = get();
    if (isChecking) return; // Если проверка уже идет, ничего не делаем

    set({ isChecking: true, isLoading: true });
    try {
      const userData = await checkAuth();
      set({
        isLoggedIn: true,
        isAdmin: userData.roleId === 2,
        user: userData,
        isLoading: false,
        isChecking: false,
      });
    } catch (error) {
      set({
        isLoggedIn: false,
        isAdmin: false,
        user: null,
        isLoading: false,
        isChecking: false,
      });
    }
  },
}));