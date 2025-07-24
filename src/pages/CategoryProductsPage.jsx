import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductsByCategoryIdQuery } from "../api/products";
import { useGetSubcategoriesQuery } from "../api/categories";

import SubCategoriesList from "../components/SubCategoriesList/SubCategoriesList";
import ProductCard from "../components/ProductCard/ProductCard";
import { Loader } from "../components/UI/Loader/Loader";

const CategoryProductsPage = () => {
  const { categoryId, subId } = useParams();
  const navigate = useNavigate();

  const activeCategoryId = subId || categoryId;

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsByCategoryIdQuery(activeCategoryId);

  const { data: subcategories } = useGetSubcategoriesQuery(categoryId);

  const handleSubcategoryClick = (sub) => {
    navigate(`/categories/${categoryId}/${sub.id}/products`);
  };

  return (
    <div className="categoryProductPage">
      <SubCategoriesList
        subcategories={subcategories}
        subId={subId}
        onSelect={handleSubcategoryClick}
      />

      {isLoading && (
        <div style={{ textAlign: "center" }}>
          <Loader />
        </div>
      )}

      {products?.length > 0 ? (
        <ul className="categoryProductPage__products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        !isLoading && <p className="categoryProductPage__notfound">Товаров не найдено</p>
      )}
    </div>
  );
};

export default CategoryProductsPage;
