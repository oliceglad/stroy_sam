import React, { useEffect, useState } from "react";
import { useGetMainCategoriesQuery } from "../api/categories";
import { CategoryCard } from "../components/Categories/CategoriesCard";

const CategoriesPage = () => {
  const {
    data: mainCategories,
    error,
    isLoading,
  } = useGetMainCategoriesQuery();

  if (isLoading) return <p>Загрузка категорий...</p>;
  if (error) return <p>Ошибка загрузки</p>;

  return (
    <div className="categories">
      <ul className="categories__list">
        {mainCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
