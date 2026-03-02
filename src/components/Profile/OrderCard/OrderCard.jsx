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

const getStatusColorClass = (status) => {
  switch (status) {
    case "CREATED": return styles.statusCreated;
    case "PROCESSING":
    case "OPERATOR_PROCESSED": return styles.statusProcessing;
    case "CONFIRMED":
    case "AWAITING_PAYMENT": return styles.statusWarning;
    case "PAID": return styles.statusPaid;
    case "COMPLETED": return styles.statusCompleted;
    case "CANCELED": return styles.statusCanceled;
    default: return "";
  }
};

const OrderCard = ({ order, onClick }) => {
  return (
    <div className={styles.orderCard} onClick={() => onClick(order.id)}>
      <div className={styles.orderCard__header}>
        <span className={styles.orderCard__id}>Заказ #{order.id}</span>
        <span className={`${styles.orderCard__status} ${getStatusColorClass(order.order_status)}`}>
          {statusLabels[order.order_status] || order.order_status}
        </span>
      </div>
      <div className={styles.orderCard__info}>
        <div className={styles.orderCard__info__date}>
          {new Date(order.order_date).toLocaleString()}
        </div>
        <div className={styles.orderCard__info__amount}>
          {order.total_amount} руб.
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
