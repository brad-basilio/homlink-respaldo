import React from 'react';
import { Link } from '@inertiajs/react';

const PropertyCard = ({ property }) => {
    const {
        id,
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
        main_image,
        rating,
        reviews_count,
        amenities,
        services,
        short_description,
        featured
    } = property;

    // Obtener amenidades más importantes para mostrar
    const getMainAmenities = () => {
        if (!amenities) return [];
        return amenities
            .filter(amenity => amenity.available)
            .slice(0, 4)
            .map(amenity => amenity.name);
    };

    const mainAmenities = getMainAmenities();

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
            {/* Badge de plataforma */}
            <div className="absolute top-3 left-3 z-10">
                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {platform}
                </span>
            </div>

            {/* Badge destacado */}
            {featured && (
                <div className="absolute top-3 right-3 z-10">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Más avaliado
                    </span>
                </div>
            )}

            {/* Galería de imágenes */}
            <div className="relative h-48 md:h-56">
                <img
                    src={main_image ? `/storage/images/property/${main_image}` : '/assets/images/property-placeholder.jpg'}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                
                {/* Indicadores de galería (simulando las bolitas de Airbnb) */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                    <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-4">
                {/* Título y precio */}
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {title}
                    </h3>
                    <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                            {currency} {parseFloat(price_per_night).toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-500">por noche</div>
                    </div>
                </div>

                {/* Ubicación */}
                <div className="text-gray-600 text-sm mb-3">
                    {address}, {district}.
                </div>
                <div className="text-gray-500 text-sm mb-3">
                    {district}, {city}
                </div>

                {/* Características */}
                <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
                    <span>{bedrooms} a {bathrooms} dormitorios</span>
                    <span>•</span>
                    <span>{area_m2 ? `${area_m2} a ${area_m2 + 7} m²` : '53 a 60 m²'}</span>
                </div>

                {/* Amenidades */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {mainAmenities.map((amenity, index) => (
                        <span 
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                            {amenity}
                        </span>
                    ))}
                </div>

                {/* Rating */}
                {rating && (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                                {rating} ({reviews_count || 0})
                            </span>
                        </div>
                        
                        <Link 
                            href={`/propiedades/${id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            Ver detalles →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyCard;
