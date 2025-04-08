import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCategories, getProducts } from '../api/ApiClient';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function fetchData() {
      try {
        const categoryData = await getCategories();
        const productData = await getProducts();
        console.log('Категории загружены:', categoryData);
        console.log('Товары загружены:', productData);
        setCategories(categoryData);
        setProducts(productData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <ShopContext.Provider value={{ products, categories, selectedCategory, setSelectedCategory }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);