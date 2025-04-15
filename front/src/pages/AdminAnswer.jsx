import React, { useState, useEffect } from 'react';
import { fetchData, postData } from '../api/ApiClient.js';
import AdminHeader from '../components/AdminHeader.jsx';

function AdminAnswer() {
    const [messages, setMessages] = useState([]);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const data = await fetchData('/api/support/admin/unanswered');
                const validMessages = data.filter(msg => msg.id != null);
                setMessages(validMessages);
            } catch (error) {
                console.error('Ошибка при загрузке сообщений:', error);
            }
        };
        loadMessages();
    }, []);

    const handleAnswer = async (id) => {
        try {
            // Отправляем строку как plain text, чтобы избежать URL-кодирования на клиенте
            await postData(`/api/support/admin/answer/${id}`, answer, {
                headers: {
                    'Content-Type': 'text/plain; charset=UTF-8'
                }
            });
            setMessages(messages.filter(m => m.id !== id));
            setSelectedMessageId(null);
            setAnswer('');
        } catch (error) {
            console.error('Ошибка при отправке ответа:', error);
            alert('Не удалось отправить ответ. Попробуйте позже.');
        }
    };

    return (
        <div>
            <AdminHeader />
            <h1>Неотвеченные сообщения</h1>
            {messages.length === 0 ? (
                <p>Нет неотвеченных сообщений</p>
            ) : (
                messages.map((msg, index) => (
                    <div key={msg.id || `msg-${index}`}>
                        <p><strong>Сообщение:</strong> {msg.message || 'Сообщение отсутствует'}</p>
                        <p><strong>User ID:</strong> {msg.userId || 'Неизвестный пользователь'}</p>
                        {msg.adminResponse && (
                            <p><strong>Ответ администратора:</strong> {msg.adminResponse}</p>
                        )}
                        {selectedMessageId === msg.id ? (
                            <>
                                <textarea value={answer} onChange={e => setAnswer(e.target.value)} />
                                <button onClick={() => handleAnswer(msg.id)}>Отправить</button>
                            </>
                        ) : (
                            <button onClick={() => setSelectedMessageId(msg.id)}>Дать ответ</button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default AdminAnswer;