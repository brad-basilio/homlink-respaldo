import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import { useTranslation } from "./hooks/useTranslation";
import { AnimatePresence, motion } from "framer-motion";
import TextWithHighlight from "./Utils/TextWithHighlight";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import HomeSeccionNosotros from "./components/Tailwind/CambioGerencia/HomeSeccionNosotros";
import AboutSeccionVision from "./components/Tailwind/CambioGerencia/AboutSeccionVision";
import AboutSeccionWhy from "./components/Tailwind/CambioGerencia/AboutSeccionWhy";
import CarruselBrands from "./components/Tailwind/Carrusel/CarruselBrands";
import AboutSeccionStaff from "./components/Tailwind/CambioGerencia/AboutSeccionStaff";

const AboutUs = ({ about, landing, issues, valores, paises, sectores, brands }) => {

  const landingHero = landing?.find(
    (item) => item.correlative === "page_aboutus_hero"
  );

  const landingHistory = landing?.find(
    (item) => item.correlative === "page_aboutus_history"
  );

  const landingIssues = landing?.find(
    (item) => item.correlative === "page_aboutus_issues"
  );

  const landingComment = landing?.find(
    (item) => item.correlative === "page_aboutus_comment"
  );

  const landingValues = landing?.find(
    (item) => item.correlative === "page_aboutus_values"
  );

  const landingSrategy = landing?.find(
    (item) => item.correlative === "page_aboutus_strategy"
  );

  const landingStatics = landing?.find(
    (item) => item.correlative === "page_aboutus_stadistic"
  );

  const landingCarrusel = landing?.find(
    (item) => item.correlative === "page_aboutus_carrusel"
  );

  const landingRuta = landing?.find(
    (item) => item.correlative === "page_aboutus_ruta"
  );

  const landingBanner = landing?.find(
    (item) => item.correlative === "page_aboutus_banner"
  );

  const landingFooter = landing?.find(
    (item) => item.correlative === "page_aboutus_footer"
  );

  const landingFooterOne = landing?.find(
    (item) => item.correlative === "page_aboutus_footer_cardone"
  );

  const landingFooterTwo = landing?.find(
    (item) => item.correlative === "page_aboutus_footer_cardtwo"
  );


  return (
    <>
      <Header />

      <HomeSeccionNosotros />
      <AboutSeccionVision />
      <AboutSeccionWhy />
     
      <AboutSeccionStaff />
              <CarruselBrands items={brands} data={{ title: "15,000+ empresas, desde pequeñas startups hasta nombres conocidos..." }} />

      <Footer />
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <CarritoProvider>
      <Base {...properties}>
        <AboutUs {...properties} />
      </Base>
    </CarritoProvider>
  );
});
