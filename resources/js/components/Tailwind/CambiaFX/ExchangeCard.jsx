import React, { useState, useEffect } from 'react';
import CambiaFXService from '../../../services/CambiaFXService';

const ExchangeCard = ({ 
    title = "Comienza tu cambio ahora", 
    initialOperationType = 'venta',
    showCoupons = true,
    showCredits = true,
    className = "",
    onOperationStart = null 
}) => {
    const [operationType, setOperationType] = useState(initialOperationType);
    const [amount1, setAmount1] = useState('');
    const [amount2, setAmount2] = useState('');
    const [currentTc, setCurrentTc] = useState(0);
    const [promotionalCode, setPromotionalCode] = useState('');
    const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
    const [couponTimeout, setCouponTimeout] = useState(null);
    const [currentRates, setCurrentRates] = useState({ compra: '0.0000', venta: '0.0000' });

    // Cargar tipos de cambio iniciales
    useEffect(() => {
        console.log('🚀 ExchangeCard - useEffect inicial ejecutándose');
        const init = async () => {
            console.log('🔄 Iniciando inicialización...');
            await initializeExchangeRates();
            checkUrlCoupon();
            console.log('✅ Inicialización completada');
        };
        init();
    }, []);

    // Actualizar TC cuando cambie el tipo de operación
    useEffect(() => {
        console.log('🔄 useEffect operationType ejecutándose:', { operationType, amount1 });
        if (amount1) {
            console.log('💰 Recalculando por cambio de operationType...');
            calculateExchange('O');
        }
        console.log('📊 Actualizando rates por cambio de operationType...');
        updateCurrentRates();
    }, [operationType]);

    const initializeExchangeRates = async () => {
        try {
            console.log('🔧 Inicializando tipos de cambio...');
            const result = await CambiaFXService.getExchangeRates();
            console.log('📈 Tipos de cambio obtenidos desde API:', result);
            console.log('📊 Detalle de tipos de cambio - Compra:', result?.tcData?.compra || 'N/A', 'Venta:', result?.tcData?.venta || 'N/A');
            updateCurrentRates();
            // Establecer TC inicial
            const serviceOperationType = operationType === 'compra' ? 'C' : 'V';
            const initialTc = CambiaFXService.getTCFromAmount(1, serviceOperationType);
            console.log('🎯 TC inicial calculado:', { initialTc, operationType, serviceOperationType });
            setCurrentTc(initialTc);
            console.log('✅ Tipos de cambio inicializados:', CambiaFXService.tcData);
            console.log('📊 Estado actual del servicio:', {
                tcData: CambiaFXService.tcData,
                tcBase: CambiaFXService.tcBase
            });
        } catch (error) {
            console.error('❌ Error initializing exchange rates:', error);
        }
    };

    const updateCurrentRates = () => {
        console.log('📊 updateCurrentRates llamado');
        const rates = CambiaFXService.getCurrentRates();
        console.log('💱 Tasas obtenidas del servicio:', rates);
        console.log('🏦 Estado previo currentRates:', currentRates);
        setCurrentRates(rates);
        console.log('✅ currentRates actualizado a:', rates);
    };

    const checkUrlCoupon = () => {
        const couponCode = CambiaFXService.checkUrlCoupon();
        
        if (couponCode) {
            setPromotionalCode(couponCode);
            validateCoupon(couponCode, 'p');
        }
    };

    const calculateExchange = (origin = 'O', inputValue = null) => {
        console.log('🧮 calculateExchange iniciado:', { origin, inputValue, amount1, amount2, operationType });
        
        // Use inputValue if provided, otherwise use state
        let amount;
        if (inputValue !== null) {
            amount = CambiaFXService.formatStringToNumber(inputValue);
            console.log('💰 Usando valor directo del input:', { inputValue, amount });
        } else {
            amount = origin === 'O' 
                ? CambiaFXService.formatStringToNumber(amount1) 
                : CambiaFXService.formatStringToNumber(amount2);
            console.log('💰 Usando valor del estado:', { origin, rawAmount: origin === 'O' ? amount1 : amount2, amount });
        }
        
        if (amount === 0) {
            console.log('⚠️ Monto es 0, limpiando campos...');
            if (origin === 'O') {
                setAmount2('');
                console.log('🧹 amount2 limpiado');
            } else {
                setAmount1('');
                console.log('🧹 amount1 limpiado');
            }
            // Obtener TC base para mostrar
            const serviceOperationType = operationType === 'compra' ? 'C' : 'V';
            const baseTc = CambiaFXService.getTCFromAmount(1, serviceOperationType);
            setCurrentTc(baseTc);
            console.log('🎯 TC base establecido:', { baseTc, operationType, serviceOperationType });
            return;
        }
        
        console.log('🔄 Llamando calculateExchange del servicio...');
        // Convertir operationType a formato del servicio: 'compra' -> 'C', 'venta' -> 'V'
        const serviceOperationType = operationType === 'compra' ? 'C' : 'V';
        console.log('🔄 Convertido operationType:', { original: operationType, service: serviceOperationType });
        
        const calculation = CambiaFXService.calculateExchange(amount, serviceOperationType, origin === 'O' ? 'from' : 'to');
        console.log('📊 Resultado del cálculo completo:', calculation);
        
        setCurrentTc(calculation.exchangeRate);
        console.log('💱 TC actualizado en estado:', calculation.exchangeRate);

        if (origin === 'O') {
            const formattedResult = CambiaFXService.formatNumberToString(calculation.result);
            console.log('📝 Actualizando amount2:', { result: calculation.result, formatted: formattedResult });
            setAmount2(formattedResult);
        } else {
            const formattedResult = CambiaFXService.formatNumberToString(calculation.result);
            console.log('📝 Actualizando amount1:', { result: calculation.result, formatted: formattedResult });
            setAmount1(formattedResult);
        }
        
        console.log('✅ calculateExchange completado');
    };

    const handleSwap = () => {
        const temp = amount1;
        setAmount1(amount2);
        setAmount2(temp);
        setOperationType(operationType === 'compra' ? 'venta' : 'compra');
    };

    const handleAmountChange = (value, origin) => {
        console.log('🔥🔥🔥 USUARIO ESCRIBIENDO:', { value, origin, operationType });
        console.log('⌨️ handleAmountChange SIN DELAY - valor inmediato:', value);
        
        if (origin === 'O') {
            console.log('📝 Actualizando amount1 de', amount1, 'a', value);
            setAmount1(value);
        } else {
            console.log('📝 Actualizando amount2 de', amount2, 'a', value);
            setAmount2(value);
        }
        
        // CALCULAR INMEDIATAMENTE con el valor actual
        console.log('⚡ Calculando INMEDIATAMENTE con valor:', value);
        
        // Pasar el valor directamente para evitar problemas de estado
        setTimeout(() => {
            calculateExchange(origin, value);
        }, 0);
    };

    const validateCoupon = async (couponCode, tipo = 'c') => {
        setIsValidatingCoupon(true);
        
        try {
            const result = await CambiaFXService.validateCoupon(couponCode);
            
            if (!result.valid && tipo === 'c') {
                setPromotionalCode('');
                alert(result.message || 'El código de promoción no es válido.');
            }
            
            calculateExchange('O');
            updateCurrentRates();
        } catch (error) {
            console.error('Error validating coupon:', error);
            if (tipo === 'c') {
                setPromotionalCode('');
                alert('El código de promoción no es válido.');
            }
        } finally {
            setIsValidatingCoupon(false);
        }
    };

    const handleCouponChange = (value) => {
        setPromotionalCode(value);
        
        if (couponTimeout) {
            clearTimeout(couponTimeout);
        }
        
        const timeout = setTimeout(() => {
            validateCoupon(value, 'c');
        }, 2000);
        
        setCouponTimeout(timeout);
    };

    const handleOperationStart = () => {
        const amountValue = CambiaFXService.formatStringToNumber(amount1);
        
        if (amountValue === 0) {
            alert('Debe ingresar un monto');
            return;
        }

        const operationData = {
            type: operationType === 'venta' ? 'V' : 'C',
            fromAmount: operationType === 'venta' ? amountValue : CambiaFXService.formatStringToNumber(amount2),
            toAmount: operationType === 'venta' ? CambiaFXService.formatStringToNumber(amount2) : amountValue,
            exchangeRate: currentTc,
            couponCode: promotionalCode
        };

        if (onOperationStart) {
            onOperationStart(operationData);
        } else {
            // Usar el servicio para inicializar la operación
            CambiaFXService.initializeOperation(operationData);
        }
    };

    // Obtener las tasas de cambio actuales para mostrar en los botones
    const rates = currentRates;
    
    // Log del estado actual del componente
    console.log('🎯 ESTADO ACTUAL DEL COMPONENTE:', {
        operationType,
        amount1,
        amount2,
        currentTc,
        currentRates,
        rates,
        initialized: CambiaFXService.tcData?.length > 0
    });

    return (
        <div className={`bg-secondary rounded-3xl p-8 shadow-xl flex flex-col gap-6 w-full max-w-[480px] ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-[28px] leading-[94%] font-base text-neutral-light">
                        {title.includes('cambio') ? (
                            <>
                                {title.split('cambio')[0]}
                                <span className="text-neutral-light font-semibold">cambio</span>
                                {title.split('cambio')[1]}
                            </>
                        ) : (
                            title
                        )}
                    </h2>
                </div>
                <div className="min-w-max text-sm font-medium text-neutral-light flex items-center gap-1">
                    Registrados en la SBS
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.8825 15L17.5527 18.2099C17.9833 20.2723 18.1986 21.3035 17.7563 21.7923C17.3141 22.281 16.546 21.8606 15.0099 21.0198L12.7364 19.7753C12.3734 19.5766 12.1919 19.4773 12 19.4773C11.8081 19.4773 11.6266 19.5766 11.2636 19.7753L8.99008 21.0198C7.45397 21.8606 6.68592 22.281 6.24365 21.7923C5.80139 21.3035 6.01669 20.2723 6.44731 18.2099L7.11752 15" stroke="#212121" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M4.5 9.5C4.5 13.6421 7.85786 17 12 17C16.1421 17 19.5 13.6421 19.5 9.5C19.5 5.35786 16.1421 2 12 2C7.85786 2 4.5 5.35786 4.5 9.5Z" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 10.1667C9 10.1667 9.75 10.1667 10.5 11.5C10.5 11.5 12.8824 8.16667 15 7.5" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            {/* Operation Type Buttons */}
            <div className="flex gap-2 mb-4 tracking-wider bg-white rounded-2xl p-2 !font-paragraph">
                <button
                    onClick={() => setOperationType('compra')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 ${
                        operationType === 'compra'
                            ? 'bg-constrast text-white'
                            : 'bg-white text-neutral-dark hover:bg-gray-50'
                    }`}
                >
                    COMPRA S/ {rates.compra}
                </button>
                <button
                    onClick={() => setOperationType('venta')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 ${
                        operationType === 'venta'
                            ? 'bg-constrast text-white'
                            : 'bg-white text-neutral-dark hover:bg-gray-50'
                    }`}
                >
                    VENTA S/ {rates.venta}
                </button>
            </div>

            {/* Exchange Inputs */}
            <div className="flex relative flex-col items-center space-y-4">
                {/* From Input */}
                <div className="flex items-center bg-white rounded-2xl shadow-lg p-2 w-full relative">
                    <div className="flex-1 h-full flex flex-col ml-2 justify-center">
                        <p className="text-neutral-light text-[8px] uppercase font-semibold">
                            {operationType === 'compra' ? "ENVÍO SOLES" : "ENVÍO DÓLARES"}
                        </p>
                        <input
                            type="number"
                            placeholder="00.00"
                            value={amount1}
                            onChange={(e) => {
                                console.log('🖊️ Input onChange disparado:', { 
                                    value: e.target.value, 
                                    tipo: 'amount1', 
                                    operationType 
                                });
                                handleAmountChange(e.target.value, 'O');
                            }}
                            className="text-lg text-neutral-light bg-transparent border-none outline-none w-full placeholder:text-neutral-light"
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

                {/* Swap Button */}
                <div className="absolute right-4 top-8 z-10">
                    <button
                        onClick={handleSwap}
                        className="bg-constrast text-white p-3 rounded-xl shadow-lg transition-all duration-200 hover:bg-opacity-90"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.9767 17.5C17.4017 15.8876 19 13.1305 19 10C19 5.02944 14.9706 1 10 1C9.3126 1 8.6432 1.07706 8 1.22302M14.9767 17.5V14M14.9767 17.5H18.5M5 2.51555C2.58803 4.13007 1 6.87958 1 10C1 14.9706 5.02944 19 10 19C10.6874 19 11.3568 18.9229 12 18.777M5 2.51555V6M5 2.51555H1.5" stroke="#FAF3E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* To Input */}
                <div className="flex items-center bg-white rounded-2xl shadow-lg p-2 w-full relative">
                    <div className="flex-1 h-full flex flex-col ml-2 justify-center">
                        <p className="text-neutral-light text-[8px] uppercase font-semibold">
                            {operationType === 'compra' ? "RECIBO DÓLARES" : "RECIBO SOLES"}
                        </p>
                        <input
                            type="number"
                            placeholder="00.00"
                            value={amount2}
                            onChange={(e) => {
                                console.log('🖊️ Input onChange disparado:', { 
                                    value: e.target.value, 
                                    tipo: 'amount2', 
                                    operationType 
                                });
                                handleAmountChange(e.target.value, 'D');
                            }}
                            className="text-lg text-neutral-light bg-transparent border-none outline-none w-full placeholder:text-neutral-light"
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

            {/* Coupon and Credits */}
            {(showCoupons || showCredits) && (
                <div className="flex justify-center gap-2 mt-2">
                    {showCoupons && (
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Código promocional"
                                value={promotionalCode}
                                onChange={(e) => handleCouponChange(e.target.value)}
                                className="w-full py-2 px-3 rounded-lg border border-gray-300 text-sm text-neutral-dark placeholder:text-gray-400 focus:outline-none focus:border-constrast"
                                disabled={isValidatingCoupon}
                            />
                            {isValidatingCoupon && (
                                <div className="absolute right-2 top-2">
                                    <div className="animate-spin w-4 h-4 border-2 border-constrast border-t-transparent rounded-full"></div>
                                </div>
                            )}
                        </div>
                    )}
                    {showCredits && (
                        <button className="flex-1 justify-center flex gap-2 items-center py-2 px-3 rounded-lg border border-gray-300 text-neutral-dark font-medium text-sm hover:bg-gray-50 transition-colors">
                            USAR CRÉDITOS
                            <svg width="16" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.8333 8.66667C13.2266 8.66667 15.1667 8.06971 15.1667 7.33333C15.1667 6.59695 13.2266 6 10.8333 6C8.4401 6 6.5 6.59695 6.5 7.33333C6.5 8.06971 8.4401 8.66667 10.8333 8.66667Z" stroke="#222222" />
                                <path d="M15.1667 10.333C15.1667 11.0694 13.2266 11.6663 10.8333 11.6663C8.44007 11.6663 6.5 11.0694 6.5 10.333" stroke="#222222" />
                                <path d="M15.1667 7.33301V13.1997C15.1667 14.0097 13.2266 14.6663 10.8333 14.6663C8.44007 14.6663 6.5 14.0097 6.5 13.1997V7.33301" stroke="#222222" />
                                <path d="M6.16536 4.00065C8.5586 4.00065 10.4987 3.4037 10.4987 2.66732C10.4987 1.93094 8.5586 1.33398 6.16536 1.33398C3.77213 1.33398 1.83203 1.93094 1.83203 2.66732C1.83203 3.4037 3.77213 4.00065 6.16536 4.00065Z" stroke="#222222" />
                                <path d="M4.4987 7.33333C3.23749 7.17987 2.07864 6.783 1.83203 6M4.4987 10.6667C3.23749 10.5132 2.07864 10.1163 1.83203 9.33333" stroke="#222222" strokeLinecap="round" />
                                <path d="M4.4987 14.0003C3.23749 13.8469 2.07864 13.45 1.83203 12.667V2.66699" stroke="#222222" strokeLinecap="round" />
                                <path d="M10.5 4.00033V2.66699" stroke="#222222" strokeLinecap="round" />
                            </svg>
                        </button>
                    )}
                </div>
            )}

            {/* Info Message */}
            <div className="bg-white rounded-xl p-4 text-xs text-neutral-light mt-2">
                Operaciones mayores a USD 5,000.00. Consigue un tipo de cambio preferencial{' '}
                <a href="#" className="text-constrast underline font-medium">AQUÍ</a>
            </div>

            {/* Exchange Rate Display */}
            {currentTc > 0 && (
                <div className="text-center text-neutral-light text-sm">
                    Tipo de cambio: <span className="font-semibold">S/ {currentTc.toFixed(4)}</span>
                </div>
            )}

            {/* Start Operation Button */}
            <button 
                onClick={handleOperationStart}
                className="mt-3 py-4 rounded-full bg-neutral-dark text-white font-semibold tracking-wider text-sm w-full hover:bg-opacity-90 transition-all duration-200"
            >
                INICIAR OPERACIÓN
            </button>
        </div>
    );
};

export default ExchangeCard;
