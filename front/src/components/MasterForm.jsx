import React from 'react';
import { useForm } from 'react-hook-form';
import { postData } from '../api/ApiClient';
import { useAuthStore } from '../store/authStore';
import Swal from 'sweetalert2';
import '../assets/styles/MasterForm.scss';

function MasterForm() {
  const { user } = useAuthStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await postData('/api/master-requests', {
        description: data.description,
        address: data.address,
        preferredTime: data.preferredTime,
        status: 'на рассмотрении',
        requestType: 'MASTER',
        userId: user.id,
      });
      Swal.fire('Успех', 'Заявка отправлена мастеру', 'success');
      reset();
    } catch (error) {
      Swal.fire('Ошибка', 'Не удалось отправить заявку', 'error');
    }
  };

  return (
    <div className="master-form">
      <h2>Вызов мастера</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register('description', { required: 'Описание обязательно' })}
          placeholder="Описание проблемы"
        />
        {errors.description && <p>{errors.description.message}</p>}
        <input
          type="text"
          {...register('address', { required: 'Адрес обязателен' })}
          placeholder="Адрес"
        />
        {errors.address && <p>{errors.address.message}</p>}
        <input
          type="datetime-local"
          {...register('preferredTime', { required: 'Время обязательно' })}
        />
        {errors.preferredTime && <p>{errors.preferredTime.message}</p>}
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default MasterForm;