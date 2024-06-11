<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

    <link rel="stylesheet" href="{{ asset('build/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">

    {{-- sweet Alert --}}
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

    {{-- <link rel="stylesheet" href="{{ asset('css/styles.css') }}" /> --}}

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Landing Mundo Web</title>

    <style>
        .navbar-fixed-top.scrolled {
            background-color: #fff !important;
            transition: background-color 200ms linear;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
        }

        .navbar-fixed-top.scrolled .nav-link {
            color: #555;
        }

        @font-face {
            font-family: "RightgroteskMediumMedium";
            /* src: url({{ asset('fonts/rightRightgroteskMedium-medium-webfont.woff') }}) format("woff"); */
            src: url({{ asset('fonts/rightRightgroteskMedium-widemedium-webfont.woff') }}) format("woff");
        }

        .bg_fondoMain {
            background-image: url({{ asset('images/img/imgMundoWeb/image_33.png') }});
        }

        .bg_fondoMainMobile {
            background-image: url({{ asset('images/img/imgMundoWeb/image_34.png') }});
        }

        @media (min-width: 768px) {
            .bg_fondoMain {
                background-image: url({{ asset('images/img/imgMundoWeb/image_2.png') }});
            }

            .bg_fondoMainMobile {
                background-image: url({{ asset('images/img/imgMundoWeb/image_14.png') }});
            }
        }

        /* .swiper-slide{
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      
      height: 100% !important;
    } */

        .height-modal {
            max-height: 550px;

        }

        .opacidad {
            opacity: 0.7;
        }

        .cerrar {
            background-color: rgb(49, 54, 59);
        }

        .cerrar_close {
            width: 18px;
        }

        @media (min-width: 768px) {
            .height-modal {
                max-height: 800px;

            }

            .cerrar_close {
                width: 24px;
            }
        }

        .custom-auto-width {
            width: 100%;
        }

        @media (min-width: 768px) {
            .custom-auto-width {
                width: auto;
            }
        }

        .ancho_modal{
                width: 80%
            }

            @media (min-width:768px){
                .ancho_modal{
                width: 60%
            }
            }
    </style>


</head>



<body class="body">
    <div class="overlay"></div>

    <header>

        <div class="absolute md:fixed left-0 right-0 py-5 navbar-fixed-top z-[20]">
            <div class="mx-auto w-full md:w-11/12">
                <div
                    class="flex flex-col md:flex-row md:justify-between items-center gap-5 bg-transparent w-11/12 mx-auto">
                    <div>
                        <a href="{{ route('ultimalanding') }}"><img src="{{ asset('/images/img/imgMundoWeb/image_1.png') }}"
                            alt="mundo web"></a>
                    </div>
                    <div class="group custom-auto-width"> <!-- Cambié el orden de las clases -->
                        <a href="#formularioListo"
                            class="font-montserrat font-semibold text-white py-2 px-4 bg-[#303BE4] justify-center items-center gap-3 rounded-full flex">
                            <!-- Quité la clase w-full del botón -->
                            <span>Quiero mi web</span>
                            <div class="group-hover:rotate-45 transition-all duration-500 ">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="20" fill="white" />
                                    <path
                                        d="M16.4583 15.0808L24.9803 15.0807M24.9803 15.0807L24.9803 23.4815M24.9803 15.0807L15.0808 24.9802"
                                        stroke="#303BE4" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>


        {{-- z-[100] --}}

        {{-- <div class="px-[75px] absolute md:fixed left-0 right-0 py-5 navbar-fixed-top z-[20]"> 
            <div class="flex flex-col md:flex-row md:justify-between items-center gap-5 bg-transparent ">
                <div>
                    <a href="{{ route('ultimalanding') }}"><img src="{{ asset('/images/img/imgMundoWeb/image_1.png') }}"
                            alt="mundo web"></a>
                </div>
                <div class="group">
                    <a href="#formularioListo"
                        class="font-montserrat font-semibold text-white py-2 px-4 bg-[#303BE4] flex justify-center items-center gap-3 rounded-full">
                        <span>Quiero mi web</span>

                        <div class="group-hover:rotate-45 transition-all  duration-500 ">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="white" />
                                <path
                                    d="M16.4583 15.0808L24.9803 15.0807M24.9803 15.0807L24.9803 23.4815M24.9803 15.0807L15.0808 24.9802"
                                    stroke="#303BE4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </div> --}}
        <div class="flex justify-end w-11/12 mx-auto  z-10">
            <div class="fixed bottom-6 sm:bottom-[2rem] right-[20px] lg:bottom-[4rem] z-[80]  lg:right-[40px]">
                <a href="https://web.whatsapp.com/send?phone=908857558" rel="noopener" target="_blank">
                    <img src="{{ asset('images/img/imgMundoWeb/WhatsApp.svg') }}" alt="whatsapp"
                        class="w-20 h-20 md:w-full md:h-full">
                </a>
            </div>
        </div>
    </header>


    <div class="main">
        <main>
            <section class="bg_fondoMain bg-cover bg-center bg-no-repeat sm:w-full h-full pt-40 md:pt-32">
                <div class="flex flex-col lg:flex-row justify-between gap-10">
                    <div class="basis-1/2 flex flex-col gap-5 px-5 md:pl-16 pt-16  md:pb-0">
                        {{-- tipografia h1 --}}
                        <h1 class="font-RightgroteskMedium text-text32 md:text-text64 leading-tight text-[#050A41]">
                            <span class="text-[#E15A29]">¡Nuestra pasión,</span> tu
                            transformación Digital! 🚀
                        </h1>
                        <p class="font-montserrat font-medium text-text18 md:text-text20 text-[#3F4654]">Somos una
                            <b>empresa de desarrollo web</b> joven y dinámica, especializada en transformar ideas en
                            soluciones digitales excepcionales. En Mundo Web, no solo construimos sitios web y
                            aplicativos, sino que creamos experiencias digitales que impulsan el éxito de nuestros
                            clientes.
                        </p>

                        <div class="pt-5 group">
                            <a href="#formularioListo"
                                class="font-montserrat font-semibold text-white py-2 px-4 bg-[#303BE4] justify-center items-center gap-3 rounded-full inline-flex">
                                <span>Quiero mi web</span>

                                <div class="group-hover:rotate-45 transition-all duration-500">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="20" r="20" fill="white" />
                                        <path
                                            d="M16.4583 15.0808L24.9803 15.0807M24.9803 15.0807L24.9803 23.4815M24.9803 15.0807L15.0808 24.9802"
                                            stroke="#303BE4" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </a>
                        </div>

                        <div
                            class="text-text24 pt-10 gap-5 flex flex-row md:items-center justify-between md:justify-start pb-10">

                            <img src="{{ asset('images/img/imgMundoWeb/image_3.png') }}" alt="mundoweb" class="w-20">

                            <p class="font-RightgroteskMedium uppercase text-text16 md:text-text24 font-medium">
                                <span
                                    class="text-[#E15A29] text-text24">100+</span> <span class="text-text14">Clientes digitalizados</span>
                            </p>

                        </div>


                    </div>

                    <div class="hidden basis-1/2 md:flex items-start justify-end">
                        <img src="{{ asset('images/img/imgMundoWeb/image_4.png') }}" alt="mundo web" class="">
                    </div>

                    <div class=" basis-1/2 flex md:hidden items-start justify-center py-10">
                        <img src="{{ asset('images/img/imgMundoWeb/image_35.png') }}" alt="mundo web" class="">
                    </div>
                </div>
            </section>
            <section class="xl:-mt-10 z-0">
                <div class="bg-[#303BE4] ">
                    <div x-data="{}" x-init="$nextTick(() => {
                        let ul = $refs.logos;
                        ul.insertAdjacentHTML('afterend', ul.outerHTML);
                        ul.nextSibling.setAttribute('aria-hidden', 'true');
                    })"
                        class="px-[5%]  bg-[#303BE4] w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
                        <ul x-ref="logos"
                            class="h-32 flex flex-row justify-between items-center  [&_li]:mx-10 [&_img]:max-w-none  animate-infinite-scroll">

                            <li class="w-60 py-8"><img class="object-contain"
                                    src="{{ asset('img_mundowebaplicativos/Logo1.svg') }}" />
                            </li>
                            <li class="w-60 py-8"><img class="object-contain"
                                    src="{{ asset('img_mundowebaplicativos/Logo2.svg') }}" />
                            </li>
                            <li class="w-60 py-8"><img class="object-contain"
                                    src="{{ asset('img_mundowebaplicativos/Logo3.svg') }}" />
                            </li>
                            <li class="w-60 py-8"><img class="object-contain"
                                    src="{{ asset('img_mundowebaplicativos/Logo4.svg') }}" />
                            </li>
                            <li class="w-60 py-8"><img class="object-contain"
                                    src="{{ asset('img_mundowebaplicativos/Logo5.svg') }}" />
                            </li>
                            <li class="w-60 py-8"><img class="object-contain"
                                    src="{{ asset('img_mundowebaplicativos/Logo6.svg') }}" />
                            </li>

                        </ul>

                        <ul x-ref="logos"
                            class="h-32 flex flex-row justify-between items-center  [&_li]:mx-10 [&_img]:max-w-none  animate-infinite-scroll"
                            aria-hidden="true">

                            <li class="w-60 py-8"><img class="object-contain"
                                    src="{{ asset('img_mundowebaplicativos/Logo1.svg') }}" />
                            </li>
                            <li class="w-60 py-8"><img class="object-contain"
                                    src="{{ asset('img_mundowebaplicativos/Logo2.svg') }}" />
                            </li>
                            <li class="w-60 py-8"><img class="object-contain"
                                    src="{{ asset('img_mundowebaplicativos/Logo3.svg') }}" />
                            </li>
                            <li class="w-60 py-8"><img class="object-contain"
                                    src="{{ asset('img_mundowebaplicativos/Logo4.svg') }}" /></li>
                            <li class="w-60 py-8"><img class="object-contain"
                                    src="{{ asset('img_mundowebaplicativos/Logo5.svg') }}" /></li>
                            <li class="w-60 py-8"><img class="object-contain"
                                    src="{{ asset('img_mundowebaplicativos/Logo6.svg') }}" /></li>

                        </ul>
                    </div>
                </div>
            </section>
            <section class="bg_fondoMainMobile bg-cover bg-center bg-no-repeat sm:w-full h-full py-20 flex flex-col gap-10">

                <div class="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2">
                    <div class="flex justify-center">
                        <img src="{{ asset('images/img/imgMundoWeb/image_5.png') }}" alt="mundo web">
                    </div>

                    <div id="formularioListo" class="flex flex-col justify-center gap-10">
                        <h2
                            class="text-[#050A41] font-RightgroteskMedium text-text40 md:text-text48 leading-tight font-medium w-full lg:w-2/3">
                            ¿Listo para crear tu página <span class="text-[#E15A29]">web a medida?</span> </h2>
                        <p class="text-[#3F4654] text-text18 font-montserrat font-medium">¡Desata el potencial de tu
                            negocio! Convierte visitantes en clientes leales creando experiencias digitales únicas y
                            cautivadoras. Llena nuestro formulario y déjanos ser tus aliados en el camino hacia el éxito
                            en línea.

                        </p>

                        <div>
                            <form id="dataForm" class="flex flex-col gap-5">
                                @csrf
                                <div>
                                    <input type="text" name="contact_name" placeholder="Nombre Completo" required
                                        class="shadow-lg text-[#323BDC] font-montserrat w-full py-4 px-5 rounded-xl text-text16  placeholder-opacity-25 font-medium bg-white border-none">
                                </div>

                                <div class="flex flex-col md:flex-row md:justify-between gap-5 w-full">
                                    <div class="w-full">
                                        <input type="email" name="contact_email" placeholder="Correo Electrónico" required id="email"
                                            class="shadow-lg text-[#323BDC] font-montserrat w-full py-4 px-5 rounded-xl text-text16 font-medium bg-white border-none">
                                    </div>
                                    <div class="w-full">
                                        <input type="text" name="contact_phone" placeholder="Teléfono" required id="telefono" maxlength="9"
                                            class="shadow-lg text-[#323BDC] font-montserrat w-full py-4 px-5 rounded-xl text-text16 font-medium bg-white border-none">
                                    </div>
                                </div>

                                <div class="flex flex-col md:flex-row md:justify-between gap-5 w-full">
                                    <div class="w-full">
                                        <input type="text" placeholder="Empresa / Marca (Opcional)" name="name"
                                            class="shadow-lg text-[#323BDC] font-montserrat w-full py-4 px-5 rounded-xl text-text16 font-medium bg-white border-none">
                                    </div>
                                    <div class="w-full">
                                        <input type="text" placeholder="Link de Web (Opcional)" name="web_url"
                                            class="shadow-lg text-[#323BDC] font-montserrat w-full py-4 px-5 rounded-xl text-text16 font-medium bg-white border-none">
                                    </div>
                                </div>

                                <input type="hidden" name="source" id="source" value="Website">
                                <input type="hidden" name="ip" id="ip">
                                <input type="hidden" name="origin" id="llegade">
                                <input type="hidden" name="client_width" id="anchodispositivo">
                                <input type="hidden" name="client_height" id="largodispositivo">
                                <input type="hidden" name="client_latitude" id="latitud">
                                <input type="hidden" name="client_longitude" id="longitud">
                                <input type="hidden" name="client_system" id="sistema">

                                <div>
                                    <textarea name="message" id="input" rows="5" maxlength="256" placeholder="Ingresa tu mensaje "
                                        class="shadow-lg  text-[#323BDC] w-full py-4 bg-bgRosaWeak rounded-xl text-text16 font-medium px-5 font-montserrat placeholder:text-textAzul placeholder:opacity-40"></textarea>
                                </div>
                            </form>
                        </div>

                        

                        <div class="md:pt-10 group">
                            <button id='procesarSolicitud'
                                class="font-montserrat font-semibold text-white py-3 px-4 bg-[#303BE4] justify-center items-center gap-3 rounded-full inline-flex text-text18">
                                <span>Solicitar Servicio</span>

                                <div class="group-hover:rotate-45 transition-all  duration-500 ">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="20" r="20" fill="white" />
                                        <path
                                            d="M16.4583 15.0808L24.9803 15.0807M24.9803 15.0807L24.9803 23.4815M24.9803 15.0807L15.0808 24.9802"
                                            stroke="#303BE4" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </button>
                        </div>

                    </div>
                </div>

                <div class="w-11/12 mx-auto flex flex-col gap-10 md:gap-16 pt-10">
                    <h2
                        class="text-[#050A41] font-RightgroteskMedium  text-text32 md:text-text48 font-medium  w-full lg:w-4/12 leading-tight">
                        ¡Explora nuestras Maravillas <span class="text-[#E15A29]">Digitales!</span></h2>

                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-10">

                        {{-- ---- modal por imagenes --}}

                        {{-- <div
                            class="flex justify-center items-center md:hover:scale-110 md:duration-300 border-black border-[10px] rounded-xl">
                            <img src="{{ asset('images/img/imgMundoWeb/image_6.png') }}" alt="hpi"
                                class="w-full h-full"
                                onclick="openModal('{{ asset('images/img/imgMundoWeb/image_32.png') }}')">
                        </div>

                        <div
                            class="flex justify-center items-center md:hover:scale-110 md:duration-300 border-black border-[10px] rounded-xl">
                            <img src="{{ asset('images/img/imgMundoWeb/image_7.png') }}" alt="hpi"
                                class="w-full h-full"
                                onclick="openModal('{{ asset('images/img/imgMundoWeb/image_40.png') }}')">
                        </div>

                        <div
                            class="flex justify-center items-center md:hover:scale-110 md:duration-300 border-black border-[10px] rounded-xl">
                            <img src="{{ asset('images/img/imgMundoWeb/image_8.png') }}" alt="hpi"
                                class="w-full h-full"
                                onclick="openModal('{{ asset('images/img/imgMundoWeb/image_41.png') }}')">
                        </div>

                        <div
                            class="flex justify-center items-center md:hover:scale-110 md:duration-300 border-black border-[10px] rounded-xl">
                            <img src="{{ asset('images/img/imgMundoWeb/image_9.png') }}" alt="hpi"
                                class="w-full h-full"
                                onclick="openModal('{{ asset('images/img/imgMundoWeb/image_45.png') }}')">
                        </div> --}}

                        <div
                            class="flex justify-center items-center md:hover:scale-110 md:duration-300 border-black border-[10px] rounded-xl">
                            <img src="{{ asset('images/img/imgMundoWeb/image_10.png') }}" alt="hpi"
                                class="w-full h-full"
                                onclick="openModal('{{ asset('images/img/imgMundoWeb/image_43.png') }}')">
                        </div>

                        <div
                            class="flex justify-center items-center md:hover:scale-110 md:duration-300 border-black border-[10px] rounded-xl">
                            <img src="{{ asset('images/img/imgMundoWeb/image_11.png') }}" alt="hpi"
                                class="w-full h-full"
                                onclick="openModal('{{ asset('images/img/imgMundoWeb/image_42.png') }}')">
                        </div>

                        <div
                            class="flex justify-center items-center md:hover:scale-110 md:duration-300 border-black border-[10px] rounded-xl">
                            <img src="{{ asset('images/img/imgMundoWeb/image_12.png') }}" alt="hpi"
                                class="w-full h-full"
                                onclick="openModal('{{ asset('images/img/imgMundoWeb/image_44.png') }}')">
                        </div>

                        <div
                            class="flex justify-center items-center md:hover:scale-110 md:duration-300 border-black border-[10px] rounded-xl">
                            <img src="{{ asset('images/img/imgMundoWeb/image_13.png') }}" alt="hpi"
                                class="w-full h-full"
                                onclick="openModal('{{ asset('images/img/imgMundoWeb/image_46.png') }}')">
                        </div>
                    </div>

                    
                    <!-- Modal -->
                    <div id="modal" class="modal hidden fixed inset-0 items-center justify-center z-[100]">
                        <div class="modal-overlay absolute w-full h-full bg-black opacity-50 opacidad"></div>
                        <div
                            class="modal-container bg-white mx-auto  rounded shadow-lg z-[100]  overflow-y-auto relative ancho_modal">
                            {{-- w-5/6 --}}
                            <div class="modal-content p-4 relative overflow-y-scroll height-modal" >
                                {{--  style="max-height: 700px;" --}}
                                <span
                                    class="close absolute top-2 right-0 mx-4 cursor-pointer text-white text-text48  leading-none p-3  cerrar rounded-full">
                                    <img src="{{ asset('images/img/imgMundoWeb/cerrar_close.svg') }}" alt=""
                                        class="cerrar_close">
                                 
                                </span>
                                <img id="modalImage" src="" alt="Imagen" class="w-full h-auto">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-11/12 mx-auto bg-[#303BE4] rounded-2xl py-10  px-5 mt-10 mb-20">
                    <div class="w-full md:w-6/12 mx-auto">
                        <h2
                            class="text-white font-medium text-text44 md:text-text64 text-center leading-tight font-RightgroteskMedium">
                            ¡Impulsa tu presencia en linea con <span class="text-[#050A41]">Mundo Web!</span></h2>

                        <p
                            class="font-montserrat text-text18 md:text-text20 leading-tight text-white text-center py-5">
                            Somos una <b>agencia de desarrollo web</b> con un modelo de trabajo que puede llevar tu
                            presencia en línea al siguiente nivel.

                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 py-14 md:px-10 lg:px-20">
                        <div
                            class="text-white flex gap-2 group bg-white bg-opacity-10 justify-between rounded-xl px-5 py-10 md:p-10 ">
                            <div class="flex flex-col gap-5 basis-10/12">
                                <h2 class="font-RightgroteskMedium font-medium text-text32 leading-tight ">Aumento de
                                    Conversiones
                                </h2>
                                <p class="text-text18  font-montserrat font-medium">Nuestros <b>especialistas en
                                        Desarrollo Web</b> trabajarán para generar contenido de valor y aplicarán una
                                    serie de estrategias para aumentar las conversiones.
                                </p>
                            </div>
                            <div
                                class="opacity-0  md:duration-300 basis-2/12 flex justify-end items-start group-hover:opacity-100">
                                <img src="{{ asset('images/img/imgMundoWeb/image_30.png') }}" alt="mundo web"
                                    class="w-8 h-8">
                            </div>

                        </div>

                        <div
                            class="text-white flex gap-2 group bg-white bg-opacity-10 justify-between rounded-xl px-5 py-10 md:p-10 ">
                            <div class="flex flex-col gap-5 basis-10/12">
                                <h2 class="font-RightgroteskMedium font-medium text-text32 leading-tight ">Generación
                                    de Leads de
                                    Calidad
                                </h2>
                                <p class="text-text18  font-montserrat font-medium">Tu sitio web contará con datos
                                    claves y contenido de calidad para impulsar relaciones significativas con
                                    potenciales clientes.
                                </p>
                            </div>
                            <div
                                class="opacity-0  md:duration-300 basis-2/12 flex justify-end items-start group-hover:opacity-100">
                                <img src="{{ asset('images/img/imgMundoWeb/image_30.png') }}" alt="mundo web"
                                    class="w-8 h-8">
                            </div>
                        </div>


                        <div
                            class="text-white flex gap-2 group bg-white bg-opacity-10 justify-between rounded-xl px-5 py-10 md:p-10 ">
                            <div class="flex flex-col gap-5 basis-10/12">
                                <h2 class="font-RightgroteskMedium font-medium text-text32 leading-tight ">Mayor
                                    Credibilidad y
                                    Profesionalismo</h2>
                                <p class="text-text18  font-montserrat font-medium">Somos profesionales que buscan
                                    transmitir confianza para destacar tu marca en el mundo digital. Tu sitio web tendrá
                                    contenido de valor y la seguridad para ti y tus clientes.
                                </p>
                            </div>
                            <div
                                class="opacity-0  md:duration-300 basis-2/12 flex justify-end items-start group-hover:opacity-100">
                                <img src="{{ asset('images/img/imgMundoWeb/image_30.png') }}" alt="mundo web"
                                    class="w-8 h-8">
                            </div>
                        </div>

                        <div
                            class="text-white flex gap-2 group bg-white bg-opacity-10 justify-between rounded-xl px-5 py-10 md:p-10 ">
                            <div class="flex flex-col gap-5 basis-10/12">
                                <h2 class="font-RightgroteskMedium font-medium text-text32 leading-tight ">Optimización
                                    para Landing Pages</h2>
                                <p class="text-text18  font-montserrat font-medium">Tu página web será optimizada con
                                    <b>estrategias SEO</b> para aparecer en el ranking de los buscadores, como Google.
                                    En Mundo Web, tu <b>Landing Page</b> contará con palabras claves, sitemap,
                                    robots.txt y otras acciones.
                                </p>
                            </div>
                            <div
                                class="opacity-0  md:duration-300 basis-2/12 flex justify-end items-start group-hover:opacity-100">
                                <img src="{{ asset('images/img/imgMundoWeb/image_30.png') }}" alt="mundo web"
                                    class="w-8 h-8">
                            </div>
                        </div>


                    </div>

                    <div class="pt-5 flex justify-between w-full">
                        <div class="w-full flex justify-center group">
                            <a href="#formularioListo"
                                class="font-montserrat font-semibold text-white py-2 px-4 bg-white bg-opacity-10 justify-center items-center gap-3 rounded-full inline-flex text-center">
                                <span>Quiero mi web</span>

                                <div class="group-hover:rotate-45 transition-all  duration-500 ">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="20" r="20" fill="white" />
                                        <path
                                            d="M16.4583 15.0808L24.9803 15.0807M24.9803 15.0807L24.9803 23.4815M24.9803 15.0807L15.0808 24.9802"
                                            stroke="#303BE4" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </a>
                        </div>

                    </div>

                </div>

            </section>


        </main>
    </div>


    <footer class="bg-[#303BE4] py-20">

        <div
            class="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between w-11/12 mx-auto border-b-[1px] border-gray-400 pb-10">

            <div class="basis-8/12 flex flex-col gap-5 justify-between">
                <div>
                    <a href="{{ route('ultimalanding') }}"><img
                            src="{{ asset('/images/img/imgMundoWeb/image_31.png') }}" alt="mundo web"></a>

                </div>


                <div class="group">
                    <a href="#formularioListo"
                        class="border-white border-[1px] font-montserrat font-semibold text-white py-2 px-4 bg-[#303BE4] justify-center items-center gap-3 rounded-full inline-flex">
                        <span>Ir a la web</span>

                        <div class="group-hover:rotate-45 transition-all  duration-500 ">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="white" />
                                <path
                                    d="M16.4583 15.0808L24.9803 15.0807M24.9803 15.0807L24.9803 23.4815M24.9803 15.0807L15.0808 24.9802"
                                    stroke="#303BE4" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </div>
                    </a>
                </div>

                <div class="flex gap-5">
                    <a href="https://www.instagram.com/mundoweb.pe/" target="_blank">
                        <img src="{{ asset('/images/img/imgMundoWeb/Instagram.svg') }}" alt="instagram">
                    </a>
                    <a href="https://www.facebook.com/mundoweb.pe/" target="_blank">
                        <img src="{{ asset('/images/img/imgMundoWeb/Facebook.svg') }}" alt="facebook">
                    </a>
                </div>
            </div>

            <div class="basis-4/12 text-white">

                <div class="">
                    <p class="font-montserrat font-normal text-text16 pb-5">Dirección</p>
                    <p class="font-montserrat font-normal text-text16">Centro Empresarial Peruano - Suizo</p>
                    <p class="font-montserrat font-normal text-text16">Av. Aramburú 150 - Miraflores, Oficina 4B, Lima,
                        Lima
                        51, PE</p>

                </div>

                <div>
                    <p class="font-montserrat font-normal text-text16 py-5">Horario</p>
                    <p class="font-montserrat font-normal text-text16">Lunes - Viernes 8am - 6pm</p>
                    <p class="font-montserrat font-normal text-text16">Sábados 9am - 1pm</p>
                </div>
            </div>

        </div>


        <div class="pt-10 w-11/12 mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-7 font-monserrat ">
                <div class="lg:col-span-7">
                    <p class="text-base font-normal text-white">Copyright © 2024 Mundo Web. Reservados todos los
                        derechos.</p>
                </div>
                <div
                    class="flex flex-row justify-between lg:items-center lg:justify-end lg:col-span-5 gap-2 lg:gap-10">
                    <p class="text-base font-normal text-white">hola@mundoweb.pe</p>
                    <p class="text-base font-normal text-white">+51 934 464 915</p>
                </div>
            </div>
        </div>

    </footer>
</body>


</html>

<script>
    $(function() {
        $(document).scroll(function() {
            var $nav = $(".navbar-fixed-top");
            $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        });
    });
</script>
<script>
    var especialidades = new Swiper(".clientes", {
        slidesPerView: 6,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        centeredSlides: false,
        initialSlide: 0,
        allowTouchMove: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 6,
            },
        },
    });


    // Función para abrir el modal con una imagen específica
    function openModal(imageSrc) {
        document.getElementById('modalImage').src = imageSrc;
        document.getElementById('modal').classList.remove('hidden');
        document.getElementById('modal').classList.add('flex');
    }

    // Función para cerrar el modal
    function closeModal() {
        document.getElementById('modal').classList.remove('flex');
        document.getElementById('modal').classList.add('hidden');
    }

    // Cerrar modal al hacer clic en el botón de cierre
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal();
        });


    });
</script>
<script>

/* function alerta(message) {
            Swal.fire({
                title: message,
                icon: "error",
            });
        } */

        /* function validarTelefono(value) {
            if (value !== '') {
                if (isNaN(value)) {
                    alerta("Por favor, asegúrate de ingresar solo números en el teléfono");
                    return false;
                }
            }

            if (value.length < 9) {
                alerta("El teléfono solo puede tener 9 dígitos");
                return false;
            }

            return true;
        } */

       /*  function validarEmail(value) {
            console.log(value)
            const regex =
                /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

            if (!regex.test(value)) {
                alerta("Por favor, asegúrate de ingresar una dirección de correo electrónico válida");
                return false;
            }
            return true;
        }
 */



    $('#procesarSolicitud').on('click', function() {
        console.log('precionando btn envio');

        let formulario = $('#dataForm').serialize()

        /* if (!validarTelefono($('#telefono').val())) {
                return;
            };

            if (!validarEmail($('#email').val())) {
                return;
            }; */
        Swal.fire({

            title: 'Procesando información',
            html: `Enviando... 
          <div class="max-w-2xl mx-auto overflow-hidden flex justify-center items-center mt-4 ">
              <div role="status">
                  <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  
              </div>
          </div>
          `,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        $.ajax({
            url: '{{ route('guardarlandingmundoweb') }}',
            method: 'POST',
            data: formulario,
            success: function(response) {
                Swal.close();
                Swal.fire({
                    title: response.message,
                    icon: "success",
                });
                $('#dataForm')[0].reset()
            },
            error: function(response) {

                Swal.close();
                Swal.fire({
                    title: response.responseJSON.message,
                    icon: "error",
                });
            }
        });

    })
</script>

<script>
    // Obtener la IP del usuario (desde un servicio externo)
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('ip').value = data.ip;
    });

    // Obtener información del navegador y del sistema operativo
    const platform = navigator.platform;
    document.getElementById('sistema').value = platform;

    // Obtener la geolocalización del usuario (si se permite)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            document.getElementById('latitud').value = position.coords.latitude;
            document.getElementById('longitud').value = position.coords.longitude;
        });
    }

    // Obtener la página de referencia
    const referrer = document.referrer;
    document.getElementById('llegade').value = referrer;


    // Obtener la resolución de la pantalla
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    document.getElementById('anchodispositivo').value = screenWidth;
    document.getElementById('largodispositivo').value = screenHeight;
</script>
