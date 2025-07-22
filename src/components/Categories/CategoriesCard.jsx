import { useNavigate } from "react-router-dom";
import { useGetSubcategoriesQuery } from "../../api/categories";
import styles from "./CategoriesCard.module.scss";

export const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const imageUrl = category.image_url
    ? category.image_url + "_small.jpeg"
    : null;

  const { data: subcategories } = useGetSubcategoriesQuery(category.id);

  return (
    <div className={styles.categoriesCard}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={category.category_name}
          style={{ objectFit: "cover" }}
          className={styles.categoriesCard__img}
          onClick={() => navigate(`/categories/${category.id}/products`)}
        />
      )}
      <h2
        className={styles.categoriesCard__title}
        onClick={() => navigate(`/categories/${category.id}/products`)}
      >
        {category.category_name}
      </h2>
      {subcategories && subcategories.length > 0 && (
        <ul className={styles.categoriesCard__sublist}>
          {subcategories.map((sub) => (
            <li
              key={sub.id}
              className={styles.categoriesCard__sublist__item}
              onClick={() => navigate(`/categories/${category.id}/${sub.id}/products/`)}
            >
              {sub.category_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
