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
        // Фильтруем сообщения с null id
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
      await postData(`/api/support/admin/answer/${id}`, answer);
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
          <div key={msg.id || `msg-${index}`}> {/* Запасной ключ на основе index */}
            <p>{msg.message || 'Сообщение отсутствует'}</p>
            <p>User ID: {msg.userId || 'Неизвестный пользователь'}</p>
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