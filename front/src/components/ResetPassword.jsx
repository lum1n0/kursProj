import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { postData } from '../api/ApiClient';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Extract token from URL
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Пароли не совпадают');
            return;
        }

        try {
            await postData('/auth/password/reset', { token, newPassword });
            setMessage('Пароль успешно изменен!');
            setTimeout(() => {
                navigate('/');
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            setMessage('Ошибка: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div>
            <h1>Сброс пароля</h1>
            {message && <p>{message}</p>}
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