
import React, { useState } from 'react'

export default function HeroSecctionEmpresa() {
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
        <section className="bg-neutral-dark py-10 md:py-20 font-title relative overflow-hidden">
            <div className=" mx-auto px-[5%]  flex  gap-10 items-center">
                {/* Izquierda: Texto principal */}
                <div className='w-7/12'>

                    <h1 className="text-6xl font-title font-medium text-white  mb-4">
                        Cambia <span className="text-white font-semibold">FX Empresas</span>

                    </h1>
                    <p className="text-2xl font-medium uppercase tracking-[8%] text-secondary mb-6 max-w-xl">
                        Eres empresa, contactanos y consigue
                        el mejor tipo de  cambio aquí
                    </p>
                    <div className='flex gap-12 h-[200px] mt-20 relative'>



                        <svg className="min-w-[1200px]  absolute -left-20 top-0" width="926" height="403" viewBox="0 0 926 403" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M924.055 462.4C900.707 459.83 866.658 453.823 828.33 438.329C760.933 411.086 719.891 370.505 691.805 342.171C658.213 308.282 631.732 281.565 616.981 236.737C615.825 233.225 581.958 167.894 619.675 128.377C657.399 88.8538 712.426 124.699 720.361 185.585C728.297 246.472 704.465 279.287 675.606 302.167C634.672 334.622 581.94 332.044 541.272 326.599C363.832 302.829 272.359 196.573 102.482 126.709C11.5098 89.295 -212.004 -26.776 -346.999 31.9512" stroke="#719931" stroke-opacity="0.24" stroke-width="29.8691" stroke-miterlimit="10" />
                        </svg>

                       
                        <div className=" flex  flex-col  items-start  gap-4 mb-8">
                            <div>

                                <div className="flex gap-2 mt-4 text-white" >
                                    <a className="flex items-center gap-4" href="#" target="_blank" rel="noopener noreferrer">
                                        <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="32.6816" cy="32.6816" r="32.6816" transform="matrix(1 0 0 -1 0.320312 65.6816)" fill="white" fill-opacity="0.4" />
                                            <path d="M57.5272 33.0987C57.5272 19.4977 46.5014 8.47185 32.9003 8.47185C19.2993 8.47185 8.27344 19.4977 8.27344 33.0987C8.27344 46.6998 19.2993 57.7256 32.9003 57.7256C46.5014 57.7256 57.5272 46.6998 57.5272 33.0987Z" fill="#BCFF52" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M41.4492 24.6751C39.3536 22.5796 36.5595 21.4619 33.6257 21.4619C27.4786 21.4619 22.4492 26.4913 22.4492 32.6384C22.4492 34.5943 23.0081 36.5501 23.986 38.2266L22.4492 43.8149L28.3169 42.2781C29.9934 43.1163 31.8095 43.6752 33.6257 43.6752C39.7727 43.6752 44.8022 38.6457 44.8022 32.4987C44.8022 29.5649 43.5448 26.7707 41.4492 24.6751ZM33.6257 41.859C31.9492 41.859 30.2728 41.4399 28.8757 40.6016L28.5963 40.4619L25.1036 41.4399L26.0816 38.0869L25.8022 37.6678C24.8242 36.131 24.4051 34.4546 24.4051 32.7781C24.4051 27.7487 28.5963 23.5575 33.6257 23.5575C36.1404 23.5575 38.3757 24.5354 40.1919 26.2119C42.0081 28.0281 42.8463 30.2634 42.8463 32.7781C42.8463 37.6678 38.7948 41.859 33.6257 41.859ZM38.6551 34.8737C38.3757 34.734 36.9786 34.0354 36.6992 34.0354C36.4198 33.8957 36.2801 33.8957 36.1404 34.1752C36.0007 34.4546 35.4419 35.0134 35.3022 35.2928C35.1625 35.4325 35.0227 35.4325 34.7433 35.4325C34.4639 35.2928 33.6257 35.0134 32.5081 34.0354C31.6698 33.3369 31.111 32.359 30.9713 32.0796C30.8316 31.8002 30.9713 31.6604 31.111 31.5207C31.2507 31.381 31.3904 31.2413 31.5301 31.1016C31.6698 30.9619 31.6698 30.8222 31.8095 30.6825C31.9492 30.5428 31.8095 30.4031 31.8095 30.2634C31.8095 30.1237 31.2507 28.7266 30.9713 28.1678C30.8316 27.7487 30.5522 27.7487 30.4125 27.7487C30.2728 27.7487 30.133 27.7487 29.8536 27.7487C29.7139 27.7487 29.4345 27.7487 29.1551 28.0281C28.8757 28.3075 28.1772 29.006 28.1772 30.4031C28.1772 31.8001 29.1551 33.0575 29.2948 33.3369C29.4345 33.4766 31.2507 36.4104 34.0448 37.5281C36.4198 38.506 36.8389 38.2266 37.3978 38.2266C37.9566 38.2266 39.0742 37.5281 39.2139 36.9693C39.4933 36.2707 39.4933 35.7119 39.3536 35.7119C39.2139 35.0134 38.9345 35.0134 38.6551 34.8737Z" fill="#222222" />
                                        </svg>


                                        <span className='text-2xl'> WhatsApp<br />
                                           <span className="font-semibold">Empresas</span></span>
                                    </a>

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

