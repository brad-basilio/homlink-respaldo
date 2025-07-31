import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import PropertyFilters from './PropertyFilters';
import PropertiesRest from '../../actions/Admin/PropertiesRest';

const PropertyCatalog = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        platform: '',
        district: '',
        min_price: '',
        max_price: '',
        guests: '',
        bedrooms: '',
        amenities: []
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const propertiesRest = new PropertiesRest();

    // Cargar propiedades
    const loadProperties = async (page = 1) => {
        setLoading(true);
        try {
            const response = await propertiesRest.getPublicProperties({
                ...filters,
                page
            });
            
            if (response.success) {
                setProperties(response.data.data);
                setCurrentPage(response.data.current_page);
                setTotalPages(response.data.last_page);
            }
        } catch (error) {
            console.error('Error loading properties:', error);
        } finally {
            setLoading(false);
        }
    };

    // Efecto para cargar propiedades iniciales
    useEffect(() => {
        loadProperties();
    }, []);

    // Efecto para aplicar filtros
    useEffect(() => {
        loadProperties(1);
    }, [filters]);

    // Manejar cambios en filtros
    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    // Limpiar filtros
    const clearFilters = () => {
        setFilters({
            platform: '',
            district: '',
            min_price: '',
            max_price: '',
            guests: '',
            bedrooms: '',
            amenities: []
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Lima, Miraflores
                                </h1>
                                <p className="text-gray-600">
                                    {properties.length > 0 ? `${properties.length} propiedades` : 'Cargando propiedades...'}
                                </p>
                            </div>
                            
                            {/* Controles de vista */}
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">Fecha</span>
                                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>Cualquier fecha</span>
                                    </button>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">Huéspedes</span>
                                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span>1 huésped</span>
                                    </button>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">Rango de precio</span>
                                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                        <span>Cualquier precio</span>
                                    </button>
                                </div>

                                <button 
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                                    </svg>
                                    <span>Filtros</span>
                                </button>

                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">Ordenar</span>
                                    <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="featured">Destacados</option>
                                        <option value="price_low">Precio: menor a mayor</option>
                                        <option value="price_high">Precio: mayor a menor</option>
                                        <option value="rating">Mejor calificados</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex">
                    {/* Filtros laterales */}
                    {showFilters && (
                        <div className="w-80 mr-8">
                            <PropertyFilters
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                onClearFilters={clearFilters}
                            />
                        </div>
                    )}

                    {/* Resultados */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                                        <div className="h-48 bg-gray-300"></div>
                                        <div className="p-4">
                                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {properties.map((property) => (
                                        <PropertyCard key={property.id} property={property} />
                                    ))}
                                </div>

                                {/* Paginación */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center mt-8">
                                        <div className="flex items-center space-x-2">
                                            <button 
                                                onClick={() => loadProperties(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                Anterior
                                            </button>
                                            
                                            {[...Array(Math.min(5, totalPages))].map((_, index) => {
                                                const page = index + 1;
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => loadProperties(page)}
                                                        className={`px-4 py-2 border rounded-lg ${
                                                            currentPage === page 
                                                                ? 'bg-blue-600 text-white border-blue-600' 
                                                                : 'border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            })}
                                            
                                            <button 
                                                onClick={() => loadProperties(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                Siguiente
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Mostrar más propiedades */}
                                <div className="text-center mt-8">
                                    <button className="px-6 py-3 border border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors">
                                        Ver más propiedades
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCatalog;
