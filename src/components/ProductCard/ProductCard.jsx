import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./ProductCard.module.scss";

import {
  useAddItemToCartMutation,
  usePartialUpdateItemMutation,
  useRemoveItemFromCartMutation,
  useGetCartContentsQuery,
} from "../../api/cart";
import { useGetMeQuery } from "../../api/user";
import { Delete } from "../UI/Delete/Delete";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId, subId } = useParams();

  const { data: cart, refetch, isError: cartError } = useGetCartContentsQuery();
  const { data: user, isError: userError } = useGetMeQuery();
  const [addItemToCart] = useAddItemToCartMutation();
  const [partialUpdateItem] = usePartialUpdateItemMutation();
  const [removeItemFromCart] = useRemoveItemFromCartMutation();

  const accessToken = Cookies.get("access");

  const cartItem = cart?.data.find((i) => i.product_id === product.id);
  const quantity = cartItem?.quantity || 0;
  const cartItemId = cartItem?.product_id || null;
  const deleteItemId = cartItem?.id || null;

  const imageUrl = product.image_url
    ? product.image_url + "_small.jpeg"
    : "/placeholder.jpg";

  const isSearchPage = location.pathname.startsWith("/products/search");
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const link = isSearchPage
    ? `/products/search/${product.id}/?query=${encodeURIComponent(query || "")}`
    : subId
    ? `/categories/${categoryId}/${subId}/products/${product.id}`
    : `/categories/${categoryId}/products/${product.id}`;

  const handleCardClick = () => {
    navigate(link);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!user || userError) return;
    if (!cart || cartError) {
      alert("Невозможно добавить в корзину");
    }

    try {
      if (quantity > 0 && cartItemId) {
        await partialUpdateItem({
          product_id: cartItemId,
          quantity: quantity + 1,
        });
      } else {
        await addItemToCart({ product_id: product.id, quantity: 1 });
      }
      await refetch();
    } catch (err) {
      console.error("Ошибка добавления в корзину:", err);
    }
  };

  const handleDecreaseQuantity = async (e) => {
    e.stopPropagation();
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

  const handleRemoveFromCart = async (e) => {
    e.stopPropagation();
    if (!cartItemId) return;

    try {
      await removeItemFromCart(deleteItemId);
      await refetch();
    } catch (err) {
      console.error("Ошибка удаления из корзины:", err);
    }
  };

  const isAuthorized = Boolean(user && !userError);

  return (
    <li className={styles.card} onClick={handleCardClick}>
      <img src={imageUrl} alt={product.product_name} />

      <div className={styles.card__info}>
        <h3 className={styles.card__title} title={product.product_name}>
          {product.product_name}
        </h3>
        <div className={styles.card__price}>{product.price} руб.</div>
        {quantity > 0 ? (
          <div className={styles.card__quantityWrapper}>
            <div className={styles.card__quantity}>
              <button
                className={styles.card__quantityButton}
                onClick={handleDecreaseQuantity}
                type="button"
              >
                −
              </button>
              <span className={styles.card__quantityCount}>{quantity}</span>
              <button
                className={styles.card__quantityButton}
                onClick={handleAddToCart}
                type="button"
              >
                +
              </button>
            </div>

            <button
              className={styles.card__remove}
              onClick={handleRemoveFromCart}
              type="button"
              title="Удалить из корзины"
            >
              <Delete />
            </button>
          </div>
        ) : (
          <button
            className={styles.card__button}
            onClick={handleAddToCart}
            type="button"
            disabled={!isAuthorized}
            title={
              isAuthorized
                ? "Добавить в корзину"
                : "Чтобы добавить товар в корзину, авторизуйтесь"
            }
          >
            Добавить в корзину
          </button>
        )}
      </div>
    </li>
  );
};

export default ProductCard;
