import React from "react";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import PopularCategories from "../components/PopularCategories/PopularCategories";
import WhyUs from "../components/WhyUs/WhyUs";

import Partners from "../components/Partners/Partners";

const MainPage = () => {
  return (
    <div>
      <HeroBanner />
      <WhyUs />
      <Partners />
      <PopularCategories />
    </div>
  );
};

export default MainPage;
