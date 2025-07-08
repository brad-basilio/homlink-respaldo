import { motion } from 'framer-motion';

const CintilloSection = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return(
         <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-constrast overflow-hidden text-white text-xs md:text-sm py-2 md:py-3 relative"
        >
            {/* Gradiente animado de fondo */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-constrast via-accent/20 to-constrast opacity-50"
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    backgroundSize: "200% 100%"
                }}
            />

            <div className="px-[5%] mx-auto flex flex-row items-center justify-start font-paragraph relative z-10">
                <motion.div 
                    variants={itemVariants}
                    className="flex items-start gap-2 relative"
                >
                    <motion.ul 
                        variants={containerVariants}
                        className="flex flex-row items-center gap-4 uppercase font-medium text-sm"
                    >
                        <motion.li variants={itemVariants}>
                           <motion.a 
                                href="/"
                                whileHover={{ 
                                    scale: 1.05,
                                    x: 2,
                                    textShadow: "0 0 8px rgba(187, 255, 82, 0.6)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 17
                                }}
                                className="relative inline-block group"
                            >
                                Personas
                                <motion.div
                                    className="absolute bottom-0 left-0 h-0.5 bg-secondary rounded-full"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            </motion.a>
                        </motion.li>
                        <motion.li variants={itemVariants}>
                            <motion.a 
                                href="/empresas"
                                whileHover={{ 
                                    scale: 1.05,
                                    x: 2,
                                    textShadow: "0 0 8px rgba(187, 255, 82, 0.6)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 17
                                }}
                                className="relative inline-block group"
                            >
                                Empresas
                                <motion.div
                                    className="absolute bottom-0 left-0 h-0.5 bg-secondary rounded-full"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            </motion.a>
                        </motion.li>
                    </motion.ul>

                   
                </motion.div>
            </div>
        </motion.div>
    )
}
export default CintilloSection;