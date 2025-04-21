import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SupportForm from '../components/SupportForm';
import { useAuthStore } from '../store/authStore';
import '../assets/styles/Support.scss';

function Support() {
    const { isLoggedIn } = useAuthStore();

    return (
        <section className="support">
            <Header />
            <div className="conteiner">
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
                </div>
                {isLoggedIn ? <SupportForm /> : <p>Пожалуйста, авторизуйтесь, чтобы задать вопрос.</p>}
            </div>
            <Footer />
        </section>
    );
}

export default Support;