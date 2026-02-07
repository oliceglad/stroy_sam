import React, { useEffect, useState } from "react";
import { useGetMainCategoriesQuery } from "../api/categories";
import { CategoryCard } from "../components/Categories/CategoriesCard";
import { CategorySkeleton } from "../components/Categories/CategorySkeleton";

const CategoriesPage = () => {
  const {
    data: mainCategories,
    error,
    isLoading,
  } = useGetMainCategoriesQuery();

  if (error) return <p>Ошибка загрузки</p>;

  return (
    <div className="categories">
      <ul className="categories__list">
        {isLoading
          ? Array(12)
              .fill(0)
              .map((_, i) => <CategorySkeleton key={i} />)
          : mainCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
