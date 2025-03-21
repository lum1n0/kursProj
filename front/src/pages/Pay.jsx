import React, { useState } from 'react';

function Pay() {
  const [activeMode, setActiveMode] = useState('smartphone'); // 'smartphone' или 'router'

  const handleModeClick = (mode) => {
    setActiveMode(mode);
  };

  return (
    <section className="conteiner" id="pay_z1">
      <h1 className="title_hero">Оплата банковской картой</h1>
      <div className="form_pay">
        <h2 className="mb-4 form_ti">Форма оплаты</h2>
        <div className="two_mode_zayv">
          <div
            className={`current_app ${activeMode === 'smartphone' ? 'active_mode' : 'passiv_mode'}`}
            onClick={() => handleModeClick('smartphone')}
          >
            Смартфон/Планшет
          </div>
          <div
            className={`new_app ${activeMode === 'router' ? 'active_mode' : 'passiv_mode'}`}
            onClick={() => handleModeClick('router')}
          >
            Модем/Роутер
          </div>
        </div>
        <form id="paymentForm">
          {activeMode === 'smartphone' && (
            <div id="smartphoneFields">
              <div className="input_item">
                <label htmlFor="phoneNumber">Номер телефона:</label>
                <input type="tel" className="form_control" id="phoneNumber" required />
              </div>
            </div>
          )}

          {activeMode === 'router' && (
            <div id="routerFields">
              <div className="input_item">
                <label htmlFor="accountNumber">Номер лицевого счета:</label>
                <input type="text" className="form_control" id="accountNumber" required />
              </div>
            </div>
          )}

          <div className="input_item">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form_control" id="email" required />
          </div>

          <div className="input_item">
            <label htmlFor="amount">Сумма оплаты:</label>
            <input type="number" className="form_control" id="amount" required />
          </div>

          <button type="submit" className="btn btn-primary">Оплатить картой</button>
        </form>
      </div>
    </section>
  );
}

export default Pay;
