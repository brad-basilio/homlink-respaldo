import React, { useRef, useState } from "react";

import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import SubscriptionsRest from "./actions/SubscriptionsRest";
import { CarritoProvider } from "./context/CarritoContext";
import Swal from "sweetalert2";
import Global from "./Utils/Global";
const subscriptionsRest = new SubscriptionsRest();
// Componente principal del cuestionario
const Quiz = ({ showSlogan = true }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const handleAnswer = (questionId, answer) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
        setCurrentStep(currentStep + 1);
    };
    const handleResult = () => {
        // Lógica para calcular el resultado basado en las respuestas
        if (answers[2] === 1 || answers[2] === 2) {
            if (answers[3] === 1) {
                setCurrentStep(6);
            } else {
                setCurrentStep(7);
            }
        } else if ((answers[2] === 3 && answers[3] === 1) || answers[3] === 2) {
            setCurrentStep(6);
        }
        setAnswers({});
    };

    return (
        <>
            <Header showSlogan={showSlogan} />

            {currentStep === 1 && <InitQuiz setCurrentStep={setCurrentStep} />}
            {currentStep === 2 && (
                <FirstQuiz
                    setCurrentStep={setCurrentStep}
                    handleAnswer={handleAnswer}
                />
            )}
            {currentStep === 3 && (
                <SecondQuiz
                    setCurrentStep={setCurrentStep}
                    handleAnswer={handleAnswer}
                />
            )}
            {currentStep === 4 && (
                <ThreeQuiz
                    setCurrentStep={setCurrentStep}
                    handleAnswer={handleAnswer}
                />
            )}
            {currentStep === 5 && (
                <FourQuiz
                    setCurrentStep={setCurrentStep}
                    handleResult={handleResult}
                />
            )}
            {currentStep === 6 && (
                <Result1Quiz setCurrentStep={setCurrentStep} />
            )}
            {currentStep === 7 && (
                <Result2Quiz setCurrentStep={setCurrentStep} />
            )}
            {/* Agrega los demás pasos siguiendo el mismo patrón */}

            <Footer />
        </>
    );
};

// Componente
const InitQuiz = ({ setCurrentStep, showSlogan = true }) => {
    return (
        <div className="flex flex-col md:flex-row w-full justify-between bg-[#EFE5FF] items-center md:h-[75vh]">
            <div className="flex py-10 lg:py-0 order-1 md:order-none flex-col w-full md:w-1/2 justify-center items-center lg:items-center text-[#212529]">
                <div className="px-[5%] max-w-[44rem] lg:px-0 lg:max-w-lg 2xl:max-w-2xl text-center flex flex-col gap-5 2xl:gap-10">
                    <h1 className="text-3xl md:text-4xl lg:text-[48.92px] 2xl:text-[68.92px]  font-bold  text-[#212529] tracking-[0.01em]">
                        weFem Quiz!
                    </h1>
                    <h2 className="text-base md:text-lg lg:text-xl  2xl:text-[30.75px] tracking-[1%] font-semibold ">
                        ¿Qué producto es perfecto para ti?
                    </h2>
                    <p className="text-base lg:text-lg  2xl:text-xl tracking-[1%]">
                        Cada cuerpo es único. Tu flujo y estilo de vida pueden
                        afectar el ajuste y la sensación de tu copa o disco.
                        Responde nuestro cuestionario de 2 minutos para
                        descubrir qué producto weFem se adapta mejor a ti.
                    </p>
                    <div className="w-full flex justify-center">
                        <button
                            onClick={() => setCurrentStep(2)}
                            className="bg-[#FF9900] w-[250.23px] h-[60.09px] md:w-[308.23px] md:h-[70.09px] 2xl:w-[348.23px] lg:h-[65.09px] 2xl:h-[75.09px] hover:opacity-90 text-white font-semibold   rounded-xl  text-[18.03px] md:text-[22.03px] lg:text-[18.13px]  2xl:text-[23.13px] leading-[34.69px] tracking-[0.01em] transition-colors  duration-300 ease-in-out"
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-end  w-full md:w-1/2">
                <img
                    src="assets/img/quizz/quiz_1.png"
                    alt="weFem productos"
                    className="w-full aspect-square 3xs:h-[50vh] md:h-[75vh] object-cover object-center flex-shrink-0"
                />
            </div>
        </div>
    );
};

const FirstQuiz = ({ setCurrentStep, handleAnswer }) => {
    return (
        <div className="flex flex-col md:flex-row w-full justify-between bg-[#EFE5FF] items-center md:h-[75vh]">
            <div className="flex py-10 lg:py-0 order-1 md:order-none  flex-col w-full md:w-1/2 justify-center items-center lg:items-center text-[#212529]">
                <div className="px-[5%] max-w-[44rem] lg:px-0 lg:max-w-lg 2xl:max-w-[44rem] text-center flex flex-col gap-5 2xl:gap-10">
                    <h1 className="text-3xl md:text-4xl lg:text-[48.92px] 2xl:text-[68.92px]  font-bold  text-[#212529] tracking-[0.01em]">
                        weFem Quiz!
                    </h1>
                    <p className="text-xl lg:text-2xl 2xl:text-3xl font-semibold gap-2">
                        ¿Esta es la primera vez que utilizarías un <br /> método
                        alternativo a toallas y tampones?
                        <img
                            src="/assets/img/emojis/thinking-face.png"
                            className="h-[20.05px] md:h-[30.05px] inline-flex ml-2"
                        />{" "}
                    </p>

                    <div className="gap-4 w-full flex flex-col lg:flex-row items-center justify-center mt-3">
                        <button
                            onClick={() => handleAnswer(1, 1)}
                            className="w-full lg:w-1/2 text-base font-semibold xl:text-lg 2xl:text-2xl bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white py-3 2xl:py-4 px-6 rounded-[20px]  transition-colors  border-2 border-[#FF9900] duration-300"
                        >
                            ¡Sí! Quiero probar <br /> algo nuevo
                        </button>
                        <button
                            onClick={() => handleAnswer(1, 2)}
                            className="w-full lg:w-1/2 text-base xl:text-lg 2xl:text-2xl bg-white text-[#FF9900] hover:bg-[#FF9900]  hover:text-white font-semibold  py-3 2xl:py-4 px-6 rounded-[20px]  transition-colors  border-2 border-[#FF9900] duration-300"
                        >
                            No, ya he usado
                            <br /> uno antes
                        </button>
                    </div>
                    <div className="flex flex-row justify-between mt-6 mx-auto max-w-xl w-full">
                        <button
                            onClick={() => setCurrentStep(1)}
                            className=" hover:opacity-90 font-semibold flex items-center gap-2 text-[#5F48B7] text-base lg:text-[18.13px]  2xl:text-[23.13px] leading-[34.69px] tracking-[0.01em]"
                        >
                            <span className="rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="14"
                                    viewBox="0 0 18 14"
                                    fill="none"
                                >
                                    <path
                                        d="M16.9112 7.6395C17.2644 7.28632 17.2644 6.71368 16.9112 6.3605L11.1556 0.604968C10.8025 0.25178 10.2298 0.25178 9.87664 0.604968C9.52345 0.958156 9.52345 1.53079 9.87664 1.88397L14.9927 7L9.87664 12.116C9.52345 12.4692 9.52345 13.0418 9.87664 13.395C10.2298 13.7482 10.8025 13.7482 11.1556 13.395L16.9112 7.6395ZM0.896973 7.90439H16.2717V6.09561H0.896973V7.90439Z"
                                        fill="#5F48B7"
                                    />
                                </svg>
                            </span>
                            Volver
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end  w-full md:w-1/2">
                <img
                    src="assets/img/quizz/quiz_2.png"
                    alt="weFem productos"
                    className="w-full aspect-square 3xs:h-[50vh] md:h-[75vh] object-cover object-center flex-shrink-0"
                />
            </div>
        </div>
    );
};

const SecondQuiz = ({ setCurrentStep, handleAnswer }) => {
    return (
        <div className="flex flex-col md:flex-row w-full justify-between bg-[#EFE5FF] items-center md:h-[75vh]">
            <div className="flex py-10 lg:py-0 order-1  md:order-none  flex-col w-full md:w-1/2 justify-center items-center lg:items-center text-[#212529]">
                <div className="px-[5%] w-full lg:px-0  lg:max-w-lg 2xl:max-w-[46rem] text-center flex flex-col gap-5 2xl:gap-10">
                    <h1 className="text-3xl md:text-4xl lg:text-[48.92px] 2xl:text-[68.92px]  font-bold  text-[#212529] tracking-[0.01em]">
                        weFem Quiz!
                    </h1>
                    <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-semibold gap-2">
                        ¿Cual es tu tipo de flujo?{" "}
                        <img
                            src="/assets/img/emojis/drop-of-blood.png"
                            className="h-[30.05px] inline-flex ml-2"
                            loading="lazy"
                        />
                    </h2>

                    <div className="w-full flex flex-col gap-4 lg:flex-row  items-center justify-center mt-6">
                        <button
                            onClick={() => handleAnswer(2, 1)}
                            className="bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold  px-6 rounded-[20px] text-base lg:text-lg 2xl:text-xl tracking-[0.01em] transition-colors w-full  md:w-[203px] h-[50px] lg:h-[74px]  2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            Leve
                        </button>
                        <button
                            onClick={() => handleAnswer(2, 2)}
                            className="bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold px-6 rounded-[20px] text-base lg:text-lg 2xl:text-xl tracking-[0.01em] transition-colors w-full  md:w-[203px] h-[50px] lg:h-[74px]  2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            Moderado
                        </button>
                        <button
                            onClick={() => handleAnswer(2, 3)}
                            className="bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold  px-6 rounded-[20px] text-base lg:text-lg 2xl:text-xl tracking-[0.01em] transition-colors w-full md:w-[203px] h-[50px] lg:h-[74px]  2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            Abundante
                        </button>
                    </div>
                    <div className="flex flex-row justify-between mt-6 mx-auto max-w-xl w-full">
                        <button
                            onClick={() => setCurrentStep(2)}
                            className=" hover:opacity-90 font-semibold flex items-center gap-2 text-[#5F48B7] text-base lg:text-[18.13px]  2xl:text-[23.13px] leading-[34.69px] tracking-[0.01em]"
                        >
                            <span className="rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="14"
                                    viewBox="0 0 18 14"
                                    fill="none"
                                >
                                    <path
                                        d="M16.9112 7.6395C17.2644 7.28632 17.2644 6.71368 16.9112 6.3605L11.1556 0.604968C10.8025 0.25178 10.2298 0.25178 9.87664 0.604968C9.52345 0.958156 9.52345 1.53079 9.87664 1.88397L14.9927 7L9.87664 12.116C9.52345 12.4692 9.52345 13.0418 9.87664 13.395C10.2298 13.7482 10.8025 13.7482 11.1556 13.395L16.9112 7.6395ZM0.896973 7.90439H16.2717V6.09561H0.896973V7.90439Z"
                                        fill="#5F48B7"
                                    />
                                </svg>
                            </span>{" "}
                            Volver
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end  w-full md:w-1/2">
                <img
                    src="assets/img/quizz/quiz_3.png"
                    alt="weFem productos"
                    className="w-full aspect-square 3xs:h-[50vh] md:h-[75vh] object-cover object-center flex-shrink-0"
                />
            </div>
        </div>
    );
};

const ThreeQuiz = ({ setCurrentStep, handleAnswer }) => {
    return (
        <div className="flex flex-col md:flex-row w-full justify-between bg-[#EFE5FF] items-center md:h-[75vh]">
            <div className="flex py-10 lg:py-0 order-1  md:order-none  flex-col w-full md:w-1/2 justify-center items-center lg:items-center text-[#212529]">
                <div className="px-[5%] w-full lg:px-0  lg:max-w-lg 2xl:max-w-[46rem] text-center flex flex-col gap-5 ">
                    <h1 className="text-3xl md:text-4xl lg:text-[48.92px] 2xl:text-[68.92px]  font-bold  text-[#212529] tracking-[0.01em]">
                        weFem Quiz!
                    </h1>
                    <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-semibold gap-2">
                        ¿Te interesaría tener relaciones con <br /> la regla sin
                        que manche?{" "}
                        <img
                            src="/assets/img/emojis/smiling-face-with-horns.png"
                            className="h-[30.05px] inline-flex ml-2"
                            loading="lazy"
                        />
                    </h2>

                    <div className="w-full flex flex-col gap-4 lg:flex-row  items-center justify-center mt-6">
                        <button
                            onClick={() => handleAnswer(3, 1)}
                            className="bg-white w-full lg:w-1/2 hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold py-3 px-6 rounded-[20px] text-base lg:text-lg 2xl:text-xl tracking-[0.01em] transition-colors  h-[60px] lg:h-[74px]  2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            ¡Sí! Sería lo max{" "}
                            <img
                                src="/assets/img/emojis/fire.png"
                                className="h-[30.05px] inline-flex ml-2"
                                loading="lazy"
                            />
                        </button>
                        <button
                            onClick={() => handleAnswer(3, 2)}
                            className="bg-white w-full lg:w-1/2 hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold py-3 px-6 rounded-[20px] text-base lg:text-lg 2xl:text-xl tracking-[0.01em] transition-colors   h-[60px] lg:h-[74px]  2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            No, me da igual{" "}
                            <img
                                src="/assets/img/emojis/woman-shrugging.png"
                                className="h-[30.05px] inline-flex ml-2"
                                loading="lazy"
                            />
                        </button>
                    </div>
                    <div className="flex flex-row justify-between mt-6 mx-auto max-w-xl w-full">
                        <button
                            onClick={() => setCurrentStep(3)}
                            className="hover:opacity-90 font-semibold flex items-center gap-2 text-[#5F48B7] text-base lg:text-[18.13px]  2xl:text-[23.13px] leading-[34.69px] tracking-[0.01em]"
                        >
                            <span className="rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="14"
                                    viewBox="0 0 18 14"
                                    fill="none"
                                >
                                    <path
                                        d="M16.9112 7.6395C17.2644 7.28632 17.2644 6.71368 16.9112 6.3605L11.1556 0.604968C10.8025 0.25178 10.2298 0.25178 9.87664 0.604968C9.52345 0.958156 9.52345 1.53079 9.87664 1.88397L14.9927 7L9.87664 12.116C9.52345 12.4692 9.52345 13.0418 9.87664 13.395C10.2298 13.7482 10.8025 13.7482 11.1556 13.395L16.9112 7.6395ZM0.896973 7.90439H16.2717V6.09561H0.896973V7.90439Z"
                                        fill="#5F48B7"
                                    />
                                </svg>
                            </span>{" "}
                            Volver
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end  w-full md:w-1/2">
                <img
                    src="assets/img/quizz/quiz_4.png"
                    alt="weFem productos"
                    className="w-full aspect-square 3xs:h-[50vh] md:h-[75vh] object-cover object-center flex-shrink-0"
                />
            </div>
        </div>
    );
};
const FourQuiz = ({ setCurrentStep, handleResult }) => {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(false);
    const emailRef = useRef(null);

    const onEmailSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        if (!emailRef.current.value) {
            setError(true);
            setSaving(false);
            return;
        }
        const request = {
            email: emailRef.current.value,
        };
        const result = await subscriptionsRest.save(request);
        setSaving(false);

        if (!result) return;

        emailRef.current.value = null;
        handleResult();
    };
    return (
        <div className="flex flex-col md:flex-row w-full justify-between bg-[#EFE5FF] items-center md:h-[75vh]">
            <div className="flex py-10 lg:py-0 order-1  md:order-none  flex-col w-full md:w-1/2 justify-center items-center lg:items-center text-[#212529]">
                <div className="px-[5%] w-full lg:px-0  lg:max-w-lg 2xl:max-w-[46rem] text-center flex flex-col gap-5 2xl:gap-10">
                    <form onSubmit={onEmailSubmit}>
                        <h2 className="text-[20.27px] md:text-[31.27px] lg:text-[25px] 2xl:text-[32.21px] leading-[46.12px] tracking-[0.01em] font-semibold mb-4 gap-2">
                            ¡Genial! Hemos encontrado el producto menstrual
                            perfecto para ti{" "}
                            <img
                                src="/assets/img/emojis/growing-heart.png"
                                className="h-[30.05px] inline-flex ml-2"
                                loading="lazy"
                            />
                        </h2>
                        <p className="mb-8 text-[18.07px] md:text-[23.07px] lg:text-[17.77px] 2xl:text-[23px] leading-[31.81px] tracking-[0.01em]">
                            Ingresa tu email para obtener tus resultados y
                            recibir un email con un {" "}
                            <strong>cupón exclusivo de 10% OFF</strong> ¡Solo
                            para ti!
                        </p>
                        <div className=" w-full flex items-center justify-center ">
                            <input
                                ref={emailRef}
                                type="email"
                                placeholder="Déjanos tu email aquí"
                                className="bg-white w-full md:w-9/12 2xl:w-10/12 hover:bg-gray-100 text-[#FF9900] font-semibold  px-6 rounded-[20px] text-lg transition-colors border-2 border-[#FF9900] focus:ring-0 h-[80px] 2xl:h-[94px]  focus:outline-none text-[20.94px] placeholder:text-[20.94px] placeholder:text-[#FF9900] placeholder:text-center"
                            ></input>
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm pt-4">
                                Ingresa tu email, para enviarte mas información
                                ...
                            </p>
                        )}
                        <p className="mb-8 text-[15.78px] lg:text-[14px] 2xl:text-[16.26px]  leading-[22.84px] tracking-[0.01em] mt-6 text-[#000000]">
                            Dejándonos tu e-mail aceptas recibir novedades y
                            promociones de wefem
                        </p>
                        <div className="space-x-4 w-full flex justify-center">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-white hover:!bg-[#FF9900] text-[#FF9900] hover:text-white font-semibold py-4 px-6 rounded-[20px] text-[20.13px] 2xl:text-[23.13px] tracking-[0.01em] transition-colors w-[393px] h-[80px] 2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                            >
                                {saving
                                    ? "Enviando..."
                                    : "¡Obtener mis resultados!"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="flex justify-end  w-full lg:w-1/2">
                <img
                    src="assets/img/quizz/quiz_5.png"
                    alt="weFem productos"
                    className="w-full aspect-square 3xs:h-[50vh] md:h-[75vh] object-cover object-center flex-shrink-0"
                />
            </div>
        </div>
    );
};
const Result1Quiz = ({}) => {
    return (
        <div className="flex flex-col md:flex-row w-full justify-between bg-[#EFE5FF] items-center md:h-[75vh]">
            <div className="flex py-10 lg:py-0 order-1  md:order-none  flex-col w-full md:w-1/2 justify-center items-center lg:items-center text-[#212529]">
                <div className="px-[5%] w-full lg:px-0  lg:max-w-lg 2xl:max-w-[46rem] text-center flex flex-col gap-0 ">
                    <h2 className=" md:text-[25.55px] lg:text-[25px] 2xl:text-[30.75px] 2xl:leading-[20.12px] tracking-[0.01em] font-semibold 2xl:mb-4 gap-2">
                        Tu mejor aliada sería
                    </h2>
                    <h1 className="text-[50.82px] md:text-[82.82px] lg:text-[58.92px] leading-[36.26px]  2xl:text-[86.26px] 2xl:leading-[86.26px] font-bold mb-4 text-[#212529] tracking-[0.01em]">
                        <img
                            src="/assets/img/emojis/fire.png"
                            className="h-[50.05px] md:h-[80.05px] lg:h-[50.05px]  2xl:2xl:h-[80.05px] inline-flex ml-2 mb-4"
                            loading="lazy"
                        />{" "}
                        weDisk{" "}
                        <img
                            src="/assets/img/emojis/fire.png"
                            className="h-[50.05px] md:h-[80.05px] lg:h-[50.05px]  2xl:h-[80.05px] inline-flex ml-2 mb-4"
                            loading="lazy"
                        />{" "}
                    </h1>
                    <p className="text-[16.47px] mb-8 md:text-[21.47px] lg:text-[16px] 2xl:text-[22.37px] leading-[29.93px] tracking-[0.01em]">
                        Un disco menstrual de silicona que recoge tu flujo de
                        forma segura. Se coloca en la base del cuello uterino,
                        permitiéndote así tener sexo con la regla, sin manchas
                        ni fugas.
                    </p>
                    <p className="text-[16.47px] mb-8 md:text-[21.47px] lg:text-[17.77px] 2xl:text-[22.37px] leading-[29.93px] tracking-[0.01em] font-bold mt-6 text-[#212529]">
                        ¡Revisa tu e-mail para obtener tu descuento exclusivo!
                    </p>
                    <div className="space-x-4 w-full flex justify-center mt-6">
                        <a
                            href="/product/wedisk"
                            className="inline-flex items-center justify-center bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold  px-6 rounded-[20px] text-[20.94px] tracking-[0.01em] transition-colors w-[377.32px] h-[90.25px] lg:w-[300px] 2xl:w-[393px] lg:h-[86px] 2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            ¡Comprar ahora!
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex justify-end  w-full lg:w-1/2">
                <img
                    src="assets/img/quizz/quiz_6.png"
                    alt="weFem productos"
                    className="w-full aspect-square 3xs:h-[50vh] md:h-[75vh] object-cover object-center flex-shrink-0"
                />
            </div>
        </div>
    );
};
const Result2Quiz = ({}) => {
    return (
        <div className="flex flex-col md:flex-row w-full justify-between bg-[#EFE5FF] items-center md:h-[75vh]">
            <div className="flex py-10 lg:py-0 order-1  md:order-none  flex-col w-full md:w-1/2 justify-center items-center lg:items-center text-[#212529]">
                <div className="px-[5%] w-full lg:px-0  lg:max-w-lg 2xl:max-w-[46rem] text-center flex flex-col gap-0 ">
                    <h2 className=" md:text-[25.55px] lg:text-[25px] 2xl:text-[30.75px] 2xl:leading-[20.12px] tracking-[0.01em] font-semibold 2xl:mb-4 gap-2">
                        Tu mejor aliada sería
                    </h2>
                    <h1 className="text-[50.82px] md:text-[82.82px] lg:text-[58.92px] leading-[36.26px]  2xl:text-[86.26px] 2xl:leading-[86.26px] font-bold mb-4 text-[#212529] tracking-[0.01em]">
                        <img
                            src="/assets/img/emojis/wine-glass.png"
                            className="h-[50.05px] md:h-[80.05px] lg:h-[50.05px]  2xl:h-[80.05px] inline-flex ml-2 mb-4"
                            loading="lazy"
                        />{" "}
                        weCup
                        <img
                            src="/assets/img/emojis/wine-glass.png"
                            className="h-[50.05px] md:h-[80.05px] lg:h-[50.05px]  2xl:h-[80.05px] inline-flex ml-2 mb-4"
                            loading="lazy"
                        />{" "}
                    </h1>
                    <p className="text-[16.47px] mb-8 md:text-[21.47px] lg:text-[16px] 2xl:text-[22.37px] leading-[29.93px] tracking-[0.01em]">
                        Una copa menstrual de silicona que recoge tu flujo de
                        forma segura. Se coloca en el canal vaginal y te
                        permitirá moverte cómodamente, sin irritaciones ni
                        fugas.
                    </p>
                    <p className="text-[16.47px] mb-8 md:text-[21.47px] lg:text-[17.77px] 2xl:text-[22.37px] leading-[29.93px] tracking-[0.01em] font-bold mt-6 text-[#212529]">
                        ¡Revisa tu e-mail para obtener tu descuento exclusivo!
                    </p>
                    <div className="space-x-4 w-full flex justify-center mt-6">
                        <a
                            href="/product/wecup"
                            className="inline-flex items-center justify-center bg-white hover:bg-[#FF9900]  text-[#FF9900] hover:text-white font-semibold  px-6 rounded-[20px] text-[20.94px] tracking-[0.01em] transition-colors w-[377.32px] h-[90.25px] lg:w-[300px] 2xl:w-[393px] lg:h-[86px] 2xl:h-[94px] border-2 border-[#FF9900] duration-300"
                        >
                            ¡Comprar ahora!
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex justify-end  w-full lg:w-1/2">
                <img
                    src="assets/img/quizz/quiz_7.png"
                    alt="weFem productos"
                    className="w-full aspect-square 3xs:h-[50vh] md:h-[75vh] object-cover object-center flex-shrink-0"
                />
            </div>
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <Quiz {...properties} />
            </Base>
        </CarritoProvider>
    );
});

