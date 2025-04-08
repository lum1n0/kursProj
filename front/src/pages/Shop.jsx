import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useShop } from '../store/ShopContext.jsx';

function Shop() {
  const shopData = useShop();

  // Проверка на undefined
  if (!shopData) {
    return <div>Загрузка...</div>;
  }

  const { products, categories, selectedCategory, setSelectedCategory } = shopData;

  const handleCategoryClick = (catId) => {
    console.log('Выбрана категория:', catId);
    setSelectedCategory(catId);
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => Number(product.categoryId) === Number(selectedCategory));

  return (
    <section className="conteiner" id="shop_z1">
      <h1 className="title_hero shop_title">Магазин СТМ</h1>
      <div className="container-fluid">
        <div className="row">
          {/* Боковое меню */}
          <div className="col-md-3">
            <div className="list-group left_menu">
              <button
                key="all-products"
                className={`list-group-item list-group-item-action left_menu ${
                  selectedCategory === 'all' ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick('all')}
              >
                Все товары
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id || `cat-${Math.random()}`}
                  className={`list-group-item list-group-item-action left_menu ${
                    selectedCategory === cat.id ? 'active' : ''
                  }`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <img
                    src={
                      cat.title
                        ? `/img/${cat.title.toLowerCase().replace(/\s+/g, '')}.svg`
                        : '/img/default.svg'
                    }
                    alt={cat.title || 'Категория'}
                  />{' '}
                  {cat.title || 'Без названия'}
                </button>
              ))}
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