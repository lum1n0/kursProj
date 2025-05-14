import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../utils/utils.js';
import { useAuthStore } from '../../store/authStore.js';
import Swal from 'sweetalert2';
import { ApiClient } from '../../api/ApiClient.js';
import '../../assets/styles/ProductCard.scss';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user, isLoggedIn, isLoading } = useAuthStore();

  const handleBuy = async () => {
    if (isLoading) {
      Swal.fire('Подождите', 'Данные пользователя загружаются', 'info');
      return;
    }

    if (!isLoggedIn || !user) {
      console.log('Пользователь не авторизован или данные пользователя отсутствуют', { isLoggedIn, user });
      Swal.fire('Ошибка', 'Войдите в систему, чтобы совершать покупки', 'error');
      return;
    }

    if (product.categoryId === 3) {
      const quantity = 1;
      const finalPrice = product.price * quantity;
      try {
        const response = await ApiClient.post('/api/orders', {
          userId: user.id,
          productServiceId: product.id,
          quantity: quantity,
          finalPrice: finalPrice,
          deliveryAddress: null,
        });
        Swal.fire('Успех', 'Товар успешно куплен', 'success');
      } catch (error) {
        Swal.fire('Ошибка', error.response?.data?.message || 'Не удалось совершить покупку', 'error');
      }
    } else {
      navigate('/order/new', { state: { product } });
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
            <div className="card-content">
              <h5 className="card-title">{product.name || 'Без названия'}</h5>
              <p className="card-text">{product.description || 'Описание отсутствует'}</p>
              <p className="card-price">
                Цена: {product.price !== null ? `${product.price} руб.` : 'Не указана'}
              </p>
              <p className="card-status">
                Статус: {product.status || 'Не указано'}
              </p>
            </div>
            <div className="card-buttons">
              <button className="btn" onClick={handleBuy} disabled={!isAvailable || isLoading}>
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
      </div>
  );
}

export default ProductCard;