import React from "react";

const IconCheck = () => (
  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent">
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#D62828" />
      <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const IconStack = () => (
  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent">
    <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="16" fill="#D62828" />
      <path d="M10.667 13.333L16 16l5.333-2.667M16 21.333l-5.333-2.666M16 21.333l5.333-2.666M10.667 18.667V13.333M21.333 18.667V13.333M16 10.667l5.333 2.666-5.333 2.667-5.333-2.667L16 10.667z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const IconUsers = () => (
  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent">
    <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="16" fill="#D62828" />
      <path d="M21.333 22.667v-1.334A2.667 2.667 0 0 0 18.667 18.667h-5.334A2.667 2.667 0 0 0 10.667 21.333v1.334M16 16a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const AboutSeccionWhy = () => {
  return (
    <section className="w-full bg-primary px-[5%] py-20 flex flex-col lg:flex-row gap-10 items-center">
      {/* Columna izquierda */}
      <div className="flex-1 max-w-2xl">
        <span className="text-accent font-bold uppercase tracking-wider text-sm inline-block mb-3">&iquest;Por qu&eacute; elegirnos?</span>
        <h2 className="text-4xl md:text-6xl font-medium text-white leading-tight mb-4">
          Somos agentes<br />del <span className="text-accent italic font-normal">cambio humano</span>
        </h2>
        <p className="text-white/90 text-lg mb-6 max-w-xl">
          Ofrecemos soluciones expertas en RRHH, conectando el talento con la oportunidad y asegurando el &eacute;xito empresarial con apoyo personalizado.
        </p>
        {/* Lista de checks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="flex items-start gap-3">
            <IconCheck />
            <span className="text-white text-base">Gesti&oacute;n de cumplimiento y optimizaci&oacute;n del rendimiento.</span>
          </div>
          <div className="flex items-start gap-3">
            <IconCheck />
            <span className="text-white text-base">Gesti&oacute;n de cumplimiento y optimizaci&oacute;n del rendimiento.</span>
          </div>
          <div className="flex items-start gap-3">
            <IconCheck />
            <span className="text-white text-base">Estrategias de RRHH para impulsar el &eacute;xito y fomentar el talento de los empleados.</span>
          </div>
          <div className="flex items-start gap-3">
            <IconCheck />
            <span className="text-white text-base">Estrategias de RRHH para impulsar el &eacute;xito y fomentar el talento de los empleados.</span>
          </div>
        </div>
        {/* Beneficios destacados */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <IconStack />
            <h3 className="text-white text-lg font-semibold mt-4 mb-1">Soluciones de n&oacute;mina</h3>
            <p className="text-white/80 text-base">Agilizamos el procesamiento de n&oacute;minas garantizando precisi&oacute;n y puntualidad.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <IconUsers />
            <h3 className="text-white text-lg font-semibold mt-4 mb-1">Garant&iacute;a de cumplimiento</h3>
            <p className="text-white/80 text-base">Agilizamos el procesamiento de n&oacute;minas garantizando precisi&oacute;n y puntualidad.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <IconStack />
            <h3 className="text-white text-lg font-semibold mt-4 mb-1">Desarrollo de empleados</h3>
            <p className="text-white/80 text-base">Agilizamos el procesamiento de n&oacute;minas garantizando precisi&oacute;n y puntualidad.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <IconUsers />
            <h3 className="text-white text-lg font-semibold mt-4 mb-1">Estrategia de fuerza laboral</h3>
            <p className="text-white/80 text-base">Agilizamos el procesamiento de n&oacute;minas garantizando precisi&oacute;n y puntualidad.</p>
          </div>
        </div>
      </div>

      {/* Columna derecha: imagen */}
      <div className="flex-1 max-w-xl w-full flex items-center justify-center">
        <div className="rounded-2xl overflow-hidden w-full max-w-lg">
          <img
            src="/assets/cambiogerencia/why-team.jpg"
            alt="Equipo RRHH"
            className="w-full h-[420px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSeccionWhy;
