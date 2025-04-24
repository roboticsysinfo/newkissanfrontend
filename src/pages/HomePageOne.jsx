import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import BannerOne from "../components/BannerOne";
import FeatureOne from "../components/FeatureOne";
import PromotionalOne from "../components/PromotionalOne";
import ProductListOne from "../components/ProductListOne";
import TopVendorsOne from "../components/TopVendorsOne";
import NewsletterOne from "../components/NewsletterOne";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
import HomeContent from "../components/HomeContent";
import ShippingOne from "../components/ShippingOne";
import WhyKissanGrowthCards from "../components/WhyKissanGrowthCards";
import HowItWorksCards from "./HowItWorksCards";

const HomePageOne = () => {

  return (

    <>

      {/* Preloader */}
      <Preloader />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#299E60" />

      {/* ColorInit */}
      <ColorInit color={false} />

      {/* HeaderOne */}
      <HeaderOne />

      {/* BannerOne */}
      <BannerOne />

      {/* FeatureOne */}
      <FeatureOne />

      {/* PromotionalOne */}
      <PromotionalOne />

      {/* Home Content Static*/}
      <HomeContent />


      <WhyKissanGrowthCards />


      <HowItWorksCards />


      {/* ProductListOne */}
      <ProductListOne />

      {/* TopVendorsOne */}
      <TopVendorsOne />

      {/*Feature*/}
      <ShippingOne />

      {/* FooterOne */}
      <FooterOne />

      {/* BottomFooter */}
      <BottomFooter />


    </>
  );
};

export default HomePageOne;
