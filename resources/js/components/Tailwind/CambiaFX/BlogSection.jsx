import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const BlogSection = ({data,posts}) => {
  const [expanded, setExpanded] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      className="w-full bg-secondary font-title py-16 px-0 md:px-0 flex justify-center flex-wrap items-center relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Banda decorativa inferior */}
     <motion.div 
       className="absolute bottom-0 left-0 -full h-full z-0 pointer-events-none"
       initial={{ opacity: 0, x: -100 }}
       whileInView={{ opacity: 1, x: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 1, delay: 0.3 }}
     >
                <img  src="/assets/cambiafx/blog-overlay.png" 
                    alt="Fondo" 
                    className="h-full object-cover pt-16"
                    style={{
                        maskImage: 'linear-gradient(to left, transparent, black 300px)',
                        WebkitMaskImage: 'linear-gradient(to left, transparent, black 300px)'
                    }} />
            </motion.div>

      <motion.div 
        className="px-[5%] w-full mx-auto flex flex-col md:flex-row items-start gap-8 relative z-10"
        variants={itemVariants}
      >
        {/* Columna izquierda: texto */}
        <motion.div 
          className="flex-1 min-w-[320px] flex flex-col justify-center items-start pt-4 md:pt-12"
          variants={itemVariants}
        >
          <motion.div 
            className="uppercase text-neutral-dark text-sm font-medium tracking-[8%] mb-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            CASOS DE EXITO | BLOG
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-[64px] font-medium leading-[94%] text-neutral-dark mb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
          <TextWithHighlight text={data?.title} color='bg-constrast font-semibold' split  />
          

          </motion.h2>
          <motion.p 
            className="text-xl text-neutral-light mb-2 max-w-[420px] mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <TextWithHighlight text={data?.description} color='bg-neutral-light font-semibold' />

          </motion.p>
        </motion.div>

        {/* Columna derecha: cards */}
        <motion.div 
          className="flex-1 flex flex-row gap-6 items-end justify-end min-w-[400px]"
          variants={itemVariants}
        >
          {posts.slice(0,3).map((card, idx) => {
            const isExpanded = expanded === idx;
            return (
              <motion.a
                href={`/blog/${card.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                className={`relative group transition-all duration-500 ease-out flex flex-col items-end cursor-pointer h-[380px] ${isExpanded ? "w-[300px] z-20" : "w-[90px] z-10"}`}
                style={{ minWidth: isExpanded ? 260 : 70 }}
                onMouseEnter={() => setExpanded(idx)}
                onFocus={() => setExpanded(idx)}
                tabIndex={0}
                animate={{ 
                  width: isExpanded ? 300 : 90,
                  scale: isExpanded ? 1.02 : 0.98
                }}
                whileHover={{ scale: isExpanded ? 1.04 : 1.02 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6, 
                    delay: idx * 0.15 + 0.8,
                    ease: "easeOut"
                  }
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div 
                  className="rounded-[32px] overflow-hidden shadow-xl w-full h-full relative"
                  animate={{
                    filter: isExpanded ? "brightness(1)" : "brightness(0.7)"
                  }}
                  whileHover={{ 
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={`/api/posts/media/${card.image}`}
                    alt={card.name}
                    className="object-cover w-full h-full"
                    animate={{ 
                      scale: isExpanded ? 1 : 1.05,
                      filter: isExpanded ? "brightness(1)" : "brightness(0.8)"
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Overlay para info */}
                  <motion.div 
                    className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                    animate={{
                      background: isExpanded 
                        ? "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1), transparent)"
                        : "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1), transparent)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Título simplificado */}
                    <AnimatePresence mode="wait">
                      {isExpanded ? (
                        <motion.div
                          key="expanded-title"
                          className="text-white font-bold text-lg leading-tight"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                        >
                          {card?.name}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="collapsed-title"
                          className="text-white font-medium text-base flex items-center justify-center h-full"
                          style={{
                            writingMode: "vertical-rl",
                            textOrientation: "mixed",
                            textAlign: "center"
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {card.name.length > 25 ? card.name.substring(0, 25) + "..." : card.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </motion.a>
            );
          })}
       
        </motion.div>
        
      </motion.div>
         {/* Botón flecha */}
         <motion.div 
           className="block px-[5%] mx-auto mt-8 w-full"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 1.4 }}
         >
            <div className="flex justify-end">
                 <motion.a 
                 href="/blog"
                   className="ml-4 w-14 h-14 rounded-full bg-[#FCF7E7] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
                   whileHover={{ 
                     scale: 1.15, 
                     boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                     backgroundColor: "#FFF5D6"
                   }}
                   whileTap={{ scale: 0.95 }}
                   transition={{ type: "spring", stiffness: 400, damping: 10 }}
                 >
            <motion.svg 
              width="32" 
              height="32" 
              viewBox="0 0 32 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <circle cx="16" cy="16" r="16" fill="#FCF7E7" />
              <path d="M12 16H20M20 16L17 13M20 16L17 19" stroke="#181818" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.a>
            </div>
         </motion.div>
    </motion.section>
  );
};

export default BlogSection;