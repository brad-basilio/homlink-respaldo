import React from 'react';

const HomeSeccionNosotros = () => {
    return (
        <div className="relative bg-white pb-24 pt-12 md:pt-16">
            {/* Curva decorativa en la parte inferior */}
            <div className="absolute bottom-0 left-0 w-full h-24">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
                    <path fill="#f5f5f5" fillOpacity="1" d="M0,128L1440,32L1440,320L0,320Z"></path>
                </svg>
            </div>

            <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    {/* Columna izquierda - Imágenes */}
                    <div className="lg:w-1/2 relative">
                        {/* Imagen principal grande */}
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <img 
                                src="/assets/img/nosotros/equipo-main.jpg" 
                                alt="Equipo de Cambio Gerencia" 
                                className="w-full h-auto object-cover rounded-xl"
                            />
                        </div>

                        {/* Imágenes pequeñas superpuestas */}
                        <div className="absolute top-0 left-0 -ml-12 -mt-12 w-72 h-auto rounded-xl overflow-hidden shadow-lg">
                            <img 
                                src="/assets/img/nosotros/equipo-small-1.jpg" 
                                alt="Miembro del equipo" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-[85%] h-auto rounded-xl overflow-hidden shadow-lg">
                            <img 
                                src="/assets/img/nosotros/equipo-small-2.jpg" 
                                alt="Equipo trabajando" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Cuadro de experiencia */}
                        <div className="absolute bottom-6 right-0 bg-blue-500 text-white rounded-xl p-6 shadow-lg flex flex-col items-center">
                            <div className="text-5xl font-bold flex items-center">
                                <span className="text-6xl">+</span>
                                <span className="text-6xl">3</span>
                            </div>
                            <div className="text-left">
                                <div>Años de</div>
                                <div>experiencia</div>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha - Texto */}
                    <div className="lg:w-1/2 flex flex-col justify-center">
                        {/* Título superior con icono */}
                        <div className="flex items-center mb-4">
                            <div className="text-red-500 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm0 7c-2.762 0-5-2.238-5-5s2.238-5 5-5 5 2.238 5 5-2.238 5-5 5zm0 3c-4.971 0-9 4.029-9 9h2c0-3.866 3.134-7 7-7s7 3.134 7 7h2c0-4.971-4.029-9-9-9z" />
                                </svg>
                            </div>
                            <h3 className="uppercase text-gray-900 text-lg font-bold">Nosotros</h3>
                        </div>

                        {/* Título principal */}
                        <h2 className="text-5xl font-bold mb-6 leading-tight">
                            <span className="text-gray-900">Somos agentes del </span>
                            <span className="text-blue-500">cambio humano</span>
                        </h2>

                        {/* Párrafo principal */}
                        <p className="text-gray-700 mb-10 text-lg">
                            Creemos que las verdaderas transformaciones comienzan con las personas. 
                            Desde hace más de 6 años acompañamos a organizaciones a reconectar con 
                            su propósito, potenciar a sus equipos y diseñar culturas más conscientes.
                        </p>

                        {/* Bloques de características con iconos */}
                        <div className="space-y-8 mb-10">
                            {/* Bloque 1 */}
                            <div className="flex items-start">
                                <div className="bg-red-500 rounded-full p-3 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Conectando talento con oportunidad</h4>
                                    <p className="text-gray-700">
                                        Cerramos la brecha entre profesionales capacitados 
                                        que prosperan asegurando lo correcto.
                                    </p>
                                </div>
                            </div>

                            {/* Bloque 2 */}
                            <div className="flex items-start">
                                <div className="bg-red-500 rounded-full p-3 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Su socio en el éxito laboral</h4>
                                    <p className="text-gray-700">
                                        Cerramos la brecha entre profesionales capacitados 
                                        que prosperan asegurando lo correcto.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Botón "Sobre nosotros" */}
                        <div>
                            <a 
                                href="/nosotros" 
                                className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg transition-colors"
                            >
                                <span className="font-medium">Sobre nosotros</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSeccionNosotros;
