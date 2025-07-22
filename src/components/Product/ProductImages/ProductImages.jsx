import React, { useState } from "react";
import styles from "./ProductImages.module.scss";

const ProductImages = ({ imageUrls }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!imageUrls || imageUrls.length === 0) return null;

  return (
    <div className={styles.slider}>
      <div className={styles.slider__main}>
        <img src={imageUrls[activeIndex] + "_large.jpeg"} alt="product" />
      </div>
      {imageUrls.length > 1 && (
        <div className={styles.slider__thumbnails}>
          {imageUrls.map((url, idx) => (
            <img
              key={idx}
              src={url + "_small.jpeg"}
              alt={`thumb-${idx}`}
              className={
                idx === activeIndex ? styles.active : ""
              }
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;
