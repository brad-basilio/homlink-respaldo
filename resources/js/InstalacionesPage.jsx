import { Calendar } from "lucide-react";
import {
    ChevronDown,
    Clock,
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
const InstalacionesPage = () => {
    return (
        <div className=" font-poppins">
            <Header />
            <div className="min-h-screen bg-white font-sans text-negro">
                <div className="max-w-[82rem] mx-auto px-4 lg:px-[5%] py-8 lg:py-12">
                    {/* Header Section */}
                    <div className="text-center mb-8 lg:mb-12">
                        <h1 className="text-[40px] leading-[42px] lg:text-6xl font-semibold mb-4 lg:pt-2 ">
                            Nuestras Sedes: Espacios
                            <br />
                            diseñados para tu{" "}
                            <span className="text-azul">bienestar</span>
                        </h1>
                        <p className=" max-w-[60rem] mx-auto text-base pt-2 lg:text-lg">
                            En NOPAIN, contamos con instalaciones modernas y
                            equipadas para brindarte la mejor experiencia en
                            fisioterapia y rehabilitación. Nuestras sedes en
                            Miraflores, San Borja y San Isidro están diseñadas
                            para ofrecerte comodidad, accesibilidad y atención
                            personalizada en un ambiente profesional. Encuentra
                            la más cercana y agenda tu cita.
                        </p>
                    </div>

                    {/* Sede Miraflores */}
                    <div className="mb-12 md:mb-16 pt-5">
                        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                            {/* Info Section - Full width on mobile, left column on desktop */}
                            <div className="md:w-1/2 mb-6 lg:mb-0">
                                <h2 className="text-[40px] leading-[42px] font-semibold mb-1 lg:text-5xl ">
                                    Sede Central
                                    <br />
                                    <span className="text-azul">
                                        Miraflores
                                    </span>
                                </h2>
                                <p className=" mb-4 lg:text-lg lg:pt-4 max-w-[28rem] ">
                                    Nuestra sede central en Miraflores ofrece
                                    tecnología de punta y un equipo de
                                    especialistas listos para ayudarte en cada
                                    etapa de tu recuperación.
                                </p>

                                <div className="gap-4 mb-6 pt-4 lg:text-lg ">
                                    <div>
                                        <h3 className="font-semibold">
                                            Dirección:
                                        </h3>
                                        <p className="">Calle Chiclayo 723</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Teléfono:
                                        </h3>
                                        <p className="">976 953 599</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Correo electrónico:
                                        </h3>
                                        <p className="">
                                            info-miraflores@nopain.com.pe
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Horario de atención
                                        </h3>
                                        <p className="">
                                            Lunes a viernes: 8:00 am a 8:00 pm
                                        </p>
                                        <p className="">
                                            Sábados: 8:00 am a 2:00 pm
                                        </p>
                                    </div>
                                </div>

                                <button className=" mt-16 lg:mt-6 bg-[#EFF0F1] text-[#242424] py-1 pl-1 pr-3  gap-2 rounded-full flex items-center lg:h-14">
                                    <img
                                        src="/assets/img/home/treatment.png"
                                        className="w-12 h-auto  bg-[#224483] rounded-full p-2"
                                    />
                                    Reservar una cita
                                </button>
                            </div>

                            {/* Images Section - Full width on mobile, right column on desktop */}
                            <div className="md:w-1/2 grid grid-cols-2 gap-2">
                                <div className="h-32 lg:h-72 rounded-lg overflow-hidden">
                                    <img
                                        src="/assets/img/instalaciones/imagen2.png"
                                        alt="Instalaciones Miraflores - Área de ejercicios"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="h-32 lg:h-72 rounded-lg overflow-hidden">
                                    <img
                                        src="/assets/img/instalaciones/imagen1.png"
                                        alt="Instalaciones Miraflores - Equipamiento"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="col-span-2 h-48 lg:h-64 rounded-lg overflow-hidden">
                                    <img
                                        src="/assets/img/instalaciones/imagen3.png"
                                        alt="Instalaciones Miraflores - Sala principal"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sede San Borja */}
                    <div className="mb-12 md:mb-16">
                        <div className="flex flex-col lg:flex-row-reverse lg:items-start lg:justify-between lg:gap-40">
                            {/* Info Section - Full width on mobile, right column on desktop */}
                            <div className="md:w-1/2 mb-6 md:mb-0 pt-4">
                                <h2 className="text-[40px] leading-[42px] font-semibold mb-1 lg:text-5xl">
                                    Sede
                                    <br />
                                    <span className="text-azul">San Borja</span>
                                </h2>
                                <p className=" lg:text-lg lg:pt-4 max-w-[28rem]">
                                    Un espacio pensado para tu bienestar, con
                                    tratamientos personalizados y el respaldo de
                                    nuestros fisioterapeutas especializados.
                                </p>

                                <div className="gap-4 mb-6 pt-4 lg:text-lg">
                                    <div>
                                        <h3 className="font-semibold">
                                            Dirección:
                                        </h3>
                                        <p className="">Calle Bernini 354</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Teléfono:
                                        </h3>
                                        <p className="">398 7331</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Correo electrónico:
                                        </h3>
                                        <p className="">
                                            info-sanborja@nopain.com.pe
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Horario de atención
                                        </h3>
                                        <p className="">
                                            Lunes a viernes: 8:00 am a 8:00 pm
                                        </p>
                                        <p className="">
                                            Sábados: 8:00 am a 2:00 pm
                                        </p>
                                    </div>
                                </div>

                                <button className=" mt-16 lg:mt-6 bg-[#EFF0F1] text-[#242424] py-1 pl-1 pr-3  gap-2 rounded-full flex items-center lg:h-14">
                                    <img
                                        src="/assets/img/home/treatment.png"
                                        className="w-12 h-auto  bg-[#224483] rounded-full p-2"
                                    />
                                    Reservar una cita
                                </button>
                            </div>

                            {/* Images Section - Full width on mobile, left column on desktop */}
                            <div className="md:w-1/2 grid grid-cols-2 gap-2">
                                <div className="col-span-1 row-span-1 h-40 lg:h-72 rounded-lg overflow-hidden">
                                    <img
                                        src="/assets/img/instalaciones/imagen2.png"
                                        alt="Instalaciones San Borja - Sala principal"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="col-span-1 row-span-2 h-80 md:h-[36rem] lg:w-[22rem] rounded-lg overflow-hidden">
                                    <img
                                        src="/assets/img/instalaciones/imagen1.png"
                                        alt="Instalaciones San Borja - Equipamiento"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="col-span-1 row-span-1 h-40 lg:h-72  rounded-lg overflow-hidden">
                                    <img
                                        src="/assets/img/instalaciones/imagen3.png"
                                        alt="Instalaciones San Borja - Área de ejercicios"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sede San Isidro */}
                    <div>
                        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                            {/* Info Section - Full width on mobile, left column on desktop */}
                            <div className="md:w-1/2 mb-6 md:mb-0 pt-4">
                                <h2 className="text-[40px] leading-[42px] font-semibold mb-1 lg:text-5xl">
                                    Sede
                                    <br />
                                    <span className="text-azul">
                                        San Isidro
                                    </span>
                                </h2>
                                <p className=" lg:text-lg lg:pt-4 max-w-[28rem]">
                                    Nuestra sede central en Miraflores ofrece
                                    tecnología de punta y un equipo de
                                    especialistas listos para ayudarte en cada
                                    etapa de tu recuperación.
                                </p>

                                <div className="gap-4 mb-6 pt-4 lg:text-lg">
                                    <div>
                                        <h3 className="font-semibold">
                                            Dirección:
                                        </h3>
                                        <p className="">
                                            Av. Emilio Cavenecia 225,
                                            Consultorio 513 - 516
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Teléfono:
                                        </h3>
                                        <p className="">976 953 717</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Correo electrónico:
                                        </h3>
                                        <p className="">
                                            cavenecia@nopain.com.pe
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Horario de atención
                                        </h3>
                                        <p className="">
                                            Lunes a viernes: 8:00 am a 8:00 pm
                                        </p>
                                        <p className="">
                                            Sábados: 8:00 am a 2:00 pm
                                        </p>
                                    </div>
                                </div>

                                <button className=" mt-16 lg:mt-6 bg-[#EFF0F1] text-[#242424] py-1 pl-1 pr-3  gap-2 rounded-full flex items-center lg:h-14">
                                    <img
                                        src="/assets/img/home/treatment.png"
                                        className="w-12 h-auto  bg-[#224483] rounded-full p-2"
                                    />
                                    Reservar una cita
                                </button>
                            </div>

                            {/* Images Section - Full width on mobile, right column on desktop */}
                            <div className="md:w-1/2 grid grid-cols-2 gap-2">
                                <div className="col-span-2 h-48 lg:h-64 rounded-lg overflow-hidden">
                                    <img
                                        src="/assets/img/instalaciones/imagen1.png"
                                        alt="Instalaciones San Isidro - Sala principal"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="h-32 lg:h-72 rounded-lg overflow-hidden">
                                    <img
                                        src="/assets/img/instalaciones/imagen2.png"
                                        alt="Instalaciones San Isidro - Área de ejercicios"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="h-32 lg:h-72 rounded-lg overflow-hidden">
                                    <img
                                        src="/assets/img/instalaciones/imagen3.png"
                                        alt="Instalaciones San Isidro - Equipamiento"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WhatsApp Button - Fixed position */}
                <div className="fixed bottom-6 right-6 z-50 md:flex hidden">
                    <a
                        href="#"
                        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition duration-300"
                        aria-label="Contactar por WhatsApp"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
};
CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <InstalacionesPage {...properties} />
            </Base>
        </CarritoProvider>
    );
});
