<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mundoweb</title>
  @vite(['resources/css/app.css', 'resources/js/app.js'])
  
  {{-- <link rel="stylesheet" href="{{ asset('css/slick.css') }}">
  <script src="{{ asset('js/slick.min.js') }}"></script> --}}
  {{-- <script src="js/jquery-3.7.1.min.js"></script>
  <script src="js/slick.min.js"></script>  --}}
  {{-- <link src="css/slick-theme.css" /> 
  <link src="css/slick.css" />  --}}
  {{-- <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/> --}}
  
</head>
<body class="font-sans bg-gray-100  " >

    <!-- Encabezado superpuesto -->
    <header class=" text-white px-[5%] fixed w-full z-10 mt-10 h-20 flex justify-between items-center">
      <div class="items-center inline-flex w-3/12 "> 
        <a href="{{ route('inicio') }}"> <img src="{{ asset('img/logomundoweb.svg') }}" class="h-full xs:w-52 xl:w-64 "> </a>
      </div>
    
      <div class="inline-flex items-center w-6/12"> 
        <ul class="flex space-x-6">
          <li>Inicio</li>
          <li>Servicios</li>
          <li>Proyectos</li>
          <li>Contacto</li>
        </ul>
      </div>
    
      <div class="inline-flex items-center w-3/12 justify-center"> 
       <div class="group">
        <a type="button" href="{{ route('contacto') }}" class="text-lg bg-fondoboton text-white px-6 py-3 rounded-full w-auto inline-block text-center  group-hover:pl-3 group-hover:border-4 group-hover:border-white transition-all  duration-500" >
          <span class="group-hover:pr-3 transition-all  duration-500">Quiero mi web </span><img src="{{ asset('img/iconbutton.svg') }}" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block group-hover:rotate-45 transition-all duration-500"></a> 
        </div>   
      </div>
    </header>
    
  
    <!-- Contenido principal -->
    <div class=" grid  grid-cols-2  xs:gap-1 lg:gap-10  xs:min-w-96  xs:h-full lg:h-screen  bg-fondo ">
  
        <!-- Columna 1 (60%) -->
        <div class="xs:col-span-2  lg:col-span-1 w-full h-full  p-4  text-left  flex flex-col justify-center items-center mx-auto">
         
          <div class="items-center  xs:pt-[30%] md:pt-[20%] lg:pt-[5%]  xs:px-[2%] md:px-[8%]">
            <h1 class="xs:text-4xl xl:text-5xl  text-white w-full font-bold ">
              ¡Mundo Web,<br> nuestra pasión,
              tu transformación Digital!
            </h1>
            <p class="xs:text-base xl:text-lg text-white  font-normal mt-6 ">Somos una empresa de desarrollo web joven y dinámica, especializada en transformar ideas en 
              soluciones digitales excepcionales. En Mundo Web, no solo construimos sitios web y aplicativos, 
              sino que creamos experiencias digitales que impulsan el éxito de nuestros clientes.</p>
            <div class="group inline-block">   
              <a type="button" href="{{ route('servicios') }}" class="text-lg bg-fondoboton text-white px-6 py-3 rounded-full w-auto inline-block text-center mt-6  group-hover:pl-3 group-hover:border-4 group-hover:border-white transition-all  duration-500" >
               <span class="group-hover:pr-3 transition-all  duration-500">Servicios</span><img src="{{ asset('img/iconbutton.svg') }}" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block group-hover:rotate-45 transition-all duration-500"></a>  
            </div>
            <div class="grid grid-flow-col auto-cols-max items-center mt-7">
                <ul class="flex -space-x-6 xs:col-span-12 md:col-span-4">
                  <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img/persona1.png') }}"> </li>
                  <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img/persona2.png') }}"> </li>
                  <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img/persona3.png') }}"> </li>
                  <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img/persona4.png') }}"> </li>
                  <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img/persona5.png') }}"> </li>
                </ul>
                <p class="grid xs:col-span-12 md:col-span-8 ml-5 text-white text-lg items-end"><span class="font-bold text-2xl mr-2">100+ </span> Clientes digitalizados</p>
            </div>    
  
          </div>
        </div>
  
        <!-- Columna 2 (40%) -->
        <div class="xs:col-span-2 lg:col-span-1  flex p-8">
           
            <div class="xs:w-[100%] lg:w-[90%] min-h-96 md:h-[90%] rounded-3xl  bg-cover bg-center imagenMundoWeb  justify-center items-center relative ">
              
              <div class=" absolute inset-0 bg-black bg-opacity-60 rounded-3xl flex justify-center items-center">
                <div><a><img class=" items-center flex m-auto hover:scale-75  transition-all  duration-1000	 " src="{{ asset('img/playboton.svg') }}"></a></div>
              </div>
              
            </div>
            
        </div>
  
    </div>
  
    <!-- Pie de página -->
    <footer class=" p-1 h-14 lg:-mt-14 bg-azulmundoweb">
      <div class="carruselfooter ">
        <ul class="flex flex-row gap-4 ">
          <li class="inline-flex  items-center w-1/4 ">
            <img class="rounded-full w-12 float-left" src="{{ asset('img/iconofooter.png') }}">
            <span class="float-left p-3 text-white">Creatividad inspiradora</span>
          </li>
          <li class="inline-flex items-center  w-1/4 ">
            <img class="rounded-full w-12  float-left" src="{{ asset('img/iconofooter.png') }}">
            <span class="float-left p-3 text-white">Colaboración transparente</span>
          </li>
          <li class="inline-flex items-center  w-1/4">
            <img class="rounded-full w-12 float-left" src="{{ asset('img/iconofooter.png') }}">
            <span class="float-left p-3 text-white">Excelencia a medida</span>
          </li>
          <li class="inline-flex items-center  w-1/4">
            <img class="rounded-full w-12 float-left" src="{{ asset('img/iconofooter.png') }}">
            <span class="float-left p-3 text-white">Adaptabilidad digital</span>
          </li>
        </ul>
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
  