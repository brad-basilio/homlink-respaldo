import React from "react";
import { motion } from "framer-motion";
import TextWithHighlight from "../../Utils/TextWithHighlight";
import { useTranslation } from "../../hooks/useTranslation";

const FilterAgencia = ({ categories, filter, setFilter, landing }) => {
  

    // Animaciones
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const buttonHover = {
        hover: {
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
        tap: {
            scale: 0.98,
        },
    };

    const inputFocus = {
        focus: {
            boxShadow: "0 0 0 2px #3b82f6",
            transition: {
                duration: 0.2,
            },
        },
    };

    const { t } = useTranslation();
    return (
        <motion.section
            className="py-8 xl:py-12 px-[5%] font-title"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="flex flex-col lg:flex-row justify-between items-center">
                <motion.div className="mb-12" variants={itemVariants}>
                    <h2 className="text-4xl lg:text-[48px] font-medium mb-4 leading-[94%] ">
                        <TextWithHighlight
                            text={landing?.title || ""}
                            color="bg-neutral-dark font-semibold"
                           
                        />
                       
                    </h2>
                    <p className=" text-lg text-neutral-light max-w-2xl">
                        {landing?.description || ""}
                     
                    </p>
                </motion.div>
                {/* Campo de búsqueda
                     <motion.label
                    htmlFor="txt-search"
                    className="col-span-1 px-6 h-max py-4 flex items-center rounded-3xl bg-[#F5F2F9] min-w-[350px] sm:min-w-[500px] max-w-2xl "
                    variants={itemVariants}
                    whileHover={{ y: -3 }}
                    whileFocus="focus"
                    variants={inputFocus}
                >
                    <motion.i
                        className="fas fa-search text-negro mr-2"
                        whileHover={{ scale: 1.1 }}
                    />
                    <motion.input
                        id="txt-search"
                        type="text"
                        placeholder={t(
                            "public.post.search",
                            "	Buscar publicación"
                        )}
                        className="w-full bg-transparent border-none outline-none text-slate-800"
                        onChange={(e) =>
                            setFilter((old) => ({
                                ...old,
                                search: e.target.value,
                            }))
                        }
                        whileFocus={{
                            outline: "none",
                            x: 3,
                        }}
                    />
                </motion.label>
                */}

                <button className="uppercase bg-secondary font-medium max-h-max text-sm tracking-[8%] px-6 py-3 rounded-full hover:bg-constrast transition-colors duration-300">
                    quiero suscribirme al blog
                </button>
           
            </div>


            <div className="flex">


                {/* Botones de categorías */}
                <motion.div
                    className="flex flex-wrap  gap-3 justify-start  "
                    variants={containerVariants}
                >
                    <div className="flex p-2 bg-white rounded-xl">
                        <motion.button

                            className={`px-4 py-2.5 text-neutral-light rounded-lg    ${filter.category===null
                                ? "  bg-secondary"
                                : ""
                                }`}
                            onClick={() =>
                                setFilter((old) => ({
                                    ...old,
                                    category:null

                                }))
                            }
                            variants={itemVariants}
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonHover}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                delay: 1 * 0.05,
                            }}
                        >
                           Todos
                        </motion.button>
                        {categories.map((item, index) => (
                            <motion.button
                                key={index}
                                className={`px-4 py-2.5 text-neutral-light rounded-lg  ${item.id == filter.category
                                    ? "  bg-secondary"
                                    : ""
                                    }`}
                                onClick={() =>
                                    setFilter((old) => ({
                                        ...old,
                                        category:
                                            item.id == filter.category
                                                ? null
                                                : item.id,
                                    }))
                                }
                                variants={itemVariants}
                                whileHover="hover"
                                whileTap="tap"
                                variants={buttonHover}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    delay: index * 0.05,
                                }}
                            >
                                {item.name}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default FilterAgencia;
