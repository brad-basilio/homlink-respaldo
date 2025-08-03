import React, { useState } from 'react';
import PropertyCard from '../Cards/PropertyCard';

const DestacadosSection = ({ propiedades = [], titulo = "Destino más visitados" }) => {
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
    <section className="py-20 font-paragraph bg-white px-[5%]  mx-auto">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-[40px] font-bold text-gray-800">
            {titulo}
          </h2>
          <a href='/catalogo' className="bg-secondary hover:bg-primary text-white px-5 py-3 rounded-full text-base font-bold transition-colors">
            Ver todas
          </a>
        </div>

        {/* Properties grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
};

export default DestacadosSection;
