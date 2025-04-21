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
  login: async (loginData) => {
    try {
      const response = await login(loginData.login, loginData.password);
      set({
        isLoggedIn: true,
        isAdmin: response.roleId === 2,
        user: response,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
}));