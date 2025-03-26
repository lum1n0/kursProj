import React, { useState, useEffect } from 'react';
import { ApiClient } from '../api/ApiClient';

function User() {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const fetchUserData = async () => {
    try {
      console.log("Fetching user data");
      const response = await ApiClient.get('/api/profile/me');
      console.log("User data fetched:", response.data);
      setUserData(response.data);
      setFirstName(response.data.firstName || '');
      setLastName(response.data.lastName || '');
      setPhone(response.data.phone || '');
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response data:", error.response.data);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await ApiClient.put('/api/profile/me', {
        firstName: firstName,
        lastName: lastName,
        phone: phone
      });
      setUserData(response.data);
      setEditing(false);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Ошибка: " + error.response.data); // "Телефон уже используется"
      } else {
        console.error('Error updating user data:', error);
        alert('Ошибка при обновлении профиля');
      }
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
      <div className="coc">
        <section className="conteiner" id="admin_z1">
          <div className="user_id">
            <h2 className="title_sect">Мой профиль</h2>
            <div className="card_profil">
              <div className="left_prof">
                <p>Логин: {userData.login}</p>
                <p>Почта: {userData.email}</p>
                {editing ? (
                    <>
                      <p>
                        Имя:
                        <input
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                      </p>
                      <p>
                        Фамилия:
                        <input
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                      </p>
                      <p>
                        Телефон:
                        <input
                            type="text"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                      </p>
                    </>
                ) : (
                    <>
                      <p>ФИО: {userData.firstName} {userData.lastName}</p>
                      <p>Номер телефона: {userData.phone}</p>
                    </>
                )}
              </div>
              <img src="/assets/img/free-icon-profile-avatar-4794936.png" alt="" />
            </div>
            {editing ? (
                <button onClick={handleSave}>Сохранить изменения</button>
            ) : (
                <button onClick={() => setEditing(true)}>Редактировать</button>
            )}
            <h2 className="title_sectic">Мои заявки</h2>
            <div className="new_cards" id="active_cart_mode">
              <div className="new_card">
                <p className="nam_surnam">Иванов Иван</p>
                <p className="mail_nw_crd">user@mail.ru</p>
                <p className="phone_user">+7 777 116 42 52</p>
                <p className="trabl_user">Переход с сохранением номера</p>
                <option value="rejected" id="status_otclon">Отклонена</option>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}

export default User;