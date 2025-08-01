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
import AboutSeccionIndicadores from "./components/Tailwind/CambioGerencia/AboutSeccionIndicadores";
import AboutSeccionBeneficios from "./components/Tailwind/CambioGerencia/AboutSeccionBeneficios";
import AboutSeccionEstiloTrabajo from "./components/Tailwind/CambioGerencia/AboutSeccionEstiloTrabajo";
import AboutSeccionTestimonios from "./components/Tailwind/CambioGerencia/AboutSeccionTestimonios";
import AboutSeccionVision from "./components/Tailwind/CambioGerencia/AboutSeccionVision";
import AboutSeccionWhy from "./components/Tailwind/CambioGerencia/AboutSeccionWhy";
import CarruselBrands from "./components/Tailwind/Carrusel/CarruselBrands";
import AboutSeccionStaff from "./components/Tailwind/CambioGerencia/AboutSeccionStaff";
import CintilloSection from "./components/Tailwind/Sections/CintilloSection";
import CarruselCoreValues from "./components/Tailwind/Carrusel/CarruselCoreValues";
import { image } from "framer-motion/client";

const AboutUs = ({ aboutus, landing, brands, strengths, core_values, banner_why, staff = [], benefits, indicators = [], work_style = [], testimonials = [] }) => {

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

  const about = aboutus?.find(
    (item) => item.correlative === "about"
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

  const landingIndicadores = landing?.find(
    (item) => item.correlative === "page_aboutus_indicadores"
  );

  const landingEstiloTrabajo = landing?.find(
    (item) => item.correlative === "page_aboutus_estilo_trabajo"
  );

  const landingTestimonios = landing?.find(
    (item) => item.correlative === "page_aboutus_testimonios"
  );


  return (
    <>
      <Header />


      {/* SECCIÓN NOSOTROS */}
      <motion.div
        className="animate-section"
        initial={{ opacity: 0, y: 40 }}
        animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <HomeSeccionNosotros data={landingNosotros} strengths={strengths} about={about} />
      </motion.div>
      {/* SECCIÓN DE INDICADORES */}
      <motion.div
        className="animate-section"
        initial={{ opacity: 0, y: 40 }}
        animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.05 }}
      >
        <AboutSeccionIndicadores data={landingIndicadores} indicators={indicators} />
      </motion.div>
      {/* SECCIÓN BENEFICIOS DE TRABAJAR */}
      <motion.div
        className="animate-section"
        initial={{ opacity: 0, y: 40 }}
        animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <AboutSeccionBeneficios data={landingBeneficios} benefits={benefits} />
      </motion.div>
      {/* SECCIÓN ESTILO DE TRABAJO */}
      <motion.div
        className="animate-section"
        initial={{ opacity: 0, y: 40 }}
        animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <AboutSeccionEstiloTrabajo data={landingEstiloTrabajo} work_style={work_style} />
      </motion.div>

      {/* SECCIÓN TESTIMONIOS */}
      <motion.div
        className="animate-section"
        initial={{ opacity: 0, y: 40 }}
        animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        <AboutSeccionTestimonios data={landingTestimonios} testimonials={testimonials} />
      </motion.div>



      {/* SECCIÓN VISIÓN */}
      {/*<motion.div
        className="animate-section"
        initial={{ opacity: 0, y: 40 }}
        animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <AboutSeccionVision data={landingVision} vision={vision} mision={mision} valor={valor} />
      </motion.div> */}

      {/* SECCIÓN POR QUÉ ELEGIRNOS */}
     {/* <motion.div
        className="animate-section"
        initial={{ opacity: 0, y: 40 }}
        animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <AboutSeccionWhy data={landingEligenos} beneficios_clave={beneficios_clave} core_values={core_values} banner_why={banner_why} />
      </motion.div> */}



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
