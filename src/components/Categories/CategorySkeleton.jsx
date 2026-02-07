import React from "react";
import styles from "./CategorySkeleton.module.scss";

export const CategorySkeleton = () => {
  return (
    <div className={styles.categorySkeleton}>
      <div className={styles.categorySkeleton__image}></div>
      <div className={styles.categorySkeleton__title}></div>
      <div className={styles.categorySkeleton__line1}></div>
      <div className={styles.categorySkeleton__line2}></div>
    </div>
  );
};
