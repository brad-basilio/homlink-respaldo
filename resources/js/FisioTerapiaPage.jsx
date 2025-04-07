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

import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

import HealthSection from "./components/Home/HealthSection";
import TratamientoSection from "./components/Home/TratamientoSection";
import TestimonioSection from "./components/Home/TestimonioSection";
import AcercaDe from "./components/Home/AcercaDe";
import TextWithHighlight from "./Utils/TextWithHighlight";
import { ChevronDown, ChevronUp } from "lucide-react";

const FisioTerapiaPage = ({ landing, staffData, specialities }) => {
    const landingHero = landing.find(
        (item) => item.correlative === "page_aboutus_hero"
    );
    const landingSpecialities = landing.find(
        (item) => item.correlative === "page_aboutus_specialties"
    );
    const landingStaff = landing.find(
        (item) => item.correlative === "page_aboutus_staff"
    );

    /*PARA STAFF */
    // Estado para el filtro activo y cards expandidas
    const [activeFilter, setActiveFilter] = useState(staffData[0].job);
    const [expandedCard, setExpandedCard] = useState(null);

    // Filtrar staff por categoría
    const filteredStaff = staffData.filter(
        (person) => person.job === activeFilter
    );

    // Categorías únicas
    const categories = [...new Set(staffData.map((person) => person.job))];
    // Función para extraer la plataforma social de la URL
    const extractSocialPlatform = (url) => {
        if (!url) return "default";

        const socialPlatforms = {
            "facebook.com": "facebook",
            "twitter.com": "twitter",
            "x.com": "twitter",
            "instagram.com": "instagram",
            "linkedin.com": "linkedin",
            "youtube.com": "youtube",
            "tiktok.com": "tiktok",
        };

        try {
            const domain = new URL(url).hostname.replace("www.", "");
            return socialPlatforms[domain] || "instagram";
        } catch {
            return "default";
        }
    };
    const [activeIndex, setActiveIndex] = useState(0);

    /*VERSION MOBILE DE STAFF */
    const [activeSlide, setActiveSlide] = useState(0);
    const staffSlides = [];

    for (let i = 0; i < filteredStaff.length; i += 3) {
        staffSlides.push(filteredStaff.slice(i, i + 3));
    }

    return (
        <div className=" font-poppins">
            <Header />
            <div className="px-[5%]  lg:px-0 min-h-screen bg-white font-sans text-negro">
                {/* Hero Section */}
                <header className="w-full  max-w-[82rem] mx-auto  pt-10 pb-6 md:pt-10 md:pb-12">
                    <div className=" md:text-center max-w-4xl md:mx-auto lg:max-w-6xl mb-6 md:mb-14">
                        <h1 className="text-[40px] md:text-4xl lg:text-6xl font-semibold leading-[42px] lg:text-center   lg:leading-tight mb-2 md:mb-3 text-center">
                            <TextWithHighlight
                                text={landingHero.title}
                                split_coma={true}
                            />
                        </h1>
                        <p className=" text-base  lg:text-lg max-w-3xl lg:max-w-4xl  md:mx-auto leading-relaxed text-center">
                            {landingHero.description}
                        </p>
                    </div>

                    <div className="w-full mt-0 rounded-2xl overflow-hidden shadow-lg h-[500px] lg:h-[500px]  lg:max-w-6xl lg:mx-auto">
                        <img
                            src={`/api/landing_home/media/${landingHero.image}`}
                            alt={landingHero.title}
                            className="w-full h-full object-cover"
                            onError={(e) =>
                                (e.target.src = "/api/cover/thumbnail/null")
                            }
                        />
                    </div>
                </header>

                {/* Especialidades Section */}
                <section className="w-full lg:max-w-[82rem] lg:px-[5%] lg:mx-auto py-10 lg:py-0">
                    <div className="  mx-auto ">
                        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                            <div className="lg:w-1/2">
                                <div className="mb-6 lg:mb-4">
                                    <h2 className="text-[40px] leading-[42px]  lg:text-6xl font-semibold mb-2 lg:max-w-lg">
                                        <TextWithHighlight
                                            text={landingSpecialities.title}
                                        />
                                    </h2>
                                    <p className=" text-lg lg:max-w-lg lg:mt-4">
                                        {landingSpecialities.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-2 gap-y-1 lg:mt-8">
                                    {(() => {
                                        // Dividir las especialidades en dos arrays iguales
                                        const middleIndex = Math.ceil(
                                            specialities.length / 2
                                        );
                                        const firstHalf = specialities.slice(
                                            0,
                                            middleIndex
                                        );
                                        const secondHalf =
                                            specialities.slice(middleIndex);

                                        return (
                                            <>
                                                <div className="ml-6">
                                                    <ul className="list-disc text-lg leading-[22px]">
                                                        {firstHalf.map(
                                                            (
                                                                especialidad,
                                                                index
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        especialidad.id ||
                                                                        index
                                                                    }
                                                                    className="mb-1"
                                                                >
                                                                    {
                                                                        especialidad.name
                                                                    }
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>

                                                <div className="ml-6">
                                                    <ul className="list-disc text-lg leading-[22px]">
                                                        {secondHalf.map(
                                                            (
                                                                especialidad,
                                                                index
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        especialidad.id ||
                                                                        index
                                                                    }
                                                                    className="mb-1"
                                                                >
                                                                    {
                                                                        especialidad.name
                                                                    }
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>

                                <button className="hidden lg:flex  text-white font-medium  rounded-full mt-8 lg:mt-4  items-center">
                                    <a
                                        href="/services"
                                        className=" mt-5 bg-[#EFF0F1] text-[#242424] py-1 pl-1 pr-3  gap-2 rounded-full flex items-center lg:h-14"
                                    >
                                        <div className="bg-[#224483] w-12 p-2 rounded-full">
                                            <img
                                                src="/assets/img/icons/treatment.png"
                                                className=" h-auto"
                                            />
                                        </div>
                                        Ver todos los servicios
                                    </a>
                                </button>
                            </div>

                            <div className="lg:w-1/2 mt-4 lg:mt-0">
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    loop={true}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1,
                                            spaceBetween: 10,
                                        },
                                        640: {
                                            slidesPerView: 1,
                                            spaceBetween: 10,
                                        },
                                        1024: {
                                            slidesPerView: 1,
                                            spaceBetween: 10,
                                        },
                                    }}
                                    modules={[Navigation, Pagination]}
                                    onSlideChange={(swiper) =>
                                        setActiveIndex(swiper.realIndex)
                                    }
                                >
                                    {specialities.map((speciality, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="rounded-2xl overflow-hidden shadow-lg h-[380px] lg:h-[650px]">
                                                <img
                                                    src={`/api/speciality/media/${speciality.image}`}
                                                    alt="Tratamiento de fisioterapia"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                {/* Paginacion personalizada */}
                                <div className="w-[150px] mx-auto overflow-hidden flex justify-center gap-2 mt-10">
                                    {specialities
                                        .slice(
                                            Math.max(0, activeIndex - 1), // desde un índice antes del activo
                                            Math.min(
                                                specialities.length,
                                                activeIndex + 2
                                            ) // hasta uno después del activo
                                        )
                                        .map((_, indexOffset) => {
                                            // indexOffset es el índice relativo en la ventana (0, 1, 2)
                                            const index =
                                                Math.max(0, activeIndex - 1) +
                                                indexOffset; // índice real en el array
                                            return (
                                                <button
                                                    key={index}
                                                    className={`rounded-full transition-all duration-300 ${
                                                        index === activeIndex
                                                            ? "bg-[#224483] w-[20px] h-[12px]"
                                                            : "bg-[#22448366] w-[12px] h-[12px]"
                                                    }`}
                                                />
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Staff Section */}
                <section className="w-full pt-4 pb-12 lg:pt-16 lg:pb-0 lg:max-w-[82rem] lg:mx-auto lg:px-[5%]">
                    <div className=" mx-auto ">
                        <div className="text-center mb-10 lg:mb-8">
                            <h2 className="text-[40px] leading-[42px] l lg:text-7xl font-semibold  lg:max-w-4xl lg:mx-auto mb-4">
                                <TextWithHighlight text={landingStaff.title} />
                            </h2>
                            <p className=" text-base mt-8 lg:text-lg max-w-3xl mx-auto">
                                {landingStaff.description}
                            </p>
                        </div>

                        {/* Staff Categories */}
                        <div className="flex items-center justify-center">
                            <div className="flex justify-center gap-8 text-[#242424] mb-8 lg:mb-16 bg-[#F2F3F4] py-1 px-1 w-max rounded-full">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        className={`flex items-center cursor-pointer h-12 px-4 capitalize ${
                                            activeFilter === category
                                                ? "text-azul bg-[#E2E4E7] rounded-full px-4 "
                                                : ""
                                        }`}
                                        onClick={() => {
                                            setActiveFilter(category);
                                            setExpandedCard(null); // Cerrar card al cambiar filtro
                                        }}
                                    >
                                        <span
                                            className={`w-2 h-2 rounded-full mr-2 ${
                                                activeFilter === category
                                                    ? "bg-azul"
                                                    : "hidden"
                                            }`}
                                        ></span>
                                        <span className="text-lg md:text-base font-medium">
                                            {category}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Staff Cards - Main Row */}
                        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 ">
                            {filteredStaff.map((person, index) => (
                                <div
                                    key={person.id}
                                    className={`bg-white rounded-xl lg:rounded-2xl shadow-md relative transition-all duration-300 ${
                                        expandedCard === index ? "z-10" : ""
                                    }`}
                                >
                                    {/* Imagen */}
                                    <div className="h-[350px] lg:h-80 rounded-t-3xl overflow-hidden">
                                        <img
                                            src={`/api/staff/media/${person.image}`}
                                            alt={person.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Contenido básico */}
                                    <div className="p-4 lg:mt-4 relative">
                                        <h3 className="font-semibold text-2xl">
                                            <TextWithHighlight
                                                text={person.name}
                                            />
                                        </h3>
                                        <p
                                            className={`text-lg  line-clamp-1 ${
                                                expandedCard === index
                                                    ? "hidden"
                                                    : " "
                                            }`}
                                        >
                                            {person.description}
                                        </p>

                                        {/* Botón para expandir */}
                                        <button
                                            className={`absolute  right-4 bg-white rounded-full p-2 shadow-sm hover:bg-gray-100 transition-colors ${
                                                expandedCard === index
                                                    ? "bottom-4"
                                                    : "bottom-10 "
                                            }`}
                                            onClick={() =>
                                                setExpandedCard(
                                                    expandedCard === index
                                                        ? null
                                                        : index
                                                )
                                            }
                                        >
                                            {expandedCard === index ? (
                                                <ChevronUp className="h-5 w-5 text-azul" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-azul" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Contenido expandido (absoluto hacia abajo) */}
                                    {expandedCard === index && (
                                        <div className="absolute left-0 right-0 top-full -mt-10 bg-white p-6 rounded-b-xl lg:rounded-b-2xl shadow-lg z-20   animate-dropDown">
                                            <div className="space-y-4">
                                                {/* Descripción completa */}
                                                <p className="text-base">
                                                    {person.description}
                                                </p>

                                                {/* Credenciales */}
                                                <div className="space-y-4">
                                                    {person.characteristics.map(
                                                        (characteristic, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex items-start gap-4"
                                                            >
                                                                <img
                                                                    src="/assets/img/icons/pin.png"
                                                                    className="w-6 h-6 mt-1 flex-shrink-0"
                                                                />
                                                                <p className="text-base lg:text-[17px]">
                                                                    {
                                                                        characteristic
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>

                                                {/* Redes sociales */}
                                                {person.socials?.length > 0 && (
                                                    <div className="flex gap-4 mt-6 justify-end">
                                                        {person.socials.map(
                                                            (social, i) => {
                                                                const platform =
                                                                    extractSocialPlatform(
                                                                        social
                                                                    );
                                                                return (
                                                                    <a
                                                                        key={i}
                                                                        href={
                                                                            social
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <img
                                                                            src={`/assets/img/icons/socials/${platform}.png`}
                                                                            className="h-10 w-10 hover:opacity-80 transition-opacity"
                                                                            alt={
                                                                                platform
                                                                            }
                                                                        />
                                                                    </a>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* MOBILE - carrusel de 3 en 3 */}
                        <div className="  md:hidden">
                            <Swiper
                                spaceBetween={0} // Espacio entre los slides
                                slidesPerView={1} // En mobile, 1 slide por vez
                                breakpoints={{
                                    // Cuando la pantalla tenga más de 640px, muestra 3 por slide
                                    640: {
                                        slidesPerView: 3,
                                    },
                                }}
                                loop={true} // Si quieres que el slider sea infinito
                                pagination={{
                                    clickable: true, // Los puntos son clickeables
                                }}
                                onSlideChange={(swiper) =>
                                    setActiveSlide(swiper.realIndex)
                                } // Para cambiar el índice activo
                            >
                                {staffSlides.map((group, slideIndex) => (
                                    <SwiperSlide key={slideIndex}>
                                        <div className="grid grid-cols-1 gap-6">
                                            {group.map((person, index) => (
                                                <div
                                                    key={person.id}
                                                    className={`bg-white rounded-xl lg:rounded-2xl shadow-md relative transition-all duration-300 ${
                                                        expandedCard === index
                                                            ? "z-10"
                                                            : ""
                                                    }`}
                                                >
                                                    {/* Imagen */}
                                                    <div className="h-[350px] lg:h-80 rounded-t-3xl overflow-hidden">
                                                        <img
                                                            src={`/api/staff/media/${person.image}`}
                                                            alt={person.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>

                                                    {/* Contenido básico */}
                                                    <div className="p-4 lg:mt-4 relative">
                                                        <h3 className="font-semibold text-2xl">
                                                            <TextWithHighlight
                                                                text={
                                                                    person.name
                                                                }
                                                            />
                                                        </h3>
                                                        <p
                                                            className={`text-lg  line-clamp-1 ${
                                                                expandedCard ===
                                                                index
                                                                    ? "hidden"
                                                                    : " "
                                                            }`}
                                                        >
                                                            {person.description}
                                                        </p>

                                                        {/* Botón para expandir */}
                                                        <button
                                                            className={`absolute  right-4 bg-white rounded-full p-2 shadow-sm hover:bg-gray-100 transition-colors ${
                                                                expandedCard ===
                                                                index
                                                                    ? "bottom-4"
                                                                    : "bottom-10 "
                                                            }`}
                                                            onClick={() =>
                                                                setExpandedCard(
                                                                    expandedCard ===
                                                                        index
                                                                        ? null
                                                                        : index
                                                                )
                                                            }
                                                        >
                                                            {expandedCard ===
                                                            index ? (
                                                                <ChevronUp className="h-5 w-5 text-azul" />
                                                            ) : (
                                                                <ChevronDown className="h-5 w-5 text-azul" />
                                                            )}
                                                        </button>
                                                    </div>

                                                    {/* Contenido expandido (absoluto hacia abajo) */}
                                                    {expandedCard === index && (
                                                        <div className="absolute left-0 right-0 top-full -mt-4 bg-white p-6 rounded-b-xl lg:rounded-b-2xl shadow-lg z-20   animate-dropDown">
                                                            <div className="space-y-4">
                                                                {/* Descripción completa */}
                                                                <p className="text-base">
                                                                    {
                                                                        person.description
                                                                    }
                                                                </p>

                                                                {/* Credenciales */}
                                                                <div className="space-y-4">
                                                                    {person.characteristics.map(
                                                                        (
                                                                            characteristic,
                                                                            i
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="flex items-start gap-4"
                                                                            >
                                                                                <img
                                                                                    src="/assets/img/icons/pin.png"
                                                                                    className="w-6 h-6 mt-1 flex-shrink-0"
                                                                                />
                                                                                <p className="text-base lg:text-[17px]">
                                                                                    {
                                                                                        characteristic
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>

                                                                {/* Redes sociales */}
                                                                {person.socials
                                                                    ?.length >
                                                                    0 && (
                                                                    <div className="flex gap-4 mt-6 justify-end">
                                                                        {person.socials.map(
                                                                            (
                                                                                social,
                                                                                i
                                                                            ) => {
                                                                                const platform =
                                                                                    extractSocialPlatform(
                                                                                        social
                                                                                    );
                                                                                return (
                                                                                    <a
                                                                                        key={
                                                                                            i
                                                                                        }
                                                                                        href={
                                                                                            social
                                                                                        }
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                    >
                                                                                        <img
                                                                                            src={`/assets/img/icons/socials/${platform}.png`}
                                                                                            className="h-10 w-10 hover:opacity-80 transition-opacity"
                                                                                            alt={
                                                                                                platform
                                                                                            }
                                                                                        />
                                                                                    </a>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="flex justify-center mt-4 space-x-2 md:hidden">
                            {staffSlides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSlide(index)}
                                    className={`rounded-full transition-all duration-300 ${
                                        index === activeSlide
                                            ? "bg-[#224483] w-[20px] h-[12px]"
                                            : "bg-[#22448366] w-[12px] h-[12px]"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};
CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <FisioTerapiaPage {...properties} />
            </Base>
        </CarritoProvider>
    );
});
