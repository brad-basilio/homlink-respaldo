import axios from 'axios';

class CambiaFXService {
    constructor() {
        this.baseURL = 'https://apiluna.cambiafx.pe/api/BackendPizarra';
        this.localAPI = '/api';
        this.tcData = [];
        this.tcBase = [];
        this.tcBaseOriginal = null;
        this.idParCurrency = 1;
    }

    async getExchangeRates() {
        try {
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
            
            let realTimeData = [];
            
            if (Array.isArray(response.data)) {
                realTimeData = response.data;
            } else {
                throw new Error('Formato de respuesta inesperado: ' + JSON.stringify(response.data));
            }
            
            if (realTimeData.length === 0) {
                throw new Error('No se obtuvieron datos de tipos de cambio');
            }
            
            const processedData = realTimeData.map(item => ({
                id: item.idRange || 0,
                desde: parseFloat(item.tcFrom || 0),
                hasta: parseFloat(item.tcTo || 999999),
                tc_compra: parseFloat(item.tcBuy || 0),
                tc_venta: parseFloat(item.tcSale || 0),
                coupon: item.coupon,
                amountMinOperation: parseFloat(item.amountMinOperation || 0),
                amountMaxOperation: parseFloat(item.amountMaxOperation || 0)
            }));
            
            this.tcBase = processedData;
            this.tcData = [...processedData];
            
            if (processedData.length > 0) {
                this.tcBaseOriginal = {
                    tc_compra: processedData[0].tc_compra,
                    tc_venta: processedData[0].tc_venta
                };
            }
            
            return processedData;
            
        } catch (error) {
            const fallbackData = [
                { id: 1, desde: 0, hasta: 1000, tc_compra: 3.5330, tc_venta: 3.5650 },
                { id: 2, desde: 1001, hasta: 5000, tc_compra: 3.5340, tc_venta: 3.5660 },
                { id: 3, desde: 5001, hasta: 10000, tc_compra: 3.5350, tc_venta: 3.5670 },
                { id: 4, desde: 10001, hasta: 999999, tc_compra: 3.5360, tc_venta: 3.5680 }
            ];
            
            this.tcBase = fallbackData;
            this.tcData = [...fallbackData];
            
            if (fallbackData.length > 0) {
                this.tcBaseOriginal = {
                    tc_compra: fallbackData[0].tc_compra,
                    tc_venta: fallbackData[0].tc_venta
                };
            }
            
            return fallbackData;
        }
    }

    async validateCoupon(couponCode) {
        try {
            if (!couponCode || !couponCode.trim()) {
                this.tcData = [...this.tcBase];
                return { valid: false, data: this.tcData };
            }

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
            
            let tcData = null;
            
            if (Array.isArray(response.data) && response.data.length > 0) {
                tcData = response.data;
            } else {
                throw new Error('Cupón no válido o sin datos');
            }
            
            if (tcData && tcData.length > 0) {
                const processedData = tcData.map(item => ({
                    id: item.idRange,
                    desde: parseFloat(item.tcFrom || 0),
                    hasta: parseFloat(item.tcTo || 999999),
                    tc_compra: parseFloat(item.tcBuy),
                    tc_venta: parseFloat(item.tcSale),
                    coupon: item.coupon,
                    amountMinOperation: parseFloat(item.amountMinOperation || 0),
                    amountMaxOperation: parseFloat(item.amountMaxOperation || 0)
                }));
                
                // ✅ ACTUALIZAMOS los datos con el cupón para que se use en los cálculos
                this.tcData = processedData;
                console.log(`🎫 Cupón aplicado: ${couponCode}`, processedData);
                
                return { valid: true, data: processedData };
            }
            
            this.tcData = [...this.tcBase];
            return { valid: false, data: this.tcData, message: 'El código de promoción no es válido.' };
            
        } catch (error) {
            this.tcData = [...this.tcBase];
            return { valid: false, data: this.tcData, message: 'Error al validar el código de promoción.' };
        }
    }

    // El método getTCFromAmount() se ha reemplazado por la versión actualizada más abajo

    getTCFromBase(amount, operationType = 'venta') {
        for (let obj of this.tcBase) {
            if (obj.desde <= amount && amount <= obj.hasta) {
                const tc = operationType === 'V' ? obj.tc_venta : obj.tc_compra;
                return tc;
            }
        }
        
        if (this.tcBase.length > 0) {
            const lastObj = this.tcBase[this.tcBase.length - 1];
            const tc = operationType === 'V' ? lastObj.tc_venta : lastObj.tc_compra;
            return tc;
        }
        
        return 0;
    }

    calculateExchange(amount, operationType = 'venta', origin = 'from') {
        // 📊 LÓGICA SEGÚN LA CAPTURA EXACTAMENTE
        
        // Determinar qué moneda está siendo ingresada basado en la operación y el origen
        let inputCurrency = 'USD';
        
        if (operationType === 'V') { // VENTA - Cliente tiene Soles, quiere Dólares
            if (origin === 'from') {
                // Input principal: Soles (lo normal en venta)
                inputCurrency = 'PEN';
            } else {
                // Input secundario: Dólares (el cliente prueba con USD para ver cuántos soles necesita)
                inputCurrency = 'USD';
            }
        } else { // COMPRA - Cliente tiene Dólares, quiere Soles
            if (origin === 'from') {
                // Input principal: Dólares (lo normal en compra)
                inputCurrency = 'USD';
            } else {
                // Input secundario: Soles (el cliente prueba con PEN para ver cuántos dólares obtiene)
                inputCurrency = 'PEN';
            }
        }
        
        // Obtener el TC correcto según el RANGO en USD al que corresponde el monto
        const tc = this.getTCFromAmount(amount, operationType, inputCurrency);
        
        // Debug para verificar valores
        console.log(`Calculando: ${amount} ${inputCurrency} con TC ${tc} (${operationType})`);
        
        let result = 0;
        
        // Aplicar cálculos según la tabla de la captura:
        if (inputCurrency === 'USD') {
            // Si el input es USD, multiplicar por el TC para obtener PEN
            result = amount * tc;
        } else { // inputCurrency === 'PEN'
            // Si el input es PEN, dividir por el TC para obtener USD
            result = amount / tc;
        }
        
        // Asegurar la precisión exacta para evitar errores de punto flotante
        // Redondear a 2 decimales para montos
        result = Math.round(result * 100) / 100;

        const finalResult = {
            result: parseFloat(result.toFixed(2)),
            exchangeRate: tc,
            operation: operationType
        };
        return finalResult;
    }

    getTCFromAmount(amount, operationType = 'venta', currency = 'USD') {
        if (!amount || amount <= 0) {
            if (this.tcData.length > 0) {
                const obj = this.tcData[0];
                const tc = operationType === 'C' ? obj.tc_compra : obj.tc_venta;
                return tc;
            }
            return 0;
        }

        let tcObj = null;
        let amountForComparison = amount;
        
        // � IMPLEMENTACIÓN SEGÚN LA CAPTURA - LÓGICA EXACTA
        // Los rangos SIEMPRE están definidos en DÓLARES
        // Si la moneda de entrada es PEN, debemos convertir a USD para determinar el rango
        if (currency === 'PEN') {
            // Usar TC base para convertir PEN → USD y encontrar el rango correcto
            // Este TC es siempre el del primer rango disponible
            const baseObj = this.tcBaseOriginal || (this.tcData.length > 0 ? this.tcData[0] : null);
            if (!baseObj) return 0;
            
            // Usar el TC base del tipo de operación correspondiente
            const baseTc = operationType === 'C' ? baseObj.tc_compra : baseObj.tc_venta;
            
            // Convertir PEN → USD usando TC base
            amountForComparison = amount / baseTc;
        }
        
        // Buscar el rango correspondiente (siempre evaluando en USD)
        console.log(`🔍 Buscando rango para ${amountForComparison} USD en:`, this.tcData.map(obj => `${obj.desde}-${obj.hasta} (TC: ${operationType === 'C' ? obj.tc_compra : obj.tc_venta})`));
        
        for (let obj of this.tcData) {
            // 🎯 LÓGICA CORREGIDA PARA RANGOS:
            // - Si hay múltiples rangos: primeros rangos usan "desde <= x < hasta", último rango usa "desde <= x <= hasta"
            // - Si hay un solo rango: usa "desde <= x <= hasta"
            const isLastRange = this.tcData.indexOf(obj) === this.tcData.length - 1;
            const hasMultipleRanges = this.tcData.length > 1;
            
            let isInRange;
            if (hasMultipleRanges && !isLastRange) {
                // Múltiples rangos - rangos intermedios: desde <= x < hasta
                isInRange = (obj.desde <= amountForComparison && amountForComparison < obj.hasta);
            } else {
                // Último rango de múltiples O un solo rango: desde <= x <= hasta
                isInRange = (obj.desde >= amountForComparison && amountForComparison <= obj.hasta);
            }
            
            console.log(`📋 Evaluando rango ${obj.desde}-${obj.hasta}: ${amountForComparison} está en rango = ${isInRange} (${hasMultipleRanges ? (isLastRange ? 'último rango' : 'rango intermedio') : 'rango único'}) (TC: ${operationType === 'C' ? obj.tc_compra : obj.tc_venta})`);
            
            if (isInRange) {
                tcObj = obj;
                break;
            }
        }
        
        if (tcObj === null && this.tcData.length > 0) {
            tcObj = this.tcData[this.tcData.length - 1];
            console.log(`⚠️ No se encontró rango, usando último: ${tcObj.desde}-${tcObj.hasta}`);
        }
        
        if (tcObj !== null) {
            // Determinar TC según operación (Compra o Venta)
            const tc = operationType === 'V' ? tcObj.tc_venta : tcObj.tc_compra;
            
            console.log(`✅ TC seleccionado del rango ${tcObj.desde}-${tcObj.hasta}: ${tc} (${operationType})`);
            
            // Para evitar problemas con decimales, devolver el valor exacto del objeto
            // sin manipulación adicional
            return tc;
        }
        
        return 0;
    }

    getCurrentRates() {
        if (this.tcData.length === 0) {
            return { compra: '3.5330', venta: '3.5650' };
        }
        
        const rates = this.tcData[0];
        
        const result = {
            compra: rates.tc_compra.toFixed(4),
            venta: rates.tc_venta.toFixed(4)
        };
        
        return result;
    }

    formatNumberToString(num) {
        if (!num || isNaN(num)) {
            return '';
        }
        const result = num.toFixed(2);
        return result;
    }

    formatStringToNumber(str) {
        if (!str) {
            return 0;
        }
        const result = parseFloat(str.toString().replace(/,/g, '')) || 0;
        return result;
    }

    async initializeOperation(operationData) {
        try {
            const url = 'https://mi.cambiafx.pe/login';
            window.location.href = url;
            
            return { success: true, redirectUrl: url };
        } catch (error) {
            throw error;
        }
    }

    checkUrlCoupon() {
        const urlParams = new URLSearchParams(window.location.search);
        const couponCode = urlParams.get('utm_campaign');
        
        return couponCode;
    }
}

const cambiaFXServiceInstance = new CambiaFXService();

export default cambiaFXServiceInstance;
