<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mundoweb - Landing</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <!-- <script src="https://cdn.tailwindcss.com"></script> -->
    <link href="./output.css" rel="stylesheet">
    <script src="../resource/js/jquery-3.7.1.min.js"></script>
    <script src="../resource/js/slick.min.js"></script> 
    <!-- <link src="../resource/css/slick-theme.css" /> 
    <link src="../resource/css/slick.css" /> -->
  
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/>
   
</head>


<body class="font-sans  bg-azulanding textura " >
<div class=" inset-0 bg-azulanding bg-opacity-75  ">
  <!-- Encabezado superpuesto -->
  <header class=" text-white px-[5%]  w-full  xs:pt-10 lg:pt-20 h-20 flex justify-between items-center">
    <div class="items-center inline-flex w-3/12 "> 
      <a href="{{ route('inicio') }}"> <img src="{{ asset('img/logomundoweb.svg')}}" class="h-full xs:w-52 xl:w-64 "> </a> 
    </div>
  
    <div class="inline-flex items-center w-6/12"> 
      
    </div>
  
    <div class="inline-flex items-center w-3/12 justify-end"> 
     <div class="group">
        <a type="button" class=" float-right text-lg bg-fondoboton text-white px-2 py-3 rounded-full w-auto inline-block  group-hover:pl-3 group-hover:border-4 group-hover:border-white transition-all  duration-500" >
            <img src="{{ asset('img/menu-03.svg')}}" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block  "></a> 
      </div>   
    </div>
  </header>
  

  <!-- Contenido principal -->
  <div class=" grid  grid-cols-12 xs:min-w-96  xs:h-full  ">

      <!-- Columna 1 (60%) -->
      <div class="xs:col-span-12  lg:col-span-5 w-full h-full  p-4  text-left  flex flex-col justify-center items-center mx-auto">
       
        <div class="items-center  xs:py-[5%] md:py-[8%] lg:py-[27%]  xs:px-[2%] md:px-[8%] ">
          <h1 class="xs:text-4xl xl:text-6xl  text-white w-full font-bold  ">
            Landing Page:<br>Convierte visitantes en clientes potenciales con Landing Pages estratégicas
          </h1>
          <p class="xs:text-base xl:text-lg text-white  font-normal mt-10">Diseño cautivador y llamadas a la acción efectivas para impulsar conversiones.
             ¡Optimiza tu presencia digital y potencia tus campañas!</p>
          <div class="group  mt-8 inline-block">   
            <a type="button" href="{{ route('contacto') }}" class="text-lg bg-fondoboton text-white px-6 py-3 rounded-full w-auto inline-block text-center mt-6  group-hover:pl-3 group-hover:border-4 group-hover:border-white transition-all  duration-500" >
             <span class="group-hover:pr-3 transition-all  duration-500">Quiero mi Landing Page</span><img src="{{ asset('img/iconbutton.svg')}}" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block group-hover:rotate-45 transition-all duration-500"></a>  
          </div>
          

        </div>
      </div>

      <!-- Columna 2 (40%) -->
      <div class="xs:col-span-12 lg:col-span-7  flex ">
         
          <div class="xs:w-[100%] lg:w-[100%] min-h-96 xs:py-64 xs:hidden lg:block md:h-[100%] fondolanding bg-cover bg-center  object-contain justify-center items-center relative ">
               
          </div>
          <div class="xs:w-[100%] lg:w-[100%] md:h-[100%]  xs:py-2 xs:block lg:hidden  justify-center items-center relative">
            <img class="w-full h-[100%] object-cover self-start" src="{{ asset('img/fondolanding.png')}}">
         </div>
      </div>

  </div>

  <!-- Pie de página -->
  <footer class="grid grid-cols-12 h-auto text-right items-center justify-between px-[5%] pb-[3%] pt-[1%]">
   
    <div class="xs:col-span-12 lg:col-span-4 ">

       <div class="flex justify-start"> 
          <div class="group ">
            <a type="button" href="{{ route('onepage') }}" class="rounded-full w-auto inline-block" >
                <img src="{{ asset('img/arrowleftup.svg')}}" alt="Flecha a la derecha" class="h-16 w-16  inline-block group-hover:-rotate-45 transition-all duration-500"></a>  
          </div>  
        </div>

    </div>

    <div  class="xs:col-span-12 lg:col-span-4">

    </div>

    <div  class="xs:col-span-12 lg:col-span-4 ">

        <div class="group  items-center  justify-end inline-block">   
            <a type="button" href="{{ route('ecommercepage') }}" class=" text-lg  text-white  rounded-full w-auto inline-block text-center   group-hover:pl-3   transition-all  duration-500 " >
            <span class="group-hover:pr-3 transition-all  duration-500">Servicio: E-Commerce</span><img src="{{ asset('img/arrowright.svg')}}" alt="Flecha a la derecha" class="h-12 w-12 ml-2 inline-block group-hover:rotate-45 transition-all duration-500"></a>  
        </div>
    
    </div>

  </footer>

  
</div>
</body>
</html>