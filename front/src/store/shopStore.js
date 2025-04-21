import { create } from 'zustand';
import { ApiClient } from '../api/ApiClient';

export const useShopStore = create((set) => ({
  products: [],
  selectedCategory: 'all',
  isLoading: false,
  setSelectedCategory: (catId) => set({ selectedCategory: String(catId) }),
  fetchData: async (name = '', minPrice = '', maxPrice = '') => {
    set({ isLoading: true });
    try {
      const params = {};
      if (name) params.name = name;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      const response = await ApiClient.get('/api/shop/products', { params });
      set({ products: response.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ isLoading: false });
    }
  },
}));