import React from 'react';

// Placeholder SVGs for icons (replace with your actual icons if available)
// Using a generic icon for all cards for simplicity in this example.
const GenericIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
    <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 .75-2.251C3.129 9.766 6.016 8.18 9.315 7.584ZM15 17.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd" />
  </svg>
);


const ServiceCard = ({ title, description, linkText = "+ información", bgColor = "bg-white", textColor = "text-slate-800", titleColor = "text-slate-900", iconBgColor = "bg-red-500", hasImage = false, imageUrl = "" }) => {
  if (hasImage) {
    return (
      <div className={`rounded-lg shadow-xl overflow-hidden flex flex-col h-full ${bgColor}`}>
        <img 
          src={imageUrl || "https://placehold.co/600x400/cccccc/808080?text=Servicios+de+RRHH"} 
          alt={title} 
          className="w-full h-48 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/cccccc/808080?text=Imagen+no+disponible"; }}
        />
        <div className="p-6 flex flex-col flex-grow">
          <h3 className={`text-xl font-semibold mb-2 ${titleColor}`}>{title}</h3>
          <p className={`text-sm mb-4 flex-grow ${textColor === 'text-white' ? 'text-gray-200' : 'text-gray-600'}`}>{description}</p>
          <a href="#" className={`mt-auto inline-block font-semibold ${textColor === 'text-white' ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-600'}`}>
            {linkText} &rarr;
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-lg shadow-xl flex flex-col h-full ${bgColor}`}>
      <div className={`p-3 rounded-full ${iconBgColor} w-12 h-12 flex items-center justify-center mb-4`}>
        <GenericIcon />
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${titleColor}`}>{title}</h3>
      <p className={`text-sm mb-4 flex-grow ${textColor === 'text-white' ? 'text-gray-200' : 'text-gray-600'}`}>{description}</p>
      <a href="#" className={`mt-auto inline-block font-semibold ${textColor === 'text-white' ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-600'}`}>
        {linkText} &rarr;
      </a>
    </div>
  );
};

const HomeSeccionServicios = () => {
  const servicesRow1 = [
    {
      title: "Capacitaciones",
      description: "Desarrollamos, Habilidades de liderazgo, Equipos de alto desempeño, Competencias blandas, Equipos comerciales y de servicio, Team Building.",
      bgColor: "bg-white",
      textColor: "text-slate-800",
      titleColor: "text-slate-900",
      iconBgColor: "bg-red-500"
    },
    {
      title: "Total Change",
      description: "Gestión soft de la transformación digital, enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus.",
      bgColor: "bg-blue-600", // Special background for this card
      textColor: "text-white",
      titleColor: "text-white",
      iconBgColor: "bg-red-500" // Icon background remains red as per image
    },
    {
      title: "Culture360",
      description: "Transformamos la cultura organizacional, orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
      bgColor: "bg-white",
      textColor: "text-slate-800",
      titleColor: "text-slate-900",
      iconBgColor: "bg-red-500"
    },
    {
      title: "Servicios de RR.HH",
      description: "Herramientas ágiles para la gestión del talent. enean commodo ligula eget dolor.",
      linkText: "Reserva una consulta",
      hasImage: true,
      imageUrl: "https://placehold.co/600x400/d3d3d3/4a4a4a?text=Imagen+RRHH", // Replace with actual image
      bgColor: "bg-slate-700", // Darker background for the image card
      textColor: "text-white",
      titleColor: "text-white",
    }
  ];

  const servicesRow2 = [
    {
      title: "PeoplePower",
      description: "Potenciamos la gestión de procesos de clima y desarrollo del potencial, enean commodo ligula eget dolor. Aenean massa. Cum sociis.",
      bgColor: "bg-white",
      textColor: "text-slate-800",
      titleColor: "text-slate-900",
      iconBgColor: "bg-red-500"
    },
    {
      title: "ConnectCI",
      description: "Potenciamiento y diseño estratégico de la comunicación interna, enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus.",
      bgColor: "bg-white",
      textColor: "text-slate-800",
      titleColor: "text-slate-900",
      iconBgColor: "bg-red-500"
    },
    {
      title: "Trust & Connect",
      description: "Gestión reputacional, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus.",
      bgColor: "bg-white",
      textColor: "text-slate-800",
      titleColor: "text-slate-900",
      iconBgColor: "bg-red-500"
    },
    {
      title: "XP Co-Lab",
      description: "Herramientas ágiles para la gestión del talent, enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus.",
      bgColor: "bg-white",
      textColor: "text-slate-800",
      titleColor: "text-slate-900",
      iconBgColor: "bg-red-500"
    }
  ];

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-sm text-red-500 font-semibold tracking-wider uppercase mb-2">& SERVICIOS</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 leading-tight">
            Lo humano al centro, <br className="hidden sm:block" />
            lo estratégico <span className="text-blue-600">en acción</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Creamos intervenciones a medida para acompañar procesos de transformación, fortalecer liderazgos y conectar a los equipos con el propósito organizacional.
          </p>
        </div>

        {/* Services Grid - Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {servicesRow1.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              linkText={service.linkText}
              bgColor={service.bgColor}
              textColor={service.textColor}
              titleColor={service.titleColor}
              iconBgColor={service.iconBgColor}
              hasImage={service.hasImage}
              imageUrl={service.imageUrl}
            />
          ))}
        </div>

        {/* Services Grid - Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesRow2.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              linkText={service.linkText}
              bgColor={service.bgColor}
              textColor={service.textColor}
              titleColor={service.titleColor}
              iconBgColor={service.iconBgColor}
              hasImage={service.hasImage}
              imageUrl={service.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSeccionServicios;