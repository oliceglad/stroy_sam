import { useLocation, Link } from "react-router-dom";
import {
  useGetMainCategoriesQuery,
  useGetSubcategoriesQuery,
} from "../../api/categories";
import { useGetProductByIdQuery } from "../../api/products";
import styles from "./Breadcrumbs.module.scss";

const Breadcrumbs = () => {
  const location = useLocation();
  const { data: mainCategories } = useGetMainCategoriesQuery();

  const pathnames = location.pathname.split("/").filter(Boolean);
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const isSearchList =
    pathnames[0] === "products" &&
    pathnames[1] === "search" &&
    pathnames.length === 2;

  const isProductPageViaSearch =
    pathnames[0] === "products" &&
    pathnames[1] === "search" &&
    pathnames.length === 3;

  const isProductPageViaCategory =
    pathnames.includes("categories") &&
    pathnames[pathnames.length - 2] === "products";

  let productId = null;
  if (isProductPageViaCategory) {
    productId = pathnames[pathnames.length - 1];
  } else if (isProductPageViaSearch) {
    productId = pathnames[2];
  }

  const categoryId = pathnames[1];
  const subcategoryId = pathnames[2] === "products" ? null : pathnames[2];

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

  if (isSearchList) {
    crumbs.push(
      <span key="sep4" className={styles.separator}>
        ›
      </span>,
      <span key="search">{query || "Поиск"}</span>
    );
  }

  if (isProductPageViaSearch) {
    crumbs.push(
      <span key="sep4" className={styles.separator}>
        ›
      </span>,
      <Link
        to={`/products/search${
          query ? `?query=${encodeURIComponent(query)}` : ""
        }`}
        key="search-link"
      >
        {query || "Поиск"}
      </Link>
    );
  }

  if (
    (isProductPageViaCategory || isProductPageViaSearch) &&
    productId &&
    product?.product_name
  ) {
    crumbs.push(
      <span key="sep5" className={styles.separator}>
        ›
      </span>,
      <span key="product">{product.product_name}</span>
    );
  }

  if (location.pathname === "/cart") {
    crumbs.push(
      <span key="sep-cart" className={styles.separator}>
        ›
      </span>,
      <span key="cart">Корзина</span>
    );
  }

  if (location.pathname === "/profile") {
    crumbs.push(
      <span key="sep-cart" className={styles.separator}>
        ›
      </span>,
      <span key="cart">Профиль</span>
    );
  }

  return <div className={styles.breadcrumbs}>{crumbs}</div>;
};

export default Breadcrumbs;
