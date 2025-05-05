import React, { useState, useEffect } from 'react';
import { ApiClient } from '../../api/ApiClient.js';
import Swal from 'sweetalert2';

function ProfileSection({ user }) {
    const [userData, setUserData] = useState(null);
    const [editing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await ApiClient.get('/api/profile/me');
                setUserData(response.data);
                setFirstName(response.data.firstName || '');
                setLastName(response.data.lastName || '');
                setPhone(response.data.phone || '');
            } catch (error) {
                Swal.fire('Ошибка', 'Не удалось загрузить данные пользователя', 'error');
            }
        };
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
            Swal.fire('Успех', 'Профиль обновлён', 'success');
        } catch (error) {
            Swal.fire('Ошибка', 'Не удалось обновить профиль', 'error');
        }
    };

    if (!userData) return <p>Загрузка...</p>;

    return (
        <div className="profile-section">
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
                            <p>Номер телефона: {userData.phone || 'Не указан'}</p>
                            <p>Тариф: {userData.tariffName}</p>
                            <p>Баланс: {userData.balance !== null ? `${userData.balance} руб.` : '0 руб.'}</p>
                        </>
                    )}
                </div>
                <img src="/img/free-icon-profile-avatar-4794936.png" alt="Profile avatar" />
            </div>
            {editing ? (
                <button onClick={handleSave}>Сохранить изменения</button>
            ) : (
                <button onClick={() => setEditing(true)}>Редактировать</button>
            )}
        </div>
    );
}

export default ProfileSection;