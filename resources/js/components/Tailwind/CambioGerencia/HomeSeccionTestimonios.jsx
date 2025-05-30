import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HomeSeccionTestimonios = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);

    const testimonios = [
        {
            id: 1,
            texto: "Trabajar con Cambio Gerencia ha sido una experiencia transformadora para nuestro equipo. Su enfoque centrado en lo humano nos ha permitido redescubrir nuestro propósito organizacional y mejorar significativamente nuestro clima laboral.",
            nombre: "María González",
            cargo: "Directora de Recursos Humanos",
            empresa: "Empresa Líder S.A.",
            imagen: "/assets/img/testimonios/testimonio-1.jpg"
        },
        {
            id: 2,
            texto: "El programa de capacitación que diseñaron para nosotros fue exactamente lo que necesitábamos. Lograron entender perfectamente nuestras necesidades y crear soluciones a medida que han tenido un impacto real en nuestros indicadores de desempeño.",
            nombre: "Carlos Rodríguez",
            cargo: "Gerente General",
            empresa: "Innovación Global",
            imagen: "/assets/img/testimonios/testimonio-2.jpg"
        },
        {
            id: 3,
            texto: "Su metodología para transformar la cultura organizacional es excepcional. En menos de 6 meses hemos visto cambios sustanciales en la forma en que nuestros equipos colaboran y se comunican entre sí. Recomendamos totalmente sus servicios.",
            nombre: "Ana Martínez",
            cargo: "CEO",
            empresa: "Grupo Evolución",
            imagen: "/assets/img/testimonios/testimonio-3.jpg"
        },
    ];

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    return (
        <div className="bg-white py-16 md:py-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/4 h-1/2 bg-blue-50 rounded-full opacity-60 -translate-y-1/4 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-pink-100 rounded-full opacity-50 translate-y-1/4 -translate-x-1/4"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="flex justify-center items-center mb-4">
                        <div className="text-red-500 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                            </svg>
                        </div>
                        <h3 className="uppercase text-gray-900 text-lg font-bold">TESTIMONIOS</h3>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Lo que dicen nuestros <span className="text-blue-500">clientes</span>
                    </h2>
                    
                    <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-12">
                        Conoce las experiencias de quienes ya han trabajado con nosotros y han transformado 
                        sus organizaciones con nuestro apoyo
                    </p>
                </div>

                {/* Testimonial slider */}
                <div className="max-w-6xl mx-auto">
                    <Swiper
                        ref={swiperRef}
                        slidesPerView={1}
                        spaceBetween={30}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation, Autoplay]}
                        onSlideChange={handleSlideChange}
                        className="testimonial-swiper"
                    >
                        {testimonios.map((testimonio) => (
                            <SwiperSlide key={testimonio.id}>
                                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                                    {/* Testimonial image */}
                                    <div className="md:w-1/3 flex-shrink-0">
                                        <div className="relative">
                                            <div className="absolute inset-0 rounded-full bg-blue-500 opacity-10 transform scale-110"></div>
                                            <img 
                                                src={testimonio.imagen} 
                                                alt={testimonio.nombre} 
                                                className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover mx-auto"
                                            />
                                            <div className="absolute -bottom-2 -right-2 bg-red-500 rounded-full p-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Testimonial content */}
                                    <div className="md:w-2/3">
                                        <blockquote className="text-gray-700 text-lg md:text-xl italic mb-6">
                                            "{testimonio.texto}"
                                        </blockquote>
                                        
                                        <div className="flex flex-col">
                                            <h4 className="text-xl font-bold text-gray-900">{testimonio.nombre}</h4>
                                            <p className="text-blue-500 font-medium">{testimonio.cargo}</p>
                                            <p className="text-gray-600">{testimonio.empresa}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom pagination indicators */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonios.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => swiperRef.current?.swiper.slideTo(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === activeIndex % testimonios.length
                                        ? 'bg-blue-500 w-8'
                                        : 'bg-gray-300'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
                
                {/* CTA section */}
                <div className="mt-16 text-center">
                    <a 
                        href="/testimonios" 
                        className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors"
                    >
                        <span className="font-medium">Ver más testimonios</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Add Swiper custom styles */}
            <style jsx>{`
                :global(.testimonial-swiper .swiper-pagination-bullet) {
                    background: #e5e7eb;
                    opacity: 1;
                    width: 10px;
                    height: 10px;
                }
                
                :global(.testimonial-swiper .swiper-pagination-bullet-active) {
                    background: #3b82f6;
                    width: 24px;
                    border-radius: 10px;
                }
                
                :global(.testimonial-swiper .swiper-button-prev),
                :global(.testimonial-swiper .swiper-button-next) {
                    color: #3b82f6;
                    background: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                
                :global(.testimonial-swiper .swiper-button-prev:after),
                :global(.testimonial-swiper .swiper-button-next:after) {
                    font-size: 18px;
                }
            `}</style>
        </div>
    );
};

export default HomeSeccionTestimonios;
