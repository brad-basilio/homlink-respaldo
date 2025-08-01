import React, { useState } from 'react';

const PropertyFiltersModal = ({ isOpen, onClose, onApplyFilters, currentFilters = {} }) => {
  // Initialize states based on current filters
  const [selectedRecommended, setSelectedRecommended] = useState(
    currentFilters.instantBook ? 'reservacion' : 'estacionamiento'
  );
  const [selectedAccommodationType, setSelectedAccommodationType] = useState(
    currentFilters.propertyType || 'cualquier'
  );
  const [selectedServices, setSelectedServices] = useState(
    currentFilters.services || ['wifi', 'aire', 'televisor', 'cocina']
  );
  const [selectedAmenities, setSelectedAmenities] = useState(
    currentFilters.amenities || ['lavadora', 'coworking']
  );
  const [selectedFeatures, setSelectedFeatures] = useState(
    currentFilters.characteristics || ['piscina', 'estacionamiento']
  );
  const [selectedHighlighted, setSelectedHighlighted] = useState(
    currentFilters.featured ? 'favoritos' : 'luxe'
  );

  // Update states when currentFilters change
  React.useEffect(() => {
    if (currentFilters) {
      setSelectedRecommended(currentFilters.instantBook ? 'reservacion' : 'estacionamiento');
      setSelectedAccommodationType(currentFilters.propertyType || 'cualquier');
      setSelectedServices(currentFilters.services || ['wifi', 'aire', 'televisor', 'cocina']);
      setSelectedAmenities(currentFilters.amenities || ['lavadora', 'coworking']);
      setSelectedFeatures(currentFilters.characteristics || ['piscina', 'estacionamiento']);
      setSelectedHighlighted(currentFilters.featured ? 'favoritos' : 'luxe');
    }
  }, [currentFilters]);

  if (!isOpen) return null;

  const recommendedOptions = [
    {
      id: 'reservacion',
      label: 'Reservación inmediata',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'estacionamiento',
      label: 'Estacionamiento gratuito',
      icon: (
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M8 7h4a3 3 0 0 1 0 6h-4V7z" />
          <path d="M8 13h3" />
        </svg>
      ),
      selected: false
    },
    {
      id: 'lavadora',
      label: 'Lavadora y secadora',
      icon: (
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M8 3v3M16 3v3M8 18v3M16 18v3" />
        </svg>
      ),
      selected: false
    },
    {
      id: 'llegada',
      label: 'Llegada autónoma',
      icon: (
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
        </svg>
      ),
      selected: false
    }
  ];

  const accommodationTypes = [
    { id: 'cualquier', label: 'Cualquier tipo' },
    { id: 'habitacion', label: 'Habitación' },
    { id: 'alojamiento', label: 'Alojamiento entero' }
  ];

  const services = [
    {
      id: 'wifi',
      label: 'Wifi',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'aire',
      label: 'Aire acondicionado',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'televisor',
      label: 'Televisor',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'cocina',
      label: 'Cocina',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'secadora',
      label: 'Secadora',
      icon: (
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      selected: false
    },
    {
      id: 'gimnasio',
      label: 'Gimnasio',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12" />
        </svg>
      ),
      selected: true
    }
  ];

  const amenities = [
    {
      id: 'lavadora',
      label: 'Lavadora',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M8 3v3M16 3v3M8 18v3M16 18v3" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'calefaccion',
      label: 'Calefacción',
      icon: (
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      selected: false
    },
    {
      id: 'coworking',
      label: 'Coworking',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'secadora',
      label: 'Secadora de...',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'plancha',
      label: 'Plancha',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      selected: true
    }
  ];

  const features = [
    {
      id: 'piscina',
      label: 'Piscina',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'jacuzzi',
      label: 'Jacuzzi',
      icon: (
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18A2 2 0 0 1 23 12v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z" />
        </svg>
      ),
      selected: false
    },
    {
      id: 'estacionamiento',
      label: 'Estacionamiento...',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'cargador',
      label: 'Cargador de e...',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'cuna',
      label: 'Cuna para be...',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'cama',
      label: 'Cama King',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'parrilla',
      label: 'Parrilla',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'desayuno',
      label: 'Desayuno',
      icon: (
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      selected: false
    },
    {
      id: 'apto',
      label: 'Apto para fumador...',
      icon: (
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      selected: false
    }
  ];

  const highlightedOptions = [
    {
      id: 'favoritos',
      label: 'Favoritos entre huéspedes',
      subtitle: 'Los alojamientos más populares en Homlyink',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      selected: true
    },
    {
      id: 'luxe',
      label: 'Luxe',
      subtitle: 'Alojamientos de lujo con un diseño único',
      icon: (
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      selected: false
    }
  ];

  const toggleService = (serviceId) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const toggleAmenity = (amenityId) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const toggleFeature = (featureId) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const clearFilters = () => {
    setSelectedRecommended('reservacion');
    setSelectedAccommodationType('cualquier');
    setSelectedServices([]);
    setSelectedAmenities([]);
    setSelectedFeatures([]);
    setSelectedHighlighted('favoritos');
  };

  const applyFilters = () => {
    const filters = {
      recommended: selectedRecommended,
      accommodationType: selectedAccommodationType,
      services: selectedServices,
      amenities: selectedAmenities,
      features: selectedFeatures,
      highlighted: selectedHighlighted
    };
    onApplyFilters(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4">
   <div className='overflow-hidden rounded-xl'>
   <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filtros</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Recomendado para ti */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recomendado para ti</h3>
            <div className="grid grid-cols-2 gap-3">
              {recommendedOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedRecommended(option.id)}
                  className={`p-3 border rounded-lg text-left transition-all ${selectedRecommended === option.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div className="text-2xl mb-1">{option.icon}</div>
                  <div className="text-sm font-medium text-blue-600">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de alojamiento */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tipo de alojamiento</h3>
            <div className="flex space-x-2">
              {accommodationTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedAccommodationType(type.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedAccommodationType === type.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Servicios</h3>
            <p className="text-sm text-gray-600 mb-4">Popular</p>
            <div className="grid grid-cols-2 gap-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`p-3 border rounded-lg text-left transition-all ${selectedServices.includes(service.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">{service.icon}</span>
                      <span className="text-sm font-medium text-blue-600">{service.label}</span>
                    </div>
                    {selectedServices.includes(service.id) && (
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Comodidades */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Comodidades</h3>
            <div className="grid grid-cols-2 gap-3">
              {amenities.map((amenity) => (
                <button
                  key={amenity.id}
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`p-3 border rounded-lg text-left transition-all ${selectedAmenities.includes(amenity.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">{amenity.icon}</span>
                      <span className="text-sm font-medium text-blue-600">{amenity.label}</span>
                    </div>
                    {selectedAmenities.includes(amenity.id) && (
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Características */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Características</h3>
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`p-3 border rounded-lg text-left transition-all ${selectedFeatures.includes(feature.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">{feature.icon}</span>
                      <span className="text-sm font-medium text-blue-600">{feature.label}</span>
                    </div>
                    {selectedFeatures.includes(feature.id) && (
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Alojamientos destacados */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Alojamientos destacados</h3>
            <div className="space-y-3">
              {highlightedOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedHighlighted(option.id)}
                  className={`w-full p-4 border rounded-lg text-left transition-all ${selectedHighlighted === option.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        {option.icon}
                        <span className="font-medium text-blue-600">{option.label}</span>
                      </div>
                      <p className="text-xs text-gray-600">{option.subtitle}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedHighlighted === option.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                      }`}>
                      {selectedHighlighted === option.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-4 border-t bg-gray-50">
          <button
            onClick={clearFilters}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            Limpiar filtros
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Mostrar alojamientos
          </button>
        </div>
      </div>
   </div>
    </div>
  );
};

export default PropertyFiltersModal;