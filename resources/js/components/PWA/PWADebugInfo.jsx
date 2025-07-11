import React from 'react';
import usePWAInstall from '../../hooks/usePWAInstall';

const PWADebugInfo = () => {
    const {
        canInstall,
        isInstalled,
        isIOS,
        isStandalone,
        canShowInstallPrompt,
        shouldShowPrompt,
        deferredPrompt
    } = usePWAInstall();

    // Solo mostrar en desarrollo
    if (!window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: 10,
            right: 10,
            background: '#000',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 10000,
            maxWidth: '300px'
        }}>
            <div><strong>PWA Debug Info:</strong></div>
            <div>Can Install: {canInstall ? '✅' : '❌'}</div>
            <div>Is Installed: {isInstalled ? '✅' : '❌'}</div>
            <div>Is iOS: {isIOS ? '✅' : '❌'}</div>
            <div>Is Standalone: {isStandalone ? '✅' : '❌'}</div>
            <div>Can Show Prompt: {canShowInstallPrompt() ? '✅' : '❌'}</div>
            <div>Should Show Prompt: {shouldShowPrompt() ? '✅' : '❌'}</div>
            <div>Has Deferred Prompt: {deferredPrompt ? '✅' : '❌'}</div>
            <div>User Agent: {navigator.userAgent.substring(0, 50)}...</div>
            <div>Viewport: {window.innerWidth}x{window.innerHeight}</div>
        </div>
    );
};

export default PWADebugInfo;
