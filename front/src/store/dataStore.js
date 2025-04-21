import { create } from 'zustand';

export const useDataStore = create((set) => ({
    products: [],
    categories: [],
    setProducts: (products) => set({ products }),
    setCategories: (categories) => set({ categories }),
}));