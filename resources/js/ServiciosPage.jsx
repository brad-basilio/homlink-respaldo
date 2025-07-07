import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import TextWithHighlight from "./Utils/TextWithHighlight";
import ModalAppointment from "./components/Appointment/ModalAppointment";
import DynamicGalleryServiceService from "./DynamicGalleryService";
import { useTranslation } from "./hooks/useTranslation";
import CintilloSection from "./components/Tailwind/CambiaFX/CintilloSection";
import HeroServiceSection from "./components/Tailwind/CambiaFX/HeroServiceSection";
import TransferenciaServiceSection from "./components/Tailwind/CambiaFX/TransferenciaServiceSection";
import MoreServiceSection from "./components/Tailwind/CambiaFX/MoreServiceSection";

const ServiciosPage = ({ landing, services, linkWhatsApp, randomImage }) => {
  
console.log(services)
    return (
        <div className="font-title">
            <Header />
            <CintilloSection/>
            <HeroServiceSection service={services[0]}/>
            <TransferenciaServiceSection service={services[1]}/>
            <MoreServiceSection service={services[2]}/>

            <Footer />
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <ServiciosPage {...properties} />
            </Base>
        </CarritoProvider>
    );
});
