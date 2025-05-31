import React from "react";
import { Link } from "@inertiajs/react";

const IconStack = () => (
  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent">
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#D62828" />
      <path d="M7 10l5 2.5L17 10M12 16.5l-5-2.5M12 16.5l5-2.5M7 14v-4M17 14v-4M12 7.5l5 2.5-5 2.5-5-2.5 5-2.5z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const IconUsers = () => (
  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent">
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#D62828" />
      <path d="M17 18v-1.5A2.5 2.5 0 0 0 14.5 14h-5A2.5 2.5 0 0 0 7 16.5V18M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const AboutSeccionVision = () => {
  return (
    <section className="w-full bg-white px-[5%] py-20 flex flex-col lg:flex-row gap-8 items-center">
      {/* Columna izquierda */}
      <div className="flex-1 max-w-xl">
        <span className="text-accent font-bold uppercase tracking-wider text-sm inline-block mb-3">& Nuestra visión | Misión</span>
        <h2 className="text-4xl md:text-6xl font-medium text-neutral-dark leading-tight mb-4">
          Somos agentes<br />del <span className="text-constrast italic font-normal">cambio<br />humano</span>
        </h2>
        <p className="text-neutral-dark text-lg mb-8 max-w-md">
          Visualizamos un mundo donde las empresas y las personas prosperen juntas mediante conexiones que fomenten la innovación, el crecimiento y el éxito.
        </p>
        <Link
          href="/nosotros"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-lg rounded-lg px-8 py-4 transition-colors shadow-md"
        >
          Sobre nosotros
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Columna central: tarjetas visión/misión/valor */}
      <div className="flex-1 max-w-lg w-full flex flex-col gap-4">
        <div className="bg-neutral-light rounded-2xl p-8 flex flex-col gap-4">
          {/* Misión */}
          <div className="flex items-start gap-4">
            <IconStack />
            <div>
              <h3 className="text-neutral-dark text-lg font-semibold mb-1">Nuestra misión</h3>
              <p className="text-neutral-dark text-base">Nutrimos, desarrollamos y mejoramos el talento a través de programas de aprendizaje y capacitación estratégica.</p>
            </div>
          </div>
          {/* Visión */}
          <div className="flex items-start gap-4 bg-constrast rounded-xl p-4 mt-2">
            <IconUsers />
            <div>
              <h3 className="text-white text-lg font-semibold mb-1">Nuestra visión</h3>
              <p className="text-white text-base">Nutrimos, desarrollamos y mejoramos el talento a través de programas de aprendizaje y capacitación estratégica.</p>
            </div>
          </div>
          {/* Valor */}
          <div className="flex items-start gap-4 mt-2">
            <IconStack />
            <div>
              <h3 className="text-neutral-dark text-lg font-semibold mb-1">Nuestro valor</h3>
              <p className="text-neutral-dark text-base">Nutrimos, desarrollamos y mejoramos el talento a través de programas de aprendizaje y capacitación estratégica.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Columna derecha: imagen */}
      <div className="flex-1 max-w-md w-full flex items-center justify-center">
        <div className="rounded-2xl overflow-hidden w-full max-w-xs md:max-w-sm">
          <img
            src="/assets/cambiogerencia/persona-vision.jpg"
            alt="Agente del cambio humano"
            className="w-full h-[420px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSeccionVision;
