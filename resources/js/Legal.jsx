import React, { useEffect, useRef, useState } from "react";
import { createRoot } from 'react-dom/client';
import Base from "./components/Tailwind/Base";
import CreateReactScript from './Utils/CreateReactScript';
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import TextWithHighlight from "./Utils/TextWithHighlight";
import { useTranslation } from "./hooks/useTranslation";

const Legal = ({ landing, indicators }) => {
  const [opened, setOpened] = useState(indicators[0].id)
  const landingHero = landing?.find(
      (item) => item.correlative === "page_legal_hero"
  );

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

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/api/cover/thumbnail/null";
  };  

  return (
    <div>
      <Header />

          <section className="flex flex-col md:justify-center items-center gap-5 2xl:gap-8 px-[5%] pt-10 lg:pt-16">
                <div className="flex flex-row items-start justify-start md:justify-center w-full max-w-2xl 2xl:max-w-3xl md:text-center">
                    <h2 className="font-Poppins_Medium text-[#3E2F4D] text-3xl sm:text-4xl lg:text-[44px] !leading-tight"><TextWithHighlight text={landingHero?.title} ></TextWithHighlight></h2>
                </div>
        
                <div className="flex flex-col items-center justify-start w-full max-w-2xl 2xl:max-w-3xl gap-5 md:text-center">
                    <p className="font-Poppins_Regular text-base 2xl:text-lg text-[#5C4774]">
                        {landingHero?.description}
                    </p>
                </div>
          </section>

          <section className="flex flex-col md:justify-center items-center px-[5%] py-10 lg:py-16">
            <div className="flex flex-col w-full max-w-3xl gap-5">
            {
                indicators.map((faq, index) => {
                    return <div key={index} className='bg-white rounded-xl text-[#3E2F4D] shadow-md'>
                        <h1 className='flex justify-between font-Poppins_Regular font-semibold px-6 py-4 bg-[#F5F2F9] rounded-xl cursor-pointer text-lg 2xl:text-xl' onClick={() => setOpened(opened == faq.id ? null : faq.id)}>
                        <span>{index + 1}. {faq.name}</span>
                        {
                            opened == faq.id
                            ? <i className='mdi mdi-arrow-up'></i>
                            : <i className='mdi mdi-arrow-down'></i>
                        }
                        </h1>
                        <p className={`px-6 py-3 transition-all font-Poppins_Regular text-base 2xl:text-lg text-[#4B246D] ${opened == faq.id ? 'show opacity-1' : 'hidden opacity-0'}`}>{faq.description}</p>
                    </div>
                })
            }
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
          <Legal {...properties} />
        </Base>
      </CarritoProvider>
    );
})
