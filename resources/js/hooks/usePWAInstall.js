import { useState, useEffect } from 'react';

const usePWAInstall = () => {
    const [canInstall, setCanInstall] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Detectar iOS
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        setIsIOS(iOS);

        // Detectar si ya está instalada como PWA
        const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                          window.navigator.standalone || 
                          document.referrer.includes('android-app://');
        setIsStandalone(standalone);
        setIsInstalled(standalone);

        // Escuchar el evento beforeinstallprompt
        const handleBeforeInstallPrompt = (e) => {
            console.log('PWA: beforeinstallprompt event fired');
            e.preventDefault();
            setDeferredPrompt(e);
            setCanInstall(true);
        };

        // Escuchar cuando la app se instala
        const handleAppInstalled = () => {
            console.log('PWA: App was installed');
            setCanInstall(false);
            setIsInstalled(true);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const installPWA = async () => {
        if (!deferredPrompt) return false;

        try {
            deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA: User accepted the install prompt');
                setCanInstall(false);
                setDeferredPrompt(null);
                return true;
            } else {
                console.log('PWA: User dismissed the install prompt');
                return false;
            }
        } catch (error) {
            console.error('PWA: Error during installation:', error);
            return false;
        }
    };

    const canShowInstallPrompt = () => {
        // No mostrar si ya está instalada
        if (isInstalled || isStandalone) return false;
        
        // No mostrar en desktop
        if (!window.matchMedia('(max-width: 768px)').matches) return false;
        
        // Para iOS siempre se puede mostrar las instrucciones
        if (isIOS) return true;
        
        // Para otros browsers, verificar si está disponible
        return canInstall && deferredPrompt !== null;
    };

    const hasSeenPrompt = () => {
        const key = isIOS ? 'pwa-ios-install-dismissed' : 'pwa-install-dismissed';
        const lastDismissedKey = isIOS ? 'pwa-ios-install-last-dismissed' : 'pwa-install-last-dismissed';
        
        const hasSeenPrompt = localStorage.getItem(key);
        const lastDismissed = localStorage.getItem(lastDismissedKey);
        
        if (!hasSeenPrompt) return false;
        
        // Si han pasado más de 7 días, mostrar otra vez
        if (lastDismissed) {
            const now = Date.now();
            const dayInMs = 24 * 60 * 60 * 1000;
            const daysSinceLastDismissed = (now - parseInt(lastDismissed)) / dayInMs;
            
            return daysSinceLastDismissed < 7;
        }
        
        return true;
    };

    const shouldShowPrompt = () => {
        return canShowInstallPrompt() && !hasSeenPrompt();
    };

    return {
        canInstall,
        isInstalled,
        isIOS,
        isStandalone,
        canShowInstallPrompt,
        shouldShowPrompt,
        installPWA,
        deferredPrompt
    };
};

export default usePWAInstall;
