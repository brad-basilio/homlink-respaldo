<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agencia de desarrollo web - Mundo Web</title>
  <meta property="og:type" content="website" />
  <meta property="og:title "content="Agencia de desarrollo web - Mundo Web" />
  <meta name="description" content="Somos la agencia de desarrollo web en Perú. Especialistas en diseño y desarrollo de páginas web, con enfoque en posicionamiento SEO. ¡Potencia tu presencia digital con nosotros!">
  <meta property="og:image" content="{{ asset('img/logomundoweb.svg') }}" />
  <meta property="og:url" content="https://mundoweb.pe/" />
  <meta name="keywords" content="Agencia de desarrollo web, Agencia de diseño web, Empresa de desarrollo web, Desarrolladores web, Páginas web Perú, Especialistas en diseño web, Creación de sitios web, Posicionamiento SEO, Empresa de posicionamiento web, Agencia de diseño web en Lima"/>

 
  {{-- @vite(['resources/css/app.css', 'resources/js/app.js'])  --}}
  <link rel="stylesheet" href="{{asset('build/app.css')}}">
  <link rel="stylesheet" href="{{asset('css/slick.css')}}">
  <link rel="stylesheet" href="{{asset('css/slick-theme.css')}}">
  <script src="{{asset('js/jquery.min.js')}}"></script>
  <script src="{{asset('js/slick.min.js')}}"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script  src="https://code.jquery.com/jquery-3.7.1.js"  crossorigin="anonymous"></script>
  <link rel="stylesheet" href="{{ asset('css/styles.css') }}">


      <!-- Google Tag Manager -->
      <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WV7GZ2TK');</script>
        <!-- End Google Tag Manager -->

        <!-- Google tag (gtag.js) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-1Q5HR10EMH"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-1Q5HR10EMH');
      </script>
</head>

<div class="fullscreen-container">
  <video loop muted autoplay  class="fullscreen-video md:block" >
      <source src="../video/videomwdesktop.mp4" type="video/mp4">
  </video>
  <video loop muted autoplay  class="fullscreen-video block md:hidden" >
    <source src="../video/videomwmovil.mp4" type="video/mp4">
</video>
</div>

<body class="font-sans bg-azuloscuro lg:h-screen" >
  <!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WV7GZ2TK"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

    <!-- Encabezado superpuesto -->
    <header class=" text-white px-[5%]  w-full z-10 h-[15%]  flex justify-between items-center ">
      <div class="items-center inline-flex xs:w-6/12 xl:w-3/12 z-50 py-7 "> 
        <a href="{{ route('inicio') }}"> <img src="{{ asset('img/logomundoweb.svg') }}" class="h-full xs:w-64 xl:w-64 "> </a>
      </div>
    
      <nav class="inline-flex items-center xs:w-0/12 xl:w-6/12 xs:hidden xl:block py-7"> 
        <ul class="flex space-x-6 font-MontserratSemibold font-normal">
          <li class="hover:text-mwnaranja"><a href="{{ route('inicio') }}" >Inicio</a></li>
          <li class="hover:text-mwnaranja"><a href="{{ route('servicios') }}" >Servicios</a></li>
          <li class="hover:text-mwnaranja"><a href="{{ route('proyectos') }}" >Proyectos</a></li>
          <a class="hover:underline duration-300" href="{{ route('posts.index') }}">Blog</a>
          <li class="hover:text-mwnaranja"><a href="{{ route('contacto') }}" >Contacto</a></li>
        </ul>
      </nav>
    
      <div class="flex flex-row items-end justify-end  xs:w-6/12 xl:w-3/12  xs:hidden xl:block py-7"> 
       <div class="group flex flex-row items-end justify-end mr-5">
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
     
      <nav class="flex flex-col text-white text-left text-4xl font-bold space-y-4 font-RightgroteskMedium tracking-wider">
          <a class="hover:underline duration-300" href="{{ route('inicio') }}">Inicio</a>
          <a class="hover:underline duration-300" href="{{ route('servicios') }}">Servicios</a>
          <a class="hover:underline duration-300" href="{{ route('proyectos') }}">Proyectos</a>
          <a class="hover:underline duration-300" href="{{ route('posts.index') }}">Blog</a>
          <a class="hover:underline duration-300" href="{{ route('contacto') }}">Contacto</a>
      </nav>
    </div>


    <!-- Contenido principal -->
    <div class=" grid  grid-cols-2  xs:gap-1 lg:gap-10  xs:h-full lg:h-[85%] ">
    
        <!-- Columna 1 (60%) -->
        <div class="xs:col-span-2  lg:col-span-1 w-full h-full  p-4  text-left  flex flex-col justify-start items-center mx-auto ">
         
          <div class=" items-center  pt-[5%] md:pt-[5%] lg:pt-[5%]  xs:px-[2%] md:px-[8%] ">
            <h1 class="text-mwnaranja text-lg   w-full font-semibold font-RightgroteskMedium tracking-wider">Especialistas en diseño web</h1>
            <h2 class="xs:text-4xl lg:text-5xl   text-white w-full font-bold font-RightgroteskMedium tracking-wider">
               Pasión por la <span class="text-mwnaranja">transformación</span><br> digital
            </h2>
            
            <p class="xs:text-base xl:text-base text-white  font-normal mt-6 font-MontserratRegular ">Somos una empresa especializada en el <b>Desarrollo Web</b> y estrategias digitales, 
              como el posicionamiento SEO, para cumplir con tus objetivos. Mundo Web te ofrece la construcción de sitios web, 
              aplicativos móviles, servicios de <b>e-commerce</b> y experiencias digitales que te impulsarán al éxito.</p>
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
                <p class="grid xs:col-span-12 md:col-span-8 ml-5 text-mwnaranja text-base items-end font-MontserratRegular"><span class="font-bold text-2xl mr-2 font-RightgroteskMedium tracking-wide">100+ </span> Clientes digitalizados</p>
            </div>    
  
          </div>
        </div>
  
        <!-- Columna 2 (40%) -->
        <div class="xs:col-span-2 lg:col-span-1  flex p-8">
           
            <div class="w-[100%]  min-h-96 md:h-[80%] rounded-3xl  bg-cover bg-center flex justify-center items-center md:px-[10%]">
             
              <div class="text-left  space-y-2 flex flex-col justify-center items-start px-[8%] pt-[8%] pb-[8%] rounded-2xl bg-fondoform">

                <h2 class="font-RightgroteskMedium text-2xl font-medium"><span class="text-white">Hablemos de tu próximo Proyecto</h2>
                <p class="font-MontserratMedium text-base font-normal text-white"> Crea experiencias digitales que convierten visitantes en clientes leales</p>

               <div class="w-full text-sm">
                <form method="POST" action="{{ route('formhome') }}">
                  @csrf 
                       
                   <div class="grid grid-cols-12 mt-2">
                      
                       <div class="w-full col-span-12 lg:col-span-12  "> 
                         <input class="font-MontserratRegular appearance-none block w-full  bg-inputmw  text-white  border-none rounded-xl py-4 px-3  leading-tight placeholder-slate-300 "  name="nombre" type="text" placeholder="Nombre completo">
                          @error('nombre')
                               <span class="text-red-500 text-base ">{{ $message }}</span>
                         @enderror   
                       </div>

                       <div> 
                        <input class=" font-MontserratRegular appearance-none block w-full bg-fondoinput  text-white  border-none rounded-full py-4 px-4 mb-2 leading-tight placeholder-slate-300 "  name="source" type="hidden" value="Home">  
                      </div>
        
                   </div>
                   
                   <div class="grid grid-cols-12 mt-4 gap-3 ">
       
                       <div class="w-full col-span-12 lg:col-span-6">
                           <input class="font-MontserratRegular appearance-none block w-full bg-inputmw  text-white  border-none rounded-xl py-4 px-3 leading-tight placeholder-slate-300 " name="email" type="email" placeholder="Correo electrónico">
                            @error('email')
                               <span class="text-red-500 text-base ">{{ $message }}</span>
                           @enderror 
                       </div>
       
                       <div class="w-full col-span-12 lg:col-span-6 ">
                           <input class="font-MontserratRegular appearance-none block w-full bg-inputmw  text-white  border-none rounded-xl py-4 px-3 leading-tight placeholder-slate-300 " name="telefono"  type="text" placeholder="Número de teléfono">
                            @error('telefono')
                               <span class="text-red-500 text-base ">{{ $message }}</span>
                           @enderror 
                       </div>
       
                   </div> 
    
       
                   {{-- <div class="grid grid-cols-12 mt-3 gap-3">
       
                        <div class="w-full col-span-12 lg:col-span-6 relative">

                            <div class="col-span-12"> 
                                <select name="tipoproyecto" class="font-MontserratRegular block appearance-none w-full bg-inputmw  text-white py-3 px-3 pr-8 rounded-xl">
                                 
                                    <option class="text-black" value="" selected disabled hidden >Cual es tu cargo</option>
                                    <option class="text-black" value="One page" >One Page</option>
                                    <option class="text-black" value="Landing" >Landing</option>
                                    <option class="text-black" value="E-commerce" >E-commerce</option>
                                    <option class="text-black" value="App móvil" >App móvil</option>
                                
                                </select>
                                
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-7 text-white">
                                    <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                  </div>
                
                                 @error('tipoproyecto')
                                        <span class="text-red-500 text-base ">{{ $message }}</span>
                                    @enderror  
                            </div>  
                            
                        </div>
        
                        <div class="w-full col-span-12 lg:col-span-6 ">
                            <input class="font-MontserratRegular appearance-none block w-full bg-inputmw  text-white  border-none rounded-xl py-3 px-3  leading-tight " name="empresa"  type="text" placeholder="Empresa">
                             @error('telefono')
                                <span class="text-red-500 text-base ">{{ $message }}</span>
                            @enderror 
                        </div>
    
                   </div>  --}}


                <div class="grid grid-cols-12   mt-4">
                      
                       <div class="w-full xs:col-span-12 lg:col-span-12  "> 
                         
                         <input class=" font-MontserratRegular appearance-none block w-full bg-inputmw  text-white  border-none rounded-xl py-4 px-3  leading-tight placeholder-slate-300 "  name="urlweb" type="text" placeholder="https://tu-web.com (opcional)">
                        </div>
                        
                       
                </div>

               
       
         
                   {{-- <p class="text-base  text-white  font-normal mt-3 font-MontserratRegular">
                       ¿Cómo prefieres que te contactemos?
                   </p> --}}
       
                {{-- <div class="grid grid-cols-12  mt-3 gap-6">
       
                       <div class="w-full xs:col-span-12 lg:col-span-6   ">
                          
                           <div class="bg-inputmw  font-MontserratRegular flex items-center ps-4 appearance-none w-full   border-none rounded-xl ">
                               <label for="bordered-radio-1" class="w-[85%] py-3 ms-2 text-base font-normal text-white ">E-mail</label>
                               <input id="bordered-radio-1" type="radio" value="Correo Electrónico" name="tipocontacto" class="h-4 w-[15%]">
                           </div>
       
                      </div>
       
                       <div class="w-full xs:col-span-12 lg:col-span-6 ">
       
                           <div class="bg-inputmw  font-MontserratRegular flex items-center ps-4 appearance-none w-full    border-none rounded-xl ">
                               <label for="bordered-radio-2" class="w-[85%] py-3 ms-2 text-base font-normal text-white ">Teléfono</label>
                               <input  id="bordered-radio-2" type="radio" value="Teléfono" name="tipocontacto" class="w-[15%] h-4" >
                           </div>
                       
                       </div>
                       
                        @error('tipocontacto')
                           <span class="text-red-500 text-base xs:col-span-12 ">{{ $message }}</span>
                       @enderror  
                </div>  --}}


                <div class="group  mt-6" >
                        <button type="submit" href="{{ route('inicio') }}" class="font-MontserratSemibold font-light text-base bg-inputmw  text-white px-3  py-2 rounded-full w-auto inline-block " >
                            Solicitar servicio<img src="{{ asset('img/flechaderecha.svg') }}" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block group-hover:rotate-45 transition-all  duration-500"></button> 
                </div>
                
                @if(Session::has('mensaje'))
                  <div class="grid grid-cols-12 pt-6">     
                     <div class="w-full xs:col-span-12 lg:col-span-12  "> 
                          <span class="text-white text-lg animate-fade-down  bg-mwnaranja rounded-xl pt-2 pb-3 px-3">Gracias, nos contactaremos contigo, {{session()->get('name')}} </span>
                        </div>    
                  </div>
                @endif

                 </form>
               </div>
            </div>
           
            </div> 
        </div>
    </div>

    <a href="https://api.whatsapp.com/send?phone=51908857558&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20." class="fixed bottom-28 left-2 md:left-5 z-50 animate-wiggle animate-infinite animate-delay-[5ms] animate-ease-in  float-right block bg-none" target="_blank">
      <img src="{{ asset('img/wspf.svg') }}" class="w-16" />
      </a>
    
      <div id="menu" class="fixed z-40 w-0 h-0 flex justify-center items-center bg-azulanding opacity-0 duration-700 ">
     
        <div class="flex flex-col text-white text-left text-4xl font-bold space-y-4 font-RightgroteskMedium tracking-wider">
            <a class="hover:underline duration-300" href="{{ route('inicio') }}">Inicio</a>
            <a class="hover:underline duration-300" href="{{ route('servicios') }}">Servicios</a>
            <a class="hover:underline duration-300" href="{{ route('proyectos') }}">Proyectos</a>
            <a class="hover:underline duration-300" href="{{ route('contacto') }}">Contacto</a>
        </div>
      </div>
    <!-- Pie de página -->
    {{-- <footer class="z-10 col-span-2">
      
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
     </footer> --}}

     <footer  class="z-10 col-span-2" >
      <div class="px-1 py-2 h-20 lg:-mt-20 bg-azulmundoweb">
          <div  x-data="{}"
          x-init="$nextTick(() => {
              let ul = $refs.logos;
              ul.insertAdjacentHTML('afterend', ul.outerHTML);
              ul.nextSibling.setAttribute('aria-hidden', 'true');
          })"
          class="px-[5%]  bg-azulmw w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]"> 
              <ul x-ref="logos" class="h-16 flex flex-row justify-between items-center  [&_li]:mx-10   animate-infinite-scroll">
              
                <li class="w-32 py-8"><img class="object-contain" src="{{ asset('img/Logo1.svg') }}"/></li>
                <li class="w-32 py-8"><img class="object-contain" src="{{ asset('img/Logo2.svg') }}"/></li>
                <li class="w-32 py-8"><img class="object-contain" src="{{ asset('img/Logo3.svg') }}"/></li>
                <li class="w-32 py-8"><img class="object-contain" src="{{ asset('img/Logo4.svg') }}"/></li>
                <li class="w-32 py-8"><img class="object-contain" src="{{ asset('img/Logo5.svg') }}"/></li>
                <li class="w-32 py-8"><img class="object-contain" src="{{ asset('img/Logo6.svg') }}"/></li>
              
              </ul>

              <ul x-ref="logos" class="h-16 flex flex-row justify-between items-center  [&_li]:mx-10   animate-infinite-scroll" aria-hidden="true">
              
                <li class="w-32 py-8"><img class="object-contain" src="{{ asset('img/Logo1.svg') }}"/></li>
                <li class="w-32 py-8"><img class="object-contain" src="{{ asset('img/Logo2.svg') }}"/></li>
                <li class="w-32 py-8"><img class="object-contain" src="{{ asset('img/Logo3.svg') }}"/></li>
                <li class="w-32 py-8"><img class="object-contain" src="{{ asset('img/Logo4.svg') }}"/></li>
                <li class="w-32 py-8"><img class="object-contain" src="{{ asset('img/Logo5.svg') }}"/></li>
                <li class="w-32 py-8"><img class="object-contain" src="{{ asset('img/Logo6.svg') }}"/></li>
              
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