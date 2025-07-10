import React from 'react';
import TextWithHighlight from '../../../Utils/TextWithHighlight';
import { motion } from 'framer-motion';

const HomeSeccionNosotros = ({ data, strengths, button_about = true }) => {
    
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
        hidden: { opacity: 0, x: -100, scale: 0.9 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const rightSideVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2
            }
        }
    };

    const svgVariants = {
        hidden: { 
            opacity: 0, 
            pathLength: 0,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            scale: 1,
            transition: {
                pathLength: { duration: 4, ease: "easeInOut" },
                opacity: { duration: 0.8 },
                scale: { duration: 1, ease: "easeOut" }
            }
        }
    };

    const strengthVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
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
            className="relative overflow-hidden bg-primary py-12 md:pt-16 px-[5%] font-title"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Curva decorativa en la parte superior con animación */}
            <motion.div 
                className="absolute top-0 left-0 w-full h-24"
                initial="hidden"
                animate="visible"
            >
                <motion.svg 
                    width="1123" 
                    height="706" 
                    viewBox="0 0 1123 706" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.path 
                        d="M1031.45 920.076C952.402 1062.07 833.456 1171.7 696.286 1228.69C404.875 1343.09 120.917 1280.83 -64.7479 1062.74C-247.089 848.632 -277.027 538.562 -139.286 291.161C-90.2294 203.048 -21.9013 124.248 64.1417 56.7272L66.5026 54.9731C120.931 15.6431 352.502 -119.326 489.074 -61.7013C538.908 -40.5654 570.671 3.08348 578.896 61.2447L579.404 65.3044C581.961 97.1779 575.015 128.717 559.465 156.647C533.883 202.595 487.815 233.125 436.383 238.48C314.283 247.687 200.219 323.684 136.916 437.384C106.118 492.702 88.9544 554.195 87.6041 615.051L87.4079 618.719C78.8082 728.648 129.557 831.02 226.647 899.474C332.04 973.731 465.99 988.824 576.494 938.699C651.172 907.338 717.612 845.19 760.75 767.709C817.632 665.541 825.023 554.467 780.534 470.686C754.851 423.577 755.401 365.817 782.388 317.346C796.733 291.578 817.823 270.274 843.272 255.645C883.893 231.997 930.274 227.842 973.188 244.417C1019.93 262.412 1057.47 303.141 1074.51 354.172C1150.81 522.94 1134.71 734.202 1031.38 919.798L1031.45 920.076Z" 
                        fill="url(#paint0_linear_101_2876)" 
                        fillOpacity="0.8"
                        variants={svgVariants}
                    />
                    <defs>
                        <linearGradient id="paint0_linear_101_2876" x1="-153.652" y1="316.964" x2="1009.92" y2="958.672" gradientUnits="userSpaceOnUse">
                            <stop offset="0.126778" stopColor="#FAF3E1" />
                            <stop offset="1" stopColor="#C7B7FF" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                </motion.svg>
            </motion.div>

            <motion.div 
                className="relative z-10"
                variants={containerVariants}
            >
                <motion.div
                    className="flex flex-col lg:flex-row gap-8 lg:gap-20"
                    style={{ WebkitGap: '2rem' }}
                    variants={containerVariants}
                >
                    {/* Columna izquierda - Imagen */}
                    <motion.div 
                        className="order-1 lg:order-none lg:w-1/2 relative"
                        variants={leftSideVariants}
                    >
                        {/* Imagen principal con efectos espectaculares */}
                        <motion.div
                            className="rounded-3xl relative flex items-center justify-center group"
                            whileHover={{ 
                                scale: 1.01,
                                rotateY: 5,
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
                                src={`/api/landing_home/media/${data?.image}`}
                                alt={data?.title}
                                className="w-full h-full object-cover relative z-0"
                                initial={{ opacity: 0, scale: 1.2 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ 
                                    duration: 1,
                                    delay: 0.5
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.3 }
                                }}
                            />

                        </motion.div>
                    </motion.div>

                    {/* Columna derecha - Contenido */}
                    <motion.div 
                        className="lg:w-1/2 flex flex-col justify-center"
                        variants={rightSideVariants}
                    >
                        {/* Título superior animado */}
                        <motion.div 
                            className="flex items-center mb-4"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <motion.h3 
                                className="uppercase text-constrast text-sm font-medium"
                                animate={{
                                    opacity: [0.7, 1, 0.7]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            >
                                ¿Qué hacemos?
                            </motion.h3>
                        </motion.div>

                        {/* Título principal con animación dramática */}
                        <motion.h2 
                            className="text-4xl lg:text-[60px] font-medium mb-6 leading-[94%]"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ 
                                duration: 0.8, 
                                delay: 0.6,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{ 
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <TextWithHighlight text={data?.title} color='bg-neutral-dark font-semibold' />
                        </motion.h2>

                        {/* Párrafo principal animado */}
                        <motion.p 
                            className="text-neutral-light mb-10 text-lg"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            {data?.description}
                        </motion.p>

                        {/* Bloques de características con animaciones espectaculares */}
                        <motion.div 
                            className="space-y-8 mb-10"
                            variants={containerVariants}
                        >
                            {strengths?.map((strength, index) => (
                                <motion.div 
                                    key={index}
                                    className="flex items-start group cursor-pointer"
                                    variants={strengthVariants}
                                    whileHover={{ 
                                        x: 10,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    {/* Icon con animación espectacular */}
                                    <motion.div 
                                        className="bg-constrast rounded-full p-3 mr-4 relative overflow-hidden"
                                        variants={iconVariants}
                                        whileHover={{ 
                                            scale: 1.1,
                                            rotate: 360,
                                            transition: { duration: 0.5 }
                                        }}
                                        animate={{
                                            boxShadow: [
                                                "0 0 0 0 rgba(126, 90, 251, 0.4)",
                                                "0 0 0 8px rgba(126, 90, 251, 0)",
                                                "0 0 0 0 rgba(126, 90, 251, 0)"
                                            ]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: index * 0.3
                                        }}
                                    >
                                        {/* Efecto de onda en el fondo */}
                                        <motion.div
                                            className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: [1, 1.5, 1] }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />

                                        <motion.img
                                            src={`/api/strength/media/${strength?.image}`}
                                            alt={strength?.title}
                                            className="min-w-6 min-h-6 max-w-6 max-h-6 object-cover rounded-xl relative z-10"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                                            whileHover={{ scale: 1.2 }}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ 
                                            delay: 1.2 + index * 0.1,
                                            duration: 0.5
                                        }}
                                    >
                                        <motion.h4 
                                            className="text-xl font-medium text-neutral-dark mb-2"
                                            whileHover={{
                                                color: "#7E5AFB",
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            {strength?.name}
                                        </motion.h4>
                                        <motion.p 
                                            className="text-neutral-light"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1.4 + index * 0.1 }}
                                        >
                                            {strength?.description}
                                        </motion.p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Botón animado espectacular */}
                        {button_about && (
                            <motion.div 
                                className='w-full'
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.5 }}
                            >
                                <motion.a
                                    href="/nosotros"
                                    className="w-full flex items-center justify-center lg:max-w-max bg-neutral-dark hover:bg-constrast text-white py-3 px-6 rounded-lg transition-all duration-300 relative overflow-hidden group"
                                    whileHover={{ 
                                        scale: 1.05,
                                        boxShadow: "0 10px 25px rgba(126, 90, 251, 0.3)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {/* Efecto de brillo que se mueve */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                    />

                                    <motion.span 
                                        className="font-medium relative z-10"
                                        whileHover={{ x: -5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        Sobre nosotros
                                    </motion.span>
                                    
                                    <motion.svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5 ml-2 relative z-10" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                        whileHover={{ 
                                            x: 5,
                                            rotate: -15
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </motion.svg>
                                </motion.a>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default HomeSeccionNosotros;
