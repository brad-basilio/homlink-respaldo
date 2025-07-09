import React from 'react';
import { Layers, Users, CreditCard, TrendingUp, MessageCircle, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import TextWithHighlight from '../../../Utils/TextWithHighlight';
import EmpresasSection from './EmpresasSection';

function HeroServiceSection({service,banner_slider}) {
 
  console.log(banner_slider)

  // Variantes de animación creativas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 200
      }
    }
  };

  const svgVariants = {
    hidden: { 
      opacity: 0, 
      pathLength: 0,
      x: 100,
     
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      x: 0,
      rotate: 0,
     
    }
  };
  return (
    <>
    <motion.div 
      className="min-h-screen bg-primary relative overflow-hidden font-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Purple decorative circles con animación */}
      <motion.div 
        className="absolute top-0 right-0"
      
        initial="hidden"
        animate="visible"
      >
        <motion.svg 
          width="684" 
          height="586" 
          viewBox="0 0 684 586" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
         
        >
          <motion.path 
            d="M12.8119 -29.7908C25.702 -13.8578 46.1592 8.31367 75.6004 29.1596C127.368 65.8159 176.512 76.8416 210.555 84.12C251.273 92.8267 283.372 99.6891 323.244 89.4095C326.368 88.6046 390.305 82.7069 401.55 36.4047C412.797 -9.90486 360.542 -33.4285 312.089 -10.5834C263.636 12.2617 250.769 45.2127 247.567 77.1767C243.023 122.515 269.767 160.019 292.93 187.315C394.007 306.405 505.649 323.842 637.012 415.673C682.143 447.219 743.576 497.317 806.096 575.44" 
            stroke="#7E5AFB" 
            strokeWidth="32" 
            strokeMiterlimit="10"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { 
                pathLength: 1, 
                opacity: 1,
                transition: {
                  pathLength: { duration: 3, ease: "easeInOut" },
                  opacity: { duration: 0.5 }
                }
              }
            }}
          />
        </motion.svg>
      </motion.div>

      {/* Main content con animaciones */}
      <motion.div 
        className="relative z-10 px-[5%] py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto">
          {/* Header section con animación creativa */}
          <motion.div 
            className="mb-12 md:mb-16"
            variants={headerVariants}
          >
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.span 
                className="text-constrast text-sm font-medium tracking-[8%] uppercase"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                {service?.name}
              </motion.span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl max-w-lg md:text-6xl font-medium text-neutral-dark mb-4"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <TextWithHighlight text={service?.title} color="bg-neutral-dark font-semibold" />
            </motion.h2>
            
            <motion.p 
              className="text-neutral-light text-base max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {service?.description}
            </motion.p>
          </motion.div>

          {/* Services grid con animaciones espectaculares */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {service?.benefits.map((serviceItem, index) => (
              <motion.div
                key={index}
                className="bg-secondary rounded-3xl p-8 group cursor-pointer relative overflow-hidden transition-all duration-300 hover:bg-constrast hover:shadow-2xl hover:shadow-constrast/25"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  rotateY: 5,
                  transition: { 
                    duration: 0.2,
                    type: "spring",
                    stiffness: 400
                  }
                }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Efecto de onda en hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-constrast/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -100 }}
                  animate={{ x: 100 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Icon con animación espectacular sin rotación */}
                <motion.div 
                  className="w-12 h-12 bg-constrast rounded-full flex items-center justify-center text-white mb-6 relative z-10 group-hover:bg-secondary group-hover:shadow-lg transition-all duration-300"
                  variants={iconVariants}
                  whileHover={{ 
                    scale: 1.2,
                    transition: { duration: 0.3 }
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(126, 90, 251, 0.4)",
                      "0 0 0 10px rgba(126, 90, 251, 0)",
                      "0 0 0 0 rgba(126, 90, 251, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <motion.img
                    src={`/api/service/media/${serviceItem?.image}`}
                    alt={serviceItem?.name}
                    className="w-6 h-6 object-cover rounded-xl group-hover:brightness-0 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.div>

                {/* Title con animación de escritura mejorada */}
                <motion.h3 
                  className="text-neutral-dark font-medium text-xl mb-4 leading-tight relative z-10 group-hover:text-white transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 1 + index * 0.1,
                    duration: 0.5,
                    type: "spring"
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  {serviceItem.title}
                </motion.h3>

                {/* Description con efecto de aparición gradual mejorada - BLANCO en hover */}
                <motion.p 
                  className="text-neutral-light text-base leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 1.2 + index * 0.1,
                    duration: 0.6
                  }}
                >
                  {serviceItem.description}
                </motion.p>

                {/* Efecto de partículas en hover mejorado */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-secondary rounded-full group-hover:bg-white/60"
                      style={{
                        left: `${15 + i * 20}%`,
                        top: `${15 + i * 15}%`
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        y: [0, -30, 0],
                        x: [0, Math.sin(i) * 10, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>

                {/* Brillo en las esquinas */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-3xl"
                />
                
                {/* Efecto de resplandor inferior */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
    <EmpresasSection banner_slider={banner_slider} />
    </>
  );
}

export default HeroServiceSection;