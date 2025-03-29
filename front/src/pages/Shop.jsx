import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/ApiClient'; // Импортируй функцию для получения товаров с бэкенда

function Shop() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }

    fetchProducts();
  }, []);

  const handleCategoryClick = (cat) => {
    setCategory(cat);
  };

  const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);

  return (
    <section className="conteiner" id="shop_z1">
      <h1 className="title_hero shop_title">Магазин СТМ</h1>
      <div className="container-fluid">
        <div className="row">
          {/* Боковое меню */}
          <div className="col-md-3">
            <div className="list-group left_menu">
              <button
                className={`list-group-item list-group-item-action left_menu ${category === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('all')}
              >
                Все товары
              </button>
              <button
                className={`list-group-item list-group-item-action left_menu ${category === 'modems' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('modems')}
              >
                <img src="/img/modem2.svg" alt="" /> Модемы и роутеры
              </button>
              <button
                className={`list-group-item list-group-item-action left_menu ${category === 'routers' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('routers')}
              >
                <img src="/img/router3.svg" alt="" /> Роутеры и интернет-центры
              </button>
              <button
                className={`list-group-item list-group-item-action left_menu ${category === 'sim' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('sim')}
              >
                <img src="/img/sim4.svg" alt="" /> Сим-карты
              </button>
              <button
                className={`list-group-item list-group-item-action left_menu ${category === 'subscriptions' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('subscriptions')}
              >
                <img src="/img/abonent5.svg" alt="" /> СТМ Абонементы
              </button>
            </div>
          </div>

          {/* Карточки товаров */}
          <div className="col-md-9">
            <div className="row_card" id="products">
              {filteredProducts.map(product => (
                <div key={product.id} className="col-md-4 product-card">
                  <div className="card">
                    <img src={product.image} className="card-img_top" alt={product.name} />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <a href="#" className="btn btn-primary">Купить</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shop;
