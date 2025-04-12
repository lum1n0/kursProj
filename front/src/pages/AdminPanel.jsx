import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchData, putData, deleteData } from "../api/ApiClient.js";
import { useDataStore } from '../store/dataStore.js';
import AdminHeader from '../components/AdminHeader.jsx';


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
        try {
            setLoading(true);
            const response = await fetchData(`/api/users/paged?page=${page}&size=7`);
            setUsers(response.content || []);
            setTotalPages(response.totalPages || 0);
        } catch (err) {
            console.error("Ошибка при загрузке пользователей", err);
            setError("Ошибка при загрузке пользователей");
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
                setHistory((prev) => ({ ...prev, [userId]: data }));
            }
            setOpenHistoryId(userId);
        } catch (error) {
            console.error("Ошибка при получении истории:", error);
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
        } catch (err) {
            console.error("Ошибка при сохранении:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Точно ли вы хотите удалить данного пользователя?")) {
            try {
                await deleteData(`/api/users/${id}`);
                fetchUsers();
            } catch (err) {
                console.error("Ошибка при удалении пользователя:", err);
            }
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
<AdminHeader />

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
