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
                
                this.tcData = processedData;
                
                return { valid: true, data: processedData };
            }
            
            this.tcData = [...this.tcBase];
            return { valid: false, data: this.tcData, message: 'El código de promoción no es válido.' };
            
        } catch (error) {
            this.tcData = [...this.tcBase];
            return { valid: false, data: this.tcData, message: 'Error al validar el código de promoción.' };
        }
    }

    getTCFromAmount(amount, operationType = 'venta') {
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
        if (operationType === 'V') {
            if (!this.tcBaseOriginal) {
                return 0;
            }
            
            const baseTcOriginal = this.tcBaseOriginal.tc_venta;
            amountForComparison = amount / baseTcOriginal;
        }
        
        for (let obj of this.tcData) {
            const isLastRange = this.tcData.indexOf(obj) === this.tcData.length - 1;
            const isInRange = isLastRange 
                ? (obj.desde <= amountForComparison && amountForComparison <= obj.hasta)
                : (obj.desde <= amountForComparison && amountForComparison < obj.hasta);
            
            if (isInRange) {
                tcObj = obj;
                break;
            }
        }
        
        if (tcObj === null && this.tcData.length > 0) {
            tcObj = this.tcData[this.tcData.length - 1];
        }
        
        if (tcObj !== null) {
            const tc = operationType === 'V' ? tcObj.tc_venta : tcObj.tc_compra;
            return tc;
        }
        
        return 0;
    }

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
        // ✅ LÓGICA CORREGIDA PARA MANEJAR FLUJO BIDIRECCIONAL
        
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
        
        // Obtener el TC correcto basado en la moneda de entrada
        const tc = this.getTCFromAmount(amount, operationType, inputCurrency);
        let result = 0;
        
        if (inputCurrency === 'USD') {
            if (operationType === 'V') {
                // VENTA: USD ingresado → calcular PEN necesarios
                result = amount * tc; // USD × tc_venta = PEN
            } else {
                // COMPRA: USD ingresado → calcular PEN que se obtienen  
                result = amount * tc; // USD × tc_compra = PEN
            }
        } else { // inputCurrency === 'PEN'
            if (operationType === 'V') {
                // VENTA: PEN ingresado → calcular USD que se obtienen
                result = amount / tc; // PEN ÷ tc_venta = USD
            } else {
                // COMPRA: PEN ingresado → calcular USD necesarios
                result = amount / tc; // PEN ÷ tc_compra = USD
            }
        }

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
        
        // Si la moneda es PEN, convertir a USD para encontrar el rango
        if (currency === 'PEN') {
            const baseTc = this.tcData[0] ? (operationType === 'V' ? this.tcData[0].tc_venta : this.tcData[0].tc_compra) : 3.55;
            amountForComparison = amount / baseTc;
        }
        // Si es USD, usar directamente
        
        // Buscar el rango correspondiente (siempre en USD)
        for (let obj of this.tcData) {
            const isLastRange = this.tcData.indexOf(obj) === this.tcData.length - 1;
            const isInRange = isLastRange 
                ? (obj.desde <= amountForComparison && amountForComparison <= obj.hasta)
                : (obj.desde <= amountForComparison && amountForComparison < obj.hasta);
            
            if (isInRange) {
                tcObj = obj;
                break;
            }
        }
        
        if (tcObj === null && this.tcData.length > 0) {
            tcObj = this.tcData[this.tcData.length - 1];
        }
        
        if (tcObj !== null) {
            const tc = operationType === 'V' ? tcObj.tc_venta : tcObj.tc_compra;
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
