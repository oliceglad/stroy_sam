import React from "react";
import styles from "./OrderCard.module.scss";

const statusLabels = {
  CREATED: "Создан",
  PROCESSING: "В обработке",
  OPERATOR_PROCESSED: "Обработан оператором",
  CONFIRMED: "Подтверждён",
  AWAITING_PAYMENT: "Ожидает оплаты",
  PAID: "Оплачен",
  COMPLETED: "Выполнен",
  CANCELED: "Отменён",
};

const OrderCard = ({ order }) => {
  return (
    <div className={styles.orderCard}>
      <div className={styles.orderCard__header}>
        <span className={styles.orderCard__id}>Заказ #{order.id}</span>
        <span className={styles.orderCard__status}>
          {statusLabels[order.order_status] || order.order_status}
        </span>
      </div>
      <div className={styles.orderCard__info}>
        <div className={styles.orderCard__info__date}>{new Date(order.order_date).toLocaleString()}</div>
        <div className={styles.orderCard__info__amount}>{order.total_amount} руб.</div>
      </div>
    </div>
  );
};

export default OrderCard;
