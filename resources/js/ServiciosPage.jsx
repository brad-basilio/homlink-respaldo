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
const ServiciosPage = () => {
    return (
        <div className=" font-poppins">
            <Header />
            <div className="min-h-screen bg-white font-sans">
                {/* Hero Image */}
                <div className="w-full mt-4 lg:mt-0 h-52 md:h-64 overflow-hidden rounded-b-3xl">
                    <img
                        src="/assets/img/servicios/bg-header.png"
                        alt="Equipamiento médico de fisioterapia"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="max-w-6xl mx-auto px-4 lg:px-3 py-8">
                    {/* Title Section */}
                    <div className="text-center mb-8 lg:mt-10">
                        <h1 className="text-5xl leading-[42px] lg:text-6xl font-semibold mb-2">
                            Tratamientos diseñados
                            <br className="hidden lg:flex" />
                            para tu <span className="text-azul">bienestar</span>
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:gap-12 lg:pt-2 justify-between">
                        {/* Services Menu - Hidden on mobile, visible on desktop */}
                        <div className="hidden lg:block  lg:w-[30%] mt-10">
                            <h2 className="text-xl lg:text-2xl font-semimbold mb-4">
                                Servicios
                            </h2>
                            <div className="space-y-2">
                                {[
                                    {
                                        name: "Evaluación Biomecánica",
                                        active: false,
                                    },
                                    {
                                        name: "Fisioterapia Post-Operativa",
                                        active: true,
                                    },
                                    {
                                        name: "Fisioterapia Traumatológica",
                                        active: false,
                                    },
                                    {
                                        name: "Fisioterapia Ortopédica",
                                        active: false,
                                    },
                                    {
                                        name: "Fisioterapia en Difusiones Temporomandibulares",
                                        active: false,
                                    },
                                    { name: "Alta Tecnología", active: false },
                                    {
                                        name: "Pre Natal - Post Parto",
                                        active: false,
                                    },
                                    {
                                        name: "Nopain Atención domiciliaria",
                                        active: false,
                                    },
                                    {
                                        name: "Fisioterapia en la tercera edad",
                                        active: false,
                                    },
                                    {
                                        name: "Camilla de inversión",
                                        active: false,
                                    },
                                    { name: "Humac Balance", active: false },
                                ].map((service, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-between p-3 lg:py-3 lg:px-0 rounded-md cursor-pointer ${
                                            service.active
                                                ? "bg-gray-100"
                                                : "hover:bg-gray-50"
                                        }`}
                                    >
                                        <span
                                            className={`lg:text-lg ${
                                                service.active
                                                    ? "font-medium"
                                                    : ""
                                            }`}
                                        >
                                            {service.name}
                                        </span>
                                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                            <img
                                                src={`/assets/img/servicios/thum.png`}
                                                alt={service.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Services Dropdown - Visible on mobile only */}
                        <div className="md:hidden mb-6 ">
                            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md">
                                <span className="font-medium">Servicios</span>
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Service Details */}
                        <div className="lg:w-[62%]">
                            <h2 className="text-5xl lg:text-5xl lg:mt-6 font-semibold mb-4">
                                Fisioterapia <br className="hidden lg:block" />{" "}
                                Post-Operativa
                            </h2>

                            <div className="mb-8 lg:mb-4 pt-4 lg:pt-2 text-lg">
                                <p className=" mb-2">
                                    Esta terapia se ofrece durante el período
                                    post-operatorio inmediato. Seguimos
                                    estrictamente los protocolos internacionales
                                    para diseñar una intervención específica.
                                </p>
                                <p className=" mb-4">
                                    Nuestros objetivos son para optimizar la
                                    recuperación del paciente y para prevenir
                                    las complicaciones post-operatorias comunes
                                    que podrían interferir con su evolución como
                                    adherencias, fibrosis o descompensación
                                    muscular.
                                </p>
                            </div>

                            {/* Service Features */}
                            <div className="space-y-3 mb-8 text-lg">
                                <div className="flex gap-2 items-start">
                                    <img
                                        src="/assets/img/acercaDe/pin.png"
                                        className="w-6 h-6"
                                    />
                                    <p className="">
                                        Duración de la sesión – 45 a 60 minutos
                                    </p>
                                </div>
                                <div className="flex gap-2 items-start">
                                    <img
                                        src="/assets/img/acercaDe/pin.png"
                                        className="w-6 h-6"
                                    />
                                    <p className="">
                                        Tiempo de recuperación – Depende del
                                        tipo de cirugía y avance del paciente
                                    </p>
                                </div>
                                <div className="flex gap-2 items-start">
                                    <img
                                        src="/assets/img/acercaDe/pin.png"
                                        className="w-6 h-6"
                                    />
                                    <p className="">
                                        Objetivo – Acelerar la recuperación y
                                        reducir complicaciones postoperatorias
                                    </p>
                                </div>
                                <div className="flex gap-2 items-start">
                                    <img
                                        src="/assets/img/acercaDe/pin.png"
                                        className="w-6 h-6"
                                    />
                                    <p className="">
                                        Áreas tratadas – Articulaciones,
                                        músculos y movilidad general
                                    </p>
                                </div>
                                <div className="flex gap-2 items-start">
                                    <img
                                        src="/assets/img/acercaDe/pin.png"
                                        className="w-6 h-6"
                                    />
                                    <p className="">
                                        Métodos – Terapia manual, ejercicios
                                        guiados y técnicas especializadas
                                    </p>
                                </div>
                                <div className="flex gap-2 items-start">
                                    <img
                                        src="/assets/img/acercaDe/pin.png"
                                        className="w-6 h-6"
                                    />
                                    <p className="">
                                        Frecuencia recomendada – 2 a 3 veces por
                                        semana
                                    </p>
                                </div>
                                <div className="flex gap-2 items-start">
                                    <img
                                        src="/assets/img/acercaDe/pin.png"
                                        className="w-6 h-6"
                                    />
                                    <p className="">
                                        Supervisión – Tratamiento personalizado
                                        con fisioterapeuta especializado
                                    </p>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="mb-8">
                                <button className="w-full md:w-auto bg-azul hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-full transition duration-300 flex items-center justify-center">
                                    <Calendar className="mr-2 h-5 w-5" />
                                    <span className="md:hidden">
                                        Agendar cita
                                    </span>
                                    <span className="hidden md:inline">
                                        Reserva tu cita
                                    </span>
                                </button>
                            </div>

                            {/* Service Images */}
                            <div className="space-y-4 pt-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
                                {/* Main Image - Full width on mobile, larger on desktop */}
                                <div className="md:col-span-2 rounded-2xl overflow-hidden h-64 lg:h-[30rem] ">
                                    <img
                                        src="/assets/img/servicios/image1.png"
                                        alt="Fisioterapia post-operativa"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Additional Images - Grid on desktop */}
                                <div className="rounded-2xl overflow-hidden  h-64 lg:h-64 ">
                                    <img
                                        src="/assets/img/servicios/image2.png"
                                        alt="Terapia con pelotas"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden h-64 lg:h-64 ">
                                    <img
                                        src="/assets/img/servicios/image3.png"
                                        alt="Ejercicios de rehabilitación"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
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
                <ServiciosPage {...properties} />
            </Base>
        </CarritoProvider>
    );
});
