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

const Home = ({
    slider,
    items,
    supplies,
    testimonies,
    popups,
    top_sale,
    showSlogan = true,

    we_lovers,
    products_featured,
    new_product,
    posts,
}) => {
    const tipoSlider = "vua";
    console.log(products_featured);

    const benefits = [
        {
            number: "300",
            message: "Reservas diarias",
            symbol: "+",
            image: "/assets/img/home/calendar.png",
        },
        {
            number: "1M",
            message: "Pacientes satisfechos",
            symbol: "+",
            image: "/assets/img/home/patient.png",
        },
        {
            number: "4k",
            message: "Consultas atendidas",
            symbol: "+",
            image: "/assets/img/home/yoga-mat.png",
        },
    ];
    return (
        <div>
            <Header showSlogan={showSlogan}></Header>
            <div className="relative ">
                <img
                    src="/assets/img/home/image1.png"
                    className="lg:hidden w-full h-auto mt-4
                "
                />
                <img
                    src="/assets/img/home/bg-des.png"
                    className="hidden lg:block w-full h-auto mt-0
                "
                />
                <div className="lg:absolute lg:top-1/2  lg:-translate-y-1/2 lg:left-20 lg:max-w-md">
                    <h2 className="w-full px-[5%] text-[32px] mt-8 lg:mt-0 text-center lg:px-0 lg:text-start leading-[34px] lg:text-7xl lg:leading-[102%]">
                        Recupera tu{" "}
                        <strong className="text-[#224483]">movilidad</strong>,
                        <br /> vive sin dolor
                    </h2>
                    <p className="hidden lg:flex mt-8">
                        NOPAIN – Fisioterapia y Rehabilitación ofrece
                        información detallada sobre sus servicios, equipo
                        profesional y datos de contacto. A continuación, se
                        presenta un resumen de los contenidos disponibles
                    </p>
                    <div className="w-full px-[5%] lg:px-0 flex items-center justify-center lg:justify-start mt-4">
                        <button className="bg-[#EFF0F1] text-[#242424] py-1 pl-1 pr-3  gap-2 rounded-full flex items-center">
                            <img
                                src="/assets/img/home/calendar-home.png"
                                className="w-12 h-auto  bg-[#224483] rounded-full p-2"
                            />
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
                        {benefits.map((benefit, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex gap-4 w-full my-6 lg:my-7 ">
                                    <div className="bg-white rounded-xl h-[60px] w-[60px] lg:h-[80px] lg:w-[80px]  flex items-center justify-center">
                                        <img
                                            src={benefit.image}
                                            className="h-[32.2px] w-[32.2px] lg:h-[40.2px] lg:w-[40.2px] "
                                        />
                                    </div>
                                    <div className="text-[#242424]">
                                        <h1 className="text-4xl lg:text-5xl font-medium leading-[102%]">
                                            {benefit.number}{" "}
                                            <span className="text-[#224483]">
                                                {benefit.symbol}
                                            </span>
                                        </h1>
                                        <h2 className="font-normal">
                                            {benefit.message}
                                        </h2>
                                    </div>
                                    <span className="hidden lg:block lg:absolute -right-20 top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-1 bg-[#242424] rounded-full"></span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="px-[5%] lg:max-w-[82rem] lg:mx-auto mt-10 lg:mt-14 lg:flex lg:justify-between lg:items-center">
                <h2 className="text-[32px] font-medium leading-[102%] max-w-[16rem] lg:text-6xl lg:max-w-[44rem] lg:tracking-wide ">
                    Descubre los{" "}
                    <span className="text-[#224483]">beneficios</span> de{" "}
                    <br className="lg:hidden" /> una vida sin dolor
                </h2>
                <button className=" mt-5 bg-[#EFF0F1] text-[#242424] py-1 pl-1 pr-3  gap-2 rounded-full flex items-center lg:h-14">
                    <img
                        src="/assets/img/home/treatment.png"
                        className="w-12 h-auto  bg-[#224483] rounded-full p-2"
                    />
                    Ver todos los servicios
                </button>
            </div>
            <HealthSection />

            <div className="px-[5%] lg:max-w-[82rem] lg:mx-auto mt-10 lg:mt-10 lg:flex lg:justify-between lg:items-center">
                <h2 className="text-[32px] font-medium leading-[102%] max-w-[16rem] lg:text-6xl lg:max-w-[44rem] lg:tracking-wide ">
                    Tratamientos diseñados para tu
                    <span className="text-[#224483]">bienestar</span>
                </h2>
                <button className=" mt-5 bg-[#EFF0F1] text-[#242424] py-1 pl-1 pr-3  gap-2 rounded-full flex items-center lg:h-14">
                    <img
                        src="/assets/img/home/treatment.png"
                        className="w-12 h-auto  bg-[#224483] rounded-full p-2"
                    />
                    Ver todos los servicios
                </button>
            </div>

            <TratamientoSection />
            <div className="px-[5%]  py-4 lg:hidden ">
                <div className="bg-[#F8F8F8] rounded-3xl p-4">
                    <h2 className="text-[32px] font-medium leading-[102%] max-w-[16rem]">
                        Agenda tu cita y empieza tu recuperación.
                    </h2>
                    <div className="w-full flex items-center justify-end">
                        <button className=" mt-5 bg-white text-[#242424] py-1 pl-1 pr-3  gap-2 rounded-full flex items-center">
                            <img
                                src="/assets/img/home/calendar-home.png"
                                className="w-12 h-auto  bg-[#224483] rounded-full p-2"
                            />
                            Reservar una cita
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-[5%] flex items-center justify-center mt-9  lg:mt-32">
                <h2 className="text-[32px] font-medium leading-[102%] w-full text-center lg:text-6xl lg:max-w-3xl lg:tracking-wide  ">
                    Lo que
                    <span className="text-[#224483]">
                        {" "}
                        nuestros clientes
                    </span>{" "}
                    dicen sobre nosotros
                </h2>
            </div>
            <TestimonioSection />
            <AcercaDe />
            <Footer />

            {/*
            <div className="relative z-10">
                <FeaturesSection />
                <BenefitsSection />
                <div className="h-[40px] lg:h-0"></div>
                <ProductCarousel products={products_featured}>
                    <h2 className="font-poppins text-lg md:text-3xl 2xl:text-4xl font-bold flex gap-2 md:gap-4 items-center justify-center">
                        <img
                            src="/assets/img/emojis/growing-heart.png"
                            className="h-4 md:h-8 lg:h-9"
                        />{" "}
                        Preferidos por nosotrxs{" "}
                        <img
                            src="/assets/img/emojis/growing-heart.png"
                            className="h-4 md:h-8 lg:h-9"
                        />
                    </h2>
                    <p className="font-poppins text-[13.3px] md:text-[19.3px] leading-[19.77px] lg:mt-4">
                        ¿Estás listx para el cambio?
                    </p>
                </ProductCarousel>
                <QuizSection />
                <TopSaleSection producto={top_sale} />
                <GuaranteeSection />
                <WeLoversSection we_lovers={we_lovers} />
                <NotSureSection producto={new_product} />
                <InstagramSection posts={posts} />
                <Footer />
                {/*
               
                <Banner sliders={sliders} />
                <hr className="h-4 bg-transparent border-none" />
                <Highlights />
                <HowItWorks />
                <Routine items={items} />
                <Highlights2 />
                <Supplies supplies={supplies} />
                <Testimonies testimonies={testimonies} />
                <CallToAction />
                <Popups popups={popups} />
               
        </div >*/}
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
