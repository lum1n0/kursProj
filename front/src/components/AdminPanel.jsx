import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ApiClient } from '../api/ApiClient';

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [activeTab, setActiveTab] = useState('users');
    const [editingUser, setEditingUser] = useState(null);
    const [history, setHistory] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (activeTab === 'users') {
            fetchUsers();
        }
    }, [page, activeTab]);

    const fetchUsers = async () => {
        const token = Cookies.get('jwtToken');
        if (!token) {
            console.log('Токен отсутствует');
            setError('Нет доступа');
            setLoading(false);
            return;
        }
    
        try {
            console.log('Отправляем запрос к /api/users/paged?page=', page, '&size=7');
            const response = await ApiClient.get(`/api/users/paged?page=${page}&size=7`);
            console.log('Ответ сервера:', response.data);
            console.log('Статус ответа:', response.status);
    
            setUsers(response.data.content || []);
            setTotalPages(response.data.totalPages || 0);
        } catch (err) {
            console.error('Ошибка в fetchUsers:', err);
            if (err.response) {
                console.error('Статус ошибки:', err.response.status);
                console.error('Данные ошибки:', err.response.data);
            } else {
                console.error('Сетевая ошибка или проблема на клиенте:', err.message);
            }
            setError('Ошибка при загрузке пользователей');
        } finally {
            console.log('Загрузка завершена');
            setLoading(false);
        }
    };

    const fetchHistory = async (userId) => {
        const token = Cookies.get('jwtToken');
        const response = await fetch(`/api/user-history/by-user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setHistory((prev) => ({ ...prev, [userId]: data }));
    };

    const handleEdit = (user) => {
        console.log('Редактируем пользователя:', user);
        setEditingUser({ ...user });
    };

    const handleSave = async () => {
        const token = Cookies.get('jwtToken');
        try {
            await fetch(`/api/users/${editingUser.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingUser),
            });
            console.log('Пользователь успешно обновлён');
            setEditingUser(null);
            fetchUsers();
        } catch (err) {
            console.error('Ошибка при сохранении:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Точно ли вы хотите удалить данного пользователя?')) {
            const token = Cookies.get('jwtToken');
            await fetch(`/api/users/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchUsers();
        }
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <header className="head_conteiner">
                <nav className="nav_bar">
                    <div className="left">
                        <a href="/" className="logo">Админ-панель</a>
                    </div>
                    <div className="right">
                        <div className="links">
                            <a href="#" className="nav_link" onClick={() => setActiveTab('users')}>
                                Пользователи
                            </a>
                            <a href="#" className="nav_link" onClick={() => setActiveTab('shop')}>
                                Товары и Услуги
                            </a>
                            <a href="/swagger-ui.html" className="nav_link">Swagger</a>
                        </div>
                    </div>
                </nav>
            </header>
            

            {activeTab === 'users' && (
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
                                <th className="admin-th">История</th>
                                <th className="admin-th">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
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
                                                value={editingUser.lastName}
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
                                                value={editingUser.phone}
                                                onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                                            />
                                        ) : (
                                            user.phone
                                        )}
                                    </td>
                                    <td className="admin-td">{user.roleId === 1 ? 'Пользователь' : 'Администратор'}</td>
                                    <td className="admin-td">{user.tariffId ? 'Название тарифа' : 'Нет тарифа'}</td>
                                    <td className="admin-td">
                                        <button className="btn" onClick={() => fetchHistory(user.id)}>История</button>
                                        {history[user.id] && (
                                            <select>
                                                {history[user.id].map((entry) => (
                                                    <option key={entry.id}>
                                                        {entry.fieldName}: Было {entry.oldValue} Стало {entry.newValue}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </td>
                                    <td className="admin-td">
                                        {editingUser?.id === user.id ? (
                                            <button className="btn" onClick={handleSave}>Сохранить</button>
                                        ) : (
                                            <button className="btn" onClick={() => handleEdit(user)}>Редактировать</button>
                                        )}
                                        <button className="btn admin-btn-delete" onClick={() => handleDelete(user.id)}>Удалить</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <button className="btn" disabled={page === 0} onClick={() => setPage(page - 1)}>Назад</button>
                        <span>Страница {page + 1} из {totalPages}</span>
                        <button className="btn" disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}>Вперед</button>
                    </div>
                </>
            )}

            {activeTab === 'shop' && <AdminShop />}
        </div>
    );
}

export default AdminPanel;