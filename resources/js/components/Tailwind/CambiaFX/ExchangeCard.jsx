import React, { useState, useEffect, useMemo } from 'react';
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
    const [amount1, setAmount1] = useState('1,000'); // Valor por defecto con formato
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
    const [debouncedAmount1, setDebouncedAmount1] = useState('1,000'); // Estado debounced para actualizar botones
    const [baseRates, setBaseRates] = useState({ compra: '0.0000', venta: '0.0000' }); // Tasas base sin cupón

    // 🔢 FUNCIONES PARA FORMATEAR NÚMEROS CON COMAS
    const formatNumberWithCommas = (num) => {
        if (!num || isNaN(num)) return '';
        return parseFloat(num).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    };

    const parseNumberFromFormatted = (str) => {
        if (!str) return 0;
        // Remover comas y convertir a número
        return parseFloat(str.toString().replace(/,/g, '')) || 0;
    };

    const formatInputValue = (value) => {
        // Remover caracteres no numéricos excepto punto y coma
        let cleanValue = value.replace(/[^0-9.,]/g, '');
        
        // Si tiene punto, mantenerlo para decimales
        if (cleanValue.includes('.')) {
            const parts = cleanValue.split('.');
            const integerPart = parts[0].replace(/,/g, '');
            const decimalPart = parts[1] ? parts[1].substring(0, 2) : ''; // Máximo 2 decimales
            
            // Formatear la parte entera con comas
            const formattedInteger = formatNumberWithCommas(integerPart);
            
            // Preservar el punto decimal incluso si no hay decimales aún
            if (cleanValue.endsWith('.') && decimalPart === '') {
                return `${formattedInteger}.`;
            }
            
            return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
        } else {
            // Solo números enteros, formatear con comas
            const numericValue = cleanValue.replace(/,/g, '');
            return formatNumberWithCommas(numericValue);
        }
    };

    // 🔄 DEBOUNCE: Actualizar botones después de que el usuario termine de escribir
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedAmount1(amount1);
        }, 300); // 300ms de debounce
        
        return () => clearTimeout(timer);
    }, [amount1]);

    // Cargar tipos de cambio iniciales
    useEffect(() => {
        const init = async () => {
            await initializeExchangeRates();
            checkUrlCoupon();
            
            // Calcular automáticamente con el valor por defecto de 1000
            if (amount1) {
                setTimeout(() => {
                    calculateExchange('O', amount1);
                }, 500); // Pequeño delay para asegurar que todo esté inicializado
            }
        };
        init();
    }, []);

    // Actualizar TC cuando cambie el tipo de operación
    useEffect(() => {
        if (amount1) {
            calculateExchange('O');
        }
        updateCurrentRates();
    }, [operationType]);

    // Escuchar cambios en el cupón promocional para actualizar rates
    useEffect(() => {
        if (promotionalCode) {
            updateCurrentRates();
            if (amount1) {
                calculateExchange('O');
            }
        }
    }, [promotionalCode]);

    // 🔥 ACTUALIZAR: Solo actualizar tasas cuando cambie cupón, tipo de operación o monto (con debounce)
    useEffect(() => {
        console.log(`🔄 useEffect: couponInfo, operationType o debouncedAmount1 cambiaron`);
        console.log(`🔍 couponInfo:`, couponInfo);
        console.log(`🔍 operationType:`, operationType);
        console.log(`🔍 debouncedAmount1:`, debouncedAmount1);
        
        // Solo actualizar las tasas según el estado del cupón
        updateCurrentRates();
        
        // NO llamar calculateExchange aquí para evitar interferir con la entrada del usuario
    }, [couponInfo, operationType, debouncedAmount1]); // 🔥 USANDO debouncedAmount1 en lugar de amount1

    const initializeExchangeRates = async () => {
        try {
            const result = await CambiaFXService.getExchangeRates();
            updateCurrentRates();
            // Establecer TC inicial
            const serviceOperationType = operationType === 'compra' ? 'C' : 'V';
            const initialTc = CambiaFXService.getTCFromAmount(1, serviceOperationType);
            setCurrentTc(initialTc);
        } catch (error) {
            // Error silencioso en producción
        }
    };

    const updateCurrentRates = () => {
        console.log(`🔄 updateCurrentRates: iniciando...`);
        console.log(`🔍 CambiaFXService.tcBase:`, CambiaFXService.tcBase);
        console.log(`🔍 CambiaFXService.tcData:`, CambiaFXService.tcData);
        
        // 🏦 ACTUALIZAR TASAS BASE (siempre disponibles para mostrar precios tachados)
        if (CambiaFXService.tcBase.length > 0) {
            const tcBase = CambiaFXService.tcBase[0];
            setBaseRates({
                compra: tcBase.tc_compra.toFixed(4),
                venta: tcBase.tc_venta.toFixed(4)
            });
            console.log(`🏦 baseRates actualizadas - compra=${tcBase.tc_compra.toFixed(4)}, venta=${tcBase.tc_venta.toFixed(4)}`);
        }
        
        // 🔥 NUEVA LÓGICA: Verificar si hay cupón activo y si aplica
        if (couponInfo && amount1) {
            const couponApplies = checkCouponApplies();
            console.log(`🔄 updateCurrentRates: couponApplies =`, couponApplies);
            
            if (couponApplies.applies) {
                // Cupón aplica: usar tasas del cupón
                if (couponApplies.rangoActual) {
                    const rangoActual = couponApplies.rangoActual;
                    const buyRate = rangoActual.tcCompra ?? rangoActual.tc_compra;
                    const sellRate = rangoActual.tcVenta ?? rangoActual.tc_venta;
                    
                    setCurrentRates({
                        compra: buyRate.toFixed(4),
                        venta: sellRate.toFixed(4)
                    });
                    console.log(`� updateCurrentRates: usando tasas del RANGO - compra=${buyRate.toFixed(4)}, venta=${sellRate.toFixed(4)}`);
                    return;
                } else if (couponInfo.tcCompra && couponInfo.tcVenta) {
                    setCurrentRates({
                        compra: couponInfo.tcCompra.toFixed(4),
                        venta: couponInfo.tcVenta.toFixed(4)
                    });
                    console.log(`🔄 updateCurrentRates: usando tasas del CUPÓN - compra=${couponInfo.tcCompra.toFixed(4)}, venta=${couponInfo.tcVenta.toFixed(4)}`);
                    return;
                }
            }
        }
        
        // Cupón no aplica o no hay cupón: usar tasas BASE
        if (CambiaFXService.tcBase.length > 0) {
            const baseRates = CambiaFXService.tcBase[0];
            console.log(`🔍 baseRates encontradas:`, baseRates);
            setCurrentRates({
                compra: baseRates.tc_compra.toFixed(4),
                venta: baseRates.tc_venta.toFixed(4)
            });
            console.log(`🔄 updateCurrentRates: usando tasas BASE - compra=${baseRates.tc_compra.toFixed(4)}, venta=${baseRates.tc_venta.toFixed(4)}`);
        } else {
            // Fallback si no hay tasas base
            console.log(`⚠️ No hay tcBase, usando fallback`);
            const rates = CambiaFXService.getCurrentRates();
            console.log(`🔍 fallback rates:`, rates);
            setCurrentRates(rates);
            console.log(`🔄 updateCurrentRates: fallback a getCurrentRates - compra=${rates.compra}, venta=${rates.venta}`);
        }
    };

    const checkUrlCoupon = () => {
        const couponCode = CambiaFXService.checkUrlCoupon();

        if (couponCode) {
            setPromotionalCode(couponCode);
            validateCoupon(couponCode, 'p');
        }
    };

    const calculateExchange = (origin = 'O', inputValue = null) => {
        // Use inputValue if provided, otherwise use state
        let amount;
        if (inputValue !== null) {
            amount = parseNumberFromFormatted(inputValue);
        } else {
            amount = origin === 'O'
                ? parseNumberFromFormatted(amount1)
                : parseNumberFromFormatted(amount2);
        }

        if (amount === 0) {
            if (origin === 'O') {
                setAmount2('');
            } else {
                setAmount1('');
            }
            // Obtener TC base para mostrar
            const serviceOperationType = operationType === 'compra' ? 'C' : 'V';
            const baseTc = CambiaFXService.getTCFromAmount(1, serviceOperationType);
            setCurrentTc(baseTc);
            // Actualizar tasas de los botones después de limpiar
            setTimeout(() => updateCurrentRates(), 0);
            return;
        }

        // Convertir operationType a formato del servicio: 'compra' -> 'C', 'venta' -> 'V'
        const serviceOperationType = operationType === 'compra' ? 'C' : 'V';

        const calculation = CambiaFXService.calculateExchange(amount, serviceOperationType, origin === 'O' ? 'from' : 'to');

        setCurrentTc(calculation.exchangeRate);

        if (origin === 'O') {
            const formattedResult = formatNumberWithCommas(calculation.result);
            setAmount2(formattedResult);
        } else {
            const formattedResult = formatNumberWithCommas(calculation.result);
            setAmount1(formattedResult);
        }
        
        // 🔥 ACTUALIZAR tasas de los botones después del cálculo
        setTimeout(() => updateCurrentRates(), 0);
    };

    const handleSwap = () => {
        // SOLO cambiar el tipo de operación - nada más
        setOperationType(operationType === 'compra' ? 'venta' : 'compra');
        
        // NO hacer ningún cálculo adicional - dejar que el sistema reaccione naturalmente
    };

    const handleAmountChange = (value, origin) => {
        // Formatear el valor con comas automáticamente
        const formattedValue = formatInputValue(value);

        if (origin === 'O') {
            setAmount1(formattedValue);
        } else {
            setAmount2(formattedValue);
        }

        // CALCULAR INMEDIATAMENTE con el valor formateado
        // Pasar el valor formateado directamente para evitar problemas de estado
        setTimeout(() => {
            calculateExchange(origin, formattedValue);
        }, 0);
    };

    const validateCoupon = async (couponCode, tipo = 'c') => {
        setIsValidatingCoupon(true);

        try {
            const result = await CambiaFXService.validateCoupon(couponCode);

            if (!result.valid && tipo === 'c') {
                setPromotionalCode('');
                setCouponInfo(null);
                setInvalidCoupon({
                    codigo: couponCode,
                    message: result.message || 'El código de promoción no es válido.'
                });
                // Restaurar tipos de cambio base
                updateCurrentRates();
            } else if (result.valid) {
                // Limpiar cupón inválido si existía
                setInvalidCoupon(null);

                // Guardar información del cupón para mostrar al usuario
                // Con múltiples rangos, tomamos el rango más general para mostrar
                const rangos = result.data;
                const rangoMinimo = Math.min(...rangos.map(r => r.desde));
                const rangoMaximo = Math.max(...rangos.map(r => r.hasta));
                const primerRango = rangos[0];
                
                setCouponInfo({
                    codigo: couponCode,
                    montoMinimo: rangoMinimo,
                    montoMaximo: rangoMaximo,
                    tcCompra: primerRango.tc_compra,
                    tcVenta: primerRango.tc_venta,
                    rangos: rangos // Guardamos todos los rangos para referencia
                });

                // ⚡ ACTUALIZACIÓN INMEDIATA Y FORZADA
                // Actualizar rates inmediatamente
                updateCurrentRates();

                // Forzar re-render del componente
                setCurrentRates(CambiaFXService.getCurrentRates());

                // Recalcular INMEDIATAMENTE sin delay
                if (amount1) {
                    const serviceOperationType = operationType === 'compra' ? 'C' : 'V';
                    const amount = parseNumberFromFormatted(amount1);
                    const tcActual = CambiaFXService.getTCFromAmount(amount, serviceOperationType);
                    
                    // Forzar recálculo inmediato
                    calculateExchange('O');
                }
            }

        } catch (error) {
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
        // Limpiar todo el estado
        setAmount1('1,000'); // Valor por defecto con formato
        setAmount2('');
        setCurrentTc(0);
        setPromotionalCode('');
        setCouponInfo(null);
        setInvalidCoupon(null);
        setCurrentRates({ compra: '0.0000', venta: '0.0000' });
        setBaseRates({ compra: '0.0000', venta: '0.0000' });

        // Reinicializar servicio
        CambiaFXService.tcData = [...CambiaFXService.tcBase];
    };

    // 🎯 VERIFICAR SI EL CUPÓN APLICA AL MONTO ACTUAL
    const checkCouponApplies = (amountToCheck = null) => {
        // Usar el monto pasado como parámetro o amount1 por defecto
        const amountInput = amountToCheck || amount1;
        if (!couponInfo || !amountInput) return { applies: false, reason: '' };

        const amount = parseNumberFromFormatted(amountInput);

        // 🔧 LÓGICA CORREGIDA: Convertir el monto de entrada a USD para comparar con rangos
        let amountForComparison = amount;
        
        // Los rangos del cupón SIEMPRE están en USD
        // Si la operación es VENTA (input en PEN), convertir a USD para la comparación
        if (operationType === 'venta') {
            const tcBase = CambiaFXService.tcBase[0];
            if (tcBase) {
                // Convertir PEN → USD usando TC base
                amountForComparison = amount / tcBase.tc_venta;
            }
        }
        // Si la operación es COMPRA (input en USD), usar directamente

        console.log(`🔍 checkCouponApplies: ${amount} ${operationType === 'venta' ? 'PEN' : 'USD'} → ${amountForComparison} USD`);

        // Si hay múltiples rangos, verificar si el monto está en alguno de ellos
        if (couponInfo.rangos && couponInfo.rangos.length > 0) {
            let rangoAplicable = null;
            
            // Filtrar rangos válidos primero
            const rangosValidos = couponInfo.rangos.filter(r => {
                const minAmount = r.montoMinimo ?? r.desde;
                const maxAmount = r.montoMaximo ?? r.hasta;
                return r && minAmount != null && maxAmount != null;
            });
            
            console.log(`🎯 Rangos disponibles:`, rangosValidos.map(r => `${r.desde ?? r.montoMinimo}-${r.hasta ?? r.montoMaximo}`));
            
            // Buscar el rango correcto sin superposición
            for (let i = 0; i < rangosValidos.length; i++) {
                const rango = rangosValidos[i];
                const isLastRange = i === rangosValidos.length - 1;
                
                // Los rangos están en USD, usar directamente
                let minAmount = rango.montoMinimo ?? rango.desde ?? 0;
                let maxAmount = rango.montoMaximo ?? rango.hasta ?? 0;
                
                // 🔧 LÓGICA CORREGIDA: Sin superposición de rangos + tolerancia para decimales
                // Último rango incluye el límite superior, otros no
                // Usar tolerancia de 0.1 USD para evitar problemas de precisión decimal
                const tolerance = 0.1;
                const isInRange = isLastRange 
                    ? (minAmount - tolerance <= amountForComparison && amountForComparison <= maxAmount)  // Último rango incluye límite superior
                    : (minAmount - tolerance <= amountForComparison && amountForComparison < maxAmount);   // Otros rangos NO incluyen límite superior
                
                console.log(`📋 Evaluando rango ${minAmount}-${maxAmount}: ${amountForComparison} está en rango = ${isInRange} (${isLastRange ? 'último' : 'intermedio'})`);
                
                if (isInRange) {
                    rangoAplicable = rango;
                    console.log(`✅ Rango aplicable encontrado:`, rango);
                    break;
                }
            }
            
            if (rangoAplicable) {
                return { applies: true, reason: '', rangoActual: rangoAplicable };
            } else {
                const rangosDisplay = couponInfo.rangos.map(r => {
                    const min = r.desde ?? r.montoMinimo;
                    const max = r.hasta ?? r.montoMaximo;
                    return `$${min}-$${max} USD`;
                }).join(', ');
                console.log(`❌ No se encontró rango aplicable para ${amountForComparison} USD`);
                return {
                    applies: false,
                    reason: `Rangos válidos: ${rangosDisplay}`
                };
            }
        }

        // Fallback para cupones con un solo rango (compatibilidad)
        console.log(`📊 Verificando cupón simple: ${amountForComparison} USD vs ${couponInfo.montoMinimo}-${couponInfo.montoMaximo} USD`);
        
        // Usar tolerancia de 0.1 USD para evitar problemas de precisión decimal
        const tolerance = 0.1;
        
        if (amountForComparison < (couponInfo.montoMinimo - tolerance)) {
            return {
                applies: false,
                reason: `Monto mínimo requerido: $${couponInfo.montoMinimo} USD`
            };
        }

        if (amountForComparison > couponInfo.montoMaximo) {
            return {
                applies: false,
                reason: `Monto máximo permitido: $${couponInfo.montoMaximo} USD`
            };
        }

        console.log(`✅ Cupón simple aplica`);
        return { applies: true, reason: '' };
    };

    // 🔍 SIMULAR CONSULTA DE CUPONES DISPONIBLES
    const handleConsultCoupons = async () => {
        setIsConsultingCoupons(true);

        try {
            // Simular delay de consulta (1.5-2.5 segundos para parecer real)
            const delay = 1500 + Math.random() * 1000; // Entre 1.5 y 2.5 segundos
            await new Promise(resolve => setTimeout(resolve, delay));

            // Mostrar resultado de la consulta (simulado)

        } catch (error) {
            // Error silencioso en producción
        } finally {
            setIsConsultingCoupons(false);
        }
    };

    // 🎨 OBTENER TASA PREFERENCIAL PARA MOSTRAR EN BOTONES (usando useMemo para reactividad)
    const rates = useMemo(() => {
        console.log(`🎨 useMemo rates: recalculando...`);
        console.log(`🔍 DEBUG - couponInfo:`, couponInfo);
        console.log(`🔍 DEBUG - currentRates:`, currentRates);
        console.log(`🔍 DEBUG - baseRates:`, baseRates);
        console.log(`🔍 DEBUG - debouncedAmount1:`, debouncedAmount1);
        
        if (!couponInfo) {
            console.log(`🎨 useMemo rates: sin cupón, usando currentRates`, currentRates);
            return {
                // Precio actual (sin cupón, igual a base)
                compra: currentRates.compra,
                venta: currentRates.venta,
                // Sin precio anterior
                previousCompra: null,
                previousVenta: null,
                showPreviousPrice: false,
                isActive: false
            };
        }

        const couponApplies = checkCouponApplies(debouncedAmount1);
        console.log(`🎨 useMemo rates: couponApplies =`, couponApplies);
        console.log(`🔍 DEBUG - couponApplies.applies:`, couponApplies.applies);
        console.log(`🔍 DEBUG - currentRates:`, currentRates);
        console.log(`🔍 DEBUG - baseRates:`, baseRates);

        // ✅ Mostrar precio anterior solo cuando el cupón REALMENTE APLICA
        if (couponApplies.applies) {
            console.log(`🎨 useMemo rates: cupón APLICA, mostrando precio anterior`);
            console.log(`💰 Precio base (tachado): compra=${baseRates.compra}, venta=${baseRates.venta}`);
            console.log(`🎫 Precio cupón (actual): compra=${currentRates.compra}, venta=${currentRates.venta}`);
            return {
                // Precio actual con cupón
                compra: currentRates.compra,
                venta: currentRates.venta,
                // Precio anterior (base, tachado)
                previousCompra: baseRates.compra,
                previousVenta: baseRates.venta,
                showPreviousPrice: true, // ✅ SOLO cuando realmente aplica
                isActive: true
            };
        } else {
            console.log(`🎨 useMemo rates: cupón NO APLICA, usando tasas base sin precio anterior`);
            return {
                // Precio actual (base, porque cupón no aplica)
                compra: currentRates.compra,
                venta: currentRates.venta,
                // Sin precio anterior
                previousCompra: null,
                previousVenta: null,
                showPreviousPrice: false, // ✅ NO mostrar precio anterior
                isActive: false
            };
        }
    }, [couponInfo, currentRates, baseRates, debouncedAmount1, operationType]); // 🔥 DEPENDENCIAS CRÍTICAS incluyendo baseRates
    
    const couponStatus = useMemo(() => checkCouponApplies(debouncedAmount1), [couponInfo, debouncedAmount1, operationType]);

    const handleOperationStart = () => {
        const amountValue = parseNumberFromFormatted(amount1);

        if (amountValue === 0) {
            alert('Debe ingresar un monto');
            return;
        }

        const operationData = {
            type: operationType === 'venta' ? 'V' : 'C',
            fromAmount: operationType === 'venta' ? amountValue : parseNumberFromFormatted(amount2),
            toAmount: operationType === 'venta' ? parseNumberFromFormatted(amount2) : amountValue,
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
                    className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 relative ${operationType === 'compra'
                            ? 'bg-constrast text-white shadow-lg shadow-constrast/25'
                            : 'bg-white text-neutral-dark hover:bg-neutral hover:shadow-md'
                        }`}
                >
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2">
                            {couponInfo && rates.showPreviousPrice ? (
                                <div className="text-center">
                                    <div className=" text-[10px] lg:text-xs opacity-75 font-medium">
                                        <span className="line-through">Antes S/ {rates.previousCompra}</span>
                                    </div>
                                     <span className={`text-sm font-semibold  ${operationType === 'venta'
                                            ? ' text-neutral-dark'
                                            : ' text-white'
                                        }`}>COMPRA  <br className='lg:hidden'/> S/ {rates.compra}</span>
                                </div>
                            ) : (
                                <span className="text-xs lg:text-sm font-semibold">COMPRA <br className='lg:hidden'/> S/ {rates.compra}</span>
                            )}

                            {/* Icono de ayuda para COMPRA */}
                            <div className="relative group">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center cursor-help transition-all duration-200 ${operationType === 'compra'
                                        ? 'bg-secondary text-neutral-dark'
                                        : 'bg-neutral-dark text-white'
                                    }`}>
                                    <svg className='w-4 h-4' width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 6.5C6.5 5.39543 7.39543 4.5 8.5 4.5C9.60457 4.5 10.5 5.39543 10.5 6.5C10.5 7.60457 9.60457 8.5 8.5 8.5V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="8.5" cy="12" r="0.5" fill="currentColor" />
                                    </svg>
                                </div>

                                {/* Tooltip mejorado para COMPRA - Responsive */}
                                <div className="absolute bottom-full mb-5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 
                                               w-40 max-w-[calc(100vw-2rem)] right-0
                                               sm:w-auto sm:min-w-max sm:right-0">
                                    <div className="bg-neutral-dark backdrop-blur-sm text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                                        <div className="px-3 py-3 sm:px-5 sm:py-4">
                                            {/* Contenido principal */}
                                            <div className="space-y-2 mb-3">
                                                <div className="flex items-start gap-2">
                                                    <span className="text-xs sm:text-sm leading-tight">Tienes: <span className="font-semibold text-secondary">Dólares</span></span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <span className="text-xs sm:text-sm leading-tight">Quieres: <span className="font-semibold text-secondary">Soles</span></span>
                                                </div>
                                            </div>

                                            {/* Footer explicativo */}
                                            <div className="bg-white/5 rounded-lg px-2 py-2 sm:px-3">
                                                <p className="text-xs text-white/80 text-center leading-tight">
                                                    <span className="font-medium text-secondary">Nosotros</span> compramos tus dólares
                                                </p>
                                            </div>
                                        </div>

                                        {/* Flecha del tooltip - Responsive */}
                                        <div className="absolute top-full right-6">
                                            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-neutral-dark"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    {couponInfo && rates.showPreviousPrice && (
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            rates.isActive ? 'bg-secondary' : 'bg-yellow-400'
                        }`}></div>
                    )}
                </button>
                <button
                    onClick={() => setOperationType('venta')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 relative ${operationType === 'venta'
                            ? 'bg-constrast text-white shadow-lg shadow-constrast/25'
                            : 'bg-white text-neutral-dark hover:bg-neutral hover:shadow-md'
                        }`}
                >
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2">
                            {couponInfo && rates.showPreviousPrice ? (
                                <div className="text-center">
                                    <div className="text-[10px] lg:text-xs opacity-75 font-medium">
                                        <span className="line-through">Antes S/ {rates.previousVenta}</span>
                                    </div>

                                      <span className={`text-sm font-semibold  ${operationType === 'venta'
                                             ? 'text-white '
                                            : '  text-neutral-dark'
                                        }`}>VENTA   <br className='lg:hidden'/> S/ {rates.venta}</span>

                                </div>
                            ) : (
                                <span className="text-xs lg:text-sm font-semibold">VENTA  <br className='lg:hidden'/>S/ {rates.venta}</span>
                            )}

                            {/* Icono de ayuda para VENTA */}
                            <div className="relative group">
                                <div className={`min-w-5 min-h-5  max-w-5 max-h-5 rounded-full flex items-center justify-center cursor-help transition-all duration-200 ${operationType === 'venta'
                                        ? 'bg-secondary text-neutral-dark'
                                        : 'bg-neutral-dark text-white'
                                    }`}>
                                    <svg className=' min-w-4 min-h-4' width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 6.5C6.5 5.39543 7.39543 4.5 8.5 4.5C9.60457 4.5 10.5 5.39543 10.5 6.5C10.5 7.60457 9.60457 8.5 8.5 8.5V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="8.5" cy="12" r="0.5" fill="currentColor" />
                                    </svg>
                                </div>

                                {/* Tooltip mejorado para VENTA - Responsive */}
                                <div className="absolute bottom-full mb-5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[999]
                                                w-40 max-w-[calc(100vw-2rem)] right-0 sm:w-auto sm:min-w-max sm:right-0">
                                    <div className="bg-neutral-dark backdrop-blur-sm text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                                        <div className="px-3 py-3 sm:px-5 sm:py-4">
                                            {/* Contenido principal */}
                                            <div className="space-y-2 mb-3">
                                                <div className="flex items-start gap-2">
                                                    <span className="text-xs sm:text-sm leading-tight">Tienes: <span className="font-semibold text-secondary">Soles</span></span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <span className="text-xs sm:text-sm leading-tight">Quieres: <span className="font-semibold text-secondary">Dólares</span></span>
                                                </div>
                                            </div>

                                            {/* Footer explicativo */}
                                            <div className="bg-white/5 rounded-lg px-2 py-2 sm:px-3">
                                                <p className="text-xs text-white/80 text-center leading-tight">
                                                    <span className="font-medium text-secondary">Nosotros</span> te vendemos dólares
                                                </p>
                                            </div>
                                        </div>

                                        {/* Flecha del tooltip - Responsive */}
                                        <div className="absolute top-full right-6">
                                            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-neutral-dark"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    {couponInfo && rates.showPreviousPrice && (
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            rates.isActive ? 'bg-secondary' : 'bg-yellow-400'
                        }`}></div>
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
                            type="text"
                            placeholder="0.00"
                            value={amount1}
                            onChange={(e) => {
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
                        className="bg-constrast text-white p-3 rounded-xl shadow-lg transition-all duration-200 hover:bg-neutral-dark"
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
                            type="text"
                            placeholder="0.00"
                            value={amount2}
                            onChange={(e) => {
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
                                            setShowCouponInput(true);
                                        }}
                                        className="flex-1 justify-center flex gap-3 items-center py-4 px-4 rounded-xl font-medium text-sm transition-all duration-200 border-2 group relative text-neutral-dark hover:bg-neutral hover:shadow-md border-transparent hover:border-secondary/30"
                                        title="Ingresa tu cupón promocional para obtener una tasa preferencial"
                                    >
                                        USAR CUPÓN
                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.74985 14.3412L6.39628 13.5378C6.05276 13.3339 5.88099 13.2319 5.69036 13.2261C5.48436 13.2197 5.30956 13.3175 4.93835 13.5378C4.52261 13.7846 3.69594 14.4643 3.1612 14.1402C2.83398 13.9418 2.83398 13.4379 2.83398 12.4301V5.33301C2.83398 3.44739 2.83398 2.50458 3.41977 1.91879C4.00556 1.33301 4.94836 1.33301 6.83398 1.33301H10.1673C12.0529 1.33301 12.9957 1.33301 13.5815 1.91879C14.1673 2.50458 14.1673 3.44739 14.1673 5.33301V12.4301C14.1673 13.4379 14.1673 13.9418 13.8401 14.1402C13.3054 14.4643 12.4787 13.7846 12.0629 13.5378C11.7194 13.3339 11.5477 13.2319 11.3571 13.2261C11.1511 13.2197 10.9763 13.3175 10.6051 13.5378L9.25145 14.3412C8.88638 14.5579 8.70378 14.6663 8.50065 14.6663C8.29752 14.6663 8.11492 14.5579 7.74985 14.3412Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.5 5.33301L6.5 9.33301" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.5 9.33301H10.494M6.50598 5.33301H6.5" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                        {/* Tooltip normal - Responsive */}
                                        <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 
                                                       w-56 max-w-[calc(100vw-2rem)] right-0 
                                                       sm:w-auto sm:whitespace-nowrap">
                                            <div className="bg-neutral-dark text-white text-xs rounded-lg px-2 py-2 sm:px-3 text-center">
                                                💡 Obtén tasas preferenciales con tu código promocional
                                                <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-dark"></div>
                                            </div>
                                        </div>
                                    </button>

                                    {/* Icono de información del cupón aplicado */}
                                    {couponInfo && (
                                        <div className="relative group">
                                            <button className="py-4 px-3 rounded-xl bg-constrast/10 border-2 border-constrast/30 hover:bg-constrast/20 transition-all duration-200">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                                                    <path d="M8 12V8M8 5.5H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            {/* Tooltip detallado del cupón aplicado - Responsive */}
                                            <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50
                                                           w-72 max-w-[calc(100vw-2rem)] right-0 
                                                           sm:w-72 sm:right-0">
                                                <div className="bg-neutral-dark backdrop-blur-sm text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                                                    <div className="px-3 py-3 sm:px-5 sm:py-4">
                                                        {/* Header del tooltip */}
                                                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-constrast to-constrast/80 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                                                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-4 sm:h-4">
                                                                    <path d="M8 1L10.5 6L16 6.75L12 10.5L13 16L8 13L3 16L4 10.5L0 6.75L5.5 6L8 1Z" fill="#F9F3E0" />
                                                                </svg>
                                                            </div>
                                                            <div className="min-w-0">
                                                                <h4 className="font-bold text-constrast text-xs sm:text-sm truncate">CUPÓN {couponInfo.codigo}</h4>
                                                                <p className="text-xs text-white/70">Actualmente aplicado</p>
                                                            </div>
                                                        </div>

                                                        {/* Detalles del cupón */}
                                                        <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                                                            {/* Si tiene múltiples rangos, mostrar cada uno */}
                                                            {couponInfo?.rangos && couponInfo.rangos.length > 1 ? (
                                                                <>
                                                                    <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                                                                        <h5 className="text-xs font-semibold text-constrast mb-2">RANGOS DISPONIBLES</h5>
                                                                        <div className="space-y-2">
                                                                            {couponInfo.rangos.filter(rango => rango && (rango.montoMinimo != null || rango.desde != null) && (rango.montoMaximo != null || rango.hasta != null)).map((rango, index) => {
                                                                                const currentAmount = parseNumberFromFormatted(amount1);
                                                                                // Manejar tanto la estructura nueva (montoMinimo/montoMaximo) como la del backend (desde/hasta)
                                                                                let minAmount = rango.montoMinimo ?? rango.desde ?? 0;
                                                                                let maxAmount = rango.montoMaximo ?? rango.hasta ?? 0;
                                                                                const buyRate = rango.tcCompra ?? rango.tc_compra ?? 'N/A';
                                                                                const sellRate = rango.tcVenta ?? rango.tc_venta ?? 'N/A';
                                                                                
                                                                                // 💱 CONVERSIÓN DE MONEDA: Los rangos están en USD, convertir para VENTA
                                                                                const tcBase = CambiaFXService.tcBase[0]; // TC base sin cupón
                                                                                if (operationType === 'venta' && tcBase) {
                                                                                    minAmount = minAmount * tcBase.tc_venta;
                                                                                    maxAmount = maxAmount * tcBase.tc_venta;
                                                                                }
                                                                                
                                                                                // 🔧 LÓGICA CORREGIDA: Sin superposición de rangos
                                                                                // Último rango incluye el límite superior, otros no
                                                                                const isLastRange = index === couponInfo.rangos.filter(r => r && (r.montoMinimo != null || r.desde != null) && (r.montoMaximo != null || r.hasta != null)).length - 1;
                                                                                const isCurrentRange = isLastRange 
                                                                                    ? (currentAmount >= minAmount && currentAmount <= maxAmount)  // Último: incluye límite superior
                                                                                    : (currentAmount >= minAmount && currentAmount < maxAmount);   // Otros: NO incluye límite superior
                                                                                
                                                                                return (
                                                                                    <div key={index} className={`flex justify-between items-center p-2 rounded-md text-xs ${
                                                                                        isCurrentRange 
                                                                                            ? 'bg-constrast/20 border border-constrast/40' 
                                                                                            : 'bg-white/5'
                                                                                    }`}>
                                                                                        <span className="font-medium">
                                                                                            {operationType === 'compra' 
                                                                                                ? `$${(minAmount || 0).toLocaleString()} - $${(maxAmount || 0).toLocaleString()} USD`
                                                                                                : `S/${(minAmount || 0).toLocaleString()} - S/${(maxAmount || 0).toLocaleString()} PEN`
                                                                                            }
                                                                                            {isCurrentRange && <span className="ml-1 text-constrast">✓</span>}
                                                                                        </span>
                                                                                        <div className="flex gap-2 text-xs">
                                                                                            <span>C: {typeof buyRate === 'number' ? buyRate.toFixed(4) : buyRate}</span>
                                                                                            <span>V: {typeof sellRate === 'number' ? sellRate.toFixed(4) : sellRate}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </div>

                                                                    {/* Mostrar tasas del rango actual */}
                                                                    {(() => {
                                                                        const currentAmount = parseNumberFromFormatted(amount1);
                                                                        
                                                                        // 🔧 LÓGICA CORREGIDA: Filtrar rangos válidos y aplicar lógica sin superposición
                                                                        const rangosValidos = couponInfo.rangos.filter(r => {
                                                                            return r && (r.montoMinimo != null || r.desde != null) && (r.montoMaximo != null || r.hasta != null);
                                                                        });
                                                                        
                                                                        // 💱 CONVERSIÓN DE MONEDA: Los rangos están en USD, convertir para VENTA
                                                                        const tcBase = CambiaFXService.tcBase[0]; // TC base sin cupón
                                                                        
                                                                        let currentRange = null;
                                                                        for (let i = 0; i < rangosValidos.length; i++) {
                                                                            const rango = rangosValidos[i];
                                                                            const isLastRange = i === rangosValidos.length - 1;
                                                                            let minAmount = rango.montoMinimo ?? rango.desde ?? 0;
                                                                            let maxAmount = rango.montoMaximo ?? rango.hasta ?? 0;
                                                                            
                                                                            // 💱 Si es VENTA, convertir rangos de USD a PEN usando TC base
                                                                            if (operationType === 'venta' && tcBase) {
                                                                                minAmount = minAmount * tcBase.tc_venta;
                                                                                maxAmount = maxAmount * tcBase.tc_venta;
                                                                            }
                                                                            
                                                                            // 🔧 LÓGICA SIN SUPERPOSICIÓN: Último rango incluye límite superior, otros no
                                                                            const isInRange = isLastRange 
                                                                                ? (currentAmount >= minAmount && currentAmount <= maxAmount)  // Último: incluye límite superior
                                                                                : (currentAmount >= minAmount && currentAmount < maxAmount);   // Otros: NO incluye límite superior
                                                                            
                                                                            if (isInRange) {
                                                                                currentRange = rango;
                                                                                break;
                                                                            }
                                                                        }
                                                                        
                                                                        if (currentRange) {
                                                                            const buyRate = currentRange.tcCompra ?? currentRange.tc_compra ?? 'N/A';
                                                                            const sellRate = currentRange.tcVenta ?? currentRange.tc_venta ?? 'N/A';
                                                                            
                                                                            return (
                                                                                <div className="grid grid-cols-2 gap-1 sm:gap-2">
                                                                                    <div className="bg-constrast/10 border border-constrast/30 rounded-lg p-2 sm:p-3">
                                                                                        <h5 className="text-xs font-semibold text-constrast mb-1">COMPRA</h5>
                                                                                        <p className="text-xs sm:text-sm font-bold">S/ {typeof buyRate === 'number' ? buyRate.toFixed(4) : buyRate}</p>
                                                                                    </div>
                                                                                    <div className="bg-constrast/10 border border-constrast/30 rounded-lg p-2 sm:p-3">
                                                                                        <h5 className="text-xs font-semibold text-constrast mb-1">VENTA</h5>
                                                                                        <p className="text-xs sm:text-sm font-bold">S/ {typeof sellRate === 'number' ? sellRate.toFixed(4) : sellRate}</p>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }
                                                                        return null;
                                                                    })()}
                                                                </>
                                                            ) : (
                                                                // Cupón con un solo rango (comportamiento original)
                                                                <>
                                                                    <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                                                                        <h5 className="text-xs font-semibold text-constrast mb-1 sm:mb-2">RANGO VÁLIDO</h5>
                                                                        <p className="text-xs sm:text-sm font-medium">${couponInfo.montoMinimo} - ${couponInfo.montoMaximo} USD</p>
                                                                    </div>

                                                                    <div className="grid grid-cols-2 gap-1 sm:gap-2">
                                                                        <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                                                                            <h5 className="text-xs font-semibold text-constrast mb-1">COMPRA</h5>
                                                                            <p className="text-xs sm:text-sm font-bold">S/ {couponInfo.tcCompra.toFixed(4)}</p>
                                                                        </div>
                                                                        <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                                                                            <h5 className="text-xs font-semibold text-constrast mb-1">VENTA</h5>
                                                                            <p className="text-xs sm:text-sm font-bold">S/ {couponInfo.tcVenta.toFixed(4)}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* Estado del cupón */}
                                                        <div className={`rounded-lg px-2 py-2 sm:px-3 text-center ${couponStatus.applies
                                                                ? 'bg-green-500/20 border border-secondary/30'
                                                                : 'bg-yellow-500/20 border border-yellow-400/30'
                                                            }`}>
                                                            <div className="flex items-center justify-center gap-2">
                                                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${couponStatus.applies ? 'bg-secondary' : 'bg-yellow-400'
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

                                                    {/* Flecha del tooltip - Responsive */}
                                                    <div className="absolute top-full right-6">
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
                                            placeholder="Ingresa tu cupón promocional"
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
                                                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

                                                {/* Tooltip durante loading - Responsive */}
                                                <div className="absolute bottom-full mb-3 opacity-100 transition-all duration-300 pointer-events-none z-50
                                                               w-52 max-w-[calc(100vw-2rem)] right-0 
                                                               sm:w-auto sm:right-0">
                                                    <div className="bg-neutral-dark backdrop-blur-sm text-white rounded-lg shadow-2xl border border-white/10 px-2 py-2 sm:px-3 text-center">
                                                        <div className="flex items-center gap-2 justify-center">
                                                            <p className="text-xs font-medium">🔍 Consultando cupones disponibles...</p>
                                                        </div>
                                                        <div className="absolute top-full right-3">
                                                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-dark"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ) : invalidCoupon ? (
                                            // Cupón inválido: Mostrar estado de error
                                            <button className="py-4 px-4 rounded-xl bg-red-600  text-white transition-all duration-200">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                                                    <path d="M8 5v3M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                                {/* Tooltip de cupón inválido - Responsive */}
                                                <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50
                                                               w-52 max-w-[calc(100vw-2rem)] right-0 
                                                               sm:w-auto sm:right-0">
                                                    <div className="bg-gradient-to-br from-red-500 to-red-600 backdrop-blur-sm text-white rounded-lg shadow-2xl border border-red-400/20 px-2 py-2 sm:px-3 text-center sm:whitespace-nowrap">
                                                        <div className="flex items-center gap-2 justify-center">
                                                            <p className="text-xs font-medium">{invalidCoupon.message}</p>
                                                        </div>
                                                        <div className="absolute top-full right-3">
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
                                                <Search />

                                                {/* Tooltip para consultar - Responsive */}
                                                <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50
                                                               w-48 max-w-[calc(100vw-2rem)] right-0 
                                                               sm:w-auto sm:right-0">
                                                    <div className="bg-neutral-dark backdrop-blur-sm text-white rounded-lg shadow-2xl border border-white/10 px-2 py-2 sm:px-3 text-center sm:whitespace-nowrap">
                                                        <p className="text-xs font-medium">💡 Click aqui para validar el cupón</p>
                                                        <div className="absolute top-full right-3">
                                                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-dark"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ) : (
                                            // Después de validar: Muestra detalles del cupón en hover
                                            <button className="py-4 px-4 rounded-xl bg-green-600 text-white transition-all duration-200">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 1L10.5 6L16 6.75L12 10.5L13 16L8 13L3 16L4 10.5L0 6.75L5.5 6L8 1Z" fill="currentColor" />
                                                </svg>
                                            </button>
                                        )}

                                        {/* Tooltip detallado del cupón validado - Responsive */}
                                        {couponInfo && (
                                            <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50
                                                           w-72 max-w-[calc(100vw-2rem)] right-0 
                                                           sm:w-72 sm:right-0">
                                                <div className="bg-neutral-dark backdrop-blur-sm text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                                                    <div className="px-3 py-3 sm:px-5 sm:py-4">
                                                        {/* Header del tooltip */}
                                                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-secondary to-green-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                                                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-4 sm:h-4">
                                                                    <path d="M8 1L10.5 6L16 6.75L12 10.5L13 16L8 13L3 16L4 10.5L0 6.75L5.5 6L8 1Z" fill="white" />
                                                                </svg>
                                                            </div>
                                                            <div className="min-w-0">
                                                                <h4 className="font-bold text-secondary text-xs sm:text-sm truncate">CUPÓN {couponInfo.codigo}</h4>
                                                                <p className="text-xs text-white">✅ Validado y aplicado</p>
                                                            </div>
                                                        </div>

                                                        {/* Detalles del cupón */}
                                                        <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                                                            {/* Si tiene múltiples rangos, mostrar cada uno */}
                                                            {couponInfo.rangos && couponInfo.rangos.length > 1 ? (
                                                                <>
                                                                    <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                                                                        <h5 className="text-xs font-semibold text-secondary mb-2">RANGOS DISPONIBLES</h5>
                                                                        <div className="space-y-2">
                                                                            {couponInfo.rangos.filter(rango => rango && (rango.montoMinimo != null || rango.desde != null) && (rango.montoMaximo != null || rango.hasta != null)).map((rango, index) => {
                                                                                const currentAmount = parseNumberFromFormatted(amount1);
                                                                                // Manejar tanto la estructura nueva (montoMinimo/montoMaximo) como la del backend (desde/hasta)
                                                                                const minAmountOriginal = rango.montoMinimo ?? rango.desde ?? 0;
                                                                                const maxAmountOriginal = rango.montoMaximo ?? rango.hasta ?? 0;
                                                                                const buyRate = rango.tcCompra ?? rango.tc_compra ?? 'N/A';
                                                                                const sellRate = rango.tcVenta ?? rango.tc_venta ?? 'N/A';
                                                                                
                                                                                // 💱 CONVERSIÓN SOLO PARA VALIDACIÓN: Los rangos están en USD, convertir para VENTA solo para determinar si aplica
                                                                                let minAmountForValidation = minAmountOriginal;
                                                                                let maxAmountForValidation = maxAmountOriginal;
                                                                                const tcBase = CambiaFXService.tcBase[0]; // TC base sin cupón
                                                                                if (operationType === 'venta' && tcBase) {
                                                                                    minAmountForValidation = minAmountOriginal * tcBase.tc_venta;
                                                                                    maxAmountForValidation = maxAmountOriginal * tcBase.tc_venta;
                                                                                }
                                                                                
                                                                                // 🔧 LÓGICA CORREGIDA: Sin superposición de rangos
                                                                                // Último rango incluye el límite superior, otros no
                                                                                const isLastRange = index === couponInfo.rangos.filter(r => r && (r.montoMinimo != null || r.desde != null) && (r.montoMaximo != null || r.hasta != null)).length - 1;
                                                                                const isCurrentRange = isLastRange 
                                                                                    ? (currentAmount >= minAmountForValidation && currentAmount <= maxAmountForValidation)  // Último: incluye límite superior
                                                                                    : (currentAmount >= minAmountForValidation && currentAmount < maxAmountForValidation);   // Otros: NO incluye límite superior
                                                                                
                                                                                return (
                                                                                    <div key={index} className={`flex justify-between items-center p-2 rounded-md text-xs ${
                                                                                        isCurrentRange 
                                                                                            ? 'bg-secondary/20 border border-secondary/40' 
                                                                                            : 'bg-white/5'
                                                                                    }`}>
                                                                                        <span className="font-medium">
                                                                                            ${(minAmountOriginal || 0).toLocaleString()} - ${(maxAmountOriginal || 0).toLocaleString()} 
                                                                                            {isCurrentRange && <span className="ml-1 text-secondary">✓</span>}
                                                                                        </span>
                                                                                        <div className="flex gap-2 text-xs">
                                                                                            <span>C: {typeof buyRate === 'number' ? buyRate.toFixed(3) : buyRate}</span>
                                                                                            <span>V: {typeof sellRate === 'number' ? sellRate.toFixed(3) : sellRate}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </div>

                                                                    {/* Mostrar tasas del rango actual */}
                                                                    {(() => {
                                                                        const currentAmount = parseNumberFromFormatted(amount1);
                                                                        
                                                                        // 🔧 LÓGICA CORREGIDA: Filtrar rangos válidos y aplicar lógica sin superposición
                                                                        const rangosValidos = couponInfo.rangos.filter(r => {
                                                                            return r && (r.montoMinimo != null || r.desde != null) && (r.montoMaximo != null || r.hasta != null);
                                                                        });
                                                                        
                                                                        // 💱 CONVERSIÓN SOLO PARA VALIDACIÓN: Los rangos están en USD, convertir para VENTA solo para determinar el rango actual
                                                                        const tcBase = CambiaFXService.tcBase[0]; // TC base sin cupón
                                                                        
                                                                        let currentRange = null;
                                                                        for (let i = 0; i < rangosValidos.length; i++) {
                                                                            const rango = rangosValidos[i];
                                                                            const isLastRange = i === rangosValidos.length - 1;
                                                                            const minAmountOriginal = rango.montoMinimo ?? rango.desde ?? 0;
                                                                            const maxAmountOriginal = rango.montoMaximo ?? rango.hasta ?? 0;
                                                                            
                                                                            // 💱 Conversión solo para validación, no para mostrar
                                                                            let minAmountForValidation = minAmountOriginal;
                                                                            let maxAmountForValidation = maxAmountOriginal;
                                                                            if (operationType === 'venta' && tcBase) {
                                                                                minAmountForValidation = minAmountOriginal * tcBase.tc_venta;
                                                                                maxAmountForValidation = maxAmountOriginal * tcBase.tc_venta;
                                                                            }
                                                                            
                                                                            // 🔧 LÓGICA SIN SUPERPOSICIÓN: Último rango incluye límite superior, otros no
                                                                            const isInRange = isLastRange 
                                                                                ? (currentAmount >= minAmountForValidation && currentAmount <= maxAmountForValidation)  // Último: incluye límite superior
                                                                                : (currentAmount >= minAmountForValidation && currentAmount < maxAmountForValidation);   // Otros: NO incluye límite superior
                                                                            
                                                                            if (isInRange) {
                                                                                currentRange = rango;
                                                                                break;
                                                                            }
                                                                        }
                                                                        
                                                                        if (currentRange) {
                                                                            const buyRate = currentRange.tcCompra ?? currentRange.tc_compra ?? 'N/A';
                                                                            const sellRate = currentRange.tcVenta ?? currentRange.tc_venta ?? 'N/A';
                                                                            
                                                                            return (
                                                                                <div className="grid grid-cols-2 gap-1 sm:gap-2">
                                                                                    <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-2 sm:p-3">
                                                                                        <h5 className="text-xs font-semibold text-secondary mb-1">COMPRA</h5>
                                                                                        <p className="text-xs sm:text-sm font-bold">S/ {typeof buyRate === 'number' ? buyRate.toFixed(3) : buyRate}</p>
                                                                                    </div>
                                                                                    <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-2 sm:p-3">
                                                                                        <h5 className="text-xs font-semibold text-secondary mb-1">VENTA </h5>
                                                                                        <p className="text-xs sm:text-sm font-bold">S/ {typeof sellRate === 'number' ? sellRate.toFixed(3) : sellRate}</p>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }
                                                                        return null;
                                                                    })()}
                                                                </>
                                                            ) : (
                                                                // Cupón con un solo rango (comportamiento original)
                                                                <>
                                                                    <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                                                                        <h5 className="text-xs font-semibold text-secondary mb-1 sm:mb-2">RANGO VÁLIDO</h5>
                                                                        <p className="text-xs sm:text-sm font-medium">${couponInfo.montoMinimo} - ${couponInfo.montoMaximo} USD</p>
                                                                    </div>

                                                                    <div className="grid grid-cols-2 gap-1 sm:gap-2">
                                                                        <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                                                                            <h5 className="text-xs font-semibold text-secondary mb-1">COMPRA</h5>
                                                                            <p className="text-xs sm:text-sm font-medium">S/ {couponInfo.tcCompra.toFixed(4)}</p>
                                                                        </div>
                                                                        <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                                                                            <h5 className="text-xs font-semibold text-secondary mb-1">VENTA</h5>
                                                                            <p className="text-xs sm:text-sm font-medium">S/ {couponInfo.tcVenta.toFixed(4)}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* Estado del cupón */}
                                                        <div className="border rounded-lg px-2 py-2 sm:px-3 text-center">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <p className="text-xs font-medium">🎉 Cupón activo</p>
                                                            </div>
                                                            <p className="text-xs text-white/70 mt-1">Disfruta de tu tasa preferencial</p>
                                                        </div>
                                                    </div>

                                                    {/* Flecha del tooltip - Responsive */}
                                                    <div className="absolute top-full right-6">
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
                className="mt-3 py-4 rounded-full bg-neutral-dark text-white font-semibold tracking-wider text-sm w-full hover:bg-constrast transition-all duration-200"
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
