import React, { useState } from "react";
import CardCart from "../components/CardCart/CardCart";
import EmptyCart from "../components/EmptyCart/EmptyCart";
import s from "../assets/images/1.png";
import InfoCart from "../components/InfoCart/InfoCart";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "2 раза посидел - 1 постоял",
      price: 1192,
      quantity: 1,
      image: s,
    },
    {
      id: 2,
      name: "2 раза посидел - 1 постоял",
      price: 1192,
      quantity: 1,
      image: s,
    },
    {
      id: 3,
      name: "2 раза посидел - 1 постоял",
      price: 1192,
      quantity: 1,
      image: s,
    },
  ]);

  // Функция удаления товара из корзины
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Функция обновления количества товара в корзине
  const updateItemQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <div className="cart">
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div>
          <h1 className="cart__title">Корзина</h1>
          <div className="cart__container">
            <div>
              {cartItems.map((item) => (
                <CardCart
                  key={item.id}
                  product={item}
                  onRemove={removeItem}
                  onQuantityChange={updateItemQuantity} // передаем функцию изменения количества
                />
              ))}
            </div>
            <InfoCart items={cartItems} /> {/* Обновленные данные корзины */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
