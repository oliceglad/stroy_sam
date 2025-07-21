import React from "react";
import { useParams } from "react-router-dom";
import { useGetSubcategoriesQuery } from "../api/categories";
import { Link } from "react-router-dom";

const CategoryDetailsPage = () => {
  const { categoryId } = useParams();
  const {
    data: subcategories,
    isLoading,
    error,
  } = useGetSubcategoriesQuery(categoryId);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки подкатегорий</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Подкатегории</h1>
      {subcategories && subcategories.length > 0 ? (
        <ul>
          {subcategories.map((sub) => (
            <li key={sub.id}>
              <Link to={`/categories/${categoryId}/${sub.id}`}>
                {sub.category_name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет подкатегорий</p>
      )}
    </div>
  );
};

export default CategoryDetailsPage;
