import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { useShopStore } from '../store/shopStore';

function Shop() {
  const { products, selectedCategory, setSelectedCategory, fetchData, isLoading } = useShopStore();

  useEffect(() => {
    fetchData(); // Загружаем данные при монтировании
  }, [fetchData]);

  const handleCategoryClick = (catId) => {
    console.log('Выбрана категория:', catId);
    setSelectedCategory(catId);
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => String(product.categoryId) === String(selectedCategory));

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <section className="conteiner" id="shop_z1">
      <Header/>
      <h1 className="title_hero shop_title">Магазин СТМ</h1>
      <div className="container-fluid">
        <div className="row">
          {/* Боковое меню с фиксированными кнопками */}
          <div className="col-md-3">
            <div className="list-group left_menu">
              <button
                className={`list-group-item list-group-item-action left_menu ${
                  selectedCategory === 'all' ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick('all')}
              >
                Все товары
              </button>
              <button
                className={`list-group-item list-group-item-action left_menu ${
                  selectedCategory === '1' ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick('1')}
              >
                <img src="../../public/img/router3.svg" alt="Модемы и роутеры" /> Модемы и роутеры
              </button>
              <button
                className={`list-group-item list-group-item-action left_menu ${
                  selectedCategory === '2' ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick('2')}
              >
                <img src="../../public/img/modem2.svg" alt="Приставки и ТВ" /> Приставки и ТВ
              </button>
              <button
                className={`list-group-item list-group-item-action left_menu ${
                  selectedCategory === '3' ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick('3')}
              >
                <img src="../../public/img/sim4.svg" alt="Сим-карты" /> Сим-карты
              </button>
            </div>
          </div>

          {/* Карточки товаров */}
          <div className="col-md-9">
            <div className="row_card" id="products">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id || `prod-${Math.random()}`} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shop;