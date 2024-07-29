import HeroSlider from "../../components/Hero/HeroSlider";
import "./Home.css";
import Products from "../../pages/Products/Products";

import Subscription from "../../components/Subscription";
import { useRef } from "react";
import Service from "../../components/Service/Service";

const Home = () => {
  const productsElementRef = useRef(null); //to scroll down products
  const handleScrollBottom = () => {
    productsElementRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="home">
      <HeroSlider />
      <Products
        productsElementRef={productsElementRef}
        handleScrollBottom={handleScrollBottom}
      />
      <div className="space"></div>
      <Service />

      <Subscription />
    </div>
  );
};

export default Home;
