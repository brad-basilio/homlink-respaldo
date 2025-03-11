import React, { useState } from "react";

import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
// Componente principal del cuestionario
const Quiz = ({ showSlogan = true }) => {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <>
            <Header showSlogan={showSlogan} backgroundHeight="h-0"></Header>
            <div className="relative z-10">
                {currentStep === 1 && (
                    <InitQuiz setCurrentStep={setCurrentStep} />
                )}
                {currentStep === 2 && (
                    <FirstQuiz setCurrentStep={setCurrentStep} />
                )}
                {currentStep === 3 && (
                    <SecondQuiz setCurrentStep={setCurrentStep} />
                )}
                {currentStep === 4 && (
                    <ThreeQuiz setCurrentStep={setCurrentStep} />
                )}
                {currentStep === 5 && (
                    <FourQuiz setCurrentStep={setCurrentStep} />
                )}
                {currentStep === 6 && (
                    <Result1Quiz setCurrentStep={setCurrentStep} />
                )}
                {currentStep === 7 && (
                    <Result2Quiz setCurrentStep={setCurrentStep} />
                )}
                {/* Agrega los demás pasos siguiendo el mismo patrón */}
            </div>
            <Footer />
        </>
    );
};

// Componente
const InitQuiz = ({ setCurrentStep }) => {
    return (
        <div className="flex w-full justify-between gap-8 bg-[#EFE5FF]  items-center">
            <div className="flex  flex-col w-full md:w-1/2 justify-center text-[#212529]">
                <div className="px-[5%]  md:px-0 md:max-w-lg 2xl:max-w-2xl  mx-auto text-center ">
                    <h1 className="md:text-[48.92px] 2xl:text-[68.92px] leading-[103.38px] font-bold  text-[#212529] tracking-[0.01em]">
                        weFem Quiz!
                    </h1>
                    <h2 className="md:text-[25.92px]  2xl:text-[30.75px] leading-[46.12px] tracking-[0.01em] font-semibold ">
                        ¿Qué producto es perfecto para ti?
                    </h2>
                    <p className="md:text-[18.1px] 2xl:text-[22.1px] leading-[31.05px] tracking-[0.01em] my-8">
                        Cada cuerpo es único. Tu flujo y estilo de vida pueden
                        afectar el ajuste y la sensación de tu copa o disco.
                        Responde nuestro cuestionario de 2 minutos para
                        descubrir qué producto weFem se adapta mejor a ti.
                    </p>
                    <div className="w-full flex justify-center">
                        <button
                            onClick={() => setCurrentStep(2)}
                            className="bg-[#FF9900] md:w-[308.23px] 2xl:w-[348.23px] md:h-[65.09px] 2xl:h-[75.09px] hover:opacity-90 text-white font-semibold   rounded-xl md:text-[18.13px]  2xl:text-[23.13px] leading-[34.69px] tracking-[0.01em] transition-colors  duration-300 ease-in-out"
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-end  w-full md:w-1/2">
                <img
                    src="https://i.ibb.co/3mPwq5gH/7597f2cb62a9b3b354850510320d3167.png"
                    alt="weFem productos"
                    className="md:w-full md:h-[600px]  2xl:min-w-[873px] 2xl:h-[789px]  object-cover object-center flex-shrink-0"
                />
            </div>
        </div>
    );
};

const FirstQuiz = ({ setCurrentStep }) => {
    return (
        <div className="flex w-full justify-between gap-8 bg-[#EFE5FF]  items-center">
            <div className="flex  flex-col w-full md:w-1/2 justify-center text-[#212529]">
                <div className="px-[5%] md:px-0 md:max-w-lg 2xl:max-w-3xl  mx-auto text-center">
                    <h1 className="md:text-[48.92px] 2xl:text-[68.92px] leading-[103.38px] font-bold mb-4 text-[#212529] tracking-[0.01em]">
                        weFem Quiz!
                    </h1>
                    <p className="md:text-[21.1px] 2xl:text-[30.75px] md:leading-[36.12px] 2xl:leading-[46.12px] tracking-[0.01em] font-semibold mb-4 gap-2">
                        ¿Esta es la primera vez que utilizarías un método
                        alternativo a toallas y tampones?
                    </p>

                    <div className="space-x-4 w-full flex mt-12">
                        <button
                            onClick={() => setCurrentStep(3)}
                            className="bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold md:py-3 2xl:py-4 px-6 rounded-[20px] md:text-[16.94px] 2xl:text-[20.94px] tracking-[0.01em] transition-colors w-full border-2 border-[#FF9900] duration-300"
                        >
                            ¡Sí! Quiero probar <br /> algo nuevo
                        </button>
                        <button
                            onClick={() => setCurrentStep(4)}
                            className="bg-white text-[#FF9900] hover:bg-[#FF9900]  hover:text-white font-semibold  md:py-3 2xl:py-4 px-6 rounded-[20px] md:text-[16.94px] 2xl:text-[20.94px] tracking-[0.01em] transition-colors w-full border-2 border-[#FF9900] duration-300"
                        >
                            No, ya he usado uno antes
                        </button>
                    </div>
                    <div className="flex justify-between mt-12">
                        <button
                            onClick={() => setCurrentStep(1)}
                            className=" hover:opacity-90 font-semibold flex items-center text-[#5F48B7] md:text-[18.13px]  2xl:text-[23.13px] leading-[34.69px] tracking-[0.01em]"
                        >
                            ← Volver
                        </button>
                        <button
                            onClick={() => setCurrentStep(3)}
                            className="text-[#5F48B7] hover:opacity-90 font-semibold flex items-center md:text-[18.13px]  2xl:text-[23.13px] leading-[34.69px] tracking-[0.01em]"
                        >
                            Siguiente →
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end  w-full md:w-1/2">
                <img
                    src="https://i.ibb.co/Nd0JBkBk/image.png"
                    alt="weFem productos"
                    className="md:w-full md:h-[600px]  2xl:min-w-[873px] 2xl:h-[789px] w-full  object-cover object-center flex-shrink-0"
                />
            </div>
        </div>
    );
};

const SecondQuiz = ({ setCurrentStep }) => {
    return (
        <div className="flex w-full justify-between gap-8 bg-[#EFE5FF]  items-center">
            <div className="flex  flex-col w-full md:w-1/2 justify-center text-[#212529]">
                <div className="px-[5%] md:px-0 md:max-w-lg 2xl:max-w-2xl  mx-auto text-center">
                    <h1 className="md:text-[48.92px] 2xl:text-[68.92px] 2xl:leading-[103.38px] font-bold mb-4 text-[#212529] tracking-[0.01em]">
                        weFem Quiz!
                    </h1>
                    <h2 className="md:text-[21.1px] 2xl:text-[30.75px] md:leading-[36.12px] 2xl:leading-[46.12px]  tracking-[0.01em] font-semibold mb-4 gap-2">
                        ¿Cual es tu tipo de flujo?{" "}
                    </h2>

                    <div className="space-x-4 w-full flex md:mt-8 2xl:mt-12">
                        <button
                            onClick={() => setCurrentStep(4)}
                            className="bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold  px-6 rounded-[20px] md:text-[16.94px] 2xl:text-[20.94px] tracking-[0.01em] transition-colors w-[203px] md:h-[74px]  2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            Leve
                        </button>
                        <button
                            onClick={() => setCurrentStep(5)}
                            className="bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold px-6 rounded-[20px] md:text-[16.94px] 2xl:text-[20.94px] tracking-[0.01em] transition-colors w-[203px] md:h-[74px]  2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            Moderado
                        </button>
                        <button
                            onClick={() => setCurrentStep(5)}
                            className="bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold  px-6 rounded-[20px] md:text-[16.94px] 2xl:text-[20.94px] tracking-[0.01em] transition-colors w-[203px] md:h-[74px]  2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            Abundante
                        </button>
                    </div>
                    <div className="flex justify-between mt-12">
                        <button
                            onClick={() => setCurrentStep(2)}
                            className=" hover:opacity-90 font-semibold flex items-center text-[#5F48B7] md:text-[18.13px]  2xl:text-[23.13px]  leading-[34.69px] tracking-[0.01em]"
                        >
                            ← Volver
                        </button>
                        <button
                            onClick={() => setCurrentStep(4)}
                            className="text-[#5F48B7] hover:opacity-90 font-semibold flex items-center md:text-[18.13px]  2xl:text-[23.13px]  leading-[34.69px] tracking-[0.01em]"
                        >
                            Siguiente →
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end  w-full md:w-1/2">
                <img
                    src="https://i.ibb.co/twC7bmTR/image.png"
                    alt="weFem productos"
                    className="md:w-full md:h-[600px]  2xl:min-w-[873px] 2xl:h-[789px] w-full object-cover object-center flex-shrink-0"
                />
            </div>
        </div>
    );
};

const ThreeQuiz = ({ setCurrentStep }) => {
    return (
        <div className="flex w-full justify-between gap-8 bg-[#EFE5FF]  items-center">
            <div className="flex  flex-col w-full md:w-1/2 justify-center text-[#212529]">
                <div className="px-[5%] md:px-0 md:max-w-lg 2xl:max-w-2xl   mx-auto text-center">
                    <h1 className="md:text-[48.92px] 2xl:text-[68.92px] 2xl:leading-[103.38px] font-bold mb-4 text-[#212529] tracking-[0.01em]">
                        weFem Quiz!
                    </h1>
                    <h2 className="md:text-[21.1px] 2xl:text-[30.75px] md:leading-[36.12px] 2xl:leading-[46.12px] tracking-[0.01em] font-semibold mb-4 gap-2">
                        ¿Te interesaría tener relaciones con la regla sin que
                        manche?
                    </h2>

                    <div className="space-x-4 w-full flex md:mt-8 2xl:mt-12">
                        <button
                            onClick={() => setCurrentStep(5)}
                            className="bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold py-4 px-6 rounded-[20px] md:text-[16.94px] 2xl:text-[20.94px] tracking-[0.01em] transition-colors w-full md:h-[74px]  2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            ¡Sí! Sería lo max
                        </button>
                        <button
                            onClick={() => setCurrentStep(7)}
                            className="bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold py-4 px-6 rounded-[20px] md:text-[16.94px] 2xl:text-[20.94px] tracking-[0.01em] transition-colors w-full md:h-[74px]  2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            No, me da igual
                        </button>
                    </div>
                    <div className="flex justify-between mt-12">
                        <button
                            onClick={() => setCurrentStep(4)}
                            className=" hover:opacity-90 font-semibold flex items-center text-[#5F48B7] md:text-[18.13px]  2xl:text-[23.13px]  leading-[34.69px] tracking-[0.01em]"
                        >
                            ← Volver
                        </button>
                        <button
                            onClick={() => setCurrentStep(5)}
                            className="text-[#5F48B7] hover:opacity-90 font-semibold flex items-center md:text-[18.13px]  2xl:text-[23.13px]  leading-[34.69px] tracking-[0.01em]"
                        >
                            Siguiente →
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end  w-full md:w-1/2">
                <img
                    src="https://i.ibb.co/7xKxbRz0/image.png"
                    alt="weFem productos"
                    className="md:w-full md:h-[600px]  2xl:min-w-[873px] 2xl:h-[789px] w-full object-cover object-center flex-shrink-0"
                />
            </div>
        </div>
    );
};
const FourQuiz = ({ setCurrentStep }) => {
    return (
        <div className="flex w-full justify-between gap-8 bg-[#EFE5FF]  items-center">
            <div className="flex  flex-col w-full md:w-1/2 justify-center text-[#212529]">
                <div className="px-[5%] md:px-0 md:max-w-lg 2xl:max-w-2xl  mx-auto text-center">
                    <h2 className="text-[25px] 2xl:text-[32.21px] leading-[46.12px] tracking-[0.01em] font-semibold mb-4 gap-2">
                        ¡Genial! Hemos encontrado el producto menstrual perfecto
                        para ti{" "}
                    </h2>
                    <p className="mb-8 text-[17.77px] 2xl:text-[23.77px] leading-[31.81px] tracking-[0.01em]">
                        Ingresa tu email para obtener tus resultados y recibir
                        un email con un 
                        <strong>cupón exclusivo de 10% OFF</strong> ¡ solo para
                        ti!
                    </p>
                    <div className="space-x-4 w-full ">
                        <input
                            placeholder="Déjanos tu email aquí"
                            className="bg-white hover:bg-gray-100 text-[#FF9900] font-semibold py-5 px-6 rounded-xl text-lg transition-colors w-full border-2 border-[#FF9900] focus:ring-0 focus:outline-none"
                        ></input>
                    </div>
                    <p className="mb-8 text-[15px] 2xl:text-[16.26px]  leading-[22.84px] tracking-[0.01em] mt-6 text-[#000000]">
                        Dejándonos tu e-mail aceptas recibir novedades y
                        promociones de wefem
                    </p>
                    <div className="space-x-4 w-full flex justify-center">
                        <button
                            onClick={() => setCurrentStep(6)}
                            className="bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold py-4 px-6 rounded-[20px] md:text-[18.13px]  2xl:text-[23.13px] tracking-[0.01em] transition-colors w-[393px] md:h-[74px] 2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            ¡Obtener mis resultados!
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end  w-full md:w-1/2">
                <img
                    src="https://i.ibb.co/3yHQRrpx/image.png"
                    alt="weFem productos"
                    className="md:w-full md:h-[600px]  2xl:min-w-[873px] 2xl:h-[789px] w-full object-cover object-center flex-shrink-0"
                />
            </div>
        </div>
    );
};
const Result1Quiz = ({ setCurrentStep }) => {
    return (
        <div className="flex w-full justify-between gap-8 bg-[#EFE5FF]  items-center">
            <div className="flex  flex-col w-full md:w-1/2 justify-center text-[#212529]">
                <div className="px-[5%] md:px-0 md:max-w-lg 2xl:max-w-3xl  mx-auto text-center">
                    <h2 className="text-[25px] 2xl:text-[30.75px] 2xl:leading-[46.12px] tracking-[0.01em] font-semibold 2xl:mb-4 gap-2">
                        Tu mejor aliada sería
                    </h2>
                    <h1 className="md:text-[58.92px]  2xl:text-[68.92px] 2xl:leading-[103.38px] font-bold mb-4 text-[#212529] tracking-[0.01em]">
                        weDisk
                    </h1>
                    <p className="mb-8 text-[16px] 2xl:text-[23.77px] leading-[29.93px] tracking-[0.01em]">
                        Un disco menstrual de silicona que recoge tu flujo de
                        forma segura. Se coloca en la base del cuello uterino,
                        permitiéndote así tener sexo con la regla, sin manchas
                        ni fugas.
                    </p>
                    <p className="mb-8 text-[17.77px] 2xl:text-[23.77px] leading-[29.93px] tracking-[0.01em] font-bold mt-6 text-[#212529]">
                        ¡Revisa tu e-mail para obtener tu descuento exclusivo!
                    </p>
                    <div className="space-x-4 w-full flex justify-center mt-6">
                        <a
                            href="/product"
                            className="inline-flex items-center justify-center bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold  px-6 rounded-[20px] text-[20.94px] tracking-[0.01em] transition-colors w-[393px] md:h-[74px] 2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            ¡Comprar ahora!
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex justify-end  w-full md:w-1/2">
                <img
                    src="https://i.ibb.co/hxwjRPKc/image.png"
                    alt="weFem productos"
                    className="md:w-full md:h-[600px]  2xl:min-w-[873px] 2xl:h-[789px] w-full object-cover object-center flex-shrink-0"
                />
            </div>
        </div>
    );
};
const Result2Quiz = ({ setCurrentStep }) => {
    return (
        <div className="flex w-full justify-between gap-8 bg-[#EFE5FF]  items-center">
            <div className="flex  flex-col w-full md:w-1/2 justify-center text-[#212529]">
                <div className="px-[5%] md:px-0 md:max-w-lg 2xl:max-w-3xl mx-auto text-center">
                    <h2 className="text-[25px] 2xl:text-[30.75px] 2xl:leading-[46.12px] tracking-[0.01em] font-semibold 2xl:mb-4 gap-2">
                        Tu mejor aliada sería
                    </h2>
                    <h1 className="md:text-[58.92px]  2xl:text-[68.92px] 2xl:leading-[103.38px] font-bold mb-4 text-[#212529] tracking-[0.01em]">
                        weCup
                    </h1>
                    <p className="mb-8 text-[16px] 2xl:text-[23.77px] leading-[29.93px] tracking-[0.01em]">
                        Un disco menstrual de silicona que recoge tu flujo de
                        forma segura. Se coloca en la base del cuello uterino,
                        permitiéndote así tener sexo con la regla, sin manchas
                        ni fugas.
                    </p>
                    <p className="mb-8 text-[17.77px] 2xl:text-[23.77px] leading-[29.93px] tracking-[0.01em] font-bold mt-6 text-[#212529]">
                        ¡Revisa tu e-mail para obtener tu descuento exclusivo!
                    </p>
                    <div className="space-x-4 w-full flex justify-center mt-6">
                        <a
                            href="/product"
                            className="inline-flex items-center justify-center bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold  px-6 rounded-[20px] text-[20.94px] tracking-[0.01em] transition-colors w-[393px] md:h-[74px] 2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            ¡Comprar ahora!
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex justify-end  w-full md:w-1/2">
                <img
                    src="https://i.ibb.co/XrvRRyK3/image.png"
                    alt="weFem productos"
                    className="md:w-full md:h-[600px]  2xl:min-w-[873px] 2xl:h-[789px] w-full object-cover object-center flex-shrink-0"
                />
            </div>
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <Base {...properties}>
            <Quiz {...properties} />
        </Base>
    );
});
