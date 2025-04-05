import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ApiClient } from "../api/ApiClient";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [activeTab, setActiveTab] = useState("users");
  const [editingUser, setEditingUser] = useState(null);
  const [history, setHistory] = useState({});
  const [openHistoryId, setOpenHistoryId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    }
  }, [page, activeTab]);

  const fetchUsers = async () => {
    const token = Cookies.get("jwtToken");
    if (!token) {
      console.log("Токен отсутствует");
      setError("Нет доступа");
      setLoading(false);
      return;
    }

    try {
      console.log("Отправляем запрос к /api/users/paged?page=", page, "&size=7");
      const response = await ApiClient.get(`/api/users/paged?page=${page}&size=7`);
      console.log("Ответ сервера:", response.data);
      console.log("Статус ответа:", response.status);

      setUsers(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (err) {
      console.error("Ошибка в fetchUsers:", err);
      if (err.response) {
        console.error("Статус ошибки:", err.response.status);
        console.error("Данные ошибки:", err.response.data);
      } else {
        console.error("Сетевая ошибка или проблема на клиенте:", err.message);
      }
      setError("Ошибка при загрузке пользователей");
    } finally {
      console.log("Загрузка завершена");
      setLoading(false);
    }
  };

  const fetchHistory = async (userId) => {
    const token = Cookies.get("jwtToken");
    try {
      if (openHistoryId === userId) {
        setOpenHistoryId(null);
        return;
      }

      if (!history[userId]) {
        const response = await fetch(`/api/user-history/by-user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setHistory((prev) => ({ ...prev, [userId]: data }));
        } else {
          console.error(`Ошибка при получении истории: ${response.status}`);
        }
      }
      setOpenHistoryId(userId);
    } catch (error) {
      console.error("Ошибка в fetchHistory:", error);
    }
  };

  const handleEdit = (user) => {
    console.log("Редактируем пользователя:", user);
    setEditingUser({ ...user });
  };

  const handleSave = async () => {
    const token = Cookies.get("jwtToken");
    const updatedUser = {
      id: editingUser.id,
      firstName: editingUser.firstName,
      lastName: editingUser.lastName,
      phone: editingUser.phone,
    };
    try {
      const response = await fetch(`/api/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      console.log("Пользователь успешно обновлён");
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Ошибка при сохранении:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Точно ли вы хотите удалить данного пользователя?")) {
      const token = Cookies.get("jwtToken");
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <header className="head_conteiner">
        <nav className="nav_bar">
          <div className="left">
            <a href="/" className="logo">
              Админ-панель
            </a>
          </div>
          <div className="right">
            <div className="links">
              <a href="#" className="nav_link" onClick={() => setActiveTab("users")}>
                Пользователи
              </a>
              <a className="nav_link" href="/admin/shop">
                Товары и Услуги
              </a>
              <a href="http://localhost:8080/swagger-ui/index.html" className="nav_link" target="_blank">
                Swagger
              </a>
            </div>
          </div>
        </nav>
      </header>

      {activeTab === "users" && (
        <>
          <h1 className="title_sect">Список пользователей</h1>
          <table className="admin-table">
            <thead>
              <tr>
                <th className="admin-th">Логин</th>
                <th className="admin-th">Имя</th>
                <th className="admin-th">Фамилия</th>
                <th className="admin-th">Почта</th>
                <th className="admin-th">Телефон</th>
                <th className="admin-th">Роль</th>
                <th className="admin-th">Тариф</th>
                <th className="admin-th">Действия</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <React.Fragment key={user.id}>
                  <tr>
                    <td className="admin-td"><a href={`/user/${user.id}`}>{user.login}</a></td>
                    <td className="admin-td">
                      {editingUser?.id === user.id ? (
                        <input
                          className="admin-input"
                          value={editingUser.firstName}
                          onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                        />
                      ) : (
                        user.firstName
                      )}
                    </td>
                    <td className="admin-td">
                      {editingUser?.id === user.id ? (
                        <input
                          className="admin-input"
                          value={editingUser.lastName || ''}
                          onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                        />
                      ) : (
                        user.lastName
                      )}
                    </td>
                    <td className="admin-td">{user.email}</td>
                    <td className="admin-td">
                      {editingUser?.id === user.id ? (
                        <input
                          className="admin-input"
                          value={editingUser.phone || ''}
                          onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                        />
                      ) : (
                        user.phone
                      )}
                    </td>
                    <td className="admin-td">
                      {user.role === 'USER' ? 'Пользователь' : 'Администратор'}
                    </td>
                    <td className="admin-td">{user.tariffName}</td>
                    <td className="admin-td">
                      {editingUser?.id === user.id ? (
                        <button className="btn" onClick={handleSave}>Сохранить</button>
                      ) : (
                        <button className="btn" onClick={() => handleEdit(user)}>Редактировать</button>
                      )}
                      <button className="btn admin-btn-delete" onClick={() => handleDelete(user.id)}>Удалить</button>
                      <button className="btn" onClick={() => fetchHistory(user.id)}>
                        {openHistoryId === user.id ? 'Скрыть историю' : 'Показать историю'}
                      </button>
                    </td>
                  </tr>
                  {openHistoryId === user.id && history[user.id] && (
                    <tr>
                      <td colSpan="8">
                        <div className="history-container">
                          <h3>История изменений</h3>
                          <ul>
                            {history[user.id].map((entry) => (
                              <li key={entry.id}>
                                {entry.fieldName}: Было {entry.oldValue} Стало {entry.newValue} (Изменено: {formatDate(entry.changedWhen)})
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div>
            <button className="btn" disabled={page === 0} onClick={() => setPage(page - 1)}>
              Назад
            </button>
            <span>Страница {page + 1} из {totalPages}</span>
            <button className="btn" disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}>
              Вперед
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminPanel;