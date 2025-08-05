import React, { useState, useEffect } from "react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";

import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoProvider } from "./context/CarritoContext";

import PropertyMapView from "./components/Properties/PropertyMapView";
import PropertyFiltersModal from "./components/Properties/PropertyFiltersModal";
import "../css/property-catalog.css";
import ServiceSeccionFaq from "./components/Tailwind/CambioGerencia/ServiceSeccionFaq";

function CatalogoProductos({ propiedades, searchFilters = {}, faqs = [], landing }) {
    // Estados para los filtros de la barra superior
    const [searchLocation, setSearchLocation] = useState(searchFilters.location || "");
    const [selectedDate, setSelectedDate] = useState("Fecha");
    const [selectedGuests, setSelectedGuests] = useState("");
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [sortBy, setSortBy] = useState("relevancia");

    // Estados para dropdowns
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
    const [showPriceDropdown, setShowPriceDropdown] = useState(false);

    // Estados para el modal de filtros
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: [0, 500],
        guests: '',
        bedrooms: '',
        amenities: [],
        services: [],
        characteristics: [],
        propertyType: '',
        location: null,
        instantBook: false,
        featured: false
    });

    // Estados para responsive
    const [isMobileView, setIsMobileView] = useState(false);
    const [showMap, setShowMap] = useState(true);

    // Estado para propiedades filtradas
    const [filteredProperties, setFilteredProperties] = useState(propiedades || []);
    const [propertyStats, setPropertyStats] = useState({ total: propiedades?.length || 0 });
    
    // ✅ AGREGADO: Estado para estadísticas de ubicación del mapa
    const [locationStats, setLocationStats] = useState(null);
    const [mapCenter, setMapCenter] = useState(null);

    // ✅ AGREGADO: Cargar estadísticas de ubicación para centrar el mapa
    const loadLocationStats = async () => {
        try {
            const response = await fetch('/api/properties/location-stats');
            const data = await response.json();
            
            if (data.success && data.center) {
                setLocationStats(data);
                setMapCenter(data.center);
                console.log('🗺️ Mapa centrado en:', data.center.location, 'con', data.center.count, 'propiedades');
            }
        } catch (error) {
            console.error('Error loading location stats:', error);
            // Fallback al centro de Lima si hay error
            setMapCenter({
                lat: -12.046374,
                lng: -77.042793,
                location: 'Lima, Perú',
                count: 0
            });
        }
    };

    // Inicializar filtros con los datos de búsqueda
    useEffect(() => {
        loadLocationStats(); // Cargar estadísticas al inicio
        
        if (searchFilters) {
            // Calcular el total de huéspedes
            const totalGuests = (parseInt(searchFilters.adults) || 0) + (parseInt(searchFilters.children) || 0);
            
            if (totalGuests > 0) {
                setSelectedGuests(totalGuests.toString());
                // Actualizar filtros
                setFilters(prev => ({
                    ...prev,
                    guests: totalGuests.toString()
                }));
            }
            
            // Si hay filtros de búsqueda, mostrar un mensaje o indicador
            if (searchFilters.location || totalGuests > 0) {
                console.log('Filtros de búsqueda aplicados:', searchFilters);
            }
        }
    }, [searchFilters]);

    useEffect(() => {
        if (propiedades) {
            setFilteredProperties(propiedades);
            setPropertyStats({ total: propiedades.length });
        }
    }, [propiedades]);

    // Función para aplicar filtros
    const applyFilters = (newFilters = filters) => {
        let filtered = propiedades || [];

        // Búsqueda por ubicación
        if (searchLocation) {
            filtered = filtered.filter(prop => {
                const location = [
                    prop.district || '',
                    prop.province || '',
                    prop.department || '',
                    prop.address || ''
                ].join(' ').toLowerCase();

                return location.includes(searchLocation.toLowerCase());
            });
        }

        // Filtro por rango de precio (usando el estado priceRange o el del modal)
        const currentPriceRange = newFilters.priceRange || priceRange;
        if (currentPriceRange[0] > 0 || currentPriceRange[1] < 500) {
            filtered = filtered.filter(prop => {
                const price = parseFloat(prop.price_per_night || 0);
                return price >= currentPriceRange[0] && price <= currentPriceRange[1];
            });
        }

        // Filtro por huéspedes (usando selectedGuests o el del modal)
        const currentGuests = newFilters.guests || selectedGuests;
        if (currentGuests) {
            filtered = filtered.filter(prop =>
                parseInt(prop.max_guests || 0) >= parseInt(currentGuests)
            );
        }

        // Filtro por dormitorios
        if (newFilters.bedrooms) {
            filtered = filtered.filter(prop =>
                parseInt(prop.bedrooms || 0) >= parseInt(newFilters.bedrooms)
            );
        }

        // Filtro por amenidades, servicios y características
        const allAmenities = [
            ...(newFilters.amenities || []),
            ...(newFilters.services || []),
            ...(newFilters.characteristics || [])
        ];

        if (allAmenities.length > 0) {
            filtered = filtered.filter(prop => {
                const propAmenities = prop.amenities || [];
                return allAmenities.some(amenity =>
                    propAmenities.some(propAmenity => 
                        propAmenity.toLowerCase().includes(amenity.toLowerCase())
                    )
                );
            });
        }

        // Filtro por tipo de propiedad
        if (newFilters.propertyType && newFilters.propertyType !== 'cualquier') {
            filtered = filtered.filter(prop =>
                prop.property_type && prop.property_type.toLowerCase().includes(newFilters.propertyType.toLowerCase())
            );
        }

        // Filtro por reservación inmediata
        if (newFilters.instantBook) {
            filtered = filtered.filter(prop => prop.instant_book === true);
        }

        // Filtro por destacado
        if (newFilters.featured) {
            filtered = filtered.filter(prop => prop.featured === true);
        }

        // Filtro por ubicación (radio de 5km)
        if (newFilters.location) {
            filtered = filtered.filter(prop => {
                if (!prop.latitude || !prop.longitude) return false;

                const distance = calculateDistance(
                    newFilters.location.lat,
                    newFilters.location.lng,
                    parseFloat(prop.latitude),
                    parseFloat(prop.longitude)
                );
                return distance <= 5; // 5km radius
            });
        }

        // Aplicar ordenamiento
        filtered = applySorting(filtered, sortBy);

        setFilteredProperties(filtered);
        setPropertyStats({ total: filtered.length });
    };

    // Función para aplicar ordenamiento
    const applySorting = (properties, sortType) => {
        const sorted = [...properties];
        
        switch (sortType) {
            case 'precio-menor':
                return sorted.sort((a, b) => parseFloat(a.price_per_night || 0) - parseFloat(b.price_per_night || 0));
            case 'precio-mayor':
                return sorted.sort((a, b) => parseFloat(b.price_per_night || 0) - parseFloat(a.price_per_night || 0));
            case 'fecha-reciente':
                return sorted.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
            case 'fecha-antigua':
                return sorted.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
            case 'rating':
                return sorted.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0));
            case 'huespedes':
                return sorted.sort((a, b) => parseInt(b.max_guests || 0) - parseInt(a.max_guests || 0));
            default: // relevancia
                return sorted.sort((a, b) => {
                    // Ordenar por destacados primero, luego por rating
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
                });
        }
    };

    // Calcular distancia entre dos puntos (fórmula de Haversine)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radio de la Tierra en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // Filtrar propiedades por ubicación desde la barra de búsqueda
    const handleSearchLocation = (e) => {
        setSearchLocation(e.target.value);
        // Aplicar filtros al escribir
        setTimeout(() => applyFilters(), 300); // Debounce
    };

    // Manejar cambio de huéspedes
    const handleGuestsChange = (guests) => {
        setSelectedGuests(guests);
        setShowGuestsDropdown(false);
        // Actualizar filtros y aplicar
        const newFilters = { ...filters, guests };
        setFilters(newFilters);
        applyFilters(newFilters);
    };

    // Manejar cambio de rango de precio
    const handlePriceRangeChange = (min, max) => {
        setPriceRange([min, max]);
        setShowPriceDropdown(false);
        // Actualizar filtros y aplicar
        const newFilters = { ...filters, priceRange: [min, max] };
        setFilters(newFilters);
        applyFilters(newFilters);
    };

    // Manejar cambio de ordenamiento
    const handleSortChange = (sortType) => {
        setSortBy(sortType);
        setShowDateDropdown(false);
        applyFilters();
    };

    // Effect para aplicar filtros cuando cambie el ordenamiento
    useEffect(() => {
        if (propiedades) {
            applyFilters();
        }
    }, [sortBy]);

    // Effect para aplicar filtros iniciales cuando se reciban nuevas propiedades
    useEffect(() => {
        if (propiedades) {
            setFilteredProperties(propiedades);
            setPropertyStats({ total: propiedades.length });
            
            // Si hay filtros de búsqueda activos, aplicar filtros automáticamente
            if (searchFilters && (searchFilters.location || searchFilters.adults || searchFilters.children)) {
                // Aplicar filtros después de un pequeño retraso para asegurar que el estado esté actualizado
                setTimeout(() => {
                    applyFilters();
                }, 100);
            }
        }
    }, [propiedades, searchFilters]);

    // Cerrar dropdowns al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-container')) {
                setShowDateDropdown(false);
                setShowGuestsDropdown(false);
                setShowPriceDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    // Detectar si es una vista móvil
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobileView(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setShowMap(true);
            }
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Search and Filters Bar */}
            <div className="bg-white sticky top-0 z-40 shadow-sm">
                <div className="mx-auto px-[5%] py-3 md:py-4">
                    <div className="flex items-center justify-between gap-2 md:gap-4">
                        {/* Search Location */}
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={searchLocation}
                                    onChange={handleSearchLocation}
                                    className="block w-full pl-9 pr-3 py-2 md:py-3 border border-gray-300 rounded-full text-sm md:text-base leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="¿A dónde vas?"
                                />
                            </div>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex items-center gap-1 md:gap-3">
                            {/* Date/Sort Dropdown */}
                            <div className="relative dropdown-container">
                                <button
                                    onClick={() => {
                                        setShowDateDropdown(!showDateDropdown);
                                        setShowGuestsDropdown(false);
                                        setShowPriceDropdown(false);
                                    }}
                                    className="px-2 md:px-4 py-2 border border-gray-300 rounded-full text-xs md:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-1 md:gap-2"
                                >
                                    <span className="hidden md:inline">
                                    {sortBy === 'relevancia' ? 'Relevancia' : 
                                     sortBy === 'precio-menor' ? 'Precio: menor a mayor' :
                                     sortBy === 'precio-mayor' ? 'Precio: mayor a menor' :
                                     sortBy === 'fecha-reciente' ? 'Más recientes' :
                                     sortBy === 'fecha-antigua' ? 'Más antiguos' :
                                     sortBy === 'rating' ? 'Mejor valorados' :
                                     sortBy === 'huespedes' ? 'Más huéspedes' : 'Ordenar'}
                                    </span>
                                    <span className="md:hidden">
                                    {sortBy === 'relevancia' ? 'Relevancia' : 
                                     sortBy === 'precio-menor' ? 'Precio ↓' :
                                     sortBy === 'precio-mayor' ? 'Precio ↑' :
                                     sortBy === 'fecha-reciente' ? 'Recientes' :
                                     sortBy === 'fecha-antigua' ? 'Antiguos' :
                                     sortBy === 'rating' ? 'Rating' :
                                     sortBy === 'huespedes' ? 'Huéspedes' : 'Orden'}
                                    </span>
                                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {showDateDropdown && (
                                    <div className="absolute top-full mt-2 w-48 md:w-56 right-0 md:right-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                        <div className="p-2">
                                            <button
                                                onClick={() => handleSortChange('relevancia')}
                                                className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${sortBy === 'relevancia' ? 'bg-blue-50 text-blue-700' : ''}`}
                                            >
                                                Relevancia
                                            </button>
                                            <button
                                                onClick={() => handleSortChange('precio-menor')}
                                                className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${sortBy === 'precio-menor' ? 'bg-blue-50 text-blue-700' : ''}`}
                                            >
                                                Precio: menor a mayor
                                            </button>
                                            <button
                                                onClick={() => handleSortChange('precio-mayor')}
                                                className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${sortBy === 'precio-mayor' ? 'bg-blue-50 text-blue-700' : ''}`}
                                            >
                                                Precio: mayor a menor
                                            </button>
                                            <button
                                                onClick={() => handleSortChange('fecha-reciente')}
                                                className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${sortBy === 'fecha-reciente' ? 'bg-blue-50 text-blue-700' : ''}`}
                                            >
                                                Más recientes
                                            </button>
                                            <button
                                                onClick={() => handleSortChange('fecha-antigua')}
                                                className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${sortBy === 'fecha-antigua' ? 'bg-blue-50 text-blue-700' : ''}`}
                                            >
                                                Más antiguos
                                            </button>
                                            <button
                                                onClick={() => handleSortChange('rating')}
                                                className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${sortBy === 'rating' ? 'bg-blue-50 text-blue-700' : ''}`}
                                            >
                                                Mejor valorados
                                            </button>
                                            <button
                                                onClick={() => handleSortChange('huespedes')}
                                                className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${sortBy === 'huespedes' ? 'bg-blue-50 text-blue-700' : ''}`}
                                            >
                                                Más huéspedes
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Guests Dropdown - Hidden on smallest screens */}
                            <div className="relative dropdown-container hidden xs:block">
                                <button
                                    onClick={() => {
                                        setShowGuestsDropdown(!showGuestsDropdown);
                                        setShowDateDropdown(false);
                                        setShowPriceDropdown(false);
                                    }}
                                    className={`px-2 md:px-4 py-2 border rounded-full text-xs md:text-sm font-medium ${selectedGuests ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-700'
                                        } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-1 md:gap-2`}
                                >
                                    <span className="hidden md:inline">{selectedGuests ? `${selectedGuests} huéspedes` : "Huéspedes"}</span>
                                    <span className="md:hidden">{selectedGuests ? `${selectedGuests}` : "Huéspedes"}</span>
                                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {showGuestsDropdown && (
                                    <div className="absolute top-full mt-2 w-40 md:w-48 right-0 md:right-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                        <div className="p-2">
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                <button
                                                    key={num}
                                                    onClick={() => handleGuestsChange(num.toString())}
                                                    className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${selectedGuests === num.toString() ? 'bg-blue-50 text-blue-700' : ''}`}
                                                >
                                                    {num} huésped{num > 1 ? 'es' : ''}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => handleGuestsChange('8+')}
                                                className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${selectedGuests === '8+' ? 'bg-blue-50 text-blue-700' : ''}`}
                                            >
                                                8+ huéspedes
                                            </button>
                                            {selectedGuests && (
                                                <div className="border-t pt-2 mt-2">
                                                    <button
                                                        onClick={() => handleGuestsChange('')}
                                                        className="w-full text-left px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
                                                    >
                                                        Limpiar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Price Range Dropdown */}
                            <div className="relative dropdown-container hidden sm:block">
                                <button
                                    onClick={() => {
                                        setShowPriceDropdown(!showPriceDropdown);
                                        setShowDateDropdown(false);
                                        setShowGuestsDropdown(false);
                                    }}
                                    className={`px-2 md:px-4 py-2 border rounded-full text-xs md:text-sm font-medium ${(priceRange[0] > 0 || priceRange[1] < 500) ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-700'
                                        } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-1 md:gap-2`}
                                >
                                    {(priceRange[0] > 0 || priceRange[1] < 500) ?
                                        <>
                                            <span className="hidden md:inline">{`S/ ${priceRange[0]} - S/ ${priceRange[1]}`}</span>
                                            <span className="md:hidden">{`S/${priceRange[0]}-${priceRange[1]}`}</span>
                                        </> :
                                        <>
                                            <span className="hidden md:inline">Rango de precio</span>
                                            <span className="md:hidden">Precio</span>
                                        </>
                                    }
                                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {showPriceDropdown && (
                                    <div className="absolute top-full mt-2 w-48 md:w-64 right-0 md:right-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                        <div className="p-4">
                                            <h4 className="font-medium mb-3">Rango de precio por noche</h4>
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => handlePriceRangeChange(0, 50)}
                                                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100"
                                                >
                                                    S/ 0 - S/ 50
                                                </button>
                                                <button
                                                    onClick={() => handlePriceRangeChange(50, 100)}
                                                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100"
                                                >
                                                    S/ 50 - S/ 100
                                                </button>
                                                <button
                                                    onClick={() => handlePriceRangeChange(100, 200)}
                                                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100"
                                                >
                                                    S/ 100 - S/ 200
                                                </button>
                                                <button
                                                    onClick={() => handlePriceRangeChange(200, 300)}
                                                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100"
                                                >
                                                    S/ 200 - S/ 300
                                                </button>
                                                <button
                                                    onClick={() => handlePriceRangeChange(300, 500)}
                                                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100"
                                                >
                                                    S/ 300 - S/ 500
                                                </button>
                                                <button
                                                    onClick={() => handlePriceRangeChange(500, 1000)}
                                                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100"
                                                >
                                                    S/ 500+
                                                </button>
                                                <div className="border-t pt-2 mt-2">
                                                    <button
                                                        onClick={() => handlePriceRangeChange(0, 500)}
                                                        className="w-full text-left px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
                                                    >
                                                        Limpiar rango
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Filters Modal Button */}
                            <button
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                                className="p-2 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                                </svg>
                            </button>
                            
                            {/* Toggle Map View Button (Only on Mobile) */}
                            {isMobileView && (
                                <button
                                    onClick={() => setShowMap(!showMap)}
                                    className="p-2 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {showMap ? (
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                        </svg>
                                    ) : (
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="mt-2">
                        <p className="text-sm md:text-lg text-gray-600">
                            {propertyStats.total} propiedades encontradas
                        </p>
                    </div>
                </div>
            </div>

            {/* Filtros Modal */}
            <PropertyFiltersModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onApplyFilters={(modalFilters) => {
                    console.log('Modal filters received:', modalFilters);
                    
                    // Mapear los filtros del modal al formato esperado
                    const newFilters = {
                        ...filters,
                        // Mapear filtros booleanos basados en selecciones del modal
                        instantBook: modalFilters.recommended === 'reservacion',
                        featured: modalFilters.highlighted === 'favoritos',
                        // Mapear tipo de propiedad
                        propertyType: modalFilters.accommodationType === 'cualquier' ? '' : modalFilters.accommodationType,
                        // Mapear arrays de servicios y amenidades
                        services: modalFilters.services || [],
                        amenities: modalFilters.amenities || [],
                        characteristics: modalFilters.features || [],
                        // Mantener filtros existentes que no están en el modal
                        priceRange: filters.priceRange,
                        guests: filters.guests,
                        bedrooms: filters.bedrooms,
                        location: filters.location
                    };
                    
                    console.log('Applied filters:', newFilters);
                    setFilters(newFilters);
                    applyFilters(newFilters);
                }}
                currentFilters={filters} // Pasar filtros actuales para sincronización
            />

            {/* Main Content - Map View with Responsive Layout */}
            <div className="flex flex-col md:flex-row bg-white gap-0 md:gap-6 min-h-screen md:px-[5%]">
                {/* Mobile Toggle for List/Map View */}
                {isMobileView && (
                    <div className="sticky top-[70px] z-30 flex bg-white border-b shadow-sm">
                        <button 
                            onClick={() => setShowMap(false)}
                            className={`flex-1 py-3 font-medium text-sm ${!showMap ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                        >
                            Lista
                        </button>
                        <button 
                            onClick={() => setShowMap(true)}
                            className={`flex-1 py-3 font-medium text-sm ${showMap ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                        >
                            Mapa
                        </button>
                    </div>
                )}
                
                {/* Conditional Rendering based on device and view mode */}
                {/* Desktop: Always show both */}
                {/* Mobile: Show either Map or List based on showMap state */}
                {(!isMobileView || (isMobileView && !showMap)) && (
                    <div className={`${isMobileView ? 'w-full' : 'w-2/3'} flex flex-col bg-white property-list-container`}>
                        <PropertyMapView 
                            propiedades={filteredProperties}
                            center={mapCenter}
                            locationStats={locationStats}
                            isMobileView={isMobileView}
                            showMapOnly={false}
                        />
                    </div>
                )}
                
                {(!isMobileView || (isMobileView && showMap)) && (
                    <div className={`${isMobileView ? 'w-full h-[calc(100vh-145px)]' : 'w-1/3 sticky top-0 h-screen'} rounded-xl overflow-hidden`}>
                        <PropertyMapView 
                            propiedades={filteredProperties}
                            center={mapCenter}
                            locationStats={locationStats}
                            isMobileView={isMobileView}
                            showMapOnly={true}
                        />
                    </div>
                )}
            </div>

            <ServiceSeccionFaq faqs={faqs} landingFAQS={landing} />

            <Footer />
        </div>
    );
}

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <CatalogoProductos {...properties} />
            </Base>
        </CarritoProvider>
    );
});
