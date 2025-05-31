import React from "react";
import { Link } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import { CarritoProvider } from "./context/CarritoContext";
const DetalleCasoExito = ({ 
  proyectoInfo = {
    categoria: "Recursos Humanos",
    cliente: "Mundomedic",
    fecha_inicio: "22 de enero de 2023",
    fecha_final: "30 de marzo de 2023",
    duracion: "2 meses"
  },
  titulo = "Soluciones de RR.HH para el éxito de las fuerzas de trabajo",
  contenido = {
    descripcion: "Nuestro equipo diseñó un programa de RR.HH con estrategias generalizadas implementados para la fuerza laboral, adaptados a las necesidades de su empresa para usted. Desde la selección de talento hasta la capacitación de empleados y el establecimiento de procesos, le brindamos las herramientas necesarias para crear una manera operativa.",
    desafios: "Al comprender los desafíos únicos de la organización, proporcionamos soluciones personalizadas que impulsaron el crecimiento, atrajeron a los talentos clave y fortalecieron la cultura laboral. La fuerza laboral. Este enfoque dio resultados concretos reflejados en la gestión de recursos humanos.",
    resultados: "Este programa brinda orientación a profesionales en la formulación de soluciones integradas de RR. HH. en empresas o en tu organización. Colaboraremos mano a mano con el cliente para identificar los principales retos y guiarles, implementando cambios específicos para la optimización, el crecimiento de los empleados, y rapidez de lanzamiento normativo.",
  },
  subtitulo1 = "Aenean vel vestibulum lorem",
  contenido1 = "Nos asociamos con empresas de diversos sectores, proporcionando soluciones innovadoras que resultan en un mayor productividad, crecimiento y éxito. Visualizamos un mundo donde las empresas y las personas prosperen juntas hacia las operaciones que fomenten la innovación, la creatividad y el éxito.",
  benefits = [
    {
      icon: "people",
      title: "Fuerza laboral mejorada",
      description: "Optimiza la fuerza de trabajo para evitar desaciertos"
    },
    {
      icon: "target",
      title: "Mayor retención de empleados",
      description: "Optimiza la fuerza de trabajo para evitar desaciertos"
    },
    {
      icon: "target",
      title: "Reclutamiento optimizado",
      description: "Con éxito a través de profesionales cualificados"
    },
    {
      icon: "target",
      title: "Reclutamiento optimizado",
      description: "Con éxito a través de profesionales cualificados"
    }
  ],
  seccionAzul = {
    titulo: "Etiam sit amet dapibus augue",
    descripcion: "Ofrecemos soluciones en RR. HH. personalizadas, diseñadas para adaptarse a los requisitos específicos de cada empresa. Desde la selección de talento hasta la capacitación de empleados, nuestros servicios integran las mejores prácticas de la fuerza laboral, el conocimiento normativo y la visión a largo plazo.",
    solucion: [
      "Asignamos equipos mixtos de consultores con experiencia de negocios y servicios integrales.",
      "Una alta calidad de consultoría tailored y personalizada hecha para la empresa."
    ],
    desafio: [
      "Manejo de cumplimiento y optimización del resultado.",
      "Estrategias en RR.HH. para impulsar la productividad de los empleados."
    ],
    imagen: "/assets/cambiogerencia/proceso-rrhh.jpg"
  },
  casosSimilares = [
    {
      title: "Soluciones de RR.HH para el éxito de las fuerzas de trabajo",
      image: "/assets/cambiogerencia/caso-1.webp"
    },
    {
      title: "Estrategias de desarrollo profesional RR.HH para el éxito",
      image: "/assets/cambiogerencia/caso-2.webp"
    },
    {
      title: "Soluciones de RR.HH para el éxito de las fuerzas de trabajo",
      image: "/assets/cambiogerencia/caso-3.webp"
    }
  ],
  faq = [
    {
      pregunta: "¿Ut sed felis eu odio aliquam conectetur et et quam?",
      respuesta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor."
    },
    {
      pregunta: "¿Cómo puedo empezar a utilizar sus servicios?",
      respuesta: "Ofrecemos una gama completa de soluciones de RR. HH. diseñadas para satisfacer las necesidades cambiantes de empresas y empleados. Nuestros servicios incluyen la contratación estra-tégica, asesor."
    },
    {
      pregunta: "¿Donec sagittis, enim id vehicula efficitur, mauris felis egestas nulla?",
      respuesta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor."
    },
    {
      pregunta: "¿Ut sed felis eu odio aliquam conectetur et et quam?",
      respuesta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor."
    },
    {
      pregunta: "¿Donec sagittis, enim id vehicula efficitur, mauris felis egestas nulla?",
      respuesta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor."
    }
  ],
  empresa = {
    nombre: "Sourcegraph S.A.",
    descripcion: "ABCD Emprendiendo sistemas desde el 2022",
    porcentaje: "60%",
    porcentajeTexto: "Disminución del porcentaje de errores todavía respecto al 60% de codificaciones de industrias similares.",
    productos: ["Total Change", "Priorize Base"]
  }
}) => {
  // Iconos para los beneficios
  const IconPeople = () => (
    <div className="bg-accent rounded-full p-3 text-white">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );

  const IconTarget = () => (
    <div className="bg-accent rounded-full p-3 text-white">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );

  // Iconos para las preguntas frecuentes
  const IconDownArrow = () => (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#0090E3"/>
      <path d="M8 10l4 4 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const IconUpArrow = () => (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#D62828"/>
      <path d="M16 14l-4-4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Estado para controlar qué pregunta está abierta
  const [openFaq, setOpenFaq] = React.useState(1);

  // Función para manejar el clic en una pregunta
  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  return (
    <div className="w-full font-paragraph">
      {/* Sección de información del proyecto */}
      <section className="w-full px-[5%] py-10 bg-white flex flex-col md:flex-row gap-6">
        {/* Tarjeta de información del proyecto */}
        <div className="w-full md:w-64 bg-white shadow-md rounded-lg p-6 h-fit">
          <h3 className="text-neutral-dark text-lg font-medium mb-4">Información del proyecto</h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs text-neutral-500 mb-1">Categoría</p>
              <p className="text-sm text-constrast font-medium">{proyectoInfo.categoria}</p>
            </div>
            
            <div>
              <p className="text-xs text-neutral-500 mb-1">Cliente</p>
              <p className="text-sm text-neutral-dark">{proyectoInfo.cliente}</p>
            </div>
            
            <div>
              <p className="text-xs text-neutral-500 mb-1">Fecha de inicio</p>
              <p className="text-sm text-neutral-dark">{proyectoInfo.fecha_inicio}</p>
            </div>
            
            <div>
              <p className="text-xs text-neutral-500 mb-1">Fecha de finalización</p>
              <p className="text-sm text-neutral-dark">{proyectoInfo.fecha_final}</p>
            </div>
            
            <div>
              <p className="text-xs text-neutral-500 mb-1">Duración</p>
              <p className="text-sm text-neutral-dark">{proyectoInfo.duracion}</p>
            </div>
          </div>
        </div>
        
        {/* Imagen de proyecto */}
        <div className="flex-1 rounded-lg overflow-hidden">
          <img 
            src="/assets/cambiogerencia/proyecto-rrhh.jpg" 
            alt="Proyecto de Recursos Humanos" 
            className="w-full h-64 object-cover"
          />
        </div>
      </section>

      {/* Sección de datos de empresa */}
      <section className="w-full px-[5%] py-10 bg-white flex flex-col md:flex-row gap-8">
        {/* Tarjeta de información de la empresa */}
        <div className="w-full md:w-64 bg-white shadow-md rounded-lg p-6 h-fit">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/assets/cambiogerencia/logo-cliente.svg" 
              alt={empresa.nombre}
              className="h-16"
            />
          </div>
          
          <h4 className="text-center text-sm text-neutral-dark mb-6">{empresa.nombre}</h4>
          <p className="text-xs text-center text-neutral-500 mb-6">{empresa.descripcion}</p>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-3xl font-bold text-accent">{empresa.porcentaje}</span>
              <span></span>
            </div>
            <p className="text-xs text-neutral-500">{empresa.porcentajeTexto}</p>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-neutral-dark mb-3">Productos o servicios utilizados</h5>
            <ul className="space-y-2">
              {empresa.productos.map((producto, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                  <span className="text-xs">{producto}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-xs text-accent font-bold uppercase">CASO DE ÉXITO</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-medium mb-6">
            Soluciones de <span className="text-constrast">RR.HH</span> para el éxito de las fuerzas de trabajo
          </h1>
          
          <div className="space-y-6 mb-8">
            <p className="text-neutral-dark">{contenido.descripcion}</p>
            <p className="text-neutral-dark">{contenido.desafios}</p>
            <p className="text-neutral-dark">{contenido.resultados}</p>
          </div>
          
          <h2 className="text-2xl font-medium text-neutral-dark mb-4">{subtitulo1}</h2>
          <p className="text-neutral-dark mb-8">{contenido1}</p>
          
          {/* Beneficios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                {benefit.icon === "people" ? <IconPeople /> : <IconTarget />}
                <div>
                  <h3 className="font-medium text-lg text-neutral-dark mb-1">{benefit.title}</h3>
                  <p className="text-sm text-neutral-500">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-neutral-dark mb-8">{contenido.descripcion}</p>
        </div>
      </section>

      {/* Sección azul */}
      <section className="w-full px-[5%] py-12 bg-primary text-white">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-medium mb-6">{seccionAzul.titulo}</h2>
            <p className="mb-8 text-white/90">{seccionAzul.descripcion}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="font-medium mb-4">Solución del proyecto</h3>
                <ul className="space-y-3">
                  {seccionAzul.solucion.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="bg-green-500 rounded-full p-1 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Desafío del proyecto</h3>
                <ul className="space-y-3">
                  {seccionAzul.desafio.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="bg-accent rounded-full p-1 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <p className="text-sm">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img 
              src={seccionAzul.imagen} 
              alt="Proceso de RR.HH." 
              className="rounded-lg max-w-full max-h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Sección de preguntas frecuentes */}
      <section className="w-full px-[5%] py-12 bg-white">
        <h2 className="text-2xl md:text-3xl font-medium mb-8">
          Preguntas <span className="text-constrast">Frecuentes</span>
        </h2>
        
        <div className="space-y-4 max-w-3xl">
          {faq.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full px-6 py-4 text-left transition-colors duration-200 flex items-center justify-between ${
                  openFaq === index ? "bg-constrast text-white" : "bg-gray-50"
                }`}
              >
                <span className="font-medium">{item.pregunta}</span>
                <span>{openFaq === index ? <IconUpArrow /> : <IconDownArrow />}</span>
              </button>
              
              {openFaq === index && (
                <div className={`px-6 py-4 ${openFaq === index ? "bg-constrast text-white" : ""}`}>
                  <p>{item.respuesta}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sección de casos similares */}
      <section className="w-full px-[5%] py-12 bg-gray-100">
        <div className="text-center mb-8">
          <span className="text-xs text-accent font-bold uppercase">CASOS DE ÉXITO</span>
          <h2 className="text-2xl md:text-3xl font-medium mt-2">
            Revisa otros <span className="text-constrast">casos de éxito</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {casosSimilares.map((caso, index) => (
            <div key={index} className="group relative rounded-lg overflow-hidden shadow-md">
              <img 
                src={caso.image} 
                alt={caso.title}
                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 transition-opacity duration-300">
                <h3 className="text-white text-xl font-medium mb-3">{caso.title}</h3>
                
                <div className="flex justify-end">
                  <Link href="#" className="bg-constrast hover:bg-accent transition-colors duration-300 rounded-full p-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-constrast/90 via-primary/80 to-primary/60 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-white text-xl font-medium mb-3">{caso.title}</h3>
                
                <div className="flex justify-end">
                  <Link href="#" className="bg-accent hover:bg-accent/80 transition-colors duration-300 rounded-full p-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <DetalleCasoExito {...properties} />
            </Base>
        </CarritoProvider>
    );
});