import React from 'react';
import { Layers, Users } from 'lucide-react';

const TransferenciaServiceSection = () => {
  const services = [
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Paga menos comisión por tu transferencia",
      description: "Transacciones 100% digitales con altos estándares de seguridad y protección de datos."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Cobertura bancaria, YAPE, PLIN. No cobramos comisiones",
      description: "Te damos acceso al mejor tipo de cambio del mercado sin comisiones ocultas."
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Trabajamos con Empresas y Personas",
      description: "Transacciones 100% digitales con altos estándares de seguridad y protección de datos."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Atención personalizada",
      description: "Te damos acceso al mejor tipo de cambio del mercado sin comisiones ocultas."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-12 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content and Services */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="mb-4">
                <span className="text-lime-400 text-sm font-medium tracking-wider uppercase">
                  SERVICIOS
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transferencia FX
              </h2>
              <p className="text-gray-300 text-lg md:text-xl">
                Transfiere a otro banco a una baja comisión.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-lime-400 rounded-2xl p-6 hover:bg-lime-300 transition-colors duration-300 group"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white mb-4 group-hover:bg-purple-600 transition-colors duration-300">
                    {service.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-gray-900 font-bold text-base mb-3 leading-tight">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 relative overflow-hidden min-h-[500px] flex items-center justify-center">
              {/* Decorative green shapes */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-lime-400 rounded-full opacity-80 -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-lime-400 rounded-full opacity-80 translate-x-20 translate-y-20"></div>
              <div className="absolute top-1/2 right-0 w-24 h-24 bg-lime-400 rounded-full opacity-60 translate-x-12"></div>
              
              {/* Woman image */}
              <div className="relative z-10 w-full max-w-sm mx-auto">
                <img 
                  src="/image.png" 
                  alt="Woman with phone and credit card" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferenciaServiceSection;