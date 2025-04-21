import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../api/ApiClient';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postData('/auth/password/reset-request', { email });
            setMessage('Ссылка для восстановления пароля отправлена на вашу почту.');
        } catch (error) {
            setMessage('Ошибка: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div>
            <h1>Восстановление пароля</h1>
            {message && <p>{message}</p>}
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
            <Link to="/login">Вернуться ко входу</Link>
        </div>
    );
}

export default ForgotPassword;
