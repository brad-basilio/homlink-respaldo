import React from 'react';
import TextWithHighlight from '../../../Utils/TextWithHighlight';
import { motion } from 'framer-motion';

const HomeSeccionNosotros = ({ data, strengths, about }) => {

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
            className="relative overflow-hidden bg-white py-12 md:pt-16 px-[5%] font-title"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >


            <motion.div
                className="relative z-10"
                variants={containerVariants}
            >
                <motion.div
                    className="flex flex-col  gap-8 lg:gap-20"
                    style={{ WebkitGap: '2rem' }}
                    variants={containerVariants}
                >


                    {/* Columna derecha - Contenido */}
                    <motion.div
                        className="flex flex-col justify-center"
                        variants={rightSideVariants}
                    >


                        {/* Título principal con animación dramática */}
                        <motion.h2
                            className="max-w-2xl mx-auto text-center text-4xl lg:text-[52px] font-medium mb-6 leading-[94%]"
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
                            className="text-neutral-light max-w-2xl mx-auto text-center mb-10 text-lg whitespace-pre-line"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            {data?.description}
                        </motion.p>



                        {/* Botón animado espectacular */}
                        {data?.link && (
                            <motion.div
                                className='w-full flex justify-center'
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.5 }}
                            >
                                <motion.a
                                    href={data?.link}
                                    className="w-full flex items-center justify-center lg:max-w-max bg-secondary hover:bg-constrast text-white py-3 px-6 rounded-full transition-all duration-300 relative overflow-hidden group"
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

                                        transition={{ duration: 0.2 }}
                                    >
                                        Agenda una asesoría
                                    </motion.span>

                                </motion.a>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Columna izquierda - Imagen */}
                    <motion.div
                        className="order-1 lg:order-none  relative"
                        variants={leftSideVariants}
                    >
                        {/* Imagen principal con efectos espectaculares */}
                        <motion.div
                            className="rounded-3xl overflow-hidden relative flex items-center justify-center group"
                            whileHover={{
                                scale: 1.01,
                                rotateY: 5,
                                transition: {
                                    duration: 0.3,
                                    type: "spring",
                                    stiffness: 300
                                }
                            }}

                        >


                            <motion.img
                                src={`/api/landing_home/media/${data?.image}`}
                                alt={data?.title}
                                className="object-cover lg:object-fill lg:w-full h-[500px]  relative z-0"
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
                </motion.div>
            </motion.div>


            <div className='grid  grid-cols-1  lg:grid-cols-2 py-12'>
                <div>
                    <h2 className='text-neutral-dark text-[40px] '>{about?.name}</h2>
                </div>
                <div>
                    <p className='text-neutral-light text-2xl'>{about?.description}</p>
                </div>
            </div>
        </motion.div >
    );
};

export default HomeSeccionNosotros;
