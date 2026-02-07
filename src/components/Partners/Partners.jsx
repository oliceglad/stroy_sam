import React from "react";
import styles from "./Partners.module.scss";

import brand1 from "../../assets/brand_logo_1.png";
import brand2 from "../../assets/brand_logo_2.png";
import brand3 from "../../assets/brand_logo_3.png";
import brand4 from "../../assets/brand_logo_4.png";
import brand5 from "../../assets/brand_logo_5.png";
import brand6 from "../../assets/brand_logo_6.png";

const brands = [
  { id: 1, name: "ProTool", logo: brand1 },
  { id: 2, name: "BuildMaster", logo: brand2 },
  { id: 3, name: "ColorFix", logo: brand3 },
  { id: 4, name: "Constructo", logo: brand4 },
  { id: 5, name: "AquaPipe", logo: brand5 },
  { id: 6, name: "VoltTech", logo: brand6 },
];

const Partners = () => {
  return (
    <div className={styles.partners}>
      <h2 className={styles.partners__title}>Популярные бренды</h2>
      <div className={styles.partners__grid}>
        {brands.map((brand) => (
          <div key={brand.id} className={styles.partners__card}>
            <img src={brand.logo} alt={brand.name} className={styles.partners__logo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
