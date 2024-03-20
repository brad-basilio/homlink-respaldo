<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mundoweb</title>
    
        <script src="{{asset('js/jquery.min.js')}}"></script>

        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"/>
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="{{asset('build/app.css')}}">
        <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
</head>
<body >
<div class="bg-texturaecommerce bg-azulfondo bg-center bg-no-repeat bg-cover ">
  
    <header class="px-[5%]">
        <div class="header_top"></div>   

        <div class="header_middle grid grid-cols-12 h-28 ">
            <div class="block_left col-span-7 md:col-span-5 flex items-end justify-start ">
                <a href="{{ route('landingecommerce') }}">
                <img class="w-52" src="{{ asset('img_landingmundoweb/logowhitemw.svg') }}"/>
                </a>
            </div>

            <div class="block_center col-span-1 md:col-span-2 py-10 flex flex-col justify-center items-end font-RightgroteskMedium">
              
            </div>

            <div class="block_right col-span-4  md:col-span-5  flex flex-row items-end justify-end pl-2 ">
                         
                <div class="group hidden md:block font-MontserratSemibold ">
                    <a href="{{ route('inicio') }}" type="button" class=" float-right text-base lg:text-lg bg-azulecommerboton text-white px-2 lg:px-4 py-3 rounded-full w-auto inline-block " >
                        Visita nuestra web<img src="{{ asset('img_mundowebaplicativos/flechaderechaarriba.svg') }}" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block group-hover:rotate-45 transition-all  duration-500"></a> 
                </div>
                
            </div>
        </div>

        <div class="header_bottom "></div>

    </header>


    <section>
        <div> 
             <div class="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-0 ">
                 
                <div class=" xl:col-span-12  text-center  space-y-10 flex flex-col justify-center items-center px-[5%] pt-[5%] pb-[2%] xl:px-[12%]">

                    <div class="flex flex-row justify-center items-center mx-auto md:mx-0">
                        <div class="grid grid-cols-12  items-center justify-center ">
                            <ul class="flex -space-x-6 col-span-12 md:col-span-4 justify-center">
                                <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img_mundowebaplicativos/persona1.png') }}"> </li>
                                <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img_mundowebaplicativos/persona2.png') }}"> </li>
                                <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img_mundowebaplicativos/persona3.png') }}"> </li>
                                <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img_mundowebaplicativos/persona4.png') }}"> </li>
                                <li class="rounded-full"><img  class="rounded-full w-12" src="{{ asset('img_mundowebaplicativos/persona5.png') }}"> </li>
                            </ul>
                            <p class="col-span-12 md:col-span-8 ml-4 text-white text-base items-end font-RightgroteskMedium"><span class="font-bold text-2xl">100+ </span> CLIENTES DIGITALIZADOS</p>
                        </div> 
                          
                    </div>


                    <h2 class="font-RightgroteskMedium text-4xl md:text-5xl lg:text-6xl font-medium "><span class="text-white">Conquista Todos los Dispositivos: Tu eCommerce a la Medida</h2>
                    <p class="font-MontserratMedium text-lg md:text-xl font-normal text-white md:w-[75%]"> En Mundo Web, creamos experiencias de compra que brillan en cada pantalla. Descubre cómo llevar tu negocio al siguiente nivel con nuestro eCommerce responsive</p>
   
                   <div class="group">
                           <a type="button" class="font-MontserratSemibold text-base lg:text-lg bg-azulmw text-white px-2 lg:px-4 py-3 rounded-full w-auto inline-block " >
                            Haz que tu Negocio Despegue<img src="{{ asset('img_mundowebaplicativos/flechaderechaarriba.svg') }}" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block group-hover:rotate-45 transition-all  duration-500"></a> 
                   </div>

                   
                </div>

                <div class="xl:col-span-12 flex flex-row justify-center items-start z-10 bg-contain sm:bg-cover  bg-no-repeat bg-center-top xl:bg-right  ">
                    <img class="lg:h-full object-contain " src="{{ asset('img_landingecommerce/landingecommerce.png') }}" />
                </div>

             </div>
        </div> 
     </section>

     <section class="xl:-mt-16 z-0">
        <div class="bg-azulmw">
            <div  x-data="{}"
            x-init="$nextTick(() => {
                let ul = $refs.logos;
                ul.insertAdjacentHTML('afterend', ul.outerHTML);
                ul.nextSibling.setAttribute('aria-hidden', 'true');
            })"
            class="px-[5%]  bg-azulmw w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]"> 
                <ul x-ref="logos" class="h-32 flex flex-row justify-between items-center  [&_li]:mx-10 [&_img]:max-w-none  animate-infinite-scroll">
                
                    <li class="w-60 py-8"><img class="object-contain" src="{{ asset('img_mundowebaplicativos/Logo1.svg') }}" /></li>
                    <li class="w-60 py-8"><img class="object-contain" src="{{ asset('img_mundowebaplicativos/Logo2.svg') }}"/></li>
                    <li class="w-60 py-8"><img class="object-contain" src="{{ asset('img_mundowebaplicativos/Logo3.svg') }}"/></li>
                    <li class="w-60 py-8"><img class="object-contain" src="{{ asset('img_mundowebaplicativos/Logo4.svg') }}"/></li>
                    <li class="w-60 py-8"><img class="object-contain" src="{{ asset('img_mundowebaplicativos/Logo5.svg') }}"/></li>
                    <li class="w-60 py-8"><img class="object-contain" src="{{ asset('img_mundowebaplicativos/Logo6.svg') }}"/></li>
                
                </ul>

                <ul x-ref="logos" class="h-32 flex flex-row justify-between items-center  [&_li]:mx-10 [&_img]:max-w-none  animate-infinite-scroll" aria-hidden="true">
                
                    <li class="w-60 py-8"><img class="object-contain" src="{{ asset('img_mundowebaplicativos/Logo1.svg') }}" /></li>
                    <li class="w-60 py-8"><img class="object-contain" src="{{ asset('img_mundowebaplicativos/Logo2.svg') }}"/></li>
                    <li class="w-60 py-8"><img class="object-contain" src="{{ asset('img_mundowebaplicativos/Logo3.svg') }}"/></li>
                    <li class="w-60 py-8"><img class="object-contain" src="{{ asset('img_mundowebaplicativos/Logo4.svg') }}"/></li>
                    <li class="w-60 py-8"><img class="object-contain" src="{{ asset('img_mundowebaplicativos/Logo5.svg') }}"/></li>
                    <li class="w-60 py-8"><img class="object-contain" src="{{ asset('img_mundowebaplicativos/Logo6.svg') }}"/></li>
                
                </ul>
            </div> 
        </div>
     </section>

</div>

<div class="bg-azulanding bg-texturaecommerce2 bg-center bg-no-repeat bg-contain">
     <section >
        <div> 
             <div class="grid grid-cols-1 xl:grid-cols-12 gap-0 xl:gap-0 pt-[5%]">
                 
                <div class="xl:col-span-6 flex flex-row justify-center items-start z-10  xl:py-[3%]  ">
                    <img class="lg:h-full object-contain " src="{{ asset('img_landingecommerce/landingecommerce2.png') }}" />
                </div>


                <div class=" xl:col-span-6  text-left  space-y-10 flex flex-col justify-center items-start px-[5%] pt-[5%] pb-[5%]  xl:pr-[12%]">

                    <h2 class="font-RightgroteskMedium text-4xl md:text-5xl lg:text-6xl font-medium"><span class="text-white">Hablemos de tu próximo Proyecto</h2>
                    <p class="font-MontserratMedium text-lg md:text-xl font-normal text-white"> Crea Experiencias Digitales que Convierten Visitantes en Clientes Leales</p>

                   <div class="w-full">
                    <form method="POST" action="{{ route('guardarlandingecommerce') }}">
                      @csrf 
                           
                       <div class="grid grid-cols-12 mt-5">
                          
                           <div class="w-full col-span-12 lg:col-span-12  "> 
                             <input class=" font-MontserratRegular appearance-none block w-full bg-azulecommerboton  text-white placeholder:text-white border-none rounded-2xl py-4 px-4 mb-3 leading-tight "  name="nombre" type="text" placeholder="Nombre completo">
                              @error('nombre')
                                   <span class="text-red-500 text-base ">{{ $message }}</span>
                             @enderror  
                           </div>

                           <div> 
                            <input class=" font-MontserratRegular appearance-none block w-full bg-fondoinput  text-white  border-none rounded-full py-4 px-4 mb-2 leading-tight "  name="source" type="hidden" value="Landing Ecommerce">  
                          </div>
            
                       </div>
                       
                       <div class="grid grid-cols-12 mt-3 gap-3">
           
                           <div class="w-full col-span-12 lg:col-span-6 ">
                               <input class="font-MontserratRegular appearance-none block w-full bg-azulecommerboton  text-white placeholder:text-white  border-none rounded-2xl py-4 px-4 mb-3 leading-tight " name="email" type="email" placeholder="Correo electrónico">
                                @error('email')
                                   <span class="text-red-500 text-base ">{{ $message }}</span>
                               @enderror 
                           </div>
           
                           <div class="w-full col-span-12 lg:col-span-6 ">
                               <input class="font-MontserratRegular appearance-none block w-full bg-azulecommerboton  text-white placeholder:text-white  border-none rounded-2xl py-4 px-4 mb-3 leading-tight " name="telefono"  type="number" placeholder="Número de teléfono">
                                @error('telefono')
                                   <span class="text-red-500 text-base ">{{ $message }}</span>
                               @enderror 
                           </div>
           
                       </div> 
        
           
                       <div class="grid grid-cols-12 mt-3 gap-6">
           
                            <div class="w-full col-span-12 lg:col-span-6 relative">

                                <div class="col-span-12"> 
                                    <select name="cargo" class="font-MontserratRegular block appearance-none w-full bg-azulecommerboton  text-white placeholder:text-white py-4 px-4 pr-8 rounded-2xl">
                                        <option class="text-white" value="" selected disabled hidden >Cual es tu cargo</option>
                                        <option class="text-white" value="SEO" >SEO</option>
                                        <option class="text-white" value="Director" >Director</option>
                                        <option class="text-white" value="Administrador" >Administrador</option>
                                        <option class="text-white" value="Comunity Manager" >Comunity Manager</option>
                                    </select>
                                    
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-7 text-white placeholder:text-white">
                                        <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                      </div>
                    
                                    <!-- @error('cargo')
                                            <span class="text-red-500 text-base ">{{ $message }}</span>
                                        @enderror  -->
                                </div>  
                                
                            </div>
            
                            <div class="w-full col-span-12 lg:col-span-6 ">
                                <input class="font-MontserratRegular appearance-none block w-full bg-azulecommerboton  text-white placeholder:text-white border-none rounded-2xl py-4 px-4 mb-3 leading-tight " name="empresa"  type="text" placeholder="Empresa">
                                <!-- @error('empresa')
                                    <span class="text-red-500 text-base ">{{ $message }}</span>
                                @enderror -->
                            </div>
        
                    </div> 


                    <div class="grid grid-cols-12   mt-3">
                          
                           <div class="w-full xs:col-span-12 lg:col-span-12  "> 
                             <textarea rows="1" name="mensaje" class="font-MontserratRegular appearance-none block w-full bg-azulecommerboton  text-white placeholder:text-white border-none rounded-2xl   py-4 px-4 mb-3 leading-tight "  type="textarea" placeholder="Tu mensaje"></textarea>
                           </div>
            
                    </div>
           
             
                       <p class="xs:text-base xl:text-lg text-white  font-normal mt-2 font-MontserratRegular">
                           ¿Cómo prefieres que te contactemos?
                       </p>
           
                    <div class="grid grid-cols-12  mt-3 gap-6">
           
                           <div class="w-full xs:col-span-12 lg:col-span-6 ">
                              
                               <div class="font-MontserratRegular flex items-center ps-4 appearance-none w-full bg-azulecommerboton   border-none rounded-2xl ">
                                   <label for="bordered-radio-1" class="w-[85%] py-4 ms-2 text-base font-normal text-white placeholder:text-white">Correo Electrónico</label>
                                   <input id="bordered-radio-1" type="radio" value="Correo Electrónico" name="tipocontacto" class="h-4 w-[15%]">
                               </div>
           
                          </div>
           
                           <div class="w-full xs:col-span-12 lg:col-span-6 ">
           
                               <div class="font-MontserratRegular flex items-center ps-4 appearance-none w-full bg-azulecommerboton    border-none rounded-2xl ">
                                   <label for="bordered-radio-2" class="w-[85%] py-4 ms-2 text-base font-normal text-white placeholder:text-white">Teléfono</label>
                                   <input  id="bordered-radio-2" type="radio" value="Teléfono" name="tipocontacto" class="w-[15%] h-4" >
                               </div>
                           
                           </div>
                           
                           <!-- @error('tipocontacto')
                               <span class="text-red-500 text-base xs:col-span-12 ">{{ $message }}</span>
                           @enderror  -->
                    </div> 


                    <div class="group  mt-8" >
                            <button type="submit" class="font-MontserratSemibold text-base lg:text-lg bg-azulecommerboton text-white placeholder:text-white px-2 lg:px-4 py-3 rounded-full w-auto inline-block " >
                                Solicitar Servicio<img src="{{ asset('img_mundowebaplicativos/flechaderechaarriba.svg') }}" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block group-hover:rotate-45 transition-all  duration-500"></button> 
                    </div>

                    @if(Session::has('mensaje'))
                    <div class="mt-3">
                    <span class="text-white text-lg animate-fade-down ">Gracias, nos contactaremos contigo,  </span>
                     <span class="text-white text-lg animate-fade-down ">{{session()->get('name')}}</span>
                    </div>
                    @endif
           
                     </form>
           
           
                   </div>


                </div>

               

             </div>
        </div> 
     </section>


     <section>
        <div class="px-[5%] py-8 pt-[10%] md:pt-[3%]"> 
             <div class="space-y-10 flex flex-col justify-center items-center">
                
                <p class="text-center text-lg md:text-xl font-medium text-white  font-MontserratMedium md:w-[85%]"> Descubre cómo nuestro diseño y desarrollo de eCommerce responsive puede potenciar tu marca, aumentar las conversiones y mejorar la experiencia del usuario.</p>
                <h2 class=" text-center text-4xl md:text-6xl font-medium text-white font-RightgroteskMedium md:w-[85%]">Impulsa tu Negocio con Nuestros Servicios</h2>
                
   
             </div>
        </div>
    </section>



    <section >
      
                <div class=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  text-left  justify-center items-start px-[5%] pt-[3%] pb-[6%] gap-10">
                    
                   <div class="group bg-azulmw p-6 space-y-4 rounded-xl ">
                       
                        <div class="flex flex-row justify-between items-center">
                            <a type="button" class="font-RightgroteskMedium text-lg lg:text-2xl  text-white  w-auto inline-block font-normal" >
                                Estética Impactante </a> 
                        </div>      
                            <p class="font-MontserratMedium text-base  font-normal text-white"> Diseños visualmente atractivos que captan la atención y generan confianza en tu marca.</p>
                            <!-- <img src="../resource/img_mundoweb/flechaderechaarriba.svg" alt="Flecha a la derecha" class="float-end h-10 w-10 ml-2 inline-block group-hover:rotate-45 transition-all  duration-500">     -->
                    </div>


                    <div class="group bg-azulmw p-6 space-y-4 rounded-xl ">
                       
                        <div class="flex flex-row justify-between items-center">
                            <a type="button" class="font-RightgroteskMedium text-lg lg:text-2xl  text-white  w-auto inline-block font-normal" >
                                Navegación Intuitiva </a> 
                        </div>      
                            <p class="font-MontserratMedium text-base  font-normal text-white"> Interfaz fácil de usar que mejora la experiencia del usuario, aumentando la retención y las conversiones.</p>
                           
                    </div>




                    <div class="group bg-azulmw p-6 space-y-4 rounded-xl ">
                       
                        <div class="flex flex-row justify-between items-center">
                            <a type="button" class="font-RightgroteskMedium text-lg lg:text-2xl  text-white  w-auto inline-block font-normal" >
                                Adaptabilidad Total </a> 
                        </div>      
                            <p class="font-MontserratMedium text-base  font-normal text-white"> Funciona perfectamente en dispositivos móviles, tabletas y computadoras de escritorio, garantizando una experiencia consistente en cualquier pantalla.</p>
                            
                    </div>



                    <div class="group bg-azulmw p-6 space-y-4 rounded-xl ">
                       
                        <div class="flex flex-row justify-between items-center">
                            <a type="button" class="font-RightgroteskMedium text-lg lg:text-2xl  text-white  w-auto inline-block font-normal" >
                                Visibilidad Reforzada </a> 
                        </div>      
                            <p class="font-MontserratMedium text-base  font-normal text-white"> Implementación de prácticas SEO que ayudan a mejorar tu ranking en buscadores, aumentando la visibilidad y el tráfico orgánico a tu sitio web.</p>
                               
                    </div>


                </div>

     </section>



     <section >
        <div> 
             <div class="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-0  bg-azulmw z-10 xl:bg-fondoecommerce  xl:bg-contain xl:bg-no-repeat  xl:bg-left-top ">
                
                
                <div class="xl:col-span-6 flex flex-row justify-center items-start bg-fondoecommerce  bg-cover bg-no-repeat  bg-left-top">
                    <div class="h-100 xl:h-200"></div>
                    
                </div>

                <div class=" xl:col-span-6  text-left  space-y-10 flex flex-col justify-center items-start px-[5%] pt-[3%] pb-[10%] xl:px-[12%] xl:pt-[10%] xl:pb-[10%]">

                    <h2 class="font-RightgroteskMedium text-4xl md:text-5xl lg:text-5xl font-medium"><span class="text-white">¿Listo para descubrir cómo nuestras soluciones pueden llevar tu negocio al siguiente nivel?</h2>
                    <p class="font-MontserratMedium text-lg md:text-xl font-normal text-white"> Desde deslumbrantes One Pages hasta emocionantes E-commerce, nuestro portafolio presenta una amplia 
                        gama de proyectos exitosos que hemos realizado para clientes satisfechos.</p>
   
                   <div class="group">
                           <a href="{{ route('proyectos') }}" type="button" class="font-MontserratSemibold text-base lg:text-lg bg-azulecommerboton text-white px-2 lg:px-4 py-3 rounded-full w-auto inline-block " >
                            Descubre Más<img src="{{ asset('img_mundowebaplicativos/flechaderechaarriba.svg') }}" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block group-hover:rotate-45 transition-all  duration-500"></a> 
                   </div>
                </div>

                

             </div>
        </div> 
     </section>
</div>


     <footer class="bg-azulecommerboton p-[10%] sm:p-[7%] md:p-[5%] lg:p-[5%]">
        <div class="footer_main pb-10 border-b">
            <div class="grid grid-cols-1 sm:grid-cols-12 md:grid-cols-12 gap-2 lg:gap-7">
                <div class="flex flex-col justify-center items-start  sm:col-span-12 md:col-span-12 lg:col-span-4 lg:justify-start lg:items-start">
                    <div class="flex flex-col justify-center items-center m-auto lg:m-0 " >
                        <a href="{{ route('landingecommerce') }}" ><img class="w-64 md:w-64 lg:max-w-64" src="{{ asset('img_landingmundoweb/logowhitemw.svg') }}"></a>
                    </div>
 
                    <div class="group mt-6">
                        <a href="{{ route('contacto') }}" type="button" class="font-MontserratRegular text-base lg:text-lg bg-azulecommerboton text-white px-2 lg:px-4 py-2 rounded-full w-auto inline-block border-2" >
                            Quiero mi web<img src="{{ asset('img_mundowebaplicativos/flechaderechaarriba.svg') }}" alt="Flecha a la derecha" class="h-10 w-10 ml-2 inline-block group-hover:rotate-45 transition-all  duration-500"></a> 
                    </div>

                    <div class="flex flex-row items-center justify-center lg:justify-end lg:col-span-5 gap-3 mt-5">
                        <a href="https://www.facebook.com/mundoweb.pe" target="_blank"><img  src="{{ asset('img_mundowebaplicativos/Facebook.svg') }}" /></a>
                        <a href="https://www.instagram.com/mundoweb.pe/" target="_blank"><img  src="{{ asset('img_mundowebaplicativos/Instagram.svg') }}" /></a>
                    </div>
                </div>
           
                <div class="text-white sm:col-span-3 lg:col-span-2">
                    
                </div>

                <div class="text-white sm:col-span-3 lg:col-span-2">
                   
                </div>


                <div class="font-MontserratRegular text-white sm:col-span-12 lg:col-span-4 space-y-5 ">
                    <div> 
                        <h2 class="text-lg font-medium mb-1">Dirección</h2>
                        <p class="text-base font-normal">
                            Centro Empresarial Peruano - Suizo Av. Aramburú 150 - Miraflores, Oficina 4B, Lima, Lima 51, PE
                        </p> 
                    </div>
                    <div> 
                        <h2 class="text-lg font-medium mb-1">Horario</h2>
                        <p class="text-base font-normal">
                            Lunes - Viernes 8am - 6pm <br>
                            Sábados 9am - 1pm
                        </p> 
                    </div>
                </div>


                <!-- <div class="text-white sm:col-span-3 lg:col-span-2">
                    <nav> 
                        <h2 class="text-lg font-medium">Políticas</h2>
                        <ul class="text-base font-normal">
                            <li>Pellentesque</li>
                            <li>Suspendisse</li>
                        </ul> 
                    </nav>
                </div> -->

            </div>
        </div>   

        <div class="footer_bottom ">

                <div class="pt-10">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-7 font-MontserratRegular ">
                       <div class="lg:col-span-7">
                            <p class="text-base font-normal text-white">Copyright © 2024 Mundo Web. Reservados todos los derechos.</p>
                        </div>
                        <div class="flex flex-col lg:flex-row items-left lg:items-center justify-center lg:justify-end lg:col-span-5 gap-2 lg:gap-10">
                            <p class="text-base font-normal text-white">hola@mundoweb.pe</p>
                            <p class="text-base font-normal text-white">+51 934 464 915</p>
                        </div>
                    </div>
                </div>

        </div>

        
    </footer>



</body>
</html>
