import React from "react";
import { useParams } from "react-router-dom";
import { useGetSubcategoriesQuery } from "../api/categories";
import { CategoryCard } from "../components/Categories/CategoriesCard";
import { Loader } from "../components/UI/Loader/Loader";

const SubCategoriesPage = () => {
  const { categoryId } = useParams();

  const {
    data: subCategories,
    error,
    isLoading,
  } = useGetSubcategoriesQuery(categoryId);

  if (isLoading)
    return (
      <div style={{ textAlign: "center" }}>
        <Loader />
      </div>
    );

  if (error) return <p>Ошибка загрузки</p>;

  return (
    <div className="categories">
      <ul className="categories__list">
        {subCategories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </ul>
    </div>
  );
};

export default SubCategoriesPage;
