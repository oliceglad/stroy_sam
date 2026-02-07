import React from "react";
import styles from "./WhyUs.module.scss";

// Import images
import deliveryImg from "../../assets/benefit_delivery.png";
import sawingImg from "../../assets/benefit_sawing.png";
import assortmentImg from "../../assets/benefit_assortment.png";
import wholesaleImg from "../../assets/benefit_wholesale.png";
import rentalImg from "../../assets/benefit_rental.png";
import assemblyImg from "../../assets/benefit_assembly.png";

const items = [
  {
    icon: deliveryImg,
    title: "Доставка своим транспортом",
    description: "Быстро и бережно доставим ваш заказ прямо на объект в удобное время.",
  },
  {
    icon: sawingImg,
    title: "Распил",
    description: "Профессиональный распил листовых материалов по вашим размерам.",
  },
  {
    icon: assortmentImg,
    title: "Широкий ассортимент",
    description: "Более 10 000 товаров для стройки и ремонта всегда в наличии.",
  },
  {
    icon: wholesaleImg,
    title: "Оптовые программы",
    description: "Специальные цены и условия для строительных бригад и организаций.",
  },
  {
    icon: rentalImg,
    title: "Прокат инструмента",
    description: "Аренда профессионального инструмента на выгодных условиях.",
  },
  {
    icon: assemblyImg,
    title: "Комплектация заказа",
    description: "Соберем весь заказ по вашему списку и подготовим к выдаче.",
  },
];

const WhyUs = () => {
  return (
    <div className={styles.benefits}>
      <h2 className={styles.benefits__title}>Наши преимущества</h2>
      <div className={styles.benefits__grid}>
        {items.map((item, i) => (
          <div key={i} className={styles.benefits__card}>
            <div className={styles.benefits__imageWrapper}>
                <img src={item.icon} alt={item.title} className={styles.benefits__image} />
            </div>
            <h3 className={styles.benefits__cardTitle}>{item.title}</h3>
            <p className={styles.benefits__cardDesc}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
