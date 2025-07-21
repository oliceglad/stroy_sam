import React from "react";
import styles from "./InfoCart.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

const InfoCart = ({ items }) => {
  const totalPrice = items?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoButton = () => {
    if (location.pathname == "/delivery") {
      navigate("/success");
    } else {
      navigate("/delivery");
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
        onClick={() => handleGoButton()}
      >
        {location.pathname == "/delivery"
          ? "Оформить заказ"
          : "Перейти к оформлению"}
      </button>
    </div>
  );
};

export default InfoCart;
