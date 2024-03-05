<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mundoweb - Proyectos</title>
    <!-- @vite(['resources/css/app.css', 'resources/js/app.js']) -->
    
    <link rel="stylesheet" href="{{asset('build/app.css')}}">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <script src="../resource/js/jquery-3.7.1.min.js"></script>
    <script src="../resource/js/slick.min.js"></script> 
   
  
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/>
   
</head>


<body class="font-sans  bg-azulmoviles textura lg:h-screen" >
<div class=" inset-0 bg-azulmoviles bg-opacity-30  ">
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
     
    <div class="flex flex-col text-white text-left text-4xl font-bold space-y-4">
        <a class="hover:underline duration-300" href="{{ route('inicio') }}">Inicio</a>
        <a class="hover:underline duration-300" href="{{ route('servicios') }}">Servicios</a>
        <a class="hover:underline duration-300" href="{{ route('proyectos') }}">Proyectos</a>
        <a class="hover:underline duration-300" href="{{ route('contacto') }}">Contacto</a>
    </div>
  </div>
  
  <div class= "grid  grid-cols-12 xs:min-w-96  xs:h-full  ">

      <!-- Columna 1 (60%) -->
      <div class="xs:col-span-12  lg:col-span-8 w-full h-full  p-4  text-left  flex flex-col justify-center items-center mx-auto">
       
        <div class="items-center  xs:pt-[5%] md:pt-[8%] lg:pt-[10%]  xs:px-[2%] md:px-[8%]  ">
          <h1 class="xs:text-4xl xl:text-6xl  text-white w-full font-bold  ">
            Portafolio: Nuestra Galería de Éxitos Digitales
          </h1>
          <p class="xs:text-base xl:text-lg text-white  font-normal mt-10">
            Cada proyecto es una historia de éxito. Sumérgete en nuestra galería de trabajos excepcionales 
            que no solo cumplen sino que superan las expectativas. Desde One Page cautivadoras hasta experiencias 
            E-commerce inolvidables, nuestro portafolio refleja nuestra dedicación a la innovación y la calidad.</p>
          <div class="mt-10  flex-wrap gap-8 hidden">   
            <a type="button" class="text-lg bg-fondoboton text-white px-5 py-4 rounded-full w-auto  text-center" >
             <span >Todos los proyectos</span></a>  

             <a type="button" class="text-lg bg-fondoboton text-white px-5 py-4 rounded-full w-auto text-center  " >
                <span >One Page</span></a> 

             <a type="button" class="text-lg bg-fondoboton text-white px-5 py-4 rounded-full w-auto  text-center " >
                 <span >Landing page</span></a> 

            <a type="button" class="text-lg bg-fondoboton text-white px-5 py-4 rounded-full w-auto  text-center " >
                <span >E-commerce</span></a> 

            <a type="button" class="text-lg bg-fondoboton text-white px-5 py-4 rounded-full w-auto  text-center " >
                <span >Aplicativos</span></a> 
          </div>
          

        </div>
      </div>

      <!-- Columna 2 (40%) -->
      <div class="xs:col-span-12 lg:col-span-4  flex ">
         
        <div class="xs:w-[100%] lg:w-[100%]  md:h-[100%]  justify-center items-center relative ">
           
          </div>
      </div>

  </div>

  <div class=" grid  grid-cols-12 xs:min-w-96  xs:h-full  mt-8 ">

   
    <div class="xs:col-span-12  lg:col-span-6 w-full h-full  p-4   flex flex-col justify-center  ">
     
      <div class="xs:w-[100%] lg:w-[100%] min-h-96 md:h-[100%]  justify-center items-center  ">
            <div class="mx-[8%]">
              <h2 class="text-xl font-normal font-RightgroteskMedium text-textyellow">Proyecto: Emprendenvio - Landing page</h2>
              <p  class="text-base font-normal font-MontserratRegular text-white" >Cliente: FLAJ GROUP S.A.C.</p> 
              <a  class="text-base font-normal font-MontserratRegular text-white" href="#" > Proyecto en desarrollo </a> 
            </div>
            <img class="m-auto w-full" src="img/proyecto1.png"> 
      </div>

    </div>

    
    <div class="xs:col-span-12 lg:col-span-6  w-full h-full p-4   flex flex-col justify-center  mx-auto ">
       
    <div class="xs:w-[100%] lg:w-[100%] min-h-96 md:h-[100%]  justify-center items-center  ">
            <div class="mx-[8%]">
              <h2 class="text-xl font-normal font-RightgroteskMedium text-textyellow">Proyecto: MBLens - Ecommerce</h2>
              <p  class="text-base font-normal font-MontserratRegular text-white" >Cliente: MB CORP INTERNATIONAL S.A.C</p> 
              <a  class="text-base font-normal font-MontserratRegular text-white" target=_blank href="https://mblens.com/" > https://mblens.com/ </a> 
            </div>
            <img class="m-auto w-full" src="img/proyecto2.png"> 
      </div>

    </div>

</div>

<div class=" grid  grid-cols-12 xs:min-w-96  xs:h-full  ">

   
    <div class="xs:col-span-12  lg:col-span-6 w-full h-full  p-4   flex flex-col justify-center  mx-auto">
     
    <div class="xs:w-[100%] lg:w-[100%] min-h-96 md:h-[100%]  justify-center items-center  ">
            <div class="mx-[8%]">
              <h2 class="text-xl font-normal font-RightgroteskMedium text-textyellow">Proyecto: Ibergruas - Ecommerce</h2>
              <p  class="text-base font-normal font-MontserratRegular text-white" >Cliente: IBERGRUAS PERU S.A.C.</p> 
              <a  class="text-base font-normal font-MontserratRegular text-white" target=_blank href="https://www.ibergruas.com.pe/" > https://www.ibergruas.com.pe/ </a> 
            </div>
            <img class="m-auto w-full" src="img/proyecto3.png"> 
      </div>

    </div>

    
    <div class="xs:col-span-12 lg:col-span-6  w-full h-full p-4   flex flex-col justify-center  mx-auto ">
       
    <div class="xs:w-[100%] lg:w-[100%] min-h-96 md:h-[100%]  justify-center items-center  ">
            <div class="mx-[8%]">
              <h2 class="text-xl font-normal font-RightgroteskMedium text-textyellow">Proyecto: Machineshop - Ecommerce</h2>
              <p  class="text-base font-normal font-MontserratRegular text-white" >Cliente: MACHINE SHOP S.A.C.</p> 
              <a  class="text-base font-normal font-MontserratRegular text-white" target=_blank href="https://www.machineshop.pe/" > https://www.machineshop.pe/ </a> 
            </div>
            <img class="m-auto w-full" src="img/proyecto4.png"> 
      </div>
    </div>

</div>



<div class=" grid  grid-cols-12 xs:min-w-96  xs:h-full  ">

   
    <div class="xs:col-span-12  lg:col-span-6 w-full h-full  p-4   flex flex-col justify-center  mx-auto">
     
    <div class="xs:w-[100%] lg:w-[100%] min-h-96 md:h-[100%]  justify-center items-center  ">
            <div class="mx-[8%]">
              <h2 class="text-xl font-normal font-RightgroteskMedium text-textyellow">Proyecto: Limpiabnb - Landing page</h2>
              <p  class="text-base font-normal font-MontserratRegular text-white" >Cliente: LIMPIA BNB PERU S.A.C.</p> 
              <a  class="text-base font-normal font-MontserratRegular text-white" href="#" > Proyecto en desarrollo </a> 
            </div>
            <img class="m-auto w-full" src="img/proyecto5.png"> 
      </div>

    </div>

    
    <div class="xs:col-span-12 lg:col-span-6  w-full h-full p-4   flex flex-col justify-center  mx-auto ">
       
    <div class="xs:w-[100%] lg:w-[100%] min-h-96 md:h-[100%]  justify-center items-center  ">
            <div class="mx-[8%]">
              <h2 class="text-xl font-normal font-RightgroteskMedium text-textyellow">Proyecto: WeDesign - Catálogo</h2>
              <p  class="text-base font-normal font-MontserratRegular text-white" >Cliente: WEDESIGN S.A.C.</p> 
              <a  class="text-base font-normal font-MontserratRegular text-white" target=_blank href="https://wedesignst.com/" > https://wedesignst.com/ </a> 
            </div>
            <img class="m-auto w-full" src="img/proyecto6.png"> 
      </div>

    </div>

</div>

  <!-- Pie de página -->
  <footer >
    <div class="grid grid-cols-12  text-right items-center justify-between px-[5%] ">
    <div class="xs:col-span-12 lg:col-span-4 ">


    </div>

    <div  class="xs:col-span-12 lg:col-span-4">

    </div>

    <div  class="xs:col-span-12 lg:col-span-4 ">

       
    
    </div>
    </div>

    {{-- <div class="grid xs:grid-cols-1 lg:grid-cols-4 px-[5%]   py-10  gap-10 text-white  bg-azulmoviles">
 
      <div class="flex flex-col items-start">
        <a href="{{ route('inicio') }}"> <img src="{{ asset('img/logomundoweb.svg') }}" class="h-full xs:w-40 "> </a>
      </div>
  
      <div>
        <div class="mb-4">
            <h2 class="font-MontserratSemibold mb-1 ">Teléfono</h2>
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