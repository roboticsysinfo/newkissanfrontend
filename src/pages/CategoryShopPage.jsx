import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import ShippingOne from "../components/ShippingOne";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import CategoryShopSection from "../components/CategoryShopSection";
import FooterOne from "../components/FooterOne";

const CategoryShopPage = () => {

  return (
    <>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#FA6400" />

      {/* Preloader */}
      <Preloader />

      {/* HeaderOne */}
      <HeaderOne category={true} />

      {/* Breadcrumb */}
      <Breadcrumb title={"Shop"} />

      {/* ShopSection */}
      <CategoryShopSection />

      {/* ShippingOne */}
      <ShippingOne />

      {/* FooterOne */}
      <FooterOne />


    </>
  );
};

export default CategoryShopPage;
