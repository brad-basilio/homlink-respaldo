import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";

import Header from "./components/Tailwind/Header";

import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import ItemsRest from "./actions/ItemRest";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
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

import { motion } from "framer-motion";
import { ScrollAnimation } from "./animations/ScrollAnimation";
import { scrollEffects } from "./animations/animationVariantsSccroll";
import { PersistentScrollAnimation } from "./animations/PersistentScrollAnimation";
import BlurText from "./Utils/BlurText";
import { useTranslation } from "./hooks/useTranslation";


// Animaciones para textos (en loop)
const textVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
    loop: {
        y: [0, -5, 0], // Movimiento sutil arriba/abajo
        transition: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 3,
            ease: "easeInOut",
        },
    },
};

// Animación para el resaltado de texto
const highlightVariants = {
    visible: {
        color: "#224483",
        scale: 1.05,
        transition: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 2.5,
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
    const { t, loading, error } = useTranslation();
    const tipoSlider = "nopain";
    const landingHero = landing?.find(
        (item) => item.correlative === "page_home_hero"
    );
    const landingBenefits = landing?.find(
        (item) => item.correlative === "page_home_benefits"
    );
    const landingServices = landing?.find(
        (item) => item.correlative === "page_home_services"
    );
    const landingTestimonies = landing?.find(
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


    const [allowSync, setAllowSync] = useState(false);
    const [slidesPerView, setSlidesPerView] = useState(4);
    const topSwiperRef = useRef(null);
    const bottomSwiperRef = useRef(null);
  
    // Función para determinar el número de slides por vista según el ancho de la pantalla
    const getCurrentSlidesPerView = () => {
      const width = window.innerWidth;
      if (width >= 1450) return 5;
      if (width >= 1150) return 4;
      if (width >= 950) return 3;
      if (width >= 650) return 2;
      return 1;
    };

    useEffect(() => {
        const handleResize = () => {
          const newSlidesPerView = getCurrentSlidesPerView();
          if (newSlidesPerView !== slidesPerView) {
            setSlidesPerView(newSlidesPerView);
          }
        };
    
        // Establecer el valor inicial
        setSlidesPerView(getCurrentSlidesPerView());
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, [slidesPerView]);
    
      // Función para sincronizar los carruseles
      const syncSwipers = (sourceSwiper, targetSwiper) => {
        if (!allowSync || !sourceSwiper || !targetSwiper) return;
        
        const totalSlides = sourceSwiper.slides.length;
        const activeIndex = sourceSwiper.activeIndex;
        const currentSlidesPerView = sourceSwiper.params.slidesPerView;
        
        // Calculamos la posición correspondiente en el otro carrusel
        let targetIndex = totalSlides - activeIndex - currentSlidesPerView;
        
        // Aseguramos que el índice esté dentro de los límites
        targetIndex = Math.max(0, Math.min(targetIndex, totalSlides - currentSlidesPerView));
        
        // Movemos el carrusel objetivo sin disparar eventos
        setAllowSync(false);
        targetSwiper.slideTo(targetIndex, sourceSwiper.params.speed, false);
        setTimeout(() => {
          setAllowSync(true);
        }, sourceSwiper.params.speed + 50);
      };

      const topSlides = [
        { id: 1, title: "Soluciones Personalizadas 1", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
        { id: 2, title: "Soluciones Personalizadas 2", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
        { id: 3, title: "Soluciones Personalizadas 3", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
        { id: 4, title: "Soluciones Personalizadas 4", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
        { id: 5, title: "Soluciones Personalizadas 5", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
        { id: 6, title: "Soluciones Personalizadas 6", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
        { id: 7, title: "Soluciones Personalizadas 7", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
        { id: 8, title: "Soluciones Personalizadas 8", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
      ];
    
      const bottomSlides = [
        { id: 9, title: "Soluciones Personalizadas 9", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
        { id: 10, title: "Soluciones Personalizadas 10", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
        { id: 11, title: "Soluciones Personalizadas 11", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
        { id: 12, title: "Soluciones Personalizadas 12", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
        { id: 13, title: "Soluciones Personalizadas 13", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
        { id: 14, title: "Soluciones Personalizadas 14", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
        { id: 15, title: "Soluciones Personalizadas 15", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
        { id: 16, title: "Soluciones Personalizadas 16", content: "Cada negocio es único, y nuestras propuestas están diseñadas a medida para abordar tus desafíos específicos con precisión." },
      ];
   

    return (
        <div>
            <Header showSlogan={showSlogan}></Header>
            

        {landingHero && (
            <section className="bg-center lg:h-svh bg-cover bg-no-repeat flex flex-col justify-center relative ">
            <div className="flex flex-col lg:flex-row h-full justify-center items-start lg:items-end relative">
                <div className="absolute w-[20%] h-40 top-0 left-0 bg-gradient-to-r from-[rgba(31,24,39,0.4)] via-[rgba(31,24,39,0.4)] to-[rgba(123,94,154,0.4)] mix-blend-hard-light blur-[200px]"></div>
    
                <div className="pl-[5%] pr-[5%] w-full min-h-[300px] h-full lg:w-1/2 flex flex-col justify-center gap-4 py-8 ">
                    
                    <motion.h3
                            className="font-Poppins_SemiBold text-[#5C4774] text-xl 2xl:text-2xl line-clamp-1 flex flex-row gap-3 items-center"
                            initial="hidden"
                            animate={["visible", "loop"]} // Animación inicial + loop
                            variants={textVariants}
                        >
                            {landingHero?.subtitle}
                    </motion.h3>

                    <motion.h2
                            className="font-Poppins_SemiBold leading-none text-[#3E2F4D] text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
                            initial="hidden"
                            animate={["visible", "loop"]} // Animación inicial + loop
                            variants={textVariants}
                        >
                            {landingHero?.title}
                    </motion.h2>            
                   
                    <motion.p
                            className="font-Poppins_Medium leading-normal text-base 2xl:text-xl text-[#5C4774]"
                            initial="hidden"
                            animate={["visible", "loop"]}
                            variants={textVariants}
                            transition={{ delay: 0.3 }} // Pequeño retraso
                        >
                            {landingHero?.description}
                    </motion.p>    
                    <motion.div
                            className="flex flex-col md:flex-row gap-5"
                            initial={{ opacity: 0 }}
                            animate={["visible", "loop"]}
                            variants={textVariants}
                            transition={{ delay: 0.6 }}
                        >
                        <div className="flex flex-col justify-start items-start font-Poppins_SemiBold">
                            <a href=""><div className="bg-[#7B5E9A] px-4 py-3 rounded-md">
                                <p className="leading-none text-white text-base 2xl:text-lg">Nuestras soluciones</p>
                            </div></a>
                        </div>
    
                        <div className="flex flex-col justify-start items-start font-Poppins_SemiBold">
                            <a href=""><div className="bg-transparent px-4 py-3 rounded-md">
                                <p className="leading-none text-[#3E2F4D] text-base 2xl:text-lg">Habla con un experto</p>
                            </div></a>
                        </div>
                    </motion.div>
                    
                </div>
    
                <div className="pr-[5%] pl-[5%] w-full h-full lg:w-1/2 flex flex-col justify-center items-start lg:items-end bg-gradient-to-r from-[#E6D6F4] to-[#F0E8F9]">
                            <motion.div
                                className=""
                                initial="hidden"
                                animate={["visible", "loop"]}
                                variants={textVariants}
                                transition={{ delay: 0.3 }} // Pequeño retraso
                            >
                                <img
                                    src={`/api/landing_home/media/${landingHero?.image}`}
                                    className="object-center object-contain mx-auto h-full w-auto max-h-[500px] 2xl:max-h-none"
                                    onError={(e) =>
                                        (e.target.src = "/api/cover/thumbnail/null")
                                    }
                                />
                            </motion.div>
                    
                </div>
            </div> 
            </section>
        )}

        <section className="flex flex-col md:justify-center items-center gap-5 2xl:gap-8 px-[5%] pt-10 lg:pt-16">
        
            <div className="flex flex-row items-start justify-start w-full max-w-2xl 2xl:max-w-3xl md:text-center">
                <h2 className="font-Poppins_SemiBold text-[#3E2F4D] text-3xl sm:text-4xl lg:text-[44px] !leading-tight "><TextWithHighlight text={landingBenefits?.title} ></TextWithHighlight></h2>
            </div>

            <div className="flex flex-col items-end justify-start w-full max-w-2xl 2xl:max-w-3xl gap-5 md:text-center">
                <p className="font-Poppins_Regular text-base 2xl:text-lg text-[#5C4774]">
                    {landingBenefits?.description}
                </p>
            </div>

        </section>


        <section className="flex flex-col lg:flex-row justify-start items-start gap-5 lg:gap-16 px-[5%] pt-10 lg:pt-16">
            <div className="bg-[#F5F2F9] p-6 w-full rounded-lg relative space-y-10">
                {/* Carrusel Superior */}
                <Swiper
                ref={topSwiperRef}
                slidesPerView={slidesPerView}
                spaceBetween={10}
                initialSlide={0}
                resistanceRatio={0}
                threshold={10}
                watchSlidesProgress={true}
                slideToClickedSlide={true}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    650: { slidesPerView: 2 },
                    950: { slidesPerView: 3 },
                    1150: { slidesPerView: 4 },
                    1450: { slidesPerView: 5 }
                }}
                onSlideChange={(swiper) => {
                    if (bottomSwiperRef.current) {
                    syncSwipers(swiper, bottomSwiperRef.current.swiper);
                    }
                }}
                onTouchMove={(swiper) => {
                    if (allowSync && bottomSwiperRef.current) {
                    const progress = swiper.progress;
                    bottomSwiperRef.current.swiper.setProgress(1 - progress, false);
                    }
                }}
                >
                {topSlides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                    <div className="flex flex-col gap-4 max-w-xs bg-white bg-opacity-50 rounded-2xl p-5 aspect-square h-64 mx-auto">
                        <div className="bg-[#e9e3f1] w-12 h-12 2xl:w-14 2xl:h-14 rounded-full flex flex-col items-center justify-center">
                        <svg className="w-8 h-8 2xl:w-10 2xl:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 32" fill="none">
                            <path d="M16.4998 29.3333C16.8256 29.3333 17.1284 29.1825 17.734 28.8811L22.602 26.4576C24.7561 25.3853 25.8332 24.8491 25.8332 24V13.3333M16.4998 29.3333C16.1741 29.3333 15.8713 29.1825 15.2657 28.8811L10.3977 26.4576C8.24356 25.3853 7.1665 24.8491 7.1665 24V13.3333M16.4998 29.3333V18.6667M25.8332 13.3333C25.8332 12.4842 24.7561 11.948 22.602 10.8757L17.734 8.45225C17.1284 8.15075 16.8256 8 16.4998 8C16.1741 8 15.8713 8.15075 15.2657 8.45225L10.3977 10.8757C8.24356 11.948 7.1665 12.4842 7.1665 13.3333M25.8332 13.3333C25.8332 14.1824 24.7561 14.7187 22.602 15.7909L17.734 18.2144C17.1284 18.5159 16.8256 18.6667 16.4998 18.6667M7.1665 13.3333C7.1665 14.1824 8.24356 14.7187 10.3977 15.7909L15.2657 18.2144C15.8713 18.5159 16.1741 18.6667 16.4998 18.6667" stroke="#7B5E9A" strokeWidth="2" strokeLinejoin="round"/>
                            <path d="M29.833 28.0013L25.833 24.668" stroke="#7B5E9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.5 2.66797V8.0013" stroke="#7B5E9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3.16699 28.0013L7.16699 24.668" stroke="#7B5E9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </div>
                        <h2 className="font-Poppins_Medium text-[#3E2F4D] text-xl line-clamp-2 leading-none">{slide.title}</h2>
                        <p className="font-Poppins_Regular text-[#5C4774] text-base line-clamp-4">{slide.content}</p>
                    </div>
                    </SwiperSlide>
                ))}
                </Swiper>

                {/* Carrusel Inferior */}
                <Swiper
                ref={bottomSwiperRef}
                slidesPerView={slidesPerView}
                spaceBetween={10}
                initialSlide={bottomSlides.length - slidesPerView}
                resistanceRatio={0}
                threshold={10}
                watchSlidesProgress={true}
                slideToClickedSlide={true}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    650: { slidesPerView: 2 },
                    950: { slidesPerView: 3 },
                    1150: { slidesPerView: 4 },
                    1450: { slidesPerView: 5 }
                }}
                onInit={() => {
                    // Habilitamos la sincronización después de un pequeño retraso
                    setTimeout(() => {
                    setAllowSync(true);
                    }, 100);
                }}
                onSlideChange={(swiper) => {
                    if (topSwiperRef.current) {
                    syncSwipers(swiper, topSwiperRef.current.swiper);
                    }
                }}
                onTouchMove={(swiper) => {
                    if (allowSync && topSwiperRef.current) {
                    const progress = swiper.progress;
                    topSwiperRef.current.swiper.setProgress(1 - progress, false);
                    }
                }}
                >
                {bottomSlides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                    <div className="flex flex-col gap-4 max-w-xs bg-white bg-opacity-50 rounded-2xl p-5 aspect-square h-64 mx-auto">
                        <div className="bg-[#e9e3f1] w-12 h-12 2xl:w-14 2xl:h-14 rounded-full flex flex-col items-center justify-center">
                        <svg className="w-8 h-8 2xl:w-10 2xl:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 32" fill="none">
                            <path d="M16.4998 29.3333C16.8256 29.3333 17.1284 29.1825 17.734 28.8811L22.602 26.4576C24.7561 25.3853 25.8332 24.8491 25.8332 24V13.3333M16.4998 29.3333C16.1741 29.3333 15.8713 29.1825 15.2657 28.8811L10.3977 26.4576C8.24356 25.3853 7.1665 24.8491 7.1665 24V13.3333M16.4998 29.3333V18.6667M25.8332 13.3333C25.8332 12.4842 24.7561 11.948 22.602 10.8757L17.734 8.45225C17.1284 8.15075 16.8256 8 16.4998 8C16.1741 8 15.8713 8.15075 15.2657 8.45225L10.3977 10.8757C8.24356 11.948 7.1665 12.4842 7.1665 13.3333M25.8332 13.3333C25.8332 14.1824 24.7561 14.7187 22.602 15.7909L17.734 18.2144C17.1284 18.5159 16.8256 18.6667 16.4998 18.6667M7.1665 13.3333C7.1665 14.1824 8.24356 14.7187 10.3977 15.7909L15.2657 18.2144C15.8713 18.5159 16.1741 18.6667 16.4998 18.6667" stroke="#7B5E9A" strokeWidth="2" strokeLinejoin="round"/>
                            <path d="M29.833 28.0013L25.833 24.668" stroke="#7B5E9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.5 2.66797V8.0013" stroke="#7B5E9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3.16699 28.0013L7.16699 24.668" stroke="#7B5E9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </div>
                        <h2 className="font-Poppins_Medium text-[#3E2F4D] text-xl line-clamp-2 leading-none">{slide.title}</h2>
                        <p className="font-Poppins_Regular text-[#5C4774] text-base line-clamp-4">{slide.content}</p>
                    </div>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </section>


        <section className="flex flex-col md:justify-center items-center gap-5 2xl:gap-8 px-[5%] pt-10 lg:pt-16">
            <div className="flex flex-row items-start justify-start w-full max-w-3xl 2xl:max-w-4xl md:text-center">
                <h2 className="font-Poppins_SemiBold text-[#3E2F4D] text-3xl sm:text-4xl lg:text-[44px] !leading-tight "><span className="bg-gradient-to-r from-[#7B94B1] to-[#B27BA8] bg-clip-text text-transparent">Descubra lo que los servicios de</span> Sedna pueden hacer por usted</h2>
            </div>
        </section>



            {indicators && (
                <ScrollAnimation>
                    <div className=" h-auto w-full bg-[#F8F8F8] mt-[36px] lg:mt-0">
                        {" "}
                        <div className="lg:max-w-[82rem] mx-auto lg:px-[5%]">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={30}
                                loop={true}
                                breakpoints={{
                                    0: { slidesPerView: 1.5, spaceBetween: 0 },
                                    640: {
                                        slidesPerView: 1.5,
                                        spaceBetween: 10,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 180,
                                    },
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
                </ScrollAnimation>
            )}

            {benefits && landingBenefits && (
                <ScrollAnimation>
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
                            {t(
                                "public.btn.all_services",
                                "Ver todos los servicios"
                            )}
                        </a>
                    </div>
                </ScrollAnimation>
            )}

            {benefits && landingBenefits && (
                <ScrollAnimation>
                    <HealthSection
                        landingBenefits={landingBenefits}
                        benefits={benefits}
                    />
                </ScrollAnimation>
            )}
            {services && landingServices && (
                <ScrollAnimation>
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
                            {t(
                                "public.btn.all_services",
                                "Ver todos los servicios"
                            )}
                        </a>
                    </div>
                </ScrollAnimation>
            )}
            {services && landingServices && (
                <ScrollAnimation>
                    <TratamientoSection
                        setIsModalOpen={setIsModalOpen}
                        isModalOpen={isModalOpen}
                        services={services}
                        landingServices={landingServices}
                    />
                </ScrollAnimation>
            )}
            {services && landingServices && (
                <ScrollAnimation>
                    <div className="px-[5%]  py-4 lg:hidden ">
                        <div className="bg-[#F8F8F8] rounded-3xl p-4">
                            <h2 className="text-[32px] font-medium leading-[102%] max-w-[16rem]">
                                {landingServices?.description}
                            </h2>
                            <motion.div
                                className="w-full px-[5%] lg:px-0 flex items-center justify-center lg:justify-start mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <motion.button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-[#EFF0F1] text-[#242424] py-1 pl-1 pr-3 gap-2 rounded-full flex items-center"
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
                        </div>
                    </div>
                </ScrollAnimation>
            )}
            {testimonies && landingTestimonies && (
                <ScrollAnimation>
                    <div className="px-[5%] flex items-center justify-center mt-9  lg:mt-32">
                        <h2 className="text-[32px] font-medium leading-[102%] w-full text-center lg:text-6xl lg:max-w-3xl lg:tracking-wide  ">
                            <TextWithHighlight
                                text={landingTestimonies?.title}
                            />
                        </h2>
                    </div>
                </ScrollAnimation>
            )}
            {testimonies && (
                <ScrollAnimation>
                    <TestimonioSection testimonies={testimonies} />
                </ScrollAnimation>
            )}
            {staff_boss && <AcercaDe staff_boss={staff_boss} />}
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
