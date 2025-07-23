import React from "react";
import s from "../assets/images/1.png";
import EmptyCart from "../components/Cart/EmptyCart/EmptyCart";
import CardCart from "../components/Cart/CardCart/CardCart";
import InfoCart from "../components/Cart/InfoCart/InfoCart";

import {
  useGetCartContentsQuery,
  useRemoveItemFromCartMutation,
  usePartialUpdateItemMutation,
  useClearCartMutation,
} from "../api/cart";
import { Loader } from "../components/UI/Loader/Loader";

const CartPage = () => {
  const {
    data: cartItems = [],
    isLoading,
    isError,
    refetch,
  } = useGetCartContentsQuery();

  const [removeItemFromCart] = useRemoveItemFromCartMutation();
  const [partialUpdateItem] = usePartialUpdateItemMutation();
  const [clearCart] = useClearCartMutation();

  const handleRemoveItem = async (id) => {
    try {
      await removeItemFromCart(id).unwrap();
    } catch (error) {
      console.error("Ошибка при удалении товара из корзины", error);
    }
  };

  const handleQuantityChange = async (product_id, quantity) => {
    if (quantity < 1) return;
    try {
      await partialUpdateItem({ product_id, quantity }).unwrap();
      await refetch();
    } catch (error) {
      console.error("Ошибка при обновлении количества товара", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart().unwrap();
    } catch (error) {
      console.error("Ошибка при очистке корзины", error);
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <p>Ошибка загрузки корзины</p>;
  }

  return (
    <div className="cart">
      {cartItems === null ? (
        <EmptyCart />
      ) : (
        <>
          <h1 className="cart__title">Корзина</h1>
          <div className="cart__container">
            <div>
              {cartItems.map((item) => (
                <CardCart
                  key={item.id}
                  product={item}
                  onRemove={handleRemoveItem}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
            <InfoCart items={cartItems} onClearCart={handleClearCart}/>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
