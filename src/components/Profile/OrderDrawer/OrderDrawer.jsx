import React, { useEffect, useState } from "react";
import {
  useGetOrderDetailQuery,
  useCancelOrderMutation,
  useReorderMutation,
} from "../../../api/orders";
import styles from "./OrderDrawer.module.scss";
import { Loader } from "../../UI/Loader/Loader";

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

const OrderDrawer = ({ orderId, orderInfo, onClose }) => {
  const { data: order, isLoading, isError } = useGetOrderDetailQuery(orderId);
  const [cancelOrder] = useCancelOrderMutation();
  const [reorder] = useReorderMutation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (orderId) {
      setVisible(true);
    }
  }, [orderId]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleCancel = () => {
    cancelOrder(orderId);
    handleClose();
  };

  const handleReorder = () => {
    reorder(orderId);
    handleClose();
  };

  if (!orderId) return null;

  return (
    <div
      className={`${styles.backdrop} ${visible ? styles.backdropVisible : ""}`}
    >
      <div
        className={`${styles.drawer} ${
          visible ? styles.slideIn : styles.slideOut
        }`}
      >
        <button className={styles.drawer__close} onClick={handleClose}>
          ×
        </button>
        {isLoading && (
          <div style={{ textAlign: "center" }}>
            <Loader />
          </div>
        )}
        {isError && (
          <div style={{ textAlign: "center" }}>Ошибка загрузки заказа</div>
        )}
        {order && (
          <>
            <h2 className={styles.drawer__title}>Заказ #{orderInfo.id}</h2>
            <div className={styles.drawer__info}>
              {new Date(orderInfo.order_date).toLocaleString()}
            </div>

            <div
              className={styles.drawer__status}
              style={
                orderInfo.order_status === "CANCELED"
                  ? {
                      borderColor: "red",
                      color: "red",
                    }
                  : orderInfo.order_status === "COMPLETED"
                  ? { borderColor: "green" }
                  : {}
              }
            >
              {statusLabels[orderInfo.order_status]}
            </div>

            <h3 className={styles.drawer__subtitle}>Товары:</h3>
            <ul className={styles.drawer__items}>
              {order.map((item) => (
                <li key={item.product_id}>
                  <div>
                    {item.product_name} <span>{item.quantity}шт.</span>
                  </div>
                  {item.price} руб.
                </li>
              ))}
            </ul>

            <div className={styles.drawer__amount}>
              <h2>Итого:</h2>
              <div>{orderInfo.total_amount} руб.</div>
            </div>

            <div className={styles.drawer__actions}>
              <button onClick={handleReorder} className={styles.drawer__button}>
                Повторить заказ
              </button>

              {orderInfo.order_status === "CANCELED" ? null : (
                <button
                  onClick={handleCancel}
                  className={styles.drawer__buttonCancel}
                >
                  Отменить заказ
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDrawer;
