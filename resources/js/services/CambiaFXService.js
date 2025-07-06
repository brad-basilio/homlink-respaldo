import axios from 'axios';

class CambiaFXService {
    constructor() {
        this.baseURL = 'https://cambiafx.pe/api';
        this.tcData = [];
        this.tcBase = [];
    }

    // Obtener tipos de cambio reales de la API de CambiaFX
    async getExchangeRates() {
        try {
            console.log('🔧 CambiaFXService.getExchangeRates() iniciado - CONECTANDO A API REAL');
            
            // Conectar con la API real de CambiaFX
            const response = await axios.get(`${this.baseURL}/tc`);
            console.log('📡 Respuesta de API real:', response.data);
            
            if (response.data && response.data.length > 0) {
                // Usar datos reales de la API
                const realData = response.data;
                console.log('✅ Datos reales de CambiaFX cargados:', realData);
                
                this.tcBase = realData;
                this.tcData = [...realData];
                
                console.log('✅ TC Data asignado (REAL):', {
                    tcBase: this.tcBase,
                    tcData: this.tcData
                });
                
                return realData;
            } else {
                throw new Error('No se recibieron datos de la API');
            }
        } catch (error) {
            console.error('❌ Error conectando con API real, usando datos de respaldo:', error);
            
            // Fallback a datos simulados si la API falla
            // Nota: tc_compra es el precio al que NOSOTROS compramos USD (cliente vende = precio más bajo)
            // tc_venta es el precio al que NOSOTROS vendemos USD (cliente compra = precio más alto)
            const fallbackData = [
                { id: 1, desde: 0, hasta: 1000, tc_compra: 3.5330, tc_venta: 3.5650 },
                { id: 2, desde: 1001, hasta: 5000, tc_compra: 3.5340, tc_venta: 3.5660 },
                { id: 3, desde: 5001, hasta: 10000, tc_compra: 3.5350, tc_venta: 3.5670 },
                { id: 4, desde: 10001, hasta: 999999, tc_compra: 3.5360, tc_venta: 3.5680 }
            ];
            
            console.log('📊 Usando datos de respaldo:', fallbackData);
            this.tcBase = fallbackData;
            this.tcData = [...fallbackData];
            
            return fallbackData;
        }
    }

    // Validar cupón de descuento
    async validateCoupon(couponCode) {
        try {
            if (!couponCode || !couponCode.trim()) {
                this.tcData = [...this.tcBase];
                return { valid: false, data: this.tcData };
            }

            const response = await axios.get(`${this.baseURL}/cupon/${couponCode}`);
            
            if (response.data && Array.isArray(response.data)) {
                this.tcData = response.data;
                return { valid: true, data: response.data };
            } else {
                this.tcData = [...this.tcBase];
                return { valid: false, data: this.tcData, message: 'El código de promoción no es válido.' };
            }
        } catch (error) {
            console.error('Error validating coupon:', error);
            this.tcData = [...this.tcBase];
            return { valid: false, data: this.tcData, message: 'El código de promoción no es válido.' };
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
                // Corregir lógica: C = cliente compra USD (usamos tc_venta), V = cliente vende USD (usamos tc_compra)
                const tc = operationType === 'C' ? obj.tc_venta : obj.tc_compra;
                console.log('💱 TC base seleccionado:', { obj, tc, operationType });
                return tc;
            }
            console.log('❌ No hay datos de TC, retornando 0');
            return 0;
        }

        let tcObj = null;
        
        console.log('🔍 Buscando rango para monto:', amount);
        // Buscar el rango correcto para el monto
        for (let obj of this.tcData) {
            console.log('🔎 Verificando rango:', { desde: obj.desde, hasta: obj.hasta, monto: amount });
            if (obj.desde <= amount && amount <= obj.hasta) {
                tcObj = obj;
                console.log('✅ Rango encontrado:', tcObj);
                break;
            }
        }
        
        // Si no se encuentra en ningún rango, usar el último (mayor rango)
        if (tcObj === null && this.tcData.length > 0) {
            tcObj = this.tcData[this.tcData.length - 1];
            console.log('📊 Usando último rango disponible:', tcObj);
        }
        
        if (tcObj !== null) {
            // Corregir lógica: C = cliente compra USD (usamos tc_venta), V = cliente vende USD (usamos tc_compra)
            const tc = operationType === 'C' ? tcObj.tc_venta : tcObj.tc_compra;
            console.log('🎯 TC final calculado:', { tc, operationType, rango: tcObj });
            return tc;
        }
        
        console.log('❌ No se encontró TC, retornando 0');
        return 0;
    }

    // Calcular conversión
    calculateExchange(amount, operationType = 'venta', origin = 'from') {
        console.log('Calculando cambio:', { amount, operationType, origin });
        const tc = this.getTCFromAmount(amount, operationType);
        console.log('TC obtenido:', tc);
        let result = 0;

        if (origin === 'from') {
            // Calculando desde el monto origen
            if (operationType === 'C') {
                // Cliente COMPRA USD: Pone PEN, recibe USD
                // PEN / tc_venta = USD
                result = amount / tc;
                console.log('Cliente Compra USD: PEN', amount, '/ tc_venta', tc, '=', result, 'USD');
            } else {
                // Cliente VENDE USD: Pone USD, recibe PEN  
                // USD * tc_compra = PEN
                result = amount * tc;
                console.log('Cliente Vende USD: USD', amount, '* tc_compra', tc, '=', result, 'PEN');
            }
        } else {
            // Calculando desde el monto destino (inverso)
            if (operationType === 'C') {
                // Cliente COMPRA USD: Quiere USD, calcula PEN necesarios
                // USD * tc_venta = PEN
                result = amount * tc;
                console.log('Cliente Compra USD inverso: USD', amount, '* tc_venta', tc, '=', result, 'PEN');
            } else {
                // Cliente VENDE USD: Quiere PEN, calcula USD necesarios
                // PEN / tc_compra = USD
                result = amount / tc;
                console.log('Cliente Vende USD inverso: PEN', amount, '/ tc_compra', tc, '=', result, 'USD');
            }
        }

        const finalResult = {
            result: parseFloat(result.toFixed(2)),
            exchangeRate: tc,
            operation: operationType
        };
        console.log('Resultado final:', finalResult);
        return finalResult;
    }

    // Obtener tasas actuales para mostrar en botones
    getCurrentRates() {
        console.log('📊 getCurrentRates llamado');
        console.log('💾 Estado actual tcData:', this.tcData);
        
        if (this.tcData.length === 0) {
            console.log('⚠️ tcData vacío, retornando valores por defecto');
            return { compra: '3.5650', venta: '3.5330' };  // compra = tc_venta (alto), venta = tc_compra (bajo)
        }
        
        const rates = this.tcData[0];
        console.log('🏦 Primer elemento tcData:', rates);
        
        const result = {
            compra: rates.tc_venta.toFixed(4),  // Cliente COMPRA USD = nosotros VENDEMOS USD (tc_venta = precio alto)
            venta: rates.tc_compra.toFixed(4)   // Cliente VENDE USD = nosotros COMPRAMOS USD (tc_compra = precio bajo)
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
