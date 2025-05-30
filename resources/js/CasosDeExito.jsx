import React from "react";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import { CarritoProvider } from "./context/CarritoContext";
import Footer from "./components/Tailwind/Footer";
import Header from "./components/Tailwind/Header";
import TestimonioSection from "./components/Home/TestimonioSection";
import HomeSeccionTestimonios from "./components/Tailwind/CambioGerencia/HomeSeccionTestimonios";
const casos = [
  {
    id: 1,
    type: "solution",
    title: "Soluciones de RR.HH para el éxito de las fuerzas de trabajo",
        description: "Comienza la brecha entre profesionales cualificados...",
    image: "/assets/cambiogerencia/caso-1.webp",
  },
  {
    id: 2,
    type: "strategy",
    title: "Estrategias de desarollo profesional RR.HH para el éxito",
    description: "Comienza la brecha entre profesionales cualificados...",
    image: "/assets/cambiogerencia/caso-2.webp",
  },
  {
    id: 3,
    type: "solution",
    title: "Soluciones de RR.HH para el éxito de las fuerzas de trabajo",
        description: "Comienza la brecha entre profesionales cualificados...",
    image: "/assets/cambiogerencia/caso-3.webp",
  },
  {
    id: 4,
    type: "strategy",
    title: "Estrategias de desarollo profesional RR.HH para el éxito",
        description: "Comienza la brecha entre profesionales cualificados...",
    image: "/assets/cambiogerencia/caso-1.webp",
  },
  {
    id: 5,
    type: "solution",
    title: "Soluciones de RR.HH para el éxito de las fuerzas de trabajo",
    description: "Comienza la brecha entre profesionales cualificados...",
    image: "/assets/cambiogerencia/caso-2.webp",
  },
  {
    id: 6,
    type: "solution",
    title: "Soluciones de RR.HH para el éxito de las fuerzas de trabajo",
    description: "Comienza la brecha entre profesionales cualificados...",
    image: "/assets/cambiogerencia/caso-3.webp",
  },
  {
    id: 7,
    type: "solution",
    title: "Soluciones de RR.HH para el éxito de las fuerzas de trabajo",
    description: "Comienza la brecha entre profesionales cualificados...",
    image: "/assets/cambiogerencia/caso-1.webp",
  },
  {
    id: 8,
    type: "strategy",
    title: "Estrategias de desarollo profesional RR.HH para el éxito",
    description: "Comienza la brecha entre profesionales cualificados...",
    image: "/assets/cambiogerencia/caso-2.webp",
  },
   {
    id: 8,
    type: "strategy",
    title: "Estrategias de desarollo profesional RR.HH para el éxito",
    description: "Comienza la brecha entre profesionales cualificados...",
    image: "/assets/cambiogerencia/caso-3.webp",
  },
];

// Componente para la tarjeta de caso de éxito
const CaseCard = ({ title, image, type, description }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      {/* Imagen de fondo */}
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
      />
        {/* Overlay oscuro por defecto - solo muestra título y botón */}
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 transition-all duration-300 group-hover:hidden group-hover:opacity-0 z-10">
        <h3 className="text-white text-xl font-medium mb-2 leading-tight">
          {title}
        </h3>
        
        <div className="flex justify-end">
          <div className="bg-constrast hover:bg-accent transition-colors duration-300 rounded-full p-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Overlay azulado en hover - muestra título, descripción y botón */}
      <div className="absolute inset-0 bg-constrast opacity-0 flex flex-col justify-end p-6  group-hover:bg-opacity-40 group-hover:opacity-100 transition-all duration-500 z-[999]">
        <h3 className="text-white text-xl font-medium mb-2 leading-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {title}
        </h3>
        {description && (
          <p className="text-white/90 text-sm mb-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
            {description}
          </p>
        )}
        <div className="flex justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-150">
          <div className="bg-accent hover:bg-accent/80 transition-colors duration-300 rounded-full p-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const CasosDeExito = () => {
  return (
  <>
  <Header/>
    <section className="w-full bg-white font-paragraph px-[5%] py-16 md:py-20">
      {/* Título de la sección */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-3">
          <span className="text-accent text-sm font-bold uppercase tracking-wider">
            CASOS DE ÉXITO
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-medium mb-4">
          <span className="text-neutral-dark">Nuestros </span>
          <span className="text-constrast">casos de éxito</span>
        </h2>
        <h3 className="text-2xl md:text-3xl text-neutral-dark">
          más destacados
        </h3>
      </div>

      {/* Grid de casos de éxito */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">        {casos.map((caso) => (
          <CaseCard
            key={caso.id}
            title={caso.title}
            image={caso.image}
            type={caso.type}
            description={caso.description}
          />
        ))}
      </div>

    
    </section>
    <HomeSeccionTestimonios/>
    <Footer/>
  </>
  );
};


CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <CasosDeExito {...properties} />
            </Base>
        </CarritoProvider>
    );
});
