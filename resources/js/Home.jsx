import React from "react";
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

const Home = ({
    sliders,
    items,
    supplies,
    testimonies,
    popups,
    showSlogan = true,
}) => {
    const tipoSlider = "vua";

    const products = [
        {
            id: 1,
            name: "weTotal",
            description: "Disco + Esterilizador",
            price: 255,
            discount: 179.9,
            final_price: 179.9,
            image: "https://i.ibb.co/fV6JQ7Bf/e668d950658ae3c60479b23cdc546252.png",
        },
        {
            id: 2,
            name: "wePack",
            description: "Disco + Esterilizador",
            price: 230,
            discount: 149.9,
            final_price: 149.9,
            image: "https://i.ibb.co/zyjGBDv/dd77e7ec81f52f1e46c68e0cb7e3db80.png",
        },
        {
            id: 3,
            name: "weDisk",
            description: "Disco menstrual",
            price: 180,
            discount: 159.9,
            final_price: 159.9,
            image: "https://i.ibb.co/yFYSFPtJ/35b45868b7de6ab7b4b48f5bf5e380cd.png",
        },
        {
            id: 4,
            name: "weDisk",
            description: "Disco menstrual",
            price: 180,
            discount: 159.9,
            final_price: 159.9,
            image: "https://i.ibb.co/yFYSFPtJ/35b45868b7de6ab7b4b48f5bf5e380cd.png",
        },
    ];

    return (
        <>
            <Header
                showSlogan={showSlogan}
                backgroundType="video"
                backgroundSrc="/assets/img/backgrounds/home.mp4"
                backgroundHeight="h-[85vh] 2xl:h-[90vh]"
            >
                <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div className="text-white p-6">
                        <h1 className="text-[30.66px] leading-[100%] tracking-[1%] md:text-[58.54px] xl:text-[68.54px]  2xl:text-[78.54px] md:leading-[60.81px] xl:leading-[75.81px] 2xl:leading-[90.81px] font-bold max-w-4xl ">
                            ¡Tener sexo con
                            <br /> tu disco es posible!
                        </h1>
                        <p className="text-[15.13px] mt-4 md:mt-0 leading-[100%]  md:text-[20.61px] 2xl:text-[24.61px] md:leading-[36.92px]  my-2 tracking-[1%]">
                            Copas y Discos menstruales weFem
                        </p>
                        <button className="mt-4 w-[200.19px] h-[45.67px] md:w-[258.19px] md:h-[55.67px] xl:w-[300px]  2xl:w-[371px] xl:h-[70px] 2xl:h-[80px] bg-[#DDEC4C] md:text-[17.15px] xl:text-[20.64px] 2xl:text-[24.64px] hover:brightness-90 transition duration-300  font-semibold  rounded-[13.91px] text-[#5F48B7] tracking-[1%]">
                            ¡Realiza el cambio!
                        </button>
                    </div>
                </div>
            </Header>
            <div className="relative z-10">
                <FeaturesSection />
                <BenefitsSection />
                <div className="h-[40px] lg:h-0"></div>
                <ProductCarousel products={products}>
                    <h2 className="text-xl md:text-3xl 2xl:text-4xl font-bold flex gap-2 md:gap-4 items-start justify-center">
                        <img
                            src="/assets/img/emojis/growing-heart.png"
                            className="h-6 md:h-8 lg:h-9"
                        />{" "}
                        Preferidos por nosotrxs{" "}
                        <img
                            src="/assets/img/emojis/growing-heart.png"
                            className="h-6 md:h-8 lg:h-9"
                        />
                    </h2>
                    <p className="text-[16.3px] md:text-[19.3px] leading-[19.77px] mt-4">
                        ¿Estás listx para el cambio?
                    </p>
                </ProductCarousel>
                <QuizSection />
                <TopSaleSection />
                <GuaranteeSection />
                <WeLoversSection />
                <NotSureSection />
                <InstagramSection />
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
               */}
            </div>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <Base {...properties}>
            <Home {...properties} />
        </Base>
    );
});
