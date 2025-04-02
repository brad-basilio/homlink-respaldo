import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

import Tippy from "@tippyjs/react";
import HtmlContent from "../../Utils/HtmlContent";
import GeneralRest from "../../actions/GeneralRest";

ReactModal.setAppElement("#app");

const Footer = ({ terms, footerLinks = [] }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const generalRest = new GeneralRest();
    const links = {};
    /* footerLinks.forEach((fl) => {
        links[fl.correlative] = fl.description;
    });*/
    const [socials, setSocials] = useState([]);

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const data = await generalRest.getSocials();
                setSocials(data);
            } catch (error) {
                console.error("Error fetching socials:", error);
            }
        };

        fetchSocials();
    }, []); // Asegúrate de que este array de dependencias está vacío si solo se ejecuta una vez

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
    console.log(aboutuses);
    // Extrae los datos necesarios
    const aboutusData = aboutuses?.aboutus || [];
    const generalsData = aboutuses?.generals || [];

    // 1. Libro de reclamaciones (de aboutus)
    const libroReclamaciones = aboutusData.find(
        (item) => item.correlative === "customer-complaints"
    )?.description;
    const telefono = aboutusData.find(
        (item) => item.correlative === "phone"
    )?.description;
    const mail = aboutusData.find(
        (item) => item.correlative === "email"
    )?.description;
    const f_whatsapp = aboutusData.find(
        (item) => item.correlative === "whatsapp"
    )?.description;

    // 2. Términos y condiciones (de generals)
    const termsConditions = generalsData.find(
        (item) => item.correlative === "terms_conditions"
    )?.description;

    return (
        <>
            <footer className="bg-[#224483] text-white mt-8 font-poppins lg:mt-[120px]">
                <div className="px-[5%] max-w-xl lg:max-w-[82rem]  mx-auto py-10 lg:pt-16 lg:pb-8">
                    <div className=" flex flex-col gap-6 lg:flex-row ">
                        <div className="lg:w-4/12 lg:px-[2%] ">
                            <div className=" w-full">
                                <img
                                    src="/assets/img/footer/logo-white.png"
                                    alt="No Pain"
                                    className="md:w-[170.52px]  lg:w-[300.52px] object-cover"
                                />
                            </div>
                            <div className=" w-full mt-6">
                                <img
                                    src="/assets/img/footer/pays.png"
                                    alt="No Pain"
                                    className="w-10/12 h-auto object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 lg:w-8/12 lg:grid lg:grid-cols-3">
                            <div className="w-full text-white flex flex-col gap-2 mt-0">
                                <p className="mb-2">Sede Central Miraflores</p>
                                <p className="text-[14px]">
                                    Calle Chiclayo 723
                                </p>
                                <p className="text-[14px]">
                                    Teléfonos: 241 0448 - 976 953 599
                                </p>
                                <p className="text-[14px]">
                                    info-miraflores@nopain.com.pe
                                </p>
                            </div>

                            <div className="w-full text-white flex flex-col gap-2 mt-0">
                                <p className="mb-2">Sede San Borja</p>
                                <p className="text-[14px]">Calle Bernini 354</p>
                                <p className="text-[14px]">
                                    Teléfono: 398 7331
                                </p>
                                <p className="text-[14px]">
                                    info-sanborja@nopain.com.pe
                                </p>
                            </div>
                            <div className="w-full text-white flex flex-col gap-2">
                                <p className="mb-2">Sede San Isidro</p>
                                <p className="text-[14px]">
                                    Consultorio 513 - 516
                                </p>
                                <p className="text-[14px]">
                                    Teléfonos: 976 953 717
                                </p>
                                <p className="text-[14px]">
                                    cavenecia@nopain.com.pe
                                </p>
                            </div>

                            <div className="w-full text-white flex flex-col gap-2">
                                <p className="mb-2">Horario de Atención</p>
                                <p className="text-[14px]">
                                    Lunes a viernes: <br /> 8:00 am a 8:00 pm
                                </p>
                                <p className="text-[14px]">
                                    Sábados:
                                    <br /> 8:00 am a 2:00 pm
                                </p>
                            </div>
                            <div className="w-full text-white flex flex-col gap-2">
                                <p className="mb-2 font-bold">Políticas</p>
                                <p className="text-[14px]">
                                    Políticas de privacidad
                                </p>
                                <a onClick={openModal} className="text-[14px]">
                                    Términos y Condiciones
                                </a>
                                <p className="text-[14px]">
                                    Políticas de cambio
                                </p>
                                <p className="text-[14px]">
                                    Libro de reclamaciones
                                </p>
                            </div>

                            <div className="w-full text-white flex flex-col gap-2">
                                <p className="mb-2 font-bold">Nuestras redes</p>
                                <div className="flex gap-4">
                                    <img
                                        src="/assets/img/footer/facebook.png"
                                        className="h-8 w-8"
                                    />
                                    <img
                                        src="/assets/img/footer/twitter.png"
                                        className="h-8 w-8"
                                    />
                                    <img
                                        src="/assets/img/footer/instagram.png"
                                        className="h-8 w-8"
                                    />
                                    <img
                                        src="/assets/img/footer/youtube.png"
                                        className="h-8 w-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" bg-[#EFF0F1]">
                    <div className="px-[5%]  py-3">
                        <p className=" text-center text-xs text-[#242424] font-medium">
                            Copyright © 2025 NOPAIN Fisioterapia &
                            <br className="lg:hidden" />
                            Rehabilitación. Reservados todos los derechos.
                        </p>
                    </div>
                </div>
            </footer>
            {/* Modal para Términos y Condiciones */}
            <ReactModal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                contentLabel="Términos y condiciones"
                className="absolute left-1/2 -translate-x-1/2 bg-white p-6 rounded shadow-lg w-[95%] max-w-2xl my-8 outline-none h-[90vh]"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
            >
                <button
                    onClick={closeModal}
                    className="float-right text-gray-500 hover:text-gray-900"
                >
                    Cerrar
                </button>
                <h2 className="text-xl font-bold mb-4">
                    Terminos y Condiciones
                </h2>
                <HtmlContent
                    className="prose h-[calc(90vh-120px)] lg:h-[calc(90vh-90px)] overflow-auto"
                    html={termsConditions}
                />
            </ReactModal>
        </>
    );
};

export default Footer;
