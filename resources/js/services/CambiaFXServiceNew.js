import axios from 'axios';

class CambiaFXService {
    constructor() {
        this.apiURL = 'https://cambiafx.pe/api/tc';
        this.fallbackURL = 'https://cambiafx.pe/api'; // URL de respaldo del servicio original
        this.rates = {
            compra: 3.533, // Valores por defecto basados en la imagen del usuario
            venta: 3.565
        };
        this.lastUpdate = null;
        this.isLoading = false;
    }

    // Obtener tipos de cambio desde la API real de CambiaFX
    async fetchRealRates() {
        try {
            const response = await axios.get(this.apiURL, {
                timeout: 8000,
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });
            
            // Procesar respuesta según el formato de la API
            if (response.data) {
                let compra, venta;
                
                // Intentar diferentes formatos de respuesta
                if (response.data.compra && response.data.venta) {
                    compra = parseFloat(response.data.compra);
                    venta = parseFloat(response.data.venta);
                } else if (response.data.buy && response.data.sell) {
                    compra = parseFloat(response.data.buy);
                    venta = parseFloat(response.data.sell);
                } else if (response.data.data) {
                    compra = parseFloat(response.data.data.compra || response.data.data.buy);
                    venta = parseFloat(response.data.data.venta || response.data.data.sell);
                } else if (Array.isArray(response.data) && response.data.length > 0) {
                    // Formato de array, tomar el primer elemento
                    const firstRate = response.data[0];
                    compra = parseFloat(firstRate.tc_compra || firstRate.compra);
                    venta = parseFloat(firstRate.tc_venta || firstRate.venta);
                }
                
                if (compra && venta && !isNaN(compra) && !isNaN(venta)) {
                    this.rates = { compra, venta };
                    this.lastUpdate = new Date();
                    return { success: true, rates: this.rates };
                }
            }
            
            throw new Error('Formato de respuesta no reconocido');
            
        } catch (error) {
            return await this.fetchFallbackRates();
        }
    }

    // Usar API de respaldo del proyecto original
    async fetchFallbackRates() {
        try {
            const response = await axios.get(`${this.fallbackURL}/tc`, {
                timeout: 5000
            });
            
            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                const rates = response.data[0];
                this.rates = {
                    compra: parseFloat(rates.tc_compra),
                    venta: parseFloat(rates.tc_venta)
                };
                this.lastUpdate = new Date();
                return { success: true, rates: this.rates };
            }
            
            throw new Error('API de respaldo no disponible');
            
        } catch (error) {
            return { success: false, rates: this.rates, error: error.message };
        }
    }

    // Obtener tipos de cambio (método principal)
    async getExchangeRates() {
        if (this.isLoading) {
            return { success: true, rates: this.rates };
        }
        
        this.isLoading = true;
        
        try {
            const result = await this.fetchRealRates();
            return result;
        } finally {
            this.isLoading = false;
        }
    }

    // Obtener tasas actuales para mostrar en la UI
    getCurrentRates() {
        return {
            compra: this.rates.compra.toFixed(4),
            venta: this.rates.venta.toFixed(4)
        };
    }

    // Calcular tipo de cambio según el monto
    getTCFromAmount(amount, operationType) {
        const numAmount = parseFloat(amount) || 0;
        
        // Para montos pequeños, usar la tasa base
        // Para montos grandes, se podría aplicar un mejor tipo de cambio
        let rate;
        if (operationType === 'C') {
            rate = this.rates.compra;
        } else {
            rate = this.rates.venta;
        }
        
        // Aplicar mejoras por volumen (opcional)
        if (numAmount > 10000) {
            rate += (operationType === 'C' ? 0.001 : -0.001);
        }
        
        return rate;
    }

    // Realizar cálculo de conversión
    async calculateExchange(amount1, operationType, inputValue = null) {
        try {
            
            const amountToCalculate = inputValue !== null ? inputValue : amount1;
            const numAmount = parseFloat(amountToCalculate) || 0;
            
            if (numAmount === 0) {
                return {
                    amount1: '0',
                    amount2: '0.00',
                    tc: this.getTCFromAmount(1, operationType),
                    rates: this.getCurrentRates()
                };
            }
            
            const tc = this.getTCFromAmount(numAmount, operationType);
            let result2;
            
            if (operationType === 'C') {
                // Comprar dólares: soles / tc = dólares
                result2 = numAmount / tc;
            } else {
                // Vender dólares: dólares * tc = soles
                result2 = numAmount * tc;
            }
            
            const finalResult = {
                amount1: amountToCalculate.toString(),
                amount2: result2.toFixed(2),
                tc: tc,
                rates: this.getCurrentRates()
            };
            
            return finalResult;
            
        } catch (error) {
            return {
                amount1: '0',
                amount2: '0.00',
                tc: this.rates.venta,
                rates: this.getCurrentRates()
            };
        }
    }

    // Utilidades de formato
    formatStringToNumber(str) {
        if (!str) return 0;
        return parseFloat(str.replace(/[^0-9.-]/g, '')) || 0;
    }

    formatNumberToString(num, decimals = 2) {
        if (!num && num !== 0) return '0.00';
        return parseFloat(num).toFixed(decimals);
    }
}

// Crear instancia singleton
const cambiaFXServiceInstance = new CambiaFXService();

export default cambiaFXServiceInstance;
