import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiClient } from '../api/ApiClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getImageUrl } from '../utils/utils';
import '../assets/styles/ProductDetails.scss';

function ProductDetails() {
  const { id } = useParams();
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

  if (isLoading) return <div>Загрузка...</div>;
  if (!product) return <div>Товар не найден</div>;

  return (
    <div className="product-details">
      <Header />
      <div className="container">
        <h1>{product.name}</h1>
        <img src={getImageUrl(product.imageUrl)} alt={product.name} />
        <p>{product.description}</p>
        <p>Цена: {product.price} руб.</p>
        <p>Количество: {product.quantity || 'Не указано'}</p>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetails;