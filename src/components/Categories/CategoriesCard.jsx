import { useGetSubcategoriesQuery } from "../../api/categories";

export const CategoryCard = ({ category }) => {
  const imageUrl = category.image_url
    ? category.image_url + "_small.jpeg"
    : null;

  const { data: subcategories } = useGetSubcategoriesQuery(category.id);

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, marginBottom: 24 }}>
      <h2>{category.category_name}</h2>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={category.category_name}
          style={{ width: 120, height: 120, objectFit: "cover" }}
        />
      )}
      {subcategories && subcategories.length > 0 && (
        <ul style={{ marginTop: 12 }}>
          {subcategories.map((sub) => (
            <li key={sub.id}>{sub.category_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
