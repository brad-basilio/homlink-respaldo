import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppButton from "../../Shared/WhatsAppButton";
import TextWithHighlight from "../../../Utils/TextWithHighlight";




const DownIcon = ({ isOpen }) => (
  <motion.div
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    <svg width="53" height="52" viewBox="0 0 53 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="0.230469"
        width="52"
        height="52"
        rx="26"
        
        transition={{ duration: 0.3 }}
      />
      <motion.path
        d="M20.2305 29.5L25.5234 24.2071C25.8567 23.8738 26.0234 23.7071 26.2305 23.7071C26.4376 23.7071 26.6042 23.8738 26.9376 24.2071L32.2305 29.5"
        stroke={isOpen ? "#FFFFFF" : "#FFFFFF"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{ duration: 0.3 }}
      />
    </svg>
  </motion.div>
);


const ServiceSeccionFaq = ({ landingFAQS, faqs = [] }) => {
  // Cambiamos a un solo ID para accordion tipo "accordion"
  const [openItem, setOpenItem] = useState(faqs[0]?.id || null);

  const toggleItem = (id) => {
    // Si el item ya está abierto, lo cerramos, sino abrimos el nuevo y cerramos el anterior
    if (openItem === id) {
      setOpenItem(null);
    } else {
      setOpenItem(id);
    }

    // Debug: verificar el estado y los datos
    console.log('Toggle FAQ:', {
      id,
      isOpen: id === openItem,
      previousOpen: openItem,
      item: faqs.find(f => f.id === id),
      allFaqs: faqs
    });
  }
  return (
    <motion.section
      className="w-full relative lg:mt-20 overflow-hidden font-title  bg-primary text-white px-[5%] py-12 md:py-24 flex flex-col lg:flex-row gap-10 lg:gap-20 mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* FAQ */}
      <motion.div
        className="flex-1 w-full lg:w-6/12 z-[999]"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >

        <motion.h2
          className="text-3xl md:text-4xl lg:text-[40px] font-medium mb-4 md:mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <TextWithHighlight text={landingFAQS?.title} color="bg-white font-semibold" />
        </motion.h2>


      </motion.div>

      <motion.div
        className="z-10 flex-1 flex justify-center items-end"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >

        <svg className="absolute opacity-30 z-10 right-0 bottom-0  h-full  object-cover" width="1257" height="518" viewBox="0 0 1257 518" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g  opacity="0.6">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1213.57 -135.652C1168.07 -219.44 1104.66 -285.066 1023.34 -332.53C942.508 -379.51 850.055 -403 745.985 -403C642.399 -403 549.946 -379.51 468.626 -332.53C387.79 -285.066 324.622 -219.44 279.121 -135.652C242.334 -67.3616 220.552 7.70908 213.775 89.5603C213.775 91.0133 213.775 92.2241 213.775 93.1927C210.145 122.252 186.184 144.773 156.415 145.5C155.931 145.5 155.447 145.5 154.963 145.5C154.479 145.5 153.995 145.5 153.511 145.5C47.5047 145.5 -26.5545 250.115 9.02303 350.37C18.704 376.524 30.0791 401.951 43.1483 426.652C88.6488 510.44 151.817 576.066 232.653 623.531C313.973 670.51 406.426 694 510.012 694C614.082 694 706.535 670.51 787.371 623.531C868.691 576.066 931.859 510.44 976.876 426.652C1014.63 357.393 1036.66 281.354 1042.95 198.534C1045.85 170.201 1068.36 147.679 1097.4 145.5C1098.86 145.5 1100.31 145.5 1101.76 145.5C1103.21 145.5 1104.66 145.5 1106.12 145.5C1210.67 145.5 1282.55 42.3384 1248.43 -56.4643C1238.75 -83.5865 1227.13 -109.982 1213.57 -135.652ZM981.232 145.5C891.199 145.5 814.236 204.346 785.919 289.345C781.563 302.422 776.48 315.014 770.671 327.122C745.985 380.883 711.134 422.777 666.117 452.805C620.617 483.318 568.582 498.574 510.012 498.574C450.474 498.574 398.197 483.318 353.181 452.805C307.68 422.777 272.829 380.883 248.626 327.122C232.653 293.704 222.004 257.379 216.679 218.149C215.711 214.274 215.227 210.642 215.227 207.252C215.227 206.767 215.227 206.525 215.227 206.525C215.227 206.041 215.227 205.314 215.227 204.346C215.227 171.654 241.366 145.5 274.039 145.5C363.346 145.5 441.035 86.6543 469.352 1.65494C473.708 -11.4219 478.791 -24.0143 484.6 -36.1225C509.286 -89.8828 544.137 -131.777 589.154 -161.805C634.17 -192.318 686.447 -207.574 745.985 -207.574C804.555 -207.574 856.59 -192.318 902.09 -161.805C947.107 -131.777 981.958 -89.8828 1006.64 -36.1225C1022.62 -1.73532 1033.27 35.5579 1038.59 75.757C1039.08 77.6943 1039.56 79.6316 1040.04 81.5688C1040.04 83.0218 1040.04 84.717 1040.04 86.6543C1040.04 118.62 1013.91 145.5 981.232 145.5Z" fill="white" />
          </g>
        </svg>

        <div className="space-y-4 z-[99]">
          {faqs.map((item, index) => (
            <motion.div
              key={item.id}
              className="rounded-2xl overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <motion.button
                onClick={() => toggleItem(item.id)}
                className={`w-full px-4 md:px-6 text-left flex items-center justify-between transition-all duration-300 ease-in-out relative ${openItem === item.id
                  ? "bg-transparent text-white pt-3 md:pt-4 pb-0"
                  : "bg-transparent text-white py-3 md:py-8"
                  }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-base w-9/12 md:text-2xl font-medium pr-2 md:pr-4">
                  {item.name}
                </span>

                <div className="flex-shrink-0 flex items-center justify-center cursor-pointer">
                  <DownIcon isOpen={openItem === item.id} />
                </div>
              </motion.button>

              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: { duration: 0.4, ease: "easeInOut" },
                        opacity: { duration: 0.3, delay: 0.1 }
                      }
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.2 }
                      }
                    }}
                    className="bg-transparent text-neutral overflow-hidden"
                  >
                    <motion.div
                      className="px-4 md:px-6 py-4"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {item.description ? (
                        <p className="text-sm w-10/12 md:text-lg leading-relaxed whitespace-pre-line">
                          {item.description}
                        </p>
                      ) : (
                        <p className="text-sm w-10/12 md:text-lg leading-relaxed text-red-400">
                          No hay respuesta para este FAQ.
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </motion.div>
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

    </motion.section>
  );
};

export default ServiceSeccionFaq;
