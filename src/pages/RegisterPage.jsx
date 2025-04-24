import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
import Register from "../components/Register"
import FooterOne from "../components/FooterOne";


const RegisterPage = () => {

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
      <Breadcrumb title={"Account"} />

      {/* Register */}
        <Register />

      {/* ShippingOne */}
      <ShippingOne />

      {/* FooterOne */}
      <FooterOne />

      {/* BottomFooter */}
      <BottomFooter />


    </>
  );
};

export default RegisterPage;
