import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const AboutSeccionTestimonios = ({ data, testimonials = [] }) => {
    // Datos de prueba mientras no lleguen de la DB
    const defaultTestimonials = [
        {
            quote: "Homlynk transformó por completo la visibilidad de nuestros anuncios. Ahora tenemos más reservas y mejores comentarios.",
            name: "Robert Fox",
            position: "CEO de UrbanNest",
            avatar: "/images/avatar-1.jpg"
        },
        {
            quote: "Gracias a Homlynk, logré posicionar mi departamento en el top de búsquedas. Sus consejos de mejora fueron claves.",
            name: "Linda Jackson",
            position: "Anfitriona en Miraflores",
            avatar: "/images/avatar-2.jpg"
        },
        {
            quote: "El equipo de Homlynk nos ayudó a optimizar nuestras publicaciones y aumentar nuestras reservas en un 60% en solo 3 meses.",
            name: "Carlos Mendoza",
            position: "Propietario de ApartSuite",
            avatar: "/images/avatar-3.jpg"
        },
        {
            quote: "Increíble trabajo en fotografía profesional. Nuestros anuncios ahora se ven espectaculares y recibimos más consultas.",
            name: "María González",
            position: "Host en San Isidro",
            avatar: "/images/avatar-4.jpg"
        }
    ];

    // Usar datos de la DB si existen, sino usar datos de prueba
    const testimonialsData = testimonials.length > 0 ? testimonials : defaultTestimonials;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            className="relative overflow-hidden bg-[#EEF3FE] py-16 px-[5%] font-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <motion.div
                className="relative z-10  mx-auto"
                variants={containerVariants}
            >
                {/* Título principal */}
                <motion.div
                    className=" mb-12"
                    variants={titleVariants}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-neutral-dark mb-6">
                        {data?.title || "Lo que dicen nuestros clientes"}
                    </h2>
                    {data?.description && (
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            {data.description}
                        </p>
                    )}
                </motion.div>

                {/* Swiper de testimonios */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        pagination={{
                            clickable: true,
                            bulletClass: 'swiper-pagination-bullet testimonial-bullet',
                            bulletActiveClass: 'swiper-pagination-bullet-active testimonial-bullet-active',
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 50,
                            }
                        }}
                        className="testimonials-swiper !pb-20"
                    >
                        {testimonialsData.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <motion.div
                                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full group"
                                    whileHover={{
                                        y: -5,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    {/* Quote */}
                                    <div className="mb-6">
                                        <svg
                                            className="w-8 h-8 text-blue-500 mb-4 opacity-50"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                        </svg>
                                        <p className="text-gray-800 text-lg leading-relaxed font-medium">
                                            {testimonial.quote}
                                        </p>
                                    </div>

                                    {/* Author info */}
                                    <div className="flex items-center">
                                        <motion.div
                                            className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 flex-shrink-0"
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.3 }
                                            }}
                                        >
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback para avatares que no existen
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=4F46E5&color=fff&size=48`;
                                                }}
                                            />
                                        </motion.div>
                                        <div>
                                            <h4 className="font-bold text-neutral-dark group-hover:text-blue-600 transition-colors duration-300">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-gray-600 text-sm">
                                                {testimonial.position}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Decoración */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-10 translate-x-10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>


            </motion.div>

            {/* Estilos personalizados para la paginación */}
            <style jsx>{`
                .testimonials-swiper .testimonial-bullet {
                    width: 12px !important;
                    height: 12px !important;
                    background: #cbd5e1 !important;
                    opacity: 1 !important;
                    margin: 0 8px !important;
                    transition: all 0.4s ease !important;
                    border-radius: 6px !important;
                }
                
                .testimonials-swiper .testimonial-bullet-active {
                    width: 20px !important;
                    background: #3b82f6 !important;
                    transform: none !important;
                    border-radius: 10px !important;
                }
                
                .testimonials-swiper .swiper-pagination {
                    bottom: -10px !important;
                    position: relative !important;
                    margin-top: 30px !important;
                }
            `}</style>
        </motion.div>
    );
};

export default AboutSeccionTestimonios;