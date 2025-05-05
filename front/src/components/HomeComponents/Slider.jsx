import React, { useState, useEffect } from 'react';
import '../../assets/styles/Slider.scss';

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
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  return (
      <div className="carousel">
        <div className="carousel-inner">
          {items.map((item, index) => (
              <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                <div className="row">
                  <div className="content">
                    <div className="text">
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                      <button className="btn">Подробнее</button>
                    </div>
                    <img src={item.image} alt={item.alt} />
                  </div>
                </div>
              </div>
          ))}
        </div>
        <button className="carousel-control-prev" onClick={handlePrevClick}>
          <span className="carousel-control-icon" aria-hidden="true"></span>
          <span className="visually-hidden"></span>
        </button>
        <button className="carousel-control-next" onClick={handleNextClick}>
          <span className="carousel-control-icon" aria-hidden="true"></span>
          <span className="visually-hidden"></span>
        </button>
      </div>
  );
}

export default Slider;