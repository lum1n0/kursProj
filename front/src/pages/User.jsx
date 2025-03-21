import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiClient } from '../api/ApiClient';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

function User() {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState(null); // State для хранения ID пользователя

   useEffect(() => {
    console.log("useEffect запущен"); //  Добавляем лог
    const decodeToken = () => {
      const token = Cookies.get('jwtToken');
      if (token) {
        console.log("token:", token); //  Добавляем лог
        try {
          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken); //  Проверка содержимого токена
          //  Предполагаем, что ID пользователя находится в поле 'id' токена
          setUserId(decodedToken.id);
          console.log("decode");
          return decodedToken.id;
        } catch (error) {
          console.error("Error decoding token:", error);
          return null;
        }
      } else {
        console.log("No token found in cookies"); //  Добавляем лог
        return null;
      }
    };

    const fetchUserData = async (userId) => {
      try {
        console.log("Fetching user data for userId:", userId); //  Добавляем лог
        const response = await ApiClient.get(`/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    //  Получаем ID пользователя из токена
    const id = decodeToken();
    if (id) {
      fetchUserData(id);
    }
  }, []);

  const handleSave = () => {
    ApiClient.put(`/users/${userId}`, {
      firstName: firstName,
      lastName: lastName,
      phone: phone
    })
    .then(response => {
      setUserData(response.data);
      setEditing(false);
    })
    .catch(error => console.error('Error updating user data:', error));
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
