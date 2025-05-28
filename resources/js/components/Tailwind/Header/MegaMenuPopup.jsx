import React, { useState } from "react";
import { X } from "lucide-react";

const menuData = {
  infraestructura: {
    title: "Infraestructura",
    subtitle: "Optimiza tu trabajo con herramientas diseñadas para potenciar la eficiencia y la colaboración.",
    services: [
      {
        title: "Centro de Datos",
        description: "Proin dui augue, eleifend ac feugiat ut, dignissim quis augue. Pellentesque ac enim convallis.",
      },
      {
        title: "Virtualización",
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

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-16">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.key
                      ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {/* Close Button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{currentData.title}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{currentData.subtitle}</p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {currentData.services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>

            {/* Additional Service */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{currentData.additional.title}</h3>
              <p className="text-gray-600 leading-relaxed">{currentData.additional.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuPopup;