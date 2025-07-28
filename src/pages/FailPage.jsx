import React from "react";
import FailIcon from "../components/UI/Failicon/FailIcon";

const FailPage = () => {
  return (
    <div className="statePage">
      <div className="statePage__container">
        <div className="statePage__icon">
          <FailIcon />
        </div>
        <h1 className="statePage__title">Страница не найдена</h1>
        <p className="statePage__subtitle">
          Что-то пошло не так. Похоже, что ваш запрос не найден.
        </p>
      </div>
    </div>
  );
};

export default FailPage;
