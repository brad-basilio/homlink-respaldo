
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import TextWithHighlight from '../../../Utils/TextWithHighlight';

export default function BeneficiosSecctionEmpresa({data, beneficios = []}) {
    const [operationType, setOperationType] = useState('venta'); // 'compra' o 'venta'
    const [amount1, setAmount1] = useState('');
    const [amount2, setAmount2] = useState('');

    // Función para intercambiar los valores
    const handleSwap = () => {
        const temp = amount1;
        setAmount1(amount2);
        setAmount2(temp);
        // También cambiar el tipo de operación
        setOperationType(operationType === 'compra' ? 'venta' : 'compra');
    };

    // Filtrar beneficios de empresas y ordenar por order
    const beneficiosEmpresas = beneficios
        .filter(beneficio => beneficio.correlative === 'empresas' && beneficio.visible)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
        <section className="w-full bg-secondary py-16 px-[5%] font-title">
            <div className=" mx-auto flex flex-col lg:flex-row items-center gap-12">
                {/* Columna izquierda - Texto */}
                <div className="flex-1 max-w-xl">
                    <div className="uppercase text-neutral-dark text-sm font-medium tracking-[8%] mb-4">
                        BENEFICIOS
                    </div>
                    <h2 className="text-4xl lg:text-[64px] font-medium text-neutral-dark leading-[94%] mb-6">
                     
                     <TextWithHighlight  text={data?.title} color='bg-constrast font-semibold' />
                      
                    </h2>
                    <p className="text-xl text-neutral-light  max-w-md leading-relaxed">
                         <TextWithHighlight  text={data?.description} color='bg-neutral-light font-semibold' />
                       
                     
                    </p>
                </div>

                {/* Columna derecha - Swiper */}
                <div className="flex-1 w-full max-w-2xl">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.beneficios-next',
                            prevEl: '.beneficios-prev',
                        }}
                        pagination={{
                            clickable: true,
                            el: '.beneficios-pagination'
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                        }}
                        className="beneficios-swiper"
                    >
                        {beneficiosEmpresas.map((beneficio) => (
                            <SwiperSlide key={beneficio.id}>
                                <div className="relative rounded-3xl overflow-hidden h-96 group cursor-pointer">
                                    <img 
                                        src={`/api/benefit/media/${beneficio.image}`}
                                        alt={beneficio.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Overlay con gradiente */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    
                                    {/* Texto superpuesto */}
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-white text-xl font-bold leading-tight">
                                            {beneficio.name}
                                        </h3>
                                        {beneficio.description && (
                                            <p className="text-white/80 text-sm mt-2 leading-relaxed">
                                                {beneficio.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                  
                </div>
            </div>

            <style jsx>{`
                .beneficios-pagination .swiper-pagination-bullet {
                    width: 12px;
                    height: 12px;
                    background: rgba(45, 55, 72, 0.3);
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                
                .beneficios-pagination .swiper-pagination-bullet-active {
                    background: #2D3748;
                    transform: scale(1.2);
                }
            `}</style>
        </section>
    )
}

