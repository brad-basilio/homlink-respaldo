
import React, { useState } from 'react'

export default function IndicadoresSecctionEmpresa() {
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
       <section className="w-full bg-[#F8F6ED] py-16 px-[5%] font-paragraph">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-center text-4xl md:text-5xl font-bold text-neutral-dark mb-16">
                        <span className="text-neutral-dark">Cifras</span> <span className="text-neutral-dark">que nos respaldan</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
                        {/* Indicador 1 - Millones de soles cambiados */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-[#C6FF6B] rounded-full flex items-center justify-center mb-6">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6H4C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18H20C21.1046 18 22 17.1046 22 16V8C22 6.89543 21.1046 6 20 6Z" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 10H22" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7 14H7.01" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M11 14H13" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-[#7B61FF] mb-2">+5,890</div>
                            <div className="text-neutral-dark font-medium">
                                <span className="font-bold">millones</span> de soles cambiados
                            </div>
                        </div>

                        {/* Indicador 2 - Clientes registrados */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-[#C6FF6B] rounded-full flex items-center justify-center mb-6">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="9" cy="7" r="4" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-[#7B61FF] mb-2">+134k</div>
                            <div className="text-neutral-dark font-medium">
                                <span className="font-bold">clientes</span> registrados
                            </div>
                        </div>

                        {/* Indicador 3 - De soles ahorrados */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-[#C6FF6B] rounded-full flex items-center justify-center mb-6">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 8V12" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 16H12.01" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-[#7B61FF] mb-2">+36k</div>
                            <div className="text-neutral-dark font-medium">
                                <span className="font-bold">de soles</span> ahorrados por<br />nuestros clientes
                            </div>
                        </div>

                        {/* Indicador 4 - Empresas confían */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-[#C6FF6B] rounded-full flex items-center justify-center mb-6">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 21H21" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5 21V7L13 2L21 7V21" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9 9V21" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M13 9V21" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17 9V21" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-[#7B61FF] mb-2">+7,800</div>
                            <div className="text-neutral-dark font-medium">
                                <span className="font-bold">empresas</span> confían<br />en nosotros
                            </div>
                        </div>

                        {/* Indicador 5 - Mil operaciones atendidas */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-[#C6FF6B] rounded-full flex items-center justify-center mb-6">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="3" stroke="#2D3748" strokeWidth="2"/>
                                    <path d="M12 1V3" stroke="#2D3748" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M12 21V23" stroke="#2D3748" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M4.22 4.22L5.64 5.64" stroke="#2D3748" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M18.36 18.36L19.78 19.78" stroke="#2D3748" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M1 12H3" stroke="#2D3748" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M21 12H23" stroke="#2D3748" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M4.22 19.78L5.64 18.36" stroke="#2D3748" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M18.36 5.64L19.78 4.22" stroke="#2D3748" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-[#7B61FF] mb-2">+500</div>
                            <div className="text-neutral-dark font-medium">
                                <span className="font-bold">mil</span> operaciones atendidas<br />exitosamente
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}

