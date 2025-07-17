# Calculadora de Tipo de Cambio - CambiaFX

## Descripción
Sistema optimizado para manejar tipos de cambio en tiempo real y validación de cupones promocionales para CambiaFX.

## Características

### ✅ APIs Integradas
- **API Local**: `/api/tc` - Proxy Laravel para tipos de cambio
- **API Externa**: `https://cambiafx.pe/api/tc` - API directa de CambiaFX
- **Validación de Cupones**: `https://cambiafx.pe/api/cupon/{codigo}` - Funciona perfectamente

### ✅ Manejo de Errores
- Fallback automático entre APIs
- Datos de respaldo del servidor
- Datos hardcodeados como último recurso

### ✅ Funcionalidades
- Cálculo automático bidireccional
- Validación de cupones con debounce
- Detección automática de cupones en URL
- Interfaz responsive
- Logging detallado para debug

## Archivos Creados

### 1. Script Principal Optimizado
```
public/js/exchange-calculator-blade.js
```
- Maneja todas las funcionalidades de la calculadora
- Compatible con jQuery y librerías existentes
- Configuración centralizada de APIs

### 2. Componente Blade
```
resources/views/components/exchange-calculator-script.blade.php
```
- Incluye el script principal
- Maneja datos del servidor como fallback
- Fácil integración con `@include`

### 3. Controlador Actualizado
```
app/Http/Controllers/ExchangeRateController.php
```
- Conecta con API externa real
- Manejo de errores mejorado
- Logging para debugging

### 4. Demo Standalone
```
resources/views/exchange-calculator-demo.blade.php
```
- Página completa de demostración
- Estilos CSS incluidos
- Accesible en `/exchange-calculator-demo`

## Uso en Archivos Blade Existentes

### Opción 1: Usando el Componente
```blade
{{-- En tu archivo Blade principal --}}
@include('components.exchange-calculator-script')
```

### Opción 2: Integración Manual
```blade
{{-- En el head o antes de cerrar </body> --}}
<script src="{{ asset('js/exchange-calculator-blade.js') }}"></script>
```

## HTML Requerido

### Estructura Básica
```html
<!-- Botones de operación -->
<button class="btn btn-cf-compra">COMPRA</button>
<button class="btn btn-cf-venta">VENTA</button>

<!-- Campos de entrada -->
<input type="text" name="tc_from" placeholder="Monto origen">
<input type="text" name="tc_to" placeholder="Monto destino">

<!-- Botón de intercambio -->
<button class="btn-change">⇄</button>

<!-- Código promocional -->
<input type="text" class="promotional-code" placeholder="Código">

<!-- Botón de continuar -->
<button class="btn-login">Continuar</button>

<!-- Displays de información -->
<span class="currency_from">US$</span>
<span class="currency_to">S/</span>
<span class="txt_compra">S/ 3.5330</span>
<span class="txt_venta">S/ 3.5650</span>
<span id="tc">3.5330</span>
```

## Dependencias

### JavaScript Librerías
- **jQuery** - Manejo del DOM
- **Axios** - Peticiones HTTP
- **SweetAlert2** - Alertas elegantes
- **Numeral.js** - Formateo de números (opcional)

### CSS Frameworks
- **Bootstrap** - Estilos de botones y componentes
- **Font Awesome** - Iconos (opcional)

## Configuración

### Variables de Entorno
```javascript
const API_CONFIG = {
    baseURL: 'https://cambiafx.pe/api',
    localAPI: '/api',
    timeout: 8000
};
```

### Personalización de Estilos
```css
.btn-cf-compra, .btn-cf-venta {
    /* Estilos para botones de operación */
}

.promotional-code {
    /* Estilos para campo de código promocional */
}

.btn-login {
    /* Estilos para botón de continuar */
}
```

## Funciones Principales

### `loadExchangeRates()`
- Carga tipos de cambio desde API
- Maneja fallbacks automáticamente
- Actualiza variables globales

### `setCompra()` / `setVenta()`
- Configura modo de operación
- Actualiza UI y etiquetas
- Recalcula automáticamente

### `getTCFromAmount(monto)`
- Obtiene tipo de cambio para un monto específico
- Busca el rango correcto
- Actualiza display de tasas

### `validarCupon(tipo, codigo)`
- Valida cupón promocional
- Actualiza tipos de cambio
- Maneja errores elegantemente

### `calcularTC(origin)`
- Calcula conversión bidireccional
- Actualiza campos automáticamente
- Logging detallado

## Debugging

### Logs en Consola
```javascript
console.log('📡 Cargando tipos de cambio...');
console.log('✅ API local exitosa:', response.data);
console.log('🎫 Validando cupón:', cuponCode);
console.log('🧮 Calculando TC:', { amount, tc, result });
```

### Verificación de Estado
```javascript
console.log('TC_BASE:', TC_BASE);
console.log('TC_DETALLE:', TC_DETALLE);
console.log('IS_VENTA:', IS_VENTA);
```

## Problemas Conocidos y Soluciones

### ❌ Problema: API local devuelve 404
**Solución**: Verificar que la ruta `/api/tc` esté configurada correctamente

### ❌ Problema: Cupones no se validan
**Solución**: La API de cupones funciona correctamente, verificar formato de respuesta

### ❌ Problema: Cálculos incorrectos
**Solución**: Verificar que `IS_VENTA` esté configurado correctamente

### ❌ Problema: Campos no se actualizan
**Solución**: Verificar que los selectores jQuery coincidan con el HTML

## Testing

### Probar la Calculadora
1. Visitar `/exchange-calculator-demo`
2. Ingresar monto en campo origen
3. Verificar cálculo automático
4. Probar cupón: `FELIZ28`
5. Verificar cambio de modo (Compra/Venta)

### Probar APIs
```bash
# API local
curl http://localhost/api/tc

# API externa
curl https://cambiafx.pe/api/tc

# Validar cupón
curl https://cambiafx.pe/api/cupon/FELIZ28
```

## Próximos Pasos

1. **Integrar en página principal**: Reemplazar el script actual con el nuevo
2. **Personalizar estilos**: Adaptar a la identidad visual de CambiaFX
3. **Agregar animaciones**: Mejorar la experiencia de usuario
4. **Optimizar rendimiento**: Implementar caché para tipos de cambio
5. **Agregar tests**: Crear pruebas unitarias para las funciones

## Soporte

Para reportar problemas o solicitar mejoras:
- Revisar logs en consola del navegador
- Verificar que todas las dependencias estén cargadas
- Comprobar que los selectores HTML coincidan
- Validar que las APIs estén disponibles

---

**Nota**: Este sistema reemplaza completamente el código jQuery anterior y ofrece mejor manejo de errores, logging y funcionalidades.
