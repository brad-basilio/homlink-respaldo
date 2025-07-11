
import React from 'react'
import ExchangeCard from './ExchangeCard'
import TextWithHighlight from '../../../Utils/TextWithHighlight';

export default function HeroSecctionEmpresa({landing}) {
    const handleOperationStart = (operationData) => {
        console.log('Operation data:', operationData);
        // Aquí puedes manejar los datos de la operación como necesites
        // Por defecto redirigirá a mi.cambiafx.pe/login
        window.location.href = 'https://mi.cambiafx.pe/login';
    };
    return (
        <section className="bg-neutral-dark py-10 md:py-20 font-title relative overflow-hidden">
            <div className=" mx-auto px-[5%]  flex flex-col lg:flex-row  gap-10 items-center">
                {/* Izquierda: Texto principal */}
                <div className='lg:w-7/12'>

                    <h1 className="text-6xl font-title font-medium text-white  mb-4">
<TextWithHighlight text={landing?.title} color='bg-white font-semibold' />


                     

                    </h1>
                    <p className="text-2xl font-medium uppercase tracking-[8%] text-secondary mb-6 max-w-xl">
                       {landing?.description}
                       
                     
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
                <div className='flex justify-end lg:w-5/12'>
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

