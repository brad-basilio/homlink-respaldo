import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TextWithHighlight from "../../../Utils/TextWithHighlight";
import { motion } from 'framer-motion';

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

const AboutSeccionWhy = ({ data, beneficios_clave, core_values, banner_why }) => {

  // Variantes de animación ultra-creativas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const leftColumnVariants = {
    hidden: { 
      opacity: 0, 
      x: -100,
      rotateY: -30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  const rightColumnVariants = {
    hidden: { 
      opacity: 0, 
      x: 100,
      rotateY: 30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        delay: 0.3
      }
    }
  };

  const benefitVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const bannerVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.6
      }
    }
  };

  const beneficiosArray = beneficios_clave ? beneficios_clave?.description.split(',').map(item => item.trim()) : [];
  
  return (
    <motion.div 
      className="w-full bg-neutral-dark px-[5%] py-20 font-paragraph text-white relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Partículas de fondo animadas */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-secondary/20 rounded-full"
          style={{
            top: `${10 + (i * 7)}%`,
            left: `${5 + (i * 8)}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: 3 + (i * 0.2),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Gradiente animado de fondo */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(circle at 20% 80%, #7E5AFB 0%, transparent 50%), radial-gradient(circle at 80% 20%, #BBFF52 0%, transparent 50%)'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.section 
        className="flex flex-col lg:flex-row gap-10 items-center relative z-10"
        variants={containerVariants}
      >
        {/* Columna izquierda */}
        <motion.div 
          className="flex-1 max-w-2xl"
          variants={leftColumnVariants}
          style={{ perspective: '1000px' }}
        >
          <motion.div 
            className="flex items-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {/* <div className=" mr-2">
              <span>
                <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.50225 0C5.95566 0 4.69727 1.2584 4.69727 2.80499C4.69727 4.35158 5.95566 5.60998 7.50225 5.60998C9.04885 5.60998 10.3072 4.35158 10.3072 2.80499C10.3072 1.2584 9.04885 0 7.50225 0Z" fill="#D62828" />
                  <path d="M7.50112 24.0025C3.65842 24.0025 0.759766 22.4639 0.759766 20.4219C0.759766 19.9629 1.13269 19.59 1.59168 19.59C2.05066 19.59 2.42359 19.9629 2.42359 20.4219C2.42359 21.203 4.40166 22.3387 7.49981 22.3387C10.5993 22.3387 12.576 21.2043 12.576 20.4219C12.576 19.8743 12.4874 19.3657 12.3048 18.8689C12.147 18.4373 12.3674 17.9601 12.799 17.801C13.2306 17.6432 13.7092 17.8636 13.8669 18.2952C14.1147 18.9693 14.2399 19.6839 14.2399 20.4206C14.2425 22.4639 11.3451 24.0025 7.50112 24.0025Z" fill="#D62828" />
                  <path d="M11.4896 21.804C12.3046 21.4414 12.7754 20.9968 12.8132 20.6225C5.70098 16.9581 5.32021 11.2634 5.32021 10.1015C5.32021 9.64249 4.94725 9.26953 4.48823 9.26953C4.02921 9.26953 3.65625 9.64249 3.65625 10.1015C3.65625 11.4082 4.06181 17.6884 11.4896 21.804Z" fill="#D62828" />
                  <path d="M7.49991 6.25781C5.37954 6.25781 3.6543 7.98306 3.6543 10.1034C3.6543 10.5624 4.02725 10.9354 4.48627 10.9354C4.9453 10.9354 5.31825 10.5624 5.31825 10.1034C5.31825 8.9011 6.29628 7.92177 7.49991 7.92177C8.70353 7.92177 9.68156 8.8998 9.68156 10.1034C9.68156 10.9432 8.14671 11.9108 6.66272 12.8458C6.33019 13.0558 5.98722 13.2709 5.64296 13.4965C5.81248 13.9855 6.03026 14.5059 6.31454 15.047C6.72531 14.7732 7.1426 14.5111 7.55077 14.2542C9.58768 12.971 11.3468 11.8626 11.3468 10.1034C11.3455 7.98306 9.62158 6.25781 7.49991 6.25781Z" fill="#D62828" />
                  <path d="M4.23503 14.4766C2.36765 15.8954 0.759766 17.7158 0.759766 20.4191C0.759766 20.8781 1.13272 21.251 1.59174 21.251C2.05076 21.251 2.42372 20.8781 2.42372 20.4191C2.42372 18.5465 3.53085 17.1707 4.95486 16.0271C4.66406 15.4937 4.42673 14.9734 4.23503 14.4766Z" fill="#D62828" />
                </svg>

              </span>
            </div> */}
            <motion.h3 
              className="uppercase text-white text-sm font-medium"
              whileHover={{ 
                scale: 1.05,
                color: "#BBFF52",
                transition: { duration: 0.2 }
              }}
            >
              ¿Por qué elegirnos?
            </motion.h3>
          </motion.div>

          <motion.h2 
            className="text-4xl lg:text-[60px] font-medium mb-6 leading-[94%] max-w-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <TextWithHighlight text={data?.title} color="bg-constrast font-semibold" />
          </motion.h2>
          
          <motion.p 
            className="text-white text-base mb-6 max-w-xl whitespace-pre-line" 
            dangerouslySetInnerHTML={{ __html: data?.description }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true }}
          />
          
          {/* Lista de checks */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            viewport={{ once: true }}
          >
            {beneficiosArray.map((beneficio, index) => (
              <motion.div 
                key={index}
                className="flex items-start gap-3 group"
                variants={benefitVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: 1.6 + (index * 0.1) }}
                viewport={{ once: true }}
                whileHover={{ 
                  x: 10,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.span 
                  className=""
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.6 }
                  }}
                >
                  <motion.svg 
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.8 + (index * 0.1),
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.path 
                      d="M8 12.5L10.5 15L16 9" 
                      stroke="#BCFF52" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 2 + (index * 0.1),
                        ease: "easeInOut"
                      }}
                      viewport={{ once: true }}
                    />
                  </motion.svg>
                </motion.span>
                <motion.span 
                  className="text-white text-base group-hover:text-secondary transition-colors duration-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.9 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  {beneficio}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Columna derecha: imagen */}
        <motion.div 
          className="flex-1 w-full flex items-center justify-center"
          variants={rightColumnVariants}
          style={{ perspective: '1000px' }}
        >
          <motion.div 
            className="rounded-2xl overflow-hidden w-full relative"
            whileHover={{ 
              scale: 1.05,
             
              transition: { duration: 0.6 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Efectos de brillo en la imagen */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/30 to-transparent -skew-x-12 opacity-0"
              animate={{
                x: ['-100%', '200%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
              style={{ zIndex: 10 }}
            />
            
          
            
            <motion.img
              src={`/api/landing_home/media/${data?.image}`}
              alt={data?.title}
              className="w-full h-[420px] object-cover rounded-2xl relative z-0"
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            
            />
            
            {/* Partículas flotantes alrededor de la imagen */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-secondary/40 rounded-full"
                style={{
                  top: `${15 + (i * 10)}%`,
                  left: `${-5 + (i % 2) * 110}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: 2.5 + (i * 0.3),
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
      {/* Beneficios destacados - Swiper en mobile, grid en desktop */}
      <motion.div 
        className="w-full pt-10"
        variants={bannerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="relative mt-16 w-full px-16 rounded-[56px] bg-constrast flex flex-col md:flex-row items-center py-10 min-h-[380px] "
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.6 }
          }}
          style={{
            background: 'linear-gradient(135deg, #7E5AFB 0%, #9B7DFF 50%, #7E5AFB 100%)',
            boxShadow: '0 25px 50px rgba(126, 90, 251, 0.3)'
          }}
        >
          {/* Fondo decorativo animado */}
          <motion.div 
            className="absolute h-full w-auto right-0 z-0 overflow-hidden rounded-[56px]"
          
           
          >
            <motion.svg 
              className="z-0" width="726" height="406" viewBox="0 0 726 406" fill="none" xmlns="http://www.w3.org/2000/svg"
              animate={{
                rotate: [0, 5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.path 
                d="M106.632 475.609C46.3026 412.336 8.96465 333.732 1.57527 254.167C-10.6896 86.2005 66.6131 -49.7434 208.283 -110.322C347.381 -169.827 511.454 -135.723 616.571 -25.4768C654.009 13.7878 683.587 61.4665 704.543 116.446L705.068 117.939C716.587 152.177 748.969 292.684 697.569 353.65C678.758 375.879 651.264 385.231 620.072 380.174L617.905 379.787C601.122 376.014 586.028 367.412 574.161 354.967C554.638 334.491 546.306 305.952 551.763 278.674C566.519 214.478 545.681 143.75 497.371 93.0833C473.867 68.4325 445.015 49.8011 413.966 39.3954L412.114 38.7093C357.011 16.7474 296.319 26.4814 245.657 65.4353C190.689 107.729 161.557 174.136 169.673 238.906C173.866 282.275 195.191 326.327 228.111 360.854C271.521 406.381 327.405 427.905 377.546 418.42C405.847 412.744 435.433 422.245 456.027 443.844C466.975 455.326 474.554 469.561 478.009 484.97C483.675 509.613 478.407 534.103 463.043 553.505C446.339 574.643 419.424 587.43 390.488 588.04C291.608 600.308 185.644 558.319 106.787 475.614L106.632 475.609Z" 
                fill="url(#paint0_linear_16_2457)" 
                fillOpacity="0.6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 3, delay: 1 }}
              />
              <defs>
                <linearGradient id="paint0_linear_16_2457" x1="605.608" y1="-36.9748" x2="90.2411" y2="458.384" gradientUnits="userSpaceOnUse">
                  <stop offset="0.483986" stopColor="#7E5AFB" />
                  <stop offset="1" stopColor="#C7B7FF" />
                </linearGradient>
              </defs>
            </motion.svg>

            <motion.svg 
              className="absolute top-0 right-0 z-[999]" width="370" height="406" viewBox="0 0 370 406" fill="none" xmlns="http://www.w3.org/2000/svg"
              animate={{
                rotate: [0, -3, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
                delay: 2
              }}
            >
              <motion.path 
                d="M62.0611 55.3248C99.5069 13.3718 147.971 -14.6335 198.601 -23.4874C305.657 -40.0404 396.815 2.48865 442.984 90.1853C488.331 176.288 474.954 283.246 409.708 356.345C386.471 382.379 357.433 403.809 323.267 420.089L322.337 420.503C300.981 429.659 212.572 457.69 170.825 427.889C155.6 416.978 148.182 399.835 149.81 379.575L149.946 378.166C151.497 367.21 156.231 357.088 163.597 348.836C175.714 335.259 193.581 328.441 211.352 330.528C253.275 336.668 297.543 319.648 327.528 286.054C342.117 269.71 352.569 250.247 357.635 229.802L357.979 228.579C369.209 192.114 359.828 153.706 332.232 123.24C302.272 90.1852 258.189 74.9433 217.082 83.4974C189.493 88.4295 162.353 104.38 141.92 127.274C114.976 157.461 104.067 194.403 112.742 226.06C117.846 243.911 113.285 263.372 100.502 277.693C93.7067 285.306 84.9724 290.902 75.2721 293.914C59.7655 298.821 43.7911 296.711 30.5573 287.865C16.1401 278.249 6.54982 261.654 4.66177 243.133C-8.31942 180.371 13.1198 110.261 62.0655 55.4244L62.0611 55.3248Z" 
                fill="url(#paint0_linear_20_827)" 
                fillOpacity="0.6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 3, delay: 1.5 }}
              />
              <defs>
                <linearGradient id="paint0_linear_20_827" x1="416.513" y1="348.721" x2="72.2565" y2="43.9248" gradientUnits="userSpaceOnUse">
                  <stop offset="0.483986" stopColor="#7E5AFB" />
                  <stop offset="1" stopColor="#C7B7FF" />
                </linearGradient>
              </defs>
            </motion.svg>
          </motion.div>

          {/* Partículas flotantes en el banner */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                top: `${20 + (i * 4)}%`,
                left: `${10 + (i * 5)}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2 + (i * 0.1),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Columna izquierda: texto */}
          <motion.div 
            className="flex-1 z-10 flex flex-col justify-center items-start gap-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="uppercase text-white tracking-widest text-2xl font-medium mb-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              {banner_why?.name}
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-[46px] font-medium !leading-[50px] text-white mb-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <TextWithHighlight text={banner_why?.description} color='bg-secondary font-semibold' />
            </motion.h2>
            {/* <div className="flex gap-2 mt-6 md:mt-10">
                        <span className="inline-block w-4 h-4 rounded-full bg-white border-2 border-white"></span>
                        <span className="inline-block w-4 h-4 rounded-full border-2 border-white"></span>
                    </div> */}
          </motion.div>

          {/* Columna central: imagen */}
          <motion.div 
            className="z-10 flex-1 flex justify-center items-end"
           
          >
            <motion.img 
              src={`/api/banners/media/${banner_why?.image}`} 
              alt={banner_why?.name} 
              className="h-[500px] object-cover absolute bottom-0 select-none" 
              draggable="false"
             
             
          
            />
          </motion.div>

          {/* Columna derecha: mensaje y WhatsApp */}
          <motion.div 
            className="z-10 min-w-max flex flex-col gap-10 items-end pr-8 justify-end md:ml-8 mt-8 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="text-white relative text-2xl text-end mb-2"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <TextWithHighlight text={banner_why?.button_text || "¡Quiero cambiar!"} color='bg-white italic' split_coma />

              <motion.div 
                className="absolute -right-10 overflow-hidden"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.svg 
                  width="53" height="77" viewBox="0 0 53 77" fill="none" xmlns="http://www.w3.org/2000/svg"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  viewport={{ once: true }}
                >
                  <g clipPath="url(#clip0_98_4024)">
                    <motion.path 
                      d="M25.5583 3.21705C45.6398 28.3746 40.6134 62.1151 24.5644 73.5194" 
                      stroke="#FAF3E1" 
                      strokeWidth="1.50408" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 2 }}
                      viewport={{ once: true }}
                    />
                    <motion.path 
                      d="M25.8343 66.3476L24.5626 73.5192L31.7461 72.4369" 
                      stroke="#FAF3E1" 
                      strokeWidth="1.50408" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 2.5 }}
                      viewport={{ once: true }}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_98_4024">
                      <rect width="69.751" height="30.5232" fill="white" transform="translate(29.373 0.5) rotate(70.1997)" />
                    </clipPath>
                  </defs>
                </motion.svg>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
              viewport={{ once: true }}
            >
              <motion.a 
                href="https://wa.me/51999999999" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span 
                  className="z-10 relative"
                  animate={{
                    scale: [1, 1.05, 1],
                    filter: [
                      "drop-shadow(0 0 0px rgba(188, 255, 82, 0))",
                      "drop-shadow(0 0 20px rgba(188, 255, 82, 0.8))",
                      "drop-shadow(0 0 0px rgba(188, 255, 82, 0))"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.svg 
                    width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                    whileHover={{
                      rotate: 360,
                      transition: { duration: 0.8 }
                    }}
                  >
                    <motion.circle 
                      cx="49.567" cy="49.567" r="49.567" 
                      transform="matrix(1 0 0 -1 0.587891 99.5674)" 
                      fill="#D9D9D9" 
                      fillOpacity="0.4"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.4, 0.6, 0.4]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.path 
                      d="M87.3558 50.1493C87.3558 29.521 70.6333 12.7985 50.005 12.7985C29.3768 12.7985 12.6543 29.521 12.6543 50.1493C12.6543 70.7775 29.3768 87.5 50.005 87.5C70.6333 87.5 87.3558 70.7775 87.3558 50.1493Z" 
                      fill="#BCFF52"
                      animate={{
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.path 
                      d="M57.4189 37.2596C58.2998 36.3787 58.7402 35.9382 59.2282 35.7276C59.9312 35.4241 60.7282 35.4241 61.4312 35.7276C61.919 35.9382 62.3596 36.3787 63.2404 37.2596C64.1213 38.1405 64.5619 38.5809 64.7725 39.0689C65.0759 39.7719 65.0759 40.5689 64.7725 41.2718C64.5619 41.7598 64.1213 42.2002 63.2404 43.0811L55.7081 50.6136C53.8523 52.4694 52.9244 53.3973 51.7622 53.947C50.6 54.4968 49.2941 54.6256 46.6823 54.8833L45.5 55L45.6167 53.8177C45.8744 51.2059 46.0032 49.9 46.553 48.7378C47.1028 47.5756 48.0307 46.6477 49.8865 44.792L57.4189 37.2596Z" 
                      stroke="#222222" 
                      strokeWidth="2.25" 
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    <motion.path 
                      d="M41 55H37.625C36.1753 55 35 56.1753 35 57.625C35 59.0747 36.1753 60.25 37.625 60.25H51.875C53.3247 60.25 54.5 61.4253 54.5 62.875C54.5 64.3247 53.3247 65.5 51.875 65.5H48.5" 
                      stroke="#222222" 
                      strokeWidth="2.25" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                  </motion.svg>
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AboutSeccionWhy;
