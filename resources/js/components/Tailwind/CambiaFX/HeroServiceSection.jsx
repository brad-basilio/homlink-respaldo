import React from 'react';
import { Layers, Users, CreditCard, TrendingUp, MessageCircle, Gift } from 'lucide-react';

function HeroServiceSection() {
  const services = [
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Amplia cobertura bancaria, YAPE, PLIN No cobramos comisiones",
      description: "Ut eget lacinia ante, eget posuere ipsum. Donec volutpat quam vel purus porta, quis congue."
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Paga tu tarjetas de crédito rápidamente",
      description: "Ut eget lacinia ante, eget posuere ipsum. Donec volutpat quam vel purus porta, quis congue."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Trabajamos con Empresas y Personas naturales",
      description: "Ut eget lacinia ante, eget posuere ipsum. Donec volutpat quam vel purus porta, quis congue."
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Tipo de cambio preferencial para tus colaboradores",
      description: "Ut eget lacinia ante, eget posuere ipsum. Donec volutpat quam vel purus porta, quis congue."
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Atención personalizada para cada cliente",
      description: "Ut eget lacinia ante, eget posuere ipsum. Donec volutpat quam vel purus porta, quis congue."
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "+ Sorteos, + cupones, + beneficios todo el año",
      description: "Ut eget lacinia ante, eget posuere ipsum. Donec volutpat quam vel purus porta, quis congue."
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50 relative overflow-hidden">
      {/* Purple decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full border-8 border-purple-500 opacity-20 -translate-y-32 translate-x-32"></div>
      <div className="absolute top-32 right-20 w-80 h-80 rounded-full border-8 border-purple-500 opacity-15"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full border-8 border-purple-500 opacity-10 translate-y-32 translate-x-20"></div>
      
      {/* Main content */}
      <div className="relative z-10 px-4 py-12 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header section */}
          <div className="mb-12 md:mb-16">
            <div className="mb-4">
              <span className="text-purple-500 text-sm font-medium tracking-wider uppercase">
                SERVICIOS
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Cambia dólares<br />
              con <span className="text-gray-900">Cambia FX</span>
            </h1>
            <p className="text-gray-700 text-lg md:text-xl max-w-2xl">
              Realiza tus operaciones de compra y venta de dólares online.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-lime-400 rounded-3xl p-8 hover:bg-lime-300 transition-colors duration-300 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                  {service.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-gray-900 font-bold text-lg mb-4 leading-tight">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-800 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          
        <div className="relative mt-16  w-full px-16 rounded-[56px] bg-constrast  flex flex-col md:flex-row items-center  py-10 min-h-[380px]">
          {/* Fondo decorativo */}
          <div className="absolute h-full w-auto right-0 z-0  overflow-hidden rounded-[56px]">
            <svg className="z-0" width="726" height="406" viewBox="0 0 726 406" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M106.632 475.609C46.3026 412.336 8.96465 333.732 1.57527 254.167C-10.6896 86.2005 66.6131 -49.7434 208.283 -110.322C347.381 -169.827 511.454 -135.723 616.571 -25.4768C654.009 13.7878 683.587 61.4665 704.543 116.446L705.068 117.939C716.587 152.177 748.969 292.684 697.569 353.65C678.758 375.879 651.264 385.231 620.072 380.174L617.905 379.787C601.122 376.014 586.028 367.412 574.161 354.967C554.638 334.491 546.306 305.952 551.763 278.674C566.519 214.478 545.681 143.75 497.371 93.0833C473.867 68.4325 445.015 49.8011 413.966 39.3954L412.114 38.7093C357.011 16.7474 296.319 26.4814 245.657 65.4353C190.689 107.729 161.557 174.136 169.673 238.906C173.866 282.275 195.191 326.327 228.111 360.854C271.521 406.381 327.405 427.905 377.546 418.42C405.847 412.744 435.433 422.245 456.027 443.844C466.975 455.326 474.554 469.561 478.009 484.97C483.675 509.613 478.407 534.103 463.043 553.505C446.339 574.643 419.424 587.43 390.488 588.04C291.608 600.308 185.644 558.319 106.787 475.614L106.632 475.609Z" fill="url(#paint0_linear_16_2457)" fill-opacity="0.6" />
              <defs>
                <linearGradient id="paint0_linear_16_2457" x1="605.608" y1="-36.9748" x2="90.2411" y2="458.384" gradientUnits="userSpaceOnUse">
                  <stop offset="0.483986" stop-color="#7E5AFB" />
                  <stop offset="1" stop-color="#C7B7FF" />
                </linearGradient>
              </defs>
            </svg>



            <svg className="absolute top-0 right-0 z-[999]" width="370" height="406" viewBox="0 0 370 406" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M62.0611 55.3248C99.5069 13.3718 147.971 -14.6335 198.601 -23.4874C305.657 -40.0404 396.815 2.48865 442.984 90.1853C488.331 176.288 474.954 283.246 409.708 356.345C386.471 382.379 357.433 403.809 323.267 420.089L322.337 420.503C300.981 429.659 212.572 457.69 170.825 427.889C155.6 416.978 148.182 399.835 149.81 379.575L149.946 378.166C151.497 367.21 156.231 357.088 163.597 348.836C175.714 335.259 193.581 328.441 211.352 330.528C253.275 336.668 297.543 319.648 327.528 286.054C342.117 269.71 352.569 250.247 357.635 229.802L357.979 228.579C369.209 192.114 359.828 153.706 332.232 123.24C302.272 90.1852 258.189 74.9433 217.082 83.4974C189.493 88.4295 162.353 104.38 141.92 127.274C114.976 157.461 104.067 194.403 112.742 226.06C117.846 243.911 113.285 263.372 100.502 277.693C93.7067 285.306 84.9724 290.902 75.2721 293.914C59.7655 298.821 43.7911 296.711 30.5573 287.865C16.1401 278.249 6.54982 261.654 4.66177 243.133C-8.31942 180.371 13.1198 110.261 62.0655 55.4244L62.0611 55.3248Z" fill="url(#paint0_linear_20_827)" fill-opacity="0.6" />
              <defs>
                <linearGradient id="paint0_linear_20_827" x1="416.513" y1="348.721" x2="72.2565" y2="43.9248" gradientUnits="userSpaceOnUse">
                  <stop offset="0.483986" stop-color="#7E5AFB" />
                  <stop offset="1" stop-color="#C7B7FF" />
                </linearGradient>
              </defs>
            </svg>

          </div>

          {/* Columna izquierda: texto */}
          <div className="flex-1 z-10  flex flex-col justify-center items-start gap-2">
            <span className="uppercase text-white  tracking-widest text-2xl font-medium mb-2">no pierdas dinero</span>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-medium leading-tight text-white mb-2">
              ¡Compra y vende dólares ahora! Y únete a nuestra
              <span className="text-secondary font-semibold"> comunidad financiera</span>
            </h2>
            {/* <div className="flex gap-2 mt-6 md:mt-10">
                        <span className="inline-block w-4 h-4 rounded-full bg-white border-2 border-white"></span>
                        <span className="inline-block w-4 h-4 rounded-full border-2 border-white"></span>
                    </div> */}
          </div>

          {/* Columna central: imagen */}
          <div className="z-10 flex-1 flex justify-center items-end ">
            <img src="/assets/cambiafx/eligenos-person.webp" alt="Empresas" className="h-[500px] object-cover scale-x-[-1] absolute bottom-0 select-none" draggable="false" />
          </div>

          {/* Columna derecha: mensaje y WhatsApp */}
          <div className="z-10 min-w-max flex flex-col gap-10 items-end pr-8 justify-end  md:ml-8 mt-8 md:mt-0">
            <div className="text-white relative text-2xl  text-end mb-2">
              Registrate <span className="font-semibold italic"><br />AQUÍ</span>
              <div className="absolute -right-10">
                <svg width="53" height="77" viewBox="0 0 53 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_98_4024)">
                    <path d="M25.5583 3.21705C45.6398 28.3746 40.6134 62.1151 24.5644 73.5194" stroke="#FAF3E1" stroke-width="1.50408" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M25.8343 66.3476L24.5626 73.5192L31.7461 72.4369" stroke="#FAF3E1" stroke-width="1.50408" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_98_4024">
                      <rect width="69.751" height="30.5232" fill="white" transform="translate(29.373 0.5) rotate(70.1997)" />
                    </clipPath>
                  </defs>
                </svg>


              </div>

            </div>
            <div className="relative ">
              <a href="https://wa.me/51999999999" target="_blank" rel="noopener noreferrer" className="block">
                <span className=" animate-pulse z-10">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="49.567" cy="49.567" r="49.567" transform="matrix(1 0 0 -1 0.587891 99.5674)" fill="#D9D9D9" fill-opacity="0.4" />
                    <path d="M87.3558 50.1493C87.3558 29.521 70.6333 12.7985 50.005 12.7985C29.3768 12.7985 12.6543 29.521 12.6543 50.1493C12.6543 70.7775 29.3768 87.5 50.005 87.5C70.6333 87.5 87.3558 70.7775 87.3558 50.1493Z" fill="#BCFF52" />
                    <path d="M57.4189 37.2596C58.2998 36.3787 58.7402 35.9382 59.2282 35.7276C59.9312 35.4241 60.7282 35.4241 61.4312 35.7276C61.919 35.9382 62.3596 36.3787 63.2404 37.2596C64.1213 38.1405 64.5619 38.5809 64.7725 39.0689C65.0759 39.7719 65.0759 40.5689 64.7725 41.2718C64.5619 41.7598 64.1213 42.2002 63.2404 43.0811L55.7081 50.6136C53.8523 52.4694 52.9244 53.3973 51.7622 53.947C50.6 54.4968 49.2941 54.6256 46.6823 54.8833L45.5 55L45.6167 53.8177C45.8744 51.2059 46.0032 49.9 46.553 48.7378C47.1028 47.5756 48.0307 46.6477 49.8865 44.792L57.4189 37.2596Z" stroke="#222222" stroke-width="2.25" stroke-linejoin="round" />
                    <path d="M41 55H37.625C36.1753 55 35 56.1753 35 57.625C35 59.0747 36.1753 60.25 37.625 60.25H51.875C53.3247 60.25 54.5 61.4253 54.5 62.875C54.5 64.3247 53.3247 65.5 51.875 65.5H48.5" stroke="#222222" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>


                </span>
              </a>


            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default HeroServiceSection;