import { create } from 'zustand';

export const useAuth = create((set) => ({
  isLoggedIn: false,
  isAdmin: false,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setIsAdmin: (admin) => set({ isAdmin: admin }),
}));