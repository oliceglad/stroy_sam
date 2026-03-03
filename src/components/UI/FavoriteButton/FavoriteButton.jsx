import React from "react";
import Cookies from "js-cookie";
import styles from "./FavoriteButton.module.scss";
import {
  useGetFavoritesContentsQuery,
  useAddItemToFavoritesMutation,
  useRemoveItemFromFavoritesMutation,
} from "../../../api/favorites";
import { useGetMeQuery } from "../../../api/user";

const FavoriteButton = ({ product, className }) => {
  const { data: user, isError: userError } = useGetMeQuery();
  const { data: favorites, isError: favoritesError } = useGetFavoritesContentsQuery(
    undefined,
    { skip: !user || userError } // Only fetch if user is logged in
  );

  const [addItemToFavorites] = useAddItemToFavoritesMutation();
  const [removeItemFromFavorites] = useRemoveItemFromFavoritesMutation();

  const isAuthorized = Boolean(user && !userError);
  
  // Find if this product is in favorites
  const favoriteItem =
    favorites && Array.isArray(favorites)
      ? favorites.find((i) => i.product_id === product.id)
      : null;

  const isFavorite = Boolean(favoriteItem);

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuthorized) {
      alert("Для добавления в избранное необходимо авторизоваться.");
      return;
    }

    try {
      if (isFavorite && favoriteItem?.id) {
        await removeItemFromFavorites(favoriteItem.id);
      } else {
        await addItemToFavorites({ product_id: product.id });
      }
    } catch (err) {
      console.error("Ошибка при изменении избранного:", err);
    }
  };

  return (
    <button
      className={`${styles.button} ${className || ""}`}
      onClick={(e) => handleToggleFavorite(e)}
      title={isFavorite ? "Удалить из избранного" : "В избранное"}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill={isFavorite ? "#FB4E4E" : "none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
          stroke={isFavorite ? "#FB4E4E" : "#999999"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;
