import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PropertyCard from '../Tailwind/Cards/PropertyCard';
import Global from '../../Utils/Global';

const PropertyGrid = ({ propiedades = [], showTitle = true, title = "Propiedades Disponibles", showMap = true }) => {
  // State para manejar el índice actual de cada swiper
  const [currentIndexes, setCurrentIndexes] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'map'

  // Function to handle index change
  const handleIndexChange = (propertyId, newIndex) => {
    setCurrentIndexes(prev => ({
      ...prev,
      [propertyId]: newIndex
    }));
  };

  // Configuración del mapa
  const mapCenter = propiedades.length > 0 && propiedades[0].latitude && propiedades[0].longitude
    ? { lat: parseFloat(propiedades[0].latitude), lng: parseFloat(propiedades[0].longitude) }
    : { lat: -12.0464, lng: -77.0428 }; // Lima center

  const mapContainerStyle = {
    width: '100%',
    height: '600px'
  };

  return (
    <section className="py-8 font-paragraph bg-white">
      <div className="container mx-auto px-[5%]">
        {showTitle && (
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-[40px] font-bold text-gray-800">
              {title}
            </h2>
            
            {/* Toggle para vista grid/mapa */}
            {showMap && (
              <div className="flex items-center space-x-2 border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📋 Lista
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'map' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🗺️ Mapa
                </button>
              </div>
            )}
          </div>
        )}

        {viewMode === 'grid' ? (
          /* Vista de grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {propiedades && propiedades.length > 0 ? (
              propiedades.map((propiedad) => (
                <PropertyCard
                  key={propiedad.id}
                  propiedad={propiedad}
                  currentIndex={currentIndexes[propiedad.id] || 0}
                  onIndexChange={handleIndexChange}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No hay propiedades disponibles en este momento.</p>
              </div>
            )}
          </div>
        ) : (
          /* Vista de mapa */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
            {/* Lista de propiedades - scrolleable */}
            <div className="overflow-y-auto space-y-4 pr-4">
              {propiedades && propiedades.length > 0 ? (
                propiedades.map((propiedad) => (
                  <div key={propiedad.id} className="flex-shrink-0">
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

            {/* Mapa */}
            <div className="relative">
              <LoadScript googleMapsApiKey={Global?.GMAPS_API_KEY || ''}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={12}
                >
                  {propiedades.map((propiedad) => {
                    if (!propiedad.latitude || !propiedad.longitude) return null;
                    
                    return (
                      <Marker
                        key={propiedad.id}
                        position={{
                          lat: parseFloat(propiedad.latitude),
                          lng: parseFloat(propiedad.longitude)
                        }}
                        title={propiedad.title || propiedad.address}
                        onClick={() => {
                          // Scroll to property card
                          const propertyCard = document.querySelector(`[data-property-id="${propiedad.id}"]`);
                          if (propertyCard) {
                            propertyCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }
                        }}
                      />
                    );
                  })}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyGrid;
