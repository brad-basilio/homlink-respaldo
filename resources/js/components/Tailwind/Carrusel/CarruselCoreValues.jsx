import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useRef, useState } from "react";
import { adjustTextColor } from "../../../Functions/adjustTextColor";
import { Autoplay } from "swiper/modules";
import TextWithHighlight from "../../../Utils/TextWithHighlight";
import { motion } from 'framer-motion';

// Estilos CSS para line-clamp y Swiper móvil
const lineClampStyles = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Estilos optimizados para el Swiper móvil */
  .mobile-core-values-swiper {
    padding-bottom: 30px !important;
  }
  
  .mobile-core-values-swiper .swiper-slide {
    transition: all 0.3s ease;
    height: auto !important;
    max-width: 90% !important;
  }
  
  .mobile-core-values-swiper .swiper-pagination {
    bottom: 0 !important;
  }
  
  .mobile-core-values-swiper .swiper-pagination-bullet {
    background-color: #7E5AFB;
    opacity: 0.5;
    width: 8px;
    height: 8px;
  }
  
  .mobile-core-values-swiper .swiper-pagination-bullet-active {
    background-color: #7E5AFB;
    opacity: 1;
  }
`;

// Inyectar estilos
if (typeof document !== 'undefined' && !document.getElementById('line-clamp-styles')) {
    const style = document.createElement('style');
    style.id = 'line-clamp-styles';
    style.textContent = lineClampStyles;
    document.head.appendChild(style);
}

const CarruselCoreValues = ({ items, data, correlative = "core_value" }) => {

    const swiperRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [maxHeight, setMaxHeight] = useState(0);
    // Detección de mobile
    const [isMobile, setIsMobile] = useState(false);
    
    // Efecto para detectar si es mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Verificar inicialmente y cada vez que cambia el tamaño de ventana
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Variantes de animación creativas (iguales a MoreServiceSection)
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
            y: 50
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            y: 0,
            transition: {
                pathLength: { duration: 3, ease: "easeInOut" },
                opacity: { duration: 0.5 },
                y: { duration: 0.8 }
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

    // Adjust button colors


    // Handle image loading and height calculation
    const handleImagesLoad = () => {
        const imageElements = document.querySelectorAll('.brand-logo');
        let loadedImages = 0;
        let maxImageHeight = 0;

        imageElements.forEach(img => {
            if (img.complete) {
                loadedImages++;
                maxImageHeight = Math.max(maxImageHeight, img.naturalHeight);
            }
        });

        if (loadedImages === imageElements.length) {
            setMaxHeight(maxImageHeight);
            setImagesLoaded(true);
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div 
                className={`bg-secondary relative ${isMobile ? 'pb-10' : 'pt-10'} overflow-hidden`}
                variants={containerVariants}
            >
                <motion.div 
                    className="absolute bottom-0 left-0 w-full"
                    initial="hidden"
                    animate="visible"
                >
                    <motion.svg 
                        width="333" 
                        height="293" 
                        viewBox="0 0 333 293" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="hidden md:block"
                    >
                        <motion.path 
                            d="M330.525 318.574C314.682 316.83 291.576 312.754 265.567 302.24C219.832 283.753 191.981 256.215 172.923 236.988C150.127 213.991 132.157 195.861 122.148 165.441C121.363 163.058 98.381 118.725 123.976 91.9092C149.575 65.0891 186.916 89.413 192.3 130.73C197.685 172.047 181.513 194.315 161.93 209.841C134.152 231.865 98.3692 230.116 70.7721 226.421C-49.6372 210.291 -111.71 138.187 -226.987 90.777C-288.72 65.3884 -440.394 -13.3762 -532 26.4755" 
                            stroke="#7E5AFB" 
                            strokeWidth="29.8691" 
                            strokeMiterlimit="10"
                            variants={svgVariants}
                        />
                    </motion.svg>
                    
                    <motion.svg 
                        width="200" 
                        height="180" 
                        viewBox="0 0 333 293" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="md:hidden"
                    >
                        <motion.path 
                            d="M330.525 318.574C314.682 316.83 291.576 312.754 265.567 302.24C219.832 283.753 191.981 256.215 172.923 236.988C150.127 213.991 132.157 195.861 122.148 165.441C121.363 163.058 98.381 118.725 123.976 91.9092C149.575 65.0891 186.916 89.413 192.3 130.73C197.685 172.047 181.513 194.315 161.93 209.841C134.152 231.865 98.3692 230.116 70.7721 226.421C-49.6372 210.291 -111.71 138.187 -226.987 90.777C-288.72 65.3884 -440.394 -13.3762 -532 26.4755" 
                            stroke="#7E5AFB" 
                            strokeWidth="29.8691" 
                            strokeMiterlimit="10"
                            variants={svgVariants}
                        />
                    </motion.svg>
                </motion.div>

                <div className="mx-auto px-[5%] 2xl:pl-[5%]">
                    {/* VERSIÓN DESKTOP */}
                    {!isMobile && (
                    <motion.div 
                        className="relative flex flex-col lg:flex-row items-center justify-center"
                        variants={containerVariants}
                    >
                        {/* Left side - Image */}
                        <motion.div 
                            className="w-[800px] overflow-hidden h-[650px] flex items-end"
                            variants={leftSideVariants}
                        >
                            <motion.img 
                                src={`/api/landing_home/media/${data?.image}`} 
                                alt={data?.title} 
                                className="h-[650px] object-cover w-auto"
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

                        {/* Right side - Content */}
                        <motion.div 
                            className="max-w-3xl"
                            variants={rightSideVariants}
                        >
                            <motion.div 
                                className="flex items-center mb-4"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <motion.h3 
                                    className="uppercase text-neutral-dark text-sm font-medium"
                                    animate={{
                                        opacity: [0.7, 1, 0.7]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                >
                                    ¿Por qué elegir Cambia FX?
                                </motion.h3>
                            </motion.div>

                            <motion.h2 
                                className="text-4xl lg:text-[60px] font-medium mb-6 leading-[94%] max-w-lg"
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
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
                                <TextWithHighlight text={data?.title} color="bg-neutral-dark !font-bold" />
                            </motion.h2>

                            <motion.p 
                                className="text-neutral-light text-lg mb-6 max-w-xl whitespace-pre-line"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                {data?.description}
                            </motion.p>

                            {/* Swiper mejorado con animaciones espectaculares */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1 }}
                            >
                                <Swiper
                                    modules={[Autoplay]}
                                    autoplay={{
                                        delay: 3500,
                                        disableOnInteraction: false,
                                    }}
                                    loop={true}
                                    spaceBetween={30}
                                    slidesPerView={1.5}
                                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                                    breakpoints={{
                                        640: { slidesPerView: 2.3 },
                                        1024: { slidesPerView: 2.3 },
                                    }}
                                    className="w-full !flex !justify-between !py-10 !px-5"
                                >
                                    {items.map((value, index) => (
                                        <SwiperSlide key={index}>
                                            <motion.div 
                                                className="w-full h-[220px] flex bg-primary rounded-3xl p-6 flex-col items-start group cursor-pointer relative transition-all duration-300 hover:bg-constrast hover:shadow-2xl hover:shadow-constrast/25"
                                                variants={cardVariants}
                                                whileHover={{ 
                                                    scale: 1.02,
                                                    y: -5,
                                                    rotateY: 2,
                                                    transition: { 
                                                        duration: 0.2,
                                                        type: "spring",
                                                        stiffness: 400
                                                    }
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                                style={{ 
                                                    transformStyle: "preserve-3d",
                                                    perspective: "1000px",
                                                    transformOrigin: "center center"
                                                }}
                                            >
                                               

                                                {/* Icon con animación espectacular */}
                                                <motion.div 
                                                    className="bg-constrast rounded-full p-3 mb-4 relative z-10 group-hover:bg-secondary group-hover:shadow-lg transition-all duration-300 flex-shrink-0"
                                                    variants={iconVariants}
                                                    whileHover={{ 
                                                        scale: 1.15,
                                                        transition: { duration: 0.3 }
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
                                                        delay: index * 0.5
                                                    }}
                                                >
                                                    <motion.img
                                                        src={`/api/${correlative}/media/${value?.image}`}
                                                        alt={value?.name}
                                                        className="w-6 h-6 object-cover rounded-xl group-hover:brightness-0 transition-all duration-300"
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                                                        whileHover={{ scale: 1.1 }}
                                                    />
                                                </motion.div>

                                                {/* Title con animación */}
                                                <motion.h3 
                                                    className="text-neutral-dark text-lg font-medium mb-3 leading-tight relative z-10 group-hover:text-white transition-colors duration-300 flex-grow overflow-hidden"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ 
                                                        delay: 1.4 + index * 0.1,
                                                        duration: 0.5,
                                                        type: "spring"
                                                    }}
                                                    whileHover={{
                                                        scale: 1.01,
                                                        transition: { duration: 0.2 }
                                                    }}
                                                    style={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    {value?.name}
                                                </motion.h3>

                                                {/* Description con animación */}
                                                <motion.p 
                                                    className="text-neutral-light text-sm font-light leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ 
                                                        delay: 1.6 + index * 0.1,
                                                        duration: 0.6
                                                    }}
                                                    style={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    {value?.description}
                                                </motion.p>

                                                {/* Efecto de partículas en hover */}
                                                <motion.div
                                                    className="absolute inset-0 pointer-events-none z-0"
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{ opacity: 1 }}
                                                >
                                                    {[...Array(4)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="absolute w-1 h-1 bg-secondary rounded-full group-hover:bg-white/60"
                                                            style={{
                                                                left: `${20 + i * 20}%`,
                                                                top: `${20 + i * 15}%`
                                                            }}
                                                            animate={{
                                                                scale: [0, 1, 0],
                                                                opacity: [0, 1, 0],
                                                                y: [0, -20, 0],
                                                                x: [0, Math.sin(i) * 6, 0]
                                                            }}
                                                            transition={{
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                delay: i * 0.4,
                                                                ease: "easeInOut"
                                                            }}
                                                        />
                                                    ))}
                                                </motion.div>

                                                {/* Brillo en las esquinas */}
                                                <motion.div
                                                    className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-3xl"
                                                />
                                                
                                                {/* Efecto de resplandor inferior */}
                                                <motion.div
                                                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl"
                                                />
                                            </motion.div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    )}

                    {/* VERSIÓN MOBILE - OPTIMIZADA */}
                    {isMobile && (
                        <div className="relative pt-4 pb-16">
                            {/* Título para versión mobile */}
                            <div className="text-center mb-5 px-4">
                                <h3 className="uppercase text-neutral-dark text-xs font-medium mb-2">
                                    ¿Por qué elegir Cambia FX?
                                </h3>
                                
                                <h2 className="text-3xl font-medium mb-3">
                                    <TextWithHighlight text={data?.title} color="bg-neutral-dark font-semibold" />
                                </h2>
                                <p className="text-neutral-light text-sm">
                                    {data?.description}
                                </p>
                            </div>
                            
                            {/* Swiper mobile simplificado */}
                            <div className="w-full pb-6">
                                <Swiper
                                    modules={[Autoplay, Pagination]}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true
                                    }}
                                    loop={true}
                                    spaceBetween={12}
                                    slidesPerView={1.3}
                                    centeredSlides={false}
                                    className="mobile-core-values-swiper"
                                >
                                    {items.map((value, index) => (
                                        <SwiperSlide key={index} className="!h-[140px]">
                                            <div className="bg-primary w-full min-h-[160px] rounded-xl p-4 flex flex-col shadow-md">
                                                {/* Icono */}
                                                <div className="bg-constrast rounded-lg p-2 mb-3 w-fit">
                                                    <img
                                                        src={`/api/${correlative}/media/${value?.image}`}
                                                        alt={value?.name}
                                                        className="w-5 h-5 object-cover"
                                                    />
                                                </div>
                                                
                                                {/* Título */}
                                                <h3 className="text-neutral-dark text-base font-semibold mb-2 line-clamp-2">
                                                    {value?.name}
                                                </h3>
                                                
                                                {/* Descripción */}
                                                <p className="text-neutral-light text-xs line-clamp-3 mb-0">
                                                    {value?.description}
                                                </p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CarruselCoreValues;
