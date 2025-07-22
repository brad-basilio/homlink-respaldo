import React from 'react';
import ExchangeCard from './components/Tailwind/CambiaFX/ExchangeCard';

export default function TestExchangeCard() {
    const handleOperationStart = (operationData) => {
        // Handle operation test data
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Test ExchangeCard</h1>
                <ExchangeCard 
                    title="Test del tipo de cambio"
                    initialOperationType="venta"
                    showCoupons={true}
                    showCredits={true}
                    onOperationStart={handleOperationStart}
                />
            </div>
        </div>
    );
}
