import React from "react";
import styles from "./Partners.module.scss";

import brand1 from "../../assets/images/partners/optimize.webp";
import brand2 from "../../assets/images/partners/sibrtec-700x700.png";
import brand3 from "../../assets/images/partners/orig.webp";
import brand4 from "../../assets/images/partners/mceu_478907584131737100784838-1737100785910.png";
import brand5 from "../../assets/images/partners/bioteks_1749216899.png";
import brand6 from "../../assets/images/partners/DENZEL.png";

const brands = [
  { id: 1, name: "Optimize", logo: brand1 },
  { id: 2, name: "Сибртех", logo: brand2 },
  { id: 3, name: "Orig", logo: brand3 },
  { id: 4, name: "Partner", logo: brand4 },
  { id: 5, name: "Биотекс", logo: brand5 },
  { id: 6, name: "Denzel", logo: brand6 },
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
