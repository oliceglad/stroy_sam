import React from "react";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import PopularCategories from "../components/PopularCategories/PopularCategories";
import WhyUs from "../components/WhyUs/WhyUs";

const MainPage = () => {
  return (
    <div>
      <HeroBanner />
      <WhyUs />
      <PopularCategories />
    </div>
  );
};

export default MainPage;
