import React from "react";
import s from "./Footer.module.scss";
import { NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={s.footer}>
      <div className={s.footer__main}>
        <div className={s.footer__container}>
          {/* Column 1: Company Info */}
          <div className={s.footer__col}>
            <h3 className={s.footer__logo} onClick={() => navigate("/")}>Мухачаки</h3>
            <p className={s.footer__desc}>
              Ваш надежный партнер в строительстве и ремонте. Широкий ассортимент товаров, быстрая доставка и качественный сервис.
            </p>
            <div className={s.footer__contacts}>
              <p>8 927 898 80 80</p>
              <p>09:00 - 19:00, Пн-Вс</p>
              <p>Волжский район, СДТ Стремилово, 28 линия 280</p>
            </div>
          </div>

          {/* Column 2: Catalog */}
          <div className={s.footer__col}>
            <h4 className={s.footer__heading}>Каталог</h4>
            <ul className={s.footer__list}>
              <li><NavLink to="/categories/tools">Инструменты</NavLink></li>
              <li><NavLink to="/categories/materials">Стройматериалы</NavLink></li>
              <li><NavLink to="/categories/plumbing">Сантехника</NavLink></li>
              <li><NavLink to="/categories/electrical">Электрика</NavLink></li>
              <li><NavLink to="/categories/garden">Сад и огород</NavLink></li>
            </ul>
          </div>

          {/* Column 3: For Customers */}
          <div className={s.footer__col}>
            <h4 className={s.footer__heading}>Покупателям</h4>
            <ul className={s.footer__list}>
              <li><NavLink to="/delivery-info">Доставка и оплата</NavLink></li>
              <li><NavLink to="/return-policy">Возврат товара</NavLink></li>
              <li><NavLink to="/contacts">Контакты</NavLink></li>
              <li><NavLink to="/about">О компании</NavLink></li>
              <li><NavLink to="/profile">Личный кабинет</NavLink></li>
              <li><NavLink to="/cart">Корзина</NavLink></li>
            </ul>
          </div>

          {/* Column 4: Documents */}
          <div className={s.footer__col}>
            <h4 className={s.footer__heading}>Документация</h4>
            <ul className={s.footer__list}>
              <li><NavLink to="/personal-data-consent">Согласие на обработку данных</NavLink></li>
              <li><NavLink to="/data-policy">Политика конфиденциальности</NavLink></li>
              <li><NavLink to="/sales-rules">Правила продажи</NavLink></li>
              <li><NavLink to="/rec-tech-rules">Рекомендательные технологии</NavLink></li>
              <li><NavLink to="/public-offer">Публичная оферта</NavLink></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={s.footer__bottom}>
        <div className={s.footer__container}>
          <div className={s.footer__copyright}>
            © 2026 Магазин Мухачаки. Все права защищены.
          </div>
          <div className={s.footer__info}>
            Информация на сайте www.muhachaki.ru не является публичной офертой. Указанные цены действуют только при оформлении заказа через интернет-магазин.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
