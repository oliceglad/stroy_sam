import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId, subId } = useParams();

  const imageUrl = product.image_url
    ? product.image_url + "_small.jpeg"
    : "/placeholder.jpg";

  const isSearchPage = location.pathname.startsWith("/products/search");
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const link = isSearchPage
    ? `/products/search/${product.id}/?query=${encodeURIComponent(query || "")}`
    : subId
    ? `/categories/${categoryId}/${subId}/products/${product.id}`
    : `/categories/${categoryId}/products/${product.id}`;

  const handleCardClick = () => {
    navigate(link);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log("Добавлено в корзину:", product);
  };

  return (
    <li className={styles.card} onClick={handleCardClick}>
      <img src={imageUrl} alt={product.product_name} />
      <div className={styles.card__info}>
        <h3 title={product.product_name} className={styles.card__title}>
          {product.product_name}
        </h3>
        <div className={styles.card__price}>{product.price} руб.</div>
      </div>
      <button className={styles.card__button} onClick={handleAddToCart}>
        В корзину
      </button>
    </li>
  );
};

export default ProductCard;
