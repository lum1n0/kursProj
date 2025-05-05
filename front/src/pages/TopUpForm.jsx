import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { postData } from '../api/ApiClient';
import Header from '../components/Templates/Header.jsx';
import Footer from '../components/Templates/Footer.jsx';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import '../assets/styles/TopUpForm.scss';

function TopUpForm() {
    const { user, isLoading } = useAuthStore();
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [amount, setAmount] = useState('');

    if (isLoading) return <div>Проверка аутентификации...</div>;
    if (!user) return <Navigate to="/login" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { amount: parseFloat(amount) };
        try {
            await postData('/api/users/topup', payload);
            Swal.fire('Успех', 'Баланс успешно пополнен!', 'success');
            setCardNumber('');
            setExpiryDate('');
            setCvv('');
            setAmount('');
        } catch (error) {
            Swal.fire('Ошибка', 'Не удалось пополнить баланс', 'error');
        }
    };

    return (
        <div className="topup">
            <Header />
            <div className="conteiner">
                <h2>Пополнение баланса</h2>
                <div className="topup-content">
                    <div className="credit-card">
                        <div className="card-chip"></div>
                        <div className="card-number">{cardNumber || 'XXXX XXXX XXXX XXXX'}</div>
                        <div className="card-details">
                            <div>
                                <label>Срок действия</label>
                                <span>{expiryDate || 'MM/YY'}</span>
                            </div>
                            <div>
                                <label>CVV</label>
                                <span>{cvv || 'XXX'}</span>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="topup-form">
                        <div className="form-group">
                            <label>Номер карты:</label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="1234 5678 9012 3456"
                                maxLength="19"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Срок действия:</label>
                            <input
                                type="text"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                placeholder="MM/YY"
                                maxLength="5"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>CVV:</label>
                            <input
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder="123"
                                maxLength="3"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Сумма (руб.):</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="100"
                                min="1"
                                required
                            />
                        </div>
                        <button type="submit">Пополнить</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TopUpForm;