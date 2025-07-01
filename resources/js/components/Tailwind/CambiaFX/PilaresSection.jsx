import React, { useEffect, useState } from 'react';

const PilaresSection = () => {
    const [animationOffset, setAnimationOffset] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    
    const cards = [
        {
            title: "Amplia *cobertura* bancaria",
         
            description: "YAPE, PLIN. No cobramos comisiones.",
          
        },
        {
            title: "Tiempo *récord* en el mercado",
           
            description: "Recibe tu cambio en un tiempo mínimo de 10 minutos",

        },
        {
            title: "Atención *Personalizada*",
         
            description: "Estamos aquí para ayudarte en cada paso del camino",
           
        },
        {
            title: "Tiempo *récord* en el mercado",
           
            description: "Transacciones 100% seguras y verificadas",
         
        },
        {
            title: "Soporte *24/7* siempre",
         
            description: "Te atendemos en cualquier momento",
         
        },
        {
            title: "Mejores *tasas* del mercado",
        
            description: "Siempre el mejor tipo de cambio",
          
        }
    ];

    useEffect(() => {
        if (!isAutoplay) return;
        
        const interval = setInterval(() => {
            setAnimationOffset((prev) => {
                const nextOffset = prev + 1;
                // Reinicia suavemente el loop
                if (nextOffset >= cards.length) {
                    return 0;
                }
                return nextOffset;
            });
        }, 3000); // Cambia cada 3 segundos para más suavidad

        return () => clearInterval(interval);
    }, [cards.length, isAutoplay]);

    // Función para renderizar el título con texto destacado
    const renderTitle = (title) => {
        const parts = title.split(/(\*[^*]+\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                const text = part.slice(1, -1); // Remover los asteriscos
                return (
                    <span key={index} className="font-semibold text-constrast">
                        {text}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    // Función para control manual
    const handleManualControl = (direction) => {
        setIsAutoplay(false);
        setAnimationOffset((prev) => {
            if (direction === 'up') {
                return prev > 0 ? prev - 1 : cards.length - 1;
            } else {
                return prev < cards.length - 1 ? prev + 1 : 0;
            }
        });
        
        // Reactivar autoplay después de 5 segundos de inactividad
        setTimeout(() => setIsAutoplay(true), 5000);
    };

    return (
        <section className="bg-neutral-dark  px-2 md:px-0 w-full relative overflow-hidden font-title">
            {/* Banda decorativa diagonal */}
          <div className="absolute bottom-0 right-0  w-full h-full z-0 pointer-events-none">
                <img 
                    src="/assets/cambiafx/pilares-overlay.png" 
                    alt="Fondo" 
                    className="h-full object-cover pt-16"
                    style={{
                        maskImage: 'linear-gradient(to left, transparent, black 300px)',
                        WebkitMaskImage: 'linear-gradient(to left, transparent, black 300px)'
                    }}
                />
            </div>

            <div className="px-[5%] mx-auto relative z-10 flex flex-col lg:flex-row items-end gap-12">
                {/* Columna izquierda: textos */}
                <div className="flex-1 relative h-[580px]  flex flex-col justify-start items-start">
                    <div className="uppercase text-white text-sm font-medium tracking-widest mb-4">NUESTROS PILARES</div>
                    <h2 className="text-5xl md:text-[64px] tracking-[94%] font-medium text-white mb-6">
                        ¿Qué nos<br />
                        hace <span className="text-secondary font-semibold ">únicos</span>?
                    </h2>
                    <p className="text-xl text-white mb-4 max-w-md">
                        En <span className="font-semibold">Cambia FX</span>, no solo te ofrecemos la mejor tasa del mercado, sino también una experiencia integral diseñada para satisfacer todas tus <span className="font-semibold">necesidades financieras</span>.
                    </p>
                
                    <img src="/assets/cambiafx/pilares-person.webp" alt="Persona" className="absolute h-[450px] scale-x-[-1] top-56 right-0 object-cover z-10" />
                </div>

                {/* Columna derecha: tarjetas animadas en dos columnas */}
               <div className='relative flex-1'>
                   {/* Controles de navegación */}
                    <div className="absolute -right-0 top-1/2 transform -translate-y-1/2 z-30 flex flex-col gap-4">
                        <button 
                            onClick={() => handleManualControl('up')}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 text-white group-hover:text-[#C6FF6B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => handleManualControl('down')}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 text-white group-hover:text-[#C6FF6B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                 <div className="flex-1 flex justify-center items-center relative h-[650px] overflow-x-auto scrollbar-hide overflow-y-hidden">
                    {/* Degradados superior e inferior */}
                    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-neutral-dark to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-neutral-dark to-transparent z-20 pointer-events-none"></div>
                    
                 
                    <div className="flex gap-6 w-full max-w-[600px] justify-center">
                        {/* Columna 1 - Sube */}
                        <div className="flex flex-col gap-4 w-[250px] relative">
                            <div 
                                className="flex flex-col gap-4 transition-transform duration-1000 ease-in-out"
                                style={{
                                    transform: `translateY(${-130 * (animationOffset % cards.length)}px)`
                                }}
                            >
                                {/* Triplicamos las tarjetas para efecto infinito más suave */}
                                {[...cards, ...cards, ...cards].map((card, index) => (
                                    <div
                                        key={`col1-${index}`}
                                        className="bg-white rounded-2xl shadow-xl p-6 w-full min-h-[120px] flex-shrink-0 hover:shadow-2xl transition-shadow duration-300"
                                    >
                                        <div className="text-center">
                                            <h3 className="text-[32px] leading-[94%] font-medium text-neutral-dark mb-3">
                                                {renderTitle(card.title)}
                                            </h3>
                                            <p className="text-base text-neutral-light font-normal">
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Columna 2 - Baja */}
                        <div className="flex flex-col gap-4 w-[250px] relative">
                            <div 
                                className="flex flex-col gap-4 transition-transform duration-1000 ease-in-out"
                                style={{
                                    transform: `translateY(${130 * (animationOffset % cards.length)}px)`
                                }}
                            >
                                {/* Triplicamos las tarjetas con offset diferente */}
                                {[...cards.slice(3), ...cards, ...cards, ...cards.slice(0, 3)].map((card, index) => (
                                    <div
                                        key={`col2-${index}`}
                                        className="bg-white rounded-2xl shadow-xl p-6 w-full min-h-[120px] flex-shrink-0 hover:shadow-2xl transition-shadow duration-300"
                                    >
                                        <div className="text-center">
                                          <h3 className="text-[32px] leading-[94%] font-medium text-neutral-dark mb-3">
                                                {renderTitle(card.title)}
                                            </h3>
                                            <p className="text-base text-neutral-light font-normal">
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                  
                </div>
               </div>
            </div>
        </section>
    );
}

export default PilaresSection;