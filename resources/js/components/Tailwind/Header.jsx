import Tippy from "@tippyjs/react";
import React, { useState, useEffect, useRef, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import GeneralRest from "../../actions/GeneralRest";
import { TbBrush } from "react-icons/tb";
import { Trash2 } from "lucide-react";

const generalRest = new GeneralRest();
const Header = ({
    session,
    showSlogan = true,
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
            setTimeout(() => setAnimar(false), 500); // Duración de la animación
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
            {showSlogan && (
                <div className="text-center px-[5%] py-3 font-light bg-[#6048B7] text-white text-[14.21px] md:text-[16.21px] leading-6 uppercase tracking-[0.2em] font-poppins">
                    <span className="text-[#DDEC4C] font-semibold ">
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
                    className={`font-poppins fixed top-0 w-full max-w-full overflow-hidden z-40 transition-colors duration-300 ${
                        backgroundType === "none"
                            ? "bg-[#5339B1]"
                            : isScrolled
                            ? "bg-[#5339B1] pt-0 "
                            : "bg-transparent top-6 pt-14 lg:pt-10"
                    }`}
                >
                    <div
                        className={`px-[5%] py-4 lg:py-0 lg:max-w-7xl 2xl:max-w-7xl mx-auto flex w-full justify-between items-center text-white shadow-lg lg:shadow-none `}
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
                                    alt="WeFem Logo"
                                    className="h-[27px] w-[150.55px] md:h-[36.8px] md:w-[210.55px] object-cover object-top"
                                />
                            </a>
                        </div>
                        <div className="hidden lg:flex py-6 mx-auto w-full justify-between items-center font-normal text-[14.54px] leading-[18.55px] tracking-widest">
                            <nav className="flex gap-6 ">
                                <a href="/catalog">Tienda</a>
                                <a href="/instructions">¿Cómo usar?</a>
                                <a href="/about">Nosotrxs</a>
                                <a href="/quiz">Quiz</a>
                            </nav>
                            <a href="/" className="flex justify-start">
                                <img
                                    src="/assets/img/logo.png"
                                    alt="Wefem"
                                    className="h-[38px] w-[230.55px] object-cover object-top"
                                    style={{
                                        textShadow:
                                            "0px 4px 7.5px 0px #00000040",
                                    }}
                                />
                            </a>
                            <div className="flex space-x-4 text-[21.93px] items-center">
                                <span className="text-[14.54px]">
                                    Escríbenos
                                </span>
                                {WhatsApp && (
                                    <a
                                        href={WhatsApp.link}
                                        target="_blank"
                                        className="flex justify-center items-center cursor-pointer"
                                    >
                                        <i className="fa-brands fa-whatsapp"></i>
                                    </a>
                                )}
                                {Instagram && (
                                    <a
                                        href={Instagram.link}
                                        target="_blank"
                                        className="flex justify-center items-center"
                                    >
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                )}
                                {Facebook && (
                                    <a
                                        href={Facebook.link}
                                        target="_blank"
                                        className="flex justify-center items-center"
                                    >
                                        <i className="fa-brands fa-facebook"></i>
                                    </a>
                                )}

                                {TikTok && (
                                    <a href={TikTok.link} target="_blank">
                                        <i className="fa-brands fa-tiktok"></i>
                                    </a>
                                )}

                                <button
                                    onClick={() =>
                                        setMostrarCarrito(!mostrarCarrito)
                                    }
                                    className="relative"
                                >
                                    <i className="fas fa-shopping-cart"></i>
                                    <span
                                        className={`absolute -top-1 -right-1 bg-[#FF9900] text-white rounded-full w-3 h-3 flex items-center justify-center text-[10px] font-medium transition-transform ${
                                            animar ? "scale-150" : "scale-100"
                                        }`}
                                        style={{
                                            transition:
                                                "transform 0.3s ease-in-out",
                                        }}
                                    >
                                        {totalProductos}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className=" lg:hidden">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <a href="/quiz">Quiz</a>
                                <a href="#">
                                    <i className="fa-brands fa-whatsapp"></i>
                                </a>
                                <button
                                    onClick={() =>
                                        setMostrarCarrito(!mostrarCarrito)
                                    }
                                    className="relative"
                                >
                                    <i className="fas fa-shopping-cart"></i>
                                    <span
                                        className={`absolute -top-2 -right-2 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold transition-transform ${
                                            animar ? "scale-150" : "scale-100"
                                        }`}
                                        style={{
                                            transition:
                                                "transform 0.3s ease-in-out",
                                        }}
                                    >
                                        {totalProductos}
                                    </span>
                                </button>
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
                {/*Modal Carrito*/}
                {mostrarCarrito && (
                    <>
                        {/* Fondo oscuro (BackDrop) */}
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setMostrarCarrito(false)}
                        ></div>

                        {/* Contenedor del Modal */}
                        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col">
                            {/* Encabezado */}
                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="text-lg font-bold">
                                    Tu Carrito
                                </h2>
                                <button
                                    onClick={() => setMostrarCarrito(false)}
                                    className="text-lg font-bold"
                                >
                                    ✖
                                </button>
                            </div>

                            {/* Lista de productos con Scroll */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {carrito.length === 0 ? (
                                    <p className="text-center text-gray-500">
                                        Tu carrito está vacío
                                    </p>
                                ) : (
                                    carrito.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 border-b pb-2"
                                        >
                                            <img
                                                src={`/api/items/media/${item.image}`}
                                                alt={item.name}
                                                onError={(e) =>
                                                    (e.target.src =
                                                        "/api/cover/thumbnail/null")
                                                }
                                                className="w-16 h-16 object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold">
                                                    {item.name}
                                                </h3>
                                                <p className="text-gray-500">
                                                    S/ {item.final_price} x{" "}
                                                    {item.variations &&
                                                    item.variations.length > 0
                                                        ? item.variations.reduce(
                                                              (sum, v) =>
                                                                  sum +
                                                                  v.quantity,
                                                              0
                                                          )
                                                        : item.quantity}
                                                </p>
                                            </div>
                                            {/* 🗑️ Botón para eliminar */}
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                                                onClick={() =>
                                                    eliminarProducto(item.id)
                                                }
                                            >
                                                <Trash2 width="1rem" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Total y botón de Checkout */}
                            <div className="p-4 border-t w-full">
                                <p className="text-lg font-semibold">
                                    Total: S/ {totalPrecio.toFixed(2)}
                                </p>
                                <a
                                    href="/checkout"
                                    className="block text-center  w-full my-4 mt-2  bg-[#6048B7] text-white py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300"
                                >
                                    Finalizar Compra
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Header;
