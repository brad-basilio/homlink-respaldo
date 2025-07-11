import React from 'react';

const AppDebugInfo = ({ apps = [] }) => {
    // Solo mostrar en desarrollo
    if (!window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
        return null;
    }

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isHuawei = /huawei|honor/i.test(userAgent) || /harmony/i.test(userAgent);
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    return (
        <div style={{
            position: 'fixed',
            bottom: 10,
            left: 10,
            background: '#333',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '11px',
            zIndex: 10001,
            maxWidth: '280px',
            opacity: 0.9
        }}>
            <div><strong>App Store Debug:</strong></div>
            <div>Is Android: {isAndroid ? '✅' : '❌'}</div>
            <div>Is iOS: {isIOS ? '✅' : '❌'}</div>
            <div>Is Huawei: {isHuawei ? '✅' : '❌'}</div>
            <div>Is Mobile: {isMobile ? '✅' : '❌'}</div>
            <div>Apps Count: {apps?.length || 0}</div>
            {apps && apps.length > 0 && (
                <div style={{ marginTop: '8px', maxHeight: '100px', overflow: 'auto' }}>
                    <div><strong>Available Apps:</strong></div>
                    {apps.map((app, index) => (
                        <div key={index} style={{ fontSize: '10px', marginLeft: '4px' }}>
                            • {app.name} {app.status ? '✅' : '❌'}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AppDebugInfo;
