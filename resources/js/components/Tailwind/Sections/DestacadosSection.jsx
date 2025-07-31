import React from 'react';

const DestacadosSection = () => {
  // Sample property data
  const propiedades = [
    {
      id: 1,
      imagen: '/assets/images/properties/apartment1.jpg',
      precio: 120,
      direccion: 'Av. Ricardo Palma 251, Miraflores.',
      ubicacion: 'Miraflores, Lima',
      dormitorios: '1 a 2 dormitorios',
      area: '53 a 80 m²',
      amenidades: ['Gimnasio', 'Área de juegos', 'Parrilla', 'Áreas verdes'],
      destacado: 'Más vendido',
    },
    {
      id: 2,
      imagen: '/assets/images/properties/apartment2.jpg',
      precio: 120,
      direccion: 'Av. Ricardo Palma 251, Miraflores.',
      ubicacion: 'Miraflores, Lima',
      dormitorios: '1 a 2 dormitorios',
      area: '53 a 80 m²',
      amenidades: ['Gimnasio', 'Área de juegos', 'Parrilla', 'Áreas verdes'],
    },
    {
      id: 3,
      imagen: '/assets/images/properties/apartment3.jpg',
      precio: 120,
      direccion: 'Av. Ricardo Palma 251, Miraflores.',
      ubicacion: 'Miraflores, Lima',
      dormitorios: '1 a 2 dormitorios',
      area: '53 a 80 m²',
      amenidades: ['Gimnasio', 'Área de juegos', 'Parrilla', 'Áreas verdes'],
    },
    {
      id: 4,
      imagen: '/assets/images/properties/apartment1.jpg',
      precio: 120,
      direccion: 'Av. Ricardo Palma 251, Miraflores.',
      ubicacion: 'Miraflores, Lima',
      dormitorios: '1 a 2 dormitorios',
      area: '53 a 80 m²',
      amenidades: ['Gimnasio', 'Área de juegos', 'Parrilla', 'Áreas verdes'],
    },
    {
      id: 5,
      imagen: '/assets/images/properties/apartment3.jpg',
      precio: 120,
      direccion: 'Av. Ricardo Palma 251, Miraflores.',
      ubicacion: 'Miraflores, Lima',
      dormitorios: '1 a 2 dormitorios',
      area: '53 a 80 m²',
      amenidades: ['Gimnasio', 'Área de juegos', 'Parrilla', 'Áreas verdes'],
      destacado: 'Más vendido',
    },
    {
      id: 6,
      imagen: '/assets/images/properties/apartment2.jpg',
      precio: 120,
      direccion: 'Av. Ricardo Palma 251, Miraflores.',
      ubicacion: 'Miraflores, Lima',
      dormitorios: '1 a 2 dormitorios',
      area: '53 a 80 m²',
      amenidades: ['Gimnasio', 'Área de juegos', 'Parrilla', 'Áreas verdes'],
    },
  ];

  // Function to render property cards
  const renderPropertyCard = (propiedad) => {
    return (
      <div key={propiedad.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Property image with carousel dots */}
        <div className="relative">
          <img 
            src={propiedad.imagen} 
            alt={propiedad.direccion} 
            className="w-full h-48 object-cover"
          />
          {propiedad.destacado && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {propiedad.destacado}
            </div>
          )}
          {/* Carousel dots */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            <div className="h-2 w-6 bg-white rounded-full"></div>
            <div className="h-2 w-2 bg-white bg-opacity-50 rounded-full"></div>
            <div className="h-2 w-2 bg-white bg-opacity-50 rounded-full"></div>
            <div className="h-2 w-2 bg-white bg-opacity-50 rounded-full"></div>
            <div className="h-2 w-2 bg-white bg-opacity-50 rounded-full"></div>
          </div>
        </div>

        {/* Property details */}
        <div className="p-4">
          <div className="mb-2">
            <p className="text-gray-500 text-sm">Airbnb</p>
            <div className="flex items-baseline">
              <p className="text-lg font-bold">S/ {propiedad.precio}</p>
              <span className="text-xs text-gray-500 ml-1">/ por noche</span>
            </div>
          </div>

          <h3 className="font-medium text-sm">{propiedad.direccion}</h3>
          <p className="text-gray-500 text-xs mb-2">{propiedad.ubicacion}</p>

          <div className="flex text-xs text-gray-600 mb-1 items-center gap-2">
            <span>{propiedad.dormitorios}</span>
            <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
            <span>{propiedad.area}</span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1 mt-3">
            {propiedad.amenidades.map((amenidad, index) => (
              <span 
                key={index} 
                className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {amenidad}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Destino más visitados
          </h2>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition-colors">
            Ver todas
          </button>
        </div>

        {/* Properties grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propiedades.map(renderPropertyCard)}
        </div>
      </div>
    </section>
  );
};

export default DestacadosSection;
