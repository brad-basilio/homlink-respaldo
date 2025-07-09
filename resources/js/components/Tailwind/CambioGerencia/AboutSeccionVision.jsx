import React from "react";
import { Link } from "@inertiajs/react";
import TextWithHighlight from "../../../Utils/TextWithHighlight";
import { motion } from 'framer-motion';

const IconStack = () => (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-constrast">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#D62828" />
            <path d="M7 10l5 2.5L17 10M12 16.5l-5-2.5M12 16.5l5-2.5M7 14v-4M17 14v-4M12 7.5l5 2.5-5 2.5-5-2.5 5-2.5z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </span>
);

const IconUsers = () => (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-constrast">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#D62828" />
            <path d="M17 18v-1.5A2.5 2.5 0 0 0 14.5 14h-5A2.5 2.5 0 0 0 7 16.5V18M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </span>
);

const AboutSeccionVision = ({ data, vision, mision, valor }) => {
    
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

    const leftColumnVariants = {
        hidden: { opacity: 0, x: -80, scale: 0.9 },
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

    const centerColumnVariants = {
        hidden: { opacity: 0, y: 80 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2
            }
        }
    };

    const rightColumnVariants = {
        hidden: { opacity: 0, x: 80, scale: 0.9 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.4
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.95,
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
        <motion.section 
            className="w-full font-paragraph bg-white px-[5%] py-10 flex flex-col lg:flex-row gap-8 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Columna izquierda  */}
            <motion.div 
                className="flex-1 max-w-xl"
                variants={leftColumnVariants}
            >
                <motion.div 
                    className="flex items-center mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
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
                       className="uppercase text-constrast text-sm font-medium"
                       initial={{ opacity: 0, y: -10 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.5, delay: 0.6 }}
                       viewport={{ once: true }}
                   >
                       Nuestra visión | Misión
                   </motion.h3>
                </motion.div>

                <motion.h2 
                    className="text-4xl lg:text-[60px] font-medium mb-6 leading-[94%]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: true }}
                >
                    <TextWithHighlight text={data?.title} color='bg-neutral-dark font-semibold' />
                </motion.h2>
                
                <motion.p 
                    className="text-neutral-light mb-10 text-lg max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    viewport={{ once: true }}
                >
                    {data?.description}
                </motion.p>
                {/* Botón "Sobre nosotros" */}
               {/* <div className='w-full'>
                    <a
                        href="/nosotros"
                        className="  w-full flex items-center justify-center lg:max-w-max bg-primary hover:bg-opacity-90 text-white py-3 px-6 rounded-lg transition-colors"
                    >
                        <span className="font-medium">Sobre nosotros</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div> */}
            </motion.div>

            {/* Columna central: tarjetas visión/misión/valor */}
            <motion.div 
                className="flex-1 max-w-lg w-full flex flex-col gap-4"
                variants={centerColumnVariants}
            >
                <motion.div 
                    className="bg-secondary rounded-2xl p-4 flex flex-col gap-8 relative overflow-hidden"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'linear-gradient(135deg, #BBFF52 0%, #A8E63A 100%)',
                        boxShadow: '0 20px 40px rgba(187, 255, 82, 0.15)'
                    }}
                >
                    {/* Efectos de fondo animados */}
                    <motion.div
                        className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.05, 0.1, 0.05]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-20 h-20 bg-white opacity-5 rounded-full"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.05, 0.08, 0.05]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                    
                    {/* Misión */}
                    <motion.div 
                        className="flex items-start p-4  mt-2 group hover:bg-constrast hover:text-white transition-colors duration-300 rounded-xl relative overflow-hidden"
                        variants={cardVariants}
                        whileHover={{ 
                            scale: 1.02, 
                            y: -2,
                            transition: { duration: 0.2 }
                        }}
                        style={{ perspective: '1000px' }}
                    >
                        <motion.div 
                            className="bg-constrast rounded-full min-w-10 min-h-10 flex items-center justify-center mr-4 group-hover:bg-secondary transition-colors duration-300 relative overflow-hidden"
                            variants={iconVariants}
                            whileHover={{ 
                                rotate: 360,
                                scale: 1.1,
                                transition: { duration: 0.6 }
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full"
                                animate={{
                                    rotate: [0, 360]
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.svg 
                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                                className="stroke-white group-hover:stroke-neutral-light transition-colors duration-300 relative z-10"
                                whileHover={{ 
                                    scale: 1.1,
                                    filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))"
                                }}
                            >
                                <motion.path 
                                    d="M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z" 
                                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 1 }}
                                />
                                <motion.path 
                                    d="M20.788 11.0977C20.9293 11.2964 21 11.5036 21 11.7314C21 12.7132 19.6873 13.3114 17.0618 14.5077L15.357 15.2845C13.7048 16.0373 12.8786 16.4138 12 16.4138C11.1214 16.4138 10.2952 16.0373 8.64298 15.2845L6.93817 14.5077C4.31272 13.3114 3 12.7132 3 11.7314C3 11.5036 3.07067 11.2964 3.212 11.0977" 
                                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 1.5 }}
                                />
                                <motion.path 
                                    d="M20.3767 16.2656C20.7922 16.5966 21 16.9265 21 17.3171C21 18.299 19.6873 18.8971 17.0618 20.0934L15.357 20.8702C13.7048 21.6231 12.8786 21.9995 12 21.9995C11.1214 21.9995 10.2952 21.6231 8.64298 20.8702L6.93817 20.0934C4.31272 18.8971 3 18.299 3 17.3171C3 16.9265 3.20778 16.5966 3.62334 16.2656" 
                                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 2 }}
                                />
                            </motion.svg>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                            viewport={{ once: true }}
                        >
                            <motion.h3 
                                className="text-xl font-medium mb-1"
                                whileHover={{ 
                                    x: 5,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                Nuestra misión
                            </motion.h3>
                            <motion.p 
                                className="text-base text-neutral-light group-hover:text-white"
                                whileHover={{ 
                                    x: 3,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {mision?.description}
                            </motion.p>
                        </motion.div>
                    </motion.div>
                    {/* Visión */}
                    <motion.div 
                        className="flex items-start p-4  mt-2 group hover:bg-constrast hover:text-white transition-colors duration-300 rounded-xl relative overflow-hidden"
                        variants={cardVariants}
                        whileHover={{ 
                            scale: 1.02, 
                            y: -2,
                            transition: { duration: 0.2 }
                        }}
                        style={{ perspective: '1000px' }}
                    >
                        <motion.div 
                        className="bg-constrast rounded-full min-w-10 min-h-10 flex items-center justify-center mr-4 group-hover:bg-secondary transition-colors duration-300 relative overflow-hidden"
                            variants={iconVariants}
                            whileHover={{ 
                                rotate: 360,
                                scale: 1.1,
                                transition: { duration: 0.6 }
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full"
                                animate={{
                                    rotate: [0, 360]
                                }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.svg 
                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                                className="stroke-white group-hover:stroke-neutral-light transition-colors duration-300 relative z-10"
                                whileHover={{ 
                                    scale: 1.1,
                                    filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))"
                                }}
                            >
                                <motion.path 
                                    d="M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z" 
                                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 1.3 }}
                                />
                                <motion.path 
                                    d="M20.788 11.0977C20.9293 11.2964 21 11.5036 21 11.7314C21 12.7132 19.6873 13.3114 17.0618 14.5077L15.357 15.2845C13.7048 16.0373 12.8786 16.4138 12 16.4138C11.1214 16.4138 10.2952 16.0373 8.64298 15.2845L6.93817 14.5077C4.31272 13.3114 3 12.7132 3 11.7314C3 11.5036 3.07067 11.2964 3.212 11.0977" 
                                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 1.8 }}
                                />
                                <motion.path 
                                    d="M20.3767 16.2656C20.7922 16.5966 21 16.9265 21 17.3171C21 18.299 19.6873 18.8971 17.0618 20.0934L15.357 20.8702C13.7048 21.6231 12.8786 21.9995 12 21.9995C11.1214 21.9995 10.2952 21.6231 8.64298 20.8702L6.93817 20.0934C4.31272 18.8971 3 18.299 3 17.3171C3 16.9265 3.20778 16.5966 3.62334 16.2656" 
                                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 2.3 }}
                                />
                            </motion.svg>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.4 }}
                            viewport={{ once: true }}
                        >
                            <motion.h3 
                                className="text-xl font-medium mb-1"
                                whileHover={{ 
                                    x: 5,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                Nuestra visión
                            </motion.h3>
                            <motion.p 
                                className="text-base text-neutral-light group-hover:text-white"
                                whileHover={{ 
                                    x: 3,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {vision?.description}
                            </motion.p>
                        </motion.div>
                    </motion.div>
                    
                    {/* Valor */}
                    <motion.div 
                        className="flex items-start p-4  mt-2 group hover:bg-constrast hover:text-white transition-colors duration-300 rounded-xl relative overflow-hidden"
                        variants={cardVariants}
                        whileHover={{ 
                            scale: 1.02, 
                            y: -2,
                            transition: { duration: 0.2 }
                        }}
                        style={{ perspective: '1000px' }}
                    >
                        <motion.div 
                          className="bg-constrast rounded-full min-w-10 min-h-10 flex items-center justify-center mr-4 group-hover:bg-secondary transition-colors duration-300 relative overflow-hidden"
                            variants={iconVariants}
                            whileHover={{ 
                                rotate: 360,
                                scale: 1.1,
                                transition: { duration: 0.6 }
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full"
                                animate={{
                                    rotate: [0, 360]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.svg 
                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                                className="stroke-white group-hover:stroke-neutral-light transition-colors duration-300 relative z-10"
                                whileHover={{ 
                                    scale: 1.1,
                                    filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))"
                                }}
                            >
                                <motion.path 
                                    d="M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z" 
                                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 1.6 }}
                                />
                                <motion.path 
                                    d="M20.788 11.0977C20.9293 11.2964 21 11.5036 21 11.7314C21 12.7132 19.6873 13.3114 17.0618 14.5077L15.357 15.2845C13.7048 16.0373 12.8786 16.4138 12 16.4138C11.1214 16.4138 10.2952 16.0373 8.64298 15.2845L6.93817 14.5077C4.31272 13.3114 3 12.7132 3 11.7314C3 11.5036 3.07067 11.2964 3.212 11.0977" 
                                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 2.1 }}
                                />
                                <motion.path 
                                    d="M20.3767 16.2656C20.7922 16.5966 21 16.9265 21 17.3171C21 18.299 19.6873 18.8971 17.0618 20.0934L15.357 20.8702C13.7048 21.6231 12.8786 21.9995 12 21.9995C11.1214 21.9995 10.2952 21.6231 8.64298 20.8702L6.93817 20.0934C4.31272 18.8971 3 18.299 3 17.3171C3 16.9265 3.20778 16.5966 3.62334 16.2656" 
                                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 2.6 }}
                                />
                            </motion.svg>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.6 }}
                            viewport={{ once: true }}
                        >
                            <motion.h3 
                                className="text-xl font-medium mb-1"
                                whileHover={{ 
                                    x: 5,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                Nuestro valor
                            </motion.h3>
                            <motion.p 
                                className="text-base text-neutral-light group-hover:text-white"
                                whileHover={{ 
                                    x: 3,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {valor?.description}
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Columna derecha: imagen */}
            <motion.div 
                className="flex-1 max-w-md w-full flex items-center justify-center"
                variants={rightColumnVariants}
            >
                <motion.div 
                    className="rounded-2xl overflow-hidden w-full max-w-xs md:max-w-sm relative"
                    whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                        transition: { duration: 0.6 }
                    }}
                    style={{ 
                        perspective: '1000px',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* Efectos de brillo animados en la imagen */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 -skew-x-12"
                        animate={{
                            x: ['-100%', '200%'],
                            opacity: [0, 0.3, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut"
                        }}
                        style={{ zIndex: 10 }}
                    />
                    
                    {/* Overlay gradiente animado */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-constrast/20 via-transparent to-secondary/20 opacity-0 rounded-2xl"
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: 0.3 }
                        }}
                        style={{ zIndex: 5 }}
                    />
                    
                    {/* Border animado */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                            background: 'linear-gradient(45deg, #7E5AFB, #BBFF52, #7E5AFB)',
                            backgroundSize: '300% 300%',
                            padding: '2px',
                            zIndex: -1
                        }}
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <div className="w-full h-full rounded-2xl bg-white" />
                    </motion.div>
                    
                    <motion.img
                        src={`/api/landing_home/media/${data?.image}`}
                        alt={data?.title}
                        className="w-full object-cover rounded-2xl relative z-0"
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{
                            filter: "brightness(1.1) contrast(1.1)",
                            transition: { duration: 0.3 }
                        }}
                    />
                    
                    {/* Partículas flotantes alrededor de la imagen */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-constrast/30 rounded-full"
                            style={{
                                top: `${20 + (i * 15)}%`,
                                left: `${-10 + (i % 2) * 120}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.3, 0.8, 0.3],
                                scale: [0.8, 1.2, 0.8]
                            }}
                            transition={{
                                duration: 2 + (i * 0.3),
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default AboutSeccionVision;
