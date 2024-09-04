import React from "react";
import FAQItem from "./FAQItem";

const FAQSection = ({ faqs = [] }) => {
  const faqData = [
    {
      question: "¿En qué consiste el coaching ontológico?",
      answer: "El coaching ontológico es un enfoque que se centra en la transformación personal y profesional a través de la toma de conciencia, el cambio de paradigmas y el desarrollo de nuevas formas de ser y actuar."
    },
    {
      question: "¿Cuáles son las ventajas del coaching ontológico?",
      answer: "Holasdasdsda"
    },
    {
      question: "¿Cuál es la diferencia entre las \"habilidades blandas\" y las \"habilidades de poder\"?",
      answer: "asdasdasd"
    },
    {
      question: "¿Cómo puedo mejorar mis habilidades de comunicación?",
      answer: "asdasdasd"
    }
  ];
  return (
    <section className="p-[5%] flex flex-wrap gap-10 justify-between items-start self-center w-full max-w-screen-xl text-cyan-950 max-md:max-w-full">
      <div className="flex flex-col min-w-[240px] w-[469px] max-md:max-w-full">
        <h2 className="text-4xl font-bold leading-10 max-md:max-w-full">
          Respuestas a tus Preguntas Más Comunes
        </h2>
        <div className="flex w-6 min-h-[24px]" />
        <p className="text-base leading-6 max-md:max-w-full">
          Encuentra respuestas a tus dudas más habituales sobre Net Coaching. Exploramos las preguntas frecuentes para ayudarte a obtener una comprensión completa de nuestros servicios.
        </p>
      </div>
      <div className="flex flex-col min-w-[240px] w-[519px] max-md:max-w-full">
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} isOpen={index == 0} />
        ))}
      </div>
    </section>
  );
}

export default FAQSection;