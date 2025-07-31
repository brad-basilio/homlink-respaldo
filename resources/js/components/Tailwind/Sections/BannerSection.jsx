import React from 'react';
import { Link } from '@inertiajs/react';

const BannerSection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-red-500 to-red-400 py-16 md:py-20">
            {/* Background wave shape */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-0 left-0 w-full h-full bg-red-400 opacity-50 rounded-[50%] transform translate-x-[-30%] translate-y-[30%]"></div>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
                    {/* Left column - Text content */}
                    <div className="text-white">
                        <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                            Haz que tu propiedad brille, desde la primera imagen
                        </h2>
                        <p className="text-lg mb-8">
                            Fotografía y video profesional para destacar tu espacio y atraer más reservas. 
                            Con Homlynk, producimos contenido visual que vende: recorridos virtuales, 
                            tomas aéreas y edición optimizada para plataformas como Airbnb, Booking y más.
                        </p>
                        <Link
                            href="/solicitar-produccion"
                            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300"
                        >
                            Solicitar producción audiovisual
                        </Link>
                    </div>
                    
                    {/* Right column - Image */}
                    <div className="relative">
                        <img 
                            src="/assets/images/photography-session.jpg" 
                            alt="Sesión de fotografía profesional inmobiliaria" 
                            className="rounded-lg shadow-xl w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerSection;
