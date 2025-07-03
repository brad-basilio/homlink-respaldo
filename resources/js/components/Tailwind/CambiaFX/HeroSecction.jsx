
import React, { useState } from 'react'
import TextWithHighlight from '../../../Utils/TextWithHighlight';

export default function HeroSecction({data=[]}) {
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
        <section className="bg-primary py-10 md:py-20 font-title relative overflow-hidden">
            <div className=" mx-auto px-[5%]  flex  gap-10 items-center">
                {/* Izquierda: Texto principal */}
                <div className='w-7/12'>
                    <p className="text-sm font-medium tracking-widest text-constrast mb-2 uppercase">CASA DE CAMBIO</p>
                    <h1 className="text-4xl md:text-7xl font-title font-medium text-neutral-dark leading-tight mb-4">
                        <TextWithHighlight text={data?.title} color='bg-neutral-dark font-semibold ' split_coma  />
                        
                    
                    </h1>
                    <p className="text-lg text-neutral-light mb-6 max-w-lg">
                       {data?.description || ""    }
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
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        <img src="/assets/cambiafx/google_play.png" alt="Google Play" className="h-12 w-auto" />
                                    </a>
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        <img src="/assets/cambiafx/apple_store.png" alt="App Store" className="h-12 w-auto" />
                                    </a>
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        <img src="/assets/cambiafx/app_gallery.png" alt="AppGallery" className="h-12 w-auto" />
                                    </a>
                                </div>
                            </div>
                            <div className="flex gap-10 mt-6">
                                <div className="flex flex-col items-start">
                                    <span className="text-[52px] leading-[3rem] font-semibold text-constrast">+<span className='text-neutral-dark'>6</span></span>
                                    <span className="text-sm font-medium text-neutral-dark">años de <span className="text-constrast">experiencia</span></span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[52px] font-semibold leading-[3rem] text-constrast"><span className='text-neutral-dark'>3</span>%</span>
                                    <span className="text-sm font-medium  text-neutral-dark">más <span className="text-constrast">ahorro</span> por operación</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Derecha: Card de cambio */}
                <div className='flex justify-end w-5/12'>
                    <div className="bg-secondary rounded-3xl p-8 shadow-xl flex flex-col gap-6 w-full max-w-[480px] ">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-[28px] leading-[94%] font-base text-neutral-light">Comienza tu <span className="text-neutral-light font-semibold">cambio</span> ahora</h2>
                            </div>
                            <div className="min-w-max text-sm font-medium text-neutral-light flex items-center gap-1">
                                Registrados en la SBS
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.8825 15L17.5527 18.2099C17.9833 20.2723 18.1986 21.3035 17.7563 21.7923C17.3141 22.281 16.546 21.8606 15.0099 21.0198L12.7364 19.7753C12.3734 19.5766 12.1919 19.4773 12 19.4773C11.8081 19.4773 11.6266 19.5766 11.2636 19.7753L8.99008 21.0198C7.45397 21.8606 6.68592 22.281 6.24365 21.7923C5.80139 21.3035 6.01669 20.2723 6.44731 18.2099L7.11752 15" stroke="#212121" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M4.5 9.5C4.5 13.6421 7.85786 17 12 17C16.1421 17 19.5 13.6421 19.5 9.5C19.5 5.35786 16.1421 2 12 2C7.85786 2 4.5 5.35786 4.5 9.5Z" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9 10.1667C9 10.1667 9.75 10.1667 10.5 11.5C10.5 11.5 12.8824 8.16667 15 7.5" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>
                        </div>
                        <div className="flex gap-2 mb-4 tracking-wider bg-white rounded-2xl p-2 !font-paragraph">
                            <button
                                onClick={() => setOperationType('compra')}
                                className={`flex-1 py-3 rounded-xl font-medium   transition-all duration-200 ${operationType === 'compra'
                                    ? 'bg-constrast text-white'
                                    : 'bg-white  text-neutral-dark hover:bg-gray-50'
                                    }`}
                            >
                                COMPRA S/ 3.6410
                            </button>
                            <button
                                onClick={() => setOperationType('venta')}
                                className={`flex-1 py-3 rounded-xl font-medium   transition-all duration-200 ${operationType === 'venta'
                                    ? 'bg-constrast text-white'
                                    : 'bg-white text-neutral-dark hover:bg-gray-50'
                                    }`}
                            >
                                VENTA S/ 3.6770
                            </button>
                        </div>
                        <div className="flex relative flex-col items-center space-y-4">
                            {/* Primer input con diseño mejorado */}
                            <div className="flex items-center bg-white rounded-2xl shadow-lg p-2 w-full relative">
                                <div className="flex-1 h-full flex flex-col ml-2 justify-center ">
                                    <p className="text-neutral-light text-[8px] uppercase font-semibold">
                                        {operationType === 'compra' ? "ENVÍO SOLES" : "ENVÍO DÓLARES"}
                                    </p>
                                    <input
                                        type="number"
                                        placeholder="00.00"
                                        value={amount1}
                                        onChange={(e) => setAmount1(e.target.value)}
                                        className="text-lg  text-neutral-light bg-transparent border-none outline-none w-full placeholder:text-neutral-light"
                                    />
                                </div>
                                <div className="flex items-center bg-secondary bg-opacity-50 rounded-xl px-6 py-3 ml-4">
                                    <img
                                        src={operationType === 'compra' ? "https://flagcdn.com/w580/pe.png" : "https://flagcdn.com/w580/us.png"}
                                        alt={operationType === 'compra' ? "PEN Flag" : "USD Flag"}
                                        className="w-6 h-6 object-cover rounded-full mr-2"
                                    />
                                    <span className="text-base font-medium tracking-wide text-neutral-light">
                                        {operationType === 'compra' ? 'PEN' : 'USD'}
                                    </span>
                                </div>
                            </div>

                            {/* Botón de intercambio con el nuevo diseño */}
                            <div className="absolute right-4 top-8 z-10">
                                <button
                                    onClick={handleSwap}
                                    className="bg-constrast text-white p-3 rounded-xl shadow-lg transition-all duration-200"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.9767 17.5C17.4017 15.8876 19 13.1305 19 10C19 5.02944 14.9706 1 10 1C9.3126 1 8.6432 1.07706 8 1.22302M14.9767 17.5V14M14.9767 17.5H18.5M5 2.51555C2.58803 4.13007 1 6.87958 1 10C1 14.9706 5.02944 19 10 19C10.6874 19 11.3568 18.9229 12 18.777M5 2.51555V6M5 2.51555H1.5" stroke="#FAF3E1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                </button>
                            </div>

                            {/* Segundo input con diseño mejorado */}
                            <div className="flex items-center bg-white rounded-2xl shadow-lg p-2 w-full relative">
                                <div className="flex-1 h-full flex flex-col ml-2 justify-center">
                                    <p className="text-neutral-light text-[8px] uppercase font-semibold">
                                        {operationType === 'compra' ? "RECIBO DÓLARES" : "RECIBO SOLES"}
                                    </p>
                                    <input
                                        type="number"
                                        placeholder="00.00"
                                        value={amount2}
                                        onChange={(e) => setAmount2(e.target.value)}
                                        className="text-lg  text-neutral-light bg-transparent border-none outline-none w-full placeholder:text-neutral-light"
                                    />
                                </div>
                                <div className="flex items-center bg-secondary bg-opacity-50 rounded-xl px-6 py-3 ml-4">
                                    <img
                                        src={operationType === 'compra' ? "https://flagcdn.com/w580/us.png" : "https://flagcdn.com/w580/pe.png"}
                                        alt={operationType === 'compra' ? "USD Flag" : "PEN Flag"}
                                        className="w-6 h-6 object-cover rounded-full mr-2"
                                    />
                                    <span className="text-base font-medium tracking-wide text-neutral-light">
                                        {operationType === 'compra' ? 'USD' : 'PEN'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-2 mt-2">
                            <button className="flex-1 justify-center flex gap-4 items-center py-2 rounded-sm  text-neutral-dark font-medium ">USAR CUPÓN <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.74985 14.3412L6.39628 13.5378C6.05276 13.3339 5.88099 13.2319 5.69036 13.2261C5.48436 13.2197 5.30956 13.3175 4.93835 13.5378C4.52261 13.7846 3.69594 14.4643 3.1612 14.1402C2.83398 13.9418 2.83398 13.4379 2.83398 12.4301V5.33301C2.83398 3.44739 2.83398 2.50458 3.41977 1.91879C4.00556 1.33301 4.94836 1.33301 6.83398 1.33301H10.1673C12.0529 1.33301 12.9957 1.33301 13.5815 1.91879C14.1673 2.50458 14.1673 3.44739 14.1673 5.33301V12.4301C14.1673 13.4379 14.1673 13.9418 13.8401 14.1402C13.3054 14.4643 12.4787 13.7846 12.0629 13.5378C11.7194 13.3339 11.5477 13.2319 11.3571 13.2261C11.1511 13.2197 10.9763 13.3175 10.6051 13.5378L9.25145 14.3412C8.88638 14.5579 8.70378 14.6663 8.50065 14.6663C8.29752 14.6663 8.11492 14.5579 7.74985 14.3412Z" stroke="#222222" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.5 5.33301L6.5 9.33301" stroke="#222222" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.5 9.33301H10.494M6.50598 5.33301H6.5" stroke="#222222" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            </button>
                            <button className="flex-1 justify-center flex gap-4 items-center py-2 rounded-sm  text-neutral-dark font-medium ">USAR CRÉDITOS <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.8333 8.66667C13.2266 8.66667 15.1667 8.06971 15.1667 7.33333C15.1667 6.59695 13.2266 6 10.8333 6C8.4401 6 6.5 6.59695 6.5 7.33333C6.5 8.06971 8.4401 8.66667 10.8333 8.66667Z" stroke="#222222" />
                                <path d="M15.1667 10.333C15.1667 11.0694 13.2266 11.6663 10.8333 11.6663C8.44007 11.6663 6.5 11.0694 6.5 10.333" stroke="#222222" />
                                <path d="M15.1667 7.33301V13.1997C15.1667 14.0097 13.2266 14.6663 10.8333 14.6663C8.44007 14.6663 6.5 14.0097 6.5 13.1997V7.33301" stroke="#222222" />
                                <path d="M6.16536 4.00065C8.5586 4.00065 10.4987 3.4037 10.4987 2.66732C10.4987 1.93094 8.5586 1.33398 6.16536 1.33398C3.77213 1.33398 1.83203 1.93094 1.83203 2.66732C1.83203 3.4037 3.77213 4.00065 6.16536 4.00065Z" stroke="#222222" />
                                <path d="M4.4987 7.33333C3.23749 7.17987 2.07864 6.783 1.83203 6M4.4987 10.6667C3.23749 10.5132 2.07864 10.1163 1.83203 9.33333" stroke="#222222" stroke-linecap="round" />
                                <path d="M4.4987 14.0003C3.23749 13.8469 2.07864 13.45 1.83203 12.667V2.66699" stroke="#222222" stroke-linecap="round" />
                                <path d="M10.5 4.00033V2.66699" stroke="#222222" stroke-linecap="round" />
                            </svg>
                            </button>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-xs text-neutral-light mt-2">
                            Operaciones mayores a USD 5,000.00. Consigue un tipo de cambio preferencial <a href="#" className="text-constrast underline font-medium">AQUI</a>
                        </div>
                        <button className="mt-3 py-4 rounded-full bg-neutral-dark text-white font-semibold tracking-wider text-sm w-full">INICIAR OPERACIÓN</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

