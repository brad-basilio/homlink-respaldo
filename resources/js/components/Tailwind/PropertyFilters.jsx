import React, { useState } from 'react';

const PropertyFilters = ({ filters, onFilterChange, onClearFilters }) => {
    // Estados locales para filtros complejos
    const [priceRange, setPriceRange] = useState({
        min: filters.min_price || '',
        max: filters.max_price || ''
    });

    // Opciones predefinidas
    const platforms = ['Airbnb', 'Booking', 'Vrbo', 'HomeAway'];
    const districts = ['Miraflores', 'San Isidro', 'Barranco', 'La Molina', 'Surco', 'Jesús María'];
    
    // Amenidades populares
    const popularAmenities = [
        { name: 'Wifi', icon: 'fas fa-wifi', selected: filters.amenities?.includes('Wifi') },
        { name: 'Aire acondicionado', icon: 'fas fa-snowflake', selected: filters.amenities?.includes('Aire acondicionado') },
        { name: 'Televisor', icon: 'fas fa-tv', selected: filters.amenities?.includes('Televisor') },
        { name: 'Cocina', icon: 'fas fa-utensils', selected: filters.amenities?.includes('Cocina') },
        { name: 'Secadora', icon: 'fas fa-tshirt', selected: filters.amenities?.includes('Secadora') },
        { name: 'Gimnasio', icon: 'fas fa-dumbbell', selected: filters.amenities?.includes('Gimnasio') }
    ];

    // Comodidades
    const comforts = [
        { name: 'Lavadora', icon: 'fas fa-tshirt', selected: filters.amenities?.includes('Lavadora') },
        { name: 'Calefacción', icon: 'fas fa-fire', selected: filters.amenities?.includes('Calefacción') },
        { name: 'Coworking', icon: 'fas fa-laptop', selected: filters.amenities?.includes('Coworking') },
        { name: 'Secadora de cabello', icon: 'fas fa-wind', selected: filters.amenities?.includes('Secadora de cabello') },
        { name: 'Plancha', icon: 'fas fa-compress-arrows-alt', selected: filters.amenities?.includes('Plancha') }
    ];

    // Características
    const characteristics = [
        { name: 'Piscina', icon: 'fas fa-swimmer', selected: filters.amenities?.includes('Piscina') },
        { name: 'Jacuzzi', icon: 'fas fa-hot-tub', selected: filters.amenities?.includes('Jacuzzi') },
        { name: 'Estacionamiento', icon: 'fas fa-parking', selected: filters.amenities?.includes('Estacionamiento') },
        { name: 'Cargador de EV', icon: 'fas fa-charging-station', selected: filters.amenities?.includes('Cargador de EV') },
        { name: 'Cuna para bebé', icon: 'fas fa-baby', selected: filters.amenities?.includes('Cuna para bebé') },
        { name: 'Cama King', icon: 'fas fa-bed', selected: filters.amenities?.includes('Cama King') },
        { name: 'Parrilla', icon: 'fas fa-fire', selected: filters.amenities?.includes('Parrilla') },
        { name: 'Desayuno', icon: 'fas fa-coffee', selected: filters.amenities?.includes('Desayuno') },
        { name: 'Apto para fumadores', icon: 'fas fa-smoking', selected: filters.amenities?.includes('Apto para fumadores') }
    ];

    // Manejar cambio de amenidades
    const handleAmenityToggle = (amenityName) => {
        const currentAmenities = filters.amenities || [];
        const newAmenities = currentAmenities.includes(amenityName)
            ? currentAmenities.filter(a => a !== amenityName)
            : [...currentAmenities, amenityName];
        
        onFilterChange({ amenities: newAmenities });
    };

    // Aplicar rango de precios
    const applyPriceRange = () => {
        onFilterChange({
            min_price: priceRange.min,
            max_price: priceRange.max
        });
    };

    // Componente de filtro por categoría
    const FilterSection = ({ title, children, icon }) => (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
                {icon && <i className={`${icon} mr-2`}></i>}
                {title}
            </h3>
            {children}
        </div>
    );

    // Componente de botón de amenidad
    const AmenityButton = ({ amenity, onClick }) => (
        <button
            onClick={onClick}
            className={`flex items-center justify-between w-full p-3 rounded-lg border transition-all ${
                amenity.selected 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300'
            }`}
        >
            <div className="flex items-center">
                <i className={`${amenity.icon} mr-3 text-lg`}></i>
                <span>{amenity.name}</span>
            </div>
            {amenity.selected && (
                <i className="fas fa-check text-blue-500"></i>
            )}
        </button>
    );

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filtros</h2>
                <button 
                    onClick={onClearFilters}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    Limpiar filtros
                </button>
            </div>

            {/* Recomendado para ti */}
            <FilterSection title="Recomendado para ti">
                <div className="space-y-3">
                    <div className="flex items-center p-3 border border-blue-500 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mr-3">
                            <i className="fas fa-bolt text-blue-600"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center">
                                <span className="font-medium text-blue-700">Reservación inmediata</span>
                                <div className="w-4 h-4 border-2 border-blue-500 rounded-full ml-auto relative">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {['Estacionamiento gratuito', 'Lavadora y secadora', 'Llegada autónoma'].map((item, index) => (
                        <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg mr-3">
                                <i className={`fas ${index === 0 ? 'fa-parking' : index === 1 ? 'fa-tshirt' : 'fa-key'} text-gray-600`}></i>
                            </div>
                            <span className="flex-1">{item}</span>
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                        </div>
                    ))}
                </div>
            </FilterSection>

            {/* Tipo de alojamiento */}
            <FilterSection title="Tipo de alojamiento">
                <div className="grid grid-cols-3 gap-3">
                    {['Cualquier tipo', 'Habitación', 'Alojamiento entero'].map((type, index) => (
                        <button
                            key={type}
                            className={`p-3 border rounded-lg text-sm transition-colors ${
                                index === 0 
                                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Rango de precio */}
            <FilterSection title="Rango de precio">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mínimo</label>
                            <input
                                type="number"
                                placeholder="S/ 0"
                                value={priceRange.min}
                                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Máximo</label>
                            <input
                                type="number"
                                placeholder="S/ 1000+"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <button 
                        onClick={applyPriceRange}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Aplicar rango
                    </button>
                </div>
            </FilterSection>

            {/* Servicios populares */}
            <FilterSection title="Servicios" icon="fas fa-concierge-bell">
                <div className="mb-4">
                    <h4 className="font-medium mb-3">Popular</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {popularAmenities.map((amenity) => (
                            <AmenityButton
                                key={amenity.name}
                                amenity={amenity}
                                onClick={() => handleAmenityToggle(amenity.name)}
                            />
                        ))}
                    </div>
                </div>
            </FilterSection>

            {/* Comodidades */}
            <FilterSection title="Comodidades" icon="fas fa-home">
                <div className="grid grid-cols-2 gap-3">
                    {comforts.map((comfort) => (
                        <AmenityButton
                            key={comfort.name}
                            amenity={comfort}
                            onClick={() => handleAmenityToggle(comfort.name)}
                        />
                    ))}
                </div>
            </FilterSection>

            {/* Características */}
            <FilterSection title="Características" icon="fas fa-star">
                <div className="grid grid-cols-2 gap-3">
                    {characteristics.map((characteristic) => (
                        <AmenityButton
                            key={characteristic.name}
                            amenity={characteristic}
                            onClick={() => handleAmenityToggle(characteristic.name)}
                        />
                    ))}
                </div>
            </FilterSection>

            {/* Alojamientos destacados */}
            <FilterSection title="Alojamientos destacados">
                <div className="space-y-3">
                    <div className="flex items-center p-3 border border-blue-500 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mr-3">
                            <i className="fas fa-users text-blue-600"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-blue-700">Favoritos entre huéspedes</div>
                                    <div className="text-sm text-blue-600">Los alojamientos más populares en Homlynk</div>
                                </div>
                                <div className="w-4 h-4 border-2 border-blue-500 rounded-full relative">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg mr-3">
                            <i className="fas fa-crown text-gray-600"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">Luxe</div>
                                    <div className="text-sm text-gray-600">Alojamientos de lujo con un diseño único</div>
                                </div>
                                <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </FilterSection>

            {/* Botones de acción */}
            <div className="grid grid-cols-2 gap-3 mt-6">
                <button 
                    onClick={onClearFilters}
                    className="py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Limpiar filtros
                </button>
                <button className="py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Mostras alojamientos
                </button>
            </div>
        </div>
    );
};

export default PropertyFilters;
