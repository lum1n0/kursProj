// File path: /home/gtr/Рабочий стол/kursProj/front/src/components/OrderForm.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiClient } from '../api/ApiClient';
import Swal from 'sweetalert2';

function OrderForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || {};
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiClient.put(`/api/orders/${orderId}`, { deliveryAddress: address });
      Swal.fire('Успех', 'Адрес доставки сохранен', 'success');
      navigate('/user');
    } catch (error) {
      Swal.fire('Ошибка', 'Не удалось сохранить адрес', 'error');
    }
  };

  return (
    <div>
      <h2>Введите адрес доставки</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Адрес доставки"
          required
        />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}

export default OrderForm;