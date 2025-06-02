import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import TextWithHighlight from '../../../Utils/TextWithHighlight';

// Placeholder SVGs for icons (replace with your actual icons if available)
// Using generic icons that somewhat resemble the ones in the image.
const IconIncorporacion = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3.75 19.125h16.5M16.5 19.125V6.375A2.625 2.625 0 0 0 13.875 3.75H7.125A2.625 2.625 0 0 0 4.5 6.375v12.75" />
  </svg>
);

const IconCompromiso = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

const IconCrecimiento = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
  </svg>
);

const IconSatisfaccion = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75Zm+4.5 0c0 .414-.168.75-.375.75s-.375-.414-.375-.75.168-.75.375-.75.375.336.375.75Z" />
  </svg>
);


const StatCard = ({ icon, title, percentage, description }) => (
  <div className="flex flex-col items-start md:text-left font-paragraph">
    <div className='flex gap-2 items-center border-b border-white/20 pb-4'>
      <div className="bg-accent rounded-full p-3 mr-4">
                                        <img
                                            src={`/api/indicator/media/${icon}`}
                                            alt={title}
                                            className="w-6 h-6 object-cover rounded-xl"
                                        />

                                    </div>
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
    </div>
    <p className="text-5xl font-bold text-white mb-3 mt-4">{percentage} <span className='text-accent'>%</span></p>
    <p className="text-white font-light text-base leading-relaxed">{description}</p>
  </div>
);

const HomeSeccionImpacto = ({data,indicators}) => {
  const stats = [
    {
      icon: <IconIncorporacion />,
      title: "Incorporación sin problemas",
      percentage: 75,
      description: "Los nuevos empleados se sienten valorados y seguros al comenzar su trayectoria."
    },
    {
      icon: <IconCompromiso />,
      title: "Compromiso de los empleados",
      percentage: 90,
      description: "Aumente la motivación y la productividad fomentando una cultura de reconocimiento."
    },
    {
      icon: <IconCrecimiento />,
      title: "Crecimiento y desarrollo",
      percentage: 80,
      description: "Ayude a los empleados a alcanzar su máximo potencial mediante capacitación."
    },
    {
      icon: <IconSatisfaccion />,
      title: "Satisfacción en el lugar de trabajo",
      percentage: 85,
      description: "Crear un ambiente de trabajo positivo que priorice el bienestar de los empleados."
    }
  ];

  return (
    <div className="bg-primary font-paragraph text-white py-16 px-4 sm:px-6 lg:py-24 lg:px-8 relative">
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <img
            src={`/api/landing_home/media/${data?.image}`}
          alt="Equipo de Cambio Gerencia"
          className="w-full h-full object-cover rounded-xl opacity-30"
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 lg:mb-16">
          <div className="mb-8 md:mb-0">
            <div className="flex w-full justify-start  mb-4">
              <div className=" mr-2">
                <span>
                  <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.50225 0C5.95566 0 4.69727 1.2584 4.69727 2.80499C4.69727 4.35158 5.95566 5.60998 7.50225 5.60998C9.04885 5.60998 10.3072 4.35158 10.3072 2.80499C10.3072 1.2584 9.04885 0 7.50225 0Z" fill="#D62828" />
                    <path d="M7.50112 24.0025C3.65842 24.0025 0.759766 22.4639 0.759766 20.4219C0.759766 19.9629 1.13269 19.59 1.59168 19.59C2.05066 19.59 2.42359 19.9629 2.42359 20.4219C2.42359 21.203 4.40166 22.3387 7.49981 22.3387C10.5993 22.3387 12.576 21.2043 12.576 20.4219C12.576 19.8743 12.4874 19.3657 12.3048 18.8689C12.147 18.4373 12.3674 17.9601 12.799 17.801C13.2306 17.6432 13.7092 17.8636 13.8669 18.2952C14.1147 18.9693 14.2399 19.6839 14.2399 20.4206C14.2425 22.4639 11.3451 24.0025 7.50112 24.0025Z" fill="#D62828" />
                    <path d="M11.4896 21.804C12.3046 21.4414 12.7754 20.9968 12.8132 20.6225C5.70098 16.9581 5.32021 11.2634 5.32021 10.1015C5.32021 9.64249 4.94725 9.26953 4.48823 9.26953C4.02921 9.26953 3.65625 9.64249 3.65625 10.1015C3.65625 11.4082 4.06181 17.6884 11.4896 21.804Z" fill="#D62828" />
                    <path d="M7.49991 6.25781C5.37954 6.25781 3.6543 7.98306 3.6543 10.1034C3.6543 10.5624 4.02725 10.9354 4.48627 10.9354C4.9453 10.9354 5.31825 10.5624 5.31825 10.1034C5.31825 8.9011 6.29628 7.92177 7.49991 7.92177C8.70353 7.92177 9.68156 8.8998 9.68156 10.1034C9.68156 10.9432 8.14671 11.9108 6.66272 12.8458C6.33019 13.0558 5.98722 13.2709 5.64296 13.4965C5.81248 13.9855 6.03026 14.5059 6.31454 15.047C6.72531 14.7732 7.1426 14.5111 7.55077 14.2542C9.58768 12.971 11.3468 11.8626 11.3468 10.1034C11.3455 7.98306 9.62158 6.25781 7.49991 6.25781Z" fill="#D62828" />
                    <path d="M4.23503 14.4766C2.36765 15.8954 0.759766 17.7158 0.759766 20.4191C0.759766 20.8781 1.13272 21.251 1.59174 21.251C2.05076 21.251 2.42372 20.8781 2.42372 20.4191C2.42372 18.5465 3.53085 17.1707 4.95486 16.0271C4.66406 15.4937 4.42673 14.9734 4.23503 14.4766Z" fill="#D62828" />
                  </svg>

                </span>
              </div>
              <h3 className="uppercase text-white text-sm lg:text-lg font-bold">Impacto</h3>
            </div>
            <h2 className="text-4xl lg:text-[52px] max-w-lg font-medium mb-6 leading-tight italic">
                <TextWithHighlight text={data?.title} color="bg-accent" />
          
            </h2>
            <p className="mt-4 text-lg text-white max-w-xl">
              {data?.description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <button className="bg-accent flex items-center gap-2 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out text-sm sm:text-base">
              Solicita una consulta gratuita <ArrowRight />
            </button>
          </div>
        </div>

        {/* Stats Swiper en mobile, grid en desktop */}
        <div className="block lg:hidden">
          <Swiper
            spaceBetween={10}
            slidesPerView={1.2}
            centeredSlides={false}
            className="w-full"
          >
            {indicators?.map((stat, index) => (
              <SwiperSlide key={index}>
                <div className="  w-full flex items-center justify-center">
                  <StatCard
                    icon={stat?.symbol}
                    title={stat?.name}
                    percentage={stat?.percentage}
                    description={stat?.description}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {indicators?.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat?.symbol}
              title={stat?.name}
              percentage={stat?.percentage}
              description={stat?.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSeccionImpacto;