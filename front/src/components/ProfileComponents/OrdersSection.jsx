import React, { useState, useEffect } from 'react';
import { getUserOrdersByCategories } from '../../api/ApiClient.js';

function OrdersSection({ userId }) {
    const [orders, setOrders] = useState([]);
    const [ordersError, setOrdersError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersResponse = await getUserOrdersByCategories(userId);
                setOrders(ordersResponse);
                setOrdersError(null);
            } catch (orderErr) {
                setOrdersError('Не удалось загрузить заказы. Попробуйте позже.');
            }
        };
        fetchOrders();
    }, [userId]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'в обработке':
                return 'orange';
            case 'доставляется':
                return 'blue';
            case 'доставлен':
                return 'green';
            default:
                return 'black';
        }
    };

    return (
        <div className="orders-section">
            <h2 className="title_sect">Мои заказы</h2>
            {ordersError ? (
                <p className="error-message">{ordersError}</p>
            ) : orders.length === 0 ? (
                <p>У вас пока нет заказов.</p>
            ) : (
                <div className="new_cards">
                    {orders.map((order) => (
                        <div className="new_card" key={order.id}>
                            <p>Дата: {new Date(order.orderDate).toLocaleString()}</p>
                            <p>Услуга: {order.productServiceName || 'Не указано'}</p>
                            <p>Цена: {order.finalPrice} руб.</p>
                            <p>Статус: <span style={{ color: getStatusColor(order.status) }}>{order.status}</span></p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrdersSection;