import React from "react";
import { motion } from "framer-motion";
import TextWithHighlight from "../../Utils/TextWithHighlight";
import { useTranslation } from "../../hooks/useTranslation";

const FilterProducto = ({ categories, filter, setFilter, landing }) => {
    

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
            className="py-8 xl:py-12 px-[5%]"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            


            {/* Mobile Layout */}
            <div className="block lg:hidden space-y-6">
                {/* Campo de búsqueda - Mobile */}
                <motion.label
                    htmlFor="txt-search-mobile"
                    className="w-full px-4 py-3 flex items-center rounded-3xl bg-[#F5F2F9]"
                    variants={inputFocus}
                    whileHover={{ y: -3 }}
                    whileFocus="focus"
                >
                    <motion.i
                        className="fas fa-search text-negro mr-2"
                        whileHover={{ scale: 1.1 }}
                    />
                    <motion.input
                        id="txt-search-mobile"
                        type="text"
                        placeholder={t(
                            "public.post.search",
                            "Buscar publicación"
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

                {/* Botones de categorías - Mobile */}
                <motion.div
                    className="flex flex-wrap gap-2 justify-start"
                    variants={containerVariants}
                >
                    <motion.button
                        className={`px-3 py-2 text-sm text-neutral border-b-2 ${filter.category === null
                            ? "border-accent"
                            : "border-transparent"
                            }`}
                        onClick={() =>
                            setFilter((old) => ({
                                ...old,
                                category: null
                            }))
                        }
                        variants={buttonHover}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            delay: 0.05,
                        }}
                    >
                        Todos
                    </motion.button>
                    {categories.map((item, index) => (
                        <motion.button
                            key={index}
                            className={`px-3 py-2 text-sm text-neutral border-b-2 ${item.id == filter.category
                                ? "border-accent"
                                : "border-transparent"
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
                            variants={buttonHover}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                delay: (index + 1) * 0.05,
                            }}
                        >
                            {item.name}
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex justify-between items-center">
                {/* Botones de categorías - Desktop */}
                <motion.div
                    className="flex flex-wrap gap-3 justify-start"
                    variants={containerVariants}
                >
                    <div className="flex">
                        <motion.button
                            className={`px-4 py-2.5 text-neutral border-b-2 ${filter.category === null
                                ? "border-accent"
                                : "border-transparent"
                                }`}
                            onClick={() =>
                                setFilter((old) => ({
                                    ...old,
                                    category: null
                                }))
                            }
                            variants={buttonHover}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                delay: 0.05,
                            }}
                        >
                            Todos
                        </motion.button>
                        {categories.map((item, index) => (
                            <motion.button
                                key={index}
                                className={`px-4 py-2.5 text-neutral border-b-2 ${item.id == filter.category
                                    ? "border-accent"
                                    : "border-transparent"
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
                                variants={buttonHover}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    delay: (index + 1) * 0.05,
                                }}
                            >
                                {item.name}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Campo de búsqueda - Desktop */}
                <motion.label
                    htmlFor="txt-search-desktop"
                    className="px-6 py-4 flex items-center rounded-3xl bg-[#F5F2F9] min-w-[350px] max-w-2xl"
                    variants={inputFocus}
                    whileHover={{ y: -3 }}
                    whileFocus="focus"
                >
                    <motion.i
                        className="fas fa-search text-negro mr-2"
                        whileHover={{ scale: 1.1 }}
                    />
                    <motion.input
                        id="txt-search-desktop"
                        type="text"
                        placeholder={t(
                            "public.post.search",
                            "Buscar publicación"
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
            </div>
        </motion.section>
    );
};

export default FilterProducto;
