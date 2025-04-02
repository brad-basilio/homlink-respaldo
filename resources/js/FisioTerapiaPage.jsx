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

const FisioTerapiaPage = () => {
    const especilidades = [
        {
            id: 1,
            name: "Esguinces",
        },
        {
            id: 2,
            name: "Luxaciones",
        },
        {
            id: 3,
            name: "Fracturas",
        },
        {
            id: 4,
            name: "Desgarres musculares",
        },
        {
            id: 5,
            name: "Hernia del núcleo pulposo",
        },
        {
            id: 6,
            name: "Artrosis",
        },
        {
            id: 7,
            name: "Tendinitis",
        },
        {
            id: 8,
            name: "Hombro congelado",
        },
        {
            id: 9,
            name: "Meniscopatías",
        },
        {
            id: 10,
            name: "Radiculopatías",
        },
        {
            id: 11,
            name: "Lumbalgia",
        },
        {
            id: 12,
            name: "Lumbociatalgia",
        },
        {
            id: 13,
            name: "Cervicalgia",
        },
        {
            id: 14,
            name: "Cervicobraquialgia",
        },
        {
            id: 15,
            name: "Dorsalgia",
        },
        {
            id: 16,
            name: "Síndrome de hombro doloroso",
        },
        {
            id: 17,
            name: "Disfunciones de ATM",
        },
        {
            id: 18,
            name: "Síndrome de túnel carpiano",
        },
        {
            id: 19,
            name: "Epicondilitis",
        },
        {
            id: 20,
            name: "Epitrocleitis",
        },
        {
            id: 21,
            name: "Fibromialgia",
        },
        {
            id: 22,
            name: "Síndrome de fatiga crónica",
        },
        {
            id: 23,
            name: "Alteraciones posturales",
        },
    ];

    return (
        <div className=" font-poppins">
            <Header />
            <div className="px-[5%]  lg:px-0 min-h-screen bg-white font-sans text-negro">
                {/* Hero Section */}
                <header className="w-full  max-w-[82rem] mx-auto  pt-10 pb-6 md:pt-10 md:pb-12">
                    <div className=" md:text-center max-w-4xl md:mx-auto lg:max-w-6xl mb-6 md:mb-14">
                        <h1 className="text-[40px] md:text-4xl lg:text-6xl font-semibold leading-[42px]   lg:leading-tight mb-2 md:mb-3 text-center">
                            Expertos en fisioterapia,
                            <br className="block" />
                            enfocados en tu{" "}
                            <span className="text-azul">recuperación</span>
                        </h1>
                        <p className=" text-base  lg:text-lg max-w-3xl lg:max-w-4xl  md:mx-auto leading-relaxed text-center">
                            Somos el Centro Especializado en Fisioterapia del
                            dolor músculo-esquelético y rehabilitación.
                            Brindamos un análisis biomecánico completo,
                            ayudándolo a comprender el problema y comprometernos
                            con la solución de su lesión. Nuestro Staff está
                            conformado por profesionales Licenciados en Terapia
                            Física y Rehabilitación con constante actualización
                            internacional.
                        </p>
                    </div>

                    <div className="w-full mt-0 rounded-2xl overflow-hidden shadow-lg h-[500px] lg:h-[500px]  lg:max-w-6xl lg:mx-auto">
                        <img
                            src="/assets/img/fisio/home.png"
                            alt="Fisioterapia en acción"
                            className="w-full h-full object-cover"
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
                                        ¿Qué{" "}
                                        <span className="text-blue-700">
                                            especialidades
                                        </span>
                                        <br className="block" />
                                        Tratamos?
                                    </h2>
                                    <p className=" text-lg lg:max-w-lg lg:mt-4">
                                        Nuestro tratamiento consiste en la
                                        corrección directa de los factores
                                        mecánicos causantes del dolor.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-2 gap-y-1 lg:mt-8">
                                    <div className=" ml-6">
                                        <ul className="list-disc text-lg leading-[22px]">
                                            {especilidades
                                                .slice(0, 12)
                                                .map((especialidad, index) => (
                                                    <li key={index}>
                                                        {especialidad.name}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>

                                    <div className=" ml-6">
                                        <ul className="list-disc text-lg">
                                            {especilidades
                                                .slice(12)
                                                .map((especialidad, index) => (
                                                    <li key={index}>
                                                        {especialidad.name}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>

                                <button className="hidden lg:flex  text-white font-medium  rounded-full mt-8 lg:mt-4  items-center">
                                    <button className=" mt-5 bg-[#EFF0F1] text-[#242424] py-1 pl-1 pr-3  gap-2 rounded-full flex items-center lg:h-14">
                                        <img
                                            src="/assets/img/home/treatment.png"
                                            className="w-12 h-auto  bg-[#224483] rounded-full p-2"
                                        />
                                        Ver todos los servicios
                                    </button>
                                </button>
                            </div>

                            <div className="lg:w-1/2 mt-4 lg:mt-0">
                                <div className="rounded-2xl overflow-hidden shadow-lg h-[380px] lg:h-[650px]">
                                    <img
                                        src="/assets/img/fisio/especialidad.png"
                                        alt="Tratamiento de fisioterapia"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="hidden lg:flex justify-center mt-4 space-x-2">
                                    <span className="rounded-full transition-all duration-300  bg-[#22448366] w-[12px] h-[12px] "></span>
                                    <span className="rounded-full transition-all duration-300  bg-[#224483] w-[20px]  h-[12px]"></span>
                                    <span className="rounded-full transition-all duration-300  bg-[#22448366] w-[12px] h-[12px]"></span>
                                </div>
                            </div>
                        </div>

                        {/* Pagination dots */}
                        <div className="flex lg:hidden justify-center mt-8 space-x-2">
                            <span className="rounded-full transition-all duration-300  bg-[#22448366] w-[12px] h-[12px] "></span>
                            <span className="rounded-full transition-all duration-300  bg-[#224483] w-[20px]  h-[12px]"></span>
                            <span className="rounded-full transition-all duration-300  bg-[#22448366] w-[12px] h-[12px]"></span>
                        </div>
                    </div>
                </section>

                {/* Staff Section */}
                <section className="w-full pt-4 pb-12 lg:pt-16 lg:pb-0 lg:max-w-[82rem] lg:mx-auto lg:px-[5%]">
                    <div className=" mx-auto ">
                        <div className="text-center mb-10 lg:mb-8">
                            <h2 className="text-[40px] leading-[42px] l lg:text-7xl font-semibold  lg:max-w-4xl lg:mx-auto mb-4">
                                Nuestro <span className="text-azul">Staff</span>{" "}
                                de profesionales
                            </h2>
                            <p className=" text-base mt-8 lg:text-lg max-w-3xl mx-auto">
                                Somos el Centro Especializado en Fisioterapia
                                del dolor músculo-esquelético y rehabilitación.
                                Brindamos un análisis biomecánico completo,
                                ayudándolo a comprender.
                            </p>
                        </div>

                        {/* Staff Categories */}
                        <div className="flex justify-center gap-8 mb-8 lg:mb-16">
                            <div className="flex items-center">
                                <span className="w-2 h-2 rounded-full bg-azul mr-2"></span>
                                <span className="text-lg md:text-base font-medium">
                                    Terapeutas
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-2 h-2 rounded-full bg-gray-300 mr-2"></span>
                                <span className="text-lg md:text-base font-medium">
                                    Bodyworkers
                                </span>
                            </div>
                        </div>

                        {/* Staff Cards - Main Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
                            {/* Staff Card 1 */}
                            <div className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-md relative">
                                <div className="h-[350px] lg:h-80">
                                    <img
                                        src="/assets/img/fisio/doc1.png"
                                        alt="Lic. Edwin Chávez"
                                        className="w-full h-full object-cover  "
                                    />
                                </div>
                                <div className="p-4  lg:mt-4">
                                    <h3 className="font-semibold text-2xl ">
                                        Lic. Edwin Chávez
                                    </h3>
                                    <p className="text-lg line-clamp-1">
                                        Tratamientos efectivos para reducir
                                        molestias
                                    </p>
                                    <button className="absolute bottom-10 right-4 bg-white rounded-full p-1 shadow-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-azul"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Staff Card 2 */}
                            <div className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-md relative">
                                <div className="h-[350px] lg:h-80">
                                    <img
                                        src="/assets/img/fisio/doc2.png"
                                        alt="Lic. Edwin Chávez"
                                        className="w-full h-full object-cover  "
                                    />
                                </div>
                                <div className="p-4  lg:mt-4">
                                    <h3 className="font-semibold text-2xl ">
                                        Daniela Pastor
                                    </h3>
                                    <p className="text-lg line-clamp-1">
                                        Tratamientos efectivos para reducir
                                        molestias
                                    </p>
                                    <button className="absolute bottom-10 right-4 bg-white rounded-full p-1 shadow-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-azul"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Staff Card 3 with Credentials */}
                            <div className="bg-white relative rounded-xl lg:rounded-2xl overflow-hidden shadow-md z-0 ">
                                <div className="h-[350px] lg:h-80">
                                    <img
                                        src="/assets/img/fisio/doc3.png"
                                        alt="Ingebor Arce"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4 relative">
                                    <div className="absolute z-50 p-4 w-full  inset-0 top-0">
                                        <h3 className="font-semibold text-2xl lg:text-lg">
                                            Ingebor Arce
                                        </h3>
                                        <p className="text-base line-clamp-3">
                                            Praesent fringilla sem a elit
                                            consequat ultrices. Vestibulum ante
                                            ipsum primis in faucibus orci luctus
                                            et ultrices posuere cubilia curae.
                                        </p>

                                        <div className="space-y-2 mt-4">
                                            <div className="flex items-start gap-4">
                                                <img
                                                    src="/assets/img/acercaDe/pin.png"
                                                    className="w-6 h-6"
                                                />

                                                <p className="text-base lg:text-[17px]">
                                                    Egresado de la Universidad
                                                    Nacional Federico Villarreal
                                                </p>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <img
                                                    src="/assets/img/acercaDe/pin.png"
                                                    className="w-6 h-6"
                                                />

                                                <p className="text-base lg:text-[17px]">
                                                    Maestro en Terapia Manual
                                                    Ortopédica, Universidad
                                                    Andrés Bello, Santiago de
                                                    Chile - Chile
                                                </p>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <img
                                                    src="/assets/img/acercaDe/pin.png"
                                                    className="w-6 h-6"
                                                />

                                                <p className="text-base lg:text-[17px]">
                                                    Maestro en Gerencia en
                                                    servicios de Salud,
                                                    Universidad Nacional Mayor
                                                    de San Marcos, Lima - Perú
                                                </p>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <img
                                                    src="/assets/img/acercaDe/pin.png"
                                                    className="w-6 h-6"
                                                />

                                                <p className="text-base lg:text-[17px]">
                                                    Diplomado en Fisioterapia
                                                    Deportiva, Universidad
                                                    Andrés Bello, Santiago de
                                                    Chile - Chile
                                                </p>
                                            </div>
                                        </div>
                                        {/* Social Media Footer */}
                                        <footer className="w-full py-6">
                                            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-end space-x-4">
                                                <div className="flex gap-4">
                                                    <img
                                                        src="/assets/img/fisio/instagram.png"
                                                        className="h-12 w-12"
                                                    />
                                                    <img
                                                        src="/assets/img/fisio/twitter.png"
                                                        className="h-12 w-12"
                                                    />
                                                </div>
                                            </div>
                                        </footer>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Pagination dots */}
                        <div className="flex  lg:hidden justify-center mt-8 space-x-2">
                            <span className="rounded-full transition-all duration-300  bg-[#22448366] w-[12px] h-[12px] "></span>
                            <span className="rounded-full transition-all duration-300  bg-[#224483] w-[20px]  h-[12px]"></span>
                            <span className="rounded-full transition-all duration-300  bg-[#22448366] w-[12px] h-[12px]"></span>
                        </div>

                        {/* Additional Staff Grid - 2x2 */}
                        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                            {/* Grid Item 1 */}
                            <div className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-md relative">
                                <div className="h-[350px] lg:h-80">
                                    <img
                                        src="/assets/img/fisio/doc2.png"
                                        alt="Lic. Edwin Chávez"
                                        className="w-full h-full object-cover  "
                                    />
                                </div>
                                <div className="p-4  lg:mt-4">
                                    <h3 className="font-semibold text-2xl ">
                                        Daniela Pastor
                                    </h3>
                                    <p className="text-lg line-clamp-1">
                                        Tratamientos efectivos para reducir
                                        molestias
                                    </p>
                                    <button className="absolute bottom-10 right-4 bg-white rounded-full p-1 shadow-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-azul"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Grid Item 2 */}
                            <div className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-md relative">
                                <div className="h-[350px] lg:h-80">
                                    <img
                                        src="/assets/img/fisio/doc2.png"
                                        alt="Lic. Edwin Chávez"
                                        className="w-full h-full object-cover  "
                                    />
                                </div>
                                <div className="p-4  lg:mt-4">
                                    <h3 className="font-semibold text-2xl ">
                                        Daniela Pastor
                                    </h3>
                                    <p className="text-lg line-clamp-1">
                                        Tratamientos efectivos para reducir
                                        molestias
                                    </p>
                                    <button className="absolute bottom-10 right-4 bg-white rounded-full p-1 shadow-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-azul"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Grid Item 3 */}
                            <div className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-md relative">
                                <div className="h-[350px] lg:h-80">
                                    <img
                                        src="/assets/img/fisio/doc2.png"
                                        alt="Lic. Edwin Chávez"
                                        className="w-full h-full object-cover  "
                                    />
                                </div>
                                <div className="p-4  lg:mt-4">
                                    <h3 className="font-semibold text-2xl ">
                                        Daniela Pastor
                                    </h3>
                                    <p className="text-lg line-clamp-1">
                                        Tratamientos efectivos para reducir
                                        molestias
                                    </p>
                                    <button className="absolute bottom-10 right-4 bg-white rounded-full p-1 shadow-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-azul"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Additional Staff Grid - 3 columns */}
                        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {/* Grid Item 1 */}
                            <div className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-md relative">
                                <div className="h-[350px] lg:h-80">
                                    <img
                                        src="/assets/img/fisio/doc2.png"
                                        alt="Lic. Edwin Chávez"
                                        className="w-full h-full object-cover  "
                                    />
                                </div>
                                <div className="p-4  lg:mt-4">
                                    <h3 className="font-semibold text-2xl ">
                                        Daniela Pastor
                                    </h3>
                                    <p className="text-lg line-clamp-1">
                                        Tratamientos efectivos para reducir
                                        molestias
                                    </p>
                                    <button className="absolute bottom-10 right-4 bg-white rounded-full p-1 shadow-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-azul"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Grid Item 2 */}
                            <div className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-md relative">
                                <div className="h-[350px] lg:h-80">
                                    <img
                                        src="/assets/img/fisio/doc2.png"
                                        alt="Lic. Edwin Chávez"
                                        className="w-full h-full object-cover  "
                                    />
                                </div>
                                <div className="p-4  lg:mt-4">
                                    <h3 className="font-semibold text-2xl ">
                                        Daniela Pastor
                                    </h3>
                                    <p className="text-lg line-clamp-1">
                                        Tratamientos efectivos para reducir
                                        molestias
                                    </p>
                                    <button className="absolute bottom-10 right-4 bg-white rounded-full p-1 shadow-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-azul"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Grid Item 3 */}
                            <div className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-md relative">
                                <div className="h-[350px] lg:h-80">
                                    <img
                                        src="/assets/img/fisio/doc2.png"
                                        alt="Lic. Edwin Chávez"
                                        className="w-full h-full object-cover  "
                                    />
                                </div>
                                <div className="p-4  lg:mt-4">
                                    <h3 className="font-semibold text-2xl ">
                                        Daniela Pastor
                                    </h3>
                                    <p className="text-lg line-clamp-1">
                                        Tratamientos efectivos para reducir
                                        molestias
                                    </p>
                                    <button className="absolute bottom-10 right-4 bg-white rounded-full p-1 shadow-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-azul"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
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
