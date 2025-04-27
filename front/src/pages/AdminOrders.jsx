// File path: /home/gtr/Рабочий стол/kursProj/front/src/pages/AdminOrders.jsx
import React, { useState, useEffect } from 'react';
import { ApiClient } from '../api/ApiClient';
import Swal from 'sweetalert2';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    try {
      const response = await ApiClient.get(`/api/orders/admin?page=${page}&size=10`);
      setOrders(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await ApiClient.put(`/api/orders/admin/status/${orderId}`, newStatus);
      Swal.fire('Успех', 'Статус обновлен', 'success');
      fetchOrders();
    } catch (error) {
      Swal.fire('Ошибка', 'Не удалось обновить статус', 'error');
    }
  };

  return (
    <div>
      <h2>Управление заказами</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Пользователь</th>
            <th>Товар</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userId}</td>
              <td>{order.productServiceId}</td>
              <td>{order.status}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="в обработке">в обработке</option>
                  <option value="доставляется">доставляется</option>
                  <option value="доставлен">доставлен</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage(page - 1)} disabled={page === 0}>Предыдущая</button>
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>Следующая</button>
    </div>
  );
}

export default AdminOrders;