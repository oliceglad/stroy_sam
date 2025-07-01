import React from "react";
import s from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footer__container}>
        <div className={s.footer__section}>
          <h2 className={s.footer__section__title}>Покупателям</h2>
          <ul className={s.footer__section__list}>
            <li className={s.footer__section__list__item}>Каталог</li>
            <li className={s.footer__section__list__item}>Комнаты</li>
            <li className={s.footer__section__list__item}>Услуги</li>
            <li className={s.footer__section__list__item}>Кредит</li>
            <li className={s.footer__section__list__item}>
              Программы лояльности
            </li>
            <li className={s.footer__section__list__item}>
              Доставка и самовывоз
            </li>
            <li className={s.footer__section__list__item}>Возврат товара</li>
            <li className={s.footer__section__list__item}>Вопросы и ответы</li>
            <li className={s.footer__section__list__item}>Подарочная карта</li>
            <li className={s.footer__section__list__item}>Советы</li>
            <li className={s.footer__section__list__item}>
              Клиентская поддержка
            </li>
          </ul>
        </div>

        <div className={s.footer__section}>
          <h2 className={s.footer__section__title}>Компания</h2>
          <ul className={s.footer__section__list}>
            <li className={s.footer__section__list__item}>Наши вакансии</li>
            <li className={s.footer__section__list__item}>Бренды</li>
            <li className={s.footer__section__list__item}>Наша компания</li>
            <li className={s.footer__section__list__item}>
              Устойчивое развитие
            </li>
            <li className={s.footer__section__list__item}>Магазины</li>
            <li className={s.footer__section__list__item}>Контакты</li>
          </ul>
        </div>

        <div className={s.footer__newsletter}>
          <h2 className={s.footer__newsletter__title}>
            Будьте в курсе новостей
          </h2>
          <form className={s.footer__form}>
            <input
              type="email"
              className={s.footer__input}
              placeholder="Адрес почты"
            />
            <button type="submit" className={s.footer__button}>
              Подписаться
            </button>
          </form>
          <p className={s.footer__privacy}>
            Подписываясь на рассылку, я даю согласие на обработку персональных
            данных
          </p>
        </div>
      </div>

      <div className={s.footer__bottom}>
        <p className={s.footer__privacyPolicy}>
          Политика обработки персональных данных
        </p>
        <p className={s.footer__terms}>Правила продажи</p>
        <p className={s.footer__terms}>
          Правила применения рекомендательных технологий
        </p>
      </div>
    </footer>
  );
};

export default Footer;
