import React from "react";
import styles from "./HeaderSkeleton.module.scss";

export const HeaderSkeleton = () => {
  return (
    <div className={styles.headerSkeleton}>
      <div className={styles.headerSkeleton__container}>
        <div className={styles.headerSkeleton__left}>
          <div className={styles.headerSkeleton__logo}></div>
        </div>
        <div className={styles.headerSkeleton__center}>
          <div className={styles.headerSkeleton__catalogBtn}></div>
          <div className={styles.headerSkeleton__search}></div>
        </div>
        <div className={styles.headerSkeleton__right}>
          <div className={styles.headerSkeleton__icon}></div>
          <div className={styles.headerSkeleton__icon}></div>
          <div className={styles.headerSkeleton__icon}></div>
        </div>
      </div>
    </div>
  );
};
