import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-dark mt-5">
      <div className="conteiner">
        <div className="foot_img">
          <img src="/img/white_on_trans1.svg" alt="" />
        </div>
        <div className="">
          <div className="abs_foot">
            <ul className="footer-links">
              <li>
                <Link to="/shop" className="text-dark nav_link">Магазин</Link>
              </li>
              <li>
                <Link to="/pay" className="text-dark nav_link">Оплата услуг</Link>
              </li>
              <li>
                <Link to="/support" className="text-dark nav_link">Поддержка</Link>
              </li>
              <li>
                <Link to="/modem" className="text-dark nav_link">Модем</Link>
              </li>
            </ul>
            <p className="mt-3 text-center">
              Продолжая использовать наш сайт, вы даете согласие на обработку
              файлов Cookies и других пользовательских данных, в соответствии с
              <Link to="#" className="text-dark">Политикой конфиденциальности</Link>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
