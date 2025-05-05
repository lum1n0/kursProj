import React, { useState, useEffect } from 'react';
import Header from '../components/Templates/Header.jsx';
import Footer from '../components/Templates/Footer.jsx';
import ProductCard from '../components/ShopComponents/ProductCard.jsx';
import { useShopStore } from '../store/shopStore';
import { ApiClient } from '../api/ApiClient';
import { useAuthStore } from '../store/authStore';
import Swal from 'sweetalert2';
import '../assets/styles/Shop.scss';

function Shop() {
  const { products, selectedCategory, setSelectedCategory, fetchData, isLoading } = useShopStore();
  const { user } = useAuthStore();
  const [searchName, setSearchName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData(searchName, minPrice, maxPrice);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchName, minPrice, maxPrice, fetchData]);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
  };

  const filteredProducts =
      selectedCategory === 'all'
          ? products
          : products.filter((product) => String(product.categoryId) === String(selectedCategory));

  if (isLoading) return <div>Загрузка...</div>;

  return (
      <section className="shop">
        <Header />
        <div className="conteiner" id="shop_z1">
          <h1 className="title_hero">Магазин СТМ</h1>
          <div className="shop-content">
            <div className="left_menu">
              <button
                  className={`menu-item ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => handleCategoryClick('all')}
              >
                Все товары
              </button>
              <button
                  className={`menu-item ${selectedCategory === '1' ? 'active' : ''}`}
                  onClick={() => handleCategoryClick('1')}
              >
                <img src="/img/router3.svg" alt="Модемы и роутеры" /> Модемы и роутеры
              </button>
              <button
                  className={`menu-item ${selectedCategory === '2' ? 'active' : ''}`}
                  onClick={() => handleCategoryClick('2')}
              >
                <img src="/img/modem2.svg" alt="Приставки и ТВ" /> Приставки и ТВ
              </button>
              <button
                  className={`menu-item ${selectedCategory === '3' ? 'active' : ''}`}
                  onClick={() => handleCategoryClick('3')}
              >
                <img src="/img/sim4.svg" alt="Сим-карты" /> Сим-карты
              </button>
            </div>
            <div className="products">
              <div className="search-filter">
                <input
                    type="text"
                    placeholder="Поиск по имени"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Мин. цена"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Макс. цена"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
              <div className="row_card">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
  );
}

export default Shop;