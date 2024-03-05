<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mundoweb - Ecommerce</title>
    <!-- @vite(['resources/css/app.css', 'resources/js/app.js']) -->
    <script src="{{ asset('js/funciones.js') }}"></script>
    <link rel="stylesheet" href="{{asset('build/app.css')}}">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
</head>


<body class="font-sans  bg-azulecommerce textura lg:h-screen" >
<div class=" inset-0 bg-azulecommerce bg-opacity-50  ">
  <!-- Encabezado superpuesto -->
  <header class=" text-white xs:px-[5%]  w-full  xs:pt-10 lg:pt-20 h-20 flex justify-between items-center">
    <div class="items-center inline-flex xs:w-8/12 xl:w-3/12 z-50"> 
      <a href="{{ route('inicio') }}"><img src="{{ asset('img/logomundoweb.svg')}}" class="h-full xs:w-52 xl:w-64 "> </a>
    </div>
  
    <div class="inline-flex items-center xs:w-0/12 xl:w-6/12"> 
        
    </div>
  
    <div class="inline-flex items-center xs:w-4/12 xl:w-3/12 justify-end"> 
     <div class="group z-50" id="botonmenu">
        <a type="button"  href="javascript:void(0)"   class=" float-right text-lg bg-fondoboton text-white w-16 h-16 rounded-full  inline-flex items-center justify-center" >
           
            <div class="menu-icon w-8 h-8" id="menuIcon">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
        </a>  
        </div>   
    </div>
   
  </header>
  
  <div id="menu" class="fixed z-90 w-0 h-0 flex justify-center items-center bg-azulanding opacity-0 duration-700">
     
    <div class="flex flex-col text-white text-left text-4xl font-bold space-y-4 font-RightgroteskMedium tracking-wider">
        <a class="hover:underline duration-300" href="{{ route('inicio') }}">Inicio</a>
        <a class="hover:underline duration-300" href="{{ route('servicios') }}">Servicios</a>
        <a class="hover:underline duration-300" href="{{ route('proyectos') }}">Proyectos</a>
        <a class="hover:underline duration-300" href="{{ route('contacto') }}">Contacto</a>
    </div>
  </div>

  <!-- Contenido principal -->
  <div class=" grid  grid-cols-12 xs:min-w-96  xs:h-full  ">

      <!-- Columna 1 (60%) -->
      <div class="xs:col-span-12  lg:col-span-5 w-full h-full  p-4  text-left  flex flex-col justify-center items-center mx-auto">
       
        <div class="items-center  xs:py-[5%] md:py-[8%] lg:py-[27%]  xs:px-[2%] md:px-[8%] ">
          <h1 class="xs:text-4xl xl:text-6xl  text-white w-full font-RightgroteskMedium tracking-wide ">
            E-commerce:<br> Abre las puertas de tu tienda en línea
          </h1>
          <p class="xs:text-base xl:text-lg text-white  font-normal mt-10 font-MontserratRegular">Potenciamos tus ventas con soluciones E-commerce personalizadas. 
            Experiencia de compra fluida y herramientas para impulsar el crecimiento de tu negocio.</p>
          <div class="group  mt-8 inline-block">   
            <a type="button" href="{{ route('contacto') }}" class="text-lg bg-fondoboton text-white px-6 py-3 rounded-full w-auto inline-block text-center mt-6  group-hover:pl-3 group-hover:border-4 group-hover:border-white transition-all  duration-500" >
             <span class="group-hover:pr-3 transition-all  duration-500 font-MontserratSemibold text-base ">Quiero mi e-commerce</span><img src="{{ asset('img/iconbutton.svg') }}" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block group-hover:rotate-45 transition-all duration-500"></a>  
          </div>
          

        </div>
      </div>

      <!-- Columna 2 (40%) -->
      <div class="xs:col-span-12 lg:col-span-7  flex ">
         
        <div class="xs:w-[100%] lg:w-[100%] min-h-96 md:h-[100%]  justify-center items-center  ">
            <img class="w-full h-full object-cover self-start" src="{{ asset('img/fondoecommerce.png') }}">
          </div>
      </div>

  </div>

  <!-- Pie de página -->
  <footer >
   <div class="grid grid-cols-12 h-auto text-right items-center justify-between px-[5%] pb-[3%] pt-[1%]">
    <div class="xs:col-span-12 lg:col-span-4 ">

       <div class="flex justify-start"> 
          <div class="group inline-block">
            <a type="button" href="{{ route('servicios') }}" class="rounded-full w-auto inline-block" >
                <img src="{{ asset('img/arrowleftup.svg') }}" alt="Flecha a la derecha" class="h-16 w-16  inline-block group-hover:-rotate-45 transition-all duration-500"></a>  
          </div>  
        </div>

    </div>

    <div  class="xs:col-span-12 lg:col-span-4">

    </div>

    <div  class="xs:col-span-12 lg:col-span-4 ">

        <div class="group inline-block items-center  justify-end ">   
            <a type="button" href="{{ route('aplicativospage') }}" class=" text-lg  text-white  rounded-full w-auto inline-block text-center   group-hover:pl-3   transition-all  duration-500 " >
            <span class="group-hover:pr-3 transition-all  duration-500 font-MontserratSemibold text-base">Servicio: App móvil</span><img src="{{ asset('img/arrowright.svg') }}" alt="Flecha a la derecha" class="h-12 w-12 ml-2 inline-block group-hover:rotate-45 transition-all duration-500"></a>  
        </div>
    
    </div>
   </div>


   {{-- <div class="grid xs:grid-cols-1 lg:grid-cols-4 px-[5%]   py-10  gap-10 text-white  bg-azulecommerce">
 
    <div class="flex flex-col items-start">
      <a href="{{ route('inicio') }}"> <img src="{{ asset('img/logomundoweb.svg') }}" class="h-full xs:w-40 "> </a>
    </div>

    <div>
      <div class="mb-4">
          <h2 class="font-MontserratSemibold mb-1">Teléfono</h2>
          <p class="font-MontserratRegular text-sm"> +51 999 999 999</p>
      </div>
      <div>
          <h2 class="font-MontserratSemibold">Email</h2>
          <p class="font-MontserratRegular text-sm">hola@mundoweb.pe</p>
      </div>
    </div>

    <div>
    <div class="mb-4">
          <h2 class="font-MontserratSemibold mb-1">Dirección</h2>
          <p class="font-MontserratRegular text-sm">Centro Empresarial Peruano - Suizo Av. Aramburú 166 - Miraflores, Oficina 4B, Lima, Lima 51, PE</p>
      </div>
      <div>
          <h2 class="font-MontserratSemibold">Horario</h2>
          <p class="font-MontserratRegular text-sm">9am — 6pm</p>
      </div>
    </div>

    <div class="flex flex-col xs:items-start lg:items-end xs:justify-start lg:justify-end">
          <p class="font-MontserratRegular text-xs ">Copyright © 2023 Mundo Web. Reservados todos los derechos.</p>
    </div>

</div> --}}

  </footer>

  

<!-- Modal toggle -->


  
</div>
</body>
</html>


<script>

  document.getElementById("menuIcon").addEventListener("click", function() {
      var menuIcon = document.getElementById("menuIcon");
      menuIcon.classList.toggle("change");
  });
  
  
      document.addEventListener("DOMContentLoaded", function() {
          var menu = document.getElementById("menu");
          var miBoton = document.getElementById("botonmenu");
          var estado = false;
          
          miBoton.addEventListener("click", function() {
             
          if (estado) {
              menu.classList.remove("w-screen", "h-screen", "opacity-100");
              menu.classList.add("w-0", "h-0", "opacity-0");
             
          } else {
              menu.classList.remove("w-0", "h-0", "opacity-0");
              menu.classList.add("w-screen", "h-screen", "opacity-100", "-mt-20");
          }
  
          
          estado = !estado;
      });
  
  }); 
  </script>