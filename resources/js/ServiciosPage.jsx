import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import TextWithHighlight from "./Utils/TextWithHighlight";
import ModalAppointment from "./components/Appointment/ModalAppointment";
import DynamicGalleryServiceService from "./DynamicGalleryService";
import { useTranslation } from "./hooks/useTranslation";

const ServiciosPage = ({ landing, services, linkWhatsApp, randomImage }) => {
    const landingHero = landing?.find(
        (item) => item.correlative === "page_services_hero"
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showServicesMenu, setShowServicesMenu] = useState(false);
    const titleRef = useRef(null);

    const handleServicesMenu = () => {
        setShowServicesMenu(!showServicesMenu);
    };

    // Animaciones
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };
    // Animación del botón (igual a tu versión)
    const buttonVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
            },
        },
        pulse: {
            scale: [1, 1.05, 1],
            transition: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
            },
        },
        hover: {
            scale: 1.1,
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };

    // Función para dividir la descripción en párrafos
    const renderDescription = (description) => {
        if (!description) return null;
        const paragraphs = description.split(/(?<=\.)\s+/);
        return paragraphs.map((paragraph, index) => (
            <motion.p
                key={index}
                className="mb-4 last:mb-0"
                variants={itemVariants}
            >
                {paragraph}
            </motion.p>
        ));
    };

    // Obtener el slug de la URL
    useEffect(() => {
        const getQueryParam = (param) => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        };

        const slug = getQueryParam("slug");
        if (slug) {
            const foundIndex = services.findIndex(
                (service) =>
                    service.slug === slug ||
                    service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") ===
                        slug
            );
            if (foundIndex !== -1) setActiveIndex(foundIndex);
        }
    }, [services]);

    const { t } = useTranslation();

    return (
        <div className="font-poppins">
            <Header />
            

            <div className="min-h-screen">
                
                {/* Hero Image */}
                {landingHero && (
                    <motion.div
                        className="w-full mt-4 lg:mt-0 h-52 md:h-64 overflow-hidden rounded-b-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={`/api/landing_home/media/${landingHero?.image}`}
                            alt="Equipamiento médico de fisioterapia"
                            className="w-full h-52 md:h-64 object-cover object-left lg:object-center"
                        />
                    </motion.div>
                )}

                <div className="max-w-6xl mx-auto px-4 lg:px-3 py-8">
                    
                    {/* Title Section */}
                    {landingHero && (
                        <motion.div
                            className="text-center mb-8 lg:mt-10"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <motion.h1
                                className="text-5xl leading-[42px] lg:text-6xl font-semibold mb-2 lg:max-w-2xl lg:mx-auto"
                                variants={itemVariants}
                            >
                                <TextWithHighlight text={landingHero?.title} />
                            </motion.h1>
                        </motion.div>
                    )}


                    {services && (
                        <div className="flex flex-col lg:flex-row lg:gap-12 lg:pt-2 justify-between">
                            {/* Services Menu */}
                            <motion.div
                                className="w-full lg:w-[30%] mt-10 relative"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="hidden lg:block text-xl lg:text-2xl font-semibold mb-4">
                                    Servicios
                                </h2>

                                <div className="lg:hidden mb-6">
                                    <button
                                        onClick={handleServicesMenu}
                                        className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md"
                                    >
                                        <span className="font-medium">
                                            Servicios
                                        </span>
                                        <ChevronDown className="h-5 w-5 text-gray-500" />
                                    </button>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="hidden lg:relative lg:block lg:bg-transparent space-y-2"
                                >
                                    {services.map((service, index) => (
                                        <motion.div
                                            key={index}
                                            onClick={() =>
                                                setActiveIndex(index)
                                            }
                                            className={`flex items-center justify-between p-3 lg:py-3 lg:px-[5%] rounded-lg cursor-pointer ${
                                                index === activeIndex
                                                    ? "bg-gray-100"
                                                    : "hover:bg-gray-50"
                                            }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span
                                                className={`lg:text-lg ${
                                                    index === activeIndex
                                                        ? "font-medium"
                                                        : ""
                                                }`}
                                            >
                                                {service.title}
                                            </span>
                                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                                <img
                                                    src={`/api/service/media/${service.image}`}
                                                    alt={service.title}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                                <AnimatePresence>
                                    {showServicesMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className=" lg:hidden lg:bg-transparent space-y-2"
                                        >
                                            {services.map((service, index) => (
                                                <motion.div
                                                    key={index}
                                                    onClick={() =>
                                                        setActiveIndex(index)
                                                    }
                                                    className={`flex items-center justify-between p-3 lg:py-3 lg:px-[5%] rounded-lg cursor-pointer ${
                                                        index === activeIndex
                                                            ? "bg-gray-100"
                                                            : "hover:bg-gray-50"
                                                    }`}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <span
                                                        className={`lg:text-lg ${
                                                            index ===
                                                            activeIndex
                                                                ? "font-medium"
                                                                : ""
                                                        }`}
                                                    >
                                                        {service.title}
                                                    </span>
                                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                                        <img
                                                            src={`/api/service/media/${service.image}`}
                                                            alt={service.title}
                                                            className="w-full h-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Service Details */}
                            <motion.div
                                className="lg:w-[62%]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                key={activeIndex}
                            >
                                <motion.h2
                                    className="text-5xl lg:mt-6 font-semibold mb-4 text-wrap"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <TextWithHighlight
                                        text={services[activeIndex].title}
                                        split={true}
                                    />
                                </motion.h2>

                                <motion.div
                                    className="mb-8 lg:mb-4 pt-4 lg:pt-2 text-lg"
                                    initial="hidden"
                                    animate="visible"
                                    variants={containerVariants}
                                >
                                    {renderDescription(
                                        services[activeIndex].description
                                    )}
                                </motion.div>

                                {/* Service Features */}
                                <motion.div
                                    className="space-y-3 mb-8 text-lg"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {services[activeIndex].characteristics.map(
                                        (characteristic, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex gap-3 items-center"
                                                variants={itemVariants}
                                            >
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src="/assets/img/icons/pin.png"
                                                        className="w-6 h-6 mt-1"
                                                        alt={characteristic}
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <p className="leading-relaxed">
                                                    {characteristic}
                                                </p>
                                            </motion.div>
                                        )
                                    )}
                                </motion.div>

                                {/* CTA Button */}
                                <motion.div
                                    className="w-full px-[5%] lg:px-0 flex items-center justify-center lg:justify-start mt-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <motion.button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-[#EFF0F1] text-[#242424] py-1 pl-1 pr-3 gap-2 mt-2 rounded-full flex items-center"
                                        variants={buttonVariants}
                                        initial="hidden"
                                        animate={["visible", "pulse"]}
                                        whileHover="hover"
                                        style={{
                                            position: "relative",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <motion.span
                                            className="absolute inset-0 bg-[#224483] opacity-0 rounded-full"
                                            initial={{ scale: 0 }}
                                            whileTap={{
                                                scale: 2,
                                                opacity: 0.3,
                                                transition: { duration: 0.5 },
                                            }}
                                        />
                                        <div className="bg-[#224483] w-12 p-2 rounded-full">
                                            <img
                                                src="/assets/img/icons/calendar-check.png"
                                                className="h-auto"
                                                alt="Calendario"
                                            />
                                        </div>
                                        {t(
                                            "public.btn.appointment",
                                            "Reserva tu cita"
                                        )}
                                    </motion.button>
                                </motion.div>

                                {/* Service Images */}
                                <DynamicGalleryServiceService
                                    service={services[activeIndex]}
                                />
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>

            <ModalAppointment
                linkWhatsApp={linkWhatsApp}
                randomImage={randomImage}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <Footer />
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <ServiciosPage {...properties} />
            </Base>
        </CarritoProvider>
    );
});
