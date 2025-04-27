import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiClient } from '../api/ApiClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getImageUrl } from '../utils/utils';
import { useAuthStore } from '../store/authStore';
import Swal from 'sweetalert2';
import '../assets/styles/ProductDetails.scss';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn, isLoading } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [isProductLoading, setIsProductLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Загрузка товара с ID:', id);
        const response = await ApiClient.get(`/api/shop/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке товара:', error);
      } finally {
        setIsProductLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuy = () => {
    if (isLoading) {
      Swal.fire('Подождите', 'Данные пользователя загружаются', 'info');
      return;
    }

    if (!isLoggedIn || !user) {
      console.log('Пользователь не авторизован или данные пользователя отсутствуют', { isLoggedIn, user });
      Swal.fire('Ошибка', 'Войдите в систему, чтобы совершать покупки', 'error');
      return;
    }

    // Перенаправляем на страницу оформления заказа с данными о товаре
    navigate('/order/new', { state: { product } });
  };

  if (isProductLoading) return <div>Загрузка товара...</div>;
  if (!product) return <div>Товар не найден</div>;

  const isAvailable = product.status === 'в наличии';

  return (
      <div className="product-details">
        <Header />
        <div className="container">
          <h1>{product.name}</h1>
          <img src={getImageUrl(product.imageUrl)} alt={product.name} />
          <p>{product.description || 'Описание отсутствует'}</p>
          <p>Цена: {product.price} руб.</p>
          <p>Статус: {product.status || 'Не указано'}</p>
          <button onClick={handleBuy} disabled={!isAvailable || isLoading}>
            {isAvailable ? 'Купить' : 'Недоступно'}
          </button>
        </div>
        <Footer />
      </div>
  );
}

export default ProductDetails;