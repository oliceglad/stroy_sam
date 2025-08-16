import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useGetCategoriesTreeQuery } from "../../api/categories";
import { useGetProductByIdQuery } from "../../api/products";
import styles from "./Breadcrumbs.module.scss";

function findCategoryPath(tree, targetId, path = []) {
  for (let node of tree) {
    if (String(node.id) === String(targetId)) {
      return [...path, node];
    }
    if (node.children?.length) {
      const res = findCategoryPath(node.children, targetId, [...path, node]);
      if (res) return res;
    }
  }
  return null;
}

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const { data: categoriesTree } = useGetCategoriesTreeQuery();

  const isProductPage =
    (pathnames.includes("categories") &&
      pathnames[pathnames.length - 2] === "products") ||
    (pathnames[0] === "products" &&
      pathnames[1] === "search" &&
      pathnames.length === 3);

  const productId = isProductPage ? pathnames[pathnames.length - 1] : null;

  const { data: product } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  const categoryId =
    pathnames[0] === "categories" ? pathnames[1] : null;
  const subcategoryId =
    pathnames[0] === "categories" &&
    pathnames.includes("products") &&
    pathnames.length > 2
      ? pathnames[pathnames.length - 2]
      : null;

  let categoryPath = [];
  if (categoriesTree && categoryId) {
    categoryPath = findCategoryPath(categoriesTree, subcategoryId || categoryId) || [];
  }

  const crumbs = [
    <Link to="/" key="home" className={styles.breadcrumbs__title}>
      Главная
    </Link>,
  ];

  if (pathnames.includes("categories")) {
    crumbs.push(
      <span key="sep-cat" className={styles.separator}>›</span>,
      <Link to="/categories" key="all-cats">Все категории</Link>
    );
  }

  if (categoryPath.length > 0) {
    categoryPath.forEach((cat, idx) => {
      crumbs.push(
        <span key={`sep-${cat.id}`} className={styles.separator}>›</span>,
        <Link
          key={`cat-${cat.id}`}
          to={
            idx === categoryPath.length - 1 && !cat.children?.length
              ? `/categories/${cat.id}/products`
              : `/categories/${cat.id}`
          }
        >
          {cat.category_name}
        </Link>
      );
    });
  }

  if (pathnames[0] === "products" && pathnames[1] === "search") {
    if (pathnames.length === 2) {
      crumbs.push(
        <span key="sep-search" className={styles.separator}>›</span>,
        <span key="search">{query || "Поиск"}</span>
      );
    } else if (pathnames.length === 3) {
      crumbs.push(
        <span key="sep-search" className={styles.separator}>›</span>,
        <Link
          to={`/products/search${query ? `?query=${encodeURIComponent(query)}` : ""}`}
          key="search-link"
        >
          {query || "Поиск"}
        </Link>
      );
    }
  }

  if (isProductPage && product?.product_name) {
    crumbs.push(
      <span key="sep-product" className={styles.separator}>›</span>,
      <span key="product">{product.product_name}</span>
    );
  }

  if (location.pathname === "/cart") {
    crumbs.push(
      <span key="sep-cart" className={styles.separator}>›</span>,
      <span key="cart">Корзина</span>
    );
  }

  if (location.pathname === "/profile") {
    crumbs.push(
      <span key="sep-prof" className={styles.separator}>›</span>,
      <span key="prof">Профиль</span>
    );
  }

  if (location.pathname === "/delivery") {
    crumbs.push(
      <span key="sep-delivery" className={styles.separator}>›</span>,
      <span key="delivery">Оформление доставки</span>
    );
  }

  return <div className={styles.breadcrumbs}>{crumbs}</div>;
};

export default Breadcrumbs;
