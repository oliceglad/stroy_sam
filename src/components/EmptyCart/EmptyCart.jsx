import React from "react";
import s from "./EmptyCart.module.scss";
import { NavLink } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className={s.emptyCart}>
      <p className={s.emptyCart__info}>
        В корзине пусто <br /> перейдите в каталог, чтобы добавить нужные товары
      </p>
      <NavLink className={s.emptyCart__link} to={"/catalog"}>
        Перейти в каталог
      </NavLink>
    </div>
  );
};

export default EmptyCart;
