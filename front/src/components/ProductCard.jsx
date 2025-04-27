// File path: /home/gtr/Рабочий стол/kursProj/front/src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/utils'; // Импортируем утилиту
import '../assets/styles/ProductCard.scss';

function ProductCard({ product, onBuy }) {
  return (
    <div className="product-card">
      <div className="card">
        <img
          src={getImageUrl(product.imageUrl)} // Используем импортированную функцию
          className="card-img-top"
          alt={product.name || 'Товар'}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name || 'Без названия'}</h5>
          <p className="card-text">{product.description || 'Описание отсутствует'}</p>
          <p className="card-price">
            Цена: {product.price !== null ? `${product.price} руб.` : 'Не указана'}
          </p>
          <button className="btn" onClick={() => onBuy(product.id)}>
            Купить
          </button>
          {product.id ? (
            <Link to={`/product/${product.id}`} className="btn btn-info">
              Подробнее
            </Link>
          ) : (
            <button className="btn btn-info" disabled>
              Подробнее (ID отсутствует)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;