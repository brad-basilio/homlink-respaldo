import React, { useState, useEffect } from 'react';
import CreateReactScript from './Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import { CarritoProvider } from './context/CarritoContext';
import Base from './Components/Tailwind/Base';
import Header from './components/Tailwind/Header';
import DestacadosSection from './components/Tailwind/Sections/DestacadosSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Global from './Utils/Global';
import GeneralRest from './actions/GeneralRest';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Footer from './components/Tailwind/Footer';

const PropertyDetail = ({ property: initialProperty, otherProperties: initialOtherProperties, otherPropertiesTitle: initialTitle }) => {
    const [property, setProperty] = useState(initialProperty);
    const [otherProperties, setOtherProperties] = useState(initialOtherProperties || []);
    const [otherPropertiesTitle, setOtherPropertiesTitle] = useState(initialTitle || "Otros departamentos que te pueden gustar");
    const [loading, setLoading] = useState(false);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [whatsappPhone, setWhatsappPhone] = useState(null);

    const {
        title,
        platform,
        price_per_night,
        currency,
        address,
        department,
        province,
        district,
        city,
        country,
        bedrooms,
        bathrooms,
        max_guests,
        area_m2,
        description,
        short_description,
        main_image,
        gallery,
        rating,
        reviews_count,
        amenities,
        services,
        characteristics,
        house_rules,
        check_in_info,
        latitude,
        longitude,
        slug,
        active,
        featured,
        availability_status
    } = property || {};

    // Declarar allImages aquí para que esté disponible en useEffect
    const allImages = [main_image, ...(gallery || [])].filter(Boolean);

    useEffect(() => {
        if (initialProperty) {
            setProperty(initialProperty);
        }
        if (initialOtherProperties) {
            setOtherProperties(initialOtherProperties);
        }
        if (initialTitle) {
            setOtherPropertiesTitle(initialTitle);
        }
    }, [initialProperty, initialOtherProperties, initialTitle]);

    // Cargar datos de WhatsApp desde generals
    useEffect(() => {
        const fetchWhatsAppData = async () => {
            try {
                const generalRest = new GeneralRest();
                generalRest.enableNotifications = false;
                
                const data = await generalRest.getAboutuses();
                
                if (data?.generals) {
                    const phoneData = data.generals.find(item => 
                        item.correlative === 'whatsapp_phone'
                    );
                    setWhatsappPhone(phoneData?.description || null);
                }
            } catch (error) {
                console.error('Error al cargar datos de WhatsApp:', error);
            }
        };

        fetchWhatsAppData();
    }, []);

    // Función para manejar la reserva por WhatsApp
    const handleWhatsAppReservation = () => {
        if (!whatsappPhone) {
            alert('No se ha configurado un número de WhatsApp para reservas');
            return;
        }

        const propertyInfo = `${title} - ${[address, district, city].filter(Boolean).join(', ')}`;
        const dates = checkIn && checkOut ? `\nFechas: ${checkIn} a ${checkOut}` : '';
        const guestInfo = `\nHuéspedes: ${guests}`;
        const priceInfo = `\nPrecio: ${currency}/${parseFloat(price_per_night).toFixed(0)} por noche`;
        
        const message = `¡Hola! Me interesa reservar esta propiedad:\n\n${propertyInfo}${dates}${guestInfo}${priceInfo}\n\n¿Podrían ayudarme con la reserva?`;
        
        const cleanPhone = whatsappPhone.replace(/[^\d+]/g, '');
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando propiedad...</p>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Propiedad no encontrada</h1>
                    <p className="text-gray-600">La propiedad que buscas no existe o ha sido eliminada.</p>
                </div>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-white">
            <Header/>
            {/* Container principal */}
            <div className=" mx-auto px-[5%]  py-8">{/* Título y ubicación */}
                {/* Título y ubicación */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
                    <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{[address, district, city, province, department].filter(Boolean).join(', ')}</span>
                    </div>
                </div>

                {/* Swiper de imágenes en loop */}
                <div className="mb-8">
                    <style jsx>{`
                        .property-swiper .swiper-pagination-bullet {
                            width: 8px !important;
                            height: 8px !important;
                            background: white !important;
                            opacity: 0.7 !important;
                            transition: all 0.3s ease !important;
                            margin: 0 4px !important;
                        }
                        .property-swiper .swiper-pagination-bullet-active {
                            width: 20px !important;
                            height: 8px !important;
                            border-radius: 12px !important;
                            opacity: 1 !important;
                            background: white !important;
                        }
                    `}</style>
                    <div className="relative h-96 rounded-xl overflow-hidden group">
                        {allImages.length > 0 ? (
                            <Swiper
                                modules={[Pagination, Navigation, Autoplay]}
                                spaceBetween={0}
                                slidesPerView={1}
                                loop={allImages.length > 1}
                                autoplay={allImages.length > 1 ? {
                                    delay: 4000,
                                    disableOnInteraction: false,
                                } : false}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={{
                                    nextEl: '.property-swiper-button-next',
                                    prevEl: '.property-swiper-button-prev',
                                }}
                                onSlideChange={(swiper) => {
                                    setCurrentImageIndex(swiper.realIndex);
                                }}
                                className="property-swiper h-full w-full"
                            >
                                {allImages.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={image ? `/api/property/media/${image}` : '/assets/images/property-placeholder.jpg'}
                                            alt={`${title} - Vista ${index + 1}`}
                                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                                            onClick={() => setShowAllPhotos(true)}
                                            onError={(e) => {
                                                e.target.src = '/assets/images/property-placeholder.jpg';
                                            }}
                                        />
                                    </SwiperSlide>
                                ))}
                                
                                {/* Navigation arrows - solo mostrar si hay más de 1 imagen */}
                                {allImages.length > 1 && (
                                    <>
                                        <div className="property-swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-all opacity-0 group-hover:opacity-100 shadow-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </div>
                                        <div className="property-swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-all opacity-0 group-hover:opacity-100 shadow-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </>
                                )}
                                
                                {/* Image counter */}
                                {allImages.length > 1 && (
                                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-20">
                                        {currentImageIndex + 1} / {allImages.length}
                                    </div>
                                )}
                            </Swiper>
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <p className="text-gray-500">No hay imágenes disponibles</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Layout con columnas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Columna principal */}
                    <div className="lg:col-span-2">
                        {/* Información básica con íconos */}
                        <div className="mb-8 pb-8 border-b border-gray-200">
                            <div className="flex items-center space-x-8 mb-6">
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                                    </svg>
                                    <span>{max_guests || 4} huéspedes</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                                    </svg>
                                    <span>{bedrooms || 2} habitaciones</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd"/>
                                    </svg>
                                    <span>{bathrooms || 2} baños</span>
                                </div>
                                {area_m2 && (
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                        <span>{area_m2} m²</span>
                                    </div>
                                )}
                            </div>

                            {/* Rating */}
                            {rating && (
                                <div className="flex items-center">
                                    <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full mr-4">
                                        <svg className="w-4 h-4 text-yellow-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-bold text-yellow-900">{rating}</span>
                                    </div>
                                    <span className="text-gray-600">({reviews_count || 0} reseñas)</span>
                                    <span className="ml-4 text-gray-600">{[district, city, department].filter(Boolean).join(', ')}</span>
                                </div>
                            )}
                        </div>

                        {/* Descripción */}
                        <div className="mb-8 pb-8 border-b border-gray-200">
                            <p className="text-gray-700 leading-relaxed">
                                {description || short_description || "Descripción no disponible."}
                            </p>
                        </div>

                        {/* Anfitrión - usando check_in_info si está disponible */}
                        {/*check_in_info && (
                            <div className="mb-8 pb-8 border-b border-gray-200">
                                <h3 className="text-lg font-semibold mb-4">Información del Anfitrión</h3>
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                                        {check_in_info.host_avatar ? (
                                            <img 
                                                src={check_in_info.host_avatar} 
                                                alt={check_in_info.host_name || 'Anfitrión'}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <span className="text-lg font-bold text-gray-600">
                                            {(check_in_info.host_name || 'Anfitrión').split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        {check_in_info.host_name && (
                                            <h4 className="font-semibold text-gray-900 mb-1">{check_in_info.host_name}</h4>
                                        )}
                                        {check_in_info.host_phone && (
                                            <p className="text-gray-600 text-sm mb-2">Teléfono: {check_in_info.host_phone}</p>
                                        )}
                                        {check_in_info.host_email && (
                                            <p className="text-gray-600 text-sm mb-2">Email: {check_in_info.host_email}</p>
                                        )}
                                        {check_in_info.instructions && (
                                            <p className="text-gray-700">{check_in_info.instructions}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )*/}

                        {/* Lo que ofrece este lugar - usando amenities de la base de datos */}
                        <div className="mb-8 pb-8 border-b border-gray-200">
                            <h2 className="text-xl font-semibold mb-6">Lo que ofrece este lugar</h2>
                            {amenities && amenities.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center">
                                            <i className={`${amenity.icon || 'fas fa-check'} w-6 h-6 mr-3 text-red-500`}></i>
                                            <span>{amenity.name}</span>
                                            {amenity.available === false && (
                                                <span className="ml-2 text-gray-400 text-sm">(No disponible)</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No hay amenidades registradas.</p>
                            )}
                        </div>

                        {/* Servicios */}
                        {services && services.length > 0 && (
                            <div className="mb-8 pb-8 border-b border-gray-200">
                                <h2 className="text-xl font-semibold mb-6">Servicios</h2>
                                <div className="space-y-4">
                                    {services.map((service, index) => (
                                        <div key={index} className="flex items-start">
                                            <i className={`${service.icon || 'fas fa-concierge-bell'} w-6 h-6 mr-3 text-red-500 mt-1`}></i>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{service.name}</h4>
                                                {service.description && (
                                                    <p className="text-gray-600 text-sm">{service.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Características */}
                        {characteristics && characteristics.length > 0 && (
                            <div className="mb-8 pb-8 border-b border-gray-200">
                                <h2 className="text-xl font-semibold mb-6">Características</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {characteristics.map((characteristic, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <i className={`${characteristic.icon || 'fas fa-info'} w-5 h-5 mr-3 text-red-500`}></i>
                                                <span className="font-medium">{characteristic.name}</span>
                                            </div>
                                            {characteristic.value && (
                                                <span className="text-gray-600">{characteristic.value}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Políticas del alojamiento y reglas de la casa */}
                        <div className="mb-8 pb-8 border-b border-gray-200">
                            <h2 className="text-xl font-semibold mb-6">Políticas del alojamiento</h2>
                            <div className="space-y-4">
                                {/* Información de check-in/out desde check_in_info */}
                                {check_in_info && (
                                    <>
                                        {check_in_info.check_in_time && (
                                            <div>
                                                <span className="font-medium">Check-in:</span>
                                                <span className="ml-2 text-gray-600">{check_in_info.check_in_time}</span>
                                            </div>
                                        )}
                                        {check_in_info.check_out_time && (
                                            <div>
                                                <span className="font-medium">Check-out:</span>
                                                <span className="ml-2 text-gray-600">{check_in_info.check_out_time}</span>
                                            </div>
                                        )}
                                        {check_in_info.cancellation_policy && (
                                            <div>
                                                <span className="font-medium">Cancelación:</span>
                                                <span className="ml-2 text-gray-600">{check_in_info.cancellation_policy}</span>
                                            </div>
                                        )}
                                    </>
                                )}
                                
                                {/* Reglas de la casa desde house_rules */}
                                {house_rules && house_rules.length > 0 && (
                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold mb-4">Reglas de la casa</h3>
                                        <div className="space-y-3">
                                            {house_rules.map((rule, index) => (
                                                <div key={index} className="flex items-start">
                                                    <i className={`${rule.icon || 'fas fa-info-circle'} w-5 h-5 mr-3 text-red-500 mt-1`}></i>
                                                    <span className="text-gray-700">{rule.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Ubicación */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-6">Ubicación</h2>
                            {latitude && longitude ? (
                                <div className="h-64 rounded-lg overflow-hidden">
                                    <LoadScript googleMapsApiKey={Global.GMAPS_API_KEY}>
                                        <GoogleMap
                                            mapContainerStyle={{
                                                width: "100%",
                                                height: "256px",
                                            }}
                                            center={{
                                                lat: parseFloat(latitude),
                                                lng: parseFloat(longitude)
                                            }}
                                            zoom={15}
                                            options={{
                                                disableDefaultUI: false,
                                                zoomControl: true,
                                                streetViewControl: false,
                                                mapTypeControl: false,
                                                fullscreenControl: true,
                                            }}
                                        >
                                            <Marker 
                                                position={{
                                                    lat: parseFloat(latitude),
                                                    lng: parseFloat(longitude)
                                                }}
                                                title={title}
                                            />
                                        </GoogleMap>
                                    </LoadScript>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p className="text-gray-600">Ubicación no disponible</p>
                                    <p className="text-sm text-gray-500">No se han proporcionado coordenadas</p>
                                    {latitude && longitude && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            Coordenadas: {latitude}, {longitude}
                                        </p>
                                    )}
                                </div>
                            )}
                            
                            {/* Información de ubicación */}
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 616 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-medium text-gray-900 mb-1">Dirección</p>
                                        <p className="text-gray-600">{[address, district, city, province, department].filter(Boolean).join(', ')}</p>
                                        {latitude && longitude && (
                                            <p className="text-xs text-gray-400 mt-2">
                                                Coordenadas: {latitude}, {longitude}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar de reserva */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-white border border-gray-300 rounded-xl shadow-lg p-6">
                                {/* Precio y rating */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <span className="text-2xl font-bold">{currency}/{parseFloat(price_per_night).toFixed(0)}</span>
                                        <span className="text-gray-500 ml-1">noche</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-semibold">{rating || '4.6'}</span>
                                        <span className="text-gray-500 ml-1">({reviews_count || 127} reseñas)</span>
                                    </div>
                                </div>

                                {/* Fechas y huéspedes */}
                                <div className="border border-gray-300 rounded-lg mb-4">
                                    <div className="grid grid-cols-2 border-b border-gray-300">
                                        <div className="p-3 border-r border-gray-300">
                                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Llegada</label>
                                            <input
                                                type="date"
                                                value={checkIn}
                                                onChange={(e) => setCheckIn(e.target.value)}
                                                className="w-full border-none outline-none text-sm"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Salida</label>
                                            <input
                                                type="date"
                                                value={checkOut}
                                                onChange={(e) => setCheckOut(e.target.value)}
                                                className="w-full border-none outline-none text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Huéspedes</label>
                                        <select
                                            value={guests}
                                            onChange={(e) => setGuests(e.target.value)}
                                            className="w-full border-none outline-none text-sm"
                                        >
                                            {[...Array(max_guests || 4)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1} huésped{i > 0 ? 'es' : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Botón de reserva */}
                                <button 
                                    onClick={handleWhatsAppReservation}
                                    className="w-full bg-secondary hover:bg-red-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                    </svg>
                                    <span>Reservar por WhatsApp</span>
                                </button>

                                <div className="text-center text-sm text-gray-500 mb-4">
                                    No se hará ningún cargo por el momento
                                </div>

                                {/* Desglose de precios */}
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="underline">{currency}/{parseFloat(price_per_night).toFixed(0)} x 5 noches</span>
                                        <span>{currency}/{(parseFloat(price_per_night) * 5).toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="underline">Tarifa de servicio</span>
                                        <span>{currency}/{(parseFloat(price_per_night) * 0.1).toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="underline">Impuestos</span>
                                        <span>{currency}/{(parseFloat(price_per_night) * 0.05).toFixed(0)}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>{currency}/{(parseFloat(price_per_night) * 5 + parseFloat(price_per_night) * 0.15).toFixed(0)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de galería completa */}
            {showAllPhotos && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto p-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white text-xl font-semibold">Todas las fotos</h2>
                            <button 
                                onClick={() => setShowAllPhotos(false)}
                                className="text-white hover:text-gray-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                            {allImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={`/api/property/media/${image}`}
                                    alt={`Vista ${index + 1}`}
                                    className="w-full h-48 object-cover rounded-lg"
                                    onError={(e) => {
                                        e.target.src = '/assets/images/property-placeholder.jpg';
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/*SECCION LO MAS VISITADO */}
            {/* Sección de propiedades relacionadas o destacadas */}
            {otherProperties && otherProperties.length > 0 && (
                <div >
                    <DestacadosSection
                        propiedades={otherProperties}
                        titulo={otherPropertiesTitle}
                    />
                </div>
            )}
            <Footer/>

        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <PropertyDetail {...properties} />
            </Base>
        </CarritoProvider>
    );
});

