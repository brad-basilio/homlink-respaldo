import React, { useState, useEffect } from "react";
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
import CintilloSection from "./components/Tailwind/CambiaFX/CintilloSection";
import CarruselCoreValues from "./components/Tailwind/Carrusel/CarruselCoreValues";
import { image } from "framer-motion/client";

const AboutUs = ({ aboutus, landing, brands, strengths, core_values,banner_why, staff = [],benefits }) => {

  // Estado para controlar cuando las secciones están listas para animar
  const [sectionsReady, setSectionsReady] = useState(false);

  // Efecto para marcar las secciones como listas después del primer render
  useEffect(() => {
    // Pequeño delay para asegurar que el DOM esté completamente cargado
    const timer = setTimeout(() => {
      setSectionsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const mision = aboutus?.find(
    (item) => item.correlative === "mision"
  );
  const vision = aboutus?.find(
    (item) => item.correlative === "vision"
  );
  const valor = aboutus?.find(
    (item) => item.correlative === "valor"
  );

  const beneficios_clave = aboutus?.find(
    (item) => item.correlative === "beneficios_clave"
  );

  const landingNosotros = landing?.find(
    (item) => item.correlative === "page_aboutus_nosotros"
  );
  const landingVision = landing?.find(
    (item) => item.correlative === "page_aboutus_vision"
  );

  const landingEligenos = landing?.find(
    (item) => item.correlative === "page_aboutus_eligenos"
  );
 const landingBeneficios = landing?.find(
    (item) => item.correlative === "page_aboutus_beneficios"
  );


  return (
    <>
      <Header />
      <CintilloSection />

      {/* SECCIÓN NOSOTROS */}
      <motion.div
        className="animate-section"
        initial={{ opacity: 0, y: 40 }}
        animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <HomeSeccionNosotros data={landingNosotros} strengths={strengths} button_about={false} />
      </motion.div>

      {/* SECCIÓN VISIÓN */}
      <motion.div
        className="animate-section"
        initial={{ opacity: 0, y: 40 }}
        animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <AboutSeccionVision data={landingVision} vision={vision} mision={mision} valor={valor} />
      </motion.div>

      {/* SECCIÓN POR QUÉ ELEGIRNOS */}
      <motion.div
        className="animate-section"
        initial={{ opacity: 0, y: 40 }}
        animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <AboutSeccionWhy data={landingEligenos} beneficios_clave={beneficios_clave} core_values={core_values} banner_why={banner_why} />
      </motion.div>

      {/* SECCIÓN CARRUSEL BENEFICIOS */}
      <motion.div
        className="animate-section"
        initial={{ opacity: 0, y: 40 }}
        animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <CarruselCoreValues items={benefits} correlative="benefit" data={{ title: landingBeneficios?.title, description: landingBeneficios?.description, image: landingBeneficios?.image }} />
      </motion.div>

      {/* <AboutSeccionStaff staff={staff} />  <CarruselBrands items={brands} data={{ title: "15,000+ empresas, desde pequeñas startups hasta nombres conocidos..." }} />*/}

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
