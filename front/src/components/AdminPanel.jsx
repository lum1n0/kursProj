import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = Cookies.get('jwtToken');
            if (!token) {
                setError('Нет доступа');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/admin/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error('Ошибка сервера');
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError('Ошибка при загрузке пользователей');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Список пользователей</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.firstName} {user.lastName}</li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;