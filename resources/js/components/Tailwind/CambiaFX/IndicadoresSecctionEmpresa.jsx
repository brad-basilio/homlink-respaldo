
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
        <section className="w-full bg-primary py-16 px-[5%] font-title">
            <div className=" mx-auto">
                <h2 className="text-center text-4xl md:text-[52px] font-medium text-neutral-dark mb-16">
                    <span className="text-neutral-dark font-semibold">Cifras</span> <span className="text-neutral-dark">que nos respaldan</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
                    {/* Indicador 1 - Millones de soles cambiados */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.8333 21.6667C31.8164 21.6667 36.6667 20.1743 36.6667 18.3333C36.6667 16.4924 31.8164 15 25.8333 15C19.8502 15 15 16.4924 15 18.3333C15 20.1743 19.8502 21.6667 25.8333 21.6667Z" stroke="#1A1A1A" stroke-width="2.5" />
                                <path d="M36.6667 25.833C36.6667 27.674 31.8165 29.1663 25.8333 29.1663C19.8502 29.1663 15 27.674 15 25.833" stroke="#1A1A1A" stroke-width="2.5" />
                                <path d="M36.6667 18.333V32.9997C36.6667 35.0247 31.8165 36.6663 25.8333 36.6663C19.8502 36.6663 15 35.0247 15 32.9997V18.333" stroke="#1A1A1A" stroke-width="2.5" />
                                <path d="M14.1654 9.99967C20.1484 9.99967 24.9987 8.50729 24.9987 6.66634C24.9987 4.82539 20.1484 3.33301 14.1654 3.33301C8.18228 3.33301 3.33203 4.82539 3.33203 6.66634C3.33203 8.50729 8.18228 9.99967 14.1654 9.99967Z" stroke="#1A1A1A" stroke-width="2.5" />
                                <path d="M9.9987 18.3333C6.84568 17.9497 3.94855 16.9575 3.33203 15M9.9987 26.6667C6.84568 26.283 3.94855 25.2908 3.33203 23.3333" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" />
                                <path d="M9.9987 34.9994C6.84568 34.6157 3.94855 33.6235 3.33203 31.666V6.66602" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" />
                                <path d="M25 9.99935V6.66602" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" />
                            </svg>

                        </div>
                        <div className="text-4xl md:text-[56px] font-semibold text-neutral-dark mb-2"><span className='text-constrast'>+</span>5,890</div>
                        <div className="text-neutral-dark ">
                            <span className="font-semibold">millones</span> de soles cambiados
                        </div>
                    </div>

                    {/* Indicador 2 - Clientes registrados */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.8346 18.3333C25.8346 15.1117 23.223 12.5 20.0013 12.5C16.7796 12.5 14.168 15.1117 14.168 18.3333C14.168 21.555 16.7796 24.1667 20.0013 24.1667C23.223 24.1667 25.8346 21.555 25.8346 18.3333Z" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M25.8004 18.9165C26.3371 19.0792 26.9062 19.1667 27.4959 19.1667C30.7176 19.1667 33.3292 16.555 33.3292 13.3333C33.3292 10.1117 30.7176 7.5 27.4959 7.5C24.4711 7.5 21.9839 9.80233 21.6914 12.7502" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.3058 12.7502C18.0133 9.80233 15.5262 7.5 12.5013 7.5C9.27964 7.5 6.66797 10.1117 6.66797 13.3333C6.66797 16.555 9.27964 19.1667 12.5013 19.1667C13.091 19.1667 13.6602 19.0792 14.1968 18.9165" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M36.6667 27.5003C36.6667 22.898 32.5627 19.167 27.5 19.167" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M29.1654 32.5003C29.1654 27.898 25.0614 24.167 19.9987 24.167C14.9361 24.167 10.832 27.898 10.832 32.5003" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12.4987 19.167C7.43608 19.167 3.33203 22.898 3.33203 27.5003" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </div>
                        <div className="text-4xl md:text-[56px] font-semibold text-neutral-dark mb-2"><span className='text-constrast'>+</span>134k</div>
                        <div className="text-neutral-dark ">
                            <span className="font-semibold">clientes</span> registrados
                        </div>
                    </div>

                    {/* Indicador 3 - De soles ahorrados */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                            <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.6654 8.66699C29.9497 8.66699 36.6654 14.2634 36.6654 21.167C36.6654 24.598 35.0065 27.7062 32.3209 29.9648C31.9182 30.3035 31.6654 30.794 31.6654 31.3202V35.3337H28.332L27.009 33.446C26.8037 33.153 26.4347 33.0258 26.0882 33.1148C23.2067 33.8557 20.124 33.8557 17.2425 33.1148C16.896 33.0258 16.5271 33.153 16.3218 33.446L14.9987 35.3337H11.6654V31.3593C11.6654 30.8113 11.3959 30.2983 10.9448 29.9873C9.15345 28.7522 3.33203 26.336 3.33203 23.764V21.167C3.33203 20.1808 4.07821 19.3813 4.9987 19.3813C6.00978 19.3813 6.83516 18.9885 7.16878 17.9438C8.87456 12.6023 14.7185 8.66699 21.6654 8.66699Z" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round" />
                                <path d="M24.1667 13.6663C23.1133 13.1247 21.9938 12.833 20.8333 12.833C19.6728 12.833 18.5533 13.1247 17.5 13.6663" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12.5 18.667H12.515" stroke="#1A1A1A" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M35 14.4997C35.8333 13.6663 36.6667 12.1046 36.6667 10.0506C36.6667 7.44512 34.4282 5.33301 31.6667 5.33301C31.0823 5.33301 30.5213 5.42761 30 5.60144" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" />
                            </svg>



                        </div>
                        <div className="text-4xl md:text-[56px] font-semibold text-neutral-dark mb-2"><span className='text-constrast'>+</span>36k</div>
                        <div className="text-neutral-dark ">
                            <span className="font-semibold">de soles</span> ahorrados por<br />nuestros clientes
                        </div>
                    </div>

                    {/* Indicador 4 - Empresas confían */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.33203 36.667H36.6654" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" />
                                <path d="M29.9987 15H23.332C19.1954 15 18.332 15.8633 18.332 20V36.6667H34.9987V20C34.9987 15.8633 34.1354 15 29.9987 15Z" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round" />
                                <path d="M25 36.6663H5V8.33301C5 4.19634 5.86333 3.33301 10 3.33301H20C24.1367 3.33301 25 4.19634 25 8.33301V14.9997" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round" />
                                <path d="M5 10H10M5 16.6667H10M5 23.3333H10" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" />
                                <path d="M25 21.667H28.3333M25 26.667H28.3333" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" />
                                <path d="M26.668 36.667V31.667" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </div>
                        <div className="text-4xl md:text-[56px] font-semibold text-neutral-dark mb-2"><span className='text-constrast'>+</span>7,800</div>
                        <div className="text-neutral-dark ">
                            <span className="font-semibold">empresas</span> confían<br />en nosotros
                        </div>
                    </div>

                    {/* Indicador 5 - Mil operaciones atendidas */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                            <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M34.9045 28.7253C33.8107 22.144 30.4053 17.2432 27.445 14.3647C26.5835 13.527 26.1528 13.1082 25.2013 12.7206C24.2498 12.333 23.432 12.333 21.7963 12.333H18.2037C16.568 12.333 15.7502 12.333 14.7987 12.7206C13.8472 13.1082 13.4165 13.527 12.5551 14.3647C9.5947 17.2432 6.18935 22.144 5.09545 28.7253C4.28155 33.622 8.79878 37.333 13.8472 37.333H26.1528C31.2012 37.333 35.7185 33.622 34.9045 28.7253Z" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12.0957 8.07145C11.7518 7.57097 11.2534 6.89165 12.283 6.73675C13.3412 6.57752 14.44 7.3019 15.5156 7.28702C16.4886 7.27355 16.9843 6.84198 17.5161 6.2258C18.0761 5.57695 18.9433 4 20.0013 4C21.0593 4 21.9265 5.57695 22.4865 6.2258C23.0183 6.84198 23.514 7.27355 24.487 7.28702C25.5626 7.3019 26.6615 6.57752 27.7196 6.73675C28.7491 6.89165 28.2508 7.57097 27.907 8.07145L26.3521 10.3344C25.6871 11.3024 25.3546 11.7864 24.6586 12.0599C23.9628 12.3333 23.0635 12.3333 21.265 12.3333H18.7376C16.9391 12.3333 16.0398 12.3333 15.3439 12.0599C14.648 11.7864 14.3155 11.3024 13.6504 10.3344L12.0957 8.07145Z" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round" />
                                <path d="M22.7079 22.1981C22.3476 20.8679 20.5136 19.6676 18.3121 20.5656C16.1106 21.4634 15.7609 24.3526 19.0909 24.6596C20.5959 24.7983 21.5772 24.4986 22.4756 25.3464C23.3741 26.1941 23.5409 28.5518 21.2442 29.1871C18.9476 29.8224 16.6734 28.8298 16.4258 27.4199M19.7329 18.9883V20.2556M19.7329 29.3826V30.6549" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </div>
                         <div className="text-4xl md:text-[56px] font-semibold text-neutral-dark mb-2"><span className='text-constrast'>+</span>500</div>
                        <div className="text-neutral-dark font-medium">
                            <span className="font-bold">mil</span> operaciones atendidas<br />exitosamente
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

