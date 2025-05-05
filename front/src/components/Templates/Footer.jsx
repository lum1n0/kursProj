import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Footer.scss';

function Footer() {
  return (
      <footer className="footer">
        <div className="conteiner">
          <div className="foot_img">
            <img src="/img/white_on_trans1.svg" alt="Логотип" />
          </div>
          <ul className="footer-links">
            <li>
              <Link to="/shop" className="nav_link">Магазин</Link>
            </li>
            <li>
              <Link to="/topup" className="nav_link">Оплата услуг</Link>
            </li>
            <li>
              <Link to="/support" className="nav_link">Поддержка</Link>
            </li>
          </ul>
          <p className="policy">
            Продолжая использовать наш сайт, вы даете согласие на обработку файлов Cookies и других пользовательских данных, в соответствии с <Link to="#">Политикой конфиденциальности</Link>.
          </p>
        </div>
      </footer>
  );
}

export default Footer;