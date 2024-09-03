import React from 'react';
import Banner from './Banner.svg';
const Header = ({banners}) => {

  return <>
    <header className="relative bg-sky-800 h-screen">
      <img className='absolute size-full object-cover object-center z-10 opacity-50' src={Banner} alt="" />
      <div className='z-20 relative flex flex-col items-center px-20 pt-40 pb-40 w-full max-md:px-5 max-md:py-24 max-md:max-w-full'>
        <div className="flex flex-col mb-0 w-full max-w-[1062px] max-md:mb-2.5 max-md:max-w-full">
          <div className="flex flex-col w-full text-center max-md:max-w-full">
            <p className="hidden md:block self-center text-base leading-6 text-white w-[810px] max-md:max-w-full">
              En Net Coaching, creamos un espacio donde la tecnología, la estrategia e innovación se encuentran. Nuestra plataforma digital te brinda acceso a los mejores coaches y mentores, mientras que el enfoque humano impulsa tu desarrollo y bienestar.
            </p>
            <h1 className="mt-6 text-2xl md:text-5xl font-bold text-white max-md:max-w-full">
              Net Coaching: Fusionando lo Mejor del Mundo Digital y el Desarrollo Humano para Potenciar tus Resultados al Máximo
            </h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center self-center mt-10 text-base font-bold leading-tight max-md:max-w-full">
          <a href='/coaches' className='flex gap-2 justify-center items-center px-6 py-4 bg-red-500 rounded-lg text-zinc-100 max-md:px-5'>
            <span className="self-stretch my-auto">Busca tu coach</span>
            <i className='fa fa-search'></i>
          </a>
          <button className='flex gap-2 justify-center items-center px-6 py-4 bg-cyan-700 rounded-lg text-zinc-100 max-md:px-5'>
            <span className="self-stretch my-auto">Video demostrativo</span>
            <i className='far fa-play-circle'></i>
          </button>
        </div>
      </div>
    </header>
    <section className="-mt-28 flex relative z-10 flex-col items-center self-center px-20 py-10 w-11/12 max-w-[720px] max-md:px-5 ">
      <img loading="lazy" src="/assets/img/home/laptop-cover.png" alt="" className="object-contain inset-0 size-full" />
    </section>
  </>
}

export default Header