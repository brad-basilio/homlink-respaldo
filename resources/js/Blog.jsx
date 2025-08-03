import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";

import BlogHeader from "./Components/Blog/BlogHeader";
import Filter from "./Components/Blog/Filter";
import Results from "./Components/Blog/Results";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoProvider } from "./context/CarritoContext";
import MaintenancePage from "./Utils/MaintenancePage";
import SliderInteractive from "./components/Tailwind/Sliders/SliderInteractive";
import FilterAgencia from "./components/Blog/FilterAgencia";
import TextWithHighlight from "./Utils/TextWithHighlight";
import WhatsAppButton from "./components/Shared/WhatsAppButton";
import CintilloSection from "./components/Tailwind/Sections/CintilloSection";
function Blog({ categories, postRecent, landing, sliders, banner }) {

    const landingDestacados = landing?.find(
        (item) => item.correlative === "page_blog_destacados"
    );
    const landingTodos = landing?.find(
        (item) => item.correlative === "page_blog_todos"
    );

    const [filter, setFilter] = useState({
        category: null,
        search: null,
        sortOrder: "asc",
    });

    // Estado para coordinar las animaciones de scroll
    const [sectionsReady, setSectionsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSectionsReady(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: sectionsReady ? 1 : 0 }}
            transition={{ duration: 0.6 }}
        >
            <Header />


            {postRecent && postRecent.length > 0 ? (
                <>
                    {/* SECCIÓN PRINCIPAL DEL BLOG */}
                    <motion.main
                        className="bg-gray-50 py-16 px-[5%] font-title"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: sectionsReady ? 1 : 0, y: sectionsReady ? 0 : 40 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <motion.div
                            className=" mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: sectionsReady ? 1 : 0, y: sectionsReady ? 0 : 30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* Título y descripción */}
                            <motion.div
                                className="mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: sectionsReady ? 1 : 0, y: sectionsReady ? 0 : 20 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                    {landingDestacados?.title || "Explora nuestros recursos"}
                                </h1>
                                <p className="text-gray-600 text-lg max-w-2xl">
                                    {landingDestacados?.summary || "Fusce tincidunt mi ullamcorper turpis facilitis, non tincidunt sem luctus."}
                                </p>
                            </motion.div>

                            {/* Post destacado principal */}
                            {postRecent[0] && (
                                <motion.div
                                    className="relative rounded-3xl overflow-hidden shadow-2xl mb-12 group cursor-pointer"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: sectionsReady ? 1 : 0, scale: sectionsReady ? 1 : 0.95 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                                >
                                    {/* Imagen de fondo */}
                                    <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                                        <motion.img
                                            src={`/api/posts/media/${postRecent[0].image}`}
                                            alt={postRecent[0].title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                                        />

                                        {/* Overlay gradiente */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark via-black/40 to-transparent"></div>

                                        {/* Contenido superpuesto */}
                                        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
                                            <motion.div
                                                className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.6 }}
                                            >
                                                {postRecent[0].category?.name || "Categoría"}
                                            </motion.div>

                                            <motion.h2
                                                className="text-3xl lg:text-4xl font-bold mb-4 leading-tight"
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8, delay: 0.7 }}
                                            >
                                                {postRecent[0].title}
                                            </motion.h2>

                                            <motion.p
                                                className="text-gray-200 text-lg mb-6 leading-relaxed max-w-3xl line-clamp-3"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.8 }}
                                            >
                                                {postRecent[0].summary || "Proin ut tellus nisl. Aenean massa urna, lobortis eu varius ultrices, feugiat vel orci. Nam commodo elit justo, vitae venenatis risus sagittis non."}
                                            </motion.p>


                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Filtros */}
                            <motion.div
                                className="mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: sectionsReady ? 1 : 0, y: sectionsReady ? 0 : 20 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                {/* Desktop Version */}
                                <div className="hidden md:flex items-center justify-between gap-4">
                                    {/* Filtros de categoría */}
                                    <div className="flex flex-wrap gap-3">
                                        <motion.button
                                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${!filter.category
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                }`}
                                            onClick={() => setFilter({ ...filter, category: null })}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Todos
                                        </motion.button>

                                        {categories?.map((category, index) => (
                                            <motion.button
                                                key={category.id}
                                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${filter.category === category.id
                                                    ? 'bg-blue-600 text-white shadow-lg'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                    }`}
                                                onClick={() => setFilter({ ...filter, category: category.id })}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {category.name}
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Buscador */}
                                    <motion.div
                                        className="relative"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.7 }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Buscar post"
                                            className="pl-4 pr-12 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm w-64"
                                            value={filter.search || ''}
                                            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                                        />
                                        <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </motion.div>
                                </div>

                                {/* Mobile Version */}
                                <div className="md:hidden space-y-4">
                                    {/* Buscador móvil */}
                                    <motion.div
                                        className="relative"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Buscar posts..."
                                            className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-base"
                                            value={filter.search || ''}
                                            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                                        />
                                        <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </motion.div>

                                    {/* Filtros de categoría móvil con scroll horizontal */}
                                    <motion.div
                                        className="overflow-x-auto pb-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.7 }}
                                    >
                                        <div className="flex gap-3 min-w-max px-1">
                                            <motion.button
                                                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-sm ${!filter.category
                                                    ? 'bg-blue-600 text-white shadow-lg'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                    }`}
                                                onClick={() => setFilter({ ...filter, category: null })}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Todos
                                            </motion.button>

                                            {categories?.map((category, index) => (
                                                <motion.button
                                                    key={category.id}
                                                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-sm ${filter.category === category.id
                                                        ? 'bg-blue-600 text-white shadow-lg'
                                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                        }`}
                                                    onClick={() => setFilter({ ...filter, category: category.id })}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    {category.name}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Indicador de scroll para móvil */}
                                    {categories && categories.length > 3 && (
                                        <motion.div
                                            className="text-center text-xs text-gray-500 flex items-center justify-center gap-1"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.6, delay: 1 }}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                            </svg>
                                            Desliza para ver más categorías
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Grid de posts */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: sectionsReady ? 1 : 0, y: sectionsReady ? 0 : 30 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <Results filter={filter} />
                            </motion.div>
                        </motion.div>
                    </motion.main>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <MaintenancePage />
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: sectionsReady ? 1 : 0, y: sectionsReady ? 0 : 50 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <Footer />
            </motion.div>
        </motion.div>
    );
}

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <Blog {...properties} />
            </Base>
        </CarritoProvider>
    );
});
