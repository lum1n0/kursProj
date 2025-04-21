import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../api/ApiClient';
import Swal from 'sweetalert2';
import '../assets/styles/ForgotPassword.scss';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postData('/auth/password/reset-request', { email });
            Swal.fire('Успех', 'Ссылка для восстановления пароля отправлена на вашу почту.', 'success');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            Swal.fire('Ошибка', error.message || 'Не удалось отправить запрос.', 'error');
        }
    };

    return (
        <div className="forgot-password">
            <h1>Восстановление пароля</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
}

export default ForgotPassword;