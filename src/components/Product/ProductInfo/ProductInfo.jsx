import React from "react";
import styles from "./ProductInfo.module.scss";

const ProductInfo = ({ name, description, price }) => {
  const handleAddToCart = () => {
    console.log(`Добавлено в корзину: ${name}`);
  };
  return (
    <div className={styles.info}>
      <div>
        <h1 className={styles.info__title}>{name}</h1>
        <p className={styles.info__desc}>{description}</p>
      </div>
      <div>
        <div className={styles.info__price}>{price} руб.</div>
        <button className={styles.info__button} onClick={handleAddToCart}>
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
