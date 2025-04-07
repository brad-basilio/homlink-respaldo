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
import TextWithHighlight from "./Utils/TextWithHighlight";
import ModalAppointment from "./components/Appointment/ModalAppointment";
const SedeItem = ({ sede, index, isModalOpen, setIsModalOpen }) => {
    // Alternar la posición de la información (izquierda/derecha) basado en el índice
    const isEven = index % 2 === 0;
    const isTriple = index % 3 === 0;
    return (
        <div className="pt-12">
            <div
                className={`flex flex-col md:flex-row ${
                    isEven ? "" : "md:flex-row-reverse"
                } md:items-start md:gap-8`}
            >
                {/* Info Section */}
                <div className="md:w-1/2 mb-6 lg:mb-0">
                    <h2 className="text-[40px] leading-[42px] font-semibold mb-1 lg:text-5xl">
                        {sede.title.includes("*") ? (
                            <>
                                {sede.title.split("*")[0]}
                                <br />
                                <span className="text-azul">
                                    {sede.title.split("*")[1]}
                                </span>
                            </>
                        ) : (
                            <>
                                {sede.title.split(" ")[0]}
                                <br />
                                <span className="text-azul">
                                    {sede.title.split(" ").slice(1).join(" ")}
                                </span>
                            </>
                        )}
                    </h2>
                    <p className="mb-4 lg:text-lg lg:pt-4 max-w-[28rem]">
                        {sede.description}
                    </p>

                    <div className="gap-4 mb-6 pt-4 lg:text-lg">
                        <div>
                            <h3 className="font-semibold">Dirección:</h3>

                            {sede.ubications.map((direction, index) => {
                                return <p key={index}>{direction}</p>;
                            })}
                        </div>

                        <div>
                            <h3 className="font-semibold">Teléfono:</h3>
                            {sede.phones.map((phone, index) => {
                                return <p key={index}>{phone}</p>;
                            })}
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Correo electrónico:
                            </h3>
                            {sede.emails.map((email, index) => {
                                return <p key={index}>{email}</p>;
                            })}
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Horario de atención
                            </h3>
                            {sede.business_hours.map((business_hour, index) => {
                                return <p key={index}>{business_hour}</p>;
                            })}
                        </div>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-16 lg:mt-6 bg-[#EFF0F1] text-[#242424] py-1 pl-1 pr-3 gap-2 rounded-full flex items-center lg:h-14"
                    >
                        <div className="bg-[#224483] w-12 p-2 rounded-full">
                            <img
                                src="/assets/img/icons/calendar-check.png"
                                className=" h-auto    "
                            />
                        </div>
                        Reservar una cita
                    </button>
                </div>

                {/* Images Section - Diseño dinámico basado en número de imágenes */}
                <div className="md:w-1/2 grid grid-cols-12 grid-rows-12 gap-2 h-[552px] ">
                    {sede.gallery.length === 1 && (
                        <div className="col-span-12 row-span-12 rounded-lg overflow-hidden">
                            <img
                                src={`/api/facility/media/${sede.gallery[0]}`}
                                alt={`Instalaciones ${sede.title}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {sede.gallery.length === 2 && (
                        <>
                            <div className="col-span-12 row-span-6  rounded-lg overflow-hidden">
                                <img
                                    src={`/api/facility/media/${sede.gallery[0]}`}
                                    alt={`Instalaciones ${sede.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="col-span-12 row-span-6  rounded-lg overflow-hidden">
                                <img
                                    src={`/api/facility/media/${sede.gallery[1]}`}
                                    alt={`Instalaciones ${sede.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </>
                    )}

                    {sede.gallery.length === 3 && (
                        <>
                            <div
                                className={` ${
                                    isEven
                                        ? "col-span-6 row-span-6 "
                                        : isTriple
                                        ? "col-span-12 row-span-6"
                                        : "col-span-5 row-span-6"
                                }  rounded-lg overflow-hidden`}
                            >
                                <img
                                    src={`/api/facility/media/${sede.gallery[0]}`}
                                    alt={`Instalaciones ${sede.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div
                                className={` ${
                                    isEven
                                        ? "col-span-6 row-span-6"
                                        : isTriple
                                        ? "col-span-6 row-span-6"
                                        : "col-span-7 row-span-12"
                                } rounded-lg overflow-hidden`}
                            >
                                <img
                                    src={`/api/facility/media/${sede.gallery[1]}`}
                                    alt={`Instalaciones ${sede.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div
                                className={` ${
                                    isEven
                                        ? "col-span-12 row-span-6"
                                        : isTriple
                                        ? "col-span-6 row-span-6"
                                        : " col-span-5 row-span-6"
                                } rounded-lg overflow-hidden`}
                            >
                                <img
                                    src={`/api/facility/media/${sede.gallery[2]}`}
                                    alt={`Instalaciones ${sede.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </>
                    )}

                    {sede.gallery.length === 4 && (
                        <>
                            <div className="col-span-6 row-span-6 rounded-lg overflow-hidden">
                                <img
                                    src={`/api/facility/media/${sede.gallery[0]}`}
                                    alt={`Instalaciones ${sede.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="col-span-6 row-span-6 rounded-lg overflow-hidden">
                                <img
                                    src={`/api/facility/media/${sede.gallery[1]}`}
                                    alt={`Instalaciones ${sede.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="col-span-6 row-span-6 rounded-lg overflow-hidden">
                                <img
                                    src={`/api/facility/media/${sede.gallery[2]}`}
                                    alt={`Instalaciones ${sede.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="col-span-6 row-span-6 rounded-lg overflow-hidden">
                                <img
                                    src={`/api/facility/media/${sede.gallery[3]}`}
                                    alt={`Instalaciones ${sede.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </>
                    )}
                    {sede.gallery.length >= 5 && (
                        <>
                            <div className="col-span-6 row-span-6 rounded-lg overflow-hidden">
                                <img
                                    src={`/api/facility/media/${sede.gallery[0]}`}
                                    alt={`Instalaciones ${sede.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="col-span-6 row-span-4 rounded-lg overflow-hidden">
                                <img
                                    src={`/api/facility/media/${sede.gallery[1]}`}
                                    alt={`Instalaciones ${sede.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="col-span-6 row-span-4 rounded-lg overflow-hidden">
                                <img
                                    src={`/api/facility/media/${sede.gallery[2]}`}
                                    alt={`Instalaciones ${sede.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="col-span-6 row-span-6 rounded-lg overflow-hidden">
                                <img
                                    src={`/api/facility/media/${sede.gallery[3]}`}
                                    alt={`Instalaciones ${sede.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="col-span-6 row-span-4 rounded-lg overflow-hidden">
                                <img
                                    src={`/api/facility/media/${sede.gallery[4]}`}
                                    alt={`Instalaciones ${sede.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const InstalacionesPage = ({
    landing,
    facilities,
    linkWhatsApp,
    randomImage,
}) => {
    const landingHero = landing.find(
        (item) => item.correlative === "page_facility_hero"
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className=" font-poppins">
            <Header />
            <div className="min-h-screen bg-white font-sans text-negro">
                <div className="max-w-[82rem] mx-auto px-4 lg:px-[5%] py-8 lg:py-12">
                    {/* Header Section */}
                    <div className="text-center mb-8 lg:mb-12">
                        <h1 className="text-[40px] leading-[42px] lg:text-6xl font-semibold mb-4 lg:pt-2 lg:max-w-3xl lg:mx-auto  ">
                            <TextWithHighlight text={landingHero.title} />
                        </h1>
                        <p className=" max-w-[60rem] mx-auto text-base pt-2 lg:text-lg">
                            {landingHero.description}
                        </p>
                    </div>

                    {facilities.map((sede, index) => (
                        <SedeItem
                            key={sede.id}
                            sede={sede}
                            index={index}
                            setIsModalOpen={setIsModalOpen}
                            isModalOpen={isModalOpen}
                        />
                    ))}
                </div>

                {/* WhatsApp Button - Fixed position 
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
                </div>*/}
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
                <InstalacionesPage {...properties} />
            </Base>
        </CarritoProvider>
    );
});
