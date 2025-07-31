/**
 * Exchange Calculator para CambiaFX
 * Maneja tipos de cambio y cupones tanto desde API local como externa
 */

class ExchangeCalculator {
    constructor() {
        this.baseURL = '/api'; // Local API
        this.localAPI = '/api'; // API local para otras funciones
        this.tcBase = [];
        this.tcDetalle = [];
        this.isVenta = true;
        this.promotionalCodeTimeout = null;
        this.idParCurrency = 1; // USD-PEN par
        
        this.init();
    }

    async init() {
        console.log('🚀 Inicializando ExchangeCalculator...');
        
        // Configurar eventos
        this.setupEvents();
        
        // Cargar tipos de cambio
        await this.loadExchangeRates();
        
        // Configurar modo inicial
        this.setVenta();
        
        // Verificar cupón en URL
        this.checkUrlCoupon();
    }

    setupEvents() {
        // Botones de compra/venta
        $('.btn-cf-compra').off('click').on('click', () => this.setCompra());
        $('.btn-cf-venta').off('click').on('click', () => this.setVenta());
        
        // Botón de intercambio
        $('.btn-change').off('click').on('click', () => {
            if (this.isVenta) {
                this.setCompra();
            } else {
                this.setVenta();
            }
        });
        
        // Campos de entrada
        $('[name="tc_from"]').off('input').on('input', () => this.calcularTC('O'));
        $('[name="tc_to"]').off('input').on('input', () => this.calcularTC('D'));
        
        // Código promocional
        $('.promotional-code').off('keydown').on('keydown', (evt) => {
            if (this.promotionalCodeTimeout) {
                clearTimeout(this.promotionalCodeTimeout);
            }
            this.promotionalCodeTimeout = setTimeout(() => {
                $('.promotional-code').trigger('change');
            }, 1500);
        });
        
        $('.promotional-code').off('change').on('change', (evt) => {
            this.handlePromotionalCode($(evt.target).val());
        });
        
        // Botón de login/continuar
        $('.btn-login').off('click').on('click', (e) => this.handleLogin(e));
        
        // Enlaces de imagen
        $('.img-link').off('click').on('click', (e) => {
            e.preventDefault();
            const url = $(e.currentTarget).data('link');
            if (url) {
                window.open(url, "_blank");
            }
        });
    }

    async loadExchangeRates() {
        try {
            console.log('📡 Cargando tipos de cambio desde Nueva API Luna...');
            
            // Intentar API local primero
            let response;
            try {
                response = await $.ajax({
                    url: this.localAPI + '/tc',
                    method: 'GET',
                    timeout: 8000,
                    dataType: 'json'
                });
                console.log('✅ API local exitosa:', response);
            } catch (localError) {
                console.warn('⚠️ Error con API local, intentando API Luna directa:', localError);
                
                // Fallback a API Luna directa
                response = await $.ajax({
                    url: this.baseURL + '/getTcCustomerNoAuth',
                    method: 'GET',
                    data: {
                        idParCurrency: this.idParCurrency
                    },
                    timeout: 8000,
                    dataType: 'json'
                });
                console.log('✅ API Luna directa exitosa:', response);
            }
            
            // Procesar respuesta
            let exchangeData = [];
            
            if (response && response.status === 200 && Array.isArray(response.data)) {
                // Respuesta del proxy Laravel
                exchangeData = response.data;
            } else if (Array.isArray(response)) {
                // Respuesta directa de API Luna
                exchangeData = response.map(item => ({
                    id: item.idRange || item.id,
                    desde: parseFloat(item.tcFrom || item.desde),
                    hasta: parseFloat(item.tcTo || item.hasta),
                    tc_compra: parseFloat(item.tcBuy || item.tc_compra),
                    tc_venta: parseFloat(item.tcSale || item.tc_venta),
                    coupon: item.coupon,
                    amountMinOperation: parseFloat(item.amountMinOperation || 0),
                    amountMaxOperation: parseFloat(item.amountMaxOperation || 0)
                }));
            } else if (response && response.data && Array.isArray(response.data)) {
                exchangeData = response.data;
            }
            
            if (exchangeData.length > 0) {
                this.tcBase = exchangeData.map(item => ({
                    id: parseInt(item.id),
                    desde: parseFloat(item.desde),
                    hasta: parseFloat(item.hasta),
                    tc_compra: parseFloat(item.tc_compra),
                    tc_venta: parseFloat(item.tc_venta)
                }));
                this.tcDetalle = [...this.tcBase];
                console.log('✅ Tipos de cambio cargados:', this.tcBase);
            } else {
                throw new Error('No se obtuvieron datos válidos');
            }
            
        } catch (error) {
            console.error('❌ Error cargando tipos de cambio:', error);
            
            // Datos de respaldo
            this.tcBase = [
                { id: 1, desde: 0, hasta: 1000, tc_compra: 3.5330, tc_venta: 3.5650 },
                { id: 2, desde: 1001, hasta: 5000, tc_compra: 3.5340, tc_venta: 3.5660 },
                { id: 3, desde: 5001, hasta: 10000, tc_compra: 3.5350, tc_venta: 3.5670 },
                { id: 4, desde: 10001, hasta: 999999, tc_compra: 3.5360, tc_venta: 3.5680 }
            ];
            this.tcDetalle = [...this.tcBase];
            console.log('📊 Usando datos de respaldo:', this.tcBase);
        }
    }

    setCompra() {
        console.log('🔄 Configurando modo COMPRA');
        this.isVenta = false;
        
        // Actualizar UI
        $('.btn-cf-compra').removeClass('btn-secondary').addClass('btn-dark');
        $('.btn-cf-venta').removeClass('btn-dark').addClass('btn-secondary');
        
        // Actualizar etiquetas
        $('.currency_from').text('US$');
        $('.currency_to').text('S/');
        $('[name="tc_from"]').attr('placeholder', 'Monto en Dólares');
        $('[name="tc_to"]').attr('placeholder', 'Monto en Soles');
        
        // Recalcular
        this.calcularTC('O');
    }

    setVenta() {
        console.log('🔄 Configurando modo VENTA');
        this.isVenta = true;
        
        // Actualizar UI
        $('.btn-cf-venta').removeClass('btn-secondary').addClass('btn-dark');
        $('.btn-cf-compra').removeClass('btn-dark').addClass('btn-secondary');
        
        // Actualizar etiquetas
        $('.currency_from').text('US$');
        $('.currency_to').text('S/');
        $('[name="tc_from"]').attr('placeholder', 'Monto en Dólares');
        $('[name="tc_to"]').attr('placeholder', 'Monto en Soles');
        
        // Recalcular
        this.calcularTC('O');
    }

    getTCFromAmount(monto) {
        console.log('🎯 getTCFromAmount:', { monto, isVenta: this.isVenta });
        
        if (!monto || monto <= 0) {
            if (this.tcDetalle.length > 0) {
                const obj = this.tcDetalle[0];
                this.updateRateDisplay(obj);
                return this.isVenta ? obj.tc_compra : obj.tc_venta;
            }
            return 0;
        }

        let tcObj = null;
        
        // Buscar rango correcto
        for (let obj of this.tcDetalle) {
            if (obj.desde <= monto && monto <= obj.hasta) {
                tcObj = obj;
                break;
            }
        }
        
        // Si no se encuentra, usar el último rango
        if (!tcObj && this.tcDetalle.length > 0) {
            tcObj = this.tcDetalle[this.tcDetalle.length - 1];
        }
        
        if (tcObj) {
            this.updateRateDisplay(tcObj);
            return this.isVenta ? tcObj.tc_compra : tcObj.tc_venta;
        }
        
        return 0;
    }

    updateRateDisplay(tcObj) {
        $('.txt_compra').text('S/ ' + tcObj.tc_compra.toFixed(4));
        $('.txt_venta').text('S/ ' + tcObj.tc_venta.toFixed(4));
        $('#tc').text((this.isVenta ? tcObj.tc_compra : tcObj.tc_venta).toFixed(4));
    }

    calcularTC(origin = 'O') {
        console.log('🧮 Calculando TC, origin:', origin);
        
        let amount = 0;
        if (origin === 'O') {
            amount = this.formatStringToNumber($('[name="tc_from"]').val());
        } else if (origin === 'D') {
            amount = this.formatStringToNumber($('[name="tc_to"]').val());
        }
        
        const tc = this.getTCFromAmount(amount);
        let result = 0;
        
        if (origin === 'O') {
            // Desde campo origen
            if (this.isVenta) {
                // VENTA: USD -> PEN
                result = amount * tc;
            } else {
                // COMPRA: USD -> PEN
                result = amount * tc;
            }
            $('[name="tc_to"]').val(this.formatNumberToString(result));
        } else if (origin === 'D') {
            // Desde campo destino
            if (this.isVenta) {
                // VENTA: PEN -> USD
                result = amount / tc;
            } else {
                // COMPRA: PEN -> USD
                result = amount / tc;
            }
            $('[name="tc_from"]').val(this.formatNumberToString(result));
        }
        
        console.log('🎯 Resultado:', { amount, tc, result, isVenta: this.isVenta });
    }

    async handlePromotionalCode(code) {
        console.log('🎫 Manejando código promocional con Nueva API Luna:', code);
        
        if (!code || code.trim() === '') {
            // Restaurar tipos de cambio base
            this.tcDetalle = [...this.tcBase];
            this.calcularTC('O');
            return;
        }
        
        try {
            // Intentar validar cupón con API local primero
            let response;
            try {
                response = await $.ajax({
                    url: this.localAPI + '/tc/cupon/' + code,
                    method: 'GET',
                    timeout: 8000,
                    dataType: 'json'
                });
                console.log('✅ Cupón validado (API local):', response);
            } catch (localError) {
                console.warn('⚠️ Error con API local, intentando API Luna directa:', localError);
                
                // Fallback a API Luna directa
                response = await $.ajax({
                    url: this.baseURL + '/getTcCustomerNoAuth',
                    method: 'GET',
                    data: {
                        idParCurrency: this.idParCurrency,
                        codePromo: code
                    },
                    timeout: 8000,
                    dataType: 'json'
                });
                console.log('✅ Cupón validado (API Luna directa):', response);
            }
            
            let tcData = null;
            
            // Manejar respuesta del proxy Laravel
            if (response && response.status === 200 && Array.isArray(response.data)) {
                tcData = response.data;
            }
            // Manejar respuesta directa de API Luna
            else if (Array.isArray(response) && response.length > 0) {
                tcData = response.map(item => ({
                    id: item.idRange || item.id,
                    desde: parseFloat(item.tcFrom || item.desde),
                    hasta: parseFloat(item.tcTo || item.hasta),
                    tc_compra: parseFloat(item.tcBuy || item.tc_compra),
                    tc_venta: parseFloat(item.tcSale || item.tc_venta),
                    coupon: item.coupon,
                    amountMinOperation: parseFloat(item.amountMinOperation || 0),
                    amountMaxOperation: parseFloat(item.amountMaxOperation || 0)
                }));
            }
            
            if (tcData && tcData.length > 0) {
                // Procesar datos del cupón
                this.tcDetalle = tcData.map(item => ({
                    id: parseInt(item.id),
                    desde: parseFloat(item.desde || 0),
                    hasta: parseFloat(item.hasta || 999999),
                    tc_compra: parseFloat(item.tc_compra),
                    tc_venta: parseFloat(item.tc_venta),
                    coupon: item.coupon,
                    amountMinOperation: parseFloat(item.amountMinOperation || 0),
                    amountMaxOperation: parseFloat(item.amountMaxOperation || 0)
                }));
                
                console.log('✅ Cupón aplicado:', this.tcDetalle);
                this.calcularTC('O');
            } else {
                throw new Error('Cupón no válido');
            }
            
        } catch (error) {
            console.error('❌ Error con cupón:', error);
            
            // Mostrar error al usuario
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'error',
                    text: 'El código de promoción no es válido.'
                });
            }
            
            // Limpiar campo si hay error
            $('.promotional-code').val('');
            
            // Restaurar tipos de cambio base
            this.tcDetalle = [...this.tcBase];
            this.calcularTC('O');
        }
    }

    checkUrlCoupon() {
        const urlParams = new URLSearchParams(window.location.search);
        const couponCode = urlParams.get('utm_campaign');
        
        if (couponCode) {
            console.log('🎫 Cupón detectado en URL:', couponCode);
            $('.promotional-code').val(couponCode);
            this.handlePromotionalCode(couponCode);
        }
    }

    handleLogin(e) {
        e.preventDefault();
        
        const fromAmount = this.formatStringToNumber($('[name="tc_from"]').val());
        const toAmount = this.formatStringToNumber($('[name="tc_to"]').val());
        
        if (fromAmount <= 0) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'error',
                    text: 'Debe ingresar un monto válido'
                });
            }
            return;
        }
        
        console.log('🔐 Redirigiendo a login con datos:', {
            from: fromAmount,
            to: toAmount,
            operation: this.isVenta ? 'V' : 'C',
            coupon: $('.promotional-code').val()
        });
        
        // Construir URL con parámetros
        const params = new URLSearchParams({
            tc: this.isVenta ? 'V' : 'C',
            from: fromAmount,
            to: toAmount,
            code: $('.promotional-code').val() || ''
        });
        
        const url = `/contacto?${params.toString()}`;
        window.location.href = url;
    }

    formatStringToNumber(str) {
        if (!str) return 0;
        return parseFloat(str.toString().replace(/,/g, '')) || 0;
    }

    formatNumberToString(num) {
        if (!num || isNaN(num)) return '';
        return num.toFixed(2);
    }
}

// Inicializar cuando el DOM esté listo
$(document).ready(function() {
    // Crear instancia global
    window.exchangeCalculator = new ExchangeCalculator();
    
    // Mantener compatibilidad con funciones globales existentes
    window.setCompra = () => window.exchangeCalculator.setCompra();
    window.setVenta = () => window.exchangeCalculator.setVenta();
    window.getTCFromAmount = (monto) => window.exchangeCalculator.getTCFromAmount(monto);
    window.calcularTC = (origin) => window.exchangeCalculator.calcularTC(origin);
    window.formatStringToNumber = (str) => window.exchangeCalculator.formatStringToNumber(str);
    window.formatNumberToString = (num) => window.exchangeCalculator.formatNumberToString(num);
});
