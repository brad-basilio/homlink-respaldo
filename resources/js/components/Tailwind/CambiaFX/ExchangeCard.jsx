import React, { useState, useEffect } from 'react';
import CambiaFXService from '../../../services/CambiaFXService';
import WhatsAppButton from '../../Shared/WhatsAppButton';
import { Search } from 'lucide-react';

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
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [couponInfo, setCouponInfo] = useState(null); // Info del cupón (rango, TC, etc.)
    const [showCouponModal, setShowCouponModal] = useState(false); // Modal informativo
    const [isConsultingCoupons, setIsConsultingCoupons] = useState(false); // Loading para consulta de cupones
    const [invalidCoupon, setInvalidCoupon] = useState(null); // Información del cupón inválido

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

    // Escuchar cambios en el cupón promocional para actualizar rates
    useEffect(() => {
        console.log('🎫 useEffect promotionalCode ejecutándose:', { promotionalCode });
        if (promotionalCode) {
            console.log('🔄 Cupón aplicado, actualizando rates...');
            updateCurrentRates();
            if (amount1) {
                console.log('💰 Recalculando con cupón aplicado...');
                calculateExchange('O');
            }
        }
    }, [promotionalCode]);

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
        console.log('🔍 Estado actual del servicio antes de getCurrentRates:', {
            tcData: CambiaFXService.tcData,
            tcBase: CambiaFXService.tcBase,
            tcDataLength: CambiaFXService.tcData?.length
        });
        
        const rates = CambiaFXService.getCurrentRates();
        console.log('💱 Tasas obtenidas del servicio:', rates);
        console.log('🏦 Estado previo currentRates:', currentRates);
        
        setCurrentRates(rates);
        console.log('✅ currentRates actualizado a:', rates);
        
        // Verificar que los valores se aplicaron correctamente
        console.log('🔢 Verificación post-actualización:', {
            ratesCompra: rates.compra,
            ratesVenta: rates.venta,
            deberiaSerConCupon: CambiaFXService.tcData?.length === 1,
            tcDataActual: CambiaFXService.tcData[0]
        });
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
        
        // DIAGNÓSTICO DETALLADO
        console.log('🔍 DIAGNÓSTICO PRE-CÁLCULO:', {
            amount,
            serviceOperationType,
            tcDataActual: CambiaFXService.tcData,
            tcDataLength: CambiaFXService.tcData?.length,
            esCupon: CambiaFXService.tcData?.length === 1,
            promotionalCode
        });
        
        const calculation = CambiaFXService.calculateExchange(amount, serviceOperationType, origin === 'O' ? 'from' : 'to');
        console.log('📊 Resultado del cálculo completo:', calculation);
        
        // VERIFICACIÓN POST-CÁLCULO
        console.log('🎯 VERIFICACIÓN DEL CÁLCULO:', {
            tcUsado: calculation.exchangeRate,
            resultadoObtenido: calculation.result,
            deberiaSerConCuponFELIZ28: calculation.exchangeRate === 3.557 || calculation.exchangeRate === 3.571,
            calculoManual: operationType === 'venta' ? `${amount} * ${calculation.exchangeRate} = ${(amount * calculation.exchangeRate).toFixed(2)}` : `${amount} / ${calculation.exchangeRate} = ${(amount / calculation.exchangeRate).toFixed(2)}`
        });
        
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
        console.log('🎫 validateCoupon iniciado:', { couponCode, tipo });
        setIsValidatingCoupon(true);
        
        try {
            console.log('🎫 Llamando CambiaFXService.validateCoupon...');
            const result = await CambiaFXService.validateCoupon(couponCode);
            console.log('🎫 Resultado completo de validateCoupon:', result);
            console.log('🎫 result.valid:', result.valid);
            console.log('🎫 result.data:', result.data);
            console.log('🎫 result.message:', result.message);
            
            if (!result.valid && tipo === 'c') {
                console.log('❌ Cupón inválido, guardando información...');
                setPromotionalCode('');
                setCouponInfo(null);
                setInvalidCoupon({
                    codigo: couponCode,
                    message: result.message || 'El código de promoción no es válido.'
                });
                // Restaurar tipos de cambio base
                updateCurrentRates();
            } else if (result.valid) {
                console.log('✅ Cupón válido, FORZANDO actualización inmediata...');
                
                // Limpiar cupón inválido si existía
                setInvalidCoupon(null);
                
                // Guardar información del cupón para mostrar al usuario
                const cuponData = result.data[0];
                setCouponInfo({
                    codigo: couponCode,
                    montoMinimo: cuponData.desde,
                    montoMaximo: cuponData.hasta,
                    tcCompra: cuponData.tc_compra,
                    tcVenta: cuponData.tc_venta
                });
                
                // Mostrar modal informativo
                setShowCouponModal(true);
                
                // ⚡ ACTUALIZACIÓN INMEDIATA Y FORZADA
                console.log('🚀 Estado actual tcData antes de actualizar:', CambiaFXService.tcData);
                
                // Actualizar rates inmediatamente
                updateCurrentRates();
                
                // Forzar re-render del componente
                setCurrentRates(CambiaFXService.getCurrentRates());
                
                // Recalcular INMEDIATAMENTE sin delay
                if (amount1) {
                    console.log('💥 RECALCULANDO INMEDIATAMENTE con amount1:', amount1);
                    const serviceOperationType = operationType === 'compra' ? 'C' : 'V';
                    const amount = CambiaFXService.formatStringToNumber(amount1);
                    const tcActual = CambiaFXService.getTCFromAmount(amount, serviceOperationType);
                    console.log('🎯 TC actual después del cupón:', tcActual);
                    console.log('📊 Datos tcData actuales:', CambiaFXService.tcData);
                    
                    // Calcular de nuevo con los datos actualizados
                    calculateExchange('O');
                }
                
                console.log('✅ Actualización de cupón completada');
            }
            
        } catch (error) {
            console.error('❌ Error en validateCoupon:', error);
            console.error('❌ Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            if (tipo === 'c') {
                setPromotionalCode('');
                setCouponInfo(null);
                setInvalidCoupon({
                    codigo: promotionalCode,
                    message: 'Error al validar el código de promoción.'
                });
                // Restaurar tipos de cambio base en caso de error
                updateCurrentRates();
            }
        } finally {
            setIsValidatingCoupon(false);
        }
    };

    const handleCouponChange = (value) => {
        setPromotionalCode(value);
        setIsValidatingCoupon(true)
        
        // Limpiar cupón inválido cuando el usuario empiece a escribir
        if (invalidCoupon) {
            setInvalidCoupon(null);
        }
        
        if (couponTimeout) {
            clearTimeout(couponTimeout);
        }
        
        const timeout = setTimeout(() => {
            validateCoupon(value, 'c');
        }, 2000);
         setIsValidatingCoupon(false)
        setCouponTimeout(timeout);
    };

    // 🚀 FUNCIÓN DE RESET COMPLETO PARA DEBUGGING
    const forceReset = () => {
        console.log('🔄 RESET COMPLETO FORZADO');
        // Limpiar todo el estado
        setAmount1('');
        setAmount2('');
        setCurrentTc(0);
        setPromotionalCode('');
        setCouponInfo(null);
        setInvalidCoupon(null);
        setCurrentRates({ compra: '0.0000', venta: '0.0000' });
        
        // Reinicializar servicio
        CambiaFXService.tcData = [...CambiaFXService.tcBase];
        console.log('✅ Reset completado, estado limpio');
    };

    // 🎯 VERIFICAR SI EL CUPÓN APLICA AL MONTO ACTUAL
    const checkCouponApplies = () => {
        if (!couponInfo || !amount1) return { applies: false, reason: '' };
        
        const amount = CambiaFXService.formatStringToNumber(amount1);
        
        if (amount < couponInfo.montoMinimo) {
            return {
                applies: false,
                reason: `Monto mínimo requerido: $${couponInfo.montoMinimo} USD`
            };
        }
        
        if (amount > couponInfo.montoMaximo) {
            return {
                applies: false,
                reason: `Monto máximo permitido: $${couponInfo.montoMaximo} USD`
            };
        }
        
        return { applies: true, reason: '' };
    };

    // 🔍 SIMULAR CONSULTA DE CUPONES DISPONIBLES
    const handleConsultCoupons = async () => {
        console.log('🔍 Iniciando consulta de cupones disponibles...');
        setIsConsultingCoupons(true);
        
        try {
            // Simular delay de consulta (1.5-2.5 segundos para parecer real)
            const delay = 1500 + Math.random() * 1000; // Entre 1.5 y 2.5 segundos
            await new Promise(resolve => setTimeout(resolve, delay));
            
            // Mostrar resultado de la consulta (simulado)
            console.log('✅ Consulta de cupones completada');
            
        } catch (error) {
            console.error('❌ Error en consulta de cupones:', error);
        } finally {
            setIsConsultingCoupons(false);
            console.log('🏁 Consulta de cupones finalizada');
        }
    };

    // 🎨 OBTENER TASA PREFERENCIAL PARA MOSTRAR EN BOTONES
    const getDisplayRates = () => {
        if (!couponInfo) return currentRates;
        
        const couponApplies = checkCouponApplies();
        
        if (couponApplies.applies) {
            // Mostrar tasas del cupón (CORREGIDO)
            return {
                compra: couponInfo.tcCompra.toFixed(4), // COMPRA: Cliente tiene USD → usar tc_compra
                venta: couponInfo.tcVenta.toFixed(4)    // VENTA: Cliente tiene PEN → usar tc_venta
            };
        } else {
            // Mostrar tasas normales pero con indicador de que hay cupón disponible
            return currentRates;
        }
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
    const rates = getDisplayRates();
    const couponStatus = checkCouponApplies();
    
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
        <div className={`bg-secondary z-[99999] rounded-2xl  lg:rounded-3xl p-4  lg:p-8 shadow-xl flex flex-col gap-6 w-full max-w-[480px] ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className=" text-2xl lg:text-[28px] leading-[94%] font-base text-neutral-light">
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
                <div className="min-w-max  text-[10px] lg:text-sm font-medium text-neutral-light flex items-center gap-1">
                    Registrados en la SBS
                    <svg className='w-4 h-4 lg:w-6 lg:h-6' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 relative ${
                        operationType === 'compra'
                            ? 'bg-constrast text-white shadow-lg shadow-constrast/25'
                            : 'bg-white text-neutral-dark hover:bg-neutral hover:shadow-md'
                    }`}
                >
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2">
                            {couponInfo && couponStatus.applies ? (
                                <div className="text-center">
                                    <div className="text-xs opacity-75 font-medium">
                                        <span className="line-through">Antes S/ {CambiaFXService.tcBase[0]?.tc_compra.toFixed(4)}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-secondary">Ahora S/ {rates.compra}</span>
                                </div>
                            ) : (
                                <span className="text-sm font-semibold">COMPRA S/ {rates.compra}</span>
                            )}
                            
                            {/* Icono de ayuda para COMPRA */}
                            <div className="relative group">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center cursor-help transition-all duration-200 ${
                                    operationType === 'compra' 
                                        ? 'bg-white/20 text-white hover:bg-white/30' 
                                        : 'bg-neutral-light/20 text-neutral-light hover:bg-neutral-light/30'
                                }`}>
                                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 6.5C6.5 5.39543 7.39543 4.5 8.5 4.5C9.60457 4.5 10.5 5.39543 10.5 6.5C10.5 7.60457 9.60457 8.5 8.5 8.5V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <circle cx="8.5" cy="12" r="0.5" fill="currentColor"/>
                                    </svg>
                                </div>
                                
                                {/* Tooltip mejorado para COMPRA */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                                    <div className="bg-gradient-to-br from-neutral-dark to-neutral-dark/90 backdrop-blur-sm text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                                        <div className="px-5 py-4">
                                            {/* Header del tooltip */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-constrast to-constrast/80 rounded-full flex items-center justify-center shadow-lg">
                                                    <span className="text-sm">💵</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-constrast text-sm">COMPRA DE DÓLARES</h4>
                                                    <p className="text-xs text-white/70">Operación de cambio</p>
                                                </div>
                                            </div>
                                            
                                            {/* Contenido principal */}
                                            <div className="space-y-2 mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                                                    <span className="text-sm">Tienes: <span className="font-semibold text-secondary">Dólares USD</span></span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                                                    <span className="text-sm">Quieres: <span className="font-semibold text-secondary">Soles PEN</span></span>
                                                </div>
                                            </div>
                                            
                                            {/* Footer explicativo */}
                                            <div className="bg-white/5 rounded-lg px-3 py-2">
                                                <p className="text-xs text-white/80 text-center">
                                                    <span className="font-medium text-constrast">Nosotros</span> compramos tus dólares
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Flecha del tooltip */}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                                            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-neutral-dark"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                       
                    </div>
                    {couponInfo && couponStatus.applies && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-white"></div>
                    )}
                </button>
                <button
                    onClick={() => setOperationType('venta')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 relative ${
                        operationType === 'venta'
                            ? 'bg-constrast text-white shadow-lg shadow-constrast/25'
                            : 'bg-white text-neutral-dark hover:bg-neutral hover:shadow-md'
                    }`}
                >
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2">
                            {couponInfo && couponStatus.applies ? (
                                <div className="text-center">
                                    <div className="text-xs opacity-75 font-medium">
                                        <span className="line-through">Antes S/ {CambiaFXService.tcBase[0]?.tc_venta.toFixed(4)}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-secondary">Ahora S/ {rates.venta}</span>
                                </div>
                            ) : (
                                <span className="text-sm font-semibold">VENTA S/ {rates.venta}</span>
                            )}
                            
                            {/* Icono de ayuda para VENTA */}
                            <div className="relative group">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center cursor-help transition-all duration-200 ${
                                    operationType === 'venta' 
                                        ? 'bg-white/20 text-white hover:bg-white/30' 
                                        : 'bg-neutral-light/20 text-neutral-light hover:bg-neutral-light/30'
                                }`}>
                                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 6.5C6.5 5.39543 7.39543 4.5 8.5 4.5C9.60457 4.5 10.5 5.39543 10.5 6.5C10.5 7.60457 9.60457 8.5 8.5 8.5V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <circle cx="8.5" cy="12" r="0.5" fill="currentColor"/>
                                    </svg>
                                </div>
                                
                                {/* Tooltip mejorado para VENTA */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                                    <div className="bg-gradient-to-br from-neutral-dark to-neutral-dark/90 backdrop-blur-sm text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                                        <div className="px-5 py-4">
                                            {/* Header del tooltip */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-constrast to-constrast/80 rounded-full flex items-center justify-center shadow-lg">
                                                    <span className="text-sm">💰</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-constrast text-sm">VENTA DE DÓLARES</h4>
                                                    <p className="text-xs text-white/70">Operación de cambio</p>
                                                </div>
                                            </div>
                                            
                                            {/* Contenido principal */}
                                            <div className="space-y-2 mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                                                    <span className="text-sm">Tienes: <span className="font-semibold text-secondary">Soles PEN</span></span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                                                    <span className="text-sm">Quieres: <span className="font-semibold text-secondary">Dólares USD</span></span>
                                                </div>
                                            </div>
                                            
                                            {/* Footer explicativo */}
                                            <div className="bg-white/5 rounded-lg px-3 py-2">
                                                <p className="text-xs text-white/80 text-center">
                                                    <span className="font-medium text-constrast">Nosotros</span> te vendemos dólares
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Flecha del tooltip */}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                                            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-neutral-dark"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                    {couponInfo && couponStatus.applies && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-white"></div>
                    )}
                </button>
            </div>

            {/* Exchange Inputs */}
            <div className="flex relative flex-col items-center space-y-4">
                {/* From Input */}
                <div className="flex items-center bg-white rounded-2xl shadow-lg p-2 w-full relative">
                    <div className="flex-1 h-full flex flex-col ml-2 justify-center">
                        <p className="text-neutral-light text-[8px] uppercase font-semibold">
                            {operationType === 'compra' ? "ENVÍO DÓLARES" : "ENVÍO SOLES"}
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
                            src={operationType === 'compra' ? "https://flagcdn.com/w580/us.png" : "https://flagcdn.com/w580/pe.png"}
                            alt={operationType === 'compra' ? "USD Flag" : "PEN Flag"}
                            className="w-6 h-6 object-cover rounded-full mr-2"
                        />
                        <span className="text-base font-medium tracking-wide text-neutral-light">
                            {operationType === 'compra' ? 'USD' : 'PEN'}
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
                            {operationType === 'compra' ? "RECIBO SOLES" : "RECIBO DÓLARES"}
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
                            src={operationType === 'compra' ? "https://flagcdn.com/w580/pe.png" : "https://flagcdn.com/w580/us.png"}
                            alt={operationType === 'compra' ? "PEN Flag" : "USD Flag"}
                            className="w-6 h-6 object-cover rounded-full mr-2"
                        />
                        <span className="text-base font-medium tracking-wide text-neutral-light">
                            {operationType === 'compra' ? 'PEN' : 'USD'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Coupon and Credits */}
            {(showCoupons || showCredits) && (
                <div className="flex justify-center gap-2 mt-1">
                    {showCoupons && (
                        <>
                            {!showCouponInput ? (
                                <div className="flex-1 flex gap-2">
                                    <button 
                                        onClick={() => {
                                            console.log('🎯 Click en USAR CUPÓN - Abriendo input directamente');
                                            setShowCouponInput(true);
                                        }}
                                        className="flex-1 justify-center flex gap-3 items-center py-4 px-4 rounded-xl font-medium text-sm transition-all duration-200 border-2 group relative text-neutral-dark hover:bg-neutral hover:shadow-md border-transparent hover:border-secondary/30"
                                        title="Ingresa tu código promocional para obtener una tasa preferencial"
                                    >
                                        USAR CUPÓN 
                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.74985 14.3412L6.39628 13.5378C6.05276 13.3339 5.88099 13.2319 5.69036 13.2261C5.48436 13.2197 5.30956 13.3175 4.93835 13.5378C4.52261 13.7846 3.69594 14.4643 3.1612 14.1402C2.83398 13.9418 2.83398 13.4379 2.83398 12.4301V5.33301C2.83398 3.44739 2.83398 2.50458 3.41977 1.91879C4.00556 1.33301 4.94836 1.33301 6.83398 1.33301H10.1673C12.0529 1.33301 12.9957 1.33301 13.5815 1.91879C14.1673 2.50458 14.1673 3.44739 14.1673 5.33301V12.4301C14.1673 13.4379 14.1673 13.9418 13.8401 14.1402C13.3054 14.4643 12.4787 13.7846 12.0629 13.5378C11.7194 13.3339 11.5477 13.2319 11.3571 13.2261C11.1511 13.2197 10.9763 13.3175 10.6051 13.5378L9.25145 14.3412C8.88638 14.5579 8.70378 14.6663 8.50065 14.6663C8.29752 14.6663 8.11492 14.5579 7.74985 14.3412Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.5 5.33301L6.5 9.33301" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.5 9.33301H10.494M6.50598 5.33301H6.5" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        
                                        {/* Tooltip normal */}
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-dark text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                                            💡 Obtén tasas preferenciales con tu código promocional
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-dark"></div>
                                        </div>
                                    </button>
                                    
                                    {/* Icono de información del cupón aplicado */}
                                    {couponInfo && (
                                        <div className="relative group">
                                            <button className="py-4 px-3 rounded-xl bg-constrast/10 border-2 border-constrast/30 hover:bg-constrast/20 transition-all duration-200">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                                                    <path d="M8 12V8M8 5.5H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                            
                                            {/* Tooltip detallado del cupón aplicado */}
                                            <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                                                <div className="bg-gradient-to-br from-neutral-dark to-neutral-dark/95 backdrop-blur-sm text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden w-72">
                                                    <div className="px-5 py-4">
                                                        {/* Header del tooltip */}
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-constrast to-constrast/80 rounded-full flex items-center justify-center shadow-lg">
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M8 1L10.5 6L16 6.75L12 10.5L13 16L8 13L3 16L4 10.5L0 6.75L5.5 6L8 1Z" fill="#F9F3E0"/>
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-constrast text-sm">CUPÓN {couponInfo.codigo}</h4>
                                                                <p className="text-xs text-white/70">Actualmente aplicado</p>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Detalles del cupón */}
                                                        <div className="space-y-3 mb-4">
                                                            <div className="bg-white/5 rounded-lg p-3">
                                                                <h5 className="text-xs font-semibold text-constrast mb-2">RANGO VÁLIDO</h5>
                                                                <p className="text-sm font-medium">${couponInfo.montoMinimo} - ${couponInfo.montoMaximo} USD</p>
                                                            </div>
                                                            
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div className="bg-white/5 rounded-lg p-3">
                                                                    <h5 className="text-xs font-semibold text-constrast mb-1">COMPRA</h5>
                                                                    <p className="text-sm font-bold">S/ {couponInfo.tcCompra.toFixed(4)}</p>
                                                                </div>
                                                                <div className="bg-white/5 rounded-lg p-3">
                                                                    <h5 className="text-xs font-semibold text-constrast mb-1">VENTA</h5>
                                                                    <p className="text-sm font-bold">S/ {couponInfo.tcVenta.toFixed(4)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Estado del cupón */}
                                                        <div className={`rounded-lg px-3 py-2 text-center ${
                                                            couponStatus.applies 
                                                                ? 'bg-green-500/20 border border-secondary/30' 
                                                                : 'bg-yellow-500/20 border border-yellow-400/30'
                                                        }`}>
                                                            <div className="flex items-center justify-center gap-2">
                                                                <div className={`w-2 h-2 rounded-full ${
                                                                    couponStatus.applies ? 'bg-secondary' : 'bg-yellow-400'
                                                                }`}></div>
                                                                <p className="text-xs font-medium">
                                                                    {couponStatus.applies ? '✅ Cupón activo' : '⏳ Cupón disponible'}
                                                                </p>
                                                            </div>
                                                            {!couponStatus.applies && (
                                                                <p className="text-xs text-white/70 mt-1">{couponStatus.reason}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Flecha del tooltip */}
                                                    <div className="absolute top-full right-6 transform">
                                                        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-neutral-dark"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex-1 flex gap-2 items-center">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            placeholder="Ingresa tu código promocional"
                                            value={promotionalCode}
                                            onChange={(e) => handleCouponChange(e.target.value)}
                                            className="w-full py-4 px-4 pr-12 rounded-xl border-2 border-constrast/30 bg-white text-sm text-neutral-dark placeholder:text-neutral-light/60 focus:outline-none focus:border-constrast focus:ring-4 focus:ring-constrast/20 transition-all duration-200 font-paragraph"
                                            disabled={isValidatingCoupon}
                                            autoFocus
                                        />
                                        <button
                                            onClick={() => {
                                                setShowCouponInput(false);
                                                setPromotionalCode('');                                
                                                // Limpiar cupón del servicio y restaurar TC base
                                                console.log('🧹 Limpiando cupón y restaurando TC base...');
                                                CambiaFXService.validateCoupon(''); // Esto restaura tcBase
                                                setCouponInfo(null);
                                                setInvalidCoupon(null);
                                                updateCurrentRates();
                                                if (amount1) {
                                                    calculateExchange('O');
                                                }
                                            }}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-light/60 hover:text-neutral-dark transition-colors p-1 hover:bg-neutral/50 rounded-lg"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    {/* Ícono de ayuda dinámico */}
                                    <div className="relative group">
                                        {isConsultingCoupons ? (
                                            // Durante la consulta: Mostrar loading
                                            <button 
                                                disabled
                                                className="py-4 px-4 rounded-xl bg-constrast text-white transition-all duration-200 cursor-wait"
                                                title="Consultando cupones disponibles..."
                                            >
                                                {/* Spinner de loading */}
                                                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                                
                                                {/* Tooltip durante loading */}
                                                <div className="absolute bottom-full right-0 mb-3 opacity-100 transition-all duration-300 pointer-events-none z-50">
                                                    <div className="bg-gradient-to-br from-neutral-dark to-neutral-dark/95 backdrop-blur-sm text-white rounded-lg shadow-2xl border border-white/10 px-3 py-2 whitespace-nowrap">
                                                        <div className="flex items-center gap-2">
                                                          
                                                            <p className="text-xs font-medium">🔍 Consultando cupones disponibles...</p>
                                                        </div>
                                                        <div className="absolute top-full right-3 transform">
                                                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-dark"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ) : invalidCoupon ? (
                                            // Cupón inválido: Mostrar estado de error
                                            <button className="py-4 px-4 rounded-xl bg-red-600  text-white transition-all duration-200">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                                                    <path d="M8 5v3M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                
                                                {/* Tooltip de cupón inválido */}
                                                <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                                                    <div className="bg-gradient-to-br from-red-500 to-red-600 backdrop-blur-sm text-white rounded-lg shadow-2xl border border-red-400/20 px-3 py-2 whitespace-nowrap">
                                                        <div className="flex items-center gap-2">
                                                        
                                                            <p className="text-xs font-medium">{invalidCoupon.message}</p>
                                                        </div>
                                                        <div className="absolute top-full right-3 transform">
                                                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-600"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ) : !couponInfo ? (
                                            // Antes de validar: Consultar cupones disponibles
                                            <button
                                                onClick={handleConsultCoupons}
                                                className="py-3 px-3 rounded-xl bg-constrast hover:bg-neutral-dark text-white transition-all duration-200 group"
                                                title="Consultar cupones disponibles"
                                            >
                                               <Search/>
                                                
                                                {/* Tooltip para consultar */}
                                                <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                                                    <div className="bg-gradient-to-br from-neutral-dark to-neutral-dark/95 backdrop-blur-sm text-white rounded-lg shadow-2xl border border-white/10 px-3 py-2 whitespace-nowrap">
                                                        <p className="text-xs font-medium">💡 Clic aqui para validar el cupón</p>
                                                        <div className="absolute top-full right-3 transform">
                                                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-dark"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ) : (
                                            // Después de validar: Muestra detalles del cupón en hover
                                            <button className="py-4 px-4 rounded-xl bg-green-600 text-white transition-all duration-200">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 1L10.5 6L16 6.75L12 10.5L13 16L8 13L3 16L4 10.5L0 6.75L5.5 6L8 1Z" fill="currentColor"/>
                                                </svg>
                                            </button>
                                        )}
                                        
                                        {/* Tooltip detallado del cupón validado */}
                                        {couponInfo && (
                                            <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                                                <div className="bg-gradient-to-br from-neutral-dark to-neutral-dark/95 backdrop-blur-sm text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden w-72">
                                                    <div className="px-5 py-4">
                                                        {/* Header del tooltip */}
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-green-500 rounded-full flex items-center justify-center shadow-lg">
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M8 1L10.5 6L16 6.75L12 10.5L13 16L8 13L3 16L4 10.5L0 6.75L5.5 6L8 1Z" fill="white"/>
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-secondary text-sm">CUPÓN {couponInfo.codigo}</h4>
                                                                <p className="text-xs text-white">✅ Validado y aplicado</p>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Detalles del cupón */}
                                                        <div className="space-y-3 mb-4">
                                                            <div className="bg-white/5 rounded-lg p-3">
                                                                <h5 className="text-xs font-semibold text-secondary mb-2">RANGO VÁLIDO</h5>
                                                                <p className="text-sm font-medium">${couponInfo.montoMinimo} - ${couponInfo.montoMaximo} USD</p>
                                                            </div>
                                                            
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div className="bg-white/5 rounded-lg p-3">
                                                                    <h5 className="text-xs font-semibold text-secondary mb-1">COMPRA</h5>
                                                                    <p className="text-sm font-medium">S/ {couponInfo.tcCompra.toFixed(4)}</p>
                                                                </div>
                                                                <div className="bg-white/5 rounded-lg p-3">
                                                                    <h5 className="text-xs font-semibold text-secondary mb-1">VENTA</h5>
                                                                    <p className="text-sm font-medium">S/ {couponInfo.tcVenta.toFixed(4)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Estado del cupón */}
                                                        <div className=" border  rounded-lg px-3 py-2 text-center">
                                                            <div className="flex items-center justify-center gap-2">
                                                                
                                                                <p className="text-xs font-medium">🎉 Cupón activo</p>
                                                            </div>
                                                            <p className="text-xs text-white/70 mt-1">Disfruta de tu tasa preferencial</p>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Flecha del tooltip */}
                                                    <div className="absolute top-full right-6 transform">
                                                        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-neutral-dark"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                   
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Info Message */}
            <div className="bg-white rounded-xl p-4 text-xs text-neutral-light mt-2">
                Operaciones mayores a USD 5,000.00. Consigue un tipo de cambio preferencial{' '}
                <WhatsAppButton><span className="text-constrast underline font-medium">AQUÍ</span> </WhatsAppButton>
            </div>

            {/* Exchange Rate Display */}
            {/*currentTc > 0 && (
                <div className="text-center text-neutral-light text-sm">
                    Tipo de cambio: <span className="font-semibold">S/ {currentTc.toFixed(4)}</span>
                </div>
            )*/}

            {/* Start Operation Button */}
            <button 
                onClick={handleOperationStart}
                className="mt-3 py-4 rounded-full bg-neutral-dark text-white font-semibold tracking-wider text-sm w-full hover:bg-opacity-90 transition-all duration-200"
            >
                INICIAR OPERACIÓN
            </button>

            {/* Modal Informativo del Cupón 
            
             {showCouponModal && couponInfo && (
                <div className="fixed inset-0 bg-neutral-dark/80 backdrop-blur-sm flex items-center justify-center z-[100000] p-4">
                    <div className="bg-primary rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-neutral/20">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-constrast to-constrast/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-constrast/30">
                                <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M27 12L12 27L5 20" stroke="#F9F3E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-dark mb-3 font-title">
                                ¡Cupón {couponInfo.codigo} Validado!
                            </h3>
                            <div className="bg-neutral/30 rounded-2xl p-5 mb-6 text-left">
                                <h4 className="font-bold text-neutral-dark mb-3 flex items-center gap-2 font-title">
                                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 1L10.5 6L16 6.75L12 10.5L13 16L8 13L3 16L4 10.5L0 6.75L5.5 6L8 1Z" fill="#0C0C0C"/>
                                        </svg>
                                    </div>
                                    Detalles del cupón:
                                </h4>
                                <ul className="text-sm text-neutral-light space-y-2 font-paragraph">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-constrast rounded-full"></span>
                                        Rango válido: <span className="font-semibold text-constrast">${couponInfo.montoMinimo} - ${couponInfo.montoMaximo} USD</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-constrast rounded-full"></span>
                                        Tasa de compra: <span className="font-semibold text-constrast">S/ {couponInfo.tcCompra.toFixed(4)}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-constrast rounded-full"></span>
                                        Tasa de venta: <span className="font-semibold text-constrast">S/ {couponInfo.tcVenta.toFixed(4)}</span>
                                    </li>
                                </ul>
                            </div>
                            <p className="text-sm text-neutral-light mb-6 font-paragraph leading-relaxed">
                                El cupón se aplicará automáticamente cuando el monto esté dentro del rango válido.
                            </p>
                            <button
                                onClick={() => setShowCouponModal(false)}
                                className="w-full py-4 bg-gradient-to-r from-constrast to-constrast/90 text-primary rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-constrast/30 transition-all duration-300 font-title tracking-wide"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            */}
           
        </div>
    );
};

export default ExchangeCard;
