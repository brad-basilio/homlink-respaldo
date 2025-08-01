import React from 'react';
import { motion } from 'framer-motion';

const AboutSeccionEstiloTrabajo = ({ data, work_style = [] }) => {
    // Datos de prueba mientras no lleguen de la DB
    const defaultWorkStyle = [
        {
            title: "TechCorp alcanza +50% de ocupación con optimización SEO",
            description: "Aplicamos estrategias de visibilidad para incrementar reservas orgánicas desde Google.",
            image: "/images/work-style-1.jpg", // Imagen de código/tecnología
            position: "right" // imagen a la derecha
        },
        {
            title: "FashionWave aumenta su presencia con campañas creativas",
            description: "Mejoramos sus anuncios con contenido visual y estrategia en redes, logrando una mayor tasa de conversión.",
            image: "/images/work-style-2.jpg", // Imagen de mujer profesional
            position: "left" // imagen a la izquierda
        },
        {
            title: "UrbanNest renueva su imagen y mejora reconocimiento",
            description: "Desarrollamos nueva identidad visual y rediseñamos publicaciones, atrayendo a un público más premium.",
            image: "/images/work-style-3.jpg", // Imagen de pareja feliz
            position: "right" // imagen a la derecha
        }
    ];

    // Usar datos de la DB si existen, sino usar datos de prueba
    const workStyleData = work_style.length > 0 ? work_style : defaultWorkStyle;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 60
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8,
            x: 50
        },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const textVariants = {
        hidden: { 
            opacity: 0, 
            x: -50
        },
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

    return (
        <motion.div
            className="relative overflow-hidden bg-gray-50 py-16 px-[5%] font-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <motion.div
                className="relative z-10 max-w-7xl mx-auto"
                variants={containerVariants}
            >
                {/* Título principal */}
                <motion.div
                    className="text-center mb-16"
                    variants={itemVariants}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        {data?.title || "Nuestro estilo de trabajo"}
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {data?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat, nisl et consectetur fringilla, metus lectus tempus nunc."}
                    </p>
                </motion.div>

                {/* Items de estilo de trabajo */}
                <div className="space-y-20">
                    {workStyleData.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col ${
                                item.position === 'left' || index % 2 === 1 
                                    ? 'lg:flex-row-reverse' 
                                    : 'lg:flex-row'
                            } items-center gap-12 lg:gap-16`}
                            variants={itemVariants}
                        >
                            {/* Contenido de texto */}
                            <motion.div
                                className="flex-1 lg:max-w-lg"
                                variants={textVariants}
                            >
                                <motion.h3
                                    className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight"
                                    whileHover={{
                                        color: "#ef4444",
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    {item?.name}
                                </motion.h3>
                                
                                <motion.p
                                    className="text-gray-600 text-lg leading-relaxed"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    {item?.description}
                                </motion.p>

                                {/* Línea decorativa */}
                                <motion.div
                                    className="w-16 h-1 bg-secondary mt-6"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 64 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                />
                            </motion.div>

                            {/* Imagen */}
                            <motion.div
                                className="flex-1 relative group"
                                variants={imageVariants}
                            >
                                <motion.div
                                    className="relative overflow-hidden rounded-2xl shadow-2xl"
                                    whileHover={{
                                        scale: 1.02,
                                        rotateY: item.position === 'left' ? -2 : 2,
                                        transition: { duration: 0.4 }
                                    }}
                                >
                                    {/* Overlay con gradiente */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                    
                                    <motion.img
                                        src={`/api/speciality/media/${item.image}`}
                                        alt={item.title}
                                        className="w-full h-[400px] lg:h-[450px] object-cover"
                                        initial={{ scale: 1.1 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1 }}
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.4 }
                                        }}
                                        onError={(e) => {
                                            // Fallback para imágenes que no existen
                                            e.target.src = `https://via.placeholder.com/600x450/4F46E5/FFFFFF?text=${encodeURIComponent(item.title.substring(0, 20))}`;
                                        }}
                                    />

                                    {/* Efecto de brillo */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 0.8 }}
                                    />
                                </motion.div>

                                {/* Decoración flotante */}
                                <motion.div
                                    className={`absolute -z-10 w-72 h-72 bg-gradient-to-br from-red-100 to-orange-100 rounded-full blur-3xl opacity-20 ${
                                        item.position === 'left' ? '-left-20' : '-right-20'
                                    } -top-20`}
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.2, 0.3, 0.2]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Llamada a la acción final */}
                {data?.link && (
                    <motion.div
                        className="text-center mt-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <motion.a
                            href={data.link}
                            className="inline-flex items-center bg-secondary hover:bg-red-600 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 15px 30px rgba(239, 68, 68, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Ver más casos de éxito
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.a>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default AboutSeccionEstiloTrabajo;