import React, { useState } from "react";

const faqs = [
  {
    question: "¿Ut sed felis eu odio aliquam consectetur at et quam?",
    answer: "",
  },
  {
    question: "¿Cómo puedo empezar a utilizar sus servicios?",
    answer:
      "Ofrecemos una gama completa de soluciones de RR. HH. diseñadas para satisfacer las necesidades cambiantes de empresas y empleados. Nuestros servicios incluyen la contratación estratégica.",
  },
  {
    question: "¿Donec sagittis, enim id vehicula efficitur, mauris felis egestas nulla?",
    answer: "",
  },
  {
    question: "¿Ut sed felis eu odio aliquam consectetur at et quam?",
    answer: "",
  },
  {
    question: "¿Donec sagittis, enim id vehicula efficitur, mauris felis egestas nulla?",
    answer: "",
  },
];

const DownIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#0090E3"/><path d="M8 10l4 4 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const UpIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#D62828"/><path d="M16 14l-4-4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const ServiceSeccionFaq = () => {
  const [open, setOpen] = useState(1);
  return (
    <section className="w-full bg-white px-[5%] py-16 flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto">
      {/* FAQ */}
      <div className="flex-1 max-w-3xl">
        <h2 className="text-5xl font-bold mb-10">
          Preguntas <span className="text-primary italic font-normal">Frecuentes</span>
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="">
              <button
                className={`w-full text-left rounded-xl px-8 py-5 flex items-center justify-between transition-colors font-semibold text-xl ${
                  open === i
                    ? "bg-primary text-white"
                    : "bg-neutral-light text-primary-dark hover:bg-primary/10"
                }`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{faq.question}</span>
                <span className="ml-4 flex-shrink-0">
                  {open === i ? <UpIcon /> : <DownIcon />}
                </span>
              </button>
              {open === i && faq.answer && (
                <div className="bg-primary text-white rounded-b-xl px-8 py-4 text-lg font-normal border-t border-primary/30">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Card lateral */}
      <div className="w-full max-w-xs mx-auto lg:mx-0">
        <div className="rounded-2xl overflow-hidden shadow-lg relative bg-white">
          <img
            src="/assets/cambiogerencia/card-contact.webp"
            alt="Servicios de RR.HH"
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
            <h3 className="text-white text-2xl font-bold mb-1 drop-shadow">Servicios de RR.HH</h3>
            <p className="text-white text-base mb-4 drop-shadow">Herramientas ágiles para la gestión del talent, enean commodo ligula eget dolor.</p>
            <a
              href="#"
              className="inline-block bg-primary text-white text-lg font-semibold rounded-lg px-6 py-3 text-center transition-colors duration-200 hover:bg-accent"
            >
              Reserva una consulta
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSeccionFaq;
