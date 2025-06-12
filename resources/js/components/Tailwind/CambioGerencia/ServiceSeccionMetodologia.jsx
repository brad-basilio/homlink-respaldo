import { Users } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import TextWithHighlight from "../../../Utils/TextWithHighlight";
import { WhatsAppButtonWithArrow } from "../../Shared/WhatsAppButton";





const ServiceSeccionMetodologia = ({service}) => {
    const [steps,setSteps]= useState(service?.steps_methodology || []);
    const [currentStep, setCurrentStep] = useState(1);
    const [stepAnimation, setStepAnimation] = useState(true);
    const [transitionState, setTransitionState] = useState('idle'); // 'idle', 'fade-out', 'changing', 'fade-in'
    const timelineRef = useRef(null);

    // Función para permitir que el usuario cambie manualmente el paso al hacer clic
    const handleStepClick = (stepNumber) => {
        if (stepNumber === currentStep) return; // No hacer nada si es el paso actual

        setTransitionState('fade-out');
        setStepAnimation(false);

        setTimeout(() => {
            setCurrentStep(stepNumber);
            setTransitionState('fade-in');
            setStepAnimation(true);
        }, 400);
    };

    // Transición mejorada para una experiencia más fluida
    useEffect(() => {
        const transitionDuration = 4000; // Duración total del ciclo (ms)
        const fadeOutDuration = 400;   // Tiempo para el fade-out (ms)
        const changeDuration = 200;    // Tiempo para el cambio (ms)

        const interval = setInterval(() => {
            // Secuencia de animación: fade-out -> cambio -> fade-in
            setTransitionState('fade-out');
            setStepAnimation(false);

            setTimeout(() => {
                setTransitionState('changing');
                setTimeout(() => {
                    setCurrentStep((prev) => (prev >= steps.length ? 1 : prev + 1));
                    setTransitionState('fade-in');
                    setStepAnimation(true);
                }, changeDuration);
            }, fadeOutDuration);

        }, transitionDuration);

        return () => clearInterval(interval);
    }, []);

    // Calcula la altura de la barra de progreso para que termine justo en el centro del círculo activo
    const stepGapRem = 8; // Debe coincidir con space-y-8
    const circleRadiusRem = 3; // w-12/h-12 = 3rem
    const progressHeight = currentStep === 1
        ? 0
        : (currentStep - 1) * stepGapRem + circleRadiusRem / 2; return (
            <section className="w-full relative bg-neutral-light font-paragraph px-[5%] py-16 md:py-20 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 mx-auto overflow-hidden">
                {/* Columna izquierda */}
                <div className="flex-1 flex flex-col items-start max-w-xl w-full mb-6 lg:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span>
                            <svg width="18" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.50225 0C5.95566 0 4.69727 1.2584 4.69727 2.80499C4.69727 4.35158 5.95566 5.60998 7.50225 5.60998C9.04885 5.60998 10.3072 4.35158 10.3072 2.80499C10.3072 1.2584 9.04885 0 7.50225 0Z" fill="#D62828" />
                                <path d="M7.50112 24.0025C3.65842 24.0025 0.759766 22.4639 0.759766 20.4219C0.759766 19.9629 1.13269 19.59 1.59168 19.59C2.05066 19.59 2.42359 19.9629 2.42359 20.4219C2.42359 21.203 4.40166 22.3387 7.49981 22.3387C10.5993 22.3387 12.576 21.2043 12.576 20.4219C12.576 19.8743 12.4874 19.3657 12.3048 18.8689C12.147 18.4373 12.3674 17.9601 12.799 17.801C13.2306 17.6432 13.7092 17.8636 13.8669 18.2952C14.1147 18.9693 14.2399 19.6839 14.2399 20.4206C14.2425 22.4639 11.3451 24.0025 7.50112 24.0025Z" fill="#D62828" />
                                <path d="M11.4896 21.804C12.3046 21.4414 12.7754 20.9968 12.8132 20.6225C5.70098 16.9581 5.32021 11.2634 5.32021 10.1015C5.32021 9.64249 4.94725 9.26953 4.48823 9.26953C4.02921 9.26953 3.65625 9.64249 3.65625 10.1015C3.65625 11.4082 4.06181 17.6884 11.4896 21.804Z" fill="#D62828" />
                                <path d="M7.49991 6.25781C5.37954 6.25781 3.6543 7.98306 3.6543 10.1034C3.6543 10.5624 4.02725 10.9354 4.48627 10.9354C4.9453 10.9354 5.31825 10.5624 5.31825 10.1034C5.31825 8.9011 6.29628 7.92177 7.49991 7.92177C8.70353 7.92177 9.68156 8.8998 9.68156 10.1034C9.68156 10.9432 8.14671 11.9108 6.66272 12.8458C6.33019 13.0558 5.98722 13.2709 5.64296 13.4965C5.81248 13.9855 6.03026 14.5059 6.31454 15.047C6.72531 14.7732 7.1426 14.5111 7.55077 14.2542C9.58768 12.971 11.3468 11.8626 11.3468 10.1034C11.3455 7.98306 9.62158 6.25781 7.49991 6.25781Z" fill="#D62828" />
                                <path d="M4.23503 14.4766C2.36765 15.8954 0.759766 17.7158 0.759766 20.4191C0.759766 20.8781 1.13272 21.251 1.59174 21.251C2.05076 21.251 2.42372 20.8781 2.42372 20.4191C2.42372 18.5465 3.53085 17.1707 4.95486 16.0271C4.66406 15.4937 4.42673 14.9734 4.23503 14.4766Z" fill="#D62828" />
                            </svg>
                        </span>
                        <span className="uppercase text-neutral-dark text-sm lg:text-lg font-bold">{service?.name}</span>
                    </div>
                    <h2 className="text-[30px]  lg:text-[52px] font-medium max-w-sm mb-6 leading-tight italic">
                       <TextWithHighlight text={service?.title_methodology}  />
                       
                    </h2>
                    <p className="text-base md:text-lg text-neutral mb-6">
{service?.description_methodology}
                    </p>
                    <div className='w-full'>
                          <WhatsAppButtonWithArrow variant="accent" className="bg-accent flex items-center gap-2 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out text-sm sm:text-base">
                                                               <span className="font-medium hidden lg:flex">Conoce cómo aplicarlo en tu empresa</span>
                            <span className="font-medium lg:hidden">Aplicalo a tu empresa</span>
                                                                </WhatsAppButtonWithArrow>
                       
                    </div>
                </div>

                <div className="relative self-start max-w-2xl p-4 lg:w-auto overflow-x-hidden overflow-y-visible " ref={timelineRef}>
                    {/* Timeline Container with proper height calculation */}
                    <div className="relative pr-2 md:pr-4" style={{ height: `${(steps.length - 1) * stepGapRem + circleRadiusRem}rem` }}>
                        {/* Progress Bar Background with subtle pattern */}
                        <div
                            className="absolute left-6 top-6 w-0.5 bg-neutral-light rounded-full overflow-hidden"
                            style={{ height: `${(steps.length - 1) * stepGapRem}rem` }}
                        >
                            {/* Sutiles patrones en la barra de fondo */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="h-2 w-full bg-neutral-light my-6"></div>
                                <div className="h-2 w-full bg-neutral-light my-16"></div>
                                <div className="h-2 w-full bg-neutral-light my-16"></div>
                            </div>
                        </div>

                        {/* Animated Progress Bar - ahora mucho más suave y con efecto de brillo */}
                        <div
                            className={`absolute left-6 top-6 w-0.5 rounded-full transition-all duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
                            style={{
                                height: `${progressHeight}rem`,
                                background: 'linear-gradient(to bottom, #D62828, #D62828, #FFFFFF)',
                                backgroundSize: '200% 200%',
                                animation: 'gradient-y 3s ease infinite',
                                boxShadow: '0 0 8px rgba(214, 40, 40, 0.5)'
                            }}
                        >
                            {/* Efecto de brillo que se mueve */}
                            <div className="absolute inset-0 w-full overflow-hidden">
                                <div
                                    className="absolute top-0 h-full w-2 bg-white opacity-30"
                                    style={{
                                        left: '-4px',
                                        animation: 'shimmer 2s infinite linear'
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Estilos adicionales de animación */}
                        <style jsx>{`
                @keyframes gradient-y {
                  0% { background-position: 50% 0%; }
                  50% { background-position: 50% 100%; }
                  100% { background-position: 50% 0%; }
                }
                @keyframes shimmer {
                  0% { transform: translateY(-100%); }
                  100% { transform: translateY(100%); }
                }
              `}</style>

                        <div className="space-y-8">
                            {service?.steps_methodology.map((step, index) => {
                                index = index + 1; // Ajustar el índice para que comience en 1
                                const isActive = index <= currentStep;
                                const isCurrent = index=== currentStep;

                                // Animaciones para el paso actual
                                const iconAnim = isCurrent && stepAnimation ? "animate-fade-in-up" : "";
                                const titleAnim = isCurrent && stepAnimation ? "animate-fade-in-up delay-[120ms]" : "";
                                const descAnim = isCurrent && stepAnimation ? "animate-fade-in-up delay-[240ms]" : "";

                                return (
                                    <div
                                        key={index}
                                        className="relative flex items-start gap-6 cursor-pointer"
                                        onClick={() => handleStepClick(index)}>
                                        {/* Step Circle */}                      <div
                                            className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-700 transform ${isCurrent
                                                ? "bg-accent scale-110 shadow-lg "
                                                : isActive
                                                    ? "bg-accent"
                                                    : "bg-accent/50"
                                                } ${iconAnim}`}
                                        >
                                            {/* Círculo de borde animado para el paso actual */}
                                            {isCurrent && (
                                                <div className="absolute -inset-1 rounded-full border-2 border-accent opacity-70"
                                                    style={{
                                                        animation: 'pulse-border 2s infinite ease-in-out',
                                                        background: 'radial-gradient(circle, rgba(214,40,40,0.1) 70%, rgba(214,40,40,0.3) 100%)'
                                                    }}>
                                                </div>
                                            )}
                                            <img
                                                src={`/api/service/media/${step?.image}`}
                                                alt={step?.title}
                                                className="w-6 h-6 object-cover rounded-xl"
                                            />

                                            {/* Ripple effect mejorado para el paso actual */}
                                            {isCurrent && (
                                                <>
                                                    <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20"
                                                        style={{ animationDuration: '2s' }}></div>
                                                    <div className="absolute inset-0 rounded-full bg-accent animate-pulse opacity-30"
                                                        style={{ animationDuration: '3s' }}></div>
                                                </>
                                            )}
                                        </div>                      {/* Step Content con efectos mejorados */}                                    <div className="flex-1 pt-2 relative pb-1">                                        {/* Decoración de fondo para el paso actual */}
                                            {isCurrent && (
                                                <div className="absolute -left-2 -top-2 -right-2 lg:-right-12 -bottom-2 bg-gradient-to-r from-red-50 to-transparent rounded-lg opacity-50"
                                                    style={{
                                                        animation: transitionState === 'fade-in' ? 'fadeIn 0.8s ease-out forwards' : 'none'
                                                    }}></div>
                                            )}                                        {/* Número de paso */}
                                            <div
                                                className={`text-xs md:text-sm font-semibold uppercase tracking-wide mb-1 transition-colors duration-500 ${isCurrent ? "text-accent" : isActive ? "text-accent" : "text-neutral-dark"
                                                    } ${titleAnim} relative`}
                                            >
                                                <span className="relative z-10">PASO {index}</span>
                                                {isCurrent && <span className="absolute bottom-0 left-0 h-[2px] bg-accent w-12" style={{ animation: 'grow 0.6s 0.4s forwards' }}></span>}
                                            </div>

                                            {/* Título */}
                                            <h3
                                                className={`text-lg md:text-xl font-medium mb-2 leading-tight transition-colors duration-500 ${isCurrent ? "text-primary" : isActive ? "text-primary" : "text-neutral"
                                                    } ${titleAnim} relative z-10`}
                                            >
                                                {step.title}
                                            </h3>

                                            {/* Descripción con aparición más suave */}
                                            <div className="overflow-hidden">
                                                {isCurrent &&
                                                    <p
                                                        className={`text-sm md:text-base font-light leading-relaxed transition-all duration-500 transform ${isCurrent
                                                                ? "text-neutral opacity-100 translate-y-0"
                                                                : isActive
                                                                    ? "text-neutral opacity-90 translate-y-0"
                                                                    : "text-neutral-dark opacity-70 translate-y-1"
                                                            } ${descAnim} relative z-10 line-clamp-2 md:line-clamp-3 max-w-[calc(100vw-120px)] md:max-w-none`}
                                                    >
                                                        {step.description}
                                                        {isCurrent && (
                                                            <span className="block h-0.5 w-0 bg-gradient-to-r from-accent to-transparent mt-3"
                                                                style={{ animation: 'growWidth 1s 0.7s forwards' }}></span>
                                                        )}
                                                    </p>}
                                            </div>

                                            {/* Estilos de animación local */}
                                            <style jsx>{`
                          @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 0.5; }
                          }
                          @keyframes grow {
                            from { width: 0; }
                            to { width: 12px; }
                          }
                          @keyframes growWidth {
                            from { width: 0; }
                            to { width: 40%; }
                          }
                          @keyframes pulse-border {
                            0% { transform: scale(1); opacity: 0.7; }
                            50% { transform: scale(1.05); opacity: 0.5; }
                            100% { transform: scale(1); opacity: 0.7; }
                          }
                        `}</style>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        );
};

export default ServiceSeccionMetodologia;
