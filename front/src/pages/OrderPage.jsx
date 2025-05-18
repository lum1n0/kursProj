import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiClient } from '../api/ApiClient';
import { useAuthStore } from '../store/authStore';
import Header from "../components/Templates/Header.jsx";
import Swal from 'sweetalert2';
import '../assets/styles/OrderPage.scss';
import { getImageUrl } from '../utils/utils';

function OrderPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { product } = location.state || {};
    const [address, setAddress] = useState('');

    // Если данные о товаре не переданы, показываем сообщение
    if (!product) {
        return <div>Товар не найден. Пожалуйста, вернитесь в магазин.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Отправляем запрос на создание заказа с адресом доставки
            const response = await ApiClient.post('/api/orders/buy', {
                userId: user.id,
                productServiceId: product.id,
                quantity: 1,
                deliveryAddress: address,
            });
            Swal.fire('Успех', 'Заказ успешно оформлен', 'success');
            navigate('/user');
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
            Swal.fire('Ошибка', 'Не удалось оформить заказ', 'error');
        }
    };

    return (
        <div className="order-page">
            <Header/>
            <h2>Оформление заказа</h2>
            <div className="product-info">
                <h3>{product.name}</h3>
                <img src={getImageUrl(product.imageUrl)} alt={product.name} style={{ width: '100px' }} />
                <p>Цена: {product.price} руб.</p>
                <p>Описание: {product.description || 'Описание отсутствует'}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Адрес доставки:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Введите адрес доставки"
                        required
                    />
                </label>
                <button type="submit">Оформить</button>
            </form>
        </div>
    );
}

export default OrderPage;