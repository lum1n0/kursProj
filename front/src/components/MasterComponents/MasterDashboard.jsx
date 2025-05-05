import React, { useState, useEffect } from 'react';
import { ApiClient } from '../../api/ApiClient.js';
import Swal from 'sweetalert2';
import '../../assets/styles/MasterDashboard.scss';

function MasterDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await ApiClient.get('/api/master-requests/all');
      setRequests(response.data);
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
    }
  };

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await ApiClient.put(`/api/master-requests/status/${requestId}`, newStatus);
      Swal.fire('Успех', 'Статус обновлен', 'success');
      fetchRequests();
    } catch (error) {
      Swal.fire('Ошибка', 'Не удалось обновить статус', 'error');
    }
  };

  return (
    <div className="master-dashboard">
      <h2>Заявки на вызов мастера</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Описание</th>
            <th>Адрес</th>
            <th>Время</th>
            <th>Имя пользователя</th>
            <th>Телефон</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.description}</td>
              <td>{request.address}</td>
              <td>{new Date(request.preferredTime).toLocaleString()}</td>
              <td>{request.userFirstName}</td>
              <td>{request.userPhone}</td>
              <td>{request.status}</td>
              <td>
                <select
                  value={request.status}
                  onChange={(e) => handleStatusChange(request.id, e.target.value)}
                >
                  <option value="на рассмотрении">на рассмотрении</option>
                  <option value="выехал">выехал</option>
                  <option value="решил">решил</option>
                  <option value="отклонено">отклонено</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MasterDashboard;