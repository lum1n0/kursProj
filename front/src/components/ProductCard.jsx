import React from 'react';

// Базовый URL бэкенда для изображений
const API_BASE_URL = 'http://localhost:8080';

// Функция для получения полного URL изображения
const getImageUrl = (relativePath) => {
  if (!relativePath) return '/img/default-product.svg';
  if (relativePath.startsWith('http')) return relativePath; // Уже полный URL
  return `${API_BASE_URL}${relativePath}`;
};

function ProductCard({ product }) {
  return (
    <div className="col-md-4 product-card">
      <div className="card">
        <img
          src={getImageUrl(product.imageUrl)}
          className="card-img-top"
          alt={product.name || 'Товар'}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name || 'Без названия'}</h5>
          <p className="card-text">{product.description || 'Описание отсутствует'}</p>
          <p className="card-text">Цена: {product.price !== null ? `${product.price} руб.` : 'Не указана'}</p>
          <a href="#" className="btn btn-primary">Купить</a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;