import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";

export default function TratamientoSection({
    services,
    landingServices,
    setIsModalOpen,
    isModalOpen,
}) {
    return (
        <div className=" mt-0 font-poppins">
            <div className="max-w-md mx-auto px-4 py-4 lg:hidden">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    breakpoints={{
                        0: { slidesPerView: 1.1, spaceBetween: 10 },
                        640: { slidesPerView: 1, spaceBetween: 10 },
                        1024: { slidesPerView: 3, spaceBetween: 0 },
                    }}
                >
                    {services.map((service, index) => (
                        <SwiperSlide key={index}>
                            <a
                                href={`/services?slug=${service?.slug}`}
                                className=" flex gap-4  my-6 w-[295px] h-[430px] relative "
                            >
                                <img
                                    src={`/api/service/media/${service?.image}`}
                                    alt={service?.title}
                                    className="w-[295px] h-[430px] rounded-3xl object-cover"
                                />
                                <div class="absolute rounded-3xl inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.56)_23.61%] to-[rgba(0,0,0,0)_64.76%]"></div>
                                <h2 className="text-white font-medium absolute top-8 left-8 inset-0 text-2xl line-clamp-3 w-8/12">
                                    {service?.title.split(" ")[0]}
                                    <br />
                                    {service?.title
                                        .split(" ")
                                        .slice(1)
                                        .join(" ")}
                                </h2>
                                <div className="absolute bottom-8 right-8">
                                    <a href={`/services?slug=${service?.slug}`}>
                                        <img
                                            src="/assets/img/icons/circle-right.svg"
                                            className="cursor-pointer"
                                        />
                                    </a>
                                </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="hidden lg:block font-poppins lg:px-[5%] lg:max-w-[82rem] lg:mx-auto">
                <div className="lg:grid lg:grid-cols-4 lg:gap-6 lg:mt-10">
                    {/* Primer bloque: 2 imágenes grandes */}
                    {services.slice(0, 2).map((service, index) => (
                        <a
                            href={`/services?slug=${service?.slug}`}
                            key={`large-${index}`}
                            className="relative h-[410px] overflow-hidden rounded-3xl group" // Agregamos group para hover
                        >
                            {/* Contenedor para la imagen animada */}
                            <motion.div
                                className="w-full h-full"
                                initial={false}
                                whileHover={{
                                    scale: 1.1,
                                    transition: {
                                        duration: 0.3,
                                        ease: "easeOut",
                                    },
                                }}
                                style={{ willChange: "transform" }}
                            >
                                <img
                                    src={`/api/service/media/${service?.image}`}
                                    alt={service?.title}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Overlay y contenido - ahora con pointer-events-none */}
                            <div className="pointer-events-none absolute inset-0">
                                {index === 0 ? (
                                    <>
                                        <div className="absolute rounded-3xl inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.56)_23.61%] to-[rgba(0,0,0,0)_64.76%]"></div>
                                        <h2 className="text-white font-medium absolute top-8 left-8 text-2xl line-clamp-2">
                                            {service?.title}
                                        </h2>
                                        <div className="absolute bottom-8 right-8">
                                            <img
                                                src="/assets/img/icons/circle-right.svg"
                                                className="cursor-pointer pointer-events-auto" // Solo el icono es clickeable
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute rounded-3xl inset-0 bg-gradient-to-tr from-[rgba(0,0,0,0.56)_23.61%] to-[rgba(0,0,0,0)_64.76%]"></div>
                                        <h2 className="text-white font-medium absolute bottom-8 right-8 left-8 text-2xl line-clamp-2">
                                            {service?.title}
                                        </h2>
                                        <div className="absolute top-8 right-8">
                                            <img
                                                src="/assets/img/icons/circle-right.svg"
                                                className="cursor-pointer pointer-events-auto" // Solo el icono es clickeable
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </a>
                    ))}

                    {/* Segundo bloque: 2 imágenes verticales (si hay al menos 3 servicios) */}
                    {services.length >= 3 && (
                        <div className="col-span-2 flex flex-col gap-6 h-full">
                            {services.slice(2, 4).map((service, index) => (
                                <a
                                    href={`/services?slug=${service?.slug}`}
                                    key={`vertical-${index}`}
                                    className="relative h-[195px] overflow-hidden rounded-3xl group"
                                >
                                    <div className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-110">
                                        <img
                                            src={`/api/service/media/${service?.image}`}
                                            alt={service?.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute rounded-3xl inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.56)_23.61%] to-[rgba(0,0,0,0)_64.76%]"></div>
                                        <h2 className="text-white max-w-[15rem] font-medium absolute top-8 right-8 left-8 text-2xl line-clamp-2">
                                            {service?.title.split(" ")[0]}
                                            <br />
                                            {service?.title
                                                .split(" ")
                                                .slice(1)
                                                .join(" ")}
                                        </h2>
                                        <div className="absolute bottom-8 right-8">
                                            <img
                                                src="/assets/img/icons/circle-right.svg"
                                                className="cursor-pointer pointer-events-auto"
                                            />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Tercer bloque: imagen horizontal + CTA (si hay al menos 5 servicios) */}
                    {services.length >= 5 && (
                        <div className="col-span-4 flex gap-6 mt-6">
                            <a
                                href={`/services?slug=${services[4]?.slug}`}
                                className="w-8/12 relative h-[300px] overflow-hidden rounded-3xl group"
                            >
                                {/* Contenedor animado para la imagen */}
                                <motion.div
                                    className="w-full h-full"
                                    initial={false}
                                    whileHover={{
                                        scale: 1.1,
                                        transition: {
                                            duration: 0.3,
                                            ease: "easeOut",
                                        },
                                    }}
                                    style={{ willChange: "transform" }}
                                >
                                    <img
                                        src={`/api/service/media/${services[4].image}`}
                                        alt={services[4].title}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </motion.div>

                                {/* Overlay y contenido */}
                                <div className="pointer-events-none absolute inset-0">
                                    <div className="absolute rounded-3xl inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.56)_23.61%] to-[rgba(0,0,0,0)_64.76%]"></div>
                                    <h2 className="text-white max-w-[15rem] font-medium absolute top-8 right-8 left-8 text-2xl line-clamp-2">
                                        {services[4].title.split(" ")[0]}
                                        <br />
                                        {services[4].title
                                            .split(" ")
                                            .slice(1)
                                            .join(" ")}
                                    </h2>
                                    <div className="absolute bottom-8 right-8">
                                        <img
                                            src="/assets/img/icons/circle-right.svg"
                                            className="cursor-pointer pointer-events-auto"
                                        />
                                    </div>
                                </div>
                            </a>
                            <div className="w-4/12 h-[300px]">
                                <div className="bg-[#F8F8F8] rounded-3xl h-[300px] p-8">
                                    <h2 className="text-[36px] font-medium leading-[102%] w-9/12">
                                        {landingServices.description}
                                    </h2>
                                    <div className="w-full flex items-center justify-end mt-10">
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="mt-5 bg-white text-[#242424] py-1 pl-1 pr-3 gap-2 rounded-full flex items-center"
                                        >
                                            <div className="bg-[#224483] w-12 p-2 rounded-full">
                                                <img
                                                    src="/assets/img/icons/calendar-check.png"
                                                    className="h-auto"
                                                />
                                            </div>
                                            Reservar una cita
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Caso para cuando hay menos de 5 servicios */}
                    {services.length < 5 && (
                        <div className="col-span-4 flex gap-6 mt-6">
                            <div className="w-full">
                                <div className="bg-[#F8F8F8] rounded-3xl h-[300px] p-8 flex flex-col justify-between">
                                    <h2 className="text-[36px] font-medium leading-[102%] w-9/12">
                                        {landingServices.description}
                                    </h2>
                                    <div className="w-full flex items-center justify-end">
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="bg-white text-[#242424] py-1 pl-1 pr-3 gap-2 rounded-full flex items-center"
                                        >
                                            <div className="bg-[#224483] w-12 p-2 rounded-full">
                                                <img
                                                    src="/assets/img/icons/calendar-check.png"
                                                    className="h-auto"
                                                />
                                            </div>
                                            Reservar una cita
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
