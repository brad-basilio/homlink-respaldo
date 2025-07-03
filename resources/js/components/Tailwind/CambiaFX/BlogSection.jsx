import React, { useState } from "react";
import TextWithHighlight from "../../../Utils/TextWithHighlight";

const blogCards = [
  {
    image: "/assets/cambiafx/blog-1.png",
    title: "Cambia FX, reconocida como la Mejor Plataforma de Cambio Digital",
    
  },
  {
    image: "/assets/cambiafx/blog-2.png",
    title: "Con 100,000 usuarios satisfechos",

  },
  {
    image: "/assets/cambiafx/blog-3.jpg",
    title: "Cambia FX impulsa la innovación",
    
  },
  {
    image: "/assets/cambiafx/blog-4.jpg",
    title: "La SBS decidió renovar su confianza en Cambia FX",
 
  },
];

const BlogSection = ({data}) => {
  const [expanded, setExpanded] = useState(0);

  return (
    <section className="w-full bg-secondary font-title py-16 px-0 md:px-0 flex justify-center flex-wrap items-center relative overflow-hidden">
      {/* Banda decorativa inferior */}
     <div className="absolute bottom-0 left-0 -full h-full z-0 pointer-events-none">
                <img  src="/assets/cambiafx/blog-overlay.png" 
                    alt="Fondo" 
                    className="h-full object-cover pt-16"
                    style={{
                        maskImage: 'linear-gradient(to left, transparent, black 300px)',
                        WebkitMaskImage: 'linear-gradient(to left, transparent, black 300px)'
                    }} />
            </div>

      <div className="px-[5%] w-full mx-auto flex flex-col md:flex-row items-start gap-8 relative z-10 ">
        {/* Columna izquierda: texto */}
        <div className="flex-1 min-w-[320px] flex flex-col justify-center items-start pt-4 md:pt-12">
          <div className="uppercase text-neutral-dark text-sm font-medium tracking-[8%] mb-2">CASOS DE EXITO | BLOG</div>
          <h2 className="text-4xl md:text-[64px] font-medium leading-[94%] text-neutral-dark  mb-2">
          <TextWithHighlight text={data?.title} color='bg-constrast font-semibold' split  />
          

          </h2>
          <p className="text-xl text-neutral-light mb-2 max-w-[420px] mt-4">
            <TextWithHighlight text={data?.description} color='bg-neutral-light font-semibold' />

          </p>
        </div>

        {/* Columna derecha: cards */}
        <div className="flex-1 flex flex-row gap-6 items-end justify-end min-w-[400px]">
          {blogCards.map((card, idx) => {
            const isExpanded = expanded === idx;
            return (
              <div
                key={idx}
                className={`relative group transition-all duration-700 ease-[cubic-bezier(.4,1.2,.6,1)] flex flex-col items-end cursor-pointer ${isExpanded ? "w-[300px] h-[380px] z-20" : "w-[90px] h-[380px] z-10"}`}
                style={{ minWidth: isExpanded ? 260 : 70 }}
                onMouseEnter={() => setExpanded(idx)}
                onFocus={() => setExpanded(idx)}
                tabIndex={0}
              >
                <div className={`rounded-[32px] overflow-hidden shadow-xl transition-all duration-700 ease-[cubic-bezier(.4,1.2,.6,1)] w-full h-full relative bg-black/60 ${isExpanded ? "scale-105" : "scale-95 group-hover:scale-105"}`}>
                  <img
                    src={card.image}
                    alt={card.title}
                    className={`object-cover w-full h-full transition-all duration-700 ease-[cubic-bezier(.4,1.2,.6,1)] ${isExpanded ? "brightness-100" : "brightness-60 "}`}
                  />
                  {/* Overlay para info */}
                  <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-700 ease-[cubic-bezier(.4,1.2,.6,1)] ${isExpanded ? "bg-gradient-to-t from-black/80 to-transparent" : "bg-gradient-to-t from-black/60 to-transparent"}`}>
                    {/* Título animado */}
                    {isExpanded ? (
                      <div
                        className="text-white font-bold text-lg md:text-xl transition-all duration-700 ease-[cubic-bezier(.4,1.2,.6,1)] rotate-0 whitespace-normal h-auto"
                        style={{
                          maxWidth: "100%",
                          minHeight: "48px",
                          transition: "all 0.7s cubic-bezier(.4,1.2,.6,1)",
                          display: "block"
                        }}
                      >
                        {card.title}
                      </div>
                    ) : (
                      <div
                        className="text-white font-medium text-base md:text-lg transition-all duration-700 ease-[cubic-bezier(.4,1.2,.6,1)] -rotate-180 flex items-center justify-center h-full w-full overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          
                        }}
                      >
                        {card.title}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
       
        </div>
        
      </div>
         {/* Botón flecha */}
         <div className="block px-[5%] mx-auto mt-8  w-full">
            <div className="flex justify-end">
                 <button className="ml-4  w-14 h-14 rounded-full bg-[#FCF7E7] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#FCF7E7" />
              <path d="M12 16H20M20 16L17 13M20 16L17 19" stroke="#181818" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
            </div>
         </div>
    </section>
  );
};

export default BlogSection;