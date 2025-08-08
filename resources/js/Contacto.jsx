import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronDown, ArrowRight, Phone } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import TextWithHighlight from "./Utils/TextWithHighlight";
import ContactForm from "./components/Contact/ContactForm";
import MaintenancePage from "./Utils/MaintenancePage";
import { useTranslation } from "./hooks/useTranslation";
import MessagesRest from "./Actions/MessagesRest";
import Swal from "sweetalert2";
import GeneralRest from "./actions/GeneralRest";
import ServiceSeccionFaq from "./components/Tailwind/CambioGerencia/ServiceSeccionFaq";
import CintilloSection from "./components/Tailwind/Sections/CintilloSection";
// Importaciones de Swiper para la versión móvil
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import WhatsAppButton from "./components/Shared/WhatsAppButton";

// Estilos CSS para el Swiper de apps en móvil
const appSwiperStyles = `
  .app-download-swiper {
    width: 100% !important;
    padding-bottom: 30px !important;
    position: relative !important;
    overflow: visible !important;
  }
  
  .app-download-swiper .swiper-wrapper {
    position: relative !important;
    align-items: center !important;
  }
  
  .app-download-swiper .swiper-slide {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    height: auto !important;
  }
  
  .app-download-swiper .swiper-slide a {
    width: 100% !important;
    height: auto !important;
  }
  
  .app-download-swiper .swiper-pagination {
    bottom: 0 !important;
    position: relative !important;
    margin-top: 15px !important;
  }
  
  .app-download-swiper .swiper-pagination-bullet {
    background-color: #222222 !important;
    opacity: 0.4 !important;
    width: 6px !important;
    height: 6px !important;
    margin: 0 3px !important;
  }
  
  .app-download-swiper .swiper-pagination-bullet-active {
    background-color: #222222 !important;
    opacity: 1 !important;
    transform: scale(1.2) !important;
  }
`;

// Inyectar estilos del Swiper
if (typeof document !== 'undefined' && !document.getElementById('app-swiper-styles')) {
    const style = document.createElement('style');
    style.id = 'app-swiper-styles';
    style.textContent = appSwiperStyles;
    document.head.appendChild(style);
}

// Animaciones mejoradas
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
            duration: 0.6,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 15,
            duration: 0.7,
        },
    },
};

const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

const slideUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

const buttonHover = {
    rest: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
    hover: {
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: {
        scale: 0.98,
        transition: { duration: 0.1 },
    },
};

const inputFocus = {
    rest: {
        borderColor: "#cbd5e1",
        boxShadow: "none",
        scale: 1,
    },
    focus: {
        borderColor: "#3b82f6",
        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
        scale: 1.01,
        transition: { duration: 0.2 },
    },
};

const cardHover = {
    rest: {
        y: 0,
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        scale: 1,
    },
    hover: {
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
    },
};

const ContactoPage = ({ landing, sedes, whatsapp, staff, faqs, banner_principal }) => {
    // Estado para controlar cuando las secciones están listas para animar
    const [sectionsReady, setSectionsReady] = useState(false);
    // Estado para detectar si es móvil
    const [isMobile, setIsMobile] = useState(false);

    // Efecto para marcar las secciones como listas después del primer render
    useEffect(() => {
        // Pequeño delay para asegurar que el DOM esté completamente cargado
        const timer = setTimeout(() => {
            setSectionsReady(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Efecto para detectar si es móvil
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Verificar inicialmente y cada vez que cambia el tamaño de ventana
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const landingFormulario = landing?.find(
        (item) => item.correlative === "page_contact_formulario"
    );

    const landingFAQS = landing?.find(
        (item) => item.correlative === "page_contact_faqs"
    );

    /*     const landingForm = landing?.find(
         (item) => item.correlative === "page_contact_form"
     );
      const landingSoporte = landing?.find(
         (item) => item.correlative === "page_contact_help"
     );
     const sectionone = landing?.find(
         (item) => item.correlative === "page_contact_sectionone"
     );
     const sectiontwo = landing?.find(
         (item) => item.correlative === "page_contact_sectiontwo"
     );
     const landingVentas = landing?.find(
         (item) => item.correlative === "page_contact_ventas"
     );
     const sectiontree = landing?.find(
         (item) => item.correlative === "page_contact_sectiontree"
     );
     const sectionfour = landing?.find(
         (item) => item.correlative === "page_contact_sectionfour"
     );
     const sectionfive = landing?.find(
         (item) => item.correlative === "page_contact_sectionfive"
     ); */
    const messagesRest = new MessagesRest();

    // Opción 1: Deshabilitar notificaciones automáticas para usar notificaciones personalizadas
    messagesRest.enableNotifications = false;

    // Opción 2: Usando method chaining (alternativa más elegante)
    // const messagesRest = new MessagesRest().withoutNotifications();

    // Opción 3: Usando el método setNotifications
    // const messagesRest = new MessagesRest().setNotifications(false);


    const nameRef = useRef()
    const phoneRef = useRef()
    const emailRef = useRef()
    const descriptionRef = useRef()
    const lastnameRef = useRef()

    const [sending, setSending] = useState(false)

    // Función para limpiar el formulario
    const clearForm = () => {
        const fields = [nameRef, lastnameRef, phoneRef, emailRef, descriptionRef];

        fields.forEach((ref, index) => {
            if (ref.current) {
                // Pequeño delay para crear efecto de limpieza secuencial
                setTimeout(() => {
                    ref.current.value = "";
                    // Opcional: agregar una pequeña animación visual
                    ref.current.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        ref.current.style.transform = 'scale(1)';
                    }, 100);
                }, index * 50);
            }
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (sending) return
        setSending(true)

        const request = {
            //name: nameRef.current.value + ' ' + lastnameRef.current.value,
            name:nameRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            description: descriptionRef.current.value,
            contact_type: 'personal',
            subject: 'Contacto desde formulario',

        }

        const result = await messagesRest.save(request);
        setSending(false)

        if (!result) {
            // Mostrar error personalizado ya que las notificaciones automáticas están deshabilitadas
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.',
                confirmButtonText: 'Entendido'
            })
            return
        }

        // Mostrar éxito personalizado
        Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado',
            text: 'Tu mensaje ha sido enviado correctamente. ¡Nos pondremos en contacto contigo pronto!',
            showConfirmButton: false,
            timer: 3000
        })

        // Verificar si hay redirección (usar result en lugar de data)
        if (result.redirect) {
            location.href = result.redirect
        }

        // Limpiar los campos del formulario
        clearForm()
    }




    const generalRest = new GeneralRest();
    const [aboutuses, setAboutuses] = useState([]);

    useEffect(() => {
        const fetchAboutuses = async () => {
            try {
                const data = await generalRest.getAboutuses();
                setAboutuses(data);
            } catch (error) {
                console.error("Error fetching about:", error);
            }
        };

        fetchAboutuses();
    }, []);


    const generalsData = aboutuses?.generals || [];

    //location = -12.08572604235328,-76.99121088594794

    const location = generalsData.find(item => item.correlative === "location")?.value || "-12.08572604235328,-76.99121088594794";
    const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD8b2d3f4e5f6g7h8i9j0k1l2m3n4o5p&q=${location}`;
    const mapSrcWithZoom = `${mapSrc}&zoom=12`;
    const mapSrcWithOutput = `${mapSrc}&output=embed`;
    const mapSrcWithEmbed = `${mapSrc}&embed=true`;
    const mapSrcWithLocation = `https://www.google.com/maps?q=${location}&z=12&output=embed`;
    const mapSrcWithLocationAndZoom = `https://www.google.com/maps?q=${location}&z=12&output=embed`;
    const mapSrcWithLocationAndEmbed = `https://www.google.com/maps?q=${location}&z=12&output=embed&embed=true`;
    const mapSrcWithLocationAndOutput = `https://www.google.com/maps?q=${location}&z=12&output=embed`;
    const mapSrcWithLocationAndEmbedAndZoom = `https://www.google.com/maps?q=${location}&z=12&output=embed&embed=true`;
    const mapSrcWithLocationAndEmbedAndOutput = `https://www.google.com/maps?q=${location}&z=12&output=embed&embed=true`;
    const mapSrcWithLocationAndEmbedAndOutputAndZoom = `https://www.google.com/maps?q=${location}&z=12&output=embed&embed=true`;
    const mapSrcWithLocationAndEmbedAndOutputAndZoomAndKey = `https://www.google.com/maps?q=${location}&z=12&output=embed&embed=true&key=AIzaSyD8b2d3f4e5f6g7h8i9j0k1l2m3n4o5p`;
    const mapSrcWithLocationAndEmbedAndOutputAndZoomAndKeyAndOutput = `https://www.google.com/maps?q=${location}&z=12&output=embed&embed=true&key=AIzaSyD8b2d3f4e5f6g7h8i9j0k1l2m3n4o5p&output=embed`;
    const mapSrcWithLocationAndEmbedAndOutputAndZoomAndKeyAndOutputAndEmbed = `https://www.google.com/maps?q=${location}&z=12&output=embed&embed=true&key=AIzaSyD8b2d3f4e5f6g7h8i9j0k1l2m3n4o5p&output=embed&embed=true`;
    const mapSrcWithLocationAndEmbedAndOutputAndZoomAndKeyAndOutputAndEmbedAndZoom = `https://www.google.com/maps?q=${location}&z=12&output=embed&embed=true&key=AIzaSyD8b2d3f4e5f6g7h8i9j0k1l2m3n4o5p&output=embed&embed=true&zoom=12`;



    const [apps, setApps] = useState([]);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const data = await generalRest.getApps();
                setApps(data);
            } catch (error) {
                console.error("Error fetching apps:", error);
            }
        };

        fetchApps();
    }, []);

    return (
        <motion.div
            className="font-title text-neutral-dark min-h-screen"
            initial={{ opacity: 0 }}
            animate={sectionsReady ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Header />


            {/* SECCIÓN PRINCIPAL DE CONTACTO */}
            <motion.main
                className="flex flex-col items-center justify-center min-h-[80vh] pt-16"
                initial={{ opacity: 0, y: 40 }}
                animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
            >
                <motion.div
                    className="w-full px-[5%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 bg-transparent"
                    initial={{ opacity: 0, y: 30 }}
                    animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    {/* Left: Contact Form */}
                    <motion.div
                        className="bg-white rounded-2xl p-8 shadow-lg"
                        initial={{ opacity: 0, x: -50 }}
                        animate={sectionsReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    >
                        {/* Título principal */}
                        <motion.h2
                            className="text-3xl lg:text-4xl font-bold mb-2 leading-tight text-gray-900"
                            variants={itemVariants}
                        >
                            {landingFormulario?.title || "Escríbenos si tienes alguna duda o consulta"}
                        </motion.h2>

                        <motion.p
                            className="text-gray-600 mb-8 text-base"
                            variants={itemVariants}
                        >
                            {landingFormulario?.description || "Aliquam quis lectus aliquam, bibendum urna vel, vehicula risus."}
                        </motion.p>



                        {/* Contact Form */}
                        <motion.form
                            onSubmit={onSubmit}
                            className="w-full flex flex-col gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Nombre completo */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre completo
                                </label>
                                <motion.input
                                    ref={nameRef}
                                    type="text"
                                    placeholder="Nombre y Apellido"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    variants={inputFocus}
                                    initial="rest"
                                    whileFocus="focus"
                                    whileHover={{ scale: 1.01 }}
                                    style={{ transition: 'transform 0.2s ease-in-out' }}
                                />
                            </motion.div>

                            {/* Celular */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Celular
                                </label>
                                <motion.input
                                    ref={phoneRef}
                                    type="text"
                                    placeholder="(+51)"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    variants={inputFocus}
                                    initial="rest"
                                    whileFocus="focus"
                                    whileHover={{ scale: 1.01 }}
                                    style={{ transition: 'transform 0.2s ease-in-out' }}
                                />
                            </motion.div>

                            {/* Correo electrónico */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Correo electrónico
                                </label>
                                <motion.input
                                    ref={emailRef}
                                    type="email"
                                    placeholder="hola@mail.com"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    variants={inputFocus}
                                    initial="rest"
                                    whileFocus="focus"
                                    whileHover={{ scale: 1.01 }}
                                    style={{ transition: 'transform 0.2s ease-in-out' }}
                                />
                            </motion.div>

                            {/* Mensaje */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mensaje
                                </label>
                                <motion.textarea
                                    ref={descriptionRef}
                                    placeholder="Hola estoy..."
                                    rows={6}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                                    variants={itemVariants}
                                    whileFocus={{ scale: 1.01 }}
                                    whileHover={{ scale: 1.01 }}
                                    style={{ transition: 'transform 0.2s ease-in-out' }}
                                />
                            </motion.div>

                            {/* Botón */}
                            <motion.button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-full transition-all duration-300 text-base"
                                variants={buttonHover}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                                disabled={sending}
                            >
                                <AnimatePresence mode="wait">
                                    {sending ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <motion.div
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            />
                                            Enviando mensaje...
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="send"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            Enviar mensaje
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </motion.form>
                    </motion.div>
                    {/* Right: Map and Info Cards */}
                    <motion.div
                        className="flex flex-col gap-6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={sectionsReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {/* {/* Map 
                        <motion.div 
                            className="rounded-2xl overflow-hidden shadow-md w-full h-72 md:h-full min-h-[300px]"
                            variants={fadeInScale}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <iframe
                                title="Ubicación Lima"
                                src={mapSrcWithLocationAndEmbedAndOutput}
                                width="100%"
                                height="100%"
                                className="w-full h-full border-0"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </motion.div> */}

                        {/* Tarjeta azul con datos de contacto */}
                        <motion.div
                            className="bg-gradient-to-br from-primary to-primary  rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                        >
                            {/* Efectos de fondo decorativos */}
                            <div className="absolute inset-0  opacity-40 right-0 left-0 h-full">
                                <svg className="h-full w-full" width="296" height="434" viewBox="0 0 296 434" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.6">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M734.71 -21.9338C707.164 -72.7263 668.774 -112.509 619.542 -141.281C570.604 -169.76 514.632 -184 451.627 -184C388.915 -184 332.943 -169.76 283.711 -141.281C234.772 -112.509 196.529 -72.7263 168.983 -21.9338C146.711 19.4636 133.524 64.9713 129.421 114.589C129.421 115.47 129.421 116.204 129.421 116.791C127.224 134.407 112.718 148.06 94.6954 148.5C94.4024 148.5 94.1093 148.5 93.8162 148.5C93.5232 148.5 93.2302 148.5 92.9371 148.5C28.7598 148.5 -16.0763 211.917 5.46263 272.692C11.3236 288.546 18.2102 303.96 26.1224 318.934C53.6688 369.726 91.9115 409.509 140.85 438.281C190.082 466.76 246.054 481 308.766 481C371.771 481 427.743 466.76 476.682 438.281C525.914 409.509 564.157 369.726 591.41 318.934C614.268 276.949 627.601 230.854 631.411 180.649C633.169 163.474 646.796 149.821 664.379 148.5C665.258 148.5 666.137 148.5 667.016 148.5C667.895 148.5 668.774 148.5 669.654 148.5C732.952 148.5 776.469 85.9636 755.809 26.0695C749.948 9.62802 742.915 -6.37305 734.71 -21.9338ZM594.047 148.5C539.541 148.5 492.946 184.172 475.803 235.699C473.166 243.626 470.089 251.259 466.572 258.599C451.627 291.189 430.527 316.585 403.274 334.788C375.727 353.285 344.225 362.533 308.766 362.533C272.721 362.533 241.072 353.285 213.819 334.788C186.273 316.585 165.173 291.189 150.521 258.599C140.85 238.341 134.403 216.321 131.18 192.54C130.594 190.191 130.301 187.989 130.301 185.934C130.301 185.64 130.301 185.493 130.301 185.493C130.301 185.2 130.301 184.759 130.301 184.172C130.301 164.354 146.125 148.5 165.906 148.5C219.973 148.5 267.007 112.828 284.15 61.3013C286.788 53.3742 289.865 45.7406 293.381 38.4007C308.327 5.81126 329.426 -19.585 356.679 -37.7881C383.933 -56.2848 415.582 -65.5331 451.627 -65.5331C487.085 -65.5331 518.588 -56.2848 546.134 -37.7881C573.388 -19.585 594.487 5.81126 609.432 38.4007C619.103 59.2461 625.55 81.8532 628.773 106.222C629.067 107.396 629.36 108.571 629.653 109.745C629.653 110.626 629.653 111.653 629.653 112.828C629.653 132.205 613.828 148.5 594.047 148.5Z" fill="white" />
                                    </g>
                                </svg>


                            </div>

                            <div className="relative z-10">
                                {/* Título */}
                                <motion.h3
                                    className="text-2xl font-bold mb-8 border-b border-white  pb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    Datos de Contacto
                                </motion.h3>

                                {/* Lista de datos de contacto */}
                                <motion.div
                                    className="space-y-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    {/* Dirección */}
                                    <motion.div
                                        className="flex items-start gap-4"
                                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                    >
                                        <motion.div
                                            className="bg-white/20 rounded-full p-2 mt-1"
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.3481 17.8071C10.9867 18.1455 10.5037 18.3346 10.0009 18.3346C9.49817 18.3346 9.01517 18.1455 8.65375 17.8071C5.34418 14.6896 0.908967 11.2071 3.07189 6.15102C4.24136 3.41727 7.04862 1.66797 10.0009 1.66797C12.9532 1.66797 15.7605 3.41727 16.93 6.15102C19.0902 11.2007 14.6658 14.7004 11.3481 17.8071Z" stroke="white" strokeWidth="1.5" />
                                                <path d="M12.9173 9.16667C12.9173 10.7775 11.6115 12.0833 10.0007 12.0833C8.38982 12.0833 7.08398 10.7775 7.08398 9.16667C7.08398 7.55583 8.38982 6.25 10.0007 6.25C11.6115 6.25 12.9173 7.55583 12.9173 9.16667Z" stroke="white" strokeWidth="1.5" />
                                            </svg>
                                        </motion.div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-1">Dirección</h4>
                                            <p className="text-white/90 text-sm leading-relaxed">
                                                {generalsData.find(item => item.correlative === "address")?.description || "ayuda@mail.com"}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Número de Teléfono */}
                                    <motion.div
                                        className="flex items-start gap-4"
                                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                    >
                                        <motion.div
                                            className="bg-white/20 rounded-full p-2 mt-1"
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.8729 13.5781C16.8778 12.6184 17.4993 11.2925 17.4993 9.82812C17.4993 8.36363 16.8778 7.03783 15.8729 6.07812M14.166 7.95313C14.6684 8.43297 14.9793 9.09588 14.9793 9.82812C14.9793 10.5604 14.6684 11.2233 14.166 11.7031" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M13.3333 5.66667C13.3333 3.70248 13.3333 2.72039 12.7232 2.11019C12.1129 1.5 11.1308 1.5 9.16667 1.5H6.66667C4.70248 1.5 3.72039 1.5 3.11019 2.11019C2.5 2.72039 2.5 3.70248 2.5 5.66667V14C2.5 15.9642 2.5 16.9462 3.11019 17.5565C3.72039 18.1667 4.70248 18.1667 6.66667 18.1667H9.16667C11.1308 18.1667 12.1129 18.1667 12.7232 17.5565C13.3333 16.9462 13.3333 15.9642 13.3333 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M9.58333 1.5H6.25L6.66667 2.33333H9.16667L9.58333 1.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </motion.div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-1">Número de Teléfono</h4>
                                            <div className="text-white/90 text-sm">
                                                {(generalsData.find(item => item.correlative === "phone_contact")?.description || "+51 915 960 941")
                                                    .split(',')
                                                    .map((phone, index) => (
                                                        <p key={index} className="mb-1">{phone.trim()}</p>
                                                    ))
                                                }
                                            </div>

                                        </div>
                                    </motion.div>

                                    {/* Correo Electrónico */}
                                    <motion.div
                                        className="flex items-start gap-4"
                                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                    >
                                        <motion.div
                                            className="bg-white/20 rounded-full p-2 mt-1"
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.66602 4.33203L7.42687 7.60255C9.5316 8.79745 10.4671 8.79745 12.5718 7.60255L18.3327 4.33203" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                                                <path d="M8.74935 16.4167C8.36077 16.4116 7.9717 16.4042 7.58171 16.3943C4.95796 16.3284 3.64608 16.2954 2.70348 15.3487C1.76087 14.4019 1.73363 13.1239 1.67916 10.5678C1.66164 9.74589 1.66163 8.92892 1.67915 8.10703C1.73363 5.55094 1.76087 4.2729 2.70347 3.32616C3.64608 2.37942 4.95796 2.34644 7.5817 2.28048C9.19877 2.23983 10.7999 2.23984 12.417 2.28049C15.0408 2.34645 16.3526 2.37943 17.2952 3.32617C18.2378 4.27291 18.2651 5.55095 18.3195 8.10703C18.3276 8.48543 18.3319 8.66375 18.3326 8.91667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15.834 14.332C15.834 15.0224 15.2743 15.582 14.584 15.582C13.8937 15.582 13.334 15.0224 13.334 14.332C13.334 13.6417 13.8937 13.082 14.584 13.082C15.2743 13.082 15.834 13.6417 15.834 14.332ZM15.834 14.332V14.7487C15.834 15.439 16.3937 15.9987 17.084 15.9987C17.7743 15.9987 18.334 15.439 18.334 14.7487V14.332C18.334 12.2609 16.6551 10.582 14.584 10.582C12.5129 10.582 10.834 12.2609 10.834 14.332C10.834 16.4031 12.5129 18.082 14.584 18.082" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </motion.div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-1">Correo Electrónico</h4>
                                            <p className="text-white/90 text-sm">
                                                {generalsData.find(item => item.correlative === "email_contact")?.description || "ayuda@mail.com"}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Horario de Atención */}
                                    <motion.div
                                        className="flex items-start gap-4"
                                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                    >
                                        <motion.div
                                            className="bg-white/20 rounded-full p-2 mt-1"
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="10" cy="10" r="8.33333" stroke="white" strokeWidth="1.5" />
                                                <path d="M10 5.83333V10L13.3333 11.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </motion.div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-1">Horario de Atención</h4>
                                            <p className="text-white/90 text-sm whitespace-pre-line">
                                                {generalsData.find(item => item.correlative === "opening_hours")?.description || "ayuda@mail.com"}

                                            </p>

                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>


                    </motion.div>
                </motion.div>




                {/* Versión Desktop */}
                {!isMobile && (
                    <motion.div
                        className="relative w-full px-[5%] bg-secondary flex flex-col md:flex-row items-center  min-h-[400px] mt-16"
                        initial={{ opacity: 0, y: 40 }}
                        animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                    >
                        {/* Fondo decorativo */}
                        <motion.div
                            className="absolute w-full h-full right-0 top-0 z-0 overflow-hidden rounded-[56px]"
                        >
                            <svg className="w-full h-full" width="1067" height="284" viewBox="0 0 1067 284" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.6">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1242.69 459.804C1287.59 414.017 1306.13 360.173 1298.32 298.27C1290.38 236.775 1255.26 172.334 1192.97 104.947C1130.96 37.8742 1055.4 -17.4136 966.276 -60.9161C877.026 -104.011 782.715 -132.127 683.344 -145.265C602.531 -155.78 524.862 -155.258 450.338 -143.699C449.087 -143.416 448.045 -143.18 447.211 -142.992C420.02 -139.681 386.289 -150.807 367.844 -169.942C367.554 -170.255 367.265 -170.568 366.975 -170.882C366.685 -171.195 366.395 -171.509 366.106 -171.822C302.652 -240.462 168.257 -268.035 103.24 -225.465C86.5186 -214.101 71.4367 -201.782 57.9943 -188.507C13.0945 -142.72 -5.59354 -89.0322 1.93045 -27.4428C10.1611 34.3658 45.2789 98.8066 107.284 165.88C169.578 233.266 245.142 288.554 333.975 331.743C423.514 375.151 517.825 403.267 616.906 416.092C699.133 427.045 777.78 426.492 852.848 414.43C878.979 410.791 911.841 420.977 931.102 439.358C931.971 440.298 932.841 441.239 933.71 442.179C934.579 443.119 935.448 444.06 936.318 445C998.902 512.7 1130.74 539.145 1195.38 497.799C1212.93 486.246 1228.7 473.581 1242.69 459.804ZM861.564 364.136C807.672 305.839 710.942 267.469 620.814 265.694C606.948 265.421 593.064 264.583 579.163 263.181C518.103 257.67 461.174 243.266 408.376 219.968C354.871 196.451 310.589 165.73 275.53 127.805C239.892 89.2537 221.735 52.4313 221.058 17.338C219.674 -17.9744 234.88 -48.7033 266.677 -74.8486C285.886 -91.7026 310.784 -105.675 341.372 -116.766C344.128 -118.148 346.965 -119.169 349.884 -119.829C350.301 -119.924 350.51 -119.971 350.51 -119.971C350.927 -120.065 351.552 -120.207 352.386 -120.395C380.531 -126.765 418.694 -114.935 438.251 -93.7791C491.709 -35.952 588.874 2.88795 679.002 4.66302C692.868 4.93611 706.751 5.77372 720.652 7.17582C781.713 12.6865 838.642 27.0909 891.44 50.3891C944.655 73.593 989.081 104.471 1024.72 143.022C1059.78 180.947 1077.79 217.612 1078.76 253.019C1079.85 288.018 1064.65 318.747 1033.14 345.206C1013.1 362.248 987.363 376.409 955.942 387.689C954.564 388.38 953.186 389.071 951.808 389.762C950.557 390.045 949.097 390.375 947.429 390.752C919.909 396.98 881.122 385.292 861.564 364.136Z" fill="white" />
                                </g>
                            </svg>

                        </motion.div>

                        {/* Contenido principal */}
                        <motion.div
                            className="flex-1 z-10 h-full flex flex-col justify-end items-start gap-4 relative"
                            initial={{ opacity: 0, x: -30 }}
                            animate={sectionsReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            {/* Título */}
                            <motion.span
                                className="text-[40px] font-medium text-white"
                                initial={{ opacity: 0, y: 10 }}
                                animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                            >
                                {banner_principal?.name}
                            </motion.span>
                            {/* Título */}
                            <motion.span
                                className="text-lg font-medium text-white"
                                initial={{ opacity: 0, y: 10 }}
                                animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                            >
                                {banner_principal?.description}
                            </motion.span>
                            <WhatsAppButton buttonData={banner_principal?.button_link}>
                                <button className="bg-primary  text-white py-3 px-4 rounded-full">
                                    {banner_principal?.button_text}
                                </button>
                            </WhatsAppButton>

                        </motion.div>

                        {/* Imagen principal desktop */}
                        <motion.img
                            src={`/api/banners/media/${banner_principal?.image}`}
                            alt="Empresas"
                            className="h-[500px] object-cover absolute bottom-0 right-24  select-none"
                            draggable="false"
                            initial={{ opacity: 0, x: 50 }}
                            animate={sectionsReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.8, delay: 1.1 }}
                            whileHover={{
                                scale: 1.05,
                                y: -10,
                                transition: { duration: 0.4 }
                            }}
                        />
                    </motion.div>
                )}

                {/* Versión Móvil - Completamente separada */}
                {isMobile && (
                    <motion.div
                        className="w-full mt-16 px-[5%] py-8 bg-secondary "
                        initial={{ opacity: 0, y: 40 }}
                        animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        {/* Título móvil */}
                        <motion.div
                            className="text-center "
                            initial={{ opacity: 0, y: 20 }}
                            animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {banner_principal?.name}
                            </h3>
                            <p className="text-sm text-white opacity-80">
                                {banner_principal?.description}
                            </p>

                            <WhatsAppButton buttonData={banner_principal?.button_link}>
                                <button className="bg-primary  text-white py-3 px-4 rounded-full">
                                    {banner_principal?.button_text}
                                </button>
                            </WhatsAppButton>
                        </motion.div>

                    </motion.div>
                )}

            </motion.main>




            <Footer />
        </motion.div>

    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <ContactoPage {...properties} />
            </Base>
        </CarritoProvider>
    );
});

