import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postData } from '../../api/ApiClient.js';
import { useAuthStore } from '../../store/authStore.js';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/styles/MasterForm.scss';

function MasterForm() {
  const { user } = useAuthStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);

  const onSubmit = async (data) => {
    try {
      await postData('/api/master-requests', {
        description: data.description,
        address: data.address,
        preferredTime: selectedDate ? selectedDate.toISOString() : null,
        status: 'на рассмотрении',
        requestType: 'MASTER',
        userId: user.id,
      });
      Swal.fire('Успех', 'Заявка отправлена мастеру', 'success');
      reset();
      setSelectedDate(null);
    } catch (error) {
      Swal.fire('Ошибка', 'Не удалось отправить заявку', 'error');
    }
  };

  return (
      <div className="master-form">
        <h2 className="component-title">Вызов мастера</h2>
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
          <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd.MM.yyyy HH:mm"
              placeholderText="Выберите дату и время"
              className="date-picker"
              required
          />
          <button type="submit">Отправить</button>
        </form>
      </div>
  );
}

export default MasterForm;