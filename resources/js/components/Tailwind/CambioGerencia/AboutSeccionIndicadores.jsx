import React from 'react';
import { motion } from 'framer-motion';

const AboutSeccionIndicadores = ({ data, indicators = [] }) => {
    // Datos de prueba mientras no lleguen de la DB
    const defaultIndicators = [
        {
            percentage: "90%",
            description: "Ocupación promedio de nuestros clientes"
        },
        {
            percentage: "56%",
            description: "Aumento en ingresos en 6 meses"
        },
        {
            percentage: "82%",
            description: "Tasa de retención de clientes"
        },
        {
            percentage: "79%",
            description: "Mejora en visibilidad de anuncios"
        },
        {
            percentage: "65%",
            description: "Más reseñas positivas"
        }
    ];

    // Usar datos de la DB si existen, sino usar datos de prueba
    const indicatorsData = indicators.length > 0 ? indicators : defaultIndicators;

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

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.8
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

    const numberVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                type: "spring",
                stiffness: 200
            }
        }
    };

    return (
        <motion.div
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 py-16 px-[5%] font-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            {/* Efectos de fondo */}
            <div className="absolute inset-0 bg-blue-600 opacity-90"></div>
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
            </div>

            <motion.div
                className="relative z-10 max-w-7xl mx-auto"
                variants={containerVariants}
            >
                {/* Título de la sección si existe */}
                {data?.title && (
                    <motion.h2
                        className="text-center text-white text-3xl lg:text-4xl font-bold mb-12"
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {data.title}
                    </motion.h2>
                )}

                {/* Grid de indicadores */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4"
                    variants={containerVariants}
                >
                    {indicatorsData.map((indicator, index) => (
                        <motion.div
                            key={index}
                            className="text-center group"
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                        >
                            {/* Separador vertical (excepto el último) */}
                            {index < indicatorsData.length - 1 && (
                                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-16 bg-white/30"></div>
                            )}

                            <div className="relative">
                                {/* Porcentaje */}
                                <motion.div
                                    className="text-white text-4xl lg:text-5xl font-bold mb-3"
                                    variants={numberVariants}
                                    whileHover={{
                                        scale: 1.1,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    {indicator.percentage}
                                </motion.div>

                                {/* Descripción */}
                                <motion.p
                                    className="text-white/90 text-sm lg:text-base leading-tight px-2"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                >
                                    {indicator.description}
                                </motion.p>

                                {/* Efecto de brillo en hover */}
                                <motion.div
                                    className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Descripción adicional si existe */}
                {data?.description && (
                    <motion.p
                        className="text-center text-white/80 text-lg mt-12 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        {data.description}
                    </motion.p>
                )}
            </motion.div>
        </motion.div>
    );
};

export default AboutSeccionIndicadores;