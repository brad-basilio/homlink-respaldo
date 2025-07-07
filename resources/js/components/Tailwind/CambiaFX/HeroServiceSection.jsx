import React from 'react';
import { Layers, Users, CreditCard, TrendingUp, MessageCircle, Gift } from 'lucide-react';
import TextWithHighlight from '../../../Utils/TextWithHighlight';

function HeroServiceSection({service}) {
 

  return (
    <div className="min-h-screen bg-primary relative overflow-hidden font-title">
      {/* Purple decorative circles */}
      <div className="absolute top-0 right-0 ">

        <svg width="684" height="586" viewBox="0 0 684 586" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.8119 -29.7908C25.702 -13.8578 46.1592 8.31367 75.6004 29.1596C127.368 65.8159 176.512 76.8416 210.555 84.12C251.273 92.8267 283.372 99.6891 323.244 89.4095C326.368 88.6046 390.305 82.7069 401.55 36.4047C412.797 -9.90486 360.542 -33.4285 312.089 -10.5834C263.636 12.2617 250.769 45.2127 247.567 77.1767C243.023 122.515 269.767 160.019 292.93 187.315C394.007 306.405 505.649 323.842 637.012 415.673C682.143 447.219 743.576 497.317 806.096 575.44" stroke="#7E5AFB" stroke-width="32" stroke-miterlimit="10" />
        </svg>

      </div>


      {/* Main content */}
      <div className="relative z-10 px-[5%] py-12 ">
        <div className=" mx-auto">
          {/* Header section */}
          <div className="mb-12 md:mb-16">
            <div className="mb-4">
              <span className="text-constrast  text-sm font-medium tracking-[8%] uppercase">
               {service?.name}
              </span>
            </div>
            <h2 className="text-4xl max-w-lg md:text-6xl font-medium text-neutral-dark mb-4">
              <TextWithHighlight text={service?.title} color="bg-neutral-dark font-semibold" />
           
            </h2>
            <p className="text-neutral-light text-base max-w-2xl">
            {service?.description}
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service?.benefits.map((service, index) => (
              <div
                key={index}
                className="bg-secondary rounded-3xl p-8 hover:bg-secondary/90 transition-colors duration-300 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-constrast rounded-full flex items-center justify-center text-white mb-6 group-hover:bg-constrast/90 transition-colors duration-300">
                    <img
                                                    src={`/api/service/media/${service?.image}`}
                                                    alt={service?.name}
                                                    className="w-6 h-6 object-cover rounded-xl"
                                                />
                 
                
                </div>

                {/* Title */}
                <h3 className="text-neutral-dark font-medium text-xl mb-4 leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-light text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>


          <div className="relative mt-40 mb-10  w-full px-16 rounded-[56px] bg-constrast  flex flex-col md:flex-row items-center  py-10 min-h-[380px]">
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
              <span className="uppercase text-white  tracking-widest text-2xl font-medium mb-2">en cambiafx EMPRESAS</span>
              <h2 className="text-3xl md:text-4xl lg:text-[64px] font-medium text-white mb-2" style={{ lineHeight: '1' }}>
                ¡Tenemos el mejor tipo de
                <span className="text-secondary font-semibold"> cambio para
                  empresas!</span>
              </h2>
              {/* <div className="flex gap-2 mt-6 md:mt-10">
                        <span className="inline-block w-4 h-4 rounded-full bg-white border-2 border-white"></span>
                        <span className="inline-block w-4 h-4 rounded-full border-2 border-white"></span>
                    </div> */}
            </div>

            {/* Columna central: imagen */}
            <div className="z-10 flex-1 flex justify-center items-end ">
              <img src="/assets/cambiafx/cambia-person.webp" alt="Empresas" className=" h-[500px] object-cover  absolute left-1/2 transform -translate-x-1/3 bottom-0 select-none" draggable="false" />
            </div>

            {/* Columna derecha: mensaje y WhatsApp */}
            <div className="z-10 min-w-max flex flex-col gap-10 items-end pr-8 justify-end  md:ml-8 mt-8 md:mt-0">
              <div className="text-white relative text-2xl  text-end mb-2">
                Déjanos un <span className="font-semibold italic"><br />mensaje</span>
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
                 <svg width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="49.567" cy="49.567" r="49.567" transform="matrix(1 0 0 -1 0.933594 100.067)" fill="#D9D9D9" fill-opacity="0.4"/>
<path d="M87.7015 50.6493C87.7015 30.021 70.979 13.2985 50.3507 13.2985C29.7225 13.2985 13 30.021 13 50.6493C13 71.2775 29.7225 88 50.3507 88C70.979 88 87.7015 71.2775 87.7015 50.6493Z" fill="#BCFF52"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M63.8167 37.8734C60.6384 34.6951 56.4006 33 51.951 33C42.6279 33 35 40.6279 35 49.951C35 52.9174 35.8476 55.8838 37.3308 58.4265L35 66.902L43.8993 64.5712C46.4419 65.8425 49.1964 66.6901 51.951 66.6901C61.274 66.6901 68.902 59.0621 68.902 49.7391C68.902 45.2895 66.995 41.0517 63.8167 37.8734ZM51.951 63.9355C49.4083 63.9355 46.8657 63.2999 44.7468 62.0286L44.323 61.8167L39.0258 63.2999L40.5091 58.2146L40.0853 57.5789C38.6021 55.2482 37.9664 52.7055 37.9664 50.1629C37.9664 42.5349 44.323 36.1783 51.951 36.1783C55.765 36.1783 59.1552 37.6615 61.9097 40.2042C64.6642 42.9587 65.9356 46.3489 65.9356 50.1629C65.9356 57.5789 59.7908 63.9355 51.951 63.9355ZM59.5789 53.3412C59.1552 53.1293 57.0363 52.0699 56.6125 52.0699C56.1888 51.858 55.9768 51.858 55.7649 52.2817C55.553 52.7055 54.7055 53.5531 54.4937 53.9768C54.2818 54.1887 54.0698 54.1887 53.6461 54.1887C53.2223 53.9768 51.951 53.5531 50.2559 52.0699C48.9846 51.0104 48.137 49.5272 47.9251 49.1034C47.7132 48.6797 47.9251 48.4678 48.137 48.2559C48.3489 48.044 48.5608 47.8321 48.7727 47.6202C48.9846 47.4083 48.9846 47.1964 49.1965 46.9846C49.4084 46.7727 49.1965 46.5608 49.1965 46.3489C49.1965 46.137 48.3489 44.0181 47.9251 43.1706C47.7132 42.5349 47.2895 42.5349 47.0776 42.5349C46.8657 42.5349 46.6538 42.5349 46.23 42.5349C46.0181 42.5349 45.5943 42.5349 45.1706 42.9587C44.7468 43.3825 43.6874 44.4419 43.6874 46.5608C43.6874 48.6797 45.1706 50.5866 45.3825 51.0104C45.5944 51.2223 48.3489 55.6719 52.5866 57.367C56.1887 58.8502 56.8244 58.4265 57.672 58.4265C58.5195 58.4265 60.2146 57.367 60.4265 56.5195C60.8502 55.4601 60.8503 54.6125 60.6384 54.6125C60.4265 53.5531 60.0027 53.5531 59.5789 53.3412Z" fill="#222222"/>
</svg>

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