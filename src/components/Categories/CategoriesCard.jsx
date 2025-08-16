import { useNavigate } from "react-router-dom";
import { useGetSubcategoriesQuery, categoriesApi } from "../../api/categories";
import { useDispatch } from "react-redux";
import styles from "./CategoriesCard.module.scss";

export const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const imageUrl = category.image_url
    ? category.image_url + "_small.jpeg"
    : null;

  const { data: subcategories } = useGetSubcategoriesQuery(category.id);

  const handleCategoryClick = async (catId) => {
    try {
      const result = await dispatch(
        categoriesApi.endpoints.getSubcategories.initiate(catId, { forceRefetch: true })
      ).unwrap();

      if (result && result.length > 0) {
        navigate(`/categories/${catId}`); 
      } else {
        navigate(`/categories/${catId}/products`);
      }
    } catch (err) {
      console.error("Ошибка загрузки подкатегорий:", err);
      navigate(`/categories/${catId}/products`);
    }
  };

  return (
    <div className={styles.categoriesCard}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={category.category_name}
          style={{ objectFit: "cover" }}
          className={styles.categoriesCard__img}
          onClick={() => handleCategoryClick(category.id)}
        />
      )}

      <h2
        className={styles.categoriesCard__title}
        onClick={() => handleCategoryClick(category.id)}
      >
        {category.category_name}
      </h2>

      {subcategories && subcategories.length > 0 && (
        <ul className={styles.categoriesCard__sublist}>
          {subcategories.map((sub) => (
            <li
              key={sub.id}
              className={styles.categoriesCard__sublist__item}
              onClick={() => handleCategoryClick(sub.id)}
            >
              {sub.category_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
