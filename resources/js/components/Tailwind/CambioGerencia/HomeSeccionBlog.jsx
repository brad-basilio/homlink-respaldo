import React from 'react';

const HomeSeccionBlog = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans sm:p-8">
      {/* Header Section */}
      <header className="mb-8 text-center sm:mb-12">
        <div className="mb-2 flex items-center justify-center text-orange-500">
          {/* Icon for Blog */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-2.185-2.185l-.642-.642a2 2 0 00-2.185-2.185L12 9.85l-.642-.642a2 2 0 00-2.185-2.185L8.572 6.572a2 2 0 00-2.185-2.185L5 4.14l-.642-.642a2 2 0 00-2.185-2.185L2 1.85V10l2 2-2 2v8.15l.642.642a2 2 0 002.185 2.185l.642.642a2 2 0 002.185 2.185L12 21.85l.642.642a2 2 0 002.185 2.185l.642.642a2 2 0 002.185 2.185L22 22.15V14l-2-2 2-2V1.85l-.642-.642a2 2 0 00-2.185-2.185L19.428 1.428a2 2 0 00-2.185-2.185z"
            />
          </svg>
          <span className="text-xs sm:text-sm font-bold uppercase">Blog</span>
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-800 sm:text-4xl">
          Ideas que <span className="text-blue-600">transforman</span>
        </h1>
        <p className="text-sm text-gray-600 sm:text-base">
          Reflexiones, herramientas y aprendizajes para liderar el cambio desde
          lo humano.
        </p>
      </header>

      {/* Main Content - Grid of Cards */}
      <main className="grid gap-6 sm:gap-8 md:grid-cols-3">
        {/* Card 1: Guía práctica */}
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          {/* Image for Card 1 */}
          <img
            src="https://placehold.co/400x250/E0E7FF/000000?text=Guía+práctica"
            alt="People in a meeting looking at a small wind turbine model"
            className="h-48 w-full object-cover sm:h-56"
          />
          <div className="p-4 sm:p-6">
            <p className="mb-1 text-xs font-semibold uppercase text-orange-500 sm:mb-2 sm:text-sm">
              Guía práctica
            </p>
            <h2 className="mb-2 text-lg font-bold text-gray-800 sm:text-xl">
              Cómo construir una cultura organizacional saludable
            </h2>
            <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
              5 claves para alinear valores, comportamientos y propósito dentro
              de tu equipo.
            </p>
            <a href="#" className="font-semibold text-blue-600 hover:underline text-sm sm:text-base">
              Leer +
            </a>
          </div>
        </div>

        {/* Card 2: Artículo de opinión */}
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          {/* Image for Card 2 */}
          <img
            src="https://placehold.co/400x250/E0E7FF/000000?text=Artículo+de+opinión"
            alt="Three people looking up at a glass board"
            className="h-48 w-full object-cover sm:h-56"
          />
          <div className="p-4 sm:p-6">
            <p className="mb-1 text-xs font-semibold uppercase text-orange-500 sm:mb-2 sm:text-sm">
              Artículo de opinión
            </p>
            <h2 className="mb-2 text-lg font-bold text-gray-800 sm:text-xl">
              El liderazgo consciente en tiempos de incertidumbre
            </h2>
            <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
              Explora el rol de los líderes que inspiran desde la empatía, la
              visión y la escucha.
            </p>
            <a href="#" className="font-semibold text-blue-600 hover:underline text-sm sm:text-base">
              Leer +
            </a>
          </div>
        </div>

        {/* Card 3: Caso de éxito */}
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          {/* Image for Card 3 */}
          <img
            src="https://placehold.co/400x250/E0E7FF/000000?text=Caso+de+éxito"
            alt="Hand stacking wooden blocks with business icons"
            className="h-48 w-full object-cover sm:h-56"
          />
          <div className="p-4 sm:p-6">
            <p className="mb-1 text-xs font-semibold uppercase text-orange-500 sm:mb-2 sm:text-sm">
              Caso de éxito
            </p>
            <h2 className="mb-2 text-lg font-bold text-gray-800 sm:text-xl">
              Caso real: Transformamos la cultura de una empresa en 6...
            </h2>
            <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
              Conoce cómo ayudamos a una empresa del sector retail a lograr
              mayor compromiso y cohesión.
            </p>
            <a href="#" className="font-semibold text-blue-600 hover:underline text-sm sm:text-base">
              Leer +
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeSeccionBlog;
