// ProductAttributes.jsx
import React from "react";
import styles from "./ProductAttributes.module.scss";

const ProductAttributes = ({ attributes }) => {
  if (!attributes?.length) return null;

  return (
    <div className={styles.attrs}>
      <h2 className={styles.attrs__title}>Характеристики</h2>
      <ul className={styles.attrs__list}>
        {attributes.map((attr, idx) => (
          <li key={idx}>
            <span>{attr.attribute_name}</span>
            <strong>{attr["attribute.value"]}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductAttributes;
