import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const PropertyFilters = ({ filters, setFilters, onApplyFilters, propertyStats, isModalOpen, setIsModalOpen }) => {
  const [tempFilters, setTempFilters] = useState(filters);
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Lima center coordinates
  const mapCenter = { lat: -12.0464, lng: -77.0428 };

  const mapContainerStyle = {
    width: '100%',
    height: '300px'
  };

  // Actualizar tempFilters cuando se abre el modal
  useEffect(() => {
    if (isModalOpen) {
      setTempFilters(filters);
      if (filters.location) {
        setSelectedLocation(filters.location);
      }
    }
  }, [isModalOpen, filters]);

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Aplicar filtros
  const applyFilters = () => {
    setFilters(tempFilters);
    onApplyFilters(tempFilters);
    closeModal();
  };

  // Limpiar filtros
  const clearFilters = () => {
    const cleanFilters = {
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
    };
    setTempFilters(cleanFilters);
  };

  // Manejar cambio de filtros
  const handleFilterChange = (key, value) => {
    setTempFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Manejar amenidades
  const toggleAmenity = (amenity) => {
    setTempFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  // Servicios disponibles
  const availableServices = [
    { id: 'wifi', name: 'Wifi', icon: '📶' },
    { id: 'air_conditioning', name: 'Aire acondicionado', icon: '❄️' },
    { id: 'tv', name: 'Televisor', icon: '📺' },
    { id: 'kitchen', name: 'Cocina', icon: '🍳' },
    { id: 'dryer', name: 'Secadora', icon: '🌪️' },
    { id: 'gym', name: 'Gimnasio', icon: '🏋️' },
    { id: 'washing_machine', name: 'Lavadora', icon: '🧺' },
    { id: 'heating', name: 'Calefacción', icon: '🔥' },
    { id: 'coworking', name: 'Coworking', icon: '💼' },
    { id: 'iron', name: 'Plancha', icon: '👔' }
  ];

  // Características disponibles  
  const availableCharacteristics = [
    { id: 'pool', name: 'Piscina', icon: '🏊' },
    { id: 'jacuzzi', name: 'Jacuzzi', icon: '🛁' },
    { id: 'parking', name: 'Estacionamiento', icon: '🚗' },
    { id: 'elevator', name: 'Cargador de eléctrico', icon: '🔌' },
    { id: 'baby_crib', name: 'Cuna para bebé', icon: '👶' },
    { id: 'king_bed', name: 'Cama King', icon: '🛏️' },
    { id: 'grill', name: 'Parrilla', icon: '🔥' },
    { id: 'breakfast', name: 'Desayuno', icon: '🥞' },
    { id: 'smoking_allowed', name: 'Apto para fumadores', icon: '🚬' }
  ];

  // Manejar click en el mapa
  const handleMapClick = (event) => {
    const location = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setSelectedLocation(location);
    handleFilterChange('location', location);
  };

  return (
    <>
      {/* Modal de filtros */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-start justify-center overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-5xl m-4 my-8 shadow-2xl min-h-fit">
            {/* Header del modal */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-lg z-10">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="px-6 py-6 max-h-[75vh] overflow-y-auto">
              <div className="space-y-8">
                
                {/* Recomendado para ti */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Recomendado para ti</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <button
                      onClick={() => handleFilterChange('instantBook', !tempFilters.instantBook)}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        tempFilters.instantBook ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">⚡</div>
                      <div className="font-medium text-sm">Reservación inmediata</div>
                    </button>
                    
                    <button className="p-4 border rounded-lg text-left border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="text-2xl mb-2">🅿️</div>
                      <div className="font-medium text-sm">Estacionamiento gratuito</div>
                    </button>
                    
                    <button className="p-4 border rounded-lg text-left border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="text-2xl mb-2">🧺</div>
                      <div className="font-medium text-sm">Lavadora y secadora</div>
                    </button>
                    
                    <button className="p-4 border rounded-lg text-left border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="text-2xl mb-2">🔑</div>
                      <div className="font-medium text-sm">Llegada autónoma</div>
                    </button>
                  </div>
                </div>

                {/* Tipo de alojamiento */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Tipo de alojamiento</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['Cualquier tipo', 'Habitación', 'Alojamiento entero'].map((type) => (
                      <button
                        key={type}
                        onClick={() => handleFilterChange('propertyType', type === 'Cualquier tipo' ? '' : type)}
                        className={`p-3 border rounded-lg text-center transition-colors ${
                          (type === 'Cualquier tipo' && !tempFilters.propertyType) || tempFilters.propertyType === type 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rango de precio */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Rango de precio por noche</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Mínimo</label>
                        <input
                          type="number"
                          value={tempFilters.priceRange[0]}
                          onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, tempFilters.priceRange[1]])}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="S/ 0"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Máximo</label>
                        <input
                          type="number"
                          value={tempFilters.priceRange[1]}
                          onChange={(e) => handleFilterChange('priceRange', [tempFilters.priceRange[0], parseInt(e.target.value) || 500])}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="S/ 500+"
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Precio promedio por noche: S/ {Math.round((tempFilters.priceRange[0] + tempFilters.priceRange[1]) / 2)}
                    </div>
                  </div>
                </div>

                {/* Huéspedes y dormitorios */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium mb-2">Huéspedes</label>
                    <select
                      value={tempFilters.guests}
                      onChange={(e) => handleFilterChange('guests', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Cualquier cantidad</option>
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} huésped{num > 1 ? 'es' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-lg font-medium mb-2">Dormitorios</label>
                    <select
                      value={tempFilters.bedrooms}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Cualquier cantidad</option>
                      {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num} dormitorio{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Servicios */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Servicios</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availableServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => toggleAmenity(service.id)}
                        className={`flex items-center space-x-3 p-3 border rounded-lg text-left transition-colors ${
                          tempFilters.amenities.includes(service.id) 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-xl">{service.icon}</span>
                        <span className="flex-1">{service.name}</span>
                        {tempFilters.amenities.includes(service.id) && (
                          <span className="text-blue-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Características */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Características</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availableCharacteristics.map((char) => (
                      <button
                        key={char.id}
                        onClick={() => toggleAmenity(char.id)}
                        className={`flex items-center space-x-3 p-3 border rounded-lg text-left transition-colors ${
                          tempFilters.amenities.includes(char.id) 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-xl">{char.icon}</span>
                        <span className="flex-1">{char.name}</span>
                        {tempFilters.amenities.includes(char.id) && (
                          <span className="text-blue-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Destacados */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Alojamientos destacados</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => handleFilterChange('featured', !tempFilters.featured)}
                      className={`flex items-center space-x-3 p-4 border rounded-lg text-left transition-colors ${
                        tempFilters.featured ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl">⭐</span>
                      <div>
                        <div className="font-medium">Favoritos entre huéspedes</div>
                        <div className="text-sm text-gray-500">Los alojamientos más populares en HomLink</div>
                      </div>
                      {tempFilters.featured && (
                        <span className="text-blue-500">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Mapa de ubicación */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Seleccionar ubicación</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <LoadScript googleMapsApiKey={window.Global?.GMAPS_API_KEY || ''}>
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={selectedLocation || mapCenter}
                        zoom={12}
                        onClick={handleMapClick}
                        onLoad={setMap}
                        options={{
                          zoomControl: true,
                          streetViewControl: false,
                          mapTypeControl: false,
                          fullscreenControl: false
                        }}
                      >
                        {selectedLocation && (
                          <Marker position={selectedLocation} />
                        )}
                      </GoogleMap>
                    </LoadScript>
                  </div>
                  {selectedLocation && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <strong>Ubicación seleccionada:</strong><br />
                          Lat: {selectedLocation.lat.toFixed(4)}, Lng: {selectedLocation.lng.toFixed(4)}
                        </div>
                        <button
                          onClick={() => {
                            setSelectedLocation(null);
                            handleFilterChange('location', null);
                          }}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Footer del modal */}
            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex items-center justify-between rounded-b-lg">
              <button
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Limpiar filtros
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={applyFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Mostrar {propertyStats?.total || 0} alojamientos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyFilters;
