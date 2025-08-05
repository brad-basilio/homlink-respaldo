import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';
import Aos from 'aos';
import HtmlContent from "./Utils/HtmlContent";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import { useTranslation } from "./hooks/useTranslation";

const FAQs = ({ faqs,landing }) => {
  const { t, loading, error } = useTranslation();
  const landingHero = landing?.find(
    (item) => item.correlative === "page_faqs_hero"
  );
  const landingFooter = landing?.find(
    (item) => item.correlative === "page_faqs_footer"
  );
  
  return (
    <div>
      <Header />

      <section className="flex flex-col md:justify-center items-center gap-5 2xl:gap-8 px-[5%] pt-10 lg:pt-16">
                <div className="flex flex-row items-start justify-start md:justify-center w-full max-w-2xl 2xl:max-w-3xl md:text-center">
                    <p className="font-Poppins_Medium text-[#3E2F4D] text-xl 2xl:text-2xl !leading-tight">{landingHero?.subtitle}</p>
                </div>

                <div className="flex flex-row items-start justify-start md:justify-center w-full max-w-3xl 2xl:max-w-4xl md:text-center">
                    <h2 className="font-Poppins_Medium text-[#3E2F4D] text-3xl sm:text-4xl lg:text-[44px] !leading-tight">{landingHero?.title}</h2>
                </div>
        
                <div className="flex flex-col items-center justify-start w-full max-w-2xl 2xl:max-w-3xl gap-5 md:text-center">
                    <p className="font-Poppins_Regular text-base 2xl:text-lg text-[#5C4774]">
                        {landingHero?.description}
                    </p>
                </div>
      </section>

      <section className='px-[5%] py-10 lg:py-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-8'>
          {
            faqs.map((faq, index) => {
              return <a href={`/faqs/${faq.slug}`} ><div key={index} className='flex flex-col gap-3 rounded-xl text-[#3E2F4D] px-3 py-2'>
                <p className='text-xs font-Poppins_Regular'>{t("public.subtitle.adv","Anuncio")} | {new Date(faq.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <h1 className='flex font-Poppins_Regular font-semibold  cursor-pointer'>
                  <span className='line-clamp-4'>{faq.name}</span>
                </h1>
              </div></a>
            })
          }
        </div>
      </section>

      <section className="flex flex-col gap-6 px-[5%] py-10 lg:py-40 bg-cover bg-center" style={{ backgroundImage: `url('/api/landing_home/media/${landingFooter?.image}')` }}>
            <div className="flex flex-col gap-4 xl:gap-6 max-w-xl mx-auto text-center">
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
        <FAQs {...properties} />
      </Base>
    </CarritoProvider>
  );
})
