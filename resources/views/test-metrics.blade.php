<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Test PropertyDetail Metrics</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .button { background: #3b82f6; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; margin: 10px; }
        .button:hover { background: #2563eb; }
        .log { background: #f1f5f9; padding: 15px; margin: 10px 0; border-radius: 6px; font-family: monospace; max-height: 400px; overflow-y: auto; }
        .success { color: #059669; }
        .error { color: #dc2626; }
        .info { color: #0284c7; }
    </style>
</head>
<body>
    <h1>🧪 Test PropertyDetail Metrics</h1>
    
    <div>
        <h3>📊 Tests de Métricas</h3>
        <button class="button" onclick="testPropertyView()">👁️ Test Property View</button>
        <button class="button" onclick="testGalleryView()">🖼️ Test Gallery View</button>
        <button class="button" onclick="testAirbnbClick()">📞 Test Airbnb Click</button>
        <button class="button" onclick="clearLog()">🗑️ Clear Log</button>
    </div>
    
    <div>
        <h3>🆔 Session Info</h3>
        <p><strong>Session ID:</strong> <span id="session-info">Generando...</span></p>
        <button class="button" onclick="regenerateSession()">🔄 Regenerar Session</button>
    </div>
    
    <div>
        <h3>📝 Log de Actividad</h3>
        <div id="log" class="log">Iniciando test...</div>
    </div>

    <script>
        // ✅ GENERAR SESSION_ID ÚNICO PARA TODA LA SESIÓN DEL NAVEGADOR
        function initializeSession() {
            if (!sessionStorage.getItem('app_session_id')) {
                const sessionId = `test_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                sessionStorage.setItem('app_session_id', sessionId);
                log(`🆔 Nuevo session_id generado: ${sessionId}`, 'info');
            } else {
                log(`🆔 Session_id existente: ${sessionStorage.getItem('app_session_id')}`, 'info');
            }
            document.getElementById('session-info').textContent = sessionStorage.getItem('app_session_id');
        }

        function regenerateSession() {
            sessionStorage.removeItem('app_session_id');
            initializeSession();
        }

        function log(message, type = 'info') {
            const logDiv = document.getElementById('log');
            const timestamp = new Date().toLocaleTimeString();
            const className = type === 'error' ? 'error' : type === 'success' ? 'success' : 'info';
            logDiv.innerHTML += `<div class="${className}">[${timestamp}] ${message}</div>`;
            logDiv.scrollTop = logDiv.scrollHeight;
        }

        function clearLog() {
            document.getElementById('log').innerHTML = '';
        }

        async function sendMetric(eventType, metadata = {}) {
            try {
                log(`🚀 Enviando métrica: ${eventType}`, 'info');
                
                const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
                if (!csrfToken) {
                    log('❌ CSRF token no encontrado', 'error');
                    return;
                }

                const sessionId = sessionStorage.getItem('app_session_id');
                if (!sessionId) {
                    log('❌ Session ID no encontrado', 'error');
                    return;
                }

                const response = await fetch('/api/property-metrics/track', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify({
                        property_id: 'test-property-id',
                        event_type: eventType,
                        session_id: sessionId,
                        metadata: {
                            ...metadata,
                            timestamp: new Date().toISOString(),
                            test_mode: true,
                            page: 'test_page'
                        }
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    log(`✅ Métrica ${eventType} enviada exitosamente: ${JSON.stringify(result)}`, 'success');
                } else {
                    const errorText = await response.text();
                    log(`❌ Error en respuesta (${response.status}): ${errorText}`, 'error');
                }

            } catch (error) {
                log(`❌ Error de red: ${error.message}`, 'error');
            }
        }

        function testPropertyView() {
            sendMetric('property_view', {
                page: 'test_property_detail',
                title: 'Test Property',
                slug: 'test-property'
            });
        }

        function testGalleryView() {
            sendMetric('gallery_view', {
                total_images: 5,
                slide_index: 0,
                interaction_type: 'test'
            });
        }

        function testAirbnbClick() {
            sendMetric('airbnb_click', {
                external_link: 'https://test.airbnb.com',
                user_action: 'test_click'
            });
        }

        // Inicializar cuando la página cargue
        document.addEventListener('DOMContentLoaded', function() {
            initializeSession();
            log('🎯 Test de métricas inicializado', 'info');
        });
    </script>
</body>
</html>
