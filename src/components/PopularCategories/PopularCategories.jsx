import React from "react";
import { useGetMainCategoriesQuery } from "../../api/categories";
import styles from "./PopularCategories.module.scss";
import { CategoryCard } from "../Categories/CategoriesCard";
import { useNavigate } from "react-router-dom";
import { CategorySkeleton } from "../Categories/CategorySkeleton";

const PopularCategories = () => {
  const { data: categories, isLoading } = useGetMainCategoriesQuery();
  const navigate = useNavigate();

  return (
    <div className={styles.popularCategories}>
      <h2 className={styles.popularCategories__title}>
        Популярные категории <span onClick={() => navigate("/categories")}>Все категории</span>
      </h2>
      <div className={styles.popularCategories__list}>
        {isLoading
          ? Array(7)
              .fill(0)
              .map((_, i) => <CategorySkeleton key={i} />)
          : categories?.slice(0, 7).map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
      </div>
    </div>
  );
};

export default PopularCategories;
