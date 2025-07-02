import React, { useState } from "react";
import WhatsAppButton from "../../Shared/WhatsAppButton";



const DownIcon = () => (
  <svg width="53" height="52" viewBox="0 0 53 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.230469" width="52" height="52" rx="26" fill="#BBFF52" />
    <path d="M20.2305 29.5L25.5234 24.2071C25.8567 23.8738 26.0234 23.7071 26.2305 23.7071C26.4376 23.7071 26.6042 23.8738 26.9376 24.2071L32.2305 29.5" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

);
const UpIcon = () => (
  <svg width="53" height="52" viewBox="0 0 53 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.230469" width="52" height="52" rx="26" fill="#7D5AFA" />
    <path d="M20.2305 23L25.5234 28.2929C25.8567 28.6262 26.0234 28.7929 26.2305 28.7929C26.4376 28.7929 26.6042 28.6262 26.9376 28.2929L32.2305 23" stroke="#BCFF52" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

);

const ServiceSeccionFaq = ({ faqs = [] }) => {
  // Inicializamos openItems como un Set vacío para evitar errores
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    // Crear una nueva copia del Set para mantener la inmutabilidad
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  }
  return (<section className="w-full overflow-hidden font-title relative bg-constrast text-white px-[5%] py-12 md:py-24 flex flex-col lg:flex-row gap-10 lg:gap-20 mx-auto">
    {/* FAQ */}
    <div className="flex-1 w-full lg:w-6/12">
      <motion
        className="uppercase text-white text-sm  font-medium tracking-[8%] mb-4"

      >
        FAQS
      </motion>
      <h2 className="text-3xl md:text-4xl  lg:text-[40px] font-medium mb-4 md:mb-6 leading-tight ">
        Preguntas <span className=" font-semibold">Frecuentes</span>
      </h2>
      <div className="space-y-4">
        {faqs.map((item) => (
          <div key={item.id} className=" rounded-2xl  overflow-hidden relative">
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-full px-4 md:px-6  text-left transition-colors duration-200 flex items-center justify-between ${openItems.has(item.id) ? "bg-neutral-dark text-white pt-3 md:pt-4 pb-0" : "bg-primary text-neutral-dark py-3 md:py-8"}`}
            >
              <span className="text-base md:text-2xl font-medium pr-2 md:pr-4 ">{item.name}</span>


              <div className="flex-shrink-0 absolute top-1/2 right-4 transform -translate-y-1/2">
                {openItems.has(item.id) ? <UpIcon /> : <DownIcon />}
              </div>
            </button>                {openItems.has(item.id) && item.description && (

              <div className="px-4 md:px-6 py-4  bg-neutral-dark text-neutral">
                <p className="text-sm md:text-lg leading-relaxed">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
    <div className="z-10 flex-1 flex justify-center items-end ">
      <img src="/assets/cambiafx/faq-person.webp" alt="Empresas" className="h-[600px] object-cover absolute bottom-0 right-28 select-none" draggable="false" />
      <svg className="absolute  z-10 right-0 -bottom-10 h-full" width="1166" height="446" viewBox="0 0 1166 446" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1423 147.293C1400.84 161.266 1366.96 179.673 1322.76 192.775C1245.03 215.813 1181.04 208.91 1136.85 203.694C1084 197.456 1042.34 192.536 998.337 163.666C994.889 161.405 919.964 127.924 925.428 67.248C930.893 6.56248 1003.8 -0.379801 1053.01 47.2344C1102.22 94.8486 1104.22 140.033 1094.93 180.04C1081.76 236.789 1033.96 271.163 994.69 294.658C823.359 397.156 669.747 367.974 473 425C367.639 455.538 92 509.5 15 654.5" stroke="#BCFF52" stroke-width="32" stroke-miterlimit="10" />
      </svg>
  <img src="/assets/cambiafx/faq-person.webp" alt="Empresas" className="h-[600px] object-cover absolute bottom-0 right-28 select-none z-20" draggable="false" />
    </div>
    {/* Card lateral 
      <div className="w-full max-w-xs mx-auto lg:mx-0">
        <div className="rounded-2xl overflow-hidden shadow-lg relative bg-white">
          <img
            src="/assets/cambiogerencia/card-contact-2.webp"
            alt="Servicios de RR.HH"
            className="w-full  h-96 md:h-96 object-cover"
          />          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4 md:p-6">
            <h3 className="text-white text-lg md:text-xl font-medium mb-1 drop-shadow">Servicios de RR.HH</h3>
            <p className="text-white text-xs mb-3 md:mb-4 drop-shadow">Herramientas ágiles para la gestión del talent, enean commodo ligula eget dolor.</p>
            <WhatsAppButton 
              variant="constrast" 
              size="medium"
              className="bg-constrast text-white hover:bg-primary border-none"
              showIcon={true}
            >
              Reserva una consulta
            </WhatsAppButton>
          </div>
        </div>
      </div>
      */}

  </section>
  );
};

export default ServiceSeccionFaq;
