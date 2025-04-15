import React from 'react';
import { useForm } from 'react-hook-form';
import { postData } from '../api/ApiClient';
import { useAuthStore } from '../store/authStore';

function SupportForm() {
  const { user } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (!data.message || data.message.trim() === '') {
      alert('Сообщение не может быть пустым');
      return;
    }
    try {
      await postData('/api/support/send', { userId: user.id, message: data.message });
      alert('Сообщение отправлено');
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      alert('Ошибка при отправке сообщения');
    }
  };

  return (
    <div>
      <h2>Задать нам вопрос</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register('message', { required: 'Сообщение обязательно' })}
          placeholder="Ваше сообщение"
        />
        {errors.message && <p>{errors.message.message}</p>}
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default SupportForm;