import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone, PlayCircle, Apple } from 'lucide-react';

const AppStoreBanner = ({ apps = [] }) => {
    const [showBanner, setShowBanner] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState({
        isAndroid: false,
        isIOS: false,
        isHuawei: false,
        isMobile: false
    });

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Detectar sistemas operativos
        const isAndroid = /android/i.test(userAgent);
        const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
        const isHuawei = /huawei|honor/i.test(userAgent) || /harmony/i.test(userAgent);
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        
        // Verificar si ya está instalada como PWA
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                            window.navigator.standalone || 
                            document.referrer.includes('android-app://');

        // Verificar si ya fue dismissado
        const bannerDismissed = localStorage.getItem('app-store-banner-dismissed');
        const lastDismissed = localStorage.getItem('app-store-banner-last-dismissed');
        
        setDeviceInfo({ isAndroid, isIOS, isHuawei, isMobile });

        // Condiciones para mostrar el banner
        const shouldShow = isMobile && 
                          !isStandalone && 
                          (isAndroid || isIOS || isHuawei) &&
                          apps && apps.length > 0;

        if (!shouldShow) return;

        // Si ya fue dismissado, verificar si han pasado 3 días
        if (bannerDismissed && lastDismissed) {
            const now = Date.now();
            const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
            if ((now - parseInt(lastDismissed)) < threeDaysInMs) {
                return;
            }
        }

        // Mostrar después de 2 segundos
        const timer = setTimeout(() => {
            setShowBanner(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, [apps]);

    // Obtener la app correcta según el dispositivo
    const getAppForDevice = () => {
        if (!apps || apps.length === 0) return null;

        if (deviceInfo.isAndroid) {
            return apps.find(app => 
                app.name?.toLowerCase().includes('google play') ||
                app.name?.toLowerCase().includes('android') ||
                app.name?.toLowerCase().includes('play store')
            );
        }
        
        if (deviceInfo.isIOS) {
            return apps.find(app => 
                app.name?.toLowerCase().includes('app store') ||
                app.name?.toLowerCase().includes('ios') ||
                app.name?.toLowerCase().includes('apple')
            );
        }
        
        if (deviceInfo.isHuawei) {
            return apps.find(app => 
                app.name?.toLowerCase().includes('app gallery') ||
                app.name?.toLowerCase().includes('huawei') ||
                app.name?.toLowerCase().includes('harmony')
            );
        }

        return null;
    };

    const currentApp = getAppForDevice();

    const handleDismiss = () => {
        setShowBanner(false);
        localStorage.setItem('app-store-banner-dismissed', 'true');
        localStorage.setItem('app-store-banner-last-dismissed', Date.now().toString());
    };

    const getStoreName = () => {
        if (deviceInfo.isAndroid) return 'Google Play';
        if (deviceInfo.isIOS) return 'App Store';
        if (deviceInfo.isHuawei) return 'AppGallery';
        return 'Tienda de Apps';
    };

    const getStoreIcon = () => {
        if (deviceInfo.isAndroid) return <PlayCircle size={20} />;
        if (deviceInfo.isIOS) return <Apple size={20} />;
        if (deviceInfo.isHuawei) return <Smartphone size={20} />;
        return <Smartphone size={20} />;
    };

    if (!showBanner || !currentApp) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-primary shadow-2xl backdrop-blur-sm border-b border-neutral-dark/10 shadow-lg shadow-blue-800/30 animate-slide-down">
            <div className="flex items-center px-5 py-3.5 max-w-6xl mx-auto gap-4 sm:px-4 sm:py-3 sm:gap-3">
                <div className="flex-shrink-0 p-0.5 backdrop-blur-sm">
                    <img 
                        src="/icon-192x192.png" 
                        alt="CambiaFX" 
                        className="w-11 h-11 rounded-xl object-cover block sm:w-10 sm:h-10"
                    />
                </div>
                
                <div className="flex-1 min-w-0 text-neutral-dark">
                    <div className="text-base font-bold mb-1 text-neutral-dark drop-shadow-sm truncate sm:text-sm">
                        Descarga CambiaFX
                    </div>
                    <div className="text-sm text-neutral-dark/90 flex items-center gap-2 truncate sm:text-xs">
                        <span className="flex items-center text-neutral-dark/90">{getStoreIcon()}</span>
                        Disponible en {getStoreName()}
                    </div>
                </div>
                
                <div className="flex items-center gap-3 flex-shrink-0">
                    <a 
                        href={currentApp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-neutral-dark/95 text-secondary px-2 py-2 rounded-full text-sm font-semibold no-underline transition-all duration-300 ease-out border-none cursor-pointer shadow-sm hover:bg-neutral-dark hover:-translate-y-0.5 hover:shadow-md hover:text-blue-800 hover:no-underline active:translate-y-0 sm:px-3.5 sm:py-2 sm:text-xs sm:gap-1"
                    >
                        <Download size={16} />
                        <span className="hidden">Descargar</span>
                    </a>
                    <button 
                        className="bg-neutral-dark/10 border border-neutral-dark/20 text-neutral-dark cursor-pointer p-2 rounded-full flex items-center justify-center transition-all duration-200 ease-out backdrop-blur-sm hover:bg-neutral-dark/20 hover:scale-110"
                        onClick={handleDismiss}
                        aria-label="Cerrar"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppStoreBanner;
