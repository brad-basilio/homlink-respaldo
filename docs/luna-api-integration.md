# Nueva Integración API Luna - CambiaFX

## 🚀 Nueva API Implementada

### URL Base
```
https://apiluna.cambiafx.pe/api/BackendPizarra
```

### Endpoints Principales

#### 1. Obtener Tipos de Cambio
```
GET /getTcCustomerNoAuth?idParCurrency=1
```

**Parámetros:**
- `idParCurrency`: ID del par de monedas (1 = USD-PEN)

**Respuesta Exitosa:**
```json
[{
    "idRange": 33,
    "tcFrom": 1.000000,
    "tcTo": 50000.000000,
    "tcBuy": 3.548000,
    "tcSale": 3.568000,
    "coupon": null,
    "amountMinOperation": 0,
    "amountMaxOperation": 0
}]
```

#### 2. Validar Cupón
```
GET /getTcCustomerNoAuth?idParCurrency=1&codePromo=FELIZ28
```

**Parámetros:**
- `idParCurrency`: ID del par de monedas (1 = USD-PEN)
- `codePromo`: Código del cupón promocional

**Respuesta con Cupón Único:**
```json
[{
    "idRange": 3742,
    "tcFrom": 100.000000,
    "tcTo": 50000.000000,
    "tcBuy": 3.550000,
    "tcSale": 3.566000,
    "coupon": null,
    "amountMinOperation": 0,
    "amountMaxOperation": 0
}]
```

**Respuesta con Cupón Multi-Rango:**
```json
[
    {
        "idRange": 3750,
        "tcFrom": 1.000000,
        "tcTo": 5000.000000,
        "tcBuy": 3.550000,
        "tcSale": 3.566000,
        "coupon": null,
        "amountMinOperation": 0,
        "amountMaxOperation": 0
    },
    {
        "idRange": 3751,
        "tcFrom": 5000.000000,
        "tcTo": 20000.000000,
        "tcBuy": 3.551000,
        "tcSale": 3.565000,
        "coupon": null,
        "amountMinOperation": 0,
        "amountMaxOperation": 0
    }
]
```

## 🔄 Mapeo de Campos

### De API Luna → Formato Interno

| Campo API Luna | Campo Interno | Descripción |
|----------------|---------------|-------------|
| `idRange` | `id` | ID del rango de tipos de cambio |
| `tcFrom` | `desde` | Monto mínimo del rango |
| `tcTo` | `hasta` | Monto máximo del rango |
| `tcBuy` | `tc_compra` | Tipo de cambio de compra |
| `tcSale` | `tc_venta` | Tipo de cambio de venta |
| `coupon` | `coupon` | Información del cupón |
| `amountMinOperation` | `amountMinOperation` | Monto mínimo de operación |
| `amountMaxOperation` | `amountMaxOperation` | Monto máximo de operación |

## 📝 Archivos Actualizados

### 1. CambiaFXService.js
- ✅ Actualizado para usar nueva API Luna
- ✅ Mapeo de campos implementado
- ✅ Soporte para cupones multi-rango
- ✅ Fallback a datos de respaldo

### 2. ExchangeRateController.php
- ✅ Endpoint `/api/tc` actualizado
- ✅ Nuevo endpoint `/api/tc/cupon/{code}`
- ✅ Mapeo de campos en servidor
- ✅ Logging mejorado

### 3. exchange-calculator-blade.js
- ✅ Configuración de nueva API
- ✅ Función de validación de cupones mejorada
- ✅ Soporte para respuestas múltiples

### 4. exchange-calculator.js
- ✅ Clase ExchangeCalculator actualizada
- ✅ Manejo de cupones mejorado
- ✅ API local y directa soportadas

## 🧪 Pruebas Disponibles

### Cupones de Prueba

1. **FELIZ28** - Cupón único
   - Rango: 100 - 50,000
   - TC Compra: 3.550
   - TC Venta: 3.566

2. **PIZA1** - Cupón multi-rango
   - Rango 1: 1 - 5,000 (TC: 3.550/3.566)
   - Rango 2: 5,000 - 20,000 (TC: 3.551/3.565)

### URLs de Prueba

```bash
# Tipos de cambio normales
curl "https://apiluna.cambiafx.pe/api/BackendPizarra/getTcCustomerNoAuth?idParCurrency=1"

# Cupón FELIZ28
curl "https://apiluna.cambiafx.pe/api/BackendPizarra/getTcCustomerNoAuth?idParCurrency=1&codePromo=FELIZ28"

# Cupón PIZA1 (multi-rango)
curl "https://apiluna.cambiafx.pe/api/BackendPizarra/getTcCustomerNoAuth?idParCurrency=1&codePromo=PIZA1"
```

## 🔧 Configuración

### Frontend (JavaScript)
```javascript
const API_CONFIG = {
    baseURL: 'https://apiluna.cambiafx.pe/api/BackendPizarra',
    localAPI: '/api',
    timeout: 8000,
    idParCurrency: 1 // USD-PEN
};
```

### Backend (Laravel)
```php
private $baseURL = 'https://apiluna.cambiafx.pe/api/BackendPizarra';
private $idParCurrency = 1; // USD-PEN
```

## 🚦 Flujo de Fallback

### 1. Tipos de Cambio
1. **API Local Laravel** (`/api/tc`) - Proxy con caché
2. **API Luna Directa** - Llamada directa al endpoint
3. **Datos de Respaldo** - Array hardcodeado

### 2. Validación de Cupones
1. **API Local Laravel** (`/api/tc/cupon/{code}`) - Proxy con validación
2. **API Luna Directa** - Validación directa
3. **Error Manejado** - Mensaje al usuario

## 📊 Ventajas de la Nueva API

### ✅ Beneficios
- **Datos en Tiempo Real**: Conexión directa con sistema de pizarra
- **Cupones Multi-Rango**: Soporte para diferentes rangos de montos
- **API Consistente**: Formato JSON estándar
- **Rendimiento**: Respuestas rápidas y confiables
- **Escalabilidad**: Preparada para múltiples pares de monedas

### 📈 Características Mejoradas
- **Rangos Dinámicos**: Los rangos se obtienen de la API
- **Cupones Inteligentes**: Validación en tiempo real
- **Fallback Robusto**: Múltiples capas de respaldo
- **Logging Detallado**: Trazabilidad completa

## 🔍 Debugging

### Logs en Consola
```javascript
console.log('📡 Respuesta de API Luna:', response.data);
console.log('✅ Cupón validado:', tcData);
console.log('🎯 TC aplicado:', this.tcData);
```

### Verificación en Navegador
1. Abrir DevTools (F12)
2. Ir a la pestaña Network
3. Realizar operación de cambio o cupón
4. Verificar llamadas a API Luna
5. Revisar respuestas en Console

## 🚀 Próximos Pasos

1. **Monitoreo**: Implementar métricas de rendimiento
2. **Caché**: Optimizar con Redis/Memcached
3. **Rate Limiting**: Proteger contra abuso
4. **Múltiples Pares**: USD-EUR, EUR-PEN, etc.
5. **Notificaciones**: Alertas de cambios en TC

---

**Nota**: Todos los sistemas están ahora integrados con la nueva API Luna y funcionan con los cupones de prueba `FELIZ28` y `PIZA1`. El fallback a datos de respaldo asegura que el sistema funcione incluso si hay problemas temporales con la API.
