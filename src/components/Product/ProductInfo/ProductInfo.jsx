import React from "react";
import styles from "./ProductInfo.module.scss";

import {
  useAddItemToCartMutation,
  usePartialUpdateItemMutation,
  useRemoveItemFromCartMutation,
  useGetCartContentsQuery,
} from "../../../api/cart";
import { useGetMeQuery } from "../../../api/user";
import CartControls from "../../UI/CartControls/CartControls";

const ProductInfo = ({ product }) => {
  if (!product) return null;

  const { id: productId, product_name, price, description } = product;

  const { data: cartData, refetch } = useGetCartContentsQuery();
  const { data: user, isError: userError } = useGetMeQuery();

  const [addItemToCart] = useAddItemToCartMutation();
  const [partialUpdateItem] = usePartialUpdateItemMutation();
  const [removeItemFromCart] = useRemoveItemFromCartMutation();

  const isAuthorized = Boolean(user && !userError);

  const cartItem =
    cartData?.data != null && cartData.data.find((i) => i.product_id === productId);
  const quantity = cartItem?.quantity || 0;
  const cartItemId = cartItem?.product_id || null;
  const deleteItemId = cartItem?.id || null;

  const handleAddToCart = async () => {
    if (!isAuthorized) return;

    try {
      if (quantity > 0 && cartItemId) {
        await partialUpdateItem({
          product_id: cartItemId,
          quantity: quantity + 1,
        });
      } else {
        await addItemToCart({ product_id: productId, quantity: 1 });
      }
      await refetch();
    } catch (err) {
      console.error("Ошибка добавления в корзину:", err);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (!cartItemId || quantity <= 0) return;

    try {
      if (quantity === 1) {
        await removeItemFromCart(deleteItemId);
      } else {
        await partialUpdateItem({
          product_id: cartItemId,
          quantity: quantity - 1,
        });
      }
      await refetch();
    } catch (err) {
      console.error("Ошибка уменьшения количества:", err);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!cartItemId) return;

    try {
      await removeItemFromCart(deleteItemId);
      await refetch();
    } catch (err) {
      console.error("Ошибка удаления из корзины:", err);
    }
  };

  return (
    <div className={styles.info}>
      <div>
        <h1 className={styles.info__title}>{product_name}</h1>
        <p className={styles.info__desc}>{description}</p>
      </div>
      <div>
        <div className={styles.info__price}>{price} руб.</div>
        <CartControls
          quantity={quantity}
          onAdd={handleAddToCart}
          onDecrease={handleDecreaseQuantity}
          onRemove={handleRemoveFromCart}
          isAuthorized={isAuthorized}
        />
      </div>
    </div>
  );
};

export default ProductInfo;
