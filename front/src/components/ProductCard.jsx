import React from 'react';
import '../assets/styles/ProductCard.scss';

const API_BASE_URL = 'http://localhost:8080';

const getImageUrl = (relativePath) => {
  if (!relativePath) return '/img/default-product.svg';
  if (relativePath.startsWith('http')) return relativePath;
  return `${API_BASE_URL}${relativePath}`;
};

function ProductCard({ product }) {
  return (
      <div className="product-card">
        <div className="card">
          <img
              src={getImageUrl(product.imageUrl)}
              className="card-img-top"
              alt={product.name || 'Товар'}
          />
          <div className="card-body">
            <h5 className="card-title">{product.name || 'Без названия'}</h5>
            <p className="card-text">{product.description || 'Описание отсутствует'}</p>
            <p className="card-price">Цена: {product.price !== null ? `${product.price} руб.` : 'Не указана'}</p>
            <button className="btn">Купить</button>
          </div>
        </div>
      </div>
  );
}

export default ProductCard;