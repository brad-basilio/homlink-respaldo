import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PropertyCard from '../Tailwind/Cards/PropertyCard';
import Global from '../../Utils/Global';

const PropertyMapView = ({ propiedades = [] }) => {
  const [hoveredProperty, setHoveredProperty] = useState(null);

  // Configuración del mapa
  const mapCenter = propiedades.length > 0 && propiedades[0].latitude && propiedades[0].longitude
    ? { lat: parseFloat(propiedades[0].latitude), lng: parseFloat(propiedades[0].longitude) }
    : { lat: -12.0464, lng: -77.0428 }; // Lima center

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
        <div className="py-10 grid grid-cols-3 gap-6">
          {propiedades && propiedades.length > 0 ? (
            propiedades.map((propiedad) => (
              <div 
                key={propiedad.id} 
                className={`transition-all duration-300 ${hoveredProperty === propiedad.id ? 'shadow-lg ring-1 ring-secondary transform scale-[1.02]' : ''}`}
                onMouseEnter={() => setHoveredProperty(propiedad.id)}
                onMouseLeave={() => setHoveredProperty(null)}
                data-property-id={propiedad.id}
              >
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

        {/* Load More Button */}
        {propiedades && propiedades.length > 0 && (
          <div className="p-4 text-center  bg-white sticky bottom-0">
            <button className="w-full py-3 px-6 bg-secondary hover:bg-primary text-white rounded-lg font-medium transition-colors">
              Ver más propiedades
            </button>
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
              
              // Create icon configuration safely
              const iconConfig = {
                url: isHovered 
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
                iconConfig.scaledSize = isHovered 
                  ? new window.google.maps.Size(80, 40)
                  : new window.google.maps.Size(70, 32);
                
                iconConfig.anchor = isHovered 
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
                    // Scroll to property card
                    const propertyCard = document.querySelector(`[data-property-id="${propiedad.id}"]`);
                    if (propertyCard) {
                      propertyCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
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