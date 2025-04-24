import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import ShippingTwo from "../components/ShippingTwo";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import ShopByLocation from "../components/ShopByLocation";
import FooterOne from "../components/FooterOne";
import ShippingOne from "../components/ShippingOne";

const ShopLocation = () => {

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
      <Breadcrumb title={"Shops"} />

      {/* ShopSection */}
      <ShopByLocation />

      <ShippingOne />

      {/* FooterTwo */}
      <FooterOne />


    </>
  );
};

export default ShopLocation;
