import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';
import Aos from 'aos';
import HtmlContent from "./Utils/HtmlContent";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import { useTranslation } from "./hooks/useTranslation";

const ArrowLeftIcon = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none"
    >
      <mask 
        id="mask0_206_2341" 
        style={{ maskType: 'alpha' }} 
        maskUnits="userSpaceOnUse" 
        x="0" 
        y="0" 
        width="24" 
        height="24"
      >
        <rect x="24" width="24" height="24" transform="rotate(90 24 0)" fill="#D9D9D9"/>
      </mask>
      <g mask="url(#mask0_206_2341)">
        <path 
          d="M8.62539 12L14.6254 6L16.0254 7.4L11.4504 12L16.0254 16.6L14.6254 18L8.62539 12Z" 
          fill="#3E2F4D"
        />
      </g>
    </svg>
  );
};

const DetailFaq = ({ detalleFaq, landing }) => {
  const { t, loading, error } = useTranslation();

  const landingFooter = landing?.find(
    (item) => item.correlative === "page_faqs_footer"
  );
  return (
    <div>
      <Header />
      <a href={`/faqs`}>
        <section className='flex flex-row gap-1 px-[5%] xl:px-[8%] pt-10 lg:pt-16 max-w-5xl mx-auto font-Poppins_Regular font-semibold text-[#3E2F4D]'>
            <ArrowLeftIcon />
            {t(
                  "public.btn.backfaq",
                  "Volver a Preguntas Frecuentes"
            )}
        </section>
      </a>  
      <section className="flex flex-col md:justify-center items-center gap-5 2xl:gap-8 px-[5%] xl:px-[8%] pt-10 lg:pt-16 max-w-5xl mx-auto">
          <div className="flex flex-row items-start justify-start w-full ">
              <p className="font-Poppins_Medium text-[#3E2F4D] text-3xl 2xl:text-4xl !leading-tight">{detalleFaq?.name}</p>
          </div>
      </section>


      <section className='px-[5%] xl:px-[8%] py-10 lg:py-16 max-w-5xl mx-auto'>
        <div className='grid grid-cols-1'>
            <HtmlContent className="prose text-[#5C4774] text-base xl:text-lg" html={detalleFaq?.description} />
        </div>
      </section>

      <section className="flex flex-col gap-6 px-[5%] xl:px-[8%] py-10 lg:py-40 bg-cover bg-center" style={{ backgroundImage: `url('/api/landing_home/media/${landingFooter?.image}')` }}>
            <div className="flex flex-col gap-4 max-w-xl mx-auto text-center">
                <p className='font-Poppins_Regular font-semibold text-[#5C4774]'>{landingFooter?.subtitle}</p>
                <h2 className="font-Poppins_Regular font-semibold text-[#1F1827] text-3xl 2xl:text-4xl !leading-tight">
                    {landingFooter?.title}
                </h2>
                
                <a href="#" className='max-w-[220px] mx-auto'>
                    <div className="bg-[#7B5E9A] px-4 py-3 rounded-md">
                        <p className="leading-none text-white text-base 2xl:text-lg font-Poppins_Regular">
                            {t(
                                "public.btn.chat",
                                "Ir a Whatsapp"
                            )}
                        </p>
                    </div>
                </a>
            </div>
      </section>

      <Footer />
    </div>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <CarritoProvider>
      <Base {...properties} showSlogan={false}>
        <DetailFaq {...properties} />
      </Base>
    </CarritoProvider>
  );
})