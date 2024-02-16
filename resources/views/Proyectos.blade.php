<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mundoweb - Proyectos</title>
    @vite(['resources/css/app.css'])
    <!-- <script src="https://cdn.tailwindcss.com"></script> -->
    <link href="./output.css" rel="stylesheet">
    <script src="../resource/js/jquery-3.7.1.min.js"></script>
    <script src="../resource/js/slick.min.js"></script> 
    <!-- <link src="../resource/css/slick-theme.css" /> 
    <link src="../resource/css/slick.css" /> -->
  
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/>
   
</head>


<body class="font-sans  bg-azulmoviles textura " >
<div class=" inset-0 bg-azulmoviles bg-opacity-30  ">
  <!-- Encabezado superpuesto -->
  <header class=" text-white px-[5%]  w-full  xs:pt-10 lg:pt-20 h-20 flex justify-between items-center">
    <div class="items-center inline-flex xs:w-6/12 xl:w-3/12"> 
      <a href="{{ route('inicio') }}"> <img src="img/logomundoweb.svg" class="h-full xs:w-52 xl:w-64 "> </a>
    </div>
  
    <div class="inline-flex items-center xs:w-0/12 xl:w-6/12"> 
      
    </div>
  
    <div class="inline-flex items-center xs:w-6/12 xl:w-3/12 justify-end"> 
     <div class="group">
        <a type="button" class=" float-right text-lg bg-fondoboton text-white px-2 py-3 rounded-full w-auto inline-block  group-hover:pl-3 group-hover:border-4 group-hover:border-white transition-all  duration-500" >
            <img src="img/menu-03.svg" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block  "></a> 
      </div>   
    </div>
  </header>
  

  
  <div class= "grid  grid-cols-12 xs:min-w-96  xs:h-full  ">

      <!-- Columna 1 (60%) -->
      <div class="xs:col-span-12  lg:col-span-8 w-full h-full  p-4  text-left  flex flex-col justify-center items-center mx-auto">
       
        <div class="items-center  xs:pt-[5%] md:pt-[8%] lg:pt-[10%]  xs:px-[2%] md:px-[8%] ">
          <h1 class="xs:text-4xl xl:text-6xl  text-white w-full font-bold  ">
            Portafolio: Nuestra Galería de Éxitos Digitales
          </h1>
          <p class="xs:text-base xl:text-lg text-white  font-normal mt-10">
            Cada proyecto es una historia de éxito. Sumérgete en nuestra galería de trabajos excepcionales 
            que no solo cumplen sino que superan las expectativas. Desde One Page cautivadoras hasta experiencias 
            E-commerce inolvidables, nuestro portafolio refleja nuestra dedicación a la innovación y la calidad.</p>
          <div class="mt-10 flex flex-wrap gap-8">   
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

  <div class=" grid  grid-cols-12 xs:min-w-96  xs:h-full  ">

   
    <div class="xs:col-span-12  lg:col-span-6 w-full h-full  p-4   flex flex-col justify-center  mx-auto">
     
      <div class="xs:w-[100%] lg:w-[100%] min-h-96 md:h-[100%]  justify-center items-center relative ">
       
            <img class="m-auto" src="img/proyecto1.png"> 

      </div>

    </div>

    
    <div class="xs:col-span-12 lg:col-span-6  w-full h-full p-4   flex flex-col justify-center  mx-auto ">
       
      <div class="xs:w-[100%] lg:w-[100%] min-h-96 md:h-[100%]  justify-center items-center relative ">
         
        <img class="m-auto" src="img/proyecto2.png">

      </div>

    </div>

</div>

<div class=" grid  grid-cols-12 xs:min-w-96  xs:h-full  ">

   
    <div class="xs:col-span-12  lg:col-span-6 w-full h-full  p-4   flex flex-col justify-center  mx-auto">
     
      <div class="xs:w-[100%] lg:w-[100%] min-h-96 md:h-[100%]  justify-center items-center relative ">
       
            <img class="m-auto" src="img/proyecto3.png"> 

      </div>

    </div>

    
    <div class="xs:col-span-12 lg:col-span-6  w-full h-full p-4   flex flex-col justify-center  mx-auto ">
       
      <div class="xs:w-[100%] lg:w-[100%] min-h-96 md:h-[100%]  justify-center items-center relative ">
         
        <img class="m-auto" src="img/proyecto4.png">

      </div>

    </div>

</div>



<div class=" grid  grid-cols-12 xs:min-w-96  xs:h-full  ">

   
    <div class="xs:col-span-12  lg:col-span-6 w-full h-full  p-4   flex flex-col justify-center  mx-auto">
     
      <div class="xs:w-[100%] lg:w-[100%] min-h-96 md:h-[100%]  justify-center items-center relative ">
       
            <img class="m-auto" src="img/proyecto5.png"> 

      </div>

    </div>

    
    <div class="xs:col-span-12 lg:col-span-6  w-full h-full p-4   flex flex-col justify-center  mx-auto ">
       
      <div class="xs:w-[100%] lg:w-[100%] min-h-96 md:h-[100%]  justify-center items-center relative ">
         
        <img class="m-auto" src="img/proyecto6.png">

      </div>

    </div>

</div>

  <!-- Pie de página -->
  <footer class="grid grid-cols-12  text-right items-center justify-between px-[5%] ">
   
    <div class="xs:col-span-12 lg:col-span-4 ">


    </div>

    <div  class="xs:col-span-12 lg:col-span-4">

    </div>

    <div  class="xs:col-span-12 lg:col-span-4 ">

       
    
    </div>

  </footer>

  
</div>
</body>
</html>