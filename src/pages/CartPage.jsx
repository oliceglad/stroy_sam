import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart/EmptyCart";
import CardCart from "../components/Cart/CardCart/CardCart";
import InfoCart from "../components/Cart/InfoCart/InfoCart";
import { Loader } from "../components/UI/Loader/Loader";

import {
  useGetCartContentsQuery,
  useRemoveItemFromCartMutation,
  usePartialUpdateItemMutation,
  useClearCartMutation,
} from "../api/cart";

const CartPage = () => {
  const navigate = useNavigate();

  const {
    data: cartItems = [],
    isLoading,
    error,
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

  const handleGoToDelivery = () => {
    navigate("/delivery", { state: { cartItems } });
  };

  useEffect(() => {
    if (error?.status === 401) {
      navigate("/login");
      window.location.reload();
    }
  }, [error, navigate]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loader />
      </div>
    );
  }
  if (isError && error?.status === 500) {
    return <p style={{textAlign: "center"}}>Ошибка загрузки корзины</p>;
  }

  return (
    <div className="cart">
      {cartItems.data === null || cartItems.data.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <h1 className="cart__title">Корзина</h1>
          <div className="cart__container">
            <div>
              {cartItems.data.map((item) => (
                <CardCart
                  key={item.id}
                  product={item}
                  onRemove={handleRemoveItem}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
            <InfoCart
              items={cartItems}
              onClearCart={handleClearCart}
              goToDelivery={handleGoToDelivery}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
