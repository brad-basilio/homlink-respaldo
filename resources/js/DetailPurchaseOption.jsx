import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import TextWithHighlight from "./Utils/TextWithHighlight";
import ModalAppointment from "./components/Appointment/ModalAppointment";
import DynamicGalleryServiceService from "./DynamicGalleryService";
import { useTranslation } from "./hooks/useTranslation";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const DetailPurchaseOption = ({ landing, purchaseOptions, allOptions, linkWhatsApp, randomImage }) => {
  
    const landingFooter = landing?.find(
        (item) => item.correlative === "page_purchase_contact"
    );
    const landingCardone = landing?.find(
        (item) => item.correlative === "page_purchase_contact_one"
    );
    const landingCardsecond = landing?.find(
        (item) => item.correlative === "page_purchase_contact_two"
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showServicesMenu, setShowServicesMenu] = useState(false);
    const titleRef = useRef(null);
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "/api/cover/thumbnail/null";
    };
    
    const handleServicesMenu = () => {
        setShowServicesMenu(!showServicesMenu);
    };
   
    // Animaciones
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };

    // Función para dividir la descripción en párrafos
    const renderDescription = (description) => {
        if (!description) return null;
        const paragraphs = description.split(/(?<=\.)\s+/);
        return paragraphs.map((paragraph, index) => (
            <motion.p
                key={index}
                className="mb-4 last:mb-0"
                variants={itemVariants}
            >
                {paragraph}
            </motion.p>
        ));
    };

    // Obtener el slug de la URL
    // useEffect(() => {
    //     const getQueryParam = (param) => {
    //         const urlParams = new URLSearchParams(window.location.search);
    //         return urlParams.get(param);
    //     };

    //     const slug = getQueryParam("slug");
    //     if (slug) {
    //         const foundIndex = services.findIndex(
    //             (service) =>
    //                 service.slug === slug ||
    //                 service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") ===
    //                     slug
    //         );
    //         if (foundIndex !== -1) setActiveIndex(foundIndex);
    //     }
    // }, [services]);

    const { t } = useTranslation();
    const parsedCharacteristics = purchaseOptions.characteristics;
    const parsedBenefits= purchaseOptions.benefits;
    const parsedRequirements= purchaseOptions.requirements;

    const ArrowIcon = () => (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
          <mask id="mask0_226_5036" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
            <rect y="0.984375" width="20" height="20" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_226_5036)">
            <path d="M13.4791 11.8203H3.33325V10.1536H13.4791L8.81242 5.48698L9.99992 4.32031L16.6666 10.987L9.99992 17.6536L8.81242 16.487L13.4791 11.8203Z" fill="#7D3CB5"/>
          </g>
        </svg>
      );

    return (
        <div className="font-poppins">
            <Header />
            

            <section className="bg-center h-[87vh] lg:h-[75vh] bg-cover bg-no-repeat flex flex-col justify-center relative"  style={{ backgroundImage: `url('/api/purchaseOption/media/${purchaseOptions.image_banner}')` }}>
                <div className="flex flex-col lg:flex-row h-full justify-center items-start lg:items-end relative">
                    <div className="absolute w-[20%] h-40 top-0 left-0 bg-gradient-to-r from-[rgba(31,24,39,0.4)] via-[rgba(31,24,39,0.4)] to-[rgba(123,94,154,0.4)] mix-blend-hard-light blur-[200px]"></div>
                    <div className="pl-[5%] pr-[5%] lg:w-2/3 w-full min-h-[300px] h-full flex flex-col justify-center gap-4 py-8">
                        <h2 className="font-Poppins_SemiBold leading-none text-white text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                          {purchaseOptions.title}
                        </h2>

                        <p className="font-Poppins_Regular leading-normal text-lg 2xl:text-xl text-white">
                            {purchaseOptions.description}
                        </p>
                    </div>

                    <div className="w-full lg:w-1/3">
                    </div>
                </div>
            </section>



            {allOptions.length > 1 && (
                <section className="w-full px-[5%] pt-10 lg:pt-16">
                    <div className="flex flex-wrap items-center justify-center gap-5 2xl:gap-8 max-w-4xl mx-auto text-[#3E2F4D] font-Poppins_Regular text-base 2xl:text-lg">
                    {allOptions.map((solution) => {
                        const isActive = solution.id === purchaseOptions.id;
                        return (
                        <a
                            key={solution.id}
                            href={`/opcion/${solution.slug}`}
                            className={`pb-[1px] border-b hover:border-[#3E2F4D] transition-all duration-200 ${
                            isActive ? 'font-bold border-[#3E2F4D]' : 'border-transparent'
                            } hover:font-bold`}
                        >
                            {solution.title}
                        </a>
                        );
                    })}
                    </div>
                </section>
            )}



            <section className="flex flex-col md:justify-center items-center gap-5 2xl:gap-8 px-[5%] pt-10 lg:pt-16">
                <div className="flex flex-row items-start justify-start md:justify-center w-full max-w-2xl 2xl:max-w-3xl md:text-center">
                    <h2 className="font-Poppins_Medium text-[#3E2F4D] text-3xl sm:text-4xl lg:text-[44px] !leading-tight">{purchaseOptions.how_it_helps}</h2>
                </div>
        
                <div className="flex flex-col items-center justify-start w-full max-w-2xl 2xl:max-w-3xl gap-5 md:text-center">
                    <p className="font-Poppins_Regular text-base 2xl:text-lg text-[#5C4774]">
                        {purchaseOptions.description_helps}
                    </p>
                </div>
            </section>


            <section className="flex flex-col gap-5 2xl:gap-8 px-[5%] pt-10 lg:pt-16">
                <div className="flex flex-row items-start justify-start w-full">
                    <h2 className="font-Poppins_Medium text-[#3E2F4D] text-3xl sm:text-4xl 2xl:text-[44px] !leading-tight !tracking-tight max-w-xl 2xl:max-w-2xl">
                          {purchaseOptions.value_proposition}
                    </h2>
                </div>

                <div className="w-full">
                    <Swiper
                        className="carrusel_opciones"
                        loop={true}
                        grabCursor={true}
                        centeredSlides={false}
                        initialSlide={0}
                        spaceBetween={20}
                        breakpoints={{
                            0: {
                            slidesPerView: 1,
                            spaceBetween: 15,
                            },
                            600: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                            },
                            1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                            },
                            1350: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                            },
                        }}
                        >
                            {parsedCharacteristics.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex flex-col gap-2 p-6 2xl:p-8 bg-[#F5F2F9] rounded-lg">
                                        <div className="rounded-full aspect-square w-16 bg-white flex flex-col justify-center items-center">
                                            <img src={`/api/purchaseOption/media/${item.image}`} alt={item.title} className="w-8 h-8 object-contain" />
                                        </div>
                                        <h3 className="font-Poppins_Regular font-semibold text-[#3E2F4D] text-lg 2xl:text-xl">{item.title}</h3>
                                        <p className="font-Poppins_Regular text-[#5C4774] text-base 2xl:text-lg">{item.description}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </section>
                        
            
            <section className="px-[5%] pt-10 lg:pt-16">
                <div className="bg-[#F5F2F9] py-10 lg:py-16 px-5 md:px-10 rounded-xl overflow-hidden flex flex-col lg:flex-row items-start gap-12">
                    <div className="w-full lg:w-3/5 order-2 lg:order-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {parsedBenefits.map((option, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-4 p-4 2xl:p-6 bg-white rounded-lg group hover:bg-[#7B5E9A] transition-colors duration-300"
                            >
                                <div className="flex flex-row gap-4 items-center">
                                <div className="rounded-full aspect-square w-16 bg-[#F5F2F9] group-hover:bg-white flex justify-center items-center overflow-hidden">
                                    {option.image && (
                                    <img
                                        src={`/api/purchaseOption/media/${option.image}`}
                                        alt={option.title}
                                        className="object-cover w-8 h-8"
                                        onError={(e) =>(e.target.src = "/api/cover/thumbnail/null")}
                                    />
                                    )}
                                </div>
                                <h2 className="font-Poppins_Medium text-[#3E2F4D] text-xl 2xl:text-2xl group-hover:text-white">
                                    {option.title}
                                </h2>
                                </div>
                                {option.description && (
                                <p className="font-Poppins_Regular text-[#5C4774] text-base 2xl:text-lg group-hover:text-white">
                                    {option.description}
                                </p>
                                )}
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-2/5 order-1 lg:order-2">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-Poppins_SemiBold text-[#3E2F4D] text-3xl sm:text-4xl md:text-3xl lg:text-[44px] !leading-tight ">
                                    <TextWithHighlight text={purchaseOptions?.innovation_focus} ></TextWithHighlight>
                            </h2>
                            <p className="font-Poppins_Regular text-[#5C4774] text-base 2xl:text-lg">{purchaseOptions?.customer_relation}</p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="flex flex-col md:justify-center items-center gap-5 2xl:gap-8 px-[5%] pt-10 lg:pt-16">
                <div className="flex flex-row items-start justify-start md:justify-center w-full max-w-2xl 2xl:max-w-3xl md:text-center">
                    <h2 className="font-Poppins_Medium text-[#3E2F4D] text-3xl sm:text-4xl lg:text-[44px] !leading-tight">{purchaseOptions?.how_it_requirements}</h2>
                </div>
        
                <div className="flex flex-col items-end justify-start w-full max-w-3xl 2xl:max-w-[810px] gap-5 md:text-center">
                    <p className="font-Poppins_Regular text-base 2xl:text-lg text-[#5C4774]">
                        {purchaseOptions?.description_requirements}
                    </p>
                </div>
            </section>


            <section className="px-[5%] pt-10 lg:pt-16">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    loop={true}
                    grabCursor={true}
                    centeredSlides={false}
                    initialSlide={0}
                    navigation={{
                        nextEl: ".swiper-requisitos-next",
                        prevEl: ".swiper-requisitos-prev",
                    }}
                    pagination={{
                        el: ".swiper-pagination-requisitos",
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        650: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1550: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                    className="requisitos h-max"
                >
                    {parsedRequirements.map((requerimiento, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col rounded-lg overflow-hidden">
                                <div className="w-full h-full aspect-[4/3] bg-[#E9E9FD]">
                                    <img src={`/api/purchaseOption/media/${requerimiento.image}`} alt={requerimiento.title} className="object-center object-cover w-full h-full min-h-[190px]" onError={(e) =>(e.target.src = "/api/cover/thumbnail/null")} />
                                </div>
                                <div className="flex flex-col gap-4 p-4 xl:p-6 bg-gradient-to-b from-[#F5F2F9] via-[#F5F2F9]/80 to-[#F5F2F9]/40">
                                    <h2 className="font-Poppins_Medium text-[#3E2F4D] text-xl lg:text-2xl 2xl:text-3xl line-clamp-2">
                                    {requerimiento.title}
                                    </h2>
                                    
                                    <ul className="flex flex-col gap-3">
                                        {requerimiento.characteristics.map((item, itemIndex) => (
                                            <li key={itemIndex} className="w-full flex gap-3"> 
                                            <div className="min-h-4 min-w-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M2.0835 10.0026C2.0835 6.27065 2.0835 4.40468 3.24286 3.2453C4.40224 2.08594 6.26821 2.08594 10.0002 2.08594C13.7321 2.08594 15.5981 2.08594 16.7575 3.2453C17.9168 4.40468 17.9168 6.27065 17.9168 10.0026C17.9168 13.7345 17.9168 15.6005 16.7575 16.7599C15.5981 17.9193 13.7321 17.9193 10.0002 17.9193C6.26821 17.9193 4.40224 17.9193 3.24286 16.7599C2.0835 15.6005 2.0835 13.7345 2.0835 10.0026Z" stroke="#7D3CB5" strokeWidth="1.25"/>
                                                <path d="M6.6665 10.4167L8.74984 12.5L13.3332 7.5" stroke="#7D3CB5" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                            <p className="leading-none font-Poppins_Regular text-[#5C4774] text-base 2xl:text-lg">
                                                {item}
                                            </p>
                                            </li>
                                        ))}
                                    </ul>  
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            
            <section className="flex flex-col lg:flex-row gap-6 px-[5%]  mt-10 lg:mt-16 bg-cover bg-bottom" style={{ backgroundImage: "url('/assets/img/servicios/texturacontactos.png')" }}>
                <div className="flex flex-col w-full lg:w-1/2 gap-5 py-10 lg:py-16">
                    <div className="flex flex-col max-w-xl">
                        <h2 className="font-Poppins_SemiBold text-[#3E2F4D] text-3xl sm:text-4xl md:text-3xl lg:text-[44px] !leading-tight">
                            {landingFooter?.title}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl 2xl:max-w-6xl mx-auto gap-5">
                        <div className="flex flex-col gap-2 p-6 2xl:p-8 bg-white rounded-lg">
                            <div className="rounded-full aspect-square w-16 bg-[#F5F2F9] flex flex-col justify-center items-center">
                                <img
                                    src={`/api/landing_home/media/${landingCardone?.image}`}
                                    className="object-cover w-8 h-8"
                                    onError={(e) =>(e.target.src = "/api/cover/thumbnail/null")}
                                />
                            </div>
                            <h2 className="font-Poppins_SemiBold text-[#3E2F4D] text-lg 2xl:text-xl">
                                {landingCardone?.title}
                            </h2>
                            
                            <p className="font-Poppins_Regular text-[#5C4774] text-base 2xl:text-lg">{landingCardone?.description}</p>
                            <a href={landingCardone?.link}>
                                <div className="flex flex-row gap-2 items-center justify-start">
                                    <span className="font-Poppins_Regular font-semibold text-[#5C4774] text-base 2xl:text-lg hover:underline">{landingCardone?.subtitle}</span>
                                    <ArrowIcon />
                                </div>
                            </a>
                        </div>
            
                        <div className="flex flex-col gap-2 p-6 2xl:p-8 bg-white rounded-lg">
                            <div className="rounded-full aspect-square w-16 bg-[#F5F2F9] flex flex-col justify-center items-center">
                                
                                <img
                                    src={`/api/landing_home/media/${landingCardsecond?.image}`}
                                    className="object-cover w-8 h-8"
                                    onError={(e) =>(e.target.src = "/api/cover/thumbnail/null")}
                                />
                                
                            </div>
                            <h2 className="font-Poppins_SemiBold text-[#3E2F4D] text-lg 2xl:text-xl">
                                {landingCardsecond?.title} 
                            </h2>
                            <p className="font-Poppins_Regular text-[#5C4774] text-base 2xl:text-lg">{landingCardsecond?.description}</p>
                            <a href={landingCardsecond?.link}>
                                <div className="flex flex-row gap-2 items-center justify-start">
                                    <span className="font-Poppins_Regular font-semibold text-[#5C4774] text-base 2xl:text-lg hover:underline">{landingCardsecond?.subtitle}</span>
                                    <ArrowIcon />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full lg:w-1/2">
                    <img className="object-bottom object-contain w-full h-full max-w-xl mx-auto" src={`/api/landing_home/media/${landingFooter?.image}`} onError={handleImageError} />
                </div>
            </section>


            


            {/* <div className="min-h-screen">
                
                
                {landingHero && (
                    <motion.div
                        className="w-full mt-4 lg:mt-0 h-52 md:h-64 overflow-hidden rounded-b-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={`/api/landing_home/media/${landingHero?.image}`}
                            alt="Equipamiento médico de fisioterapia"
                            className="w-full h-52 md:h-64 object-cover object-left lg:object-center"
                        />
                    </motion.div>
                )}


                <div className="max-w-6xl mx-auto px-4 lg:px-3 py-8">
                    
                   
                    {landingHero && (
                        <motion.div
                            className="text-center mb-8 lg:mt-10"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <motion.h1
                                className="text-5xl leading-[42px] lg:text-6xl font-semibold mb-2 lg:max-w-2xl lg:mx-auto"
                                variants={itemVariants}
                            >
                                <TextWithHighlight text={landingHero?.title} />
                            </motion.h1>
                        </motion.div>
                    )}


                    {services && (
                        <div className="flex flex-col lg:flex-row lg:gap-12 lg:pt-2 justify-between">
                           
                            <motion.div
                                className="w-full lg:w-[30%] mt-10 relative"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="hidden lg:block text-xl lg:text-2xl font-semibold mb-4">
                                    Servicios
                                </h2>

                                <div className="lg:hidden mb-6">
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
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="hidden lg:relative lg:block lg:bg-transparent space-y-2"
                                >
                                    {services.map((service, index) => (
                                        <motion.div
                                            key={index}
                                            onClick={() =>
                                                setActiveIndex(index)
                                            }
                                            className={`flex items-center justify-between p-3 lg:py-3 lg:px-[5%] rounded-lg cursor-pointer ${
                                                index === activeIndex
                                                    ? "bg-gray-100"
                                                    : "hover:bg-gray-50"
                                            }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
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
                                        </motion.div>
                                    ))}
                                </motion.div>
                                <AnimatePresence>
                                    {showServicesMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className=" lg:hidden lg:bg-transparent space-y-2"
                                        >
                                            {services.map((service, index) => (
                                                <motion.div
                                                    key={index}
                                                    onClick={() =>
                                                        setActiveIndex(index)
                                                    }
                                                    className={`flex items-center justify-between p-3 lg:py-3 lg:px-[5%] rounded-lg cursor-pointer ${
                                                        index === activeIndex
                                                            ? "bg-gray-100"
                                                            : "hover:bg-gray-50"
                                                    }`}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <span
                                                        className={`lg:text-lg ${
                                                            index ===
                                                            activeIndex
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
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                           
                            <motion.div
                                className="lg:w-[62%]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                key={activeIndex}
                            >
                                <motion.h2
                                    className="text-5xl lg:mt-6 font-semibold mb-4 text-wrap"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <TextWithHighlight
                                        text={services[activeIndex].title}
                                        split={true}
                                    />
                                </motion.h2>

                                <motion.div
                                    className="mb-8 lg:mb-4 pt-4 lg:pt-2 text-lg"
                                    initial="hidden"
                                    animate="visible"
                                    variants={containerVariants}
                                >
                                    {renderDescription(
                                        services[activeIndex].description
                                    )}
                                </motion.div>

                               
                                <motion.div
                                    className="space-y-3 mb-8 text-lg"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {services[activeIndex].characteristics.map(
                                        (characteristic, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex gap-3 items-center"
                                                variants={itemVariants}
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
                                            </motion.div>
                                        )
                                    )}
                                </motion.div>

                               
                                <motion.div
                                    className="w-full px-[5%] lg:px-0 flex items-center justify-center lg:justify-start mt-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <motion.button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-[#EFF0F1] text-[#242424] py-1 pl-1 pr-3 gap-2 mt-2 rounded-full flex items-center"
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

                                
                                <DynamicGalleryServiceService
                                    service={services[activeIndex]}
                                />
                            </motion.div>
                        </div>
                    )}
                </div>
            </div> */}

            {/* <ModalAppointment
                linkWhatsApp={linkWhatsApp}
                randomImage={randomImage}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            /> */}

            <Footer />
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <DetailPurchaseOption {...properties} />
            </Base>
        </CarritoProvider>
    );
});

