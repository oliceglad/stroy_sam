import React from "react";
import SuccessIcon from "../components/UI/Success/SuccessIcon";

const SuccessPage = () => {
  return (
    <div className="statePage">
      <div className="statePage__container">
        <div className="statePage__icon">
          <SuccessIcon />
        </div>
        <h1 className="statePage__title">Ваш заказ успешно оформлен</h1>
        <p className="statePage__subtitle">
          Слава богу у Вас было достаточно денег, иначе нам бы пришлось вызывать
          коллекторов :/
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
