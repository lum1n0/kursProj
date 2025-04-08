import { create } from 'zustand';

export const useUserStore = create((set) => ({
    userData: null,
    setUserData: (data) => set({ userData: data }),
}));
