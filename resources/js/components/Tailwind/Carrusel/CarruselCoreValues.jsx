import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import { adjustTextColor } from "../../../Functions/adjustTextColor";
import { Autoplay } from "swiper/modules";
import TextWithHighlight from "../../../Utils/TextWithHighlight";

const CarruselCoreValues = ({ items, data }) => {

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

            <div className="bg-secondary relative ">
                <div className="absolute bottom-0 left-0 w-full ">
                    <svg width="333" height="293" viewBox="0 0 333 293" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M330.525 318.574C314.682 316.83 291.576 312.754 265.567 302.24C219.832 283.753 191.981 256.215 172.923 236.988C150.127 213.991 132.157 195.861 122.148 165.441C121.363 163.058 98.381 118.725 123.976 91.9092C149.575 65.0891 186.916 89.413 192.3 130.73C197.685 172.047 181.513 194.315 161.93 209.841C134.152 231.865 98.3692 230.116 70.7721 226.421C-49.6372 210.291 -111.71 138.187 -226.987 90.777C-288.72 65.3884 -440.394 -13.3762 -532 26.4755" stroke="#7E5AFB" stroke-width="29.8691" stroke-miterlimit="10" />
                    </svg>


                    {/* <img
                    src="/assets/cambiogerencia/mask-nosotros.webp"
                    alt="Equipo de Cambio Gerencia"
                    className="w-full h-auto object-cover rounded-xl"
                    style={{ WebkitMaskImage: 'none' }}
                />*/}
                </div>
                <div className="mx-auto px-[5%] 2xl:pl-[5%] ">
                    <div className="relative flex flex-col lg:flex-row items-center justify-center">


                        <div className="w-[800px] overflow-hidden">
                            <img src="/assets/cambiafx/beneficio-person.webp" alt="Empresas" className="h-[600px] object-cover w-auto" />

                        </div>

                        <div className="max-w-3xl">

                            <div className="flex items-center mb-4">
                       
                                <h3 className="uppercase text-neutral-dark text-sm font-medium">¿Por qué elegir Cambia FX?</h3>
                            </div>

                            <h2 className="text-4xl lg:text-[60px] font-medium mb-6 leading-[94%] max-w-lg ">
                                <TextWithHighlight text="Beneficios de usar *Cambia FX*" color="bg-neutral-dark font-semibold" />

                            </h2>
                            <p className="text-neutral-light text-lg mb-6 max-w-xl whitespace-pre-line" >
                                Confianza, agilidad y tecnología para tu cambio de divisas. En Cambia FX conectamos personas y empresas con soluciones financieras que optimizan el cambio de dólares y soles. Nuestro compromiso es ofrecer operaciones rápidas, seguras y sin complicaciones.
                            </p>
                      


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
                                    640: { slidesPerView: 2.3 },
                                    1024: {
                                        slidesPerView: 2.3,

                                    },
                                }}
                                className="w-full  !flex !justify-between"
                            >
                                {items.map((value, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="w-full flex bg-primary rounded-xl p-4 flex-col items-start" key={index}>
                                            <div className="bg-constrast rounded-full p-3 mr-4">
                                                <img
                                                    src={`/api/core_value/media/${value?.image}`}
                                                    alt={value?.name}
                                                    className="w-6 h-6 object-cover rounded-xl"
                                                />

                                            </div>
                                            <h3 className="text-neutral-dark text-xl font-medium mt-4 mb-1">{value?.name}</h3>
                                            <p className="text-neutral-light text-base font-light">{value?.description}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                   
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarruselCoreValues;
