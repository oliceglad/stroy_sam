import React, { useEffect, useState } from "react";
import {
  useGetOrderDetailQuery,
  useGetOrderDeliveryInfoQuery,
  useCancelOrderMutation,
  useReorderMutation,
} from "../../../api/orders";
import styles from "./OrderDrawer.module.scss";

import DrawerDeliveryInfo from "./DrawerDeliveryInfo";

const STATUS_STEPS = [
  "CREATED",
  "PROCESSING",
  "CONFIRMED",
  "PAID",
  "COMPLETED"
];

const getStepIndex = (status) => {
  if (status === "OPERATOR_PROCESSED") return 1;
  if (status === "AWAITING_PAYMENT") return 2;
  return STATUS_STEPS.indexOf(status);
};

const OrderProgressBar = ({ status }) => {
  if (status === "CANCELED") {
    return (
      <div className={styles.progressBar}>
        <div className={styles.progressBar__canceled}>Заказ отменён</div>
      </div>
    );
  }

  const currentStep = getStepIndex(status);

  return (
    <div className={styles.progressBar}>
      {STATUS_STEPS.map((step, index) => {
        const isCompleted = index <= currentStep;
        return (
          <div
            key={step}
            className={`${styles.progressBar__step} ${
              isCompleted ? styles.progressBar__stepCompleted : ""
            }`}
          >
            <div className={styles.progressBar__indicator}></div>
            <div className={styles.progressBar__label}>
              {statusLabels[step === "CONFIRMED" && status === "AWAITING_PAYMENT" ? "AWAITING_PAYMENT" : step]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SkeletonDrawerContent = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
    <div className="skeleton" style={{ width: "200px", height: "32px" }} />
    <div className="skeleton" style={{ width: "150px", height: "16px" }} />
    <div className="skeleton" style={{ width: "100%", height: "60px", borderRadius: "10px" }} />
    <div className="skeleton" style={{ width: "80px", height: "24px" }} />
    <div className="skeleton" style={{ width: "100%", height: "40px" }} />
    <div className="skeleton" style={{ width: "100%", height: "40px" }} />
    <div className="skeleton" style={{ width: "100%", height: "100px", borderRadius: "10px" }} />
  </div>
);

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
  const { data: deliveryInfo, isLoading: isDeliveryLoading } =
    useGetOrderDeliveryInfoQuery(orderId);

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
        {isLoading ? (
          <SkeletonDrawerContent />
        ) : isError ? (
          <div style={{ textAlign: "center" }}>Ошибка загрузки заказа</div>
        ) : order ? (
          <>
            <h2 className={styles.drawer__title}>Заказ #{orderInfo.id}</h2>
            <div className={styles.drawer__info}>
              {new Date(orderInfo.order_date).toLocaleString()}
            </div>

            <OrderProgressBar status={orderInfo.order_status} />

            <h3 className={styles.drawer__subtitle}>Товары:</h3>
            <ul className={styles.drawer__items}>
              {order.map((item) => (
                <li key={item.product_id}>
                  <div>
                    {item.product_name} <span>{item.quantity}шт.</span>
                  </div>
                  <div className={styles.drawer__items__price}>
                    {item.price} руб.
                  </div>
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

            <DrawerDeliveryInfo
              deliveryInfo={deliveryInfo}
              isLoading={isDeliveryLoading}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default OrderDrawer;
