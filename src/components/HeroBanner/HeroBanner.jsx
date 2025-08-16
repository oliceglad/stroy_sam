import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./HeroBanner.module.scss";
import banner1 from "../../assets/images/images.jpeg";
import { useNavigate } from "react-router-dom";

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
        <SwiperSlide>
          <div
            className={styles.slide}
            style={{ backgroundImage: `url(${banner1})` }}
          >
            <div className={styles.content}>
              <h2>Скидка 30% на цемент и смеси</h2>
              <p>Успей купить до конца месяца!</p>
              <button
                className={styles.btn}
                onClick={() => navigate("/categories")}
              >
                Перейти в каталог
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={styles.slide}
            style={{ backgroundImage: `url(${banner1})` }}
          >
            <div className={styles.content}>
              <h2>Бесплатная доставка от 10 000 ₽</h2>
              <p>Привезём прямо на объект</p>
              <button
                className={styles.btn}
                onClick={() => navigate("/categories")}
              >
                Подробнее
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroBanner;
