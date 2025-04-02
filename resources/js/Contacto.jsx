import { Send, ChevronDown } from "lucide-react";
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

const ContactoPage = () => {
    return (
        <div className="font-poppins text-negro">
            <Header />
            <div className="min-h-screen bg-white font-sans">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row md:gap-16">
                        {/* Información de contacto - Lado izquierdo en desktop */}
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h1 className="text-[40px] mt-3 lg:mt-0 leading-[42px] lg:text-6xl font-semibold mb-2">
                                Conéctate con el{" "}
                                <span className="text-azul">bienestar</span>
                            </h1>
                            <p className=" mb-6 text-lg">
                                El dolor no tiene por qué limitarte. Escríbenos
                                y descubre cómo podemos ayudarte a moverte
                                mejor, sentirte mejor y vivir sin limitaciones.
                                ¡Estamos aquí para ti!
                            </p>

                            <div className="space-y-6 ">
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">
                                        Horario de Atención
                                    </h2>
                                    <p className="">
                                        Lunes a viernes: 8:00 am a 8:00 pm
                                    </p>
                                    <p className="">
                                        Sábados: 8:00 am a 2:00 pm
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-2">
                                        Sede Central Miraflores
                                    </h2>
                                    <p className="">Calle Chiclayo 723</p>
                                    <p className="">Teléfono: 976 953 599</p>
                                    <p className="">
                                        info-miraflores@nopain.com.pe
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-2">
                                        Sede San Borja
                                    </h2>
                                    <p className="">Calle Bernini 354</p>
                                    <p className="">Teléfono: 398 7331</p>
                                    <p className="">
                                        info-sanborja@nopain.com.pe
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-2">
                                        Sede San Isidro
                                    </h2>
                                    <p className="">Av. Emilio Cavenecia 225</p>
                                    <p className="">Consultorio 513 - 516</p>
                                    <p className="">Teléfono: 976 953 717</p>
                                    <p className="">cavenecia@nopain.com.pe</p>
                                </div>
                            </div>
                        </div>

                        {/* Formulario de contacto - Lado derecho en desktop */}
                        <div className="md:w-1/2">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-3xl font-semibold mb-6">
                                    Ponte en{" "}
                                    <span className="text-azul">contacto</span>{" "}
                                    con nuestro equipo ahora
                                </h2>

                                <form className="flex flex-col gap-y-6">
                                    <div>
                                        <label
                                            htmlFor="nombre"
                                            className="block text-sm font-medium  mb-1"
                                        >
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            placeholder="Ingresa tu nombre"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="apellido-materno"
                                                className="block text-sm font-medium  mb-1"
                                            >
                                                Apellido
                                            </label>
                                            <input
                                                type="text"
                                                id="apellido-materno"
                                                placeholder="Ingresa tu apellido"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium  mb-1"
                                        >
                                            E-mail
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Ingresa tu dirección de correo electrónico"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="telefono"
                                            className="block text-sm font-medium  mb-1"
                                        >
                                            Número de teléfono
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center">
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-between h-full px-3 border-r border-gray-300 text-gray-500 focus:outline-none"
                                                >
                                                    PE{" "}
                                                    <ChevronDown className="ml-1 h-4 w-4" />
                                                </button>
                                            </div>
                                            <input
                                                type="tel"
                                                id="telefono"
                                                placeholder="(+51) 000-000-000"
                                                className="w-full pl-16 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="mensaje"
                                            className="block text-sm font-medium  mb-1"
                                        >
                                            Escribe un mensaje
                                        </label>
                                        <textarea
                                            id="mensaje"
                                            rows={6}
                                            placeholder="Escríbenos tu pregunta aquí"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        ></textarea>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="privacidad"
                                                type="checkbox"
                                                className="h-4 w-4 text-blue-700 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="privacidad"
                                                className=""
                                            >
                                                Usted acepta nuestra amigable
                                                política de privacidad.
                                            </label>
                                        </div>
                                    </div>

                                    <button className=" mt-5 bg-[#224483] w-8/12 lg:w-3/6 text-white py-1 pl-1 pr-3  gap-2 rounded-full flex items-center lg:h-14">
                                        <img
                                            src="/assets/img/home/treatment.png"
                                            className="w-12 h-auto  bg-[#224483] rounded-full p-2"
                                        />
                                        Enviar formulario
                                    </button>
                                </form>
                            </div>

                            {/* WhatsApp Section - Solo visible en móvil */}
                            <div className="mt-8 flex gap-4 items-center md:hidden p-8">
                                <div className="bg-green-500 text-white p-2 rounded-full mr-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className=" font-medium">
                                        ¿Tienes dudas sobre como agendar? Haz
                                        clic aquí y chatea con nosotros por
                                        WhatsApp
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Section - Full width */}
                    <div className="mt-12 md:mt-16 bg-azul rounded-xl overflow-hidden">
                        <div className="relative py-8 px-6 text-white text-center">
                            {/* Avatars */}
                            <div className="flex justify-center mb-4">
                                <div className="flex -space-x-2">
                                    <img
                                        src="/assets/img/contacto/avatar1.png"
                                        alt="Staff member 1"
                                        className="w-10 h-10 rounded-full border-2 border-white"
                                    />
                                    <img
                                        src="/assets/img/contacto/avatar2.png"
                                        alt="Staff member 2"
                                        className="w-10 h-10 rounded-full border-2 border-white"
                                    />
                                    <img
                                        src="/assets/img/contacto/avatar3.png"
                                        alt="Staff member 3"
                                        className="w-10 h-10 rounded-full border-2 border-white"
                                    />
                                </div>
                            </div>

                            <h2 className="text-2xl font-semibold mb-2">
                                ¿Aún tienes preguntas?
                            </h2>
                            <p className="text-blue-100 mb-6 text-lg max-w-xl mx-auto">
                                ¿No encuentras la respuesta que buscas? Por
                                favor chatea con nuestro amigable equipo.
                            </p>

                            <button className="bg-white text-azul font-medium py-3 px-6 rounded-full inline-flex items-center">
                                <Send className="mr-2 h-5 w-5" />
                                Ayuda Chat
                            </button>

                            {/* Background image - Podría ser reemplazado con una imagen real */}
                            <div className="absolute inset-0 z-[-1] opacity-10">
                                <img
                                    src="/placeholder.svg?height=400&width=1200"
                                    alt="Background"
                                    className="w-full h-full object-cover"
                                />
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
                <ContactoPage {...properties} />
            </Base>
        </CarritoProvider>
    );
});
