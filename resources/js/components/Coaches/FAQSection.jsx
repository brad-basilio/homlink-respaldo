import React from "react";
import FAQItem from "./FAQItem";

const FAQSection = ({ faqs = [] }) => {
  return (
    <section className="p-[5%] grid grid-cols-1 md:grid-cols-2 gap-10 justify-between items-start w-full mx-auto text-cyan-950">
      <div className="flex flex-col items-start text-left col-span-1 md:col-span-1 lg:col-span-1 max-md:items-center max-md:text-center">
        <h2 className="text-4xl font-bold leading-10 max-md:text-2xl">
          Respuestas a tus Preguntas Más Comunes
        </h2>
        <div className="flex w-6 min-h-[24px]" />
        <p className="text-base leading-6">
          Encuentra respuestas a tus dudas más habituales sobre Net Coaching. Exploramos las preguntas frecuentes para ayudarte a obtener una comprensión completa de nuestros servicios.
        </p>
      </div>

      <div className="flex flex-col gap-6 col-span-1 md:col-span-1 lg:col-span-1 max-md:items-center">
        {faqs.map((item, index) => (
          <FAQItem
            key={index}
            question={item.name}
            answer={item.description}
            isOpen={index === 0}
            className="border-t border-cyan-950 pt-4"
          />
        ))}
      </div>
    </section>
  );
}

export default FAQSection;