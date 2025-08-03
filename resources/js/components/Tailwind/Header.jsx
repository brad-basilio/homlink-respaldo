import { motion, AnimatePresence } from "framer-motion";
import Tippy from "@tippyjs/react";
import React, { useState, useEffect, useRef, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import GeneralRest from "../../actions/GeneralRest";
import { TbBrush } from "react-icons/tb";
import { ArrowRight, Trash2 } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { LanguageContext } from "../../context/LanguageContext";
import LanguageDropdown from "./Header/LanguageDropdown";
import MegaMenuPopup from "./Header/MegaMenuPopup";
import WhatsAppButton, { WhatsAppButtonWithArrow } from "../Shared/WhatsAppButton";
import Global from "../../Utils/Global";

const generalRest = new GeneralRest();

// Variantes de animación
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: -20, opacity: 100 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};

const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.2,
        },
    },
};

const cartItemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
    exit: {
        x: -50,
        opacity: 0,
        transition: {
            duration: 0.2,
        },
    },
};

const Header = ({
    showSlogan = true,
    gradientStart,
    menuGradientEnd,
    backgroundType = "none",
    backgroundSrc = "",
    backgroundHeight = "h-full",
    backgroundPosition = "object-top",
    children,
}) => {
    // Estado para la autenticación
    const [auth, setAuth] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const userDropdownRef = useRef(null);

    // Función para verificar autenticación
    const checkAuth = async () => {
        try {
            const response = await fetch('/api/user-check', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'same-origin'
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Auth response:', data); // Para debug
                setAuth(data.auth || null);
            } else {
                console.log('Auth failed with status:', response.status);
                setAuth(null);
            }
        } catch (error) {
            console.log('Auth check failed:', error);
            setAuth(null);
        } finally {
            setAuthLoading(false);
        }
    };

    // Verificar autenticación al montar el componente
    useEffect(() => {
        checkAuth();
    }, []);
    const { t, loading, error } = useTranslation();
    /*  if (loading) {
        return <div className="text-center py-4">Cargando menú...</div>;
    }

    if (error) {
        return (
            <div className="alert alert-danger m-3">
                Error cargando traducciones: {error}
            </div>
        );
    }*/
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const btnToggleRef = useRef(null);
    const { incrementarCantidad, decrementarCantidad } =
        useContext(CarritoContext);

    const toggleMenu = (event) => {
        if (event.target.closest(".menu-toggle")) {
            setIsOpen(!isOpen);
        } else {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                btnToggleRef.current == event.target ||
                btnToggleRef.current.contains(event.target)
            )
                return;
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    // useEffect para manejar clics fuera del dropdown de usuario
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { carrito, eliminarProducto } = useContext(CarritoContext);
    const [animar, setAnimar] = useState(false);
    const totalProductos = carrito.reduce((acc, item) => {
        if (item.variations && item.variations.length > 0) {
            return (
                acc + item.variations.reduce((sum, v) => sum + v.quantity, 0)
            );
        }
        return acc + item.quantity;
    }, 0);

    useEffect(() => {
        if (totalProductos > 0) {
            setAnimar(true);
            setTimeout(() => setAnimar(false), 500);
        }
    }, [totalProductos]);

    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const totalPrecio = carrito.reduce((acc, item) => {
        if (item.variations && item.variations.length > 0) {
            return (
                acc +
                item.variations.reduce(
                    (sum, v) => sum + item.final_price * v.quantity,
                    0
                )
            );
        }
        return acc + item.final_price * item.quantity;
    }, 0);

    const [socials, setSocials] = useState([]);
    const [languagesSystem, setLanguagesSystem] = useState([]);
    const [generals, setGenerals] = useState([]);
    const [servicesData, setServicesData] = useState([]);
    const [modalData, setModalData] = useState([]);

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const data = await generalRest.getSocials();
                const dataGenerals = await generalRest.getGenerals();
                const dataServices = await generalRest.getServices();
                const dataModal = await generalRest.getModal();

                //const languages = await generalRest.getLanguages();
                setSocials(data);
                setGenerals(dataGenerals);

                setServicesData(dataServices);
                setModalData(dataModal);
                //  setLanguagesSystem(languages);
            } catch (error) {
                console.error("Error fetching socials:", error);
            }
        };

        fetchSocials();
    }, []);

    const TikTok = socials.find((social) => social.description === "TikTok");
    const WhatsApp = socials.find(
        (social) => social.description === "WhatsApp"
    );
    const Instagram = socials.find(
        (social) => social.description === "Instagram"
    );
    const Facebook = socials.find(
        (social) => social.description === "Facebook"
    );
    const LinkedIn = socials.find(
        (social) => social.description === "LinkedIn"
    );
    const YouTube = socials.find((social) => social.description === "YouTube");

    const [activeLink, setActiveLink] = useState("/");

    const ContactNumber = generals.find((general) => general.correlative === "phone_contact");
    const ContactEmail = generals.find((general) => general.correlative === "email_contact");

    const Cintillo = generals.find((general) => general.correlative === "address");

    useEffect(() => {
        const currentPath = window.location.pathname;
        setActiveLink(currentPath);
    }, []);

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };

    const isActive = (path) => {
        return activeLink === path;
    };

    const { currentLanguage, changeLanguage } = useContext(LanguageContext);
    const [selectLanguage, setSelectLanguage] = useState(
        currentLanguage || languagesSystem[0]
    );

    useEffect(() => {
        if (currentLanguage) {
            setSelectLanguage(currentLanguage);
        } else if (languagesSystem.length > 0) {
            setSelectLanguage(languagesSystem[0]);
        }
    }, [currentLanguage, languagesSystem]);
    const onUseLanguage = async (langData) => {
        try {
            // Obtén el token CSRF de las cookies automáticamente
            const response = await fetch("/set-current-lang", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": getCsrfTokenFromCookie(), // Función para obtenerlo
                },
                body: JSON.stringify({ lang_id: langData.id }),
                credentials: "include", // Permite enviar cookies
            });

            if (response.ok) {
                await changeLanguage(langData); // ✅ Agrega await aquí
                setSelectLanguage(langData);
                window.location.reload(); // ⚠️ Opcional temporal para forzar actualización
            } else {
                //
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    // Función para extraer el token de la cookie
    const getCsrfTokenFromCookie = () => {
        const cookie = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
        return cookie ? decodeURIComponent(cookie[1]) : null;
    };


    const [activeMegaMenu, setActiveMegaMenu] = useState(null);

    useEffect(() => {
        if (activeMegaMenu) {
            document.body.style.overflow = 'hidden';
            // Opcional: también podrías querer prevenir el scroll del touch en móviles
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }
    }, [activeMegaMenu]);

    const toggleMegaMenu = (path) => {
        // Si ya está abierto, ciérralo
        if (activeMegaMenu === path) {
            setActiveMegaMenu(null);
        } else if (["#services"].includes(path)) {
            setActiveMegaMenu(path);
        } else {
            setActiveMegaMenu(null); // Cierra si es otra ruta
        }
    };

    const closeMegaMenu = () => setActiveMegaMenu(null);
    const renderHighlightedText = (textToRender) => {
        if (!textToRender) return null;
        const parts = textToRender.split(/(\*[^*]+\*)/g); // separa todo lo entre *...*
        return parts.map((part, index) =>
            part.startsWith("*") && part.endsWith("*") ? (
                <span key={index} className={`text-secondary`}>
                    {part.slice(1, -1)}
                </span>
            ) : (
                <span key={index}>{part}</span>
            )
        );
    };
    return (
        <>
            <div className={`w-full max-w-full relative font-paragraph ${backgroundHeight} z-[9999]`}>
                {/* CINTILLO INICIO */}
                <div className="bg-primary relative overflow-hidden text-white text-xs md:text-sm py-2 md:py-3">
                    <div className="px-[5%] mx-auto flex flex-row items-center justify-between">
                        {/* Título del cintillo - lado izquierdo */}
                        <div className="hidden items-center gap-2 relative lg:flex">
                            <p className="font-bold text-sm whitespace-nowrap flex gap-2">
                                <span className="inline-flex">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3481 17.8071C10.9867 18.1455 10.5037 18.3346 10.0009 18.3346C9.49817 18.3346 9.01517 18.1455 8.65375 17.8071C5.34418 14.6896 0.908967 11.2071 3.07189 6.15102C4.24136 3.41727 7.04862 1.66797 10.0009 1.66797C12.9532 1.66797 15.7605 3.41727 16.93 6.15102C19.0902 11.2007 14.6658 14.7004 11.3481 17.8071Z" stroke="white" strokeWidth="1.25" />
                                        <path d="M12.9163 9.16667C12.9163 10.7775 11.6105 12.0833 9.99967 12.0833C8.38884 12.0833 7.08301 10.7775 7.08301 9.16667C7.08301 7.55583 8.38884 6.25 9.99967 6.25C11.6105 6.25 12.9163 7.55583 12.9163 9.16667Z" stroke="white" strokeWidth="1.25" />
                                    </svg>

                                </span>
                                {renderHighlightedText(Cintillo?.description)}
                            </p>
                        </div>

                        {/* Información de contacto - lado derecho */}
                        <div className="flex items-center gap-4 text-xs md:text-sm">
                            {/* Teléfonos de contacto */}
                            {ContactNumber?.description && (
                                <div className="flex items-center gap-1">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.14932 9.9533C2.3593 8.57572 1.97784 7.45087 1.74783 6.31065C1.40765 4.62429 2.18614 2.97698 3.47578 1.92586C4.02084 1.48162 4.64566 1.6334 4.96797 2.21164L5.69562 3.51706C6.27238 4.55178 6.56075 5.06913 6.50355 5.61763C6.44636 6.16613 6.05744 6.61285 5.27961 7.50631L3.14932 9.9533ZM3.14932 9.9533C4.74839 12.7416 7.25783 15.2524 10.0493 16.8533M10.0493 16.8533C11.4269 17.6433 12.5517 18.0248 13.692 18.2548C15.3783 18.595 17.0256 17.8165 18.0767 16.5268C18.521 15.9818 18.3692 15.357 17.791 15.0346L16.4855 14.307C15.4508 13.7302 14.9335 13.4419 14.385 13.4991C13.8365 13.5562 13.3897 13.9451 12.4963 14.723L10.0493 16.8533Z" stroke="white" strokeWidth="1.25" strokeLinejoin="round" />
                                    </svg>

                                    <div className="flex flex-wrap gap-1">
                                        {ContactNumber.description.split(',').map((phone, index) => (
                                            <a
                                                key={index}
                                                href={`tel:${phone.trim()}`}
                                                className="hover:text-secondary transition-colors duration-200 whitespace-nowrap"
                                            >
                                                {phone.trim()}
                                                {index < ContactNumber.description.split(',').length - 1 && <span className="ml-1">|</span>}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Emails de contacto */}
                            {ContactEmail?.description && (
                                <div className="flex items-center gap-1">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.66797 5L7.42882 8.26414C9.55264 9.4675 10.45 9.4675 12.5738 8.26414L18.3346 5" stroke="white" strokeWidth="1.25" strokeLinejoin="round" />
                                        <path d="M1.68111 11.231C1.73559 13.7856 1.76283 15.0629 2.70544 16.0091C3.64804 16.9553 4.95991 16.9882 7.58366 17.0541C9.20072 17.0948 10.8019 17.0948 12.419 17.0541C15.0427 16.9882 16.3546 16.9553 17.2972 16.0091C18.2398 15.0629 18.2671 13.7856 18.3215 11.231C18.3391 10.4096 18.3391 9.59305 18.3215 8.77164C18.2671 6.21702 18.2398 4.93971 17.2972 3.99352C16.3546 3.04733 15.0427 3.01437 12.419 2.94844C10.8019 2.90781 9.20072 2.90781 7.58365 2.94844C4.95991 3.01435 3.64804 3.04731 2.70543 3.99351C1.76282 4.9397 1.73559 6.21701 1.6811 8.77164C1.66359 9.59305 1.66359 10.4096 1.68111 11.231Z" stroke="white" strokeWidth="1.25" strokeLinejoin="round" />
                                    </svg>

                                    <div className="flex flex-wrap gap-1">
                                        {ContactEmail.description.split(',').map((email, index) => (
                                            <a
                                                key={index}
                                                href={`mailto:${email.trim()}`}
                                                className="hover:text-secondary transition-colors duration-200 whitespace-nowrap"
                                            >
                                                {email.trim()}
                                                {index < ContactEmail.description.split(',').length - 1 && <span className="ml-1">|</span>}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* CINTILLO FIN */}
                <motion.header
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className={` static lg:w-full top-0 z-[9998] transition-colors duration-300 py-1 ${backgroundType === "none"
                        ? "bg-white mt-0"
                        : isScrolled
                            ? "bg-white pt-0 !mt-0"
                            : "bg-white top-4 pt-8 md:pt-14 lg:pt-10"
                        } ${isScrolled &&
                        "bg-white pt-0 !mt-0 transition-all duration-150"
                        }`}
                >
                    <div
                        className={`px-[5%] w-full py-4 lg:py-0 flex justify-between items-center text-[#3E2F4D] shadow-lg lg:shadow-none`}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center"
                        >
                            <a href="/">
                                <motion.img
                                    whileHover={{
                                        scale: 1.08,
                                        y: -2,
                                        filter: "drop-shadow(0 0 10px rgba(187, 255, 82, 0.4))"
                                    }}
                                    whileTap={{ scale: 0.96 }}
                                    animate={{
                                        y: [0, -2, 0],
                                    }}
                                    transition={{
                                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                        scale: { duration: 0.2 },
                                        filter: { duration: 0.3 }
                                    }}
                                    src="/assets/img/logo.svg"
                                    alt={Global.APP_NAME}
                                    className="object-cover object-top h-12 max-h-12 w-auto sm:h-12 sm:max-h-12 transition-all duration-300"
                                />
                            </a>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            className="hidden xl:flex py-6  justify-center items-center font-normal text-base"
                        >
                            <nav className="flex gap-2">
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
                                        <div key={path} className="relative">
                                            <motion.a
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
                                                variants={itemVariants}
                                                whileHover={{
                                                    scale: 1.06,
                                                    y: -2,
                                                }}
                                                whileTap={{
                                                    scale: 0.95,
                                                    y: 0
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 17
                                                }}
                                                className={`relative font-semibold !text-base py-2 rounded-full transition-all duration-300 ${isActive(path)
                                                    ? "bg-transparent pl-7 pr-3 text-neutral-dark font-semibold "
                                                    : "bg-transparent px-5 text-neutral-dark "
                                                    }`}
                                            >
                                                {text}
                                                {isActive(path) && (
                                                    <motion.span
                                                        layoutId="activeDot"
                                                        initial={{ scale: 0 }}
                                                        animate={{
                                                            scale: [1, 1.1, 1],
                                                            boxShadow: [
                                                                "0 0 0 0 rgba(187, 255, 82, 0.7)",
                                                                "0 0 0 8px rgba(187, 255, 82, 0.2)",
                                                                "0 0 0 0 rgba(187, 255, 82, 0)"
                                                            ]
                                                        }}
                                                        transition={{
                                                            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                                                            boxShadow: {
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                ease: "easeInOut"
                                                            }
                                                        }}
                                                        className="absolute left-3 top-[40%] -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-secondary rounded-full"
                                                    />
                                                )}
                                            </motion.a>
                                            <AnimatePresence>
                                                {activeMegaMenu === path && (
                                                    <div className="">
                                                        <MegaMenuPopup
                                                            info={modalData}
                                                            isOpen={activeMegaMenu === path}
                                                            onClose={closeMegaMenu}
                                                            data={servicesData}
                                                        />
                                                    </div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </nav>
                            <motion.div
                                variants={itemVariants}
                                className="hidden xl:flex gap-4 justify-center items-center"
                            >
                                {/*  <WhatsAppButtonWithArrow
                                variant="primary"
                                size="medium"
                                className="text-base 2xl:text-lg"
                            >
                                Reserva una consulta
                            </WhatsAppButtonWithArrow> */}
                                
                                {/* Mostrar diferentes elementos según el estado de sesión */}
                                {authLoading ? (
                                    // Mostrando loading mientras se verifica auth
                                    <div className="ml-6 py-2 px-4 bg-gray-300 text-base font-semibold text-gray-600 rounded-full flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                                        <span>...</span>
                                    </div>
                                ) : auth?.user ? (
                                    // Usuario logueado - Mostrar menú de usuario
                                    <div className="relative" ref={userDropdownRef}>
                                        <motion.button
                                            onClick={() => setShowUserDropdown(!showUserDropdown)}
                                            whileHover={{
                                                scale: 1.06,
                                                y: -2,
                                                boxShadow: "0 10px 25px rgba(126, 90, 251, 0.3)"
                                            }}
                                            whileTap={{
                                                scale: 0.95,
                                                y: 0
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 17
                                            }}
                                            className="ml-6 py-2 px-4 bg-secondary text-base font-semibold text-white rounded-full relative overflow-hidden group flex items-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="relative z-10">
                                                {auth.user.name}
                                            </span>
                                            <motion.svg 
                                                animate={{ rotate: showUserDropdown ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="w-4 h-4" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </motion.svg>
                                          
                                        </motion.button>
                                        
                                        {/* Dropdown menu */}
                                        <AnimatePresence>
                                            {showUserDropdown && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden"
                                                >
                                                    <div className="py-2">
                                                        {/* Info del usuario */}
                                                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                                                            <p className="text-sm text-gray-500">Conectado como</p>
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm font-semibold text-gray-900 truncate">
                                                                    {auth.user.email || auth.user.name}
                                                                </p>
                                                                {console.log(auth.user)}
                                                                {auth.user.role === 'admin' && (
                                                                    <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded-full ml-2 flex-shrink-0">
                                                                        Admin
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Opciones del menú */}
                                                        <div className="py-1">
                                                            {auth.user.role === 'Admin' ? (
                                                                // Opciones para administrador
                                                                <a
                                                                    href="/admin/properties"
                                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                                                >
                                                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                                    </svg>
                                                                    Dashboard
                                                                </a>
                                                            ) : (
                                                                // Opciones para usuario normal
                                                                <>
                                                                    {/*<a
                                                                        href="/perfil"
                                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                                                    >
                                                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                        </svg>
                                                                        Mi Perfil
                                                                    </a>
                                                                    
                                                                    <a
                                                                        href="/mis-propiedades"
                                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                                                    >
                                                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21l4-4 4 4" />
                                                                        </svg>
                                                                        Mis Propiedades
                                                                    </a>
                                                                    
                                                                    <a
                                                                        href="/configuracion"
                                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                                                    >
                                                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        </svg>
                                                                        Configuración
                                                                    </a> */}
                                                                </>
                                                            )}
                                                        </div>
                                                        
                                                        <div className="border-t border-gray-100">
                                                            <button 
                                                                onClick={() => {
                                                                    fetch('/api/logout', { method: 'DELETE' })
                                                                        .then(() => location.reload());
                                                                }}
                                                                className="flex items-center w-full text-left px-4 py-2 text-sm text-secondary hover:bg-red-50 transition-colors duration-150"
                                                            >
                                                                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                                </svg>
                                                                Cerrar Sesión
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    // Usuario no logueado - Mostrar botón de entrar
                                    <motion.a
                                        href="/login"
                                        whileHover={{
                                            scale: 1.06,
                                            y: -2,
                                            boxShadow: "0 10px 25px rgba(126, 90, 251, 0.3)"
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                            y: 0
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 17
                                        }}
                                        className="ml-6 py-2 px-5 bg-secondary  text-base font-semibold text-white rounded-full relative overflow-hidden group"
                                    >
                                        <span className="relative z-10">
                                            Entrar
                                        </span>
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-primary to-accent/90 opacity-0 group-hover:opacity-100"
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.a>
                                )}

                            </motion.div>
                        </motion.div>

                        {/*
                        <motion.div
                            variants={itemVariants}
                            className="flex h-full items-center gap-4 justify-end mr-4"
                        >
                            <LanguageDropdown 
                                languagesSystem={languagesSystem} 
                                selectLanguage={selectLanguage} 
                                onUseLanguage={onUseLanguage} 
                            />
                        </motion.div> */}



                        <motion.div
                            variants={itemVariants}
                            className="xl:hidden text-base"
                        >
                            <div>
                                <motion.button
                                    ref={btnToggleRef}
                                    onClick={toggleMenu}
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{
                                        scale: 1.06,
                                        boxShadow: "0 8px 20px rgba(126, 90, 251, 0.3)"
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut"
                                    }}
                                    className="text-white menu-toggle rounded-xl h-[50px] w-[50px] flex items-center justify-center bg-constrast shadow-lg border border-white/20"
                                    aria-label="Toggle menu"
                                >
                                    <div className="text-white relative z-10">
                                        {isOpen ? (
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        )}
                                    </div>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>


                </motion.header>

                {/* Menú móvil */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Overlay con blur */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999999]"
                                style={{ zIndex: 99998 }}
                                onClick={() => setIsOpen(false)}
                            />

                            <motion.div
                                ref={menuRef}
                                initial={{ opacity: 0, y: -100, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -100, scale: 0.95 }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 200,
                                    duration: 0.4
                                }}
                                className={`fixed left-[5%] right-[5%] ${isScrolled
                                    ? "top-16"
                                    : "top-[100px]"
                                    } z-[99999999] bg-gradient-to-br from-white via-white to-blue-50 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[calc(100vh-120px)] overflow-y-auto`}
                                style={{ zIndex: 99999999 }}
                            >
                                {/* Header del menú */}
                                <div className="bg-gradient-to-r from-accent to-constrast p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">Navegación</h3>
                                            <p className="text-sm opacity-90">Explora nuestros servicios</p>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setIsOpen(false)}
                                            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Contenido del menú */}
                                <div className="p-6 min-h-[200px]">
                                    <motion.ul
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-3"
                                        style={{ opacity: 1, visibility: 'visible' }}
                                    >
                                        {[


  { path: "/catalogo", color: "bg-white" },
                                            { path: "/nosotros", color: "bg-white" },
                                          
                                            { path: "/contacto", color: "bg-white" },
                                            { path: "/blog", color: "bg-white" },

                                        ].map((item, index) => {
                                            const text = {
                                                 "/catalogo": t("public.header.services", "Catálogo"),
                                                "/nosotros": t("public.header.home", "Nosotros"),
                                               
                                                "/contacto": t("public.header.contact", "Contacto"),
                                                "/blog": t("public.header.options", "Blog"),
                                            }[item.path];

                                            return (
                                                <motion.li
                                                    key={item.path}
                                                    variants={itemVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    style={{ opacity: 1, visibility: 'visible' }}
                                                >
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (item.path.startsWith('#')) {
                                                                if (item.hasSubmenu) {
                                                                    toggleMegaMenu(item.path);
                                                                }
                                                                handleLinkClick(item.path);
                                                            } else {
                                                                handleLinkClick(item.path);
                                                                window.location.href = item.path;
                                                                setIsOpen(false);
                                                            }
                                                        }}
                                                        className={`w-full group relative overflow-hidden flex items-center p-4 rounded-xl transition-all duration-300 ${isActive(item.path) || activeMegaMenu === item.path
                                                            ? "bg-accent text-white border-2 border-accent shadow-lg"
                                                            : "bg-gray-50 hover:bg-gradient-to-r hover:from-gray-100 hover:to-blue-50 text-gray-700 hover:text-primary border-2 border-transparent"
                                                            }`}
                                                    >
                                                        {/* Texto */}
                                                        <div className="flex-1 text-left">
                                                            <span className={`font-medium text-base ${isActive(item.path) || activeMegaMenu === item.path ? "!text-white" : "!text-gray-700 group-hover:!text-primary"
                                                                }`} style={{ opacity: 1, visibility: 'visible' }}>
                                                                {text || item.path}
                                                            </span>
                                                            {item.path === "#services" && (
                                                                <p className={`text-xs mt-1 ${isActive(item.path) || activeMegaMenu === item.path ? "text-white/80" : "text-gray-500"
                                                                    }`} style={{ opacity: 1, visibility: 'visible' }}>
                                                                    Descubre nuestras soluciones
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Flecha o indicador de submenú */}
                                                        <motion.div
                                                            className={`transition-colors duration-300 ${isActive(item.path) || activeMegaMenu === item.path ? "text-white" : "text-gray-400 group-hover:text-primary"
                                                                }`}
                                                        >
                                                            {item.hasSubmenu ? (
                                                                <motion.div
                                                                    animate={{ rotate: activeMegaMenu === item.path ? 180 : 0 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                    </svg>
                                                                </motion.div>
                                                            ) : (
                                                                <ArrowRight className="w-5 h-5" />
                                                            )}
                                                        </motion.div>
                                                    </button>

                                                    {/* Submenú de servicios para móvil */}
                                                    <AnimatePresence>
                                                        {item.hasSubmenu && activeMegaMenu === item.path && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: "auto" }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                className="mt-3 overflow-hidden"
                                                            >
                                                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                                                                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                                                        Nuestros Servicios
                                                                    </h4>
                                                                    <div className="grid grid-cols-1 gap-2">
                                                                        {servicesData && servicesData.slice(0, 6).map((service, serviceIndex) => (
                                                                            <motion.button
                                                                                key={serviceIndex}
                                                                                onClick={() => {
                                                                                    window.location.href = `/servicio/${service.slug || service.id}`;
                                                                                    setIsOpen(false);
                                                                                }}
                                                                                whileHover={{ scale: 1.02 }}
                                                                                whileTap={{ scale: 0.98 }}
                                                                                className="flex items-center p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors duration-200 border border-gray-100 hover:border-blue-200 text-left w-full"
                                                                            >
                                                                                <div className="flex-1 min-w-0">
                                                                                    <p className="font-medium text-gray-800 text-sm truncate">
                                                                                        {service.name || service.title}
                                                                                    </p>
                                                                                    {service.description && (
                                                                                        <p className="text-xs text-gray-500 truncate">
                                                                                            {service.description.substring(0, 50)}...
                                                                                        </p>
                                                                                    )}
                                                                                </div>
                                                                                <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                                </svg>
                                                                            </motion.button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.li>
                                            );
                                        })}
                                    </motion.ul>

                                    {/* CTA Button */}
                                    <motion.div
                                        variants={itemVariants}
                                        className=" flex flex-col gap-4 mt-8 w-full"
                                    >
                                        {authLoading ? (
                                            // Estado de carga
                                            <div className="py-3 px-4 flex items-center justify-center bg-gray-300 text-sm font-medium text-gray-600 rounded-full">
                                                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Verificando...
                                            </div>
                                        ) : auth?.user ? (
                                            // Usuario logueado - Mostrar opciones de usuario
                                            <>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="py-3 px-4 bg-gray-100 text-sm font-medium text-gray-700 rounded-full mb-3 text-center"
                                                >
                                                    <div className="flex items-center justify-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        <span>Hola, {auth.user.name}</span>
                                                        {auth.user.role === 'Admin' && (
                                                            <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded-full ml-2">
                                                                Admin
                                                            </span>
                                                        )}
                                                    </div>
                                                </motion.div>
                                                
                                                {auth.user.role === 'Admin' ? (
                                                    // Opciones para administrador
                                                    <motion.a
                                                        href="/admin/properties"
                                                        whileHover={{
                                                            scale: 1.06,
                                                            y: -2,
                                                            boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)"
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                            y: 0
                                                        }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 400,
                                                            damping: 17
                                                        }}
                                                        className="py-3 px-4 flex items-center justify-center bg-primary text-sm font-medium text-white rounded-full relative overflow-hidden group mb-3"
                                                    >
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                        </svg>
                                                        <span className="relative z-10">
                                                            Dashboard
                                                        </span>
                                                        <motion.div
                                                            className="absolute inset-0 bg-gradient-to-r from-primary to-primary opacity-0 group-hover:opacity-100"
                                                            transition={{ duration: 0.3 }}
                                                        />
                                                    </motion.a>
                                                ) : (
                                                    // Opciones para usuario normal
                                                    <>
                                                        {/*<motion.a
                                                            href="/perfil"
                                                            whileHover={{
                                                                scale: 1.06,
                                                                y: -2,
                                                                boxShadow: "0 10px 25px rgba(126, 90, 251, 0.3)"
                                                            }}
                                                            whileTap={{
                                                                scale: 0.95,
                                                                y: 0
                                                            }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 400,
                                                                damping: 17
                                                            }}
                                                            className="py-3 px-4 flex items-center justify-center bg-secondary text-sm font-medium text-white rounded-full relative overflow-hidden group mb-3"
                                                        >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                            <span className="relative z-10">
                                                                Mi Perfil
                                                            </span>
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-r from-primary to-accent/90 opacity-0 group-hover:opacity-100"
                                                                transition={{ duration: 0.3 }}
                                                            />
                                                        </motion.a>

                                                        <motion.a
                                                            href="/mis-propiedades"
                                                            whileHover={{
                                                                scale: 1.06,
                                                                y: -2,
                                                                boxShadow: "0 10px 25px rgba(76, 175, 80, 0.3)"
                                                            }}
                                                            whileTap={{
                                                                scale: 0.95,
                                                                y: 0
                                                            }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 400,
                                                                damping: 17
                                                            }}
                                                            className="py-3 px-4 flex items-center justify-center bg-green-500 text-sm font-medium text-white rounded-full relative overflow-hidden group mb-3"
                                                        >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21l4-4 4 4" />
                                                            </svg>
                                                            <span className="relative z-10">
                                                                Mis Propiedades
                                                            </span>
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100"
                                                                transition={{ duration: 0.3 }}
                                                            />
                                                        </motion.a> */}
                                                    </>
                                                )}

                                                <motion.button
                                                    onClick={() => {
                                                        fetch('/api/logout', { method: 'DELETE' })
                                                            .then(() => location.reload());
                                                    }}
                                                    whileHover={{
                                                        scale: 1.06,
                                                        y: -2,
                                                        boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)"
                                                    }}
                                                    whileTap={{
                                                        scale: 0.95,
                                                        y: 0
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 17
                                                    }}
                                                    className="py-3 px-4 flex items-center justify-center bg-secondary text-sm font-medium text-white rounded-full relative overflow-hidden group"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    <span className="relative z-10">
                                                        Cerrar Sesión
                                                    </span>
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary opacity-0 group-hover:opacity-100"
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                </motion.button>
                                            </>
                                        ) : (
                                            // Usuario no logueado - Mostrar botón de entrar
                                            <motion.a
                                                href="/login"
                                                whileHover={{
                                                    scale: 1.06,
                                                    y: -2,
                                                    boxShadow: "0 10px 25px rgba(126, 90, 251, 0.3)"
                                                }}
                                                whileTap={{
                                                    scale: 0.95,
                                                    y: 0
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 17
                                                }}
                                                className="py-3 px-4 flex items-center justify-center bg-secondary text-sm font-medium text-white rounded-full relative overflow-hidden group"
                                            >
                                                <span className="relative z-10">
                                                    Entrar
                                                </span>
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent/90 opacity-0 group-hover:opacity-100"
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </motion.a>
                                        )}

                                    

                                    </motion.div>


                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Contenido dinámico */}
                {children && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center text-center text-white p-6"
                    >
                        {children}
                    </motion.div>
                )}

            
            </div>
        </>
    );
};

export default Header;
