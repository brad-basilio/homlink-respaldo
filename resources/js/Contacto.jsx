import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronDown, ArrowRight, Phone } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import TextWithHighlight from "./Utils/TextWithHighlight";
import ContactForm from "./Components/Contact/ContactForm";
import MaintenancePage from "./Utils/MaintenancePage";
import { useTranslation } from "./hooks/useTranslation";
import MessagesRest from "./Actions/MessagesRest";
import Swal from "sweetalert2";
import GeneralRest from "./actions/GeneralRest";
import ServiceSeccionFaq from "./components/Tailwind/CambioGerencia/ServiceSeccionFaq";
import CintilloSection from "./components/Tailwind/CambiaFX/CintilloSection";

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

const ContactoPage = ({ landing, sedes, whatsapp, staff,faqs }) => {
    // Estado para controlar cuando las secciones están listas para animar
    const [sectionsReady, setSectionsReady] = useState(false);

    // Efecto para marcar las secciones como listas después del primer render
    useEffect(() => {
        // Pequeño delay para asegurar que el DOM esté completamente cargado
        const timer = setTimeout(() => {
            setSectionsReady(true);
        }, 100);
        
        return () => clearTimeout(timer);
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
            name: nameRef.current.value + ' ' + lastnameRef.current.value,
            subject: phoneRef.current.value,
            email: emailRef.current.value,
            description: descriptionRef.current.value,

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
            <CintilloSection/>
            
            {/* SECCIÓN PRINCIPAL DE CONTACTO */}
            <motion.main
                className="flex flex-col items-center justify-center min-h-[80vh] py-16"
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
                        className="bg-constrast rounded-2xl p-8 flex flex-col justify-between shadow-md min-h-[500px]"
                        initial={{ opacity: 0, x: -50 }}
                        animate={sectionsReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    >
                        <div>

                            <motion.div
                                className="flex items-center mb-4"
                                variants={itemVariants}
                            >
                                {/* <motion.div 
                                className="mr-2"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span>
                                    <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.50225 0C5.95566 0 4.69727 1.2584 4.69727 2.80499C4.69727 4.35158 5.95566 5.60998 7.50225 5.60998C9.04885 5.60998 10.3072 4.35158 10.3072 2.80499C10.3072 1.2584 9.04885 0 7.50225 0Z" fill="#D62828" />
                                        <path d="M7.50112 24.0025C3.65842 24.0025 0.759766 22.4639 0.759766 20.4219C0.759766 19.9629 1.13269 19.59 1.59168 19.59C2.05066 19.59 2.42359 19.9629 2.42359 20.4219C2.42359 21.203 4.40166 22.3387 7.49981 22.3387C10.5993 22.3387 12.576 21.2043 12.576 20.4219C12.576 19.8743 12.4874 19.3657 12.3048 18.8689C12.147 18.4373 12.3674 17.9601 12.799 17.801C13.2306 17.6432 13.7092 17.8636 13.8669 18.2952C14.1147 18.9693 14.2399 19.6839 14.2399 20.4206C14.2425 22.4639 11.3451 24.0025 7.50112 24.0025Z" fill="#D62828" />
                                        <path d="M11.4896 21.804C12.3046 21.4414 12.7754 20.9968 12.8132 20.6225C5.70098 16.9581 5.32021 11.2634 5.32021 10.1015C5.32021 9.64249 4.94725 9.26953 4.48823 9.26953C4.02921 9.26953 3.65625 9.64249 3.65625 10.1015C3.65625 11.4082 4.06181 17.6884 11.4896 21.804Z" fill="#D62828" />
                                        <path d="M7.49991 6.25781C5.37954 6.25781 3.6543 7.98306 3.6543 10.1034C3.6543 10.5624 4.02725 10.9354 4.48627 10.9354C4.9453 10.9354 5.31825 10.5624 5.31825 10.1034C5.31825 8.9011 6.29628 7.92177 7.49991 7.92177C8.70353 7.92177 9.68156 8.8998 9.68156 10.1034C9.68156 10.9432 8.14671 11.9108 6.66272 12.8458C6.33019 13.0558 5.98722 13.2709 5.64296 13.4965C5.81248 13.9855 6.03026 14.5059 6.31454 15.047C6.72531 14.7732 7.1426 14.5111 7.55077 14.2542C9.58768 12.971 11.3468 11.8626 11.3468 10.1034C11.3455 7.98306 9.62158 6.25781 7.49991 6.25781Z" fill="#D62828" />
                                        <path d="M4.23503 14.4766C2.36765 15.8954 0.759766 17.7158 0.759766 20.4191C0.759766 20.8781 1.13272 21.251 1.59174 21.251C2.05076 21.251 2.42372 20.8781 2.42372 20.4191C2.42372 18.5465 3.53085 17.1707 4.95486 16.0271C4.66406 15.4937 4.42673 14.9734 4.23503 14.4766Z" fill="#D62828" />
                                    </svg>

                                </span>
                            </motion.div> */}
                                <motion.h3
                                    className="uppercase text-white text-sm  font-medium tracking-[8%]"
                                    variants={itemVariants}
                                >
                                    Contáctanos
                                </motion.h3>
                            </motion.div>

                            {/* Título principal */}
                            <motion.h2
                                className="text-4xl lg:text-[40px] font-medium mb-6 leading-tight text-white"
                                variants={itemVariants}
                            >
                                <TextWithHighlight text={landingFormulario?.title || "Contáctenos"} color="bg-white font-semibold" />




                            </motion.h2>

                            <motion.p
                                className="mt-4 text-base text-neutral max-w-3xl mx-auto"
                                variants={itemVariants}
                            >
                                {landingFormulario?.description || ""}
                            </motion.p>
                        </div>



                        {/* Contact Form */}
                        <motion.form
                            onSubmit={onSubmit}
                            className="w-full flex flex-col gap-4 mt-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div
                                className="flex flex-col lg:flex-row gap-3"
                                variants={itemVariants}
                            >
                                <motion.input
                                    ref={nameRef}
                                    type="text"
                                    placeholder="Nombre"
                                    className="flex-1 border border-[#cbd5e1] rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    variants={inputFocus}
                                    initial="rest"
                                    whileFocus="focus"
                                    whileHover={{ scale: 1.01 }}
                                    style={{ transition: 'transform 0.2s ease-in-out' }}
                                />
                                <motion.input
                                    ref={lastnameRef}
                                    type="text"
                                    placeholder="Apellido"
                                    className="flex-1 border border-[#cbd5e1] rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    variants={inputFocus}
                                    initial="rest"
                                    whileFocus="focus"
                                    whileHover={{ scale: 1.01 }}
                                    style={{ transition: 'transform 0.2s ease-in-out' }}
                                />
                            </motion.div>
                            <motion.div
                                className="flex flex-col lg:flex-row gap-3"
                                variants={itemVariants}
                            >
                                <motion.input
                                    ref={phoneRef}
                                    type="text"
                                    placeholder="Teléfono"
                                    className="flex-1 border border-[#cbd5e1] rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    variants={inputFocus}
                                    initial="rest"
                                    whileFocus="focus"
                                    whileHover={{ scale: 1.01 }}
                                    style={{ transition: 'transform 0.2s ease-in-out' }}
                                />
                                <motion.input
                                    ref={emailRef}
                                    type="email"
                                    placeholder="Correo electrónico"
                                    className="flex-1 border border-[#cbd5e1] rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    variants={inputFocus}
                                    initial="rest"
                                    whileFocus="focus"
                                    whileHover={{ scale: 1.01 }}
                                    style={{ transition: 'transform 0.2s ease-in-out' }}
                                />
                            </motion.div>
                            <motion.textarea
                                ref={descriptionRef}
                                placeholder="Escribir mensaje"
                                rows={4}
                                className="border border-[#cbd5e1] rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none transition-all duration-200"
                                variants={itemVariants}
                                whileFocus={{ scale: 1.01 }}
                                whileHover={{ scale: 1.01 }}
                                style={{ transition: 'transform 0.2s ease-in-out' }}
                            />
                            <motion.button
                                type="submit"
                                className="mt-2 bg-secondary max-w-max text-neutral-dark tracking-[8%]  text-sm font-medium uppercase rounded-full px-6 py-3 flex items-center justify-center gap-2 transition-all duration-300"
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
                                            className="flex items-center gap-2"
                                        >
                                            <motion.div
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            />
                                            Enviando...
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="send"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            Enviar
                                            {/*  <motion.div
                                                whileHover={{ x: 5 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ArrowRight size={18} />
                                            </motion.div> */}
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

                        {/* Info Cards */}
                        <motion.div
                            className="flex flex-col gap-3"
                            initial={{ opacity: 0, y: 30 }}
                            animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                        >
                            <motion.div
                                className="grid grid-cols-1  gap-3"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={sectionsReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                {/* Email */}
                                <motion.div
                                    className="flex items-center gap-3 bg-neutral-dark rounded-xl p-4 shadow border "
                                    variants={cardHover}
                                    initial="rest"
                                    whileHover="hover"
                                >
                                    <motion.span
                                        className="bg-secondary text-neutral-dark rounded-full p-2"
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.66602 4.83203L7.42687 8.10255C9.5316 9.29745 10.4671 9.29745 12.5718 8.10255L18.3327 4.83203" stroke="#222222" stroke-width="1.25" stroke-linejoin="round" />
                                            <path d="M8.74935 16.9167C8.36077 16.9116 7.9717 16.9042 7.58171 16.8943C4.95796 16.8284 3.64608 16.7954 2.70348 15.8487C1.76087 14.9019 1.73363 13.6239 1.67916 11.0678C1.66164 10.2459 1.66163 9.42892 1.67915 8.60703C1.73363 6.05094 1.76087 4.7729 2.70347 3.82616C3.64608 2.87942 4.95796 2.84644 7.5817 2.78048C9.19877 2.73983 10.7999 2.73984 12.417 2.78049C15.0408 2.84645 16.3526 2.87943 17.2952 3.82617C18.2378 4.77291 18.2651 6.05095 18.3195 8.60703C18.3276 8.98543 18.3319 9.16375 18.3326 9.41667" stroke="#222222" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15.834 14.832C15.834 15.5224 15.2743 16.082 14.584 16.082C13.8937 16.082 13.334 15.5224 13.334 14.832C13.334 14.1417 13.8937 13.582 14.584 13.582C15.2743 13.582 15.834 14.1417 15.834 14.832ZM15.834 14.832V15.2487C15.834 15.939 16.3937 16.4987 17.084 16.4987C17.7743 16.4987 18.334 15.939 18.334 15.2487V14.832C18.334 12.7609 16.6551 11.082 14.584 11.082C12.5129 11.082 10.834 12.7609 10.834 14.832C10.834 16.9031 12.5129 18.582 14.584 18.582" stroke="#222222" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </motion.span>
                                    <div>
                                        <motion.div
                                            className="font-medium text-xl text-white"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            Correo electrónico
                                        </motion.div>
                                        <motion.div
                                            className="text-white text-base"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {generalsData.find(item => item.correlative === "email_contact")?.description || ""}
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Phone */}
                                <motion.div
                                    className="flex items-center gap-3 bg-neutral-dark rounded-xl p-4 shadow border border-[#f3f4f6]"
                                    variants={cardHover}
                                    initial="rest"
                                    whileHover="hover"
                                >
                                    <motion.span
                                        className="bg-secondary text-neutral-dark rounded-full p-2"
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.8729 14.0781C16.8778 13.1184 17.4993 11.7925 17.4993 10.3281C17.4993 8.86363 16.8778 7.53783 15.8729 6.57812M14.166 8.45313C14.6684 8.93297 14.9793 9.59588 14.9793 10.3281C14.9793 11.0604 14.6684 11.7233 14.166 12.2031" stroke="#222222" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M13.3333 6.16667C13.3333 4.20248 13.3333 3.22039 12.7232 2.61019C12.1129 2 11.1308 2 9.16667 2H6.66667C4.70248 2 3.72039 2 3.11019 2.61019C2.5 3.22039 2.5 4.20248 2.5 6.16667V14.5C2.5 16.4642 2.5 17.4462 3.11019 18.0565C3.72039 18.6667 4.70248 18.6667 6.66667 18.6667H9.16667C11.1308 18.6667 12.1129 18.6667 12.7232 18.0565C13.3333 17.4462 13.3333 16.4642 13.3333 14.5" stroke="#222222" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.58333 2H6.25L6.66667 2.83333H9.16667L9.58333 2Z" stroke="#222222" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </motion.span>
                                    <div>
                                        <motion.div
                                            className="font-semibold text-white"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            Contacto
                                        </motion.div>
                                        <motion.div
                                            className="text-white text-sm"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {generalsData.find(item => item.correlative === "phone_contact")?.description || ""}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Location */}
                            <motion.div
                                className="flex items-center gap-3 bg-neutral-dark rounded-xl p-4 shadow border border-[#f3f4f6]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                variants={cardHover}
                                whileHover="hover"
                            >
                                <motion.span
                                    className="bg-secondary text-neutral-dark rounded-full p-2"
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3481 17.8071C10.9867 18.1455 10.5037 18.3346 10.0009 18.3346C9.49817 18.3346 9.01517 18.1455 8.65375 17.8071C5.34418 14.6896 0.908967 11.2071 3.07189 6.15102C4.24136 3.41727 7.04862 1.66797 10.0009 1.66797C12.9532 1.66797 15.7605 3.41727 16.93 6.15102C19.0902 11.2007 14.6658 14.7004 11.3481 17.8071Z" stroke="#222222" stroke-width="1.25" />
                                        <path d="M12.9173 9.16667C12.9173 10.7775 11.6115 12.0833 10.0007 12.0833C8.38982 12.0833 7.08398 10.7775 7.08398 9.16667C7.08398 7.55583 8.38982 6.25 10.0007 6.25C11.6115 6.25 12.9173 7.55583 12.9173 9.16667Z" stroke="#222222" stroke-width="1.25" />
                                    </svg>

                                </motion.span>
                                <div>
                                    <motion.div
                                        className="font-semibold text-white"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Ubicación
                                    </motion.div>
                                    <motion.div
                                        className="text-white text-sm"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {generalsData.find(item => item.correlative === "address")?.description || "Lima, Perú"}
                                    </motion.div>
                                </div>
                            </motion.div>


                            <motion.div 
                                className="relative  w-full px-10 rounded-[56px] bg-secondary  flex flex-col md:flex-row items-center  py-10 min-h-[330px] mt-16"
                                initial={{ opacity: 0, y: 40 }}
                                animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                            >
                                {/* Fondo decorativo */}
                                <motion.div 
                                    className="absolute w-full h-full  right-0 left-0 bottom-0 z-0 overflow-hidden rounded-[56px] "
                                
                                >



                                    <motion.svg 
                                        className="w-full" width="594" height="315" viewBox="0 0 594 315" fill="none" xmlns="http://www.w3.org/2000/svg"
                                      
                                    >
                                        <motion.path 
                                            d="M-147.68 355.4C-124.332 352.83 -90.2834 346.823 -51.955 331.329C15.4416 304.086 56.4845 263.505 84.5695 235.171C118.162 201.282 144.643 174.565 159.394 129.737C160.55 126.225 194.417 60.8935 156.7 21.3772C118.976 -18.1462 63.9491 17.6986 56.0136 78.5852C48.0781 139.472 71.91 172.287 100.769 195.167C141.703 227.622 194.435 225.044 235.103 219.599C412.543 195.829 504.016 89.5735 673.893 19.7087C764.865 -17.705 988.379 -133.776 1123.37 -75.0488" 
                                            stroke="#719931" 
                                            strokeOpacity="0.24" 
                                            strokeWidth="29.8691" 
                                            strokeMiterlimit="10"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 3, delay: 1 }}
                                        />
                                    </motion.svg>
                                </motion.div>

                                {/* Columna izquierda: texto */}
                                <motion.div 
                                    className="flex-1 z-10 h-full flex flex-col justify-end items-start gap-2"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={sectionsReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                >
                                    <div>
                                        <motion.span 
                                            className="text-lg font-medium"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                            transition={{ duration: 0.5, delay: 0.9 }}
                                        >
                                            ¡Descarga nuestra app!
                                        </motion.span>
                                        <motion.div 
                                            className="flex gap-2 mt-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                            transition={{ duration: 0.6, delay: 1 }}
                                        >
                                            {apps?.map((app, index) => (
                                                <motion.a 
                                                    href={app?.link} 
                                                    key={index} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    whileHover={{ 
                                                        scale: 1.1, 
                                                        y: -5,
                                                        transition: { duration: 0.2 }
                                                    }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <img 
                                                        src={`/api/app/media/${app?.image}`} 
                                                        alt={app?.name} 
                                                        className="h-12" 
                                                        onError={(e) =>
                                                            (e.target.src = "/api/cover/thumbnail/null")
                                                        } 
                                                    />
                                                </motion.a>
                                            ))}
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Columna central: imagen */}
                                <motion.img 
                                    src={`/api/landing_home/media/${landingFormulario?.image}`} 
                                    alt="Empresas" 
                                    className="h-[400px] object-cover absolute bottom-0 right-0 select-none" 
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

                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.main>
            
            {/* SECCIÓN FAQs */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.5 }}
            >
                <ServiceSeccionFaq landingFAQS={landingFAQS} faqs={faqs} />
            </motion.div>
            
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
