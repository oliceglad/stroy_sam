import React, { useState } from "react";
import styles from "./CardCart.module.scss";
import { Delete } from "../../UI/Delete/Delete";

const CardCart = ({ product, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      onQuantityChange(product.product_id, newQuantity);
    }
  };

  return (
    <div className={styles.cardCart}>
      <img
        src={product.image}
        alt={product.product_name}
        className={styles.cardCart__image}
      />
      <div className={styles.cardCart__info}>
        <h3 className={styles.cardCart__name}>{product.product_name}</h3>
        <div className={styles.cardCart__price}>
          <span className={styles.cardCart__totalPrice}>{product.sum_price}₽</span>
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
        onClick={() => onRemove(product.id)}
        className={styles.cardCart__remove}
      >
        <Delete />
      </button>
    </div>
  );
};

export default CardCart;
