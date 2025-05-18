import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/AdminHeader.scss';

function AdminHeader() {
  return (
      <header className="head_conteiner">
        <nav className="nav_bar">
          <div className="left">
            <Link to="/" className="logo">
              Админ-панель
            </Link>
          </div>
          <div className="right">
            <div className="links">
              <Link to="/admin" className="nav_link">Пользователи</Link>
              <Link to="/admin/shop" className="nav_link">Товары и Услуги</Link>
              <Link to="/admin/answer" className="nav_link">Ответы на вопросы</Link>
              <Link to="/admin/orders" className="nav_link">Заказы</Link>
              {/*<Link to="/admin/products" className="nav_link">Управление товарами</Link>*/}
              <a
                  href="http://localhost:8080/swagger-ui/index.html"
                  className="nav_link"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                Swagger
              </a>
            </div>
          </div>
        </nav>
      </header>
  );
}

export default AdminHeader;