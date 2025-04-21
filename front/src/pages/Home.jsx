import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import '../assets/styles/Home.scss';

function Home() {
  return (
      <div className="home">
        <Header />
        <section className="conteiner" id="z1">
          <h1 className="title_hero">МОЖНО С <span className="blue_title">СТМ</span></h1>
          <Slider />
        </section>

        <section className="conteiner" id="z2">
          <div className="cards_block">
            <div className="duo_top">
              <div className="top_card">
                <h3 className="card_title">Оплатить <span className="blue_title">смартфон/планшет</span></h3>
                <div className="form_card">
                  <form>
                    <div className="forma_my">
                      <div className="form_item">
                        <label htmlFor="prices">Сумма</label>
                        <div className="input-container">
                          <input id="prices" type="text" name="prices" placeholder="500" />
                          <span className="currency">₽</span>
                        </div>
                      </div>
                      <div className="form_item">
                        <label htmlFor="telephon">Номер телефона</label>
                        <input type="tel" name="telephon" id="telephon" placeholder="+7" />
                      </div>
                    </div>
                    <button className="blue_btn">Оплатить</button>
                  </form>
                </div>
              </div>
              <div className="top_card card_right">
                <div className="card_child_left">
                  <h3 className="card_title">Настроить свой тариф</h3>
                  <p className="card_text">Выбери нужное количество минут и гигабайтов</p>
                  <Link className="card_btn" to="/rate">Выбрать</Link>
                </div>
                <img src="/img/card_top_img.png" alt="" className="card_top" />
              </div>
            </div>
            <div className="trio_bot">
              <div className="bot_card">
                <img src="/img/sim.png" alt="" className="card_bot_img" />
                <div className="card_bot_text">
                  <h3 className="card_title">Перейти со своим номером</h3>
                  <p className="card_text">От другого оператора</p>
                </div>
                <button className="card_btn">Перейти</button>
              </div>
              <div className="bot_card">
                <img src="/img/routerflash.png" alt="" className="card_bot_img" />
                <div className="card_bot_text">
                  <h3 className="card_title">Подключить интернет</h3>
                  <p className="card_text">4G для дома, офиса или поездок</p>
                </div>
                <button className="card_btn">Перейти</button>
              </div>
              <div className="bot_card">
                <img src="/img/nicenumber.png" alt="" className="card_bot_img" />
                <div className="card_bot_text">
                  <h3 className="card_title">Заказать красивый номер</h3>
                  <p className="card_text">С бесплатной доставкой</p>
                </div>
                <button className="card_btn">Перейти</button>
              </div>
            </div>
          </div>
        </section>

        <section className="conteiner" id="z3">
          <h2 className="title_sect"><span className="blue_title">Настрой</span> свой тариф или подключи Максимум</h2>
          <div className="rate_cards">
            <div className="rate_card">
              <h3 className="card_title blue_title">Свой тариф</h3>
              <img src="/img/rate_set.png" alt="" />
              <button className="card_btn">Перейти</button>
            </div>
            <div className="rate_card second_abonent_max">
              <h3 className="card_title">Абонемент на Максимум</h3>
              <p className="small_text_max">Самое большое наполнение на 3 месяца</p>
              <div className="time_gig">
                <p className="abonent_trafick_text">50<sup className="stepen_text">ГБ</sup></p>
                <p className="abonent_trafick_text">2000<sup className="stepen_text">МИН</sup></p>
              </div>
              <p className="small_text_max">Самое большое наполнение на 3 месяца</p>
              <img src="/img/apps.png" alt="" className="apps_my" />
              <div className="za_dney_text">
                <div className="za_bolshe">1000 ₽<p className="za_menshe">за 90 дней</p></div>
              </div>
              <div className="za_dney_second">
                <p className="abonent_trafick_text blue_title">334<sup className="stepen_text">₽</sup></p>
                <p className="days_tr blue_title">за 30 дней</p>
              </div>
              <button className="blue_btn">Подробнее</button>
            </div>
          </div>
        </section>

        <section className="conteiner" id="z4">
          <h2 className="title_sect">Почему СТМ</h2>
          <div className="cards_block">
            <div className="card_item">
              <img src="/img/seven.png" alt="" />
              <p className="card_elemt_title">7 дней на связи</p>
              <p className="card_elemt_text">Входим в топ-5 операторов по количеству абонентов</p>
            </div>
            <div className="card_item">
              <img src="/img/speed.png" alt="" />
              <p className="card_elemt_title">Быстрый интернет</p>
              <p className="card_elemt_text">СТМ работает на сети МегаФона с <a href="https://www.speedtest.net" className="blue_title">лучшей скоростью интернета</a></p>
            </div>
            <div className="card_item">
              <img src="/img/pocryl.png" alt="" />
              <p className="card_elemt_title">Широкое покрытие</p>
              <p className="card_elemt_text">Сеть охватывает всю страну</p>
            </div>
            <div className="card_item">
              <img src="/img/heart.png" alt="" />
              <p className="card_elemt_title">Абоненты любят нас</p>
              <p className="card_elemt_text">У СТМ абоненты довольны оператором больше, чем у других</p>
            </div>
          </div>
        </section>

        <section className="conteiner" id="z5">
          <div id="map"></div>
        </section>
        <Footer />
      </div>
  );
}

export default Home;