import React from "react";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {
  const imageUrl = product.image_url
    ? product.image_url + "_small.jpeg"
    : "/placeholder.jpg";

  const handleAddToCart = () => {
    console.log("Добавлено в корзину:", product);
  };

  return (
    <li className={styles.card}>
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
