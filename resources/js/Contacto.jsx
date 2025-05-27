import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronDown } from "lucide-react";
import React, { useState } from "react";
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

// Animaciones
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
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
            duration: 0.6,
        },
    },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8 },
    },
};

const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const buttonHover = {
    hover: {
        scale: 1.05,
        transition: { duration: 0.2 },
    },
    tap: {
        scale: 0.95,
    },
};

const ContactoPage = ({ landing, sedes, whatsapp, staff }) => {
    const landingHero = landing?.find(
        (item) => item.correlative === "page_contact_hero"
    );
    const landingForm = landing?.find(
        (item) => item.correlative === "page_contact_form"
    );
    const landingHelp = landing?.find(
        (item) => item.correlative === "page_contact_help"
    );
    const sectionone = landing?.find(
        (item) => item.correlative === "page_contact_sectionone"
    );
    const sectiontwo = landing?.find(
        (item) => item.correlative === "page_contact_sectiontwo"
    );
    const sedesValidas = Array.isArray(sedes) ? sedes : [];

    const todosHorariosIguales =
        sedesValidas.length > 0 &&
        sedesValidas.every(
            (sede, _, arr) =>
                JSON.stringify(sede.horario) === JSON.stringify(arr[0].horario)
        );

    const { t } = useTranslation();

    const [openedId, setOpenedId] = useState(sectionone.id);

    const toggleAccordion = (id) => {
        setOpenedId(openedId === id ? null : id);
      };

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
        <div className="font-poppins text-negro">
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


            <div className="flex flex-row md:justify-center items-center text-[#3E2F4D] gap-8 2xl:gap-10 px-[5%] pt-10 lg:pt-16">
                <h2>Contacto con ventas</h2>
                <h2>Contacto con soporte</h2>
            </div>

            <section className="px-[5%] xl:px-[8%] pt-10 lg:pt-16">
                    <div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-5"
                    >
                        <div className="flex flex-col gap-3 items-left justify-center">
                            <h2 className="font-Poppins_Regular font-semibold text-[#3E2F4D] text-3xl sm:text-4xl lg:text-[44px] !leading-tight !tracking-tight">
                                {landingHelp.title}
                            </h2>
                            <div className="flex flex-col w-full font-Poppins_Regular text-base 2xl:text-lg text-[#5C4774]">
                                {landingHelp.description}
                            </div>
                            <div className="w-full flex">
                                <a href="/contacto">
                                    <div className="bg-[#7B5E9A] text-base 2xl:text-lg px-4 py-3 my-auto rounded-md">
                                        <p className="leading-none text-white">{landingHelp.subtitle}</p>
                                    </div>
                                </a>
                            </div>

                            <div className="flex flex-col w-full max-w-3xl gap-5">
                                {   
                                    <div className="mt-6">
                                        
                                        {/* Pestaña 1 */}
                                        <div className={`bg-white rounded-xl text-[#3E2F4D] shadow-md transition-all duration-300 ${
                                            openedId !== sectionone.id ? 'opacity-90 hover:opacity-100' : ''
                                            }`}>
                                            <h1
                                                className={`flex justify-between font-Poppins_Regular font-semibold px-6 py-4 bg-[#F5F2F9] cursor-pointer text-base 2xl:text-xl ${
                                                openedId === sectionone.id ? 'border-l-2 border-[#4B246D]' : 'border-l-2 border-slate-400'
                                                }`}
                                                onClick={() => toggleAccordion(sectionone.id)}
                                            >
                                                <span>{sectionone.title}</span>
                                                <i className={`mdi ${openedId === sectionone.id ? 'mdi-arrow-up' : 'mdi-arrow-down'}`}></i>
                                            </h1>
                                            <div
                                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                                                openedId === sectionone.id ? 'border-l-2 border-[#4B246D] max-h-[500px] opacity-100 py-3' : 'border-l-2 border-slate-400 max-h-0 opacity-0 py-0'
                                                }`}
                                            >
                                                <p className='font-Poppins_Regular text-base 2xl:text-lg text-[#4B246D]'>
                                                    {sectionone.description}
                                                </p>
                                                <div className="flex">
                                                    <a href={sectionone.link}  className='flex flex-row gap-2 mt-3 font-semibold font-Poppins_Regular text-base 2xl:text-lg text-[#4B246D]'>
                                                        {sectionone.subtitle} <ArrowIcon />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                
                                        {/* Pestaña 2 */}
                                        <div className={`bg-white rounded-xl text-[#3E2F4D] shadow-md transition-all duration-300 ${
                                            openedId !== sectiontwo.id ? 'opacity-90 hover:opacity-100' : ''
                                            }`}>
                                            <h1
                                                className={`flex justify-between font-Poppins_Regular font-semibold px-6 py-4 bg-[#F5F2F9] cursor-pointer text-base 2xl:text-xl ${
                                                openedId === sectiontwo.id ? 'border-l-2 border-[#4B246D]' : 'border-l-2 border-slate-400'
                                                }`}
                                                onClick={() => toggleAccordion(sectiontwo.id)}
                                            >
                                                <span>{sectiontwo.title}</span>
                                                <i className={`mdi ${openedId === sectiontwo.id ? 'mdi-arrow-up' : 'mdi-arrow-down'}`}></i>
                                            </h1>
                                            <div
                                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                                                openedId === sectiontwo.id ? 'max-h-[500px] opacity-100 py-3 border-l-2 border-[#4B246D]' : 'border-l-2 border-slate-400 max-h-0 opacity-0 py-0'
                                                }`}
                                            >
                                                <p className='font-Poppins_Regular text-base 2xl:text-lg text-[#4B246D]'>
                                                {sectiontwo.description}
                                                </p>
                                            </div>
                                        </div>
                                  </div>
                                }
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 items-center justify-start">
                            <div className="flex flex-col">
                                <img
                                className="object-cover w-full h-full rounded-lg overflow-hidden max-w-md mx-auto"
                                src={`/api/landing_home/media/${landingHelp.image}`}
                                onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                                />
                            </div>
                        </div>
                    </div>
            </section>

            {/* {sedes && sedes.length > 0 ? (
                <motion.div
                    className="min-h-screen bg-white font-sans"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
                        
                        <motion.div
                            className="flex flex-col md:flex-row md:gap-16"
                            variants={containerVariants}
                        >
                          
                            {landingHero && (
                                <motion.div
                                    className="md:w-1/2 mb-8 md:mb-0"
                                    variants={itemVariants}
                                >
                                    <motion.h1
                                        className="text-[40px] mt-3 lg:mt-0 leading-[42px] lg:text-6xl font-semibold mb-2"
                                        variants={slideUp}
                                    >
                                        <TextWithHighlight
                                            text={landingHero.title}
                                        />
                                    </motion.h1>

                                    <motion.p
                                        className="mb-6 text-lg"
                                        variants={fadeIn}
                                    >
                                        {landingHero.description}
                                    </motion.p>

                                    <motion.div
                                        className="space-y-6 lg:pt-16"
                                        variants={containerVariants}
                                    >
                                        {todosHorariosIguales && (
                                            <motion.div variants={itemVariants}>
                                                <h2 className="text-xl font-semibold mb-2">
                                                    Horario de Atención
                                                </h2>
                                                {sedes[0].business_hours.map(
                                                    (horario, index) => (
                                                        <p key={index}>
                                                            {horario}
                                                        </p>
                                                    )
                                                )}
                                            </motion.div>
                                        )}

                                        {sedes.map((sede) => (
                                            <motion.div
                                                key={sede.id}
                                                variants={itemVariants}
                                                whileHover={{ scale: 1.01 }}
                                            >
                                                <h2 className="text-xl font-semibold mb-2">
                                                    <TextWithHighlight
                                                        text={sede.title}
                                                    />
                                                </h2>
                                                {sede.ubications.map(
                                                    (ubication, index) => (
                                                        <p key={index}>
                                                            {ubication}
                                                        </p>
                                                    )
                                                )}
                                                <p className="flex gap-2">
                                                    {t(
                                                        "public.form.phone",
                                                        "Teléfono"
                                                    )}
                                                    :
                                                    {sede.phones.map(
                                                        (phone, index) => (
                                                            <p key={index}>
                                                                {phone}
                                                            </p>
                                                        )
                                                    )}
                                                </p>
                                                {sede.emails.map(
                                                    (email, index) => (
                                                        <p key={index}>
                                                            {email}
                                                        </p>
                                                    )
                                                )}

                                                {!todosHorariosIguales && (
                                                    <div className="mt-2">
                                                        <h3 className="font-semibold">
                                                            Horario:
                                                        </h3>
                                                        {sede.business_hours.map(
                                                            (
                                                                business_hour,
                                                                i
                                                            ) => (
                                                                <p key={i}>
                                                                    {
                                                                        business_hour
                                                                    }
                                                                </p>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            )}

                         
                            {landingForm && (
                                <motion.div
                                    className="md:w-1/2"
                                    variants={itemVariants}
                                >
                                    <motion.div
                                        className="bg-gray-50 p-6 rounded-3xl"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <motion.h2
                                            className="text-3xl font-semibold mb-6"
                                            variants={slideUp}
                                        >
                                            <TextWithHighlight
                                                text={landingForm.title}
                                            />
                                        </motion.h2>
                                        <ContactForm />
                                    </motion.div>

                                   
                                    <motion.div
                                        className="mt-8 flex gap-4 items-center md:hidden p-8"
                                        variants={itemVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        variants={buttonHover}
                                    >
                                        <div className="bg-green-500 text-white p-2 rounded-full mr-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                ¿Tienes dudas sobre como
                                                agendar? Haz clic aquí y chatea
                                                con nosotros por WhatsApp
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}

                        </motion.div>
                    </div>
                </motion.div>

            ) : (
                <MaintenancePage />
            )} */}

            <Footer />
        </div>
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
