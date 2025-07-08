
import React, { useState } from 'react'
import TextWithHighlight from '../../../Utils/TextWithHighlight';

export default function IndicadoresSecctionEmpresa({ indicators }) {
    const [operationType, setOperationType] = useState('venta'); // 'compra' o 'venta'
    const [amount1, setAmount1] = useState('');
    const [amount2, setAmount2] = useState('');

    // Función para intercambiar los valores
    const handleSwap = () => {
        const temp = amount1;
        setAmount1(amount2);
        setAmount2(temp);
        // También cambiar el tipo de operación
        setOperationType(operationType === 'compra' ? 'venta' : 'compra');
    };
    return (
        <section className="w-full bg-primary py-16 px-[5%] font-title">
            <div className=" mx-auto">
                <h2 className="text-center text-4xl md:text-[52px] font-medium text-neutral-dark mb-16">
                    <span className="text-neutral-dark font-semibold">Cifras</span> <span className="text-neutral-dark">que nos respaldan</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
                    {/* Indicador 1 - Millones de soles cambiados */}
                    {indicators.map((indicator, index) => (
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                                <img src={`/api/indicator/media/${indicator.symbol}`} alt={indicator.name} className="w-12 h-12" />

                            </div>
                            <div className="text-4xl md:text-[56px] font-semibold text-neutral-dark mb-2">
                                <TextWithHighlight text={`${indicator.name}`} color="bg-constrast" />
                               </div>
                            <div className="text-neutral-dark ">
                                <TextWithHighlight text={`${indicator.description}`} color="bg-neutral-light font-semibold" />
                                
                            </div>
                        </div>
                    ))}

                    {/* Indicador 2 - Empresas registradas */}


                </div>
            </div>
        </section>
    )
}

