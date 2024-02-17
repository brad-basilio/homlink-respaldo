<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mundoweb - Servicios</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
   
</head>


<body class="font-sans bg-gray-100">

  <!-- Encabezado superpuesto -->
  <header class=" text-white px-16 xs:absolute xl:fixed w-full z-10 mt-10 h-20 flex justify-between items-center">
    <div class="items-center inline-flex  xs:w-8/12 xl:w-3/12 z-50"> 
      <a href="{{ route('inicio') }}"> <img src="{{ asset('img/logomundoweb.svg') }}" class="h-full xs:w-52 xl:w-64 "> </a>
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
     
    <div class="flex flex-col text-white text-left text-4xl font-bold space-y-4 font-MontserratMedium tracking-wider">
        <a class="hover:underline duration-300" href="{{ route('inicio') }}">Inicio</a>
        <a class="hover:underline duration-300" href="{{ route('servicios') }}">Servicios</a>
        <a class="hover:underline duration-300" href="{{ route('proyectos') }}">Proyectos</a>
        <a class="hover:underline duration-300" href="{{ route('contacto') }}">Contacto</a>
    </div>
  </div>


  <!-- Contenido principal -->
  <div class=" grid  grid-cols-12  h-screen w-screen bg-azulmundoweb xs:h-full lg:h-screen">

      <!-- Columna 1 (50%) -->
      <div class="xs:col-span-12  lg:col-span-6  xs:h-96 lg:h-full  flex">
         
        <div class="h-full w-full bg-cover bg-center fondoservicios justify-center items-center  ">
          <!-- <div class=" absolute inset-0 bg-black bg-opacity-60 "></div> -->
        </div>
        
    </div>
     



    <!-- Columna 2 (50%) -->
      <div class="xs:col-span-12  lg:col-span-6  p-4 text-left h-full flex flex-col justify-center items-center mx-auto">
        <div class="items-center w-full xs:pt-2 xs:pb-8 lg:py-10 lg:pb-0 xs:px-1 lg:px-0">
          <p class="text-base text-white  font-normal mt-6 font-MontserratMedium">¡Descubre Cómo Elevamos tu Presencia en Línea!</p>
          <h1 class="text-5xl text-white w-full font-bold font-RightgroteskMedium tracking-wider ">
            Transformando Ideas <br> en Realidad Digital
          </h1>
          <div class="flex flex-row border-b-2 pb-2 group cursor-pointer" onclick="window.location='{{ route('onepage') }}'">
            <div class="xs:w-[80%] lg:w-[88%]">
                    <p class="text-base text-white  font-bold mt-6 font-MontserratRegular ">One Page</p>
                    <h2 class="text-xl text-white w-full font-RightgroteskMedium tracking-wider">Descubre la Magia de lo Simple:  One Page <br> que Cautivan</h2>
            </div>
            <div class="xs:w-[20%] lg:w-[12%]">
                <a type="button" href="{{ route('onepage') }}" class="float-left text-lg  text-white xs:py-6 lg:py-3 rounded-full w-auto inline-block text-center mt-6 " >
                    <img src="{{ asset('img/Goup.svg')}}" alt="Flecha a la derecha" class="h-14 w-14 ml-2 inline-block group-hover:rotate-45 transition-all duration-500"></a>  
            </div>
          </div>


          <div class="flex flex-row border-b-2 pb-2 group cursor-pointer" onclick="window.location='{{ route('landingpage') }}'">
            <div  class="xs:w-[80%] lg:w-[88%]">
                    <p class="text-base text-white  font-bold mt-6 font-MontserratRegular">Landing Page</p>
                    <h2 class="text-xl text-white w-full font-RightgroteskMedium tracking-wider">Donde las Visitas se Convierten  en Historias <br> de Éxito</h2>
            </div>
            <div class="xs:w-[20%] lg:w-[12%]">
                <a type="button" href="{{ route('landingpage') }}" class="float-left text-lg  text-white xs:py-6 lg:py-3 rounded-full w-auto inline-block text-center mt-6" >
                    <img src="{{ asset('img/Goup.svg')}}" alt="Flecha a la derecha" class="h-14 w-14 ml-2 inline-block group-hover:rotate-45 transition-all duration-500"></a>  
            </div>
          </div>

          <div class="flex flex-row border-b-2 pb-2 group cursor-pointer " onclick="window.location='{{ route('ecommercepage') }}'">
            <div  class="xs:w-[80%] lg:w-[88%]">
                    <p class="text-base text-white  font-bold mt-6 font-MontserratRegular">E-commerce</p>
                    <h2 class="text-xl text-white w-full font-RightgroteskMedium tracking-wider">Tu Tienda, Nuestro Arte: Potencia  tus Ventas<br> en Línea</h2>
            </div>
            <div  class="xs:w-[20%] lg:w-[12%]">
                <a type="button" href="{{ route('ecommercepage') }}" class="float-left text-lg  text-white xs:py-6 lg:py-3 rounded-full w-auto inline-block text-center mt-6" >
                    <img src="{{ asset('img/Goup.svg')}}" alt="Flecha a la derecha" class="h-14 w-14 ml-2 inline-block group-hover:rotate-45 transition-all duration-500"></a>  
            </div>
          </div>


          <div class="flex flex-row border-b-2 pb-2 group cursor-pointer" onclick="window.location='{{ route('aplicativospage') }}'">
            <div  class="xs:w-[80%] lg:w-[88%]">
                    <p class="text-base text-white  font-bold mt-6 font-MontserratRegular">Aplicativos Móviles y Web</p>
                    <h2 class="text-xl text-white w-full font-RightgroteskMedium tracking-wider">Más Allá de lo Ordinario: Experiencias  Móviles <br> y Web Inigualables</h2>
            </div>
            <div  class="xs:w-[20%] lg:w-[12%]">
                <a type="button" href="{{ route('aplicativospage') }}" class="float-left text-lg  text-white px-2 xs:py-6 lg:py-3 rounded-full w-auto inline-block text-center mt-6 " >
                    <img src="{{ asset('img/Goup.svg')}}" alt="Flecha a la derecha" class="h-14 w-14 ml-2 inline-block group-hover:rotate-45 transition-all duration-500"></a>  
            </div>
          </div>


        </div>
      </div>

     
     

  </div>

  <!-- Pie de página -->
  <!-- <footer class=" p-1 h-14 -mt-14 bg-azulmundoweb">
    <div class="carruselfooter ">
      <ul class="flex flex-row gap-4 ">
        <li class="inline-flex  items-center w-1/4 ">
          <img class="rounded-full w-12 float-left" src="img/iconofooter.png">
          <span class="float-left p-3 text-white">Creatividad inspiradora</span>
        </li>
        <li class="inline-flex items-center  w-1/4 ">
          <img class="rounded-full w-12  float-left" src="img/iconofooter.png">
          <span class="float-left p-3 text-white">Colaboración transparente</span>
        </li>
        <li class="inline-flex items-center  w-1/4">
          <img class="rounded-full w-12 float-left" src="img/iconofooter.png">
          <span class="float-left p-3 text-white">Excelencia a medida</span>
        </li>
        <li class="inline-flex items-center  w-1/4">
          <img class="rounded-full w-12 float-left" src="img/iconofooter.png">
          <span class="float-left p-3 text-white">Adaptabilidad digital</span>
        </li>
      </ul>
    </div>
  </footer> -->

  

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
              menu.classList.add("w-screen", "h-screen", "opacity-100");
          }
  
          
          estado = !estado;
      });
  
  }); 
  </script>


