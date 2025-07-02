import React, { useState } from "react";
import styles from "./CardCart.module.scss";

const CardCart = ({ product, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      onQuantityChange(product.id, newQuantity); // Обновление количества товара в родительском компоненте
    }
  };

  const totalPrice = quantity * product.price;

  return (
    <div className={styles.cardCart}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.cardCart__image}
      />
      <div className={styles.cardCart__info}>
        <h3 className={styles.cardCart__name}>{product.name}</h3>
        <div className={styles.cardCart__price}>
          <span className={styles.cardCart__totalPrice}>{totalPrice}₽</span>
        </div>
      </div>
      <div className={styles.cardCart__quantity}>
        <button
          onClick={() => handleQuantityChange(-1)}
          disabled={quantity <= 1}
          className={styles.cardCart__quantityButton}
        >
          -
        </button>
        <span className={styles.cardCart__quantityNumber}>{quantity}</span>
        <button
          onClick={() => handleQuantityChange(1)}
          className={styles.cardCart__quantityButton}
        >
          +
        </button>
      </div>
      <button
        onClick={() => onRemove(product.id)} // Удаление товара
        className={styles.cardCart__remove}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.06471 8.55289V18.9289C6.06471 21.2211 7.92291 23.0793 10.2151 23.0793H16.4407C18.7329 23.0793 20.5911 21.2211 20.5911 18.9289V8.55289M15.4031 11.6657V17.8913M11.2527 11.6657L11.2527 17.8913M17.4783 5.44008L16.0192 3.25136C15.6343 2.67404 14.9864 2.32727 14.2925 2.32727H12.3633C11.6695 2.32727 11.0215 2.67404 10.6367 3.25136L9.17752 5.44008M17.4783 5.44008H9.17752M17.4783 5.44008H22.6664M9.17752 5.44008H3.9895"
            stroke="#7B7B7B"
            stroke-width="1.5564"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default CardCart;
