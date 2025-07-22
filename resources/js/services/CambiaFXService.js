import axios from 'axios';

class CambiaFXService {
    constructor() {
        this.baseURL = 'https://apiluna.cambiafx.pe/api/BackendPizarra'; // Nueva API de Luna
        this.localAPI = '/api'; // API local para otras funciones
        this.tcData = [];
        this.tcBase = [];
        this.tcBaseOriginal = null; // 🔥 GUARDAR TC BASE ORIGINAL para conversiones
        this.idParCurrency = 1; // USD-PEN par
    }

    // Obtener tipos de cambio reales de la nueva API de Luna
    async getExchangeRates() {
        try {
            console.log('🔧 CambiaFXService.getExchangeRates() iniciado - LLAMANDO A LA NUEVA API DE LUNA');
            
            // Llamar a la nueva API
            const response = await axios.get(`${this.baseURL}/getTcCustomerNoAuth`, {
                params: {
                    idParCurrency: this.idParCurrency
                },
                timeout: 8000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('📡 Respuesta de API Luna exitosa:', response.data);
            
            let realTimeData = [];
            
            // La nueva API devuelve directamente un array
            if (Array.isArray(response.data)) {
                realTimeData = response.data;
                console.log('✅ Datos obtenidos como array directo:', realTimeData);
            } else {
                throw new Error('Formato de respuesta inesperado: ' + JSON.stringify(response.data));
            }
            
            // Validar que tenemos datos válidos
            if (realTimeData.length === 0) {
                throw new Error('No se obtuvieron datos de tipos de cambio');
            }
            
            // Mapear el nuevo formato al formato interno
            const processedData = realTimeData.map(item => ({
                id: item.idRange || 0,
                desde: parseFloat(item.tcFrom || 0),
                hasta: parseFloat(item.tcTo || 999999),
                tc_compra: parseFloat(item.tcBuy || 0),
                tc_venta: parseFloat(item.tcSale || 0),
                // Campos adicionales de la nueva API
                coupon: item.coupon,
                amountMinOperation: parseFloat(item.amountMinOperation || 0),
                amountMaxOperation: parseFloat(item.amountMaxOperation || 0)
            }));
            
            console.log('📊 Datos procesados con nuevo formato:', processedData);
            this.tcBase = processedData;
            this.tcData = [...processedData];
            
            // 🔥 GUARDAR TC BASE ORIGINAL para conversiones de rangos
            if (processedData.length > 0) {
                this.tcBaseOriginal = {
                    tc_compra: processedData[0].tc_compra,
                    tc_venta: processedData[0].tc_venta
                };
                console.log('💾 TC BASE ORIGINAL guardado para conversiones:', this.tcBaseOriginal);
            }
            
            console.log('✅ TC Data asignado (API LUNA REAL):', {
                tcBase: this.tcBase,
                tcData: this.tcData,
                tcBaseOriginal: this.tcBaseOriginal
            });
            
            return processedData;
            
        } catch (error) {
            console.error('❌ Error en getExchangeRates:', error);
            
            // Fallback a datos estáticos si hay algún error con la API
            const fallbackData = [
                { id: 1, desde: 0, hasta: 1000, tc_compra: 3.5330, tc_venta: 3.5650 },
                { id: 2, desde: 1001, hasta: 5000, tc_compra: 3.5340, tc_venta: 3.5660 },
                { id: 3, desde: 5001, hasta: 10000, tc_compra: 3.5350, tc_venta: 3.5670 },
                { id: 4, desde: 10001, hasta: 999999, tc_compra: 3.5360, tc_venta: 3.5680 }
            ];
            
            console.log('📊 Usando datos de respaldo (API no disponible):', fallbackData);
            this.tcBase = fallbackData;
            this.tcData = [...fallbackData];
            
            // 🔥 GUARDAR TC BASE ORIGINAL para conversiones de rangos (fallback)
            if (fallbackData.length > 0) {
                this.tcBaseOriginal = {
                    tc_compra: fallbackData[0].tc_compra,
                    tc_venta: fallbackData[0].tc_venta
                };
                console.log('💾 TC BASE ORIGINAL guardado (fallback):', this.tcBaseOriginal);
            }
            
            return fallbackData;
        }
    }

    // Validar cupón de descuento con la nueva API
    async validateCoupon(couponCode) {
        try {
            if (!couponCode || !couponCode.trim()) {
                console.log('🎫 Cupón vacío, restaurando TC base');
                this.tcData = [...this.tcBase];
                return { valid: false, data: this.tcData };
            }

            console.log('🎫 Validando cupón con nueva API:', couponCode);
            
            const response = await axios.get(`${this.baseURL}/getTcCustomerNoAuth`, {
                params: {
                    idParCurrency: this.idParCurrency,
                    codePromo: couponCode
                },
                timeout: 8000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('🎫 Respuesta del cupón:', response.data);
            
            let tcData = null;
            
            // La nueva API devuelve directamente un array
            if (Array.isArray(response.data) && response.data.length > 0) {
                tcData = response.data;
                console.log('✅ Cupón válido, datos recibidos:', tcData);
            } else {
                throw new Error('Cupón no válido o sin datos');
            }
            
            if (tcData && tcData.length > 0) {
                // Mapear el nuevo formato al formato interno
                const processedData = tcData.map(item => ({
                    id: item.idRange,
                    desde: parseFloat(item.tcFrom || 0),
                    hasta: parseFloat(item.tcTo || 999999),
                    tc_compra: parseFloat(item.tcBuy),
                    tc_venta: parseFloat(item.tcSale),
                    // Campos adicionales
                    coupon: item.coupon,
                    amountMinOperation: parseFloat(item.amountMinOperation || 0),
                    amountMaxOperation: parseFloat(item.amountMaxOperation || 0)
                }));
                
                // 🚀 FORZAR ACTUALIZACIÓN INMEDIATA
                this.tcData = processedData;
                console.log('✅ Cupón válido, TC FORZADAMENTE actualizados:', this.tcData);
                console.log('🔍 Verificación: tcData[0]:', this.tcData[0]);
                console.log('🎯 TC Compra ahora es:', this.tcData[0].tc_compra);
                console.log('🎯 TC Venta ahora es:', this.tcData[0].tc_venta);
                
                return { valid: true, data: processedData };
            }
            
            // Si llegamos aquí, el cupón no es válido
            this.tcData = [...this.tcBase];
            console.log('❌ Cupón inválido, usando TC base');
            return { valid: false, data: this.tcData, message: 'El código de promoción no es válido.' };
            
        } catch (error) {
            console.error('❌ Error general en validateCoupon:', error);
            this.tcData = [...this.tcBase];
            return { valid: false, data: this.tcData, message: 'Error al validar el código de promoción.' };
        }
    }

    // Obtener tipo de cambio para un monto específico
    getTCFromAmount(amount, operationType = 'venta') {
        console.log('🎯 getTCFromAmount llamado:', { 
            amount, 
            operationType, 
            tcDataLength: this.tcData.length,
            tcData: this.tcData 
        });
        
        if (!amount || amount <= 0) {
            console.log('⚠️ Monto <= 0, usando primer TC disponible');
            if (this.tcData.length > 0) {
                const obj = this.tcData[0];
                // CORREGIDO: C = cliente tiene USD, quiere PEN (usamos tc_compra), V = cliente tiene PEN, quiere USD (usamos tc_venta)
                const tc = operationType === 'C' ? obj.tc_compra : obj.tc_venta;
                console.log('💱 TC base seleccionado:', { obj, tc, operationType });
                return tc;
            }
            console.log('❌ No hay datos de TC, retornando 0');
            return 0;
        }

        let tcObj = null;
        
        console.log('🔍 Buscando rango para monto:', amount);
        
        // **CONVERSIÓN PARA VENTA**: Si es venta, el monto está en PEN pero los rangos están en USD
        let amountForComparison = amount;
        if (operationType === 'V') {
            // Para VENTA necesitamos convertir el monto PEN a USD para comparar con rangos
            // 🔥 USAMOS EL TC BASE ORIGINAL (el que vino sin cupón) para convertir a USD
            if (!this.tcBaseOriginal) {
                console.error('❌ ERROR: tcBaseOriginal no existe. Debe llamarse getExchangeRates() primero');
                return 0;
            }
            
            const baseTcOriginal = this.tcBaseOriginal.tc_venta; // TC BASE ORIGINAL de la API sin cupón
            amountForComparison = amount / baseTcOriginal;
            console.log('💱 CONVERSIÓN PARA VENTA (TC BASE ORIGINAL):', {
                montoOriginalPEN: amount,
                tcBaseORIGINAL: baseTcOriginal,
                tcBaseOriginalCompleto: this.tcBaseOriginal,
                montoConvertidoUSD: amountForComparison,
                formula: `${amount} ÷ ${baseTcOriginal} = ${amountForComparison}`,
                explicacion: 'Usamos TC base original sin cupón para convertir PEN → USD y comparar rangos'
            });
        }
        
        // Buscar el rango correcto para el monto
        // LÓGICA CORREGIDA: Para evitar superposición en límites exactos
        console.log('🔍 INICIANDO BÚSQUEDA DE RANGO - ESTADO ACTUAL:', {
            totalRangos: this.tcData.length,
            amountForComparison,
            todosLosRangos: this.tcData.map((r, i) => ({
                index: i,
                id: r.id,
                desde: r.desde,
                hasta: r.hasta,
                tc_venta: r.tc_venta,
                tc_compra: r.tc_compra
            }))
        });
        
        for (let obj of this.tcData) {
            console.log('🔎 Verificando rango:', { 
                desde: obj.desde, 
                hasta: obj.hasta, 
                montoComparar: amountForComparison,
                montoOriginal: amount,
                tcCompra: obj.tc_compra,
                tcVenta: obj.tc_venta
            });
            
            // Lógica de rangos sin superposición:
            // CORREGIDO: Todos los rangos incluyen límite inferior, SOLO el último incluye límite superior
            const isLastRange = this.tcData.indexOf(obj) === this.tcData.length - 1;
            const isInRange = isLastRange 
                ? (obj.desde <= amountForComparison && amountForComparison <= obj.hasta)  // Último rango: desde <= amount <= hasta
                : (obj.desde <= amountForComparison && amountForComparison < obj.hasta);   // Otros rangos: desde <= amount < hasta
            
            console.log('🎯 Evaluación rango:', {
                rangoIndex: this.tcData.indexOf(obj),
                totalRangos: this.tcData.length,
                isLastRange,
                condicion: isLastRange ? 'desde <= amount <= hasta' : 'desde <= amount < hasta',
                evaluacion: isLastRange 
                    ? `${obj.desde} <= ${amountForComparison} <= ${obj.hasta}` 
                    : `${obj.desde} <= ${amountForComparison} < ${obj.hasta}`,
                cumple: isInRange,
                explicacion: isLastRange ? 'ÚLTIMO RANGO (incluye ambos límites)' : 'RANGO INTERMEDIO (no incluye límite superior)'
            });
            
            if (isInRange) {
                tcObj = obj;
                console.log('✅ Rango encontrado:', { 
                    rango: tcObj, 
                    isLastRange, 
                    logicaUsada: isLastRange ? 'desde <= amount <= hasta' : 'desde <= amount < hasta'
                });
                break;
            }
        }
        
        // Si no se encuentra en ningún rango, usar el último (mayor rango)
        if (tcObj === null && this.tcData.length > 0) {
            tcObj = this.tcData[this.tcData.length - 1];
            console.log('📊 Usando último rango disponible:', tcObj);
        }
        
        if (tcObj !== null) {
            // VENTA: Cliente envía SOLES, recibe DÓLARES (usamos tc_venta)
            // COMPRA: Cliente envía DÓLARES, recibe SOLES (usamos tc_compra)
            const tc = operationType === 'V' ? tcObj.tc_venta : tcObj.tc_compra;
            console.log('🎯 TC final calculado:', { 
                tc, 
                operationType, 
                rango: tcObj,
                tcVentaDelRango: tcObj.tc_venta,
                tcCompraDelRango: tcObj.tc_compra,
                queTcUsar: operationType === 'V' ? 'tc_venta' : 'tc_compra'
            });
            
            // 🔥 VERIFICACIÓN CRÍTICA: ¿Estamos usando el TC correcto del cupón?
            console.log('🔍 VERIFICACIÓN CRÍTICA TC:', {
                tcSeleccionado: tc,
                deberiaSerCupon: operationType === 'V' ? '3.563' : '3.549',
                diferencia: operationType === 'V' ? Math.abs(tc - 3.563) : Math.abs(tc - 3.549),
                esDelCupon: tcObj.id >= 3750 ? 'SÍ (ID >= 3750)' : 'NO (ID < 3750)',
                idDelRango: tcObj.id
            });
            
            return tc;
        }
        
        console.log('❌ No se encontró TC, retornando 0');
        return 0;
    }

    // Método auxiliar para obtener TC de los datos base cuando el cupón no aplica
    getTCFromBase(amount, operationType = 'venta') {
        console.log('🏦 getTCFromBase llamado:', { amount, operationType });
        
        for (let obj of this.tcBase) {
            if (obj.desde <= amount && amount <= obj.hasta) {
                const tc = operationType === 'V' ? obj.tc_venta : obj.tc_compra;
                console.log('✅ TC base encontrado:', { tc, operationType, rango: obj });
                return tc;
            }
        }
        
        // Si no se encuentra, usar el último rango base
        if (this.tcBase.length > 0) {
            const lastObj = this.tcBase[this.tcBase.length - 1];
            const tc = operationType === 'V' ? lastObj.tc_venta : lastObj.tc_compra;
            console.log('📊 Usando último TC base:', { tc, operationType, rango: lastObj });
            return tc;
        }
        
        return 0;
    }

    // Calcular conversión
    calculateExchange(amount, operationType = 'venta', origin = 'from') {
        console.log('🔢 calculateExchange INICIADO:', { amount, operationType, origin });
        const tc = this.getTCFromAmount(amount, operationType);
        console.log('💱 TC obtenido del getTCFromAmount:', tc);
        let result = 0;

        if (origin === 'from') {
            // Calculando desde el monto origen
            if (operationType === 'V') {
                // VENTA: Cliente envía SOLES, recibe DÓLARES
                // PEN / tc_venta = USD
                result = amount / tc;
                console.log('🔢 CÁLCULO VENTA DETALLADO:', {
                    formula: `${amount} ÷ ${tc}`,
                    calculo: `${amount} / ${tc}`,
                    resultado: result,
                    resultadoRedondeado: parseFloat(result.toFixed(2)),
                    tcUsado: tc,
                    operationType,
                    origin
                });
            } else {
                // COMPRA: Cliente envía DÓLARES, recibe SOLES
                // USD * tc_compra = PEN
                result = amount * tc;
                console.log('🔢 CÁLCULO COMPRA DETALLADO:', {
                    formula: `${amount} × ${tc}`,
                    calculo: `${amount} * ${tc}`,
                    resultado: result,
                    resultadoRedondeado: parseFloat(result.toFixed(2)),
                    tcUsado: tc,
                    operationType,
                    origin
                });
            }
        } else {
            // Calculando desde el monto destino (inverso)
            if (operationType === 'V') {
                // VENTA: Quiere USD, calcula PEN necesarios
                // USD * tc_venta = PEN
                result = amount * tc;
                console.log('🔢 VENTA INVERSO DETALLADO: USD', amount, '* tc_venta', tc, '=', result, 'PEN');
            } else {
                // COMPRA: Quiere PEN, calcula USD necesarios
                // PEN / tc_compra = USD
                result = amount / tc;
                console.log('🔢 COMPRA INVERSO DETALLADO: PEN', amount, '/ tc_compra', tc, '=', result, 'USD');
            }
        }

        const finalResult = {
            result: parseFloat(result.toFixed(2)),
            exchangeRate: tc,
            operation: operationType
        };
        console.log('🎯 RESULTADO FINAL calculateExchange:', finalResult);
        return finalResult;
    }

    // Obtener tasas actuales para mostrar en botones
    getCurrentRates() {
        console.log('📊 getCurrentRates llamado');
        console.log('💾 Estado actual tcData:', this.tcData);
        
        if (this.tcData.length === 0) {
            console.log('⚠️ tcData vacío, retornando valores por defecto');
            return { compra: '3.5330', venta: '3.5650' };  // CORREGIDO: compra = tc_compra (bajo), venta = tc_venta (alto)
        }
        
        const rates = this.tcData[0];
        console.log('🏦 Primer elemento tcData:', rates);
        
        const result = {
            compra: rates.tc_compra.toFixed(4),  // COMPRA: Cliente tiene USD, quiere PEN = nosotros COMPRAMOS USD (tc_compra = precio bajo)
            venta: rates.tc_venta.toFixed(4)     // VENTA: Cliente tiene PEN, quiere USD = nosotros VENDEMOS USD (tc_venta = precio alto)
        };
        
        console.log('✅ Rates calculados:', result);
        return result;
    }

    // Formatear número a string con 2 decimales
    formatNumberToString(num) {
        console.log('📝 formatNumberToString llamado:', { input: num, type: typeof num });
        if (!num || isNaN(num)) {
            console.log('📝 Input inválido, retornando string vacío');
            return '';
        }
        const result = num.toFixed(2);
        console.log('📝 Resultado formatNumberToString:', { input: num, result });
        return result;
    }

    // Formatear string a número
    formatStringToNumber(str) {
        console.log('🔢 formatStringToNumber llamado:', { input: str, type: typeof str });
        if (!str) {
            console.log('🔢 Input vacío, retornando 0');
            return 0;
        }
        const result = parseFloat(str.toString().replace(/,/g, '')) || 0;
        console.log('🔢 Resultado formatStringToNumber:', { input: str, result });
        return result;
    }

    // Inicializar operación
    async initializeOperation(operationData) {
        try {
            // En producción, esto podría crear una pre-orden o sesión
            // const response = await axios.post(`${this.baseURL}/operations/initialize`, operationData);
            
            console.log('Initializing operation with data:', operationData);
            
            // Por ahora solo redirigimos al login
            const url = 'https://mi.cambiafx.pe/login';
            window.location.href = url;
            
            return { success: true, redirectUrl: url };
        } catch (error) {
            console.error('Error initializing operation:', error);
            throw error;
        }
    }

    // Detectar cupón de URL
    checkUrlCoupon() {
        const urlParams = new URLSearchParams(window.location.search);
        const couponCode = urlParams.get('utm_campaign');
        
        return couponCode;
    }
}

// Exportar instancia singleton
// Crear instancia única (singleton)
const cambiaFXServiceInstance = new CambiaFXService();

export default cambiaFXServiceInstance;
