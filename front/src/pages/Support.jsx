import React from 'react';
import { Link } from 'react-router-dom';

function Support() {
  return (
    <section className="conteiner" id="supp_z1">
      <h1 className="title_hero">Справочный центр СТМ</h1>
      <h3 className="all_sect">Все разделы</h3>
      <div className="card-container">
        <div className="card">
          <div className="card-header">
            <img src="/img/sup_svg/Background.svg" alt="Иконка 1" className="card-icon" />
            <h2 className="card-title">Тарифы</h2>
          </div>
          <ul className="card-list">
            <li>Выбор и подключение тарифа</li>
            <li>СТМ для умных устройств</li>
            <li>Тарификация</li>
          </ul>
          <Link to="#" className="card-link">Подробнее</Link>
        </div>

        {/* ... остальные карточки ... */}

      </div>
    </section>
  );
}

export default Support;
