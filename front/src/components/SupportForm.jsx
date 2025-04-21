import React from 'react';
import { useForm } from 'react-hook-form';
import { postData } from '../api/ApiClient';
import { useAuthStore } from '../store/authStore';
import Swal from 'sweetalert2';
import '../assets/styles/SupportForm.scss';

function SupportForm() {
  const { user } = useAuthStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    if (!data.message || data.message.trim() === '') {
      Swal.fire('Ошибка', 'Сообщение не может быть пустым', 'error');
      return;
    }
    try {
      await postData('/api/support/send', { userId: user.id, message: data.message });
      Swal.fire('Успех', 'Сообщение отправлено', 'success');
      reset();
    } catch (error) {
      Swal.fire('Ошибка', 'Не удалось отправить сообщение', 'error');
    }
  };

  return (
      <div className="support-form">
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