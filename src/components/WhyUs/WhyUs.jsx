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
    title: "Собственная доставка",
    description: "Доставляем заказы своим транспортом по Самаре и Самарской области — быстро, надёжно и без посредников.",
  },
  {
    icon: sawingImg,
    title: "Распил материалов под ваш размер",
    description: "Осуществляем распил пиломатериалов, металлопроката и листовых материалов — вы получаете готовые к работе изделия.",
  },
  {
    icon: assortmentImg,
    title: "Широкий ассортимент",
    description: "Более 3000 наименований товаров — всё для строительства и ремонта в одном месте.",
  },
  {
    icon: rentalImg,
    title: "Прокат инструмента",
    description: "Вы можете взять инструмент в аренду на нужный срок и не переплачивать за покупку.",
  },
  {
    icon: wholesaleImg,
    title: "Работа с оптом и организациями",
    description: "Сотрудничаем с частными клиентами, бригадами и компаниями. Предлагаем выгодные условия для оптовых закупок.",
  },
  {
    icon: assemblyImg,
    title: "Самовывоз и комплектация заказа",
    description: "Соберём заказ заранее — вы заберёте его быстро и без ожидания.",
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
