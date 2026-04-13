import React from "react";
import s from "./DeliveryInfoPage.module.scss";

const DeliveryInfoPage = () => {
  return (
    <div className={s.delivery}>
      <div className={s.delivery__hero}>
        <h1 className={s.delivery__title}>Доставка и самовывоз</h1>
        <p className={s.delivery__subtitle}>
          Привезём стройматериалы прямо на ваш объект
        </p>
      </div>

      <div className={s.delivery__body}>
        <section className={s.delivery__section}>
          <h2 className={s.delivery__heading}>
            Доставка по Самаре и области
          </h2>
          <p className={s.delivery__text}>
            В «Мухачаки» мы заботимся о том, чтобы ваши стройматериалы прибыли
            быстро, безопасно и удобно. Доставку мы осуществляем собственным
            грузовым транспортом по г. Самара и Самарской области, а стоимость
            рассчитывается индивидуально в зависимости от расстояния от склада до
            вашего адреса и особенностей вашего заказа.
          </p>
        </section>

        <div className={s.delivery__cards}>
          <div className={s.delivery__card}>
            <h3 className={s.delivery__cardTitle}>Время доставки</h3>
            <p className={s.delivery__cardText}>
              Ежедневно с 9:00 до 19:00
            </p>
          </div>
          <div className={s.delivery__card}>
            <h3 className={s.delivery__cardTitle}>Подтверждение</h3>
            <p className={s.delivery__cardText}>
              Менеджеры свяжутся с вами в рабочее время
            </p>
          </div>
          <div className={s.delivery__card}>
            <h3 className={s.delivery__cardTitle}>Зона доставки</h3>
            <p className={s.delivery__cardText}>
              г. Самара и Самарская область
            </p>
          </div>
        </div>

        <section className={s.delivery__section}>
          <h2 className={s.delivery__heading}>
            Удобное время
          </h2>
          <p className={s.delivery__text}>
            Доставка доступна ежедневно с 9:00 до 19:00. При оформлении заказа
            вы можете указать удобное для вас время — мы постараемся подобрать
            интервал, который будет максимально комфортен. После оформления
            заказа наши менеджеры оперативно свяжутся с вами в рабочее время для
            его подтверждения, а также подберут самые удобные варианты доставки.
          </p>
        </section>

        <div className={s.delivery__notice}>
          <div>
            <h3 className={s.delivery__noticeTitle}>Обратите внимание</h3>
            <p className={s.delivery__noticeText}>
              Выгрузка в стоимость доставки не входит. Если нужна помощь с
              разгрузкой, её стоимость рассчитывается отдельно и зависит от
              габаритов и веса товара, а также расстояния от машины до места
              разгрузки.
            </p>
          </div>
        </div>

        <section className={s.delivery__section}>
          <h2 className={s.delivery__heading}>
            Самовывоз
          </h2>
          <p className={s.delivery__text}>
            В «Мухачаки» вы можете забрать свой заказ с нашего склада (адрес
            можно посмотреть в разделе «О нас») в удобное для вас время
            ежедневно в часы работы с 9:00 до 19:00. Самовывоз позволяет забрать
            материалы тогда, когда вам удобно.
          </p>

          <div className={s.delivery__benefits}>
            <h3 className={s.delivery__benefitsTitle}>При самовывозе вы можете:</h3>
            <ul className={s.delivery__benefitsList}>
              <li>Проверить качество и количество товаров перед оплатой</li>
              <li>Оплатить заказ наличными, картой или через QR-код прямо на месте</li>
            </ul>
          </div>

          <p className={s.delivery__text}>
            Мы подготовим ваш заказ заранее, чтобы вы могли забрать его быстро и
            без ожидания. Просто сообщите нам время приезда при оформлении
            заказа — и ваш стройматериал будет ждать вас!
          </p>
        </section>

        <div className={s.delivery__footer}>
          <p>С «Мухачаки» ваш заказ прибудет вовремя, безопасно и удобно!</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfoPage;
