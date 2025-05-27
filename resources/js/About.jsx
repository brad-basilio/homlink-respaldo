import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import { useTranslation } from "./hooks/useTranslation";
import { AnimatePresence, motion } from "framer-motion";
import TextWithHighlight from "./Utils/TextWithHighlight";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const AboutUs = ({ about, landing, issues, valores, paises, sectores  }) => {
  
    const landingHero = landing?.find(
        (item) => item.correlative === "page_aboutus_hero"
    );

    const landingHistory = landing?.find(
        (item) => item.correlative === "page_aboutus_history"
    );

    const landingIssues = landing?.find(
        (item) => item.correlative === "page_aboutus_issues"
    );

    const landingComment = landing?.find(
      (item) => item.correlative === "page_aboutus_comment"
    );

    const landingValues = landing?.find(
      (item) => item.correlative === "page_aboutus_values"
    );

    const landingSrategy = landing?.find(
      (item) => item.correlative === "page_aboutus_strategy"
    );

    const landingStatics  = landing?.find(
      (item) => item.correlative === "page_aboutus_stadistic"
    );

    const landingCarrusel = landing?.find(
      (item) => item.correlative === "page_aboutus_carrusel"
    );

    const landingRuta = landing?.find(
      (item) => item.correlative === "page_aboutus_ruta"
    );

    const landingBanner = landing?.find(
      (item) => item.correlative === "page_aboutus_banner"
    );

    const landingFooter = landing?.find(
      (item) => item.correlative === "page_aboutus_footer"
    );

    const landingFooterOne = landing?.find(
      (item) => item.correlative === "page_aboutus_footer_cardone"
    );

    const landingFooterTwo = landing?.find(
      (item) => item.correlative === "page_aboutus_footer_cardtwo"
    );

    const [opened, setOpened] = useState(valores.length > 0 ? valores[0].id : null);

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
        <>
            <Header />

            <section className="bg-center h-[87vh] lg:h-[75vh] bg-cover bg-no-repeat flex flex-col justify-center relative"  style={{ backgroundImage: `url('/api/landing_home/media/${landingHero?.image}')`}}>
                <div className="flex flex-col lg:flex-row h-full justify-center items-start lg:items-center relative">
                    <div className="absolute w-[20%] h-40 top-0 left-0 bg-gradient-to-r from-[rgba(31,24,39,0.4)] via-[rgba(31,24,39,0.4)] to-[rgba(123,94,154,0.4)] mix-blend-hard-light blur-[200px]"></div>
                    <div className="pl-[5%] pr-[5%] lg:w-2/3 w-full min-h-[300px] h-full flex flex-col justify-center lg:text-center gap-4 py-8">
                        <h2 className="font-Poppins_SemiBold leading-none text-white text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                          {landingHero.title}
                        </h2>

                        <p className="font-Poppins_Regular leading-normal text-lg 2xl:text-xl text-white">
                            {landingHero.description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1  lg:grid-cols-3 gap-10 px-[5%] xl:px-[8%] pt-10 lg:pt-16">
                    <div className="flex flex-col gap-3 items-center justify-start">
                        <img className="object-cover w-full h-full rounded-lg overflow-hidden max-w-xs mx-auto" src={`/api/landing_home/media/${landingHistory.image}`} onError={(e) =>(e.target.src = "/api/cover/thumbnail/null")} />
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-3 items-left justify-center">
                        <h2 className="font-Poppins_Medium text-[#3E2F4D] text-3xl sm:text-4xl lg:text-[44px] !leading-tight !tracking-tight">
                            {landingHistory.title}
                        </h2>
                        <p className="font-Poppins_Regular text-base 2xl:text-lg text-[#4B246D]">
                             {landingHistory.description}
                        </p>
                    </div>
            </section>


            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-[5%] xl:px-[8%] pt-10 lg:pt-16">
                   
                    <div className="flex flex-col gap-3 items-left justify-center">
                        <h2 className="font-Poppins_Regular font-semibold text-[#3E2F4D] text-3xl sm:text-4xl lg:text-[44px] !leading-tight !tracking-tight">
                            {landingIssues.title}
                        </h2>
                        
                        <div className="flex flex-col w-full max-w-3xl gap-5">
                            {
                              issues.map((issue, index) => {
                                const isOpen = opened === issue.id;
                                return (
                                  <div key={index} className='bg-white rounded-xl text-[#3E2F4D] shadow-md'>
                                    <h1
                                      className='flex justify-between font-Poppins_Regular font-semibold px-6 py-4 bg-[#F5F2F9] rounded-xl cursor-pointer text-base 2xl:text-xl'
                                      onClick={() => setOpened(isOpen ? null : issue.id)}
                                    >
                                      <span>{index + 1}. {issue.name}</span>
                                      <i className={`mdi ${isOpen ? 'mdi-arrow-up' : 'mdi-arrow-down'}`}></i>
                                    </h1>
                                    <div
                                      className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                                        isOpen ? 'max-h-[500px] opacity-100 py-3' : 'max-h-0 opacity-0 py-0'
                                      }`}
                                    >
                                      <p className='font-Poppins_Regular text-base 2xl:text-lg text-[#4B246D]'>
                                        {issue.description}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 items-center justify-start">
                        <div className="flex flex-col">
                          <img className="object-cover w-full h-full rounded-lg overflow-hidden max-w-md mx-auto" src={`/api/landing_home/media/${landingIssues.image}`} onError={(e) =>(e.target.src = "/api/cover/thumbnail/null")} />
                        </div>
                    </div>

            </section>
            
            
            <section className="px-[5%] xl:px-[8%] pt-10 lg:pt-16">
                  <div className="bg-[#F5F2F9] grid grid-cols-1 lg:grid-cols-2 gap-5 px-10 py-16 rounded-xl overflow-hidden">
                    <div className="flex flex-col gap-3 items-center justify-start">
                        <div className="flex flex-col">
                          <img className="object-cover w-full h-full rounded-lg overflow-hidden max-w-md mx-auto" src={`/api/landing_home/media/${landingComment.image}`} onError={(e) =>(e.target.src = "/api/cover/thumbnail/null")} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 items-left justify-center">
                        <svg className="max-w-[60px]" xmlns="http://www.w3.org/2000/svg" width="93" height="61" viewBox="0 0 93 61" fill="none">
                          <path d="M31.5945 60.6411H0L26.7534 0H47.137L31.5945 60.6411ZM77.4575 60.6411H45.863L72.6164 0H93L77.4575 60.6411Z" fill="#9763C4"/>
                        </svg>
                        <h2 className="font-Poppins_Regular font-semibold text-[#3E2F4D] text-xl sm:text-2xl !tracking-tight">
                            {landingComment.description}
                        </h2>
                        <h3 className="font-Poppins_Regular text-[#3E2F4D] text-lg 2xl:text-xl !tracking-tight">{landingComment.title}</h3>
                        <span className="font-Poppins_Regular text-[#3E2F4D] text-sm 2xl:text-base !tracking-tight text-opacity-60 -mt-4">{landingComment.subtitle}</span>
                    </div>
                  </div>
            </section>


            <section className="flex flex-col md:justify-center items-center gap-5 2xl:gap-8 px-[5%] pt-10 lg:pt-16">
                <div className="flex flex-row items-start justify-start md:justify-center w-full max-w-3xl 2xl:max-w-4xl md:text-center">
                    <h2 className="font-Poppins_Medium text-[#3E2F4D] text-3xl sm:text-4xl lg:text-[44px] !leading-tight">{landingValues.title}</h2>
                </div>
        
                <div className="flex flex-col items-center justify-start w-full max-w-3xl 2xl:max-w-4xl gap-5 md:text-center">
                    <p className="font-Poppins_Regular text-base 2xl:text-lg text-[#5C4774]">
                        {landingValues?.description}
                    </p>
                </div>
            </section>

            {valores.length > 0 && (
              <>
                {valores.length > 1 && (
                  <section className="w-full px-[5%] pt-10 lg:pt-16">
                    <div className="flex flex-wrap items-center justify-center gap-5 2xl:gap-8 max-w-4xl mx-auto text-[#3E2F4D] font-Poppins_Regular text-base 2xl:text-lg">
                      {valores.map((valor) => {
                        const isActive = valor.id === opened;
                        return (
                          <button
                            key={valor.id}
                            onClick={() => setOpened(valor.id)}
                            className={`pb-[1px] border-b-2 hover:border-[#72578d] transition-all duration-200 ${
                              isActive ? "font-bold border-[#72578d]" : "border-transparent"
                            } hover:font-bold`}
                          >
                            {valor.name}
                          </button>
                        );
                      })}
                    </div>
                  </section>
                )}

                <section className="px-[5%] xl:px-[8%] pt-10 lg:pt-16">
                  <AnimatePresence mode="wait">
                    {valores
                      .filter((valor) => valor.id === opened)
                      .map((valor) => (
                        <motion.div
                          key={valor.id}
                          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="flex flex-col gap-3 items-left justify-center">
                            <h2 className="font-Poppins_Regular font-semibold text-[#3E2F4D] text-3xl sm:text-4xl lg:text-[44px] !leading-tight !tracking-tight">
                              {valor.name}
                            </h2>
                            <div className="flex flex-col w-full font-Poppins_Regular text-base 2xl:text-lg text-[#5C4774]">
                              {valor.description}
                            </div>
                          </div>

                          <div className="flex flex-col gap-3 items-center justify-start">
                            <div className="flex flex-col">
                              <img
                                className="object-cover w-full h-full rounded-lg overflow-hidden max-w-md mx-auto"
                                src={`/api/core_value/media/${valor.image}`}
                                onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </section>
                </>
            )}

            <section className="px-[5%] pt-10 lg:pt-16">
                <div className="bg-[#F5F2F9] py-10 lg:py-16 px-5 md:px-10 rounded-xl overflow-hidden flex flex-col lg:flex-row items-center gap-12">
                    
                    <div className="w-full lg:w-2/5">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-Poppins_SemiBold text-[#3E2F4D] text-3xl sm:text-4xl md:text-3xl lg:text-[44px] !leading-tight ">
                                    <TextWithHighlight text={landingSrategy?.title} ></TextWithHighlight>
                            </h2>
                            <p className="font-Poppins_Regular text-[#5C4774] text-base 2xl:text-lg">
                                   {landingSrategy?.description}
                            </p>
                        </div>
                    </div>  
                    
                    <div className="w-full lg:w-3/5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="flex flex-col gap-4 p-4 2xl:p-6 bg-white rounded-lg group hover:bg-[#7B5E9A] transition-colors duration-300">
                              <div className="flex flex-col gap-1 items-start">
                                <h3 className="font-Poppins_SemiBold text-[#3E2F4D] text-6xl 2xl:text-7xl group-hover:text-white">
                                  {landingStatics?.title}
                                </h3>
                                <h2 className="font-Poppins_Regular text-[#5C4774] text-base 2xl:text-lg group-hover:text-white">
                                  {landingStatics?.subtitle}
                                </h2>
                              </div>
                          </div>

                          <div className="flex flex-col gap-4 p-4 2xl:p-6 bg-white rounded-lg group hover:bg-[#7B5E9A] transition-colors duration-300">
                              <div className="flex flex-col gap-1 items-start">
                                <h3 className="font-Poppins_SemiBold text-[#3E2F4D] text-6xl 2xl:text-7xl group-hover:text-white">
                                      {landingCarrusel?.title}
                                </h3>
                                <h2 className="font-Poppins_Regular text-[#5C4774] text-base 2xl:text-lg group-hover:text-white">
                                        {landingCarrusel?.subtitle}
                                </h2>
                              </div>
                          </div>

                          <div className="flex flex-col justify-center gap-4 p-4 2xl:p-6 bg-white rounded-lg group hover:bg-[#7B5E9A] transition-colors duration-300">
                              <div className="flex flex-col items-start gap-3">
                                <div className="w-full">
                                  <Swiper
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    loop={true}
                                    autoplay={{ delay: 2500 }}
                                    breakpoints={{
                                      0: { slidesPerView: 3 },
                                      1600: { slidesPerView: 4 },
                                    }}
                                  >
                                    {paises.map((pais, index) => (
                                      <SwiperSlide key={index}>
                                        <div className="p-2 bg-[#F5F2F9] rounded-md">
                                          <img
                                            src={`/api/strength/media/${pais.image}`}
                                            onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                                            className="h-10 object-cover mx-auto rounded shadow-md"
                                          />
                                        </div>
                                      </SwiperSlide>
                                    ))}
                                  </Swiper>
                                </div>
                                <h2 className="font-Poppins_Regular text-[#5C4774] text-base 2xl:text-lg group-hover:text-white">
                                     {landingRuta.title}
                                </h2>
                              </div>
                          </div>

                          <div className="flex flex-col gap-4 p-4 2xl:p-6 bg-white rounded-lg group hover:bg-[#7B5E9A] transition-colors duration-300">
                              <div className="flex flex-col items-start gap-3">
                                
                                <div className="w-full">
                                    <Swiper
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        loop={true}
                                        autoplay={{ delay: 2500 }}
                                        breakpoints={{
                                          0: { slidesPerView: 3 },
                                          1600: { slidesPerView: 4 },
                                        }}
                                      >
                                        {sectores.map((sector, index) => (
                                          <SwiperSlide key={index}>
                                            <div className="p-2 bg-[#F5F2F9] rounded-md">
                                              <img
                                                src={`/api/testimony/media/${sector.image}`}
                                                onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                                                className="h-10 object-cover mx-auto rounded shadow-md"
                                              />
                                            </div>
                                          </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                
                                <h2 className="font-Poppins_Regular text-[#5C4774] text-base 2xl:text-lg group-hover:text-white">
                                {landingRuta.title}
                                </h2>
                              </div>
                          </div>

                        </div>
                    </div>

                </div>
            </section>


            <section className="px-[5%] xl:px-[8%] pt-10 lg:pt-16">                         
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                  <div className="flex flex-col gap-3 items-center justify-start">
                    <div className="flex flex-col">
                      <img
                        className="object-cover w-full h-full rounded-lg overflow-hidden max-w-md mx-auto"
                        src={`/api/landing_home/media/${landingBanner.image}`}
                        onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 items-left justify-center">
                    <h2 className="font-Poppins_Regular font-semibold text-[#3E2F4D] text-3xl sm:text-4xl lg:text-[44px] !leading-tight !tracking-tight">
                      {landingBanner.title}
                    </h2>
                    <div className="flex flex-col w-full font-Poppins_Regular text-base 2xl:text-lg text-[#5C4774]">
                      {landingBanner.description}
                    </div>
                  </div>

                </div>
            </section>


            <section className="flex flex-col lg:flex-row gap-6 px-[5%]  mt-10 lg:mt-16 bg-cover bg-bottom" style={{ backgroundImage: `url(/api/landing_home/media/${landingFooter?.image})` }}>
                <div className="flex flex-col w-full  gap-5 py-10 lg:py-16">
                    <div className="flex flex-col max-w-xl mx-auto text-center">
                        <h2 className="font-Poppins_SemiBold text-[#3E2F4D] text-3xl sm:text-4xl md:text-3xl lg:text-[44px] !leading-tight">
                            {landingFooter?.title}
                        </h2>
                    </div>
                    <div className="flex flex-col max-w-3xl mx-auto text-center">
                        <p className="font-Poppins_Regular text-[#3E2F4D] text-lg 2xl:text-xl !leading-snug">
                            {landingFooter?.description}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl 2xl:max-w-3xl mx-auto gap-5 mt-3">
                        <div className="flex flex-col gap-2 p-6 2xl:p-8 bg-white rounded-lg">
                            <div className="rounded-full aspect-square w-16 bg-[#F5F2F9] flex flex-col justify-center items-center">
                                <img
                                    src={`/api/landing_home/media/${landingFooterOne?.image}`}
                                    className="object-cover w-8 h-8"
                                    onError={(e) =>(e.target.src = "/api/cover/thumbnail/null")}
                                />
                            </div>
                            <h2 className="font-Poppins_SemiBold text-[#3E2F4D] text-lg 2xl:text-xl">
                                {landingFooterOne?.title}
                            </h2>
                            
                            <p className="font-Poppins_Regular text-[#5C4774] text-base 2xl:text-lg">{landingFooterOne?.description}</p>
                            <a href={landingFooterOne?.link}>
                                <div className="flex flex-row gap-2 items-center justify-start">
                                    <span className="font-Poppins_Regular font-semibold text-[#5C4774] text-base 2xl:text-lg hover:underline">{landingFooterOne?.subtitle}</span>
                                    <ArrowIcon />
                                </div>
                            </a>
                        </div>
            
                        <div className="flex flex-col gap-2 p-6 2xl:p-8 bg-white rounded-lg">
                            <div className="rounded-full aspect-square w-16 bg-[#F5F2F9] flex flex-col justify-center items-center">
                                
                                <img
                                    src={`/api/landing_home/media/${landingFooterTwo?.image}`}
                                    className="object-cover w-8 h-8"
                                    onError={(e) =>(e.target.src = "/api/cover/thumbnail/null")}
                                />
                                
                            </div>
                            <h2 className="font-Poppins_SemiBold text-[#3E2F4D] text-lg 2xl:text-xl">
                                {landingFooterTwo?.title} 
                            </h2>
                            <p className="font-Poppins_Regular text-[#5C4774] text-base 2xl:text-lg">{landingFooterTwo?.description}</p>
                            <a href={landingFooterTwo?.link}>
                                <div className="flex flex-row gap-2 items-center justify-start">
                                    <span className="font-Poppins_Regular font-semibold text-[#5C4774] text-base 2xl:text-lg hover:underline">{landingFooterTwo?.subtitle}</span>
                                    <ArrowIcon />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>   
            {/* <img
                src={`/api/service/media/${benefit.image}`}
                alt={benefit.title}
                className="object-cover w-8 h-8"
                onError={(e) =>(e.target.src = "/api/cover/thumbnail/null")}
            /> */}

            <Footer />
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <AboutUs {...properties} />
            </Base>
        </CarritoProvider>
    );
});
