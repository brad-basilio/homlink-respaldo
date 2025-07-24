import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PopupManager = () => {
    const [popups, setPopups] = useState([]);
    const [currentPopup, setCurrentPopup] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        loadPopups();
    }, []);

    const loadPopups = async () => {
        try {
            const response = await axios.get('/api/ads/today');
         
            
            if (response.data && response.data.length > 0) {
                setPopups(response.data);
                schedulePopups(response.data);
            }
        } catch (error) {
            console.error('❌ Error cargando popups:', error);
        }
    };

    const schedulePopups = (popupsData) => {
       
        
        // Separar popups por tipo
        const immediatePopups = popupsData.filter(popup => 
            popup.actions === 0 && (popup.seconds === 0 || popup.seconds === null)
        );
        const delayedPopups = popupsData.filter(popup => 
            popup.actions === 0 && popup.seconds > 0
        );
        
        // Mostrar popups inmediatos
        if (immediatePopups.length > 0) {
            showPopup(immediatePopups[0]);
        }
        
        // Programar popups con delay
        delayedPopups.forEach(popup => {
            const delay = popup.seconds * 1000;
         
            setTimeout(() => {
                showPopup(popup);
            }, delay);
        });
    };

    const showPopup = (popup) => {
     
        setCurrentPopup(popup);
        setIsVisible(true);
        
        // Usar la duración configurada del popup o 10 segundos por defecto
        const displayDuration = (popup.duration || 10) * 1000;
        
        // Auto-cerrar después del tiempo configurado
        const autoCloseTimeout = setTimeout(() => {
            closePopup();
        }, displayDuration);
        
        setTimeoutId(autoCloseTimeout);
    };

    const closePopup = () => {
       
        setIsVisible(false);
        setCurrentPopup(null);
        
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
    };

    const handlePopupClick = () => {
        if (currentPopup?.link) {
            window.open(currentPopup.link, '_blank');
        }
        closePopup();
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closePopup();
        }
    };

    // Hook para escuchar eventos de carrito (para popups de acciones)
    useEffect(() => {
        const handleCartAction = (event) => {
            const { itemId } = event.detail;
         
            
            // Buscar popups que se activen con este producto
            const cartPopups = popups.filter(popup => 
                popup.actions === 1 && popup.item_id === itemId
            );
            
            if (cartPopups.length > 0) {
                showPopup(cartPopups[0]);
            }
        };

        window.addEventListener('productAddedToCart', handleCartAction);
        
        return () => {
            window.removeEventListener('productAddedToCart', handleCartAction);
        };
    }, [popups]);

    if (!currentPopup || !isVisible) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-neutral-dark/70 backdrop-blur-sm flex items-center justify-center z-[99999] p-4 animate-fade-in"
            onClick={handleBackdropClick}
        >
            <div className="bg-primary rounded-3xl max-w-lg w-full mx-4 shadow-2xl border border-neutral/20 transform animate-fade-in-up">
                {/* Header con botón de cerrar */}
                <div className="flex justify-end p-4 pb-0">
                    <button
                        onClick={closePopup}
                        className="w-8 h-8 bg-neutral/20 hover:bg-neutral/40 rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4L4 12M4 4L12 12" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                {/* Contenido del popup */}
                <div className="px-6 pb-6">
                    {/* Imagen */}
                    {currentPopup.image && (
                        <div className="mb-4 text-center">
                            <img
                                src={`/api/ads/media/${currentPopup.image}`}
                                alt={currentPopup.name}
                                className="w-full h-auto object-cover rounded-2xl shadow-lg"
                              
                            />
                        </div>
                    )}

                    {/* Título */}
                    {currentPopup.name && (
                        <h3 className="text-xl font-bold text-neutral-dark mb-3 text-center font-title">
                            {currentPopup.name}
                        </h3>
                    )}

                    {/* Descripción */}
                    {currentPopup.description && (
                        <p className="text-neutral-light mb-4 text-center font-paragraph leading-relaxed">
                            {currentPopup.description}
                        </p>
                    )}

                    {/* Botón de acción */}
                    {currentPopup.link ? (
                        <button
                            onClick={handlePopupClick}
                            className="w-full py-3 bg-gradient-to-r from-constrast to-constrast/90 text-primary rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-constrast/30 transition-all duration-300 font-title"
                        >
                            Ver más información
                        </button>
                    ) : (
                        <button
                            onClick={closePopup}
                            className="w-full py-3 bg-gradient-to-r from-secondary to-secondary/90 text-neutral-dark rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 font-title"
                        >
                            Entendido
                        </button>
                    )}
                </div>

                {/* Indicador de tiempo si es invasivo */}
                {currentPopup.invasivo && (
                    <div className="text-center pb-4">
                        <span className="text-xs text-neutral-light/60 font-paragraph">
                            Este anuncio se cerrará automáticamente en {currentPopup.duration || 10} segundos
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopupManager;
