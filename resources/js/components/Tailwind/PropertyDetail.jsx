import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import PropertiesRest from '../../actions/Admin/PropertiesRest';

const PropertyDetail = () => {
    const { props } = usePage();
    const { property: initialProperty } = props;
    const [property, setProperty] = useState(initialProperty);
    const [loading, setLoading] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    const propertiesRest = new PropertiesRest();

    // Property data is already provided via Inertia props
    // No need to fetch it again
    useEffect(() => {
        if (initialProperty) {
            setProperty(initialProperty);
        }
    }, [initialProperty]);

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

    const {
        title,
        platform,
        price_per_night,
        currency,
        address,
        district,
        city,
        bedrooms,
        bathrooms,
        max_guests,
        area_m2,
        description,
        main_image,
        gallery,
        rating,
        reviews_count,
        amenities,
        services,
        characteristics,
        house_rules
    } = property;

    // Combinar imagen principal con galería
    const allImages = [main_image, ...(gallery || [])].filter(Boolean);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h1 className="text-xl font-semibold truncate">{title}</h1>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                                <span>Compartir</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span>Guardar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Galería de imágenes */}
                <div className="mb-8">
                    <div className="grid grid-cols-4 gap-2 h-96 rounded-xl overflow-hidden">
                        {/* Imagen principal */}
                        <div className="col-span-2 row-span-2">
                            <img
                                src={main_image ? `/storage/images/property/${main_image}` : '/assets/images/property-placeholder.jpg'}
                                alt={title}
                                className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition-all"
                                onClick={() => setShowAllPhotos(true)}
                            />
                        </div>
                        
                        {/* Imágenes secundarias */}
                        {allImages.slice(1, 5).map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={`/storage/images/property/${image}`}
                                    alt={`Vista ${index + 2}`}
                                    className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition-all"
                                    onClick={() => setShowAllPhotos(true)}
                                />
                                {index === 3 && allImages.length > 5 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <span className="text-white font-semibold">
                                            +{allImages.length - 5} fotos
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    <button 
                        onClick={() => setShowAllPhotos(true)}
                        className="mt-4 flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <span>Mostrar todas las fotos</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Columna principal */}
                    <div className="lg:col-span-2">
                        {/* Información básica */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <span>{bedrooms} a {bathrooms} dormitorios</span>
                                        <span>•</span>
                                        <span>{area_m2 ? `${area_m2} a ${area_m2 + 7} m²` : '53 a 60 m²'}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">{currency} {parseFloat(price_per_night).toFixed(0)}</div>
                                    <div className="text-gray-500">por noche</div>
                                </div>
                            </div>
                            
                            <div className="flex items-center text-gray-600 mb-4">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{address}, {district}.</span>
                            </div>
                            <div className="text-gray-500 mb-6">{district}, {city}</div>

                            {/* Rating */}
                            {rating && (
                                <div className="flex items-center mb-6">
                                    <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                                        <svg className="w-4 h-4 text-yellow-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-bold text-yellow-900">{rating}</span>
                                    </div>
                                    <span className="ml-2 text-gray-600">
                                        Favoritos entre huéspedes
                                    </span>
                                    <span className="ml-2 text-gray-400">
                                        Es de los más amados en Homlynk, {reviews_count || 0} reseñas
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Descripción */}
                        <div className="mb-8 pb-8 border-b border-gray-200">
                            <p className="text-gray-700 leading-relaxed">{description}</p>
                        </div>

                        {/* Lo que este lugar ofrece */}
                        <div className="mb-8 pb-8 border-b border-gray-200">
                            <h2 className="text-xl font-bold mb-6">Lo que este lugar ofrece</h2>
                            
                            {/* Amenidades */}
                            {amenities && amenities.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-4">Servicios populares</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {amenities.filter(a => a.available).map((amenity, index) => (
                                            <div key={index} className="flex items-center">
                                                <i className={`${amenity.icon || 'fas fa-check'} w-6 mr-3 text-gray-600`}></i>
                                                <span>{amenity.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Servicios */}
                            {services && services.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-4">Servicios adicionales</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {services.filter(s => s.available).map((service, index) => (
                                            <div key={index} className="flex items-center">
                                                <i className={`${service.icon || 'fas fa-concierge-bell'} w-6 mr-3 text-gray-600`}></i>
                                                <div>
                                                    <div>{service.name}</div>
                                                    {service.description && (
                                                        <div className="text-sm text-gray-500">{service.description}</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Características */}
                            {characteristics && characteristics.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-4">Características especiales</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {characteristics.map((characteristic, index) => (
                                            <div key={index} className="flex items-center">
                                                <i className={`${characteristic.icon || 'fas fa-star'} w-6 mr-3 text-gray-600`}></i>
                                                <div>
                                                    <div>{characteristic.name}</div>
                                                    {characteristic.value && (
                                                        <div className="text-sm text-gray-500">{characteristic.value}</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Calendario */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-6">2 noches en Playa Grande</h2>
                            <div className="text-sm text-gray-600 mb-4">2 de jun. de 2018 - 4 de jun. de 2018</div>
                            
                            {/* Aquí iría el componente de calendario */}
                            <div className="bg-gray-100 p-8 rounded-lg text-center">
                                <p className="text-gray-600">Calendario de disponibilidad</p>
                                <p className="text-sm text-gray-500 mt-2">Componente de calendario pendiente de implementar</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar de reserva */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                                {/* Precio */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <span className="text-2xl font-bold">{currency} {parseFloat(price_per_night).toFixed(0)}</span>
                                        <span className="text-gray-500 ml-1">noche</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="font-semibold">{rating}</span>
                                        </div>
                                        <span className="text-gray-500 ml-1">({reviews_count || 0})</span>
                                    </div>
                                </div>

                                {/* Formulario de reserva */}
                                <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                                    <div className="grid grid-cols-2">
                                        <div className="p-3 border-r border-gray-300">
                                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Llegada</label>
                                            <input
                                                type="date"
                                                value={checkIn}
                                                onChange={(e) => setCheckIn(e.target.value)}
                                                className="w-full border-none outline-none text-sm"
                                                placeholder="Agregar fecha"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Salida</label>
                                            <input
                                                type="date"
                                                value={checkOut}
                                                onChange={(e) => setCheckOut(e.target.value)}
                                                className="w-full border-none outline-none text-sm"
                                                placeholder="Agregar fecha"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-3 border-t border-gray-300">
                                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Huéspedes</label>
                                        <select
                                            value={guests}
                                            onChange={(e) => setGuests(e.target.value)}
                                            className="w-full border-none outline-none text-sm"
                                        >
                                            {[...Array(max_guests)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1} huésped{i > 0 ? 'es' : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Botón de reserva */}
                                <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all mb-4">
                                    Reservar
                                </button>

                                <div className="text-center text-sm text-gray-500 mb-4">
                                    No se hará ningún cargo por el momento
                                </div>

                                {/* Desglose de precios */}
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="underline">{currency} {parseFloat(price_per_night).toFixed(0)} x 2 noches</span>
                                        <span>{currency} {(parseFloat(price_per_night) * 2).toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="underline">Tarifa de limpieza</span>
                                        <span>{currency} 50</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="underline">Tarifa de servicio de {platform}</span>
                                        <span>{currency} 30</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between font-semibold">
                                            <span>Total antes de impuestos</span>
                                            <span>{currency} {(parseFloat(price_per_night) * 2 + 50 + 30).toFixed(0)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Información del anfitrión */}
                            <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-xl font-bold text-gray-600">A</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Anfitrión: Andre</div>
                                        <div className="text-sm text-gray-500">Se unió en marzo de 2018</div>
                                    </div>
                                </div>
                                
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Índice de respuesta: 100%</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Tiempo de respuesta: en una hora</span>
                                    </div>
                                </div>

                                <button className="w-full mt-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    Contactar anfitrión
                                </button>
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
                                    src={`/storage/images/property/${image}`}
                                    alt={`Vista ${index + 1}`}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyDetail;
