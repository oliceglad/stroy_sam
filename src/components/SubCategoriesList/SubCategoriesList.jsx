import React from "react";
import styles from "./SubCategoriesList.module.scss";

const SubCategoriesList = ({ subcategories, subId, onSelect }) => {
  if (!subcategories?.length) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {subcategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => onSelect(sub)}
            className={`${styles.item} ${subId == sub.id ? styles.active : ""}`}
          >
            {sub.category_name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubCategoriesList;
