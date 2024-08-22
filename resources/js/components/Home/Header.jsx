import React from 'react';
const Header = () => {

  const actions = [
    {
      text: 'Busca tu coach',
      bgColor: 'bg-red-500',
      icon: 'fa fa-search',
      // iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ada8be6353f147d519aebbbe56987170c3f87d3dc1c55a8fe97095faffb55962?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731'
    },
    {
      text: 'Video demostrativo',
      bgColor: 'bg-cyan-700',
      icon: 'far fa-play-circle',
      // iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5b87ee93ad53f1789b261b5df1c7d8a62a409d7e1317cb369a3247e2de54d44b?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731'
    }
  ];

  return <>
    <header className="flex flex-col items-center px-20 pt-52 pb-80 w-full bg-sky-800 max-md:px-5 max-md:py-24 max-md:max-w-full">
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
        {actions.map((action, index) => (
          <button key={index} className={`flex gap-2 justify-center items-center px-6 py-4 ${action.bgColor} rounded-lg text-zinc-100 max-md:px-5`}>
            <span className="self-stretch my-auto">{action.text}</span>
            <i className={action.icon}></i>
            {/* <img loading="lazy" src={action.iconSrc} alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" /> */}
          </button>
        ))}
      </div>
    </header>
    <section className="-mt-[15%] flex relative z-10 flex-col items-center self-center px-20 pt-7 pb-52 w-11/12 max-w-[500px] max-md:px-5 max-md:pb-24">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ee22c4801b61b281e95440dab755e4731b476956cfcd249a6206aa56cfd5cd1?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731" alt="" className="object-cover absolute inset-0 size-full" />
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0bcfc25b75d2460ff53293f84e57faf98b6389c3f486babff6850a884020514?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731" alt="" className="object-contain mb-0 max-w-full aspect-[1.6] w-full max-md:mb-2.5" />
    </section>
  </>
}

export default Header