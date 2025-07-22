import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";
import {
  useGetMainCategoriesQuery,
  useGetSubcategoriesQuery,
} from "../../api/categories";

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
  const { data: mainCategories } = useGetMainCategoriesQuery();

  const pathnames = location.pathname.split("/").filter(Boolean);

  const categoryId = pathnames[1];
  const subcategoryId = pathnames[2];

  const { data: subcategories } = useGetSubcategoriesQuery(categoryId, {
    skip: !categoryId,
  });

  // Получаем названия
  const categoryName = mainCategories?.find(
    (c) => String(c.id) === categoryId
  )?.category_name;

  const subcategoryName = subcategories?.find(
    (c) => String(c.id) === subcategoryId
  )?.category_name;

  // Сборка крошек
  const crumbs = [
    <Link to="/" key="home" className={styles.breadcrumbs__title}>
      Главная
    </Link>,
  ];

  if (pathnames.includes("categories")) {
    crumbs.push(
      <span key="sep1" className={styles.separator}>
        ›
      </span>,
      <Link to="/categories" key="categories">
        Все категории
      </Link>
    );
  }

  if (pathnames.includes("cart")) {
    crumbs.push(
      <span key="sep1" className={styles.separator}>
        ›
      </span>,
      <Link to="/cart" key="cart">
        Корзина
      </Link>
    );
  }

  if (categoryId && categoryName) {
    crumbs.push(
      <span key="sep2" className={styles.separator}>
        ›
      </span>,
      <Link to={`/categories/${categoryId}/products`} key="main-cat">
        {categoryName}
      </Link>
    );
  }

  if (subcategoryId && subcategoryName) {
    crumbs.push(
      <span key="sep3" className={styles.separator}>
        ›
      </span>,
      <span key="sub-cat">{subcategoryName}</span>
    );
  }

  return <div className={styles.breadcrumbs}>{crumbs}</div>;
};

export default Breadcrumbs;
