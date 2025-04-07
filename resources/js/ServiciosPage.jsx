import {
    ChevronDown,
    Clock,
    Calendar,
    Target,
    Grid,
    BookOpen,
    Users,
    User,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";

import Banner from "./Components/Home/Banner";
import Highlights from "./Components/Home/Highlights";
import HowItWorks from "./Components/Home/HowItWorks";
import Routine from "./Components/Home/Routine";
import Highlights2 from "./Components/Home/Highlights2";
import Supplies from "./Components/Home/Supplies";
import Testimonies from "./Components/Home/Testimonies";
import CallToAction from "./Components/Home/CallToAction";
import Popups from "./Components/Home/Popups";
import Header from "./components/Tailwind/Header";
import FeaturesSection from "./components/Tailwind/Welcome/FeaturesSection";
import BenefitsSection from "./components/Tailwind/Welcome/BenefitsSection";
import ProductCarousel from "./components/Tailwind/Products/ProductCarousel";
import QuizSection from "./components/Tailwind/Welcome/QuizSection";
import TopSaleSection from "./components/Tailwind/Welcome/TopSaleSection";
import GuaranteeSection from "./components/Tailwind/Welcome/GuaranteeSection";
import WeLoversSection from "./components/Tailwind/Welcome/WeLoversSections";
import NotSureSection from "./components/Tailwind/Welcome/NotSureSection";
import InstagramSection from "./components/Tailwind/Welcome/InstagramSection";
import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import ItemsRest from "./actions/ItemRest";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import HealthSection from "./components/Home/HealthSection";
import TratamientoSection from "./components/Home/TratamientoSection";
import TestimonioSection from "./components/Home/TestimonioSection";
import AcercaDe from "./components/Home/AcercaDe";
import TextWithHighlight from "./Utils/TextWithHighlight";
import ModalAppointment from "./components/Appointment/ModalAppointment";

const DynamicGallery = ({ service }) => {
    // Determina el layout basado en el número de imágenes
    const getLayoutConfig = () => {
        if (!service?.gallery?.length)
            return { gridClass: "", imageClasses: [] };

        const count = service.gallery.length;

        if (count === 1) {
            return {
                gridClass: "grid-cols-1 h-[500px] gap-4",
                imageClasses: ["h-full"],
            };
        }

        if (count === 2) {
            return {
                gridClass: "flex flex-col h-[600px] gap-4",
                imageClasses: ["h-[350px]", "h-[250px]"],
            };
        }

        if (count === 3) {
            return {
                gridClass: "grid-cols-2 grid-rows-3 gap-2  gap-4",
                imageClasses: [
                    "row-span-2 col-span-2 h-full", // Grande arriba
                    "row-span-1 col-span-1 h-[250px]", // Abajo izquierda
                    "row-span-1 col-span-1 h-[250px]", // Abajo derecha
                ],
            };
        }

        if (count === 4) {
            return {
                gridClass: "grid-cols-2 grid-rows-3 gap-4 h-[600px]",
                imageClasses: [
                    "row-span-1 col-span-2 h-full", // Grande izquierda
                    "row-span-2 col-span-1 h-full", // Alta derecha
                    "row-span-1 col-span-1 h-full", // Pequeña abajo 1
                    "row-span-1 col-span-1 h-full", // Pequeña abajo 2
                ],
            };
        }
        if (count === 5) {
            return {
                gridClass: "grid-cols-2 grid-rows-4 gap-4 h-[800px]",
                imageClasses: [
                    "row-span-1 col-span-2 h-full", // Grande izquierda
                    "row-span-2 col-span-1 h-full", // Alta derecha
                    "row-span-1 col-span-1 h-full", // Pequeña abajo 1
                    "row-span-1 col-span-1 h-full", // Pequeña abajo 2
                    "row-span-1 col-span-2 h-full", // Pequeña abajo 2
                ],
            };
        }

        // Layout por defecto para 5+ imágenes
        return {
            gridClass: "grid-cols-3 gap-2 h-[600px]",
            imageClasses: Array(count).fill("h-300px"),
        };
    };

    const { gridClass, imageClasses } = getLayoutConfig();

    if (!service?.gallery?.length) return null;

    return (
        <div
            className={`grid ${gridClass} w-full mx-auto my-8 rounded-3xl overflow-hidden`}
        >
            {service.gallery.map((image, index) => (
                <div
                    key={index}
                    className={`relative ${
                        imageClasses[index] || "h-32"
                    } overflow-hidden `}
                >
                    <img
                        src={`/api/service/media/${image}`}
                        alt={`${service.title} - Imagen ${index + 1}`}
                        className="w-full h-full object-cover absolute inset-0 rounded-3xl"
                        onError={(e) => {
                            e.target.src = "/assets/img/placeholder.jpg"; // Imagen de respaldo
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

const ServiciosPage = ({ landing, services, linkWhatsApp, randomImage }) => {
    const landingHero = landing.find(
        (item) => item.correlative === "page_services_hero"
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showServicesMenu, setShowServicesMenu] = useState(false);

    const handleServicesMenu = () => {
        setShowServicesMenu(!showServicesMenu);
    };

    // Función para dividir la descripción en párrafos
    const renderDescription = (description) => {
        if (!description) return null;

        // Dividir por puntos seguidos de espacio (regex mejorado)
        const paragraphs = description.split(/(?<=\.)\s+/);

        return paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
                {paragraph}
            </p>
        ));
    };

    // Obtener el slug de la URL
    useEffect(() => {
        // Función para parsear los parámetros de la URL
        const getQueryParam = (param) => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        };

        const slug = getQueryParam("slug");

        if (slug) {
            // Encontrar el índice del servicio que coincida con el slug
            const foundIndex = services.findIndex(
                (service) =>
                    service.slug === slug ||
                    service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") ===
                        slug
            );

            if (foundIndex !== -1) {
                setActiveIndex(foundIndex);
            }
        }
    }, [services]); // Dependencia de services para que se ejecute cuando cambie
    return (
        <div className=" font-poppins">
            <Header />
            <div className="min-h-screen bg-white font-sans">
                {/* Hero Image */}
                <div className="w-full mt-4 lg:mt-0 h-52 md:h-64 overflow-hidden rounded-b-3xl">
                    <img
                        src={`/api/landing_home/media/${landingHero.image}`}
                        alt="Equipamiento médico de fisioterapia"
                        className="w-full h-52 md:h-64 object-cover object-left lg:object-center"
                    />
                </div>

                <div className="max-w-6xl mx-auto px-4 lg:px-3 py-8">
                    {/* Title Section */}
                    <div className="text-center mb-8 lg:mt-10">
                        <h1 className="text-5xl leading-[42px] lg:text-6xl font-semibold mb-2 lg:max-w-2xl lg:mx-auto">
                            <TextWithHighlight text={landingHero.title} />
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:gap-12 lg:pt-2 justify-between">
                        {/* Services Menu - Hidden on mobile, visible on desktop */}
                        <div className="w-full lg:w-[30%] mt-10 relative">
                            <h2 className="hidden lg:block text-xl lg:text-2xl font-semibold mb-4">
                                Servicios
                            </h2>
                            <div className="lg:hidden mb-6 ">
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
                            <div
                                className={` lg:relative lg:block lg:bg-transparent space-y-2 ${
                                    showServicesMenu
                                        ? "absolute bg-white top-14"
                                        : "hidden"
                                }`}
                            >
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setActiveIndex(index)} // Al hacer clic, establece este índice como activo
                                        className={`flex  items-center justify-between p-3 lg:py-3 lg:px-[5%] rounded-lg cursor-pointer ${
                                            index === activeIndex
                                                ? "bg-gray-100"
                                                : "hover:bg-gray-50"
                                        }`}
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
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Service Details */}
                        <div className="lg:w-[62%]">
                            <h2 className="text-5xl  lg:mt-6 font-semibold mb-4  text-wrap">
                                <TextWithHighlight
                                    text={services[activeIndex].title}
                                    split={true}
                                />
                            </h2>

                            <div className="mb-8 lg:mb-4 pt-4 lg:pt-2 text-lg">
                                {" "}
                                {renderDescription(
                                    services[activeIndex].description
                                )}
                            </div>

                            {/* Service Features */}
                            <div className="space-y-3 mb-8 text-lg">
                                {services[activeIndex].characteristics.map(
                                    (characteristic, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-3 items-center"
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
                                        </div>
                                    )
                                )}
                            </div>

                            {/* CTA Button */}
                            <div className="mb-8">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-[#EFF0F1] text-[#242424] py-1 pl-1 pr-3  gap-2 rounded-full flex items-center"
                                >
                                    <div className="bg-[#224483] w-12 p-2 rounded-full">
                                        <img
                                            src="/assets/img/icons/calendar-check.png"
                                            className=" h-auto    "
                                        />
                                    </div>
                                    Reserva tu cita
                                </button>
                            </div>

                            {/* Service Images */}
                            <DynamicGallery service={services[activeIndex]} />
                        </div>
                    </div>
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
