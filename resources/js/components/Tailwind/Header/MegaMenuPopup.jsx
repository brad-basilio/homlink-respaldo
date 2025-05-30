import React, { useState } from "react";
import { X } from "lucide-react";

const menuData = {
  infraestructura: {
    title: "Servicios",
    subtitle: "Creamos intervenciones a medida para acompañar procesos de transformación, fortalecer liderazgos y conectar a los equipos con el propósito organizacional",
    services: [
      {
        title: "Capacitaciones",
        description: "Desarrollamos, Habilidades de liderazgo, Equipos de alto desempeño, Competencias blandas, Equipos comerciales y de servicio, Team Building.",
      },
      {
        title: "Culture360",
        description: "Proin dui augue, eleifend ac feugiat ut, dignissim quis augue. Pellentesque ac enim convallis.",
      },
      {
        title: "Redes",
        description: "Proin dui augue, eleifend ac feugiat ut, dignissim quis augue. Pellentesque ac enim convallis.",
      },
      {
        title: "Servidores",
        description: "Proin dui augue, eleifend ac feugiat ut, dignissim quis augue. Pellentesque ac enim convallis.",
      },
      {
        title: "aaaaaa",
        description: "Proin dui augue, eleifend ac feugiat ut, dignissim quis augue. Pellentesque ac enim convallis.",
      },
    ],
    additional: {
      title: "Almacenamiento",
      description: "Complemento de Cloud Pak for Business Automation para automatizar flujos de trabajo.",
    },
  },
  productividad: {
    title: "Productividad",
    subtitle: "Herramientas y soluciones para maximizar la eficiencia de tu equipo de trabajo.",
    services: [
      {
        title: "Colaboración",
        description: "Plataformas integradas para trabajo en equipo y comunicación efectiva.",
      },
      {
        title: "Automatización",
        description: "Procesos automatizados que reducen tareas repetitivas y errores.",
      },
      {
        title: "Análisis",
        description: "Herramientas de análisis para tomar decisiones basadas en datos.",
      },
      {
        title: "Gestión",
        description: "Sistemas de gestión empresarial para optimizar recursos.",
      },
    ],
    additional: {
      title: "Integración",
      description: "Conecta todas tus herramientas en un ecosistema unificado.",
    },
  },
  seguridad: {
    title: "Seguridad",
    subtitle: "Protege tu información y sistemas con las mejores prácticas de ciberseguridad.",
    services: [
      {
        title: "Firewall",
        description: "Protección perimetral avanzada contra amenazas externas.",
      },
      {
        title: "Antivirus",
        description: "Detección y eliminación de malware en tiempo real.",
      },
      {
        title: "Backup",
        description: "Respaldo automático y recuperación de datos críticos.",
      },
      {
        title: "Monitoreo",
        description: "Supervisión continua de la seguridad de tu infraestructura.",
      },
    ],
    additional: {
      title: "Auditoría",
      description: "Evaluación completa de vulnerabilidades y cumplimiento normativo.",
    },
  },
};

const navigationItems = [
  { key: "infraestructura", label: "Infraestructura" },
  { key: "productividad", label: "Productividad" },
  { key: "seguridad", label: "Seguridad" },
  { key: "transformacion", label: "Transformación Digital" },
  { key: "energia", label: "Energía" },
];

const MegaMenuPopup = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState("infraestructura");

  if (!isOpen) return null;

  const currentData = menuData[activeSection] || menuData.infraestructura;
  // 
  return (
    <div className="fixed bg-black/40 text-neutral-dark font-paragraph inset-0 z-50 flex items-start justify-center mt-[120px]">
      <div className="bg-neutral-light px-[5%] relative 2xl:rounded-b-lg w-full max-h-[90vh] overflow-hidden">
        {/* Imagen de fondo alineada a la derecha debajo del contenido */}
        <div className="absolute top-0 right-0 h-full z-0 pointer-events-none flex justify-end items-end w-auto">
          <img
            src="/assets/cambiogerencia/mask-menu.png"
            alt="Equipo de Cambio Gerencia"
            className="h-full object-cover max-w-[60vw] lg:max-w-[40vw] opacity-50"
          />
        </div>
        <div className="flex flex-row h-full">

          {/* Sidebar Navigation */}
          <div className="w-1/5 py-8">
            <nav className="space-y-1 w-full h-full  overflow-y-auto">
              <img
                src="/assets/cambiogerencia/image-menu.webp"
                alt="Testimonios"
                className="w-full lg:w-auto  h-auto lg:h-full object-cover rounded-3xl shadow-lg"
              />
            </nav>
          </div>

          {/* Main Content */}
          <div className="w-4/5 px-8 py-8 overflow-y-auto border-t border-gray-200 relative">
            {/* Close Button */}
            <div className="flex justify-end mb-1 absolute right-5">
              <button
                onClick={onClose}
                className="p-2 text-constrast border border-constrast hover:text-constrast  rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Header */}
            <div className="mb-4">
              <h2 className="text-[28px] font-semibold font-title text-primary mb-1">{currentData.title}</h2>
              <p className="text-primary text-base max-w-2xl  leading-relaxed">{currentData.subtitle}</p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-8 max-h-96 overflow-y-auto">
              {currentData.services.map((service, index) => {
                // Alternar aleatoriamente entre los 3 colores de hover
                const hoverColors = [
                  'hover:bg-accent hover:text-white',
                  'hover:bg-primary hover:text-white',
                  'hover:bg-constrast hover:text-white',
                ];
                // Para que sea "aleatorio" pero consistente en cada render, usar el index y un offset
                const colorClass = hoverColors[index % hoverColors.length];
                return (
                  <div
                    key={index}
                    className={`rounded-lg p-4 2xl:p-6 cursor-pointer transition-colors duration-200 ${colorClass}`}
                  >
                    <h3 className="text-base  font-semibold mb-1 transition-colors duration-200">{service.title}</h3>
                    <p className="leading-relaxed text-sm  line-clamp-2 transition-colors duration-200">{service.description}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuPopup;