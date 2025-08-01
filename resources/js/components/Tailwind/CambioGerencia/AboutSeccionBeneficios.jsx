import React from 'react';
import { motion } from 'framer-motion';

const AboutSeccionBeneficios = ({ data, benefits = [] }) => {
    // Datos de prueba mientras no lleguen de la DB
   

  

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

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 60,
            scale: 0.9
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

    const titleVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            className="relative overflow-hidden bg-gray-50 py-16 px-[5%] font-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <motion.div
                className="relative z-10  mx-auto"
                variants={containerVariants}
            >
                {/* Título principal */}
                <motion.div
                    className="text-start mb-12"
                    variants={titleVariants}
                >
                    <h2 className="text-4xl max-w-lg lg:text-5xl font-bold text-gray-900 mb-4">
                        {data?.title || "Beneficios de trabajar"}
                    </h2>
                   
                    <p className="text-start text-gray-600 text-lg max-w-3xl">
                        {data?.description || "Nuestros servicios digitales están diseñados para potenciar tus alojamientos en Airbnb, redes sociales y otros canales digitales."}
                    </p>
                </motion.div>

                {/* Grid de beneficios */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                >
                    {benefits && benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                        >
                            {/* Efecto de fondo en hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative z-10">
                                {/* Icono */}
                                <motion.div
                                    className="w-14 h-14  rounded-2xl flex items-center justify-center mb-6  transition-colors duration-300"
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: 5,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <img className='h-full w-full object-cover ' src={`/api/benefit/media/${benefit?.image}`} />
                                    <div className="text-2xl">
                                        {benefit.icon}
                                    </div>
                                </motion.div>

                                {/* Título */}
                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary transition-colors duration-300">
                                    {benefit?.name}
                                </h3>

                                {/* Descripción */}
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {benefit?.description}
                                </p>

                                {/* Botón */}
                                <motion.button
                                    className="bg-secondary hover:bg-secondary text-white px-6 py-3 rounded-full font-medium transition-all duration-300 group-hover:shadow-lg"
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {benefit.button_text || "Agenda una asesoría"}
                                </motion.button>
                            </div>

                            {/* Decoración */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full -translate-y-10 translate-x-10 opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Llamada a la acción adicional si existe */}
                {data?.link && (
                    <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <motion.a
                            href={data.link}
                            className="inline-flex items-center bg-secondary hover:bg-secondary text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 15px 30px rgba(239, 68, 68, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Ver todos nuestros servicios
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

export default AboutSeccionBeneficios;