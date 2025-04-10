import { create } from 'zustand';
import { getProducts } from '../api/ApiClient';

export const useShopStore = create((set) => ({
  products: [],
  selectedCategory: 'all',
  isLoading: true, // Флаг загрузки
  setSelectedCategory: (catId) => set({ selectedCategory: String(catId) }), // Приводим к строке
  fetchData: async () => {
    try {
      const productData = await getProducts();
      console.log('Товары загружены:', productData);
      set({ products: productData, isLoading: false });
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      set({ isLoading: false });
    }
  },
}));