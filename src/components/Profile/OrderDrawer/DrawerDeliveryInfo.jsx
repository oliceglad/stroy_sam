import React from "react";
import { Loader } from "../../UI/Loader/Loader";
import styles from "./OrderDrawer.module.scss";

const DrawerDeliveryInfo = ({ deliveryInfo, isLoading }) => {
  return (
    <div className={styles.delivery}>
      <h3 className={styles.delivery__title}>Информация о доставке</h3>
      {isLoading && <Loader />}
      {deliveryInfo ? (
        <ul className={styles.delivery__list}>
          <li>
            <span className={styles.delivery__label}>Страна:</span>{" "}
            {deliveryInfo.country}
          </li>
          <li>
            <span className={styles.delivery__label}>Город:</span>{" "}
            {deliveryInfo.city}
          </li>
          <li>
            <span className={styles.delivery__label}>Адрес:</span>{" "}
            {deliveryInfo.address}
          </li>
          <li>
            <span className={styles.delivery__label}>Получатель:</span>{" "}
            {deliveryInfo.recipient_name}
          </li>
          <li>
            <span className={styles.delivery__label}>Телефон:</span>{" "}
            {deliveryInfo.phone_primary}
          </li>
          {deliveryInfo.phone_secondary && (
            <li>
              <span className={styles.delivery__label}>Доп. телефон:</span>{" "}
              {deliveryInfo.phone_secondary}
            </li>
          )}
          {deliveryInfo.desired_delivery_at && (
            <li>
              <span className={styles.delivery__label}>Желаемая дата:</span>{" "}
              {new Date(deliveryInfo.desired_delivery_at).toLocaleDateString()}
            </li>
          )}
          {deliveryInfo.extra_info && (
            <li>
              <span className={styles.delivery__label}>Комментарий:</span>{" "}
              {deliveryInfo.extra_info}
            </li>
          )}
        </ul>
      ) : (
        !isLoading && <p className={styles.delivery__empty}>Нет информации</p>
      )}
    </div>
  );
};

export default DrawerDeliveryInfo;
