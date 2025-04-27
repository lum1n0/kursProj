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
  const { user, isLoggedIn } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ApiClient.get(`/api/shop/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке товара:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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
      Swal.fire('Ошибка', error.response?.data?.message || 'Не удалось совершить покупку', 'error');
    }
  };

  if (isLoading) return <div>Загрузка...</div>;
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
          <button onClick={handleBuy} disabled={!isAvailable}>
            {isAvailable ? 'Купить' : 'Недоступно'}
          </button>
        </div>
        <Footer />
      </div>
  );
}

export default ProductDetails;