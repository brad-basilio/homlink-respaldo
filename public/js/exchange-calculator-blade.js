/**
 * Script optimizado para la calculadora de tipo de cambio
 * Para uso en archivos Blade de CambiaFX
 * 
 * Dependencias requeridas:
 * - jQuery
 * - Axios
 * - SweetAlert2
 * - Numeral.js
 * - Lodash (opcional)
 */

// Variables globales
let TC_BASE = [];
let TC_DETALLE = [];
let IS_VENTA = true;
let promotionalCodeTimeout = null;

// Configuración de APIs
const API_CONFIG = {
    baseURL: '/api',
    localAPI: '/api',
    timeout: 8000,
    idParCurrency: 1 // USD-PEN
};

/**
 * Cargar tipos de cambio desde la API
 */
async function loadExchangeRates() {
    try {
        console.log('📡 Cargando tipos de cambio desde Nueva API Luna...');
        
        // Intentar API local primero
        let response;
        try {
            response = await axios.get(API_CONFIG.localAPI + '/tc', {
                timeout: API_CONFIG.timeout,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log('✅ API local exitosa:', response.data);
        } catch (localError) {
            console.warn('⚠️ Error con API local, intentando API Luna directa:', localError.message);
            
            // Fallback a API Luna directa
            response = await axios.get(API_CONFIG.baseURL + '/getTcCustomerNoAuth', {
                params: {
                    idParCurrency: API_CONFIG.idParCurrency
                },
                timeout: API_CONFIG.timeout,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log('✅ API Luna directa exitosa:', response.data);
        }
        
        // Procesar respuesta
        let exchangeData = [];
        
        if (response.data && response.data.status === 200 && Array.isArray(response.data.data)) {
            // Respuesta del proxy Laravel
            exchangeData = response.data.data;
        } else if (Array.isArray(response.data)) {
            // Respuesta directa de la API Luna
            exchangeData = response.data.map(item => ({
                id: item.idRange || item.id,
                desde: parseFloat(item.tcFrom || item.desde),
                hasta: parseFloat(item.tcTo || item.hasta),
                tc_compra: parseFloat(item.tcBuy || item.tc_compra),
                tc_venta: parseFloat(item.tcSale || item.tc_venta),
                coupon: item.coupon,
                amountMinOperation: parseFloat(item.amountMinOperation || 0),
                amountMaxOperation: parseFloat(item.amountMaxOperation || 0)
            }));
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
            exchangeData = response.data.data;
        }
        
        if (exchangeData.length > 0) {
            TC_BASE = exchangeData.map(item => ({
                id: parseInt(item.id),
                desde: parseFloat(item.desde),
                hasta: parseFloat(item.hasta),
                tc_compra: parseFloat(item.tc_compra),
                tc_venta: parseFloat(item.tc_venta)
            }));
            TC_DETALLE = [...TC_BASE];
            console.log('✅ Tipos de cambio cargados desde Nueva API Luna:', TC_BASE);
            
            // Actualizar display inicial
            updateInitialDisplay();
            
            return true;
        } else {
            throw new Error('No se obtuvieron datos válidos de la API');
        }
        
    } catch (error) {
        console.error('❌ Error cargando tipos de cambio:', error);
        
        // Usar datos de respaldo si están disponibles en el servidor
        if (typeof TC_SERVER_DATA !== 'undefined' && TC_SERVER_DATA.length > 0) {
            TC_BASE = TC_SERVER_DATA;
            TC_DETALLE = [...TC_BASE];
            console.log('📊 Usando datos del servidor:', TC_BASE);
            updateInitialDisplay();
            return true;
        }
        
        // Datos de respaldo hardcodeados
        TC_BASE = [
            { id: 1, desde: 0, hasta: 1000, tc_compra: 3.5330, tc_venta: 3.5650 },
            { id: 2, desde: 1001, hasta: 5000, tc_compra: 3.5340, tc_venta: 3.5660 },
            { id: 3, desde: 5001, hasta: 10000, tc_compra: 3.5350, tc_venta: 3.5670 },
            { id: 4, desde: 10001, hasta: 999999, tc_compra: 3.5360, tc_venta: 3.5680 }
        ];
        TC_DETALLE = [...TC_BASE];
        console.log('📊 Usando datos de respaldo hardcodeados:', TC_BASE);
        updateInitialDisplay();
        return false;
    }
}

function updateInitialDisplay() {
    if (TC_DETALLE.length > 0) {
        const obj = TC_DETALLE[0];
        $('.txt_compra').text('S/ ' + obj.tc_compra.toFixed(4));
        $('.txt_venta').text('S/ ' + obj.tc_venta.toFixed(4));
        $('#tc').text(obj.tc_compra.toFixed(4));
    }
}

function setCompra() {
    console.log('🔄 Configurando modo COMPRA');
    IS_VENTA = false;
    
    // Actualizar botones
    $('.btn-cf-compra').removeClass('btn-secondary').addClass('btn-dark');
    $('.btn-cf-venta').removeClass('btn-dark').addClass('btn-secondary');
    
    // Actualizar etiquetas de moneda
    $('.currency_from').text('S/');
    $('.currency_to').text('US$');
    $('[name="tc_from"]').attr('placeholder', 'Monto en Soles');
    $('[name="tc_to"]').attr('placeholder', 'Monto en Dólares');
    
    // Recalcular
    calcularTC();
}

function setVenta() {
    console.log('🔄 Configurando modo VENTA');
    IS_VENTA = true;
    
    // Actualizar botones
    $('.btn-cf-venta').removeClass('btn-secondary').addClass('btn-dark');
    $('.btn-cf-compra').removeClass('btn-dark').addClass('btn-secondary');
    
    // Actualizar etiquetas de moneda
    $('.currency_from').text('US$');
    $('.currency_to').text('S/');
    $('[name="tc_from"]').attr('placeholder', 'Monto en Dólares');
    $('[name="tc_to"]').attr('placeholder', 'Monto en Soles');
    
    // Recalcular
    calcularTC();
}

function getTCFromAmount(monto) {
    console.log('🎯 getTCFromAmount:', { monto, IS_VENTA });
    
    if (!monto || monto <= 0) {
        if (TC_DETALLE.length > 0) {
            const obj = TC_DETALLE[0];
            updateRateDisplay(obj);
            return IS_VENTA ? obj.tc_compra : obj.tc_venta;
        }
        return 0;
    }

    let tcObj = null;
    
    // Buscar rango correcto
    for (let obj of TC_DETALLE) {
        if (obj.desde <= monto && monto <= obj.hasta) {
            tcObj = obj;
            break;
        }
    }
    
    // Si no se encuentra, usar el último rango
    if (!tcObj && TC_DETALLE.length > 0) {
        tcObj = TC_DETALLE[TC_DETALLE.length - 1];
    }
    
    if (tcObj) {
        updateRateDisplay(tcObj);
        return IS_VENTA ? tcObj.tc_compra : tcObj.tc_venta;
    }
    
    return 0;
}

function updateRateDisplay(tcObj) {
    $('.txt_compra').text('S/ ' + tcObj.tc_compra.toFixed(4));
    $('.txt_venta').text('S/ ' + tcObj.tc_venta.toFixed(4));
    $('#tc').text((IS_VENTA ? tcObj.tc_compra : tcObj.tc_venta).toFixed(4));
}

function calcularTC(origin = 'O') {
    console.log('🧮 Calculando TC, origin:', origin);
    
    let amount = 0;
    if (origin === 'O') {
        amount = formatStringToNumber($('[name="tc_from"]').val());
    } else if (origin === 'D') {
        amount = formatStringToNumber($('[name="tc_to"]').val());
    }
    
    const tc = getTCFromAmount(amount);
    let result = 0;
    
    if (origin === 'O') {
        // Desde campo origen
        if (IS_VENTA) {
            // VENTA: USD -> PEN
            result = amount * tc;
        } else {
            // COMPRA: PEN -> USD
            result = amount / tc;
        }
        $('[name="tc_to"]').val(formatNumberToString(result));
    } else if (origin === 'D') {
        // Desde campo destino
        if (IS_VENTA) {
            // VENTA: PEN -> USD
            result = amount / tc;
        } else {
            // COMPRA: USD -> PEN
            result = amount * tc;
        }
        $('[name="tc_from"]').val(formatNumberToString(result));
    }
    
    console.log('🎯 Resultado:', { amount, tc, result, IS_VENTA });
}

function validarCupon(tipo, cuponCode) {
    console.log('🎫 Validando cupón con Nueva API Luna:', { tipo, cuponCode });
    
    if (!cuponCode || cuponCode.trim() === '') {
        TC_DETALLE = [...TC_BASE];
        calcularTC();
        return;
    }
    
    // Intentar primero con API local, luego con API Luna directa
    const tryLocal = axios.get(API_CONFIG.localAPI + '/tc/cupon/' + cuponCode, {
        timeout: API_CONFIG.timeout,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    
    const tryDirect = axios.get(API_CONFIG.baseURL + '/getTcCustomerNoAuth', {
        params: {
            idParCurrency: API_CONFIG.idParCurrency,
            codePromo: cuponCode
        },
        timeout: API_CONFIG.timeout,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    
    // Intentar API local primero, luego API directa
    tryLocal
        .then((response) => {
            console.log('✅ Respuesta del cupón (API local):', response.data);
            return processCouponResponse(response.data, cuponCode);
        })
        .catch((localError) => {
            console.warn('⚠️ Error con API local, intentando API Luna directa:', localError.message);
            return tryDirect
                .then((response) => {
                    console.log('✅ Respuesta del cupón (API Luna directa):', response.data);
                    return processCouponResponse(response.data, cuponCode);
                });
        })
        .catch((error) => {
            console.error('❌ Error validando cupón:', error);
            
            if (tipo === 'c') {
                $('.promotional-code').val('');
            }
            
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'error',
                    text: 'El código de promoción no es válido.'
                });
            }
            
            TC_DETALLE = [...TC_BASE];
            calcularTC();
        });
}

function processCouponResponse(data, cuponCode) {
    let tcData = null;
    
    // Manejar respuesta del proxy Laravel
    if (data && data.status === 200 && Array.isArray(data.data)) {
        tcData = data.data;
    }
    // Manejar respuesta directa de API Luna
    else if (Array.isArray(data) && data.length > 0) {
        tcData = data.map(item => ({
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
        // Asegurar formato consistente
        const processedData = tcData.map(item => ({
            id: parseInt(item.id),
            desde: parseFloat(item.desde || 0),
            hasta: parseFloat(item.hasta || 999999),
            tc_compra: parseFloat(item.tc_compra),
            tc_venta: parseFloat(item.tc_venta),
            // Campos adicionales
            coupon: item.coupon,
            amountMinOperation: parseFloat(item.amountMinOperation || 0),
            amountMaxOperation: parseFloat(item.amountMaxOperation || 0)
        }));
        
        console.log('✅ Cupón aplicado:', processedData);
        TC_DETALLE = processedData;
        calcularTC();
    } else {
        throw new Error('Cupón no válido');
    }
}

function setTCPROMO() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigoCupon = urlParams.get('utm_campaign');
    
    if (codigoCupon) {
        console.log('🎫 Cupón detectado en URL:', codigoCupon);
        $('.promotional-code').val(codigoCupon);
        validarCupon('url', codigoCupon);
    }
}

function formatStringToNumber(str) {
    if (!str) return 0;
    return parseFloat(str.toString().replace(/,/g, '')) || 0;
}

function formatNumberToString(num) {
    if (!num || isNaN(num)) return '';
    return num.toFixed(2);
}

function handleLogin() {
    const fromAmount = formatStringToNumber($('[name="tc_from"]').val());
    const toAmount = formatStringToNumber($('[name="tc_to"]').val());
    
    if (fromAmount <= 0) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'error',
                text: 'Debe ingresar un monto válido'
            });
        }
        return;
    }
    
    console.log('🔐 Procesando login:', {
        from: fromAmount,
        to: toAmount,
        operation: IS_VENTA ? 'V' : 'C',
        coupon: $('.promotional-code').val()
    });
    
    // Construir parámetros para la URL
    const params = new URLSearchParams({
        tc: IS_VENTA ? 'V' : 'C',
        from: fromAmount,
        to: toAmount,
        code: $('.promotional-code').val() || ''
    });
    
    // Redirigir a login
    const url = '/contacto?' + params.toString();
    window.location.href = url;
}

// Configurar eventos cuando el DOM esté listo
$(document).ready(function() {
    console.log('🚀 Inicializando calculadora de tipo de cambio...');
    
    // Cargar tipos de cambio desde API
    loadExchangeRates();
    
    // Configurar eventos de botones
    $('.btn-cf-compra').off('click').on('click', setCompra);
    $('.btn-cf-venta').off('click').on('click', setVenta);
    
    // Botón de intercambio
    $('.btn-change').off('click').on('click', function() {
        if (IS_VENTA) {
            setCompra();
        } else {
            setVenta();
        }
    });
    
    // Campos de entrada
    $('[name="tc_from"]').off('input').on('input', function() {
        calcularTC('O');
    });
    
    $('[name="tc_to"]').off('input').on('input', function() {
        calcularTC('D');
    });
    
    // Código promocional
    $('.promotional-code').off('keydown').on('keydown', function(evt) {
        if (promotionalCodeTimeout) {
            clearTimeout(promotionalCodeTimeout);
        }
        promotionalCodeTimeout = setTimeout(() => {
            $('.promotional-code').trigger('change');
        }, 1500);
    });
    
    $('.promotional-code').off('change').on('change', function() {
        const codigo = $(this).val();
        validarCupon('c', codigo);
    });
    
    // Botón de login
    $('.btn-login').off('click').on('click', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Enlaces de imagen
    $('.img-link').off('click').on('click', function(e) {
        e.preventDefault();
        const url = $(this).data('link');
        if (url) {
            window.open(url, '_blank');
        }
    });
    
    // Configurar modo inicial
    setVenta();
    
    // Verificar cupón en URL
    setTCPROMO();
    
    console.log('✅ Calculadora de tipo de cambio inicializada');
});
