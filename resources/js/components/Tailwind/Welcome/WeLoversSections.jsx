import React, { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import TestimonyRest from "../../../actions/TestimonyRest";

const testimonials = [
    { image: "https://i.ibb.co/Q3FDFsbt/image.png" },
    { image: "https://i.ibb.co/dHGmtkf/dfaabe6966459462e61bf7aef70f58b4.png" },
    { image: "https://i.ibb.co/3mhCpVtC/image.png" },
    { image: "https://i.ibb.co/dHGmtkf/dfaabe6966459462e61bf7aef70f58b4.png" },
    { image: "https://i.ibb.co/3mhCpVtC/image.png" },
];

const WeLoversSection = ({ we_lovers }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="py-8 px-4 bg-gradient-to-b from-[#6745BA] to-[#522EAA]">
            <div className="md:max-w-4xl 2xl:max-w-6xl mx-auto text-center text-white">
                <h2 className="hidden text-white text-center md:text-[45.41px] 2xl:text-[55.41px]    2xl:leading-[83.11px] tracking-[0.01em] font-bold md:mb-8 2xl:mb-12 lg:flex items-center justify-center gap-2">
                    Nuestras weLovers{" "}
                    <img
                        src="/assets/img/emojis/stars.png"
                        alt=""
                        className="h-12"
                    />
                    <span className="whitespace-nowrap">lo afirman</span>
                    <img
                        src="/assets/img/emojis/stars.png"
                        alt=""
                        className="h-12"
                    />
                </h2>
                <h2 className="lg:hidden text-white text-center md:text-[45.41px] 2xl:text-[55.41px]    2xl:leading-[83.11px] tracking-[0.01em] font-bold md:mb-8 2xl:mb-12  items-center justify-center gap-2">
                    Nuestras weLovers <br />
                    <span className="flex w-full items-center justify-center gap-2">
                        <img
                            src="/assets/img/emojis/stars.png"
                            alt=""
                            className="h-8 sm:h-12"
                        />
                        <span className="whitespace-nowrap">lo afirman</span>
                        <img
                            src="/assets/img/emojis/stars.png"
                            alt=""
                            className="h-8 sm:h-12"
                        />
                    </span>
                </h2>

                {/* Swiper for Desktop */}
                <div className="hidden lg:block max-w-[60rem] mx-auto relative mt-10">
                    <Swiper
                        navigation={{
                            prevEl: ".custom-prev",
                            nextEl: ".custom-next",
                        }}
                        slidesPerView={1.5}
                        spaceBetween={10}
                        centeredSlides={true}
                        loop={true}
                        breakpoints={{
                            640: { slidesPerView: 2.5, spaceBetween: 10 },
                            1024: { slidesPerView: 3, spaceBetween: 0 },
                        }}
                        className="testimonialSwiper"
                        modules={[Navigation, Pagination]}
                        onSlideChange={(swiper) =>
                            setActiveIndex(swiper.realIndex)
                        }
                    >
                        {we_lovers.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="pb-10">
                                    <div
                                        className={`relative rounded-[29.44px] overflow-hidden w-[300px] h-[500px] transition-all duration-300 ${
                                            index === activeIndex
                                                ? "scale-100 opacity-100"
                                                : "scale-90 opacity-50"
                                        }`}
                                        style={{
                                            boxShadow:
                                                "6.9px 7.77px 20.2px 0px #0000004D",
                                        }}
                                    >
                                        <iframe
                                            className="w-full h-full "
                                            src={`https://www.youtube.com/embed/${testimonial.description}`}
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerpolicy="strict-origin-when-cross-origin"
                                            allowfullscreen
                                        ></iframe>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* Botones de navegación personalizados */}
                    <div className="absolute top-1/2 left-[-40px] transform -translate-y-1/2 custom-prev cursor-pointer">
                        <img
                            src="/assets/img/swiper/right.png"
                            className="rotate-180 brightness-0 grayscale invert"
                        />
                    </div>

                    <div className="absolute top-1/2 right-[-40px] 2xl:right-[-25px] transform -translate-y-1/2 custom-next cursor-pointer">
                        <img
                            src="/assets/img/swiper/right.png"
                            className="brightness-0 grayscale invert"
                        />
                    </div>

                    {/* Paginacion personalizada */}
                    <div className="flex justify-center gap-2 mt-0 mb-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`w-[10.5px] h-[10.5px] rounded-full transition-all duration-300 ${
                                    index === activeIndex
                                        ? "bg-white opacity-100"
                                        : "bg-white opacity-20"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile View */}
                <div className="block lg:hidden w-max mx-auto mt-6">
                    <div className="flex gap-2 sm:gap-4">
                        {/* Thumbnails */}
                        <div className="flex flex-col gap-2">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer w-[70px] h-[70px] sm:w-[115px] sm:h-[128px] rounded-lg overflow-hidden"
                                    onClick={() =>
                                        (document.getElementById(
                                            "mainImage"
                                        ).src = testimonial.image)
                                    }
                                >
                                    <img
                                        src={testimonial.image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="">
                            <div className="w-[250px] sm:w-[386px] sm:h-[680px] rounded-2xl overflow-hidden bg-white shadow-md">
                                <img
                                    id="mainImage"
                                    src={testimonials[0].image}
                                    alt="Main Image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeLoversSection;
