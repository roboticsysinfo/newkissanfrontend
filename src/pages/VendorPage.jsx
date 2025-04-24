import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import ShippingOne from "../components/ShippingOne";
import FooterOne from "../components/FooterOne";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import VendorSection from "../components/VendorSection";


const VendorPage = () => {

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

      {/* VendorSection */}
      <VendorSection />

      {/* ShippingOne */}
      <ShippingOne />

      {/* FooterOne */}
      <FooterOne />


    </>
  );
};

export default VendorPage;
