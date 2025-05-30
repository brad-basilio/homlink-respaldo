import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import { adjustTextColor } from "../../../Functions/adjustTextColor";
import { Autoplay } from "swiper/modules";

const CarruselBrands = ({ items, data }) => {

    const swiperRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [maxHeight, setMaxHeight] = useState(0);

    // Adjust button colors


    // Handle image loading and height calculation
    const handleImagesLoad = () => {
        const imageElements = document.querySelectorAll('.brand-logo');
        let loadedImages = 0;
        let maxImageHeight = 0;

        imageElements.forEach(img => {
            if (img.complete) {
                loadedImages++;
                maxImageHeight = Math.max(maxImageHeight, img.naturalHeight);
            }
        });

        if (loadedImages === imageElements.length) {
            setMaxHeight(maxImageHeight);
            setImagesLoaded(true);
        }
    };

    return (
        <div>

            <div className="bg-constrast py-6 md:py-8">
                <div className="mx-auto px-[5%] 2xl:pl-[5%] ">
                    <div className="relative flex flex-col lg:flex-row items-center justify-center">

                        <h2 className="text-lg leading-tight md:text-lg text-start font-semibold font-title  text-white ">
                            {data?.title}
                        </h2>

                        <Swiper
                            modules={[Autoplay]}
                          
autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            spaceBetween={30}
                            slidesPerView={1.5}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            breakpoints={{
                                640: { slidesPerView: 3 },
                                1024: {
                                    slidesPerView: 3.3,
                                    centeredSlides: true,
                                },
                            }}
                            className="w-full  !flex !justify-between"
                        >
                            {items.filter((brand) => brand.image).map((brand, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        className="group w-full flex items-center justify-center px-2 font-font-secondary"
                                        style={{ height: imagesLoaded ? '80px' : 'auto' }}
                                    >
                                        <img
                                            src={`/api/brands/media/${brand.image}`}
                                            alt={brand.name}
                                            className="brand-logo max-h-[60px] w-auto object-contain grayscale brightness-0 invert hover:scale-105 transition-transform cursor-pointer"
                                            onLoad={handleImagesLoad}
                                            style={{
                                                maxWidth: '100%',
                                                objectFit: 'contain',
                                                objectPosition: 'center'
                                            }}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/*    <button
                            ref={nextSlideRef}
                            className="absolute -right-2 z-10 p-2 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform"
                            aria-label="Next brand"
                        >
                            <svg
                                className="h-4 w-4 customtext-neutral-dark"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarruselBrands;
