
import React, { useState } from 'react'
import TextWithHighlight from '../../../Utils/TextWithHighlight';
import ExchangeCard from './ExchangeCard';

export default function HeroSecction({ data = [], apps = [], indicators = [] }) {
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
    console.log("indicators", indicators);
    const handleOperationStart = (operationData) => {
        console.log('Operation data:', operationData);
        // Aquí puedes manejar los datos de la operación como necesites
        // Por defecto redirigirá a mi.cambiafx.pe/login
        window.location.href = 'https://mi.cambiafx.pe/login';
    };
    return (
        <section className="bg-primary py-10 md:py-20 font-title relative overflow-hidden">
            <div className=" mx-auto px-[5%]  flex  gap-10 items-center">
                {/* Izquierda: Texto principal */}
                <div className='w-7/12'>
                    <p className="text-sm font-medium tracking-widest text-constrast mb-2 uppercase">CASA DE CAMBIO</p>
                    <h1 className="text-4xl md:text-7xl font-title font-medium text-neutral-dark leading-tight mb-4">
                        <TextWithHighlight text={data?.title} color='bg-neutral-dark font-semibold ' split_coma />


                    </h1>
                    <p className="text-lg text-neutral-light mb-6 max-w-lg">
                        {data?.description || ""}
                    </p>
                    <div className='flex gap-12 h-[300px] mt-20 relative'>
                        <img src={`/api/landing_home/media/${data?.image}`} alt={data?.title} className="w-auto h-[400px] absolute -bottom-24" onError={(e) =>
                        (e.target.src =
                            "/api/cover/thumbnail/null")
                        } />
                        <div className='w-4/12 relative'>

                        </div>
                        <div className="w-8/12 flex  flex-col  items-start  gap-4 mb-8">
                            <div>
                                <span className="text-lg font-medium">¡Descarga nuestra app!</span>
                                <div className="flex gap-2 mt-4" >
                                    {apps?.map((app, index) => (

                                        <a href={app?.link} key={index} target="_blank" rel="noopener noreferrer">
                                            <img src={`/api/app/media/${app?.image}`} alt={app?.name} className="h-12 w-auto" onError={(e) =>
                                            (e.target.src =
                                                "/api/cover/thumbnail/null")
                                            } />
                                        </a>
                                    ))}


                                </div>
                            </div>
                            <div className="flex gap-10 mt-6">
                                {
                                    indicators?.map((indicator, index) => (
                                        <div key={index} className="flex flex-col items-start">

                                            <span className="text-[52px] leading-[3rem] font-semibold text-neutral-dark ">
                                                <TextWithHighlight text={indicator?.name} color='bg-constrast' />
                                            </span>
                                            <span className="text-sm font-medium text-neutral-dark"><TextWithHighlight text={indicator?.description} color='bg-constrast' /></span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                </div>
                {/* Derecha: Card de cambio */}
                <div className='flex justify-end w-5/12'>
                    <ExchangeCard
                        title="Comienza tu cambio ahora"
                        initialOperationType="venta"
                        showCoupons={true}
                        showCredits={true}
                        onOperationStart={handleOperationStart}

                    />
                </div>
            </div>
        </section>
    )
}

