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
    return (
        <>
            <footer className="bg-[#5F48B7] text-white">
                <div className="px-[5%] max-w-xl lg:max-w-6xl xl:max-w-5xl 2xl:max-w-7xl md:px-0 mx-auto py-16">
                    <div className=" flex md:flex-row flex-wrap xl:flex-nowrap gap-8">
                        <div className="hidden w-3/12 lg:flex justify-center">
                            <img
                                src="https://i.ibb.co/pvgT612S/image.png"
                                alt="weFem Logo"
                                className="md:w-[170.52px] md:h-[120.27px] 2xl:w-[197.52px] 2xl:h-[136.27px] object-cover"
                            />
                        </div>

                        <div className="w-7/12  text-[15.77px] lg:w-3/12 xl:w-4/12  border-r-[#FFFFFF]  border-r-2 pr-4 md:text-[18.77px] 2xl:text-[23.77px] leading-[23.77px] tracking-[-0.07px] font-light">
                            <nav className="space-y-4">
                                {WhatsApp && (
                                    <a
                                        href={WhatsApp.link}
                                        aria-label="WhatsApp"
                                        target="_blank"
                                        className="block hover:opacity-80 transition-opacity "
                                    >
                                        Conversemos
                                    </a>
                                )}

                                <a
                                    href="#"
                                    className="block hover:opacity-80 transition-opacity "
                                >
                                    Preguntas frecuentes
                                </a>
                                <a
                                    href="#"
                                    className="block hover:opacity-80 transition-opacity "
                                >
                                    Términos y condiciones
                                </a>
                                <a
                                    href="#"
                                    className="block hover:opacity-80 transition-opacity "
                                >
                                    Libro de Reclamaciones
                                </a>
                            </nav>
                        </div>

                        <div className="md:w-[35%] text-[15.77px] lg:w-2/12 lg:border-r-[#FFFFFF]  lg:border-r-2  md:text-[18.77px] 2xl:text-[23.77px] leading-[23.77px] tracking-[-0.07px] font-normal">
                            <nav className="space-y-4">
                                <a
                                    href="tel:#"
                                    className="block hover:opacity-80 transition-opacity "
                                >
                                    Teléfono
                                </a>
                                <a
                                    href="mailto:#"
                                    className="block hover:opacity-80 transition-opacity "
                                >
                                    Mail
                                </a>
                                <a
                                    href="#"
                                    className="block hover:opacity-80 transition-opacity "
                                >
                                    Whatsapp
                                </a>
                            </nav>
                        </div>
                        <div className=" w-7/12  lg:hidden  flex items-center justify-center md:block">
                            <img
                                src="https://i.ibb.co/pvgT612S/image.png"
                                alt="weFem Logo"
                                className="h-[110.27px]  md:w-[170.52px] md:h-[120.27px] 2xl:w-[197.52px] 2xl:h-[136.27px] object-cover"
                            />
                        </div>

                        <div className="md:w-[35%] lg:w-3/12 flex items-end lg:items-start lg:pt-4">
                            <div className="flex flex-col md:flex-row gap-4 ">
                                {Instagram && (
                                    <a
                                        href={Instagram.link}
                                        aria-label="Instagram"
                                        target="_blank"
                                    >
                                        <img
                                            src="/assets/img/footer/instagram.png"
                                            alt="facebook"
                                            className=" h-[39.65px] md:h-[59.65px] xl:h-[41.33px] 2xl:h-[61.33px] w-auto"
                                        />
                                    </a>
                                )}

                                {Facebook && (
                                    <a
                                        href={Facebook.link}
                                        aria-label="Facebook"
                                        target="_blank"
                                    >
                                        <img
                                            src="/assets/img/footer/facebook.png"
                                            alt="Facebook"
                                            className="h-[39.65px] md:h-[59.65px] xl:h-[41.33px] 2xl:h-[61.33px] w-auto "
                                        />
                                    </a>
                                )}

                                {WhatsApp && (
                                    <a
                                        href={WhatsApp.link}
                                        aria-label="WhatsApp"
                                        target="_blank"
                                    >
                                        <img
                                            src="/assets/img/footer/whatsapp.png"
                                            alt="WhatsApp"
                                            className="h-[39.65px] md:h-[59.65px] xl:h-[41.33px] 2xl:h-[61.33px] w-auto "
                                        />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#FFFFFF]">
                    <div className="px-[5%]  md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl md:px-0 mx-auto md:h-[77.91px] md:py-0 flex items-center justify-start">
                        <p className="hidden md:block text-[14.72px] leading-[22.26px] text-[#EFEDF8]">
                            Copyright © 2025 weFem® | Todos los derechos
                            reservados | Juntxs sin límites
                        </p>
                        <p className="md:hidden flex w-full items-center justify-center text-center text-[12.72px] py-4 leading-[22.26px] text-[#EFEDF8]">
                            Copyright © 2025 weFem® <br /> Todos los derechos
                            reservados | Juntxs sin límites
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
