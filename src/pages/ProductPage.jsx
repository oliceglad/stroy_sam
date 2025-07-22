import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../api/products";
import ProductImages from "../components/Product/ProductImages/ProductImages";
import ProductInfo from "../components/Product/ProductInfo/ProductInfo";
import ProductAttributes from "../components/Product/ProductAttributes/ProductAttributes";
import { Loader } from "../components/UI/Loader/Loader";

const ProductPage = () => {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  if (isLoading)
    return (
      <div style={{ textAlign: "center" }}>
        <Loader />
      </div>
    );
  if (error || !product)
    return <div style={{ textAlign: "center" }}>Ошибка загрузки товара</div>;

  return (
    <div className="product">
      <div className="product__content">
        <ProductImages imageUrls={product.image_urls} />
        <ProductInfo
          name={product.product_name}
          description={product.description}
          price={product.price}
        />
      </div>
      <ProductAttributes attributes={product.product_attributes} />
    </div>
  );
};

export default ProductPage;
