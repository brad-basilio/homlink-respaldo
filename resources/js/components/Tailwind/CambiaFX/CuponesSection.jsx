import TextWithHighlight from "../../../Utils/TextWithHighlight";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Estilos CSS personalizados para el slider
const swiperStyles = `
    .cupones-swiper .swiper-slide {
        height: auto;
        display: flex;
    }
    .cupones-swiper .swiper-wrapper {
        align-items: stretch;
    }
`;

const CuponesSection = ({ data,cupones }) => {
    // Función para formatear fecha de YYYY-MM-DD a DD/MM/YYYY
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return (
        <>
            <style>{swiperStyles}</style>
            <section className="relative bg-secondary overflow-hidden font-title px-2 md:px-0 w-full">
            {/* Fondo decorativo */}
            <div className="absolute top-0 right-0 translate-x-[20%] w-full h-full z-0 pointer-events-none">
                <img src="/assets/cambiafx/cupon-overlay.png" alt="Fondo" className=" h-full object-cover pb-16" />
            </div>
            <div className="px-[5%] mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-8">
                {/* Columna izquierda: textos y cupones */}
                <div className="flex-1 min-w-max flex flex-col justify-center items-start gap-6">
                    <div>
                        <div className="uppercase text-neutral-light text-sm font-medium tracking-widest mb-2">Cupones</div>
                        <h2 className="text-5xl md:text-[64px] font-medium text-neutral-dark leading-[94%] mb-2"><TextWithHighlight text={data?.title} color='bg-neutral-dark font-semibold' split_coma /></h2>
                        <p className="text-lg text-neutral-light mb-4 max-w-lg">{data?.description || ""}</p>
                        <div className="text-2xl font-medium text-neutral-dark mb-4">{data?.subtitle || ""}</div>
                    </div>
                    {/* Cupones Slider */}
                    <div className="w-full max-w-[680px] mt-2 overflow-hidden">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={24}
                            slidesPerView={2}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            loop={cupones?.length > 2}
                            className="cupones-swiper"
                            watchOverflow={true}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 16,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 24,
                                }
                            }}
                        >
                            {cupones?.map((cupon, index) => (
                                <SwiperSlide key={cupon.id || index}>
                                    <div className={`${index % 2 === 0 ? 'bg-constrast' : 'bg-white'} rounded-2xl w-full max-h-max flex flex-col justify-between relative shadow-lg`}>
                                        <div className="flex p-6 justify-between items-center gap-2 border-b-4 border-dashed">
                                            <img 
                                                src="/assets/cambiafx/cupon-fx.png" 
                                                alt="FX" 
                                                className={`w-auto min-h-6 max-h-6 object-cover ${index % 2 !== 0 ? 'invert' : ''}`} 
                                            />
                                            <span className={`uppercase ${index % 2 === 0 ? 'text-white' : 'text-neutral-dark'} text-xs tracking-widest font-semibold`}>
                                                Cuponera
                                            </span>
                                        </div>
                                        <div className="flex-1 p-6 flex flex-col justify-center items-center">
                                            <div className={`uppercase ${index % 2 === 0 ? 'text-white' : 'text-neutral-dark'} text-xs font-medium tracking-widest mb-1`}>
                                                Cupón
                                            </div>
                                            <div className={`text-2xl md:text-3xl font-bold ${index % 2 === 0 ? 'text-white' : 'text-constrast'}`}>
                                                {cupon.name}
                                            </div>
                                            <div className={`text-xs ${index % 2 === 0 ? 'text-white' : 'text-neutral-light'} mt-1`}>
                                                Válido hasta el {formatDate(cupon.date_end)}
                                            </div>
                                        </div>
                                        <div className="absolute -left-3 bottom-1/4 -translate-y-1/4 w-6 h-6 bg-secondary rounded-full"></div>
                                        <div className="absolute -right-3 bottom-1/4 -translate-y-1/4 w-6 h-6 bg-secondary rounded-full"></div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="mt-0 text-neutral-light text-lg relative">
                        Cupones del <span className="text-constrast font-semibold ">mes</span> <span className="inline-block ml-2 align-middle absolute -top-2"><svg width="52" height="29" viewBox="0 0 52 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_6_1362)">
                                <path d="M3.62723 25.3076C25.8698 29.5474 45.2141 15.3486 47.0437 1.62064" stroke="#222222" stroke-width="1.77739" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M42.999 4.76542L47.0439 1.62088L48.7276 6.44567" stroke="#222222" stroke-width="1.77739" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_6_1362">
                                    <rect width="49.065" height="21.4709" fill="white" transform="matrix(0.990255 -0.139269 -0.139269 -0.990255 3.18945 28.5732)" />
                                </clipPath>
                            </defs>
                        </svg>
                        </span>
                    </div>
                </div>
                {/* Columna derecha: imagen */}
                <div className="flex-1 flex pt-12 justify-center items-center">
                    <img src={`/api/landing_home/media/${data?.image}`} alt={data?.title} className="h-full w-auto object-cover z-10" onError={(e) =>
                    (e.target.src =
                        "/api/cover/thumbnail/null")
                    } />
                </div>

            </div>
        </section>
        </>
    );
}
export default CuponesSection;