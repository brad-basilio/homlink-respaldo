import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";

import Tippy from "@tippyjs/react";
import HtmlContent from "../../Utils/HtmlContent";
import GeneralRest from "../../actions/GeneralRest";
import { Send, X } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import Swal from "sweetalert2";
import SubscriptionsRest from "../../Actions/SubscriptionsRest";
import Global from "../../Utils/Global";

ReactModal.setAppElement("#app");

const Footer = ({ terms, footerLinks = [] }) => {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = (index) => setModalOpen(index);
    const closeModal = () => setModalOpen(false);
    const generalRest = new GeneralRest();

    // Configurar notificaciones para GeneralRest (principalmente para consistencia)
    // Las consultas GET normalmente solo muestran errores, no éxitos
    generalRest.enableNotifications = false;
    const links = {};
    /* footerLinks.forEach((fl) => {
        links[fl.correlative] = fl.description;
    });*/
    const [socials, setSocials] = useState([]);
    const [generals, setGenerals] = useState([]);
    const [apps, setApps] = useState([]);

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const data = await generalRest.getSocials();
                setSocials(data);
            } catch (error) {
                console.error("Error fetching socials:", error);
            }
        };

        const fetchGenerals = async () => {
            try {
                const data = await generalRest.getGenerals();
                setGenerals(data);
            } catch (error) {
                console.error("Error fetching generals:", error);
            }
        };

        const fetchApps = async () => {
            try {
                const data = await generalRest.getApps();
                setApps(data);
            } catch (error) {
                console.error("Error fetching apps:", error);
            }
        };

        fetchSocials();
        fetchGenerals();
        fetchApps();
    }, []); // Asegúrate de que este array de dependencias está vacío si solo se ejecuta una vez

    // Redes sociales
    const Facebook = socials.find(
        (social) => social.description === "Facebook"
    );
    const Twitter = socials.find((social) => social.description === "Twitter");
    const Instagram = socials.find(
        (social) => social.description === "Instagram"
    );
    const Youtube = socials.find((social) => social.description === "YouTube");
    const Tiktok = socials.find((social) => social.description === "TikTok");
    const Whatsapp = socials.find((social) => social.description === "WhatsApp");
    const LinkedIn = socials.find((social) => social.description === "LinkedIn");

    // Datos de contacto desde generals
    const getGeneralValue = (correlative) => {
        const item = generals.find(g => g.correlative === correlative);
        return item?.description || '';
    };

    const phoneContact = getGeneralValue('phone_contact');
    const emailContact = getGeneralValue('email_contact');
    const address = getGeneralValue('address');
    const openingHours = getGeneralValue('opening_hours');
    const supportPhone = getGeneralValue('support_phone');
    const whatsappPhone = getGeneralValue('whatsapp_phone');
    const supportEmail = getGeneralValue('support_email');
    const companyName = getGeneralValue('company_name') || 'Tu Cambio S.A.C.';
    const companyRuc = getGeneralValue('company_ruc') || '20603864957';
    const copyrightText = getGeneralValue('copyright') || `Cambia FX © 2019 - Marca registrada de ${companyName} - RUC: ${companyRuc}`;

    const [aboutuses, setAboutuses] = useState(null); // o useState({});

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

    const aboutusData = aboutuses?.aboutus || [];
    const generalsData = aboutuses?.generals || [];
    const sedesData = aboutuses?.sedes || [];

    const policyItems = {
        privacy_policy: t("public.footer.privacity", "Políticas de privacidad"),
        terms_conditions: t("public.form.terms", "Términos y condiciones"),
        // 'delivery_policy': 'Políticas de envío',
        exchange_policy: t("public.footer.change", "Políticas de cambio"),
    };

    const cleanText = (text) => {
        if (text === null || text === undefined) return "";

        // Convertir a string y eliminar varios patrones de asteriscos
        return String(text)
            .replace(/\*\*(.*?)\*\*/g, "$1") // **texto**
            .replace(/\*(.*?)\*/g, "$1") // *texto*
            .replace(/[*]+/g, ""); // Cualquier asterisco suelto
    };
    const subscriptionsRest = new SubscriptionsRest();

    // Deshabilitar notificaciones automáticas para usar SweetAlert personalizado
    // Esto permite mostrar mensajes más amigables y consistentes con el diseño
    subscriptionsRest.enableNotifications = false;

    const emailRef = useRef();
    const emailRefMobile = useRef(); // Referencia separada para mobile
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [saving, setSaving] = useState(false);

    // Función para limpiar el formulario de suscripción
    const clearEmailForm = () => {
        // Limpiar ambos inputs
        if (emailRef.current) {
            emailRef.current.value = "";
            // Pequeña animación de limpieza
            emailRef.current.style.transform = 'scale(0.98)';
            setTimeout(() => {
                if (emailRef.current) {
                    emailRef.current.style.transform = 'scale(1)';
                }
            }, 100);
        }
        if (emailRefMobile.current) {
            emailRefMobile.current.value = "";
            // Pequeña animación de limpieza
            emailRefMobile.current.style.transform = 'scale(0.98)';
            setTimeout(() => {
                if (emailRefMobile.current) {
                    emailRefMobile.current.style.transform = 'scale(1)';
                }
            }, 100);
        }
        // También resetear el checkbox
        const checkbox = document.getElementById('terms-checkbox');
        if (checkbox) {
            checkbox.checked = false;
        }
        // Resetear el estado
        setTermsAccepted(false);
    };

    const onEmailSubmit = async (e) => {
        e.preventDefault();
        if (saving) return; // Prevenir múltiples envíos

        // Validar que se hayan aceptado los términos
        if (!termsAccepted) {
            Swal.fire({
                title: "Términos requeridos",
                text: "Debes aceptar la Política de Privacidad y los Términos y Condiciones para suscribirte.",
                icon: "warning",
                confirmButtonText: "Entendido",
                confirmButtonColor: "#f59e0b"
            });
            return;
        }

        // Obtener el email del input correspondiente (desktop o mobile)
        const emailValue = emailRef.current?.value || emailRefMobile.current?.value;

        if (!emailValue || !emailValue.trim()) {
            Swal.fire({
                title: "Email requerido",
                text: "Por favor, ingresa tu email para suscribirte.",
                icon: "warning",
                confirmButtonText: "Entendido",
                confirmButtonColor: "#f59e0b"
            });
            return;
        }

        setSaving(true);

        const request = {
            email: emailValue.trim(),
            status: 1,
        };

        try {
            const result = await subscriptionsRest.save(request);
            setSaving(false);

            if (!result) {
                // Mostrar error personalizado
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al procesar tu suscripción. Por favor, inténtalo de nuevo.",
                    icon: "error",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "#d33"
                });
                return;
            }

            // Mostrar éxito personalizado
            Swal.fire({
                title: "¡Éxito!",
                text: `Te has suscrito correctamente al blog de ${Global.APP_NAME}.`,
                icon: "success",
                confirmButtonText: "Ok",
                confirmButtonColor: "#10b981",
                timer: 4000,
                timerProgressBar: true
            });

            // Limpiar el campo del email y resetear términos
            clearEmailForm();

        } catch (error) {
            setSaving(false);
            console.error("Error al suscribirse:", error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al procesar tu suscripción. Por favor, inténtalo de nuevo.",
                icon: "error",
                confirmButtonText: "Entendido",
                confirmButtonColor: "#d33"
            });
        }
    };


    return (
        <>
            <footer className="bg-accent text-white font-title">

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full px-[5%] py-8 lg:py-16">
                    {/* Columna 1 - Logo, App Badges y Suscripción */}
                    <div className="w-full lg:w-4/12 flex flex-col gap-6">
                        <a href="/">
                            <img
                                className="h-12 lg:h-14"
                                src="/assets/img/logo-white.png"
                                alt="HomLink Logo"
                            />
                        </a>

                    </div>

                    {/* Columna 2 - Horario de Atención */}
                    <div className="w-full lg:w-4/12 flex flex-col lg:flex-row lg:flex-wrap lg:justify-end gap-6 lg:gap-0">
                        <div className="w-full lg:w-6/12 flex flex-col gap-2 text-sm pb-4 lg:pb-8">
                            <h3 className="text-lg lg:text-xl font-medium mb-2 lg:mb-4">
                                Menu
                            </h3>

                            <nav className="flex flex-col gap-2">
                                {[
                                    "/catalogo",
                                    "/nosotros",
                                    "/contacto",
                                    "/blog",
                                ].map((path) => {
                                    const text = {
                                        "/catalogo": t("public.header.catalogo", "Catálogo"),
                                        "/nosotros": t(
                                            "public.header.nosotros",
                                            "Nosotros"
                                        ), "/contacto": t(
                                            "public.header.contact",
                                            "Contacto"
                                        ),

                                        "/blog": t(
                                            "public.header.options",
                                            "Blog"
                                        ),


                                    }[path];

                                    return (
                                        <a
                                            key={path}
                                            href={path}
                                            onClick={(e) => {
                                                if (path.startsWith('#')) {
                                                    e.preventDefault();
                                                    toggleMegaMenu(path);
                                                    handleLinkClick(path);
                                                } else {
                                                    // Para URLs normales, navega directamente
                                                    handleLinkClick(path);
                                                    window.location.href = path;
                                                }
                                            }}
                                            className="text-white hover:text-secondary transition-colors text-sm"
                                        >
                                            {text}
                                        </a>
                                    );
                                })}
                            </nav>

                        </div>

                        {/* Columna 3 - Legal */}
                        <div className="w-full lg:w-5/12 flex flex-col gap-2 text-sm">
                            <h3 className="text-lg lg:text-xl font-medium mb-2 lg:mb-4">
                                Legal
                            </h3>
                            <a onClick={() => openModal(0)} className="cursor-pointer hover:text-secondary transition-colors">Política de Privacidad</a>
                            <a onClick={() => openModal(1)} className="cursor-pointer hover:text-secondary transition-colors">Términos y Condiciones</a>
                            <a href="/libro-de-reclamaciones" className="cursor-pointer hover:text-secondary transition-colors">Libro de Reclamaciones</a>


                        </div>


                    </div>
                    <div className="w-full lg:w-4/12 flex flex-col gap-6">


                        <motion.div
                            className="mt-4 max-w-full lg:max-w-md"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <motion.h3
                                className="text-lg lg:text-xl font-medium mb-2"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                Suscríbete
                            </motion.h3>

                            <motion.p
                                className="text-sm lg:text-base text-neutral mb-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                Recibe actualizaciones, tips de finanzas y cupones de mejor tipo de cambio.
                            </motion.p>

                            <motion.form
                                onSubmit={onEmailSubmit}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                {/* Versión Desktop - Original */}
                                <motion.div
                                    className="hidden overflow-hidden lg:flex items-center bg-white rounded-full p-1"
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
                                    }}
                                    whileFocus={{
                                        scale: 1.02,
                                        boxShadow: "0 0 0 3px rgba(187, 255, 82, 0.3)"
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <motion.input
                                        ref={emailRef}
                                        disabled={saving}
                                        type="email"
                                        name="email"
                                        placeholder="Correo"
                                        className="flex-grow px-4 py-2 placeholder:text-neutral-light bg-transparent text-neutral-dark focus:outline-none"
                                        whileFocus={{
                                            scale: 1.01,
                                            transition: { duration: 0.2 }
                                        }}
                                    />
                                    <motion.button
                                        type="submit"
                                        disabled={saving || !termsAccepted}
                                        className={`font-bold text-sm px-3  py-3 rounded-full transition-colors ${!termsAccepted
                                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                            : 'bg-primary text-neutral-light hover:bg-secondary'
                                            }`}
                                        whileHover={termsAccepted ? {
                                            scale: 1.05,
                                            backgroundColor: "#ff3d2a"
                                        } : {}}
                                        whileTap={termsAccepted ? { scale: 0.95 } : {}}
                                        animate={saving ? {
                                            scale: [1, 1.05, 1],
                                            transition: {
                                                duration: 0.5,
                                                repeat: Infinity
                                            }
                                        } : {}}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {saving ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-neutral-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>

                                            </div>
                                        ) : (
                                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0498047 14.9492L5.0498 7.94922L0.0498047 0.949219H2.4998L7.4998 7.94922L2.4998 14.9492H0.0498047ZM5.9998 14.9492L10.9998 7.94922L5.9998 0.949219H8.44981L13.4498 7.94922L8.44981 14.9492H5.9998Z" fill="white" />
                                            </svg>
                                        )
                                        }
                                    </motion.button>
                                </motion.div>

                                {/* Versión Mobile - Separada */}
                                <div className="block lg:hidden space-y-3">
                                    <motion.input
                                        ref={emailRefMobile}
                                        disabled={saving}
                                        type="email"
                                        name="email-mobile"
                                        placeholder="Correo electrónico"
                                        className="w-full px-4 py-3 placeholder:text-neutral-light bg-white text-neutral-dark focus:outline-none rounded-full border-2 border-transparent focus:border-secondary transition-colors"
                                        whileFocus={{
                                            scale: 1.02,
                                            transition: { duration: 0.2 }
                                        }}
                                        whileHover={{
                                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                                        }}
                                    />

                                    <motion.button
                                        type="submit"
                                        disabled={saving || !termsAccepted}
                                        className={`w-full font-bold text-sm px-6 py-3 rounded-full transition-all duration-300 ${!termsAccepted
                                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                            : 'bg-secondary text-neutral-dark hover:bg-accent hover:text-white shadow-lg hover:shadow-xl'
                                            }`}
                                        whileHover={termsAccepted ? {
                                            scale: 1.02,
                                            y: -2
                                        } : {}}
                                        whileTap={termsAccepted ? { scale: 0.98 } : {}}
                                        animate={saving ? {
                                            scale: [1, 1.02, 1],
                                            transition: {
                                                duration: 0.8,
                                                repeat: Infinity
                                            }
                                        } : {}}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {saving ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <svg className="animate-spin h-4 w-4 text-neutral-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Enviando</span>
                                            </div>
                                        ) : 'SUSCRIBIRME'}
                                    </motion.button>
                                </div>
                            </motion.form>

                            <motion.div
                                className="flex items-center mt-4 space-x-3"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.9 }}
                            >
                                {/* Checkbox customizado */}
                                <motion.div
                                    className="relative flex-shrink-0"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <input
                                        type="checkbox"
                                        id="terms-checkbox"
                                        name="terms-accepted"
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        className="sr-only"
                                    />
                                    <motion.div
                                        className={`w-5 h-5 rounded-md border-2 cursor-pointer transition-all duration-300 ${termsAccepted
                                            ? 'bg-secondary border-secondary shadow-lg shadow-secondary/25'
                                            : 'bg-white border-neutral-light hover:border-secondary hover:shadow-sm'
                                            }`}
                                        onClick={() => setTermsAccepted(!termsAccepted)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        animate={{
                                            backgroundColor: termsAccepted ? '#BBFF52' : '#ffffff',
                                            borderColor: termsAccepted ? '#BBFF52' : '#9CA3AF'
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <AnimatePresence>
                                            {termsAccepted && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.3 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.3 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute inset-0 flex items-center justify-center"
                                                >
                                                    <svg
                                                        className="w-3 h-3 text-neutral-dark"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={3}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </motion.div>

                                <motion.label
                                    htmlFor="terms-checkbox"
                                    className="text-xs text-neutral cursor-pointer leading-tight"
                                    whileHover={{
                                        color: "#BBFF52",
                                        x: 2
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    He leído y acepto la Política de Privacidad y los Términos y Condiciones
                                </motion.label>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <div className="bg-primary">

                    <div className="flex flex-col lg:flex-row justify-between items-center w-full px-[5%] py-4 text-center lg:text-left gap-4 lg:gap-0">

                        <div className="flex items-center gap-2 lg:gap-3 flex-wrap justify-center">
                            {(phoneContact || supportPhone) && (
                                <a
                                    href={`tel:${phoneContact || supportPhone}`}
                                    className="bg-white text-primary w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors text-sm"
                                    title="Llamar"
                                >
                                    <i className="fa-solid fa-phone"></i>
                                </a>
                            )}
                            {Facebook?.link && (
                                <a
                                    href={Facebook.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-primary w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors text-sm"
                                    title="Facebook"
                                >
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                            )}
                            {Instagram?.link && (
                                <a
                                    href={Instagram.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-primary w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors text-sm"
                                    title="Instagram"
                                >
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                            )}
                            {Twitter?.link && (
                                <a
                                    href={Twitter.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-primary w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors text-sm"
                                    title="Twitter"
                                >
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                            )}
                            {LinkedIn?.link && (
                                <a
                                    href={LinkedIn.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-primary w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors text-sm"
                                    title="LinkedIn"
                                >
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </a>
                            )}
                            {Youtube?.link && (
                                <a
                                    href={Youtube.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-primary w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors text-sm"
                                    title="YouTube"
                                >
                                    <i className="fa-brands fa-youtube"></i>
                                </a>
                            )}
                            {Tiktok?.link && (
                                <a
                                    href={Tiktok.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-primary w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors text-sm"
                                    title="TikTok"
                                >
                                    <i className="fa-brands fa-tiktok"></i>
                                </a>
                            )}
                            {(Whatsapp?.link || whatsappPhone) && (
                                <a
                                    href={Whatsapp?.link || `https://wa.me/${whatsappPhone?.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-primary w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors text-sm"
                                    title="WhatsApp"
                                >
                                    <i className="fa-brands fa-whatsapp"></i>
                                </a>
                            )}
                        </div>
                        <p className="text-sm lg:text-base text-neutral mb-0">
                            {copyrightText}
                        </p>
                    </div>
                </div>

                {/* Modal para Términos y Condiciones */}
                {Object.keys(policyItems).map((key, index) => {
                    const title = policyItems[key];
                    const content =
                        generals.find((x) => x.correlative == key)?.description ??
                        generalsData.find((x) => x.correlative == key)?.description ?? "";
                    return (
                        <ReactModal
                            key={index}
                            isOpen={modalOpen === index}
                            onRequestClose={closeModal}
                            contentLabel={title}
                            className="fixed top-[5%] left-1/2 -translate-x-1/2 bg-white p-4 lg:p-6 rounded-2xl lg:rounded-3xl shadow-lg w-[95%] max-w-4xl max-h-[90vh] mb-10 overflow-y-auto scrollbar-hide"
                            overlayClassName="fixed inset-0 bg-neutral-dark bg-opacity-50 z-50 overflow-auto scrollbar-hide"
                        >
                            <button
                                onClick={closeModal}
                                className="float-right text-red-500 hover:text-red-700 transition-all duration-300"
                            >
                                <X className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth="3px" />
                            </button>
                            <h2 className="text-xl lg:text-2xl font-bold mb-4 pr-8">{title}</h2>
                            <HtmlContent className="prose prose-sm lg:prose" html={content} />
                        </ReactModal>
                    );
                })}
            </footer>
        </>
    );
};

export default Footer;
