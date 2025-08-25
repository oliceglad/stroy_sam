import React from "react";
import styles from "./InfoCart.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../UI/Loader/Loader";

const InfoCart = ({
  items,
  onClearCart,
  goToDelivery,
  onCreateOrder,
  isLoading,
}) => {
  const totalPrice = items?.data.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoButton = () => {
    if (location.pathname === "/delivery") {
      onCreateOrder();
    } else {
      goToDelivery();
    }
  };

  return (
    <div className={styles.infoCart}>
      <div className={styles["infoCart__header"]}>Ваша корзина</div>
      <div className={styles["infoCart__items"]}>
        <div className={styles["infoCart__row"]}>
          <span>Товары ({items?.length})</span>
          <span>{totalPrice}₽</span>
        </div>
      </div>
      <div className={styles["infoCart__total"]}>
        <span>Итого к оплате:</span>
        <span>{totalPrice}₽</span>
      </div>
      <button
        className={styles["infoCart__checkoutButton"]}
        onClick={handleGoButton}
      >
        {isLoading ? (
          <Loader width={20} height={20}/>
        ) : location.pathname === "/delivery" ? (
          "Оформить заказ"
        ) : (
          "Перейти к оформлению"
        )}
      </button>

      {location.pathname === "/cart" ? (
        <button
          className={styles["infoCart__clearButton"]}
          onClick={onClearCart}
          type="button"
        >
          Очистить корзину
        </button>
      ) : null}
    </div>
  );
};

export default InfoCart;
