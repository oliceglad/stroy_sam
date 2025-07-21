// components/Breadcrumbs.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";

const pathNameMap = {
  "": "Главная",
  categories: "Все категории",
  cart: "Корзина",
  delivery: "Доставка",
  success: "Заказ оформлен",
  login: "Авторизация",
  register: "Регистрация",
  verification: "Подтверждение",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const crumbs = pathnames.map((segment, index) => {
    const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
    const name = pathNameMap[segment] || decodeURIComponent(segment);
    return (
      <span key={routeTo}>
        <Link to={routeTo}>{name}</Link>
        {index < pathnames.length - 1 && (
          <span className={styles.separator}>›</span>
        )}
      </span>
    );
  });

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__title}>Главная</Link>
      {crumbs.length > 0 && <span className={styles.separator}>›</span>}
      {crumbs}
    </div>
  );
};

export default Breadcrumbs;
