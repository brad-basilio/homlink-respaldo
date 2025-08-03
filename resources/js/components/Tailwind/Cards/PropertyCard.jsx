import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const PropertyCard = ({ propiedad, currentIndex = 0, onIndexChange = () => {} }) => {
  // Function to handle property card click
  const handlePropertyClick = () => {
    // Crear slug si no existe
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
      className="bg-[#E8EFFDB8] font-medium rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handlePropertyClick}
      data-property-id={propiedad.id}
    >
      {/* Property image carousel */}
      <div className="relative group">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-white !opacity-70',
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !opacity-100'
          }}
          navigation={{
            nextEl: `.swiper-button-next-${propiedad.id}`,
            prevEl: `.swiper-button-prev-${propiedad.id}`,
          }}
          onSlideChange={(swiper) => {
            onIndexChange(propiedad.id, swiper.activeIndex);
          }}
          className="property-swiper h-48"
          onClick={(e) => e.stopPropagation()} // Prevenir que el click en el swiper abra el detalle
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img 
                src={image.url}
                alt={image.alt}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/properties/default.jpg';
                }}
              />
            </SwiperSlide>
          ))}
          
          {/* Navigation arrows - solo mostrar si hay más de 1 imagen */}
          {images.length > 1 && (
            <>
              <div 
                className={`swiper-button-prev-${propiedad.id} absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-70 transition-all opacity-0 group-hover:opacity-100`}
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <div 
                className={`swiper-button-next-${propiedad.id} absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-70 transition-all opacity-0 group-hover:opacity-100`}
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </>
          )}
        </Swiper>
        
        {/* Featured badge */}
        {propiedad.featured && (
          <div className="absolute top-0 right-0 bg-secondary text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg z-20">
            Destacado
          </div>
        )}
        
       
      </div>

      {/* Property details */}
      <div className="p-4">
        <div className="mb-2">
          <p className="text-gray-500 text-sm">{propiedad.platform || 'Airbnb'}</p>
          <div className="flex items-baseline">
            <p className="text-lg font-bold">
              {propiedad.currency === 'USD' ? '$' : 'S/'} {parseFloat(propiedad.price_per_night || 0).toFixed(0)}
            </p>
            <span className="text-xs text-secondary ml-1">/ por noche</span>
          </div>
        </div>

        <h3 className="font-medium text-sm text-gray-800">{propiedad.title || propiedad.address}</h3>
        <p className="text-gray-500 text-xs mb-2">
          {[propiedad.district, propiedad.province].filter(Boolean).join(', ')}
        </p>

        <div className="flex text-xs text-gray-600 mb-3 items-center gap-2">
          <span>{propiedad.bedrooms || 1} a {(propiedad.bedrooms || 1) + 1} dormitorios</span>
          <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
          <span>{propiedad.area_m2 || 53} a {(propiedad.area_m2 || 53) + 27} m²</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mt-3">
          {propiedad.amenities && propiedad.amenities.slice(0, 4).map((amenidad, index) => (
            <span 
              key={index} 
              className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {amenidad.name || amenidad}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
