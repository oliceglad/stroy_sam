import React from "react";
import { useLocation } from "react-router-dom";
import SuccessIcon from "../components/UI/Success/SuccessIcon";

const SuccessPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  return (
    <div className="statePage">
      <div className="statePage__container">
        <div className="statePage__icon">
          <SuccessIcon />
        </div>
        <h1 className="statePage__title">
          Ваш заказ {orderId ? `№${orderId} ` : ""}успешно оформлен
        </h1>
        <p className="statePage__subtitle">
          Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время для
          уточнения деталей доставки.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
