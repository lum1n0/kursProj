import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { postData } from '../api/ApiClient';
import Header from '../components/Header';
import '../assets/style__css/TopUpForm.css'; // Подключим стили

function TopUpForm() {
    const { user } = useAuthStore();
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [amount, setAmount] = useState('');

    if (!user) {
        return <p>Пожалуйста, авторизуйтесь для пополнения баланса.</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            amount: parseFloat(amount), // Отправляем объект с полем amount
        };
        try {
            await postData('/api/users/topup', payload);
            alert('Баланс успешно пополнен!');
            setCardNumber('');
            setExpiryDate('');
            setCvv('');
            setAmount('');
        } catch (error) {
            console.error('Ошибка при пополнении баланса:', error);
            alert('Не удалось пополнить баланс');
        }
    };

    return (
        <div className="topup-container">
            <Header />
            <h2>Пополнение баланса</h2>
            <div className="topup-content">
                <div className="card-preview">
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
    );
}

export default TopUpForm;