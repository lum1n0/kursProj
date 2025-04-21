import React, { useState, useEffect } from 'react';
import { fetchData, postData } from '../api/ApiClient';
import AdminHeader from '../components/AdminHeader';
import Swal from 'sweetalert2';
import '../assets/styles/AdminAnswer.scss';

function AdminAnswer() {
  const [messages, setMessages] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchData('/api/support/admin/unanswered');
        const validMessages = data.filter((msg) => msg.id != null);
        setMessages(validMessages);
      } catch (error) {
        Swal.fire('Ошибка', 'Не удалось загрузить сообщения', 'error');
      }
    };
    loadMessages();
  }, []);

  const handleAnswer = async (id) => {
    try {
      await postData(`/api/support/admin/answer/${id}`, answer, {
        headers: { 'Content-Type': 'text/plain; charset=UTF-8' },
      });
      setMessages(messages.filter((m) => m.id !== id));
      setSelectedMessageId(null);
      setAnswer('');
      Swal.fire('Успех', 'Ответ отправлен', 'success');
    } catch (error) {
      Swal.fire('Ошибка', 'Не удалось отправить ответ', 'error');
    }
  };

  return (
      <div className="admin-answer">
        <AdminHeader />
        <h1>Неотвеченные сообщения</h1>
        {messages.length === 0 ? (
            <p>Нет неотвеченных сообщений</p>
        ) : (
            messages.map((msg) => (
                <div key={msg.id || `msg-${Math.random()}`} className="message">
                  <p><strong>Сообщение:</strong> {msg.message || 'Сообщение отсутствует'}</p>
                  <p><strong>User ID:</strong> {msg.userId || 'Неизвестный пользователь'}</p>
                  {msg.adminResponse && <p><strong>Ответ:</strong> {msg.adminResponse}</p>}
                  {selectedMessageId === msg.id ? (
                      <>
                        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
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