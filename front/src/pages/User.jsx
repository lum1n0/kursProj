import React, { useState, useEffect } from 'react';
import { ApiClient } from '../api/ApiClient';

function User() {
    const [userData, setUserData] = useState(null);
    const [orders, setOrders] = useState([]);
    const [editing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    const fetchUserData = async () => {
        try {
            const response = await ApiClient.get('/api/profile/me');
            setUserData(response.data);
            setFirstName(response.data.firstName || '');
            setLastName(response.data.lastName || '');
            setPhone(response.data.phone || '');

            // Получение заказов
            const ordersResponse = await ApiClient.get(`/api/orders?userId=${response.data.id}`);
            setOrders(ordersResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            const response = await ApiClient.put('/api/profile/me', {
                firstName,
                lastName,
                phone,
            });
            setUserData(response.data);
            setEditing(false);
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Ошибка при обновлении профиля');
        }
    };

    if (!userData) return <p>Loading...</p>;

    return (
        <div className="coc">
            <section className="conteiner" id="admin_z1">
                <div className="user_id">
                    <h2 className="title_sect">Мой профиль</h2>
                    <div className="card_profil">
                        <div className="left_prof">
                            <p>Логин: {userData.login}</p>
                            <p>Почта: {userData.email}</p>
                            {editing ? (
                                <>
                                    <p>
                                        Имя:
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </p>
                                    <p>
                                        Фамилия:
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </p>
                                    <p>
                                        Телефон:
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>ФИО: {userData.firstName} {userData.lastName}</p>
                                    <p>Номер телефона: {userData.phone}</p>
                                    <p>Тариф: {userData.tariffId ? 'Название тарифа' : 'Нет тарифа'}</p> {/* Замените на реальный запрос */}
                                </>
                            )}
                        </div>
                        <img src="/assets/img/free-icon-profile-avatar-4794936.png" alt="" />
                    </div>
                    {editing ? (
                        <button onClick={handleSave}>Сохранить изменения</button>
                    ) : (
                        <button onClick={() => setEditing(true)}>Редактировать</button>
                    )}
                    <h2 className="title_sectic">Мои заказы</h2>
                    <div className="new_cards" id="active_cart_mode">
                        {orders.map((order) => (
                            <div className="new_card" key={order.id}>
                                <p>Дата: {new Date(order.orderDate).toLocaleString()}</p>
                                <p>Услуга: {order.productServiceId}</p> {/* Замените на название услуги */}
                                <p>Количество: {order.quantity}</p>
                                <p>Цена: {order.finalPrice}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default User;