import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextWithHighlight from "../../Utils/TextWithHighlight";
import { useTranslation } from "../../hooks/useTranslation";
import HtmlContent from "../../Utils/HtmlContent";
import { X } from "lucide-react";

import Swal from "sweetalert2";
import ReactModal from "react-modal";
import SubscriptionsRest from "../../Actions/SubscriptionsRest";
import GeneralRest from "../../actions/GeneralRest";

const FilterAgencia = ({ categories, filter, setFilter, landing }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [termsModalOpen, setTermsModalOpen] = useState(false);
    const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [saving, setSaving] = useState(false);
    const [generals, setGenerals] = useState([]);
    const [aboutuses, setAboutuses] = useState(null);
    const emailRef = useRef();
    const { t } = useTranslation();

    // Configurar SubscriptionsRest
    const subscriptionsRest = new SubscriptionsRest();
    subscriptionsRest.enableNotifications = false;

    // Configurar GeneralRest
    const generalRest = new GeneralRest();
    generalRest.enableNotifications = false;

    // Obtener datos desde la base de datos (igual que en Footer)
    useEffect(() => {
        const fetchGenerals = async () => {
            try {
                const data = await generalRest.getGenerals();
                setGenerals(data);
            } catch (error) {
                console.error("Error fetching generals:", error);
            }
        };

        const fetchAboutuses = async () => {
            try {
                const data = await generalRest.getAboutuses();
                setAboutuses(data);
            } catch (error) {
                console.error('Error al obtener datos de aboutus:', error);
            }
        };

        fetchGenerals();
        fetchAboutuses();
    }, []);

    // Obtener datos de aboutus (igual que en Footer)
    const aboutusData = aboutuses?.aboutus || [];
    const generalsData = aboutuses?.generals || [];

    // Definir los elementos de política (igual que en Footer)
    const policyItems = {
        privacy_policy: t("public.footer.privacity", "Políticas de privacidad"),
        terms_conditions: t("public.form.terms", "Términos y condiciones"),
    };

    // Función para obtener contenido de política (igual que en Footer)
    const getPolicyContent = (key) => {
        return generals.find((x) => x.correlative == key)?.description ?? 
               generalsData.find((x) => x.correlative == key)?.description ?? "";
    };

    // Funciones para modales de términos y privacidad (igual que en Footer)
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    
    const openTermsModal = (e) => {
        e.preventDefault();
        setTermsModalOpen(true);
    };

    const closeTermsModal = () => {
        setTermsModalOpen(false);
    };

    const openPrivacyModal = (e) => {
        e.preventDefault();
        setPrivacyModalOpen(true);
    };

    const closePrivacyModal = () => {
        setPrivacyModalOpen(false);
    };

    const closeSubscriptionModal = () => {
        setModalOpen(false);
        setTermsAccepted(false);
        if (emailRef.current) {
            emailRef.current.value = "";
        }
    };

    // Función para limpiar el formulario
    const clearEmailForm = () => {
        if (emailRef.current) {
            emailRef.current.value = "";
            emailRef.current.style.transform = 'scale(0.98)';
            setTimeout(() => {
                emailRef.current.style.transform = 'scale(1)';
            }, 100);
        }
        setTermsAccepted(false);
    };

    // Función de envío del formulario
    const onEmailSubmit = async (e) => {
        e.preventDefault();
        if (saving) return;

        if (!termsAccepted) {
            Swal.fire({
                icon: 'warning',
                title: 'Términos y condiciones',
                text: 'Debes aceptar los términos y condiciones para suscribirte.',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#C6FF6B'
            });
            return;
        }

        setSaving(true);

        const request = {
            email: emailRef.current.value,
            status: true
        };

        try {
            const result = await subscriptionsRest.save(request);
            setSaving(false);

            if (!result) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al suscribirse',
                    text: 'Hubo un problema al procesar tu suscripción. Por favor, inténtalo de nuevo.',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#C6FF6B'
                });
                return;
            }

            // Éxito
            Swal.fire({
                icon: 'success',
                title: '¡Suscripción exitosa!',
                text: '¡Gracias por suscribirte! Recibirás nuestras últimas noticias y actualizaciones del blog.',
                showConfirmButton: false,
                timer: 3000,
                background: '#ffffff',
                iconColor: '#C6FF6B'
            });

            clearEmailForm();
            closeSubscriptionModal();

        } catch (error) {
            setSaving(false);
            Swal.fire({
                icon: 'error',
                title: 'Error al suscribirse',
                text: 'Hubo un problema al procesar tu suscripción. Por favor, inténtalo de nuevo.',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#C6FF6B'
            });
        }
    };
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const buttonHover = {
        hover: {
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
        tap: {
            scale: 0.98,
        },
    };

    const inputFocus = {
        focus: {
            boxShadow: "0 0 0 2px #3b82f6",
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <>
            <motion.section
                className="py-8 xl:py-12 px-[5%] font-title"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
            <div className="flex flex-col lg:flex-row justify-between items-center">
                <motion.div className="lg:mb-12" variants={itemVariants}>
                    <h2 className="text-4xl lg:text-[48px] font-medium mb-4 leading-[94%] ">
                        <TextWithHighlight
                            text={landing?.title || ""}
                            color="bg-neutral-dark font-semibold"
                           
                        />
                       
                    </h2>
                    <p className=" text-lg text-neutral-light max-w-2xl">
                        {landing?.description || ""}
                     
                    </p>
                </motion.div>
                {/* Campo de búsqueda
                     <motion.label
                    htmlFor="txt-search"
                    className="col-span-1 px-6 h-max py-4 flex items-center rounded-3xl bg-[#F5F2F9] min-w-[350px] sm:min-w-[500px] max-w-2xl "
                    variants={itemVariants}
                    whileHover={{ y: -3 }}
                    whileFocus="focus"
                    variants={inputFocus}
                >
                    <motion.i
                        className="fas fa-search text-negro mr-2"
                        whileHover={{ scale: 1.1 }}
                    />
                    <motion.input
                        id="txt-search"
                        type="text"
                        placeholder={t(
                            "public.post.search",
                            "	Buscar publicación"
                        )}
                        className="w-full bg-transparent border-none outline-none text-slate-800"
                        onChange={(e) =>
                            setFilter((old) => ({
                                ...old,
                                search: e.target.value,
                            }))
                        }
                        whileFocus={{
                            outline: "none",
                            x: 3,
                        }}
                    />
                </motion.label>
                */}

                <motion.button 
                    className="my-10 lg:my-0 uppercase bg-secondary font-medium max-h-max text-sm tracking-[8%] px-6 py-3 rounded-full hover:bg-constrast transition-colors duration-300"
                    onClick={openModal}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    quiero suscribirme al blog
                </motion.button>
           
            </div>


            <div className="flex">


                {/* Botones de categorías */}
                <motion.div
                    className="flex flex-wrap  gap-3 justify-start  "
                    variants={containerVariants}
                >
                    <div className="flex p-2 bg-white rounded-xl">
                        <motion.button

                            className={`px-4 py-2.5 text-neutral-light rounded-lg    ${filter.category===null
                                ? "  bg-secondary"
                                : ""
                                }`}
                            onClick={() =>
                                setFilter((old) => ({
                                    ...old,
                                    category:null

                                }))
                            }
                            variants={itemVariants}
                            whileHover="hover"
                            whileTap="tap"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                delay: 1 * 0.05,
                            }}
                        >
                           Todos
                        </motion.button>
                        {categories.map((item, index) => (
                            <motion.button
                                key={index}
                                className={`px-4 py-2.5 text-neutral-light rounded-lg  ${item.id == filter.category
                                    ? "  bg-secondary"
                                    : ""
                                    }`}
                                onClick={() =>
                                    setFilter((old) => ({
                                        ...old,
                                        category:
                                            item.id == filter.category
                                                ? null
                                                : item.id,
                                    }))
                                }
                                variants={itemVariants}
                                whileHover="hover"
                                whileTap="tap"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    delay: index * 0.05,
                                }}
                            >
                                {item.name}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>

        {/* Modal de Suscripción */}
        <AnimatePresence>
            {modalOpen && (
                <ReactModal
                    isOpen={modalOpen}
                    onRequestClose={closeSubscriptionModal}
                    contentLabel="Suscripción al Blog"
                    className="fixed inset-0 flex items-center justify-center p-4 z-50"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9999]"
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                >
                    <motion.div
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto relative overflow-hidden"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Header del Modal */}
                        <div className="bg-secondary p-6 text-center relative">
                            <motion.button
                                onClick={closeSubscriptionModal}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-10 hover:bg-opacity-20 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg className="w-5 h-5 text-neutral-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="w-16 h-16 bg-constrast rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-dark mb-2">
                                    ¡Suscríbete a nuestro blog!
                                </h2>
                                <p className="text-neutral-light text-sm">
                                    Recibe las últimas noticias y actualizaciones directamente en tu correo
                                </p>
                            </motion.div>
                        </div>

                        {/* Formulario */}
                        <motion.div
                            className="p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <form onSubmit={onEmailSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="modal-email" className="block text-sm font-medium text-neutral-dark mb-2">
                                        Correo electrónico
                                    </label>
                                    <motion.input
                                        ref={emailRef}
                                        id="modal-email"
                                        type="email"
                                        required
                                        placeholder="tu@correo.com"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 outline-none"
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </div>

                                <motion.div
                                    className="flex items-start gap-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <motion.input
                                        type="checkbox"
                                        id="modal-terms"
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        className="mt-1 w-4 h-4 text-secondary border-gray-300 rounded focus:ring-secondary focus:ring-2"
                                        whileTap={{ scale: 0.9 }}
                                    />
                                    <label htmlFor="modal-terms" className="text-sm text-neutral-light leading-relaxed">
                                        Acepto los{" "}
                                        <a 
                                            href="#" 
                                            onClick={openTermsModal}
                                            className="text-constrast hover:underline font-medium"
                                        >
                                            términos y condiciones
                                        </a>{" "}
                                        y las{" "}
                                        <a 
                                            href="#" 
                                            onClick={openPrivacyModal}
                                            className="text-constrast hover:underline font-medium"
                                        >
                                            políticas de privacidad
                                        </a>
                                    </label>
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    disabled={saving || !termsAccepted}
                                    className="w-full bg-constrast text-white py-4 px-6 rounded-xl font-medium text-sm uppercase tracking-wider hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                    whileHover={{ scale: saving ? 1 : 1.02 }}
                                    whileTap={{ scale: saving ? 1 : 0.98 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <AnimatePresence mode="wait">
                                        {saving ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <motion.div
                                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                                Suscribiendo...
                                            </motion.div>
                                        ) : (
                                            <motion.span
                                                key="subscribe"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                Suscribirme al blog
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </form>

                           
                        </motion.div>
                    </motion.div>
                </ReactModal>
            )}
        </AnimatePresence>

        {/* Modales de Términos y Políticas - Estilo Footer */}
        <ReactModal
            isOpen={termsModalOpen}
            onRequestClose={closeTermsModal}
            contentLabel="Términos y Condiciones"
            className="fixed top-[5%] left-1/2 -translate-x-1/2 bg-white p-4 lg:p-6 rounded-2xl lg:rounded-3xl shadow-lg w-[95%] max-w-4xl max-h-[90vh] mb-10 overflow-y-auto scrollbar-hide"
            overlayClassName="fixed inset-0 bg-neutral-dark bg-opacity-50 z-50 overflow-auto scrollbar-hide"
        >
            <button
                onClick={closeTermsModal}
                className="float-right text-red-500 hover:text-red-700 transition-all duration-300"
            >
                <X className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth="3px" />
            </button>
            <h2 className="text-xl lg:text-2xl font-bold mb-4 pr-8">
                {policyItems.terms_conditions}
            </h2>
            <HtmlContent 
                className="prose prose-sm lg:prose" 
                html={getPolicyContent('terms_conditions')} 
            />
        </ReactModal>

        <ReactModal
            isOpen={privacyModalOpen}
            onRequestClose={closePrivacyModal}
            contentLabel="Políticas de Privacidad"
            className="fixed top-[5%] left-1/2 -translate-x-1/2 bg-white p-4 lg:p-6 rounded-2xl lg:rounded-3xl shadow-lg w-[95%] max-w-4xl max-h-[90vh] mb-10 overflow-y-auto scrollbar-hide"
            overlayClassName="fixed inset-0 bg-neutral-dark bg-opacity-50 z-50 overflow-auto scrollbar-hide"
        >
            <button
                onClick={closePrivacyModal}
                className="float-right text-red-500 hover:text-red-700 transition-all duration-300"
            >
                <X className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth="3px" />
            </button>
            <h2 className="text-xl lg:text-2xl font-bold mb-4 pr-8">
                {policyItems.privacy_policy}
            </h2>
            <HtmlContent 
                className="prose prose-sm lg:prose" 
                html={getPolicyContent('privacy_policy')} 
            />
        </ReactModal>
        </>
    );
};

export default FilterAgencia;
