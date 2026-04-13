import React from "react";
import styles from "./InfoCart.module.scss";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";


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

  const [consentChecked, setConsentChecked] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);

  const handleGoButton = () => {
    if (location.pathname === "/delivery") {
      if (!consentChecked) {
        setShowConsentError(true);
        return;
      }
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
          <span>Товары ({items?.data.length})</span>
          <span>{totalPrice}₽</span>
        </div>
      </div>
      <div className={styles["infoCart__total"]}>
        <span>Итого к оплате:</span>
        <span>{totalPrice}₽</span>
      </div>

      {location.pathname === "/delivery" && (
        <div style={{marginTop: '20px', marginBottom: '10px'}}>
          <label style={{display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '12px', lineHeight: '1.4', cursor: 'pointer', textAlign: 'left'}}>
            <input 
              type="checkbox" 
              checked={consentChecked} 
              onChange={(e) => {
                setConsentChecked(e.target.checked);
                setShowConsentError(false);
              }} 
              style={{marginTop: '2px'}}
            />
            <span style={{color: '#555'}}>
              Я даю <Link to="/personal-data-consent" style={{color: '#007bff', textDecoration: 'underline'}}>согласие на обработку персональных данных</Link> и подтверждаю ознакомление с <Link to="/data-policy" style={{color: '#007bff', textDecoration: 'underline'}}>Политикой обработки персональных данных</Link>
            </span>
          </label>
          {showConsentError && <div style={{color: 'red', fontSize: '12px', marginTop: '5px', textAlign: 'left'}}>Необходимо подтвердить согласие с Политикой</div>}
        </div>
      )}

      <div className={styles.infoCart__buttons}>
        <button
          className={styles["infoCart__checkoutButton"]}
          onClick={handleGoButton}
        >
          {isLoading ? (
            <span>Подождите...</span>
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
    </div>
  );
};

export default InfoCart;
