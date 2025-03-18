import Tippy from "@tippyjs/react";
import React, { useState, useEffect, useRef } from "react";

const Header = ({
    session,
    showSlogan,
    gradientStart,
    menuGradientEnd,
    backgroundType = "none",
    backgroundSrc = "",
    backgroundHeight = "h-screen",
    backgroundPosition = "object-top",
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const btnToggleRef = useRef(null);

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

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {showSlogan && (
                <div className="text-center px-[5%] py-3 bg-[#6048B7] text-white text-[14.21px] md:text-[16.21px] leading-6 uppercase">
                    <span className="text-[#DDEC4C] font-bold ">
                        ¡ENVÍO GRATIS
                    </span>{" "}
                    A TODO LIMA METROPOLITANA!
                </div>
            )}
            <div
                className={`w-full max-w-full relative ${backgroundHeight} overflow-clip `}
            >
                {/* Fondo dinámico (imagen, video o nada) */}
                {backgroundType === "image" && (
                    <img
                        src={backgroundSrc}
                        className={`absolute -z-10 inset-0 w-screen h-full  object-cover ${backgroundPosition}`}
                        alt="Background"
                    />
                )}
                {backgroundType === "video" && (
                    <video
                        className={`absolute -z-10 inset-0  w-screen h-full  object-cover ${backgroundPosition}`}
                        autoPlay
                        loop
                        muted
                    >
                        <source src={backgroundSrc} type="video/mp4" />
                    </video>
                )}

                {/* Capa de color si hay fondo */}
                {(backgroundType === "image" || backgroundType === "video") && (
                    <div
                        className="absolute inset-0 "
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(95, 72, 183, 0.75) 6.08%, rgba(96, 72, 183, 0.525) 100%)",
                        }}
                    ></div>
                )}
                <header
                    className={`fixed top-0 w-full max-w-full overflow-hidden z-40 transition-colors duration-300 ${
                        backgroundType === "none"
                            ? "bg-[#5339B1]"
                            : isScrolled
                            ? "bg-[#5339B1] pt-0 "
                            : "bg-transparent pt-14 lg:pt-10"
                    }`}
                >
                    <div
                        className={`px-[5%] py-4 lg:py-0 lg:max-w-6xl 2xl:max-w-7xl mx-auto flex w-full justify-between items-center text-white shadow-lg lg:shadow-none `}
                    >
                        <div className="flex items-center w-full  lg:hidden">
                            <button
                                ref={btnToggleRef}
                                onClick={toggleMenu}
                                className="text-white pr-6 menu-toggle "
                                aria-label="Toggle menu"
                            >
                                <i
                                    className={`fas ${
                                        isOpen ? "fa-times" : "fa-bars"
                                    } text-lg md:text-2xl`}
                                ></i>
                            </button>
                            <a href="/">
                                <img
                                    src="/assets/img/logo.png"
                                    alt="Trasciende Logo"
                                    className="h-[27px] w-[150.55px] md:h-[36.8px] md:w-[210.55px] object-cover object-top"
                                />
                            </a>
                        </div>
                        <div className="hidden lg:flex py-6 mx-auto w-full justify-between items-center font-medium text-[14.84px] leading-[18.55px]">
                            <nav className="flex gap-8 ">
                                <a href="/catalog">Tienda</a>
                                <a href="/instructions">¿Cómo usar?</a>
                                <a href="/about">Nosotrxs</a>
                                <a href="/quiz">Quiz</a>
                            </nav>
                            <a href="/" className="flex justify-start">
                                <img
                                    src="/assets/img/logo.png"
                                    alt="Wefem"
                                    className="h-[36.8px] w-[210.55px] object-cover object-top"
                                />
                            </a>
                            <div className="flex space-x-4 text-[22.93px] items-center">
                                <a href="#" className="text-[14.84px]">
                                    Escríbenos
                                </a>
                                <a href="#">
                                    <i className="fa-brands fa-whatsapp"></i>
                                </a>
                                <a href="#">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a href="#">
                                    <i className="fa-brands fa-facebook"></i>
                                </a>
                                <a href="#">
                                    <i className="fa-brands fa-tiktok"></i>
                                </a>

                                <a href="#">
                                    <i className="fas fa-shopping-cart"></i>
                                </a>
                            </div>
                        </div>

                        <div className=" lg:hidden">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <a href="/quiz">Quiz</a>
                                <a href="#">
                                    <i className="fa-brands fa-whatsapp"></i>
                                </a>
                                <a href="#">
                                    <i className="fas fa-shopping-cart"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </header>
                <div
                    ref={menuRef}
                    className={`absolute top-16 md:top-20 inset-0 text-white z-[999] transform ${
                        isOpen ? "opacity-1 block" : "hidden opacity-0"
                    } transition-transform duration-300 ease-in-out p-[5%] h-max overflow-y-auto `}
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(95, 72, 183, 0.75) 6.08%, rgba(96, 72, 183, 0.525) 100%)",
                    }}
                >
                    <ul className="flex flex-col gap-4 items-center justify-center">
                        <li>
                            <a href="/catalog">Tienda</a>
                        </li>
                        <li>
                            <a href="/instructions">¿Cómo usar?</a>
                        </li>
                        <li>
                            <a href="/about">Nosotrxs</a>
                        </li>
                        <li>
                            <a href="/quiz">Quiz</a>
                        </li>
                    </ul>
                </div>

                {/* Contenido dinámico */}
                {children && (
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
                        {children}
                    </div>
                )}
            </div>
        </>
    );
};

export default Header;
