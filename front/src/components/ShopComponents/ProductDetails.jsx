import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiClient } from '../../api/ApiClient.js';
import Header from '../Templates/Header.jsx';
import Footer from '../Templates/Footer.jsx';
import { getImageUrl } from '../../utils/utils.js';
import { useAuthStore } from '../../store/authStore.js';
import Swal from 'sweetalert2';
import '../../assets/styles/ProductDetails.scss';

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
          <button className="btn-bay" onClick={handleBuy} disabled={!isAvailable || isLoading}>
            {isAvailable ? 'Купить' : 'Недоступно'}
          </button>
        </div>
        <Footer />
      </div>
  );
}

export default ProductDetails;