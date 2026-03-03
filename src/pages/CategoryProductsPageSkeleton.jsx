import React from 'react';
import styles from './CategoryProductsPageSkeleton.module.scss';
import FavoritesPageSkeleton from './FavoritesPageSkeleton';

const CategoryProductsPageSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__header}></div>
      <div className={styles.skeleton__body}>
        <div className={styles.skeleton__sidebar}>
          <div className={styles.skeleton__filterTitle}></div>
          <div className={styles.skeleton__filterItem}></div>
          <div className={styles.skeleton__filterItem}></div>
          <div className={styles.skeleton__filterItem}></div>
          <div className={styles.skeleton__filterTitle}></div>
          <div className={styles.skeleton__filterItem}></div>
          <div className={styles.skeleton__filterItem}></div>
        </div>
        <div className={styles.skeleton__content}>
            {/* Re-use the grid skeleton from FavoritesPage or recreate */}
            <div className={styles.skeleton__grid}>
                {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className={styles.cardSkeleton}>
                    <div className={styles.cardSkeleton__image}></div>
                    <div className={styles.cardSkeleton__title}></div>
                    <div className={styles.cardSkeleton__price}></div>
                    <div className={styles.cardSkeleton__button}></div>
                </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductsPageSkeleton;
