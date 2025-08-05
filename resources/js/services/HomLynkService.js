import axios from 'axios';

class HomLynkService {
    constructor() {
        this.baseURL = '/api';
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
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (response.data && response.data.status === "ok") {
                this.tcData = response.data.data || [];
                // Guardar en localStorage para cache
                localStorage.setItem('homlynk_exchange_cache', JSON.stringify({
                    data: this.tcData,
                    timestamp: Date.now()
                }));
                return this.tcData;
            } else {
                console.error('Error en respuesta de API:', response.data);
                throw new Error('Respuesta de API inválida');
            }
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            
            // Intentar obtener datos del cache
            const cachedData = localStorage.getItem('homlynk_exchange_cache');
            if (cachedData) {
                const parsed = JSON.parse(cachedData);
                // Si el cache es menor a 1 hora, usarlo
                if (Date.now() - parsed.timestamp < 3600000) {
                    console.log('Usando datos de cache');
                    this.tcData = parsed.data;
                    return this.tcData;
                }
            }
            
            throw error;
        }
    }

    // Obtener solo tipos de cambio para monedas específicas
    async getExchangeRatesForCurrency(baseCurrency = 'PEN', targetCurrency = 'USD') {
        try {
            const data = await this.getExchangeRates();
            
            // Buscar el tipo de cambio específico
            const exchangeRate = data.find(item => 
                (item.base_currency === baseCurrency && item.target_currency === targetCurrency) ||
                (item.base_currency === targetCurrency && item.target_currency === baseCurrency)
            );

            if (exchangeRate) {
                return {
                    buy: parseFloat(exchangeRate.buy_rate || exchangeRate.compra || 0),
                    sell: parseFloat(exchangeRate.sell_rate || exchangeRate.venta || 0),
                    baseCurrency: exchangeRate.base_currency || baseCurrency,
                    targetCurrency: exchangeRate.target_currency || targetCurrency,
                    lastUpdate: exchangeRate.updated_at || new Date().toISOString()
                };
            }

            // Si no se encuentra el par específico, retornar valores por defecto
            return {
                buy: 3.75,
                sell: 3.85,
                baseCurrency,
                targetCurrency,
                lastUpdate: new Date().toISOString()
            };

        } catch (error) {
            console.error('Error getting exchange rates for currency:', error);
            // Retornar valores por defecto en caso de error
            return {
                buy: 3.75,
                sell: 3.85,
                baseCurrency,
                targetCurrency,
                lastUpdate: new Date().toISOString()
            };
        }
    }

    // Obtener tipo de cambio base desde la API
    async getTcBase() {
        try {
            const response = await axios.get(`${this.baseURL}/getTcBase`, {
                timeout: 5000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.status === "ok") {
                this.tcBase = response.data.data || [];
                this.tcBaseOriginal = response.data.data?.[0] || null;
                return this.tcBase;
            } else {
                throw new Error('Invalid API response for getTcBase');
            }
        } catch (error) {
            console.error('Error fetching getTcBase:', error);
            
            // Valores por defecto si falla la API
            this.tcBase = [{
                compra: 3.75,
                venta: 3.85,
                fecha: new Date().toISOString().split('T')[0]
            }];
            this.tcBaseOriginal = this.tcBase[0];
            return this.tcBase;
        }
    }

    // Obtener rango de tipos de cambio para PEN
    async getTcRangePEN(amount) {
        try {
            const response = await axios.get(`${this.baseURL}/getTcRangePEN`, {
                params: { amount: amount },
                timeout: 5000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.status === "ok") {
                return response.data.data || {};
            } else {
                throw new Error('Invalid API response for getTcRangePEN');
            }
        } catch (error) {
            console.error('Error fetching getTcRangePEN:', error);
            
            // Retornar valores por defecto
            return {
                compra: 3.75,
                venta: 3.85,
                range: 'default'
            };
        }
    }

    // Obtener rango de tipos de cambio para USD
    async getTcRangeUSD(amount) {
        try {
            const response = await axios.get(`${this.baseURL}/getTcRangeUSD`, {
                params: { amount: amount },
                timeout: 5000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.status === "ok") {
                return response.data.data || {};
            } else {
                throw new Error('Invalid API response for getTcRangeUSD');
            }
        } catch (error) {
            console.error('Error fetching getTcRangeUSD:', error);
            
            // Retornar valores por defecto
            return {
                compra: 3.75,
                venta: 3.85,
                range: 'default'
            };
        }
    }

    // 🧮 MÉTODO CALCULATEEXCHANGE SEGÚN DOCUMENTACIÓN HOMLYNK
    async calculateExchange(amount, fromCurrency, toCurrency, operationType = 'buy') {
        try {
            console.log(`💰 Calculando intercambio: ${amount} ${fromCurrency} → ${toCurrency} (${operationType})`);
            
            // Paso 2: Calcular el monto convertido según documentación homLynk
            const fromAmount = parseFloat(amount);
            if (isNaN(fromAmount) || fromAmount <= 0) {
                throw new Error('Monto inválido');
            }

            // Obtener tipos de cambio actuales
            const rates = await this.getExchangeRatesForCurrency(fromCurrency, toCurrency);
            
            let exchangeRate;
            if (operationType === 'buy') {
                exchangeRate = rates.buy;
            } else {
                exchangeRate = rates.sell;
            }

            let convertedAmount;
            if (fromCurrency === 'PEN' && toCurrency === 'USD') {
                // PEN a USD: dividir entre la tasa
                convertedAmount = fromAmount / exchangeRate;
            } else if (fromCurrency === 'USD' && toCurrency === 'PEN') {
                // USD a PEN: multiplicar por la tasa
                convertedAmount = fromAmount * exchangeRate;
            } else {
                // Para otras monedas, usar lógica similar
                convertedAmount = fromAmount / exchangeRate;
            }

            return {
                fromAmount: fromAmount,
                fromCurrency: fromCurrency,
                toAmount: Math.round(convertedAmount * 100) / 100, // Redondear a 2 decimales
                toCurrency: toCurrency,
                exchangeRate: exchangeRate,
                operationType: operationType,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Error in calculateExchange:', error);
            throw error;
        }
    }

    // 🧠 IMPLEMENTACIÓN SEGÚN DOCUMENTACIÓN HOMLYNK - MÉTODO PRINCIPAL
    async getExchangeCalculation(montoIngresado, monedaOrigen = 'PEN', monedaDestino = 'USD') {
        try {
            console.log(`🔄 homLynk Exchange Calculation: ${montoIngresado} ${monedaOrigen} → ${monedaDestino}`);
            
            const monto = parseFloat(montoIngresado);
            if (isNaN(monto) || monto <= 0) {
                throw new Error('Monto debe ser un número positivo');
            }

            // 🎯 Obtener tipos de cambio desde la API
            await this.getTcBase();

            let tcData;
            let tipoOperacion = 'compra'; // Por defecto

            if (monedaOrigen === 'PEN') {
                // Vendemos soles (cliente compra dólares)
                tipoOperacion = 'venta';
            } else if (monedaOrigen === 'USD') {
                // Vendemos dólares (cliente compra soles)
                tipoOperacion = 'compra';
            }

            // 💰 ¿El monto ingresado está en Soles? (según documentación homLynk)
            if (monedaOrigen === 'PEN') {
                console.log('🔸 Procesando monto en Soles...');
                
                // Verificar si el monto está en el rango válido
                if (monto < 200) {
                    throw new Error('El monto mínimo es S/ 200');
                }
                
                // 🔸 Para montos en Soles: getTcRangePEN (según documentación homLynk)
                tcData = await this.getTcRangePEN(monto);
                
                // Calcular dólares que recibirá
                const dolares = monto / tcData.venta;
                
                return {
                    montoIngresado: monto,
                    monedaIngresada: 'PEN',
                    montoCalculado: Math.round(dolares * 100) / 100,
                    monedaCalculada: 'USD',
                    tipoCambio: tcData.venta,
                    tipoOperacion: 'venta',
                    mensaje: `Recibirás $${Math.round(dolares * 100) / 100} USD por S/ ${monto}`
                };
                
            } else if (monedaOrigen === 'USD') {
                console.log('🔹 Procesando monto en Dólares...');
                
                // Verificar si el monto está en el rango válido
                if (monto < 50) {
                    throw new Error('El monto mínimo es $50 USD');
                }
                
                // 🔹 Para montos en Dólares: getTcRangeUSD (según documentación homLynk)
                tcData = await this.getTcRangeUSD(monto);
                
                // Calcular soles que recibirá
                const soles = monto * tcData.compra;
                
                return {
                    montoIngresado: monto,
                    monedaIngresada: 'USD',
                    montoCalculado: Math.round(soles * 100) / 100,
                    monedaCalculada: 'PEN',
                    tipoCambio: tcData.compra,
                    tipoOperacion: 'compra',
                    mensaje: `Recibirás S/ ${Math.round(soles * 100) / 100} por $${monto} USD`
                };
            }

        } catch (error) {
            console.error('❌ Error en getExchangeCalculation:', error);
            throw error;
        }
    }

    // Método auxiliar para formatear moneda
    formatCurrency(amount, currency = 'PEN') {
        const symbols = {
            'PEN': 'S/ ',
            'USD': '$ ',
            'EUR': '€ ',
            'GBP': '£ '
        };
        
        const symbol = symbols[currency] || '';
        return symbol + parseFloat(amount).toFixed(2);
    }

    // Método para verificar si el servicio está disponible
    async isServiceAvailable() {
        try {
            const response = await axios.get(`${this.baseURL}/health`, {
                timeout: 3000
            });
            return response.status === 200;
        } catch (error) {
            console.error('Service health check failed:', error);
            return false;
        }
    }

    // Limpiar cache
    clearCache() {
        localStorage.removeItem('homlynk_exchange_cache');
        this.tcData = [];
        this.tcBase = [];
        this.tcBaseOriginal = null;
    }
}

// Crear instancia única del servicio
const homLynkServiceInstance = new HomLynkService();

export default homLynkServiceInstance;
