import React, { useState, useEffect } from 'react';

function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      title: 'Ого! CTM возвращает деньги',
      description: 'За неиспользованные минуты и ГБ.',
      image: '/img/img_sl_1.png',
      alt: 'Слайд 1',
    },
    {
      title: 'Подключи Максимум',
      description: 'Всего 1000 ₽ за 3 месяца с Абонементом',
      image: '/img/img_sl_2.png',
      alt: 'Слайд 2',
    },
    {
      title: 'Всего 1000 ₽ за 3 месяца с Абонементом',
      description: 'Начисляем игровую валюту каждый месяц',
      image: '/img/img_sl_3.png',
      alt: 'Слайд 3',
    },
    {
      title: 'Сим-карта за 30 минут',
      description: 'Бесплатная доставка от Самоката',
      image: '/img/img_sl_4.svg',
      alt: 'Слайд 4',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {items.map((item, index) => (
          <div key={index} className={`carousel-item sl_br_rad ${index === activeIndex ? 'active' : ''}`}>
            <div className="row no-gutters">
              <div className="col-md-6 d-flex flex-column align-items-start justify-content-center sl_padding_text">
                <div className="chil">
                  <div className="sl_block_text">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                  <div className="sl_btn">
                    <button className="btn btn-primary btn_wh">Подробнее</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <img src={item.image} className="img-fluid" alt={item.alt} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" onClick={handlePrevClick}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Предыдущий</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" onClick={handleNextClick}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Следующий</span>
      </button>
    </div>
  );
}

export default Slider;
