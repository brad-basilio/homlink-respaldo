<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mundoweb</title>
  
  {{-- @vite(['resources/css/app.css', 'resources/js/app.js'])  --}}
  <link rel="stylesheet" href="{{asset('build/app.css')}}">
  <link rel="stylesheet" href="{{asset('css/slick.css')}}">
  <link rel="stylesheet" href="{{asset('css/slick-theme.css')}}">
  <script src="{{asset('js/jquery.min.js')}}"></script>
  <script src="{{asset('js/slick.min.js')}}"></script>
  <link rel="stylesheet" href="{{ asset('css/styles.css') }}">


</head>
<body class="font-sans bg-fondo lg:h-screen" >

    <!-- Encabezado superpuesto -->
    <header class=" text-white px-[5%]  w-full z-10 h-[15%]  flex justify-between items-center ">
      <div class="items-center inline-flex xs:w-6/12 xl:w-3/12 z-50 py-7 "> 
        <a href="{{ route('inicio') }}"> <img src="{{ asset('img/logomundoweb.svg') }}" class="h-full xs:w-64 xl:w-64 "> </a>
      </div>
    
      <div class="inline-flex items-center xs:w-0/12 xl:w-6/12 xs:hidden xl:block py-7"> 
        <ul class="flex space-x-6 font-MontserratSemibold font-normal">
          <li><a href="{{ route('inicio') }}" >Inicio</a></li>
          <li><a href="{{ route('servicios') }}" >Servicios</a></li>
          <li><a href="{{ route('proyectos') }}" >Proyectos</a></li>
          <li><a href="{{ route('contacto') }}" >Contacto</a></li>
        </ul>
      </div>
    
      <div class="inline-flex items-center xs:w-6/12 xl:w-3/12 justify-center xs:hidden xl:block py-7"> 
       <div class="group">
        <a type="button" href="{{ route('contacto') }}" class="text-lg bg-fondoboton text-white px-6 py-3 rounded-full w-auto inline-block text-center  group-hover:pl-3 group-hover:border-4 group-hover:border-white transition-all  duration-500" >
          <span class="group-hover:pr-3 transition-all  duration-500 font-MontserratSemibold text-base">Quiero mi web </span><img src="{{ asset('img/iconbutton.svg') }}" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block group-hover:rotate-45 transition-all duration-500"></a> 
        </div>   
      </div>
    

      <div class="inline-flex items-center xs:w-4/12 xl:w-3/12 justify-end xs:block xl:hidden z-50 py-7"> 
        <div class="group " id="botonmenu">
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
    
    
    <div id="menu" class="fixed z-40 w-0 h-0 flex justify-center items-center bg-azulanding opacity-0 duration-700 ">
     
      <div class="flex flex-col text-white text-left text-4xl font-bold space-y-4 font-RightgroteskMedium tracking-wider">
          <a class="hover:underline duration-300" href="{{ route('inicio') }}">Inicio</a>
          <a class="hover:underline duration-300" href="{{ route('servicios') }}">Servicios</a>
          <a class="hover:underline duration-300" href="{{ route('proyectos') }}">Proyectos</a>
          <a class="hover:underline duration-300" href="{{ route('contacto') }}">Contacto</a>
      </div>
    </div>


    <!-- Contenido principal -->
    <div class=" grid  grid-cols-2  xs:gap-1 lg:gap-10  xs:h-full lg:h-[85%]     bg-fondo  ">
  
        <!-- Columna 1 (60%) -->
        <div class="xs:col-span-2  lg:col-span-1 w-full h-full  p-4  text-left  flex flex-col justify-start items-center mx-auto ">
         
          <div class="items-center  xs:pt-[5%] md:pt-[5%] lg:pt-[5%]  xs:px-[2%] md:px-[8%] ">
            <h1 class="xs:text-4xl lg:text-5xl   text-white w-full font-bold font-RightgroteskMedium tracking-wider">
              ¡Mundo Web,<br> nuestra pasión,
              tu transformación Digital!
            </h1>
            <p class="xs:text-base xl:text-base text-white  font-normal mt-6 font-MontserratRegular ">Somos una empresa de desarrollo web joven y dinámica, especializada en transformar ideas en 
              soluciones digitales excepcionales. En Mundo Web, no solo construimos sitios web y aplicativos, 
              sino que creamos experiencias digitales que impulsan el éxito de nuestros clientes.</p>
            <div class="group inline-block">   
              <a type="button" href="{{ route('servicios') }}" class="text-lg bg-fondoboton text-white px-6 py-3 rounded-full w-auto inline-block text-center mt-6  group-hover:pl-3 group-hover:border-4 group-hover:border-white transition-all  duration-500" >
               <span class="group-hover:pr-3 transition-all  duration-500 font-MontserratSemibold">Servicios</span><img src="{{ asset('img/iconbutton.svg') }}" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block group-hover:rotate-45 transition-all duration-500"></a>  
            </div>
            <div class="grid grid-flow-col auto-cols-max items-center xs:mt-10 md:my-10">
                <ul class="flex -space-x-6 xs:col-span-12 md:col-span-4">
                  <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img/persona1.png') }}"> </li>
                  <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img/persona2.png') }}"> </li>
                  <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img/persona3.png') }}"> </li>
                  <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img/persona4.png') }}"> </li>
                  <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img/persona5.png') }}"> </li>
                </ul>
                <p class="grid xs:col-span-12 md:col-span-8 ml-5 text-white text-base items-end font-MontserratRegular"><span class="font-bold text-2xl mr-2 font-RightgroteskMedium tracking-wide">100+ </span> Clientes digitalizados</p>
            </div>    
  
          </div>
        </div>
  
        <!-- Columna 2 (40%) -->
        <div class="xs:col-span-2 lg:col-span-1  flex p-8">
           
            <div class="xs:w-[100%] lg:w-[90%] min-h-96 md:h-[85%] rounded-3xl  bg-cover bg-center imagenMundoWeb flex justify-center items-center ">
              <div><a><img class=" items-center flex  m-auto hover:scale-75  transition-all  duration-1000	" src="{{ asset('img/playboton.svg') }}"></a></div>
              {{-- <div class="inset-0 bg-black bg-opacity-60 rounded-3xl flex justify-center items-center  ">
                <div><a><img class=" items-center flex  m-auto hover:scale-75  transition-all  duration-1000	" src="{{ asset('img/playboton.svg') }}"></a></div>
              </div> --}}
              
            </div>
            
        </div>
  

        

    </div>

   
    <a href="https://api.whatsapp.com/send?phone=51934464915&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20." class="fixed bottom-28 right-5 z-50 animate-wiggle animate-infinite animate-delay-[5ms] animate-ease-in  float-right block bg-none" target="_blank">
      <img src="{{ asset('img/wspf.png') }}" class="md:w-56 w-40" />
      </a>
    

    <!-- Pie de página -->
    <footer class="z-10 col-span-2">
      
      <div class="px-1 py-2 h-16 lg:-mt-16 bg-azulmundoweb mododev  ">
        <div class="carruselfooter ">
           <ul class="flex flex-row gap-4 font-MontserratRegular text-sm">
             <li class="inline-flex  items-center w-1/4 ">
               <img class="rounded-full w-12 float-left" src="{{ asset('img/lapiz.png') }}">
               <span class="float-left p-3 text-white">Creatividad inspiradora</span>
             </li>
             <li class="inline-flex items-center  w-1/4 ">
               <img class="rounded-full w-12  float-left" src="{{ asset('img/manos.png') }}">
               <span class="float-left p-3 text-white ">Colaboración transparente</span>
             </li>
             <li class="inline-flex items-center  w-1/4">
               <img class="rounded-full w-12 float-left" src="{{ asset('img/regla.png') }}">
               <span class="float-left p-3 text-white ">Excelencia a medida</span>
             </li>
             <li class="inline-flex items-center  w-1/4 ">
               <img class="rounded-full w-12 float-left" src="{{ asset('img/edificios.png') }}">
               <span class="float-left p-3 text-white ">Adaptabilidad digital</span>
             </li>
           </ul>
         </div>
       </div>
     </footer>
  
    
  
  </body>
</html>


<script type="text/javascript">         
    
    $(document).ready(function(){
        
      $('.carruselfooter ul ').slick({
            autoplay: true, 
            autoplaySpeed: 1000, 
            speed: 4000,
            slidesToShow: 3,
            centerMode: true,
            slidesToScroll: 1,
            arrows: false,
            adaptivew: true,
            responsive: [
              {
                breakpoint: 650,  // Tamaño de pantalla md (ejemplo, puedes ajustar según tus necesidades)
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
        });
  
        
        
    });
  </script>
  

  
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
            menu.classList.add("w-screen", "h-screen", "opacity-100", "-mt-30");
        }

        
        estado = !estado;
  });

}); 

</script>