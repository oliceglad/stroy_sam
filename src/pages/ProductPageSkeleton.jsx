import React from "react";
import styles from "./ProductPageSkeleton.module.scss";

const ProductPageSkeleton = () => {
  return (
    <div className={styles.productSkeleton}>
      <div className={styles.productSkeleton__content}>
        <div className={styles.productSkeleton__images}>
          <div className={styles.productSkeleton__mainImage}></div>
          <div className={styles.productSkeleton__thumbnails}>
            <div className={styles.productSkeleton__thumbnail}></div>
            <div className={styles.productSkeleton__thumbnail}></div>
            <div className={styles.productSkeleton__thumbnail}></div>
          </div>
        </div>
        <div className={styles.productSkeleton__info}>
          <div className={styles.productSkeleton__title}></div>
          <div className={styles.productSkeleton__price}></div>
          <div className={styles.productSkeleton__button}></div>
          <div className={styles.productSkeleton__textLine}></div>
          <div className={styles.productSkeleton__textLine}></div>
          <div className={styles.productSkeleton__textLine}></div>
        </div>
      </div>
      <div className={styles.productSkeleton__attributes}>
        <div className={styles.productSkeleton__attrTitle}></div>
        <div className={styles.productSkeleton__attrRow}></div>
        <div className={styles.productSkeleton__attrRow}></div>
        <div className={styles.productSkeleton__attrRow}></div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
