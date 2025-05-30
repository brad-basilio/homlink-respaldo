import React from 'react';

// Placeholder SVGs for icons (replace with your actual icons if available)
// Using generic icons that somewhat resemble the ones in the image.
const IconIncorporacion = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3.75 19.125h16.5M16.5 19.125V6.375A2.625 2.625 0 0 0 13.875 3.75H7.125A2.625 2.625 0 0 0 4.5 6.375v12.75" />
  </svg>
);

const IconCompromiso = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

const IconCrecimiento = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
  </svg>
);

const IconSatisfaccion = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75Zm+4.5 0c0 .414-.168.75-.375.75s-.375-.414-.375-.75.168-.75.375-.75.375.336.375.75Z" />
  </svg>
);


const StatCard = ({ icon, title, percentage, description }) => (
  <div className="flex flex-col items-center text-center md:items-start md:text-left">
    <div className="bg-red-500 p-3 rounded-full mb-4 inline-block">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-5xl font-bold text-red-500 mb-3">{percentage}%</p>
    <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
  </div>
);

const HomeSeccionImpacto = () => {
  const stats = [
    {
      icon: <IconIncorporacion />,
      title: "Incorporación sin problemas",
      percentage: 75,
      description: "Los nuevos empleados se sienten valorados y seguros al comenzar su trayectoria."
    },
    {
      icon: <IconCompromiso />,
      title: "Compromiso de los empleados",
      percentage: 90,
      description: "Aumente la motivación y la productividad fomentando una cultura de reconocimiento."
    },
    {
      icon: <IconCrecimiento />,
      title: "Crecimiento y desarrollo",
      percentage: 80,
      description: "Ayude a los empleados a alcanzar su máximo potencial mediante capacitación."
    },
    {
      icon: <IconSatisfaccion />,
      title: "Satisfacción en el lugar de trabajo",
      percentage: 85,
      description: "Crear un ambiente de trabajo positivo que priorice el bienestar de los empleados."
    }
  ];

  return (
    <div className="bg-slate-800 text-white py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 lg:mb-16">
          <div className="mb-8 md:mb-0">
            <p className="text-sm text-red-500 font-semibold tracking-wider uppercase mb-1">& IMPACTO</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Resultados que <br className="hidden sm:block" />
              hablan por sí solos
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-xl">
              Más de 100 organizaciones han confiado en nosotros para rediseñar su cultura y potenciar sus equipos.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out text-sm sm:text-base">
              Solicita una consulta gratuita &rarr;
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              percentage={stat.percentage}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSeccionImpacto;