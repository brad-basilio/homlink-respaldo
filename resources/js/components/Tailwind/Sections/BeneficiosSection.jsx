import React from 'react';

const BeneficiosSection = () => {
  // Sample benefit data
  const beneficios = [
    {
      id: 1,
      titulo: "Beneficio o valor",
      descripcion: "Donec vehicula purus at diam facilisis tempor. Donec lacinia felis nibh, vel consectetur leo tincidunt nec."
    },
    {
      id: 2,
      titulo: "Beneficio o valor",
      descripcion: "Donec vehicula purus at diam facilisis tempor. Donec lacinia felis nibh, vel consectetur leo tincidunt nec."
    },
    {
      id: 3,
      titulo: "Beneficio o valor",
      descripcion: "Donec vehicula purus at diam facilisis tempor. Donec lacinia felis nibh, vel consectetur leo tincidunt nec."
    },
    {
      id: 4,
      titulo: "Beneficio o valor",
      descripcion: "Donec vehicula purus at diam facilisis tempor. Donec lacinia felis nibh, vel consectetur leo tincidunt nec."
    }
  ];

  return (
    <section className="bg-blue-600 relative overflow-hidden py-16 md:py-24">
      {/* Decorative shape - orange curve */}
      <div className="absolute top-0 left-0 w-2/3 h-full">
        <svg 
          viewBox="0 0 500 800" 
          className="h-full" 
          preserveAspectRatio="none"
          fill="none"
        >
          <path 
            d="M0,0 Q300,100 350,400 Q400,700 0,800" 
            fill="#FF5533" 
            opacity="0.85"
          />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h2 className="text-5xl font-bold mb-4">
              Conectamos personas<br /> 
              con su lugar ideal
            </h2>
            <p className="text-xl mb-8">
              Desde la exploración hasta la celebración de tu nuevo hogar o local,
              nuestra tecnología hace el proceso más claro y accesible.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {beneficios.map((beneficio) => (
                <div 
                  key={beneficio.id} 
                  className="bg-white text-gray-800 p-6 rounded-lg shadow-md"
                >
                  <div className="bg-red-500 rounded-full w-8 h-8 flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{beneficio.titulo}</h3>
                  <p className="text-gray-600">{beneficio.descripcion}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-12 lg:col-span-8 h-96">
              <img 
                src="/assets/images/modern-house-with-pool.jpg" 
                alt="Casa moderna con piscina"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:col-span-6 lg:col-span-4 h-48">
              <img 
                src="/assets/images/bedroom-design.jpg" 
                alt="Diseño de dormitorio"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:col-span-6 lg:col-span-4 h-48">
              <img 
                src="/assets/images/living-room.jpg" 
                alt="Sala de estar"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeneficiosSection;
