import React from "react";
import styles from "./FavoritesPageSkeleton.module.scss";

const FavoritesPageSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__header}></div>
      <div className={styles.skeleton__grid}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={styles.cardSkeleton}>
            <div className={styles.cardSkeleton__image}></div>
            <div className={styles.cardSkeleton__title}></div>
            <div className={styles.cardSkeleton__price}></div>
            <div className={styles.cardSkeleton__button}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPageSkeleton;
