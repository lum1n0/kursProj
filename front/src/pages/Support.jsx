import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SupportForm from '../components/SupportForm';
import MasterForm from '../components/MasterForm';
import { useAuthStore } from '../store/authStore';
import '../assets/styles/Support.scss';

function Support() {
  const { isLoggedIn } = useAuthStore();
  const [formType, setFormType] = useState('support'); // 'support' или 'master'

  return (
    <section className="support">
      <Header />
      <div className="conteiner">
        <h1 className="title_hero">Справочный центр СТМ</h1>
        {isLoggedIn ? (
          <>
            <div className="form-toggle">
              <button
                onClick={() => setFormType('support')}
                className={formType === 'support' ? 'active' : ''}
              >
                Задать вопрос
              </button>
              <button
                onClick={() => setFormType('master')}
                className={formType === 'master' ? 'active' : ''}
              >
                Вызов мастера
              </button>
            </div>
            {formType === 'support' ? <SupportForm /> : <MasterForm />}
          </>
        ) : (
          <p>Пожалуйста, авторизуйтесь, чтобы задать вопрос или вызвать мастера.</p>
        )}
      </div>
      <Footer />
    </section>
  );
}

export default Support;