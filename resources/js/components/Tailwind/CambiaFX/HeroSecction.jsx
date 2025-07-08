
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
        <section className="bg-primary  -z-20 py-10 md:py-20 font-title relative overflow-hidden">

            {/* Overlay SVG en el fondo */}
            <div className="absolute w-full h-full inset-0 -z-10">
                <svg className='w-full h-full object-cover' width="1032" height="696" viewBox="0 0 1032 696" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M962.486 762.894C901.955 871.616 810.878 955.559 705.847 999.2C482.713 1086.8 265.287 1039.12 123.123 872.135C-16.4963 708.189 -39.4199 470.768 66.0483 281.333C103.611 213.865 155.93 153.528 221.813 101.827L223.621 100.484C265.297 70.3687 442.611 -32.9777 547.184 11.146C585.342 27.3298 609.663 60.7518 615.961 105.286L616.35 108.394C618.309 132.8 612.99 156.95 601.083 178.335C581.495 213.518 546.221 236.895 506.839 240.995C413.347 248.045 326.008 306.236 277.537 393.296C253.955 435.653 240.812 482.739 239.779 529.336L239.628 532.144C233.044 616.317 271.902 694.704 346.244 747.119C426.944 803.977 529.509 815.534 614.122 777.153C671.303 753.141 722.176 705.554 755.207 646.226C798.762 567.996 804.421 482.946 770.356 418.796C750.69 382.724 751.112 338.497 771.775 301.383C782.76 281.653 798.908 265.34 818.394 254.139C849.498 236.031 885.012 232.849 917.871 245.541C953.658 259.32 982.403 290.506 995.451 329.581C1053.88 458.806 1041.55 620.57 962.428 762.681L962.486 762.894Z" fill="url(#paint0_linear_92_2288)" fill-opacity="0.6" />
                    <defs>
                        <linearGradient id="paint0_linear_92_2288" x1="55.0487" y1="301.09" x2="945.994" y2="792.447" gradientUnits="userSpaceOnUse">
                            <stop offset="0.483986" stop-color="#FFFDF9" />
                            <stop offset="1" stop-color="#C7B7FF" stop-opacity="0.2" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 mx-auto px-[5%] flex gap-10 items-center">
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
                        <img src={`/api/landing_home/media/${data?.image}`} alt={data?.title} className="w-auto h-[400px] absolute top-4" onError={(e) =>
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
                                                <TextWithHighlight text={indicator?.name} color='bg-constrast' counter />
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

