import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";
import {
  useGetMainCategoriesQuery,
  useGetSubcategoriesQuery,
} from "../../api/categories";
import { useGetProductByIdQuery } from "../../api/products";

const Breadcrumbs = () => {
  const location = useLocation();
  const { data: mainCategories } = useGetMainCategoriesQuery();

  const pathnames = location.pathname.split("/").filter(Boolean);

  const categoryId = pathnames[1];
  const subcategoryId = pathnames[2] === "products" ? null : pathnames[2];
  const productId = pathnames.includes("products")
    ? pathnames[pathnames.indexOf("products") + 1]
    : null;

  const { data: subcategories } = useGetSubcategoriesQuery(categoryId, {
    skip: !categoryId,
  });

  const { data: product } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  const categoryName = mainCategories?.find(
    (c) => String(c.id) === categoryId
  )?.category_name;

  const subcategoryName = subcategories?.find(
    (c) => String(c.id) === subcategoryId
  )?.category_name;

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
      <Link
        to={`/categories/${categoryId}/${subcategoryId}/products`}
        key="sub-cat"
      >
        {subcategoryName}
      </Link>
    );
  }

  if (productId && product?.product_name) {
    crumbs.push(
      <span key="sep4" className={styles.separator}>
        ›
      </span>,
      <span key="product">{product.product_name}</span>
    );
  }

  return <div className={styles.breadcrumbs}>{crumbs}</div>;
};

export default Breadcrumbs;
