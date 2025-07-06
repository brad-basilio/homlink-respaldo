import React from 'react';
import ExchangeCard from './components/Tailwind/CambiaFX/ExchangeCard';

const ExchangeCardExample = () => {
    const handleOperationStart = (operationData) => {
        console.log('Datos de la operación:', operationData);
        // Aquí puedes manejar los datos como necesites
        // Por ejemplo, enviar a un API, abrir un modal, etc.
        
        // Ejemplo de lo que recibirás:
        /*
        {
            type: "V" o "C", // V = Venta, C = Compra
            fromAmount: 1000,
            toAmount: 3641,
            exchangeRate: 3.6410,
            couponCode: "CODIGO123" // Si hay cupón aplicado
        }
        */
        
        alert(`Operación iniciada: ${operationData.type === 'V' ? 'Venta' : 'Compra'} de ${operationData.fromAmount} con TC ${operationData.exchangeRate}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-10">
                    Ejemplo de ExchangeCard Component
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Configuración básica */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Configuración Básica</h2>
                        <ExchangeCard 
                            title="Comienza tu cambio ahora"
                            initialOperationType="venta"
                            onOperationStart={handleOperationStart}
                        />
                    </div>

                    {/* Sin cupones */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Sin Cupones</h2>
                        <ExchangeCard 
                            title="Cambio rápido y seguro"
                            initialOperationType="compra"
                            showCoupons={false}
                            showCredits={true}
                            onOperationStart={handleOperationStart}
                        />
                    </div>

                    {/* Solo intercambio */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Solo Intercambio</h2>
                        <ExchangeCard 
                            title="Intercambio simple"
                            initialOperationType="venta"
                            showCoupons={false}
                            showCredits={false}
                            onOperationStart={handleOperationStart}
                        />
                    </div>
                </div>

                {/* Documentación */}
                <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6">Documentación del Componente</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Props disponibles:</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><code className="bg-gray-100 px-2 py-1 rounded">title</code> - Título del card (default: "Comienza tu cambio ahora")</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">initialOperationType</code> - Tipo inicial: "venta" o "compra" (default: "venta")</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">showCoupons</code> - Mostrar campo de cupones (default: true)</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">showCredits</code> - Mostrar botón de créditos (default: true)</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">className</code> - Clases CSS adicionales</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">onOperationStart</code> - Función callback cuando se inicia operación</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Funcionalidades incluidas:</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Conexión automática con API de CambiaFX para tipos de cambio</li>
                                <li>Validación de cupones promocionales en tiempo real</li>
                                <li>Detección automática de cupones en URL (utm_campaign)</li>
                                <li>Cálculo automático de conversiones</li>
                                <li>Botón de intercambio entre monedas</li>
                                <li>Tasas de cambio dinámicas según el monto</li>
                                <li>Interfaz responsive y accesible</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Ejemplo de uso:</h3>
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`import ExchangeCard from './ExchangeCard';

const MyComponent = () => {
    const handleOperation = (data) => {
        console.log('Operación:', data);
        // Manejar datos de la operación
    };

    return (
        <ExchangeCard 
            title="Tu cambio aquí"
            initialOperationType="venta"
            showCoupons={true}
            showCredits={false}
            onOperationStart={handleOperation}
            className="max-w-md mx-auto"
        />
    );
};`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExchangeCardExample;
