import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getImageUrl } from '../utils/utils';
import { ApiClient } from '../api/ApiClient';
import { useAuthStore } from '../store/authStore';
import Swal from 'sweetalert2';
import '../assets/styles/ProductCard.scss';

function ProductCard({ product, onBuy }) {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuthStore();

  const handleBuy = async () => {
    if (!isLoggedIn) {
      Swal.fire('Ошибка', 'Войдите в систему, чтобы совершать покупки', 'error');
      return;
    }

    try {
      const response = await ApiClient.post('/api/orders/buy', {
        userId: user.id,
        productServiceId: product.id,
        quantity: 1,
      });

      if (product.categoryId === 1 || product.categoryId === 2) {
        navigate('/order-form', { state: { orderId: response.data.id } });
      } else {
        Swal.fire('Успех', 'Покупка совершена', 'success');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        Swal.fire('Ошибка', 'У вас нет прав для совершения покупки. Пожалуйста, войдите в систему.', 'error');
      } else {
        Swal.fire('Ошибка', error.response?.data?.message || 'Не удалось совершить покупку', 'error');
      }
    }
  };

  const isAvailable = product.status === 'в наличии';

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
            <p className="card-price">
              Цена: {product.price !== null ? `${product.price} руб.` : 'Не указана'}
            </p>
            <p className="card-status">
              Статус: {product.status || 'Не указано'}
            </p>
            <button className="btn" onClick={handleBuy} disabled={!isAvailable}>
              {isAvailable ? 'Купить' : 'Недоступно'}
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