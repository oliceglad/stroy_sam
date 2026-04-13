import React from "react";
import s from "./PaymentPage.module.scss";

const PaymentPage = () => {
  return (
    <div className={s.payment}>
      <div className={s.payment__hero}>
        <h1 className={s.payment__title}>Оплата</h1>
        <p className={s.payment__subtitle}>
          Без предоплат — платите только при получении
        </p>
      </div>

      <div className={s.payment__body}>
        <section className={s.payment__section}>
          <h2 className={s.payment__heading}>Как мы работаем</h2>
          <p className={s.payment__text}>
            В «Мухачаки» мы работаем без предоплат — вы оплачиваете заказ только
            при получении и проверке товара. Такой подход позволяет убедиться, что
            заказ полностью соответствует вашим ожиданиям, а вы получаете
            материалы надёжно и удобно.
          </p>
        </section>

        <div className={s.payment__cards}>
          <div className={s.payment__card}>
            <h3 className={s.payment__cardTitle}>При доставке</h3>
            <p className={s.payment__cardText}>
              Оплата на месте доставки доступна только наличными
            </p>
            <div className={s.payment__cardMethods}>
              <span className={s.payment__method}>Наличные</span>
            </div>
          </div>

          <div className={s.payment__card}>
            <h3 className={s.payment__cardTitle}>В магазине</h3>
            <p className={s.payment__cardText}>
              Оплатить картой или через QR-код можно только в нашем магазине
            </p>
            <div className={s.payment__cardMethods}>
              <span className={s.payment__method}>Наличные</span>
              <span className={s.payment__method}>Карта</span>
              <span className={s.payment__method}>QR-код</span>
            </div>
          </div>
        </div>

        <div className={s.payment__footer}>
          <p>Проверяйте товар при получении — платите только за качество!</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
