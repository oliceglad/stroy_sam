import React from "react";
import styles from "./CartControls.module.scss";
import { Delete } from "../Delete/Delete";

const CartControls = ({
  quantity,
  onAdd,
  onDecrease,
  onRemove,
  isAuthorized,
}) => {
  return (
    <div className={styles.wrapper}>
      {quantity > 0 ? (
        <div className={styles.quantityWrapper}>
          <div className={styles.quantity}>
            <button
              className={styles.quantityButton}
              onClick={onDecrease}
              type="button"
            >
              −
            </button>
            <span className={styles.quantityCount}>{quantity}</span>
            <button
              className={styles.quantityButton}
              onClick={onAdd}
              type="button"
            >
              +
            </button>
          </div>

          <button
            className={styles.remove}
            onClick={onRemove}
            type="button"
            title="Удалить из корзины"
          >
            <Delete />
          </button>
        </div>
      ) : (
        <button
          className={styles.button}
          onClick={onAdd}
          type="button"
          disabled={!isAuthorized}
          title={
            isAuthorized
              ? "Добавить в корзину"
              : "Чтобы добавить товар в корзину, авторизуйтесь"
          }
        >
          Добавить в корзину
        </button>
      )}
    </div>
  );
};

export default CartControls;
