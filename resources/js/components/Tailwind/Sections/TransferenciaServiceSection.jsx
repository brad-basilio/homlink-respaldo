import React from 'react';
import { Layers, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const TransferenciaServiceSection = ({service}) => {
  
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

  const leftSideVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const rightSideVariants = {
    hidden: { opacity: 0, x: 80, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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

  return (
    <motion.div 
      className="min-h-screen bg-neutral-dark px-[5%] py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className=" mx-auto">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          variants={containerVariants}
        >
          {/* Left side - Content and Services */}
          <motion.div variants={leftSideVariants}>
            {/* Header */}
            <motion.div 
              className="mb-8"
              variants={headerVariants}
            >
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.span 
                  className="text-secondary text-sm font-medium tracking-[8%] uppercase"
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
                className="text-3xl md:text-4xl lg:text-[64px] font-medium text-white my-4"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
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
                {service?.title}
              </motion.h2>
              
              <motion.p 
                className="text-white text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {service?.description}
              </motion.p>
            </motion.div>

            {/* Services Grid con animaciones espectaculares */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4"
              variants={containerVariants}
            >
              {service?.benefits.map((serviceItem, index) => (
                <motion.div
                  key={index}
                  className="bg-secondary rounded-3xl p-6 group cursor-pointer relative overflow-hidden transition-all duration-300 hover:bg-constrast hover:shadow-2xl hover:shadow-constrast/25"
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

                  {/* Icon con animación espectacular */}
                  <motion.div 
                    className="w-12 h-12 bg-constrast rounded-full flex items-center justify-center text-white mb-4 relative z-10 group-hover:bg-secondary group-hover:shadow-lg transition-all duration-300"
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
                  
                  {/* Title con animación */}
                  <motion.h3 
                    className="text-neutral-dark font-medium text-xl mb-3 leading-tight relative z-10 group-hover:text-white transition-colors duration-300"
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
                  
                  {/* Description con animación */}
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

                  {/* Efecto de partículas en hover */}
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
          </motion.div>

          {/* Right side - Image Card con animación espectacular */}
          <motion.div 
            className="relative"
            variants={rightSideVariants}
          >
            <motion.div
              className="relative  rounded-3xl"
              whileHover={{ 
                scale: 1.02,
                rotateY: 3,
                transition: { 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300
                }
              }}
              style={{ 
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
           
              <motion.img 
                src={`/api/service/media/${service?.image}`}
                alt='Transferencia FX' 
                className='w-full h-auto object-cover rounded-3xl relative z-0'
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.4
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              />
              
            
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TransferenciaServiceSection;