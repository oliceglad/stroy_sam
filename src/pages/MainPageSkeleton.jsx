import React from "react";
import { HeaderSkeleton } from "../components/Header/HeaderSkeleton";
import { HeroSkeleton } from "../components/HeroBanner/HeroSkeleton";
import { CategorySkeleton } from "../components/Categories/CategorySkeleton";
import styles from "./MainPageSkeleton.module.scss";

// Reusing TopHeader static or simply omitting it? 
// Let's assume TopHeader is fast or we can mock it with a div if needed.
// For now, Header + Hero + Categories is the main visual weight.

export const MainPageSkeleton = () => {
  return (
    <div className={styles.mainPageSkeleton}>
      <HeaderSkeleton />
      <div className={styles.mainPageSkeleton__content}>
        <HeroSkeleton />
        {/* Mocking the categories list skeleton from PopularCategories */}
        <div className={styles.mainPageSkeleton__categories}>
           <div className={styles.mainPageSkeleton__title}></div>
           <div className={styles.mainPageSkeleton__grid}>
              {Array(7).fill(0).map((_, i) => (
                  <CategorySkeleton key={i} />
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
