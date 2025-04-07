import React, { useEffect, useRef, useState } from "react";
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
import ReactModal from "react-modal";
import { X } from "lucide-react";
import ModalAppointment from "./components/Appointment/ModalAppointment";
ReactModal.setAppElement("#app");

const Home = ({
    linkWhatsApp,
    randomImage,
    showSlogan = true,
    indicators,
    landing,
    benefits,
    services,
    testimonies,
    staff_boss,
}) => {
    const tipoSlider = "vua";
    const landingHero = landing.find(
        (item) => item.correlative === "page_home_hero"
    );
    const landingBenefits = landing.find(
        (item) => item.correlative === "page_home_benefits"
    );
    const landingServices = landing.find(
        (item) => item.correlative === "page_home_services"
    );
    const landingTestimonies = landing.find(
        (item) => item.correlative === "page_home_testimonies"
    );
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };
    const handleEnded = () => {
        setIsPlaying(false); // Mostrar el botón otra vez
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <Header showSlogan={showSlogan}></Header>
            <div className="relative ">
                <div className="relative">
                    {landingHero?.is_video ? (
                        <div className="relative">
                            <video
                                src={`/api/landing_home/video/${landingHero?.video}`}
                                ref={videoRef}
                                muted
                                playsInline
                                className=" w-full object-cover object-left-top lg:object-contain lg:object-right-top h-[300px]  lg:h-[90vh] mt-4"
                                onError={(e) =>
                                    (e.target.src = "/api/cover/thumbnail/null")
                                }
                                onEnded={handleEnded}
                            />
                            {!isPlaying && (
                                <button
                                    onClick={handlePlay}
                                    className="absolute cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse z-50 lg:ml-40"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="80"
                                        height="80"
                                        viewBox="0 0 80 80"
                                        fill="none"
                                    >
                                        <foreignObject
                                            x="-17.6271"
                                            y="-17.6271"
                                            width="115.254"
                                            height="115.254"
                                        >
                                            <div
                                                xmlns="http://www.w3.org/1999/xhtml"
                                                style={{
                                                    backdropFilter:
                                                        "blur(8.81px)",
                                                    clipPath:
                                                        "url(#bgblur_0_59_6055_clip_path)",
                                                    height: "100%",
                                                    width: "100%",
                                                }}
                                            ></div>
                                        </foreignObject>
                                        <circle
                                            data-figma-bg-blur-radius="17.6271"
                                            cx="40"
                                            cy="40"
                                            r="40"
                                            fill="white"
                                            fillOpacity="0.18"
                                        />
                                        <foreignObject
                                            x="-6.10167"
                                            y="-6.09978"
                                            width="92.2034"
                                            height="92.2035"
                                        >
                                            <div
                                                xmlns="http://www.w3.org/1999/xhtml"
                                                style={{
                                                    backdropFilter:
                                                        "blur(8.81px)",
                                                    clipPath:
                                                        "url(#bgblur_1_59_6055_clip_path)",
                                                    height: "100%",
                                                    width: "100%",
                                                }}
                                            ></div>
                                        </foreignObject>
                                        <circle
                                            data-figma-bg-blur-radius="17.6271"
                                            cx="40"
                                            cy="40.0019"
                                            r="28.4746"
                                            fill="white"
                                            fillOpacity="0.5"
                                        />
                                        <path
                                            d="M49.5178 40.054L35.2578 48.2345L35.3033 31.7948L49.5178 40.054Z"
                                            fill="#FFFCFC"
                                        />
                                        <defs>
                                            <clipPath
                                                id="bgblur_0_59_6055_clip_path"
                                                transform="translate(17.6271 17.6271)"
                                            >
                                                <circle
                                                    cx="40"
                                                    cy="40"
                                                    r="40"
                                                />
                                            </clipPath>
                                            <clipPath
                                                id="bgblur_1_59_6055_clip_path"
                                                transform="translate(6.10167 6.09978)"
                                            >
                                                <circle
                                                    cx="40"
                                                    cy="40.0019"
                                                    r="28.4746"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            )}
                        </div>
                    ) : (
                        <img
                            src={`/api/landing_home/media/${landingHero?.image}`}
                            className=" w-full h-auto mt-4  "
                            onError={(e) =>
                                (e.target.src = "/api/cover/thumbnail/null")
                            }
                        />
                    )}
                    <div
                        className="hidden lg:block absolute top-0 right-0 inset-0"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(255,255,255,1) 30%, rgba(255,255,255,0) 70%)",
                        }}
                    ></div>
                    <div
                        className="block lg:hidden absolute top-0 right-0 inset-0"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 50%)",
                        }}
                    ></div>
                </div>

                <div className="lg:absolute lg:top-1/2  lg:-translate-y-1/2 lg:left-20 lg:max-w-md">
                    <h2 className="w-full px-[5%] text-[32px] mt-8 lg:mt-0 text-center lg:px-0 lg:text-start leading-[34px] lg:text-7xl lg:leading-[102%]">
                        <TextWithHighlight text={landingHero?.title} />
                    </h2>
                    <p className="hidden lg:flex mt-8">
                        {landingHero?.description}
                    </p>
                    <div className="w-full px-[5%] lg:px-0 flex items-center justify-center lg:justify-start mt-4">
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
                </div>
            </div>
            <div className=" h-auto w-full bg-[#F8F8F8] mt-[36px] lg:mt-0">
                {" "}
                <div className="lg:max-w-[82rem] mx-auto lg:px-[5%]">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        loop={true}
                        breakpoints={{
                            0: { slidesPerView: 1.5, spaceBetween: 0 },
                            640: { slidesPerView: 1.5, spaceBetween: 10 },
                            1024: { slidesPerView: 3, spaceBetween: 180 },
                        }}
                    >
                        {indicators.map((benefit, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex gap-4 w-full my-6 lg:my-7 ">
                                    <div className="bg-white rounded-xl h-[60px] w-[60px] lg:h-[80px] lg:w-[80px]  flex items-center justify-center">
                                        <img
                                            src={`/api/indicator/media/${benefit.symbol}`}
                                            className="h-[32.2px] w-[32.2px] lg:h-[40.2px] lg:w-[40.2px] "
                                        />
                                    </div>
                                    <div className="text-[#242424]">
                                        <h1 className="text-4xl lg:text-5xl font-medium leading-[102%]">
                                            {benefit.name}{" "}
                                            <span className="text-[#224483]">
                                                +
                                            </span>
                                        </h1>
                                        <h2 className="font-normal">
                                            {benefit.description}
                                        </h2>
                                    </div>
                                    <span className="hidden lg:block lg:absolute -right-20 top-1/2 -translate-x-1/2  -translate-y-1/2 h-12 w-1 bg-[#242424] rounded-full"></span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="px-[5%] lg:max-w-[82rem] lg:mx-auto mt-10 lg:mt-14 lg:flex lg:justify-between lg:items-center">
                <h2 className="text-[32px] font-medium leading-[102%] max-w-[16rem] lg:text-6xl lg:max-w-[46rem] lg:tracking-wide ">
                    <TextWithHighlight text={landingBenefits?.title} />
                </h2>
                <a
                    href="/services"
                    className=" mt-5 bg-[#EFF0F1] w-max text-[#242424] py-1 pl-1 pr-3  gap-2 rounded-full flex items-center lg:h-14"
                >
                    <div className="bg-[#224483] w-12 p-2 rounded-full">
                        <img
                            src="/assets/img/icons/treatment.png"
                            className=" h-auto    "
                        />
                    </div>
                    Ver todos los servicios
                </a>
            </div>
            <HealthSection
                landingBenefits={landingBenefits}
                benefits={benefits}
            />

            <div className="px-[5%] lg:max-w-[82rem] lg:mx-auto mt-10 lg:mt-10 lg:flex lg:justify-between lg:items-center">
                <h2 className="text-[32px] font-medium leading-[102%] max-w-[16rem] lg:text-6xl lg:max-w-[44rem] lg:tracking-wide ">
                    <TextWithHighlight text={landingServices?.title} />
                </h2>
                <a
                    href="/services"
                    className=" w-max mt-5 bg-[#EFF0F1] text-[#242424] py-1 pl-1 pr-3  gap-2 rounded-full flex items-center lg:h-14"
                >
                    <div className="bg-[#224483] w-12 p-2 rounded-full">
                        <img
                            src="/assets/img/icons/treatment.png"
                            className=" h-auto    "
                        />
                    </div>
                    Ver todos los servicios
                </a>
            </div>

            <TratamientoSection
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                services={services}
                landingServices={landingServices}
            />
            <div className="px-[5%]  py-4 lg:hidden ">
                <div className="bg-[#F8F8F8] rounded-3xl p-4">
                    <h2 className="text-[32px] font-medium leading-[102%] max-w-[16rem]">
                        {landingServices?.description}
                    </h2>
                    <div className="w-full flex items-center justify-end">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-max mt-5 bg-white text-[#242424] py-1 pl-1 pr-3  gap-2 rounded-full flex items-center"
                        >
                            <div className="bg-[#224483] w-12 p-2 rounded-full">
                                <img
                                    src="/assets/img/icons/calendar-check.png"
                                    className=" h-auto "
                                />
                            </div>
                            Reservar una cita
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-[5%] flex items-center justify-center mt-9  lg:mt-32">
                <h2 className="text-[32px] font-medium leading-[102%] w-full text-center lg:text-6xl lg:max-w-3xl lg:tracking-wide  ">
                    <TextWithHighlight text={landingTestimonies?.title} />
                </h2>
            </div>
            <TestimonioSection testimonies={testimonies} />
            <AcercaDe staff_boss={staff_boss} />
            <Footer />
            {/* Modal */}
            <ModalAppointment
                linkWhatsApp={linkWhatsApp}
                randomImage={randomImage}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <Home {...properties} />
            </Base>
        </CarritoProvider>
    );
});
