// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";

export default function TestimonioSection() {
    const services = [
        {
            name: "Mario Torres",
            dir: "Lima, Perú",
            image: "/assets/img/testimonioSection/Ellipse 293 (1).png",
            description:
                "Llegué con mucho dolor después de mi cirugía y en pocas sesiones noté una gran mejoría. El equipo fue muy profesional y atento, adaptando cada ejercicio a mi ritmo. Hoy me siento más fuerte y con mayor movilidad. ¡Gracias por ayudarme a recuperar mi bienestar!",
        },
        {
            name: "Mario Torres",
            dir: "Lima, Perú",
            image: "/assets/img/testimonioSection/Ellipse 293 (1).png",
            description:
                "Llegué con mucho dolor después de mi cirugía y en pocas sesiones noté una gran mejoría. El equipo fue muy profesional y atento, adaptando cada ejercicio a mi ritmo. Hoy me siento más fuerte y con mayor movilidad. ¡Gracias por ayudarme a recuperar mi bienestar!",
        },
        {
            name: "Mario Torres",
            dir: "Lima, Perú",
            image: "/assets/img/testimonioSection/Ellipse 293 (1).png",
            description:
                "Llegué con mucho dolor después de mi cirugía y en pocas sesiones noté una gran mejoría. El equipo fue muy profesional y atento, adaptando cada ejercicio a mi ritmo. Hoy me siento más fuerte y con mayor movilidad. ¡Gracias por ayudarme a recuperar mi bienestar!",
        },
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div className=" mt-0  font-poppins">
            <div className="max-w-md mx-auto px-4 py-4 lg:max-w-3xl lg:mt-4">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 1, spaceBetween: 10 },
                        1024: { slidesPerView: 1, spaceBetween: 0 },
                    }}
                    modules={[Navigation, Pagination]}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                    {services.map((testimonio, index) => (
                        <SwiperSlide key={index}>
                            <div className=" gap-4 w-full my-6 relative h-[400px] lg:h-max">
                                <img
                                    className="absolute -z-10 mt-10 lg:left-1/2 lg:-translate-x-1/2"
                                    src="/assets/img/testimonioSection/Ellipse.png"
                                />
                                <div className=" flex items-center justify-center flex-col">
                                    <img
                                        className="w-20 h-20 rounded-full"
                                        src={testimonio.image}
                                    />
                                    <p className="text-xl mt-6 text-center lg:text-[22px]">
                                        {testimonio.description}
                                    </p>
                                    <p className="text-center text-2xl text-[#224483] mt-10 font-semibold lg:hidden">
                                        {testimonio.name}
                                    </p>
                                    <p className="text-[#242424A3]  text-center lg:hidden">
                                        {testimonio.dir}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Paginacion personalizada */}
                <div className="flex justify-center gap-2 mt-10">
                    {services.map((_, index) => (
                        <button
                            key={index}
                            className={`rounded-full transition-all duration-300 ${
                                index === activeIndex
                                    ? "bg-[#224483] w-[20px] h-[12px] "
                                    : "bg-[#22448366] w-[12px] h-[12px] "
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
