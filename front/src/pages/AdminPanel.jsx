import React, { useEffect, useState } from 'react';
import { fetchData, putData, deleteData } from '../api/ApiClient';
import AdminHeader from '../components/AdminHeader';
import Swal from 'sweetalert2';
import { useAuthStore } from '../store/authStore';
import '../assets/styles/AdminPanel.scss';

function AdminPanel() {
    const { isAdmin } = useAuthStore(); // Получаем статус администратора
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [editingUser, setEditingUser] = useState(null);
    const [history, setHistory] = useState({});
    const [openHistoryId, setOpenHistoryId] = useState(null);

    useEffect(() => {
        if (isAdmin) {
            fetchUsers();
        } else {
            setError('У вас нет прав для доступа к этой странице');
            setLoading(false);
        }
    }, [page, isAdmin]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetchData(`/api/users/paged?page=${page}&size=7`);
            setUsers(response.content || []);
            setTotalPages(response.totalPages || 0);
        } catch (err) {
            setError('Ошибка при загрузке пользователей');
            Swal.fire('Ошибка', 'Не удалось загрузить пользователей', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchHistory = async (userId) => {
        try {
            if (openHistoryId === userId) {
                setOpenHistoryId(null);
                return;
            }
            if (!history[userId]) {
                const data = await fetchData(`/api/user-history/by-user/${userId}`);
                console.log(`История для userId ${userId}:`, data);
                setHistory((prev) => ({ ...prev, [userId]: data }));
            }
            setOpenHistoryId(userId);
        } catch (error) {
            Swal.fire('Ошибка', 'Не удалось загрузить историю', 'error');
        }
    };

    const handleEdit = (user) => {
        setEditingUser({ ...user });
    };

    const handleSave = async () => {
        try {
            await putData(`/api/users/${editingUser.id}`, {
                id: editingUser.id,
                firstName: editingUser.firstName,
                lastName: editingUser.lastName,
                phone: editingUser.phone,
            });
            setEditingUser(null);
            fetchUsers();
            Swal.fire('Успех', 'Пользователь обновлён', 'success');
        } catch (err) {
            Swal.fire('Ошибка', 'Не удалось сохранить изменения', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Точно ли вы хотите удалить данного пользователя?')) {
            try {
                await deleteData(`/api/users/${id}`);
                fetchUsers();
                Swal.fire('Успех', 'Пользователь удалён', 'success');
            } catch (err) {
                Swal.fire('Ошибка', 'Не удалось удалить пользователя', 'error');
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    if (!isAdmin) return <div>У вас нет прав для доступа к этой странице</div>;
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="admin-panel">
            <AdminHeader />
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
                            <td className="admin-td">{user.login}</td>
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
                            <td className="admin-td">{user.role === 'USER' ? 'Пользователь' : 'Администратор'}</td>
                            <td className="admin-td">{user.tariffName}</td>
                            <td className="admin-td actions">
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
            <div className="pagination">
                <button className="btn" disabled={page === 0} onClick={() => setPage(page - 1)}>
                    Назад
                </button>
                <span>Страница {page + 1} из {totalPages}</span>
                <button className="btn" disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}>
                    Вперед
                </button>
            </div>
        </div>
    );
}

export default AdminPanel;