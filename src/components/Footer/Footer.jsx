import React from "react";
import s from "./Footer.module.scss";
import { NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={s.footer}>
      <div className={s.footer__container}>
        <div className={s.footer__section}>
          <h3 onClick={() => navigate("/")}>СтройСам</h3>
          <ul className={s.footer__section__list}>
            <li className={s.footer__section__list__item}>
              <NavLink to={"/categories"}>Каталог</NavLink>
            </li>
            <li className={s.footer__section__list__item}>
              <NavLink to={"/contacts"}>Контакты</NavLink>
            </li>
            <li className={s.footer__section__list__item}>
              <NavLink to={"/profile"}>Личный кабинет</NavLink>
            </li>
          </ul>
        </div>

        {/* <div className={s.footer__newsletter}>
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
        </div> */}

        <div className={s.footer__bottom}>
          <NavLink className={s.footer__privacyPolicy}>
            Политика обработки персональных данных
          </NavLink>
          <NavLink className={s.footer__terms}>Правила продажи</NavLink>
          <NavLink className={s.footer__terms}>
            Правила применения рекомендательных технологий
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
