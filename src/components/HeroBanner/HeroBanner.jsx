import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./HeroBanner.module.scss";
import slideTools from "../../assets/images/slide_tools_v2.png";
import slideMaterials from "../../assets/images/slide_materials_v2.png";
import slideLumber from "../../assets/images/slide_lumber_v2.png";
import slideCement from "../../assets/images/slide_cement_v2.png";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: slideTools,
    title: "Инструменты и крепёж",
    subtitle: "Всё для строительства и ремонта в одном месте",
    btnText: "Перейти в каталог",
  },
  {
    image: slideMaterials,
    title: "Листовые материалы",
    subtitle: "Профлист, поликарбонат, ОСБ и другие материалы",
    btnText: "Смотреть ассортимент",
  },
  {
    image: slideLumber,
    title: "Пиломатериалы",
    subtitle: "Брус, доска, вагонка — всегда в наличии",
    btnText: "Подробнее",
  },
  {
    image: slideCement,
    title: "Сухие смеси и цемент",
    subtitle: "Цемент, штукатурка, шпаклёвка, клей по выгодным ценам",
    btnText: "Выбрать",
  },
];

const HeroBanner = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.hero}>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}" style="
        width: 20px;
        height: 8px;
        border-radius: 4px;
        background: ${"#ff9800"};
        margin: 0 4px;
        display: inline-block;
      "></span>`;
          },
        }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={styles.slide}>
              <img
                src={slide.image}
                alt=""
                className={styles.slide__bg}
              />
              <img
                src={slide.image}
                alt={slide.title}
                className={styles.slide__img}
              />
              <div className={styles.slide__overlay} />
              <div className={styles.content}>
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <button
                  className={styles.btn}
                  onClick={() => navigate("/categories")}
                >
                  {slide.btnText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
