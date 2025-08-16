import React from "react";
import styles from "./WhyUs.module.scss";

const items = [
  {
    icon: "🚚",
    title: "Быстрая доставка",
    text: "Привезём за 24 часа прямо на стройку",
  },
  {
    icon: "💰",
    title: "Выгодные цены",
    text: "Оптовые условия доступны каждому",
  },
  {
    icon: "🏗",
    title: "Широкий ассортимент",
    text: "Более 5000 товаров в наличии",
  },
  {
    icon: "📦",
    title: "Комплектация под заказ",
    text: "Соберём всё для вашего объекта",
  },
];

const WhyUs = () => {
  return (
    <div className={styles.whyus}>
      <h2>Почему выбирают нас</h2>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.icon}>{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
