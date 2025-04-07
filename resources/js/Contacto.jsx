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
import TextWithHighlight from "./Utils/TextWithHighlight";
import ContactForm from "./Components/Contact/ContactForm";

const ContactoPage = ({ landing, sedes, whatsapp, staff }) => {
    const landingHero = landing.find(
        (item) => item.correlative === "page_contact_hero"
    );
    const landingForm = landing.find(
        (item) => item.correlative === "page_contact_form"
    );
    const landingHelp = landing.find(
        (item) => item.correlative === "page_contact_help"
    );

    // Asegurarnos de que sedes sea siempre un array
    const sedesValidas = Array.isArray(sedes) ? sedes : [];

    // Verificar si hay sedes y si todos tienen el mismo horario
    const todosHorariosIguales =
        sedesValidas.length > 0 &&
        sedesValidas.every(
            (sede, _, arr) =>
                JSON.stringify(sede.horario) === JSON.stringify(arr[0].horario)
        );

    /*FORMULARIO  DE CONTACTO */

    return (
        <div className="font-poppins text-negro">
            <Header />
            <div className="min-h-screen bg-white font-sans">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row md:gap-16">
                        {/* Información de contacto - Lado izquierdo en desktop */}
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h1 className="text-[40px] mt-3 lg:mt-0 leading-[42px] lg:text-6xl font-semibold mb-2">
                                <TextWithHighlight text={landingHero.title} />
                            </h1>
                            <p className=" mb-6 text-lg">
                                {landingHero.description}
                            </p>
                            <div className="space-y-6 lg:pt-16">
                                {/* Mostrar horario general si todos son iguales */}
                                {todosHorariosIguales && (
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">
                                            Horario de Atención
                                        </h2>
                                        {sedes[0].business_hours.map(
                                            (horario, index) => (
                                                <p key={index} className="">
                                                    {horario}
                                                </p>
                                            )
                                        )}
                                    </div>
                                )}

                                {/* Información de cada sede */}
                                {sedes.map((sede) => (
                                    <div key={sede.id}>
                                        <h2 className="text-xl font-semibold mb-2">
                                            <TextWithHighlight
                                                text={sede.title}
                                            />
                                        </h2>
                                        {sede.ubications.map(
                                            (ubication, index) => (
                                                <p key={index} className="">
                                                    {ubication}
                                                </p>
                                            )
                                        )}
                                        <p className="flex gap-2">
                                            Teléfono:{" "}
                                            {sede.phones.map((phone, index) => (
                                                <p key={index} className="">
                                                    {phone}
                                                </p>
                                            ))}
                                        </p>
                                        {sede.emails.map((email, index) => (
                                            <p key={index} className="">
                                                {email}
                                            </p>
                                        ))}

                                        {/* Mostrar horario individual si son diferentes */}
                                        {!todosHorariosIguales && (
                                            <div className="mt-2">
                                                <h3 className="font-semibold">
                                                    Horario:
                                                </h3>
                                                {sede.business_hours.map(
                                                    (business_hour, i) => (
                                                        <p key={i} className="">
                                                            {business_hour}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Formulario de contacto - Lado derecho en desktop */}
                        <div className="md:w-1/2">
                            <div className="bg-gray-50 p-6 rounded-3xl">
                                <h2 className="text-3xl font-semibold mb-6">
                                    <TextWithHighlight
                                        text={landingForm.title}
                                    />
                                </h2>
                                <ContactForm />
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
                    <div className="mt-12 md:mt-16 rounded-3xl overflow-hidden relative">
                        {/* Background image - Capa más baja */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={`/api/landing_home/media/${landingHelp.image}`}
                                alt="Background"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Overlay azul - Capa intermedia */}
                        <div className="absolute inset-0 bg-azul/90 z-10"></div>

                        {/* Contenido - Capa superior */}
                        <div className="relative py-8 px-6 text-white text-center z-20">
                            {/* Avatars */}
                            <div className="flex justify-center mb-4">
                                <div className="flex -space-x-2">
                                    {staff &&
                                        staff.length > 0 &&
                                        staff.map((job, index) => (
                                            <img
                                                src={`/api/staff/media/${job.image}`}
                                                alt={job.name}
                                                className="w-14 h-14 object-cover rounded-full border-2 border-white"
                                            />
                                        ))}
                                </div>
                            </div>

                            <h2 className="text-2xl font-semibold mb-2 relative">
                                <TextWithHighlight text={landingHelp.title} />
                            </h2>

                            <p className="text-blue-100 mb-6 text-lg max-w-xl mx-auto relative">
                                {landingHelp.description}
                            </p>

                            <a
                                href={whatsapp.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#EFF0F1] text-azul font-medium py-1 px-6 rounded-full inline-flex items-center relative hover:bg-gray-100 transition-colors"
                            >
                                <div className="bg-[#EFF0F1] w-12 p-2 rounded-full">
                                    <img
                                        src="/assets/img/icons/send.png"
                                        className=" h-auto"
                                    />
                                </div>
                                Ayuda Chat
                            </a>
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
