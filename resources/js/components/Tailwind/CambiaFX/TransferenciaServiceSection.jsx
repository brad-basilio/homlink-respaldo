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
    <div className="min-h-screen bg-neutral-dark px-[5%] py-12 ">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content and Services */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="mb-4">
                <span className="text-secondary text-sm font-medium tracking-[8%] uppercase">
                  SERVICIOS
                </span>
              </div>
                 <h2 className="text-3xl md:text-4xl lg:text-[64px] font-medium text-white my-4">
                Transferencia FX
              </h2>
              <p className="text-white text-lg ">
                Transfiere a otro banco a una baja comisión.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-secondary rounded-2xl p-6  transition-colors duration-300 group"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-constrast rounded-full flex items-center justify-center text-white mb-4  transition-colors duration-300">
                    {service.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-neutral-dark font-medium text-xl mb-3 leading-tight">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-neutral-light text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image Card */}
          <div className="relative">
           <img src='/assets/cambiafx/transferencia-person.webp' alt='Transferencia FX' className='w-full h-auto object-cover rounded-3xl' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferenciaServiceSection;