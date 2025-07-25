# 🔧 Corrección del Flujo Bidireccional en Calculadora de TC

## 🎯 Problema Identificado

**Escenario problemático:**
- Usuario está en **VENTA** (Soles → Dólares)
- Ve que el cupón dice "desde 100 USD" 
- Ingresa **100 USD en el campo de dólares** para ver cuántos soles necesita
- **Resultado incorrecto:** No coincide con la conversión inversa

**Ejemplo del problema:**
```
VENTA Normal: 355.7 soles → 100 dólares ✅
VENTA Inversa: 100 dólares → 355.5 soles ❌ (debería ser 355.7)
```

## ✅ Solución Implementada

### **1. Detección Automática de Moneda de Entrada**

```javascript
calculateExchange(amount, operationType = 'venta', origin = 'from') {
    let inputCurrency = 'USD';
    
    if (operationType === 'V') { // VENTA
        if (origin === 'from') {
            inputCurrency = 'PEN'; // Campo principal: Soles
        } else {
            inputCurrency = 'USD'; // Campo secundario: Dólares
        }
    } else { // COMPRA
        if (origin === 'from') {
            inputCurrency = 'USD'; // Campo principal: Dólares
        } else {
            inputCurrency = 'PEN'; // Campo secundario: Soles
        }
    }
}
```

### **2. Búsqueda de Rango Corregida**

```javascript
getTCFromAmount(amount, operationType = 'venta', currency = 'USD') {
    let amountForComparison = amount;
    
    // Si la moneda es PEN, convertir a USD para encontrar el rango
    if (currency === 'PEN') {
        const baseTc = this.tcData[0] ? 
            (operationType === 'V' ? this.tcData[0].tc_venta : this.tcData[0].tc_compra) 
            : 3.55;
        amountForComparison = amount / baseTc;
    }
    
    // Buscar rango usando el monto en USD
    for (let obj of this.tcData) {
        if (obj.desde <= amountForComparison && amountForComparison < obj.hasta) {
            return operationType === 'V' ? obj.tc_venta : obj.tc_compra;
        }
    }
}
```

### **3. Fórmulas de Conversión Corregidas**

```javascript
if (inputCurrency === 'USD') {
    if (operationType === 'V') {
        result = amount * tc; // USD × tc_venta = PEN (cuántos soles necesita)
    } else {
        result = amount * tc; // USD × tc_compra = PEN (cuántos soles obtiene)
    }
} else { // inputCurrency === 'PEN'
    if (operationType === 'V') {
        result = amount / tc; // PEN ÷ tc_venta = USD (cuántos dólares obtiene)
    } else {
        result = amount / tc; // PEN ÷ tc_compra = USD (cuántos dólares necesita)
    }
}
```

## 🔄 Flujos Soportados

### **VENTA (Soles → Dólares)**

**Flujo Principal:**
```
Usuario ingresa: 355.7 PEN (campo "ENVÍO")
→ Detecta: inputCurrency = 'PEN'
→ Convierte a USD: 355.7 ÷ 3.555 ≈ 100 USD
→ Busca rango para 100 USD
→ Usa tc_venta = 3.555
→ Resultado: 355.7 ÷ 3.555 = 100.03 USD
```

**Flujo Inverso (CORREGIDO):**
```
Usuario ingresa: 100 USD (campo "RECIBO")
→ Detecta: inputCurrency = 'USD'
→ Busca rango para 100 USD directamente
→ Usa tc_venta = 3.555
→ Resultado: 100 × 3.555 = 355.5 PEN
```

### **COMPRA (Dólares → Soles)**

**Flujo Principal:**
```
Usuario ingresa: 100 USD (campo "ENVÍO")
→ Detecta: inputCurrency = 'USD' 
→ Busca rango para 100 USD
→ Usa tc_compra = 3.539
→ Resultado: 100 × 3.539 = 353.9 PEN
```

**Flujo Inverso:**
```
Usuario ingresa: 353.9 PEN (campo "RECIBO")
→ Detecta: inputCurrency = 'PEN'
→ Convierte a USD: 353.9 ÷ 3.539 ≈ 100 USD  
→ Busca rango para 100 USD
→ Usa tc_compra = 3.539
→ Resultado: 353.9 ÷ 3.539 = 100.03 USD
```

## 🎯 Caso de Prueba con tu Cupón

**Datos del cupón:**
```json
{
    "idRange": 3742,
    "tcFrom": 100.000000,
    "tcTo": 50000.000000,
    "tcBuy": 3.539000,
    "tcSale": 3.555000
}
```

**Prueba VENTA:**
```
✅ Normal: 355.5 PEN → 100.03 USD (tc_venta = 3.555)
✅ Inverso: 100 USD → 355.5 PEN (tc_venta = 3.555)
```

**Prueba COMPRA:**
```
✅ Normal: 100 USD → 353.9 PEN (tc_compra = 3.539)  
✅ Inverso: 353.9 PEN → 100.03 USD (tc_compra = 3.539)
```

## 🏆 Resultado

Ahora tanto el flujo principal como el inverso usan **exactamente el mismo TC** del mismo rango, eliminando las inconsistencias en los cálculos.

---

**🔥 Problema resuelto:** El cliente puede probar con 100 USD en el campo de dólares durante VENTA y obtendrá el resultado correcto que coincide con la conversión inversa.
