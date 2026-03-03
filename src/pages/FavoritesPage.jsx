import React from "react";
import { useGetFavoritesContentsQuery } from "../api/favorites";
import { useGetMeQuery } from "../api/user";
import ProductCard from "../components/ProductCard/ProductCard";
import FavoritesPageSkeleton from "./FavoritesPageSkeleton";
import { Loader } from "../components/UI/Loader/Loader";

const FavoritesPage = () => {
  const { data: user, isError: userError } = useGetMeQuery();
  const { data: favorites, isLoading, isError } = useGetFavoritesContentsQuery(
    undefined,
    { skip: !user || userError }
  );

  return (
    <div className="favorites">
      <h1 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}>
        Избранное
      </h1>
      
      {isLoading ? (
        <FavoritesPageSkeleton />
      ) : isError || !favorites || favorites.length === 0 ? (
        <p style={{ color: "grey" }}>Список избранного пока пуст</p>
      ) : (
        <ul className="categoryProductPage__products" style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {favorites.map((favItem) => (
            <FavoriteItemWrapper key={favItem.product_id} favItem={favItem} />
          ))}
        </ul>
      )}
    </div>
  );
};

// A sub-component to fetch the full product details (including price) for each favorite item
import { useGetProductByIdQuery } from "../api/products";

const FavoriteItemWrapper = ({ favItem }) => {
  const { data: product, isLoading } = useGetProductByIdQuery(favItem.product_id);

  if (isLoading) {
    return (
      <div style={{ width: "250px", height: "350px", background: "#f0f0f0", borderRadius: "6px" }} />
    );
  }

  // Map the product object since getProductById returns `image_urls` instead of `image_url`
  const productData = {
    ...product,
    id: favItem.product_id,
    product_name: favItem.product_name, // fallback or use product.product_name
    image_url: product?.image_urls?.[0] || favItem.image_url,
    price: product?.price || 0,
  };

  return <ProductCard product={productData} />;
};

export default FavoritesPage;
