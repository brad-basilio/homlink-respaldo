<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mundoweb - Contacto</title>
    @vite(['resources/css/app.css'])
    <!-- <script src="https://cdn.tailwindcss.com"></script> -->
    {{-- <link href="./output.css" rel="stylesheet">
    <script src="../resource/js/jquery-3.7.1.min.js"></script>
    <script src="../resource/js/slick.min.js"></script>  --}}
    <!-- <link src="../resource/css/slick-theme.css" /> 
    <link src="../resource/css/slick.css" /> -->
  
    {{-- <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/> --}}
   
</head>


<body class="font-sans  bg-azulform textura " >
  
</div> 
<div class=" inset-0 bg-azulform bg-opacity-80">
  <!-- Encabezado superpuesto -->
  <header class=" text-white px-[5%]  w-full  xs:pt-10 lg:pt-20 h-20 flex justify-between items-center">
    <div class="items-center inline-flex xs:w-6/12 xl:w-3/12 "> 
      <a href="{{ route('inicio') }}"><img src="img/logomundoweb.svg" class="h-full xs:w-52 xl:w-64 "> </a>
    </div>
  
    <div class="inline-flex items-center xs:w-0/12 xl:w-6/12"> 
        asdadasdasdas
    </div>
  
    <div class="inline-flex items-center xs:w-6/12 xl:w-3/12 justify-end"> 
     <div class="group">
        <a type="button" class=" float-right text-lg bg-fondoboton text-white px-2 py-3 rounded-full w-auto inline-block  group-hover:pl-3 group-hover:border-4 group-hover:border-white transition-all  duration-500" >
            <img src="img/menu-03.svg" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block  "></a> 


            <div>
                <input type="checkbox" id="active">
                <label for="active" class="menu-btn"><i class="fas fa-bars"></i></label>
                <div class="wrapper">
                   <ul>
                      <li><a href="#">Inicio</a></li>
                      <li><a href="#">Servicios</a></li>
                      <li><a href="#">Proyectos</a></li>
                      <li><a href="#">Contacto</a></li>
                   </ul>
              </div>  
            </div>
            
    </div>   

   
  </header>
  

  <!-- Contenido principal -->
  <div class=" grid  grid-cols-12 xs:min-w-96  xs:h-full px-[5%] gap-12">

      <!-- Columna 1 (60%) -->
      <div class="xs:col-span-12  lg:col-span-8 w-full h-full  p-4  text-left  flex flex-col justify-center items-center mx-auto">
       
        <div class="items-center  xs:py-[5%] md:py-[8%] lg:py-[10%]  ">
         <form method="POST" action="{{ route('guardarcontacto') }}">
          @csrf
          <h1 class="xs:text-4xl xl:text-6xl  text-white w-full font-bold  ">
            ¡Estamos Aquí para Ayudarte!
          </h1>
          <p class="xs:text-base xl:text-lg text-white  font-normal mt-10">
            ¿Tienes preguntas sobre nuestros servicios o estás listo para comenzar tu proyecto? 
            Llena el formulario a continuación y nos pondremos en contacto contigo en breve.
          </p>
          
          

            <h2 class="xs:text-lg xl:text-2xl text-white  font-bold mt-10">
                Información Personal
            </h2>

            <div class="grid grid-cols-12  mb-6 mt-8">
               
                <div class="w-full xs:col-span-12 lg:col-span-12  "> 
                  <input class="appearance-none block w-full bg-fondoinput  text-white  border-none rounded-full py-4 px-4 mb-3 leading-tight "  name="nombre" type="text" placeholder="Nombre completo">
                  @error('nombre')
                        <span class="text-red-500 text-base ">{{ $message }}</span>
                  @enderror  
                </div>
 
            </div>
            
            <div class="grid grid-cols-12  mb-6 mt-8 gap-6">

                <div class="w-full xs:col-span-12 lg:col-span-6 ">
                    <input class="appearance-none block w-full bg-fondoinput  text-white  border-none rounded-full py-4 px-4 mb-3 leading-tight " name="email" type="email" placeholder="Correo electrónico">
                    @error('email')
                        <span class="text-red-500 text-base ">{{ $message }}</span>
                    @enderror
                </div>

                <div class="w-full xs:col-span-12 lg:col-span-6 ">
                    <input class="appearance-none block w-full bg-fondoinput  text-white  border-none rounded-full py-4 px-4 mb-3 leading-tight " name="telefono"  type="number" placeholder="Número de teléfono">
                    @error('telefono')
                        <span class="text-red-500 text-base ">{{ $message }}</span>
                    @enderror
                </div>

            </div> 


            <h2 class="xs:text-lg xl:text-2xl text-white  font-bold mt-10">
                Sobre tu proyecto
            </h2>

            <p class="xs:text-base xl:text-lg text-white  font-normal mt-2">
                ¿Qué tipo de proyecto necesitas?
            </p>

            <div class="grid grid-cols-12  mt-8 relative">
              <div class="col-span-12"> 
                <select name="tipoproyecto" class="block appearance-none w-full bg-fondoinput  text-white py-4 px-4 pr-8 rounded-full">
                    <option class="text-black" value="" selected disabled hidden >Selecciona el tipo de página</option>
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

            <h2 class="xs:text-lg xl:text-2xl text-white  font-bold mt-10">
                Mensaje o Detalles del Proyecto
            </h2>

            <div class="grid grid-cols-12  mb-6 mt-8">
               
                <div class="w-full xs:col-span-12 lg:col-span-12  "> 
                  <textarea rows="6" name="mensaje" class=" appearance-none block w-full bg-fondoinput  text-white  border-none rounded-2xl   py-4 px-4 mb-3 leading-tight "  type="textarea" placeholder="Nombre completo"></textarea>
                </div>
 
            </div>

            <h2 class="xs:text-lg xl:text-2xl text-white  font-bold mt-10">
                Preferencias de Contacto
            </h2>
            
            <p class="xs:text-base xl:text-lg text-white  font-normal mt-2">
                ¿Cómo Prefieres que te Contactemos?
            </p>

            <div class="grid grid-cols-12  mb-6 mt-8 gap-6">

                <div class="w-full xs:col-span-12 lg:col-span-6 ">
                   
                    <div class="flex items-center ps-4 appearance-none w-full bg-fondoinput   border-none rounded-full ">
                        <label for="bordered-radio-1" class="w-[85%] py-4 ms-2 text-base font-normal text-white ">Correo Electrónico</label>
                        <input id="bordered-radio-1" type="radio" value="Correo Electrónico" name="tipocontacto" class="h-4 w-[15%]">
                    </div>

                </div>

                <div class="w-full xs:col-span-12 lg:col-span-6 ">

                    <div class="flex items-center ps-4 appearance-none w-full bg-fondoinput    border-none rounded-full ">
                        <label for="bordered-radio-2" class="w-[85%] py-4 ms-2 text-base font-normal text-white ">Teléfono</label>
                        <input  id="bordered-radio-2" type="radio" value="Teléfono" name="tipocontacto" class="w-[15%] h-4" >
                    </div>
                
                </div>
                
                @error('tipocontacto')
                    <span class="text-red-500 text-base xs:col-span-12 ">{{ $message }}</span>
                @enderror 
            </div> 

            <h2 class="xs:text-lg xl:text-2xl text-white  font-bold mt-10">
                Horario Preferido para Contacto
            </h2>
            
            <p class="xs:text-base xl:text-lg text-white  font-normal mt-2">
                ¿En qué horario prefieres que te contactemos?
            </p>
            
  
            <div class="grid grid-cols-12  mb-6 mt-8 gap-6">

                <div class="w-full xs:col-span-12 lg:col-span-6 ">
                   
                    <div class="flex items-center ps-4 appearance-none w-full bg-fondoinput   border-none rounded-full ">
                        <label for="bordered-radio-3" class="w-[85%] py-4 ms-2 text-base font-normal text-white ">09:00 AM - 11:00 AM</label>
                        <input id="bordered-radio-3" type="radio" value="09:00 AM - 11:00 AM" name="horacontacto" class="h-4 w-[15%]">
                    </div>

                </div>

                <div class="w-full xs:col-span-12 lg:col-span-6 ">

                    <div class="flex items-center ps-4 appearance-none w-full bg-fondoinput    border-none rounded-full ">
                        <label for="bordered-radio-4" class="w-[85%] py-4 ms-2 text-base font-normal text-white ">11:00 AM - 01:00 PM</label>
                        <input  id="bordered-radio-4" type="radio" value="11:00 AM - 01:00 PM" name="horacontacto" class="w-[15%] h-4" >
                    </div>
                
                </div>

                <div class="w-full xs:col-span-12 lg:col-span-6 ">
                   
                    <div class="flex items-center ps-4 appearance-none w-full bg-fondoinput   border-none rounded-full ">
                        <label for="bordered-radio-5" class="w-[85%] py-4 ms-2 text-base font-normal text-white ">01:00 PM - 03:00 PM</label>
                        <input id="bordered-radio-5" type="radio" value="01:00 PM - 03:00 PM" name="horacontacto" class="h-4 w-[15%]">
                    </div>

                </div>

                <div class="w-full xs:col-span-12 lg:col-span-6 ">

                    <div class="flex items-center ps-4 appearance-none w-full bg-fondoinput    border-none rounded-full ">
                        <label for="bordered-radio-6" class="w-[85%] py-4 ms-2 text-base font-normal text-white ">03:00 PM - 05:00 PM</label>
                        <input  id="bordered-radio-6" type="radio" value="03:00 PM - 05:00 PM" name="horacontacto" class="w-[15%] h-4" >
                    </div>
                
                </div>

                    @error('horacontacto')
                        <span class="text-red-500 text-base xs:col-span-12 ">{{ $message }}</span>
                    @enderror 
            </div> 



            <h2 class="xs:text-lg xl:text-1xl text-white  font-bold mt-10">
                Nota
            </h2>
            
            <p class="xs:text-base xl:text-base text-white  font-normal mt-2">
                Toda la información proporcionada se mantiene confidencial y 
                solo se utilizará para ponernos en contacto contigo en relación con tu consulta.
            </p>

            <div class="group mt-8 inline-block ">   
                <button type="submit" href="{{ route('contacto') }}" class="text-lg bg-fondoboton text-white  px-6 py-3 rounded-full w-auto inline-block text-center mt-6  group-hover:pr-3 group-hover:border-4 group-hover:border-white transition-all  duration-250" >
                 <span class="group-hover:pr-3 transition-all  duration-500">Enviar solicitud</span><img src="{{ asset('img/iconbutton.svg')}}" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block  group-hover:rotate-45 transition-all duration-500"></button>  
              </div>

          </form>


        </div>
      </div>

      <!-- Columna 2 (40%) -->
      <div class="xs:col-span-12 lg:col-span-4  flex  flex-col justify-center items-center mx-auto ">
         
        <div class="xs:w-[100%] lg:w-[100%] min-h-96 md:h-[100%]   ">
            
            <h2 class="xs:text-lg xl:text-2xl text-white  font-bold mt-10">
                Dirección
            </h2>

            <p class="xs:text-base xl:text-lg text-white  font-normal mt-2">
                123 Calle Innovación, Suite 456<br>
                Ciudad Tecnológica, CT 78901<br>
                Perú
             </p>

             <h2 class="xs:text-lg xl:text-2xl text-white  font-bold mt-10">
                Teléfono
            </h2>

            <p class="xs:text-base xl:text-lg text-white  font-normal mt-2">
                +51 976 515 983<br>
                01 456 8265
             </p>

             <h2 class="xs:text-lg xl:text-2xl text-white  font-bold mt-10">
                Correo Electrónico:
            </h2>

            <p class="xs:text-base xl:text-lg text-white  font-normal mt-2">
                Contacto@mundoweb.com.pe
             </p>  
             
             <h2 class="xs:text-lg xl:text-2xl text-white  font-bold mt-10">
                Horario de Atención
            </h2>

            <p class="xs:text-base xl:text-lg text-white  font-normal mt-2">
                Lunes a Viernes<br>
                9:00 AM - 6:00 PM
             </p> 

             <h2 class="xs:text-lg xl:text-2xl text-white  font-bold mt-10">
                ¿Prefieres Visitar nuestra Oficina?
            </h2>

            <p class="xs:text-base xl:text-lg text-white  font-normal mt-2">
                Estamos ubicados en el vibrante corazón de Ciudad Tecnológica. ¡Ven a saludarnos!
             </p>

             <div class="group">
                <a type="button" class="text-lg bg-fondoboton text-white px-3 py-2 mt-10 rounded-full w-auto inline-block text-center  group-hover:pl-3 group-hover:border-4 group-hover:border-white transition-all  duration-500" >
                  <span class="group-hover:pr-3 transition-all  duration-500">Ver mapa </span><img src="img/iconbutton.svg" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block group-hover:rotate-45 transition-all duration-75"></a> 
            </div> 
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