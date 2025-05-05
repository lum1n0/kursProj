import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { postData } from '../../api/ApiClient.js';
import Swal from 'sweetalert2';
import '../../assets/styles/ResetPassword.scss';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            Swal.fire('Ошибка', 'Пароли не совпадают', 'error');
            return;
        }

        try {
            await postData('/auth/password/reset', { token, newPassword });
            Swal.fire('Успех', 'Пароль успешно изменён!', 'success');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            Swal.fire('Ошибка', error.message || 'Не удалось сбросить пароль.', 'error');
        }
    };

    return (
        <div className="reset-password">
            <h1>Сброс пароля</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Новый пароль"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Подтвердите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
}

export default ResetPassword;