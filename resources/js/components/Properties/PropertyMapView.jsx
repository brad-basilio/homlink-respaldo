import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PropertyCard from '../Tailwind/Cards/PropertyCard';
import Global from '../../Utils/Global';

const PropertyMapView = ({ propiedades = [], center = null }) => {
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // ✅ AGREGADO: Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Mostrar 12 propiedades por página (4x3 grid)
  
  // Calcular propiedades paginadas
  const totalPages = Math.ceil(propiedades.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProperties = propiedades.slice(startIndex, endIndex);
  
  // ✅ RESETEAR PAGINACIÓN cuando cambien las propiedades
  useEffect(() => {
    setCurrentPage(1);
    setSelectedProperty(null); // También resetear selección
  }, [propiedades.length]);
  
  // ✅ RESETEAR SELECCIÓN cuando se cambie de página si la propiedad seleccionada no está visible
  useEffect(() => {
    if (selectedProperty && paginatedProperties.length > 0) {
      const isSelectedVisible = paginatedProperties.some(prop => prop.id === selectedProperty);
      if (!isSelectedVisible) {
        setSelectedProperty(null);
      }
    }
  }, [currentPage, selectedProperty]);

  // ✅ MEJORADO: Configuración del mapa con centro inteligente
  const mapCenter = center && center.lat && center.lng
    ? { lat: center.lat, lng: center.lng }
    : propiedades.length > 0 && propiedades[0].latitude && propiedades[0].longitude
    ? { lat: parseFloat(propiedades[0].latitude), lng: parseFloat(propiedades[0].longitude) }
    : { lat: -12.0464, lng: -77.0428 }; // Lima center por defecto

  const mapContainerStyle = {
    width: '100%',
    height: '100vh'
  };

  // State para manejar el índice actual de cada swiper
  const [currentIndexes, setCurrentIndexes] = useState({});

  // Function to handle index change
  const handleIndexChange = (propertyId, newIndex) => {
    setCurrentIndexes(prev => ({
      ...prev,
      [propertyId]: newIndex
    }));
  };

  return (
    <div className="flex h-screen px-[5%]">
      {/* Properties List - Left Side */}
      <div className="w-2/3 overflow-y-auto bg-white property-list-container">
        {/* Header con información de selección */}
        {selectedProperty && (
          <div className="p-4 bg-primary/10 border-l-4 border-primary mx-4 mt-4 rounded-r-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-primary font-medium">
                  Propiedad seleccionada en el mapa
                </span>
              </div>
              <button
                onClick={() => setSelectedProperty(null)}
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                Limpiar selección
              </button>
            </div>
          </div>
        )}
        
        <div className="py-10 grid grid-cols-3 gap-6">
          {paginatedProperties && paginatedProperties.length > 0 ? (
            paginatedProperties.map((propiedad) => (
              <div 
                key={propiedad.id} 
                className="relative cursor-pointer"
                data-property-id={propiedad.id}
                onClick={() => {
                  setSelectedProperty(selectedProperty === propiedad.id ? null : propiedad.id);
                }}
              >
                {/* Check icon en la esquina superior izquierda */}
                {selectedProperty === propiedad.id && (
                  <div className="absolute top-2 left-2 z-20 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                <PropertyCard
                  propiedad={propiedad}
                  currentIndex={currentIndexes[propiedad.id] || 0}
                  onIndexChange={handleIndexChange}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No hay propiedades disponibles en este momento.</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {propiedades && propiedades.length > itemsPerPage && (
          <div className="p-4 bg-white sticky bottom-0 border-t border-gray-200">
            <div className="flex items-center justify-between">
              {/* Info de resultados */}
              <div className="text-sm text-gray-600">
                Mostrando {startIndex + 1}-{Math.min(endIndex, propiedades.length)} de {propiedades.length} propiedades
              </div>
              
              {/* Controles de paginación */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    currentPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  ‹ Anterior
                </button>
                
                {/* Números de página */}
                {[...Array(Math.min(5, totalPages))].map((_, index) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = index + 1;
                  } else {
                    // Lógica para mostrar páginas alrededor de la actual
                    const start = Math.max(1, currentPage - 2);
                    const end = Math.min(totalPages, start + 4);
                    pageNum = start + index;
                    if (pageNum > end) return null;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors ${
                        currentPage === pageNum
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    currentPage === totalPages 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Siguiente ›
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map - Right Side */}
      <div className="w-1/3 py-10 relative rounded-xl overflow-hidden">
        <LoadScript googleMapsApiKey={Global?.GMAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={13}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }]
                }
              ]
            }}
            onLoad={() => {
              // Google Maps API is now loaded
            }}
          >
            {propiedades.map((propiedad) => {
              if (!propiedad.latitude || !propiedad.longitude) return null;
              
              const price = Math.floor(propiedad.price_per_night || 120);
              const isHovered = hoveredProperty === propiedad.id;
              const isSelected = selectedProperty === propiedad.id;
              
              // Create icon configuration safely
              const iconConfig = {
                url: isSelected 
                  ? 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="85" height="45" viewBox="0 0 85 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="81" height="41" rx="20" fill="#195AEA" stroke="white" stroke-width="3"/>
                      <text x="42.5" y="28" text-anchor="middle" fill="white" font-size="15" font-weight="bold">S/${price}</text>
                    </svg>
                  `)
                  : isHovered 
                  ? 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="76" height="36" rx="18" fill="#1f2937" stroke="white" stroke-width="2"/>
                      <text x="40" y="26" text-anchor="middle" fill="white" font-size="14" font-weight="bold">S/${price}</text>
                    </svg>
                  `)
                  : 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="70" height="32" viewBox="0 0 70 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="68" height="30" rx="15" fill="white" stroke="#d1d5db" stroke-width="1"/>
                      <text x="35" y="21" text-anchor="middle" fill="#374151" font-size="12" font-weight="600">S/${price}</text>
                    </svg>
                  `)
              };

              // Add scaledSize and anchor only if Google Maps API is available
              if (window.google && window.google.maps && window.google.maps.Size) {
                iconConfig.scaledSize = isSelected
                  ? new window.google.maps.Size(85, 45)
                  : isHovered 
                  ? new window.google.maps.Size(80, 40)
                  : new window.google.maps.Size(70, 32);
                
                iconConfig.anchor = isSelected
                  ? new window.google.maps.Point(42.5, 22.5)
                  : isHovered 
                  ? new window.google.maps.Point(40, 20)
                  : new window.google.maps.Point(35, 16);
              }
              
              return (
                <Marker
                  key={propiedad.id}
                  position={{
                    lat: parseFloat(propiedad.latitude),
                    lng: parseFloat(propiedad.longitude)
                  }}
                  title={propiedad.title || propiedad.address}
                  icon={iconConfig}
                  onClick={() => {
                    // Marcar como seleccionado
                    setSelectedProperty(propiedad.id);
                    
                    // Verificar si la propiedad está en la página actual
                    const propertyIndex = propiedades.findIndex(p => p.id === propiedad.id);
                    const propertyPage = Math.ceil((propertyIndex + 1) / itemsPerPage);
                    
                    // Si no está en la página actual, navegar a la página correcta
                    if (propertyPage !== currentPage) {
                      setCurrentPage(propertyPage);
                      // Esperar a que se actualice la página antes de hacer scroll
                      setTimeout(() => {
                        const propertyCard = document.querySelector(`[data-property-id="${propiedad.id}"]`);
                        if (propertyCard) {
                          propertyCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }, 100);
                    } else {
                      // Si está en la página actual, hacer scroll inmediatamente
                      const propertyCard = document.querySelector(`[data-property-id="${propiedad.id}"]`);
                      if (propertyCard) {
                        propertyCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }
                  }}
                  onMouseOver={() => setHoveredProperty(propiedad.id)}
                  onMouseOut={() => setHoveredProperty(null)}
                />
              );
            })}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default PropertyMapView;