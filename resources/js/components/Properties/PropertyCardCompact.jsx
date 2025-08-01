import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const PropertyCardCompact = ({ propiedad, onHover = () => {}, onLeave = () => {}, isHovered = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle property card click
  const handlePropertyClick = () => {
    const slug = propiedad.slug || propiedad.id;
    window.location.href = `/property/${slug}`;
  };

  // Crear array de imágenes incluyendo main_image y gallery
  const images = [];
  
  // Agregar imagen principal
  if (propiedad.main_image_url || propiedad.main_image) {
    images.push({
      url: propiedad.main_image_url || `/api/property/media/${propiedad.main_image}`,
      alt: propiedad.title || propiedad.address
    });
  }
  
  // Agregar imágenes de galería
  if (propiedad.gallery && propiedad.gallery.length > 0) {
    propiedad.gallery.forEach((image, index) => {
      images.push({
        url: image.url || `/api/property/media/${image}`,
        alt: `${propiedad.title || propiedad.address} - Imagen ${index + 2}`
      });
    });
  }
  
  // Si no hay imágenes, usar imagen por defecto
  if (images.length === 0) {
    images.push({
      url: '/assets/images/properties/default.jpg',
      alt: propiedad.title || propiedad.address
    });
  }

  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border ${isHovered ? 'border-gray-400 shadow-lg' : 'border-gray-200'}`}
      onClick={handlePropertyClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-property-id={propiedad.id}
    >
      <div className="flex">
        {/* Property Image Carousel - Left Side */}
        <div className="w-72 h-48 relative group flex-shrink-0">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white !opacity-70 !w-2 !h-2',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !opacity-100'
            }}
            navigation={{
              nextEl: `.swiper-button-next-${propiedad.id}`,
              prevEl: `.swiper-button-prev-${propiedad.id}`,
            }}
            onSlideChange={(swiper) => {
              setCurrentIndex(swiper.activeIndex);
            }}
            className="property-swiper h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/properties/default.jpg';
                  }}
                />
              </SwiperSlide>
            ))}
            
            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <div 
                  className={`swiper-button-prev-${propiedad.id} absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all opacity-0 group-hover:opacity-100 shadow-sm`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div 
                  className={`swiper-button-next-${propiedad.id} absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all opacity-0 group-hover:opacity-100 shadow-sm`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </>
            )}
          </Swiper>
          
          {/* Badges */}
          {propiedad.featured && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-20 font-medium">
              Más evaluado
            </div>
          )}
          
          {/* Heart Icon */}
          <div className="absolute top-3 right-3 z-20">
            <button 
              className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Image dots indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Property Details - Right Side */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            {/* Platform */}
            <p className="text-gray-500 text-sm mb-1">{propiedad.platform || 'Airbnb'}</p>
            
            {/* Price */}
            <div className="flex items-baseline mb-2">
              <p className="text-lg font-bold text-gray-900">
                {propiedad.currency === 'USD' ? '$' : 'S/'} {Math.floor(propiedad.price_per_night || 120)}
              </p>
              <span className="text-sm text-red-500 ml-1 font-medium">/ por noche</span>
            </div>

            {/* Title/Address */}
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
              {propiedad.title || propiedad.address}
            </h3>
            
            {/* Location */}
            <p className="text-gray-600 text-sm mb-3">
              {[propiedad.district, propiedad.province].filter(Boolean).join(', ')}
            </p>

            {/* Property Details */}
            <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
              <span>{propiedad.bedrooms || 1} a {(propiedad.bedrooms || 1) + 1} dormitorios</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>{propiedad.area_m2 || 53} a {(propiedad.area_m2 || 53) + 27} m²</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {['Gimnasio', 'Área de juegos', 'Parrilla'].map((amenidad, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium"
              >
                {amenidad}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardCompact;