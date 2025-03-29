import React from 'react';
import { Link } from 'react-router-dom';

function Modem() {
  return (
    <section className="conteiner" id="supp_z1">
      <h1 className="title_hero">
        Решим <span className="blue_title"> ваши</span> проблемы с модемом
      </h1>
      <h3 className="all_sect">Все разделы</h3>
      <div className="card_container">
        <div className="main_card">
          <div className="main_card_items_left">
            <div className="card_header">
              <h2 className="card-title">Тарифы</h2>
            </div>
            <ul className="card-list">
              <li>Тарифы и возможности</li>
              <li>Интернет на несколько часов</li>
            </ul>
            <Link to="#" className="card-link">Подробнее</Link>
          </div>
          <img src="/img/modem_tariffs.png.png" alt="" />
        </div>

        {/* ... остальные карточки ... */}

      </div>
    </section>
  );
}

export default Modem;
