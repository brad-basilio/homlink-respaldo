{{-- 
    Ejemplo de uso del script de calculadora de tipo de cambio
    Para insertar en archivos Blade existentes 
--}}

@push('scripts')
<script type="text/javascript">
    // Datos del servidor como fallback (opcional)
    // Estos datos se usarán si la API no está disponible
    @if(isset($TC) && is_array($TC))
        var TC_SERVER_DATA = [
            @foreach($TC as $tcDetalle)
            {
                id: {{ $tcDetalle->id }},
                desde: {{ $tcDetalle->desde }},
                hasta: {{ $tcDetalle->hasta }},
                tc_compra: {{ $tcDetalle->tc_compra }},
                tc_venta: {{ $tcDetalle->tc_venta }}
            }@if(!$loop->last),@endif
            @endforeach
        ];
    @endif
</script>

{{-- Script principal de la calculadora --}}
<script src="{{ asset('js/exchange-calculator-blade.js') }}"></script>

{{-- Script adicional para funcionalidades específicas --}}
<script type="text/javascript">
    // Función para hover de servicios (si la necesitas)
    $(".media-servicios").hover(function(){
        var service_elem = $(this);
        $(".media-servicios").removeClass('media-servicios-hover');
        service_elem.addClass('media-servicios-hover');
        $('.service-benefits').hide();
        var index = service_elem.attr('data-index');
        console.log('.service-'+ index +'-benefits');
        $('.service-'+ index +'-benefits').show('slow');
    }, function(){
        /* Código al salir del hover */
    });
    
    // Función para calendario (si la necesitas)
    function CalendarioNew() {
        // Tu código de calendario aquí
        console.log('Calendario inicializado');
    }
    
    // Ejecutar después de que se cargue todo
    $(document).ready(function() {
        // Inicializar calendario si existe
        if (typeof CalendarioNew === 'function') {
            CalendarioNew();
        }
        
        // Mostrar modal si es necesario
        // $("#modalEndYear").modal('show');
        // $("#modalhorariosabado").modal('show');
        // $("#modalferiado").modal('show');
    });
</script>
@endpush
