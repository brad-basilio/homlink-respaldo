import React from 'react'

const Benefits = () => {
  const features = [
    { title: 'Tecnología', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5438e478c573600c714f0c5eefe3cd6002d4a1ab1bc00521fac140570de2eef8?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731', className: 'text-white bg-sky-900 shadow-[0px_4px_8px_rgba(0,0,0,0.08)]' },
    { title: 'Metodología orientada a los resultados', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/70f173a4e1156a4251774dd839cf79cb4726410119f43534fe3bece9bdd21ca8?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731', className: 'text-teal-950' },
    { title: 'Experiencia y trayectoria de coaches', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/beeaa5d69f67001ea7ffc764a3f7cb549c0d23ae11f66f0e66d957dc7b1bdb8a?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731', className: 'text-teal-950' },
    { title: 'Estrategia e innovación', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b6a2c63a484de6648edad904246b04016b8fca4e7a81d22e4249b43e6b16b1c2?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731', className: 'text-teal-950' }
  ];

  return (<>
    <section className="flex gap-10 items-start self-stretch p-[5%] font-bold">
      <div className="flex flex-col grow shrink justify-center w-1/2">
        <h1 className="w-full text-4xl leading-10 text-teal-950">
          Descubre cómo Net Coaching puede ser tu aliado en el camino hacia el éxito
        </h1>
        <button className='flex gap-2 justify-center items-center px-6 py-4 text-base font-bold leading-tight bg-red-500 rounded-lg text-zinc-100 self-start mt-10'>
          <span className="self-stretch my-auto">Iniciar</span>
          <i className='ms-1 fas fa-sign-in-alt'></i>
        </button>
      </div>
      <div className="flex grow overflow-x-auto shrink gap-6 items-start text-2xl leading-tight  text-cyan-950 w-1/2">
        {
          features.map((feature, i) => {
            return <div className={`flex flex-col whitespace-nowrap rounded-none min-w-[240px] w-[302px]`}>
              <div className="flex flex-col rounded bg-zinc-100">
                <div className="flex relative flex-col pt-72 w-full rounded aspect-[0.834] max-md:pt-24">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b9f1399e034995316cea56dd12d4f560250bf49e24deffd8084d2d745dea858?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731" className="object-cover absolute inset-0 size-full" alt='Tecnologia' />
                  <div className="flex relative flex-col justify-center px-4 py-5 bg-zinc-300">
                    <div>{feature.title}</div>
                  </div>
                </div>
              </div>
            </div>
          })
        }
      </div>
    </section>

    <section className="flex flex-wrap md:flex-nowrap gap-6 items-start mt-32 max-md:mt-10 w-full p-[5%]">
      <div className="flex rounded w-full md:w-1/2">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/20da893746fbe7622378ac476f088724b5008a992870abcd558e5665b5760f75?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
          className="object-contain w-full rounded h-auto"
          alt="Net Coaching benefits illustration"
        />
      </div>
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex flex-col w-full">
          <h2 className="text-4xl font-bold leading-10 text-teal-950">
            Desbloquea Tu Potencial: Los Beneficios de Net Coaching
          </h2>
          <p className="mt-6 text-base leading-snug text-cyan-950">
            Descubre cómo Net Coaching puede ser tu aliado en el camino hacia el éxito.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {
            features.map((feature, index) => (
              <div key={index} className={`flex flex-col p-4 leading-tight rounded-lg hover:text-white hover:bg-sky-900 hover:shadow-[0px_4px_8px_rgba(0,0,0,0.08)]`}>
                <img loading="lazy" src={feature.iconSrc} className="object-contain w-12 h-12" alt="" />
                <div className="mt-4 w-full text-xl font-bold">{feature.title}</div>
              </div>
            ))
          }
        </div>
        <button className='flex gap-2 justify-center items-center px-6 py-4 text-base font-bold leading-tight bg-red-500 rounded-lg text-zinc-100 self-start mt-14 max-sm:self-center'>
          <i className='fa fa-search'></i>
          <span>Busca tu coach</span>
        </button>
      </div>
    </section>


    <section className="p-[5%]">
      <div className='flex relative flex-col justify-center items-center px-20 py-16 mt-28 min-h-[421px] max-md:px-5 max-md:mt-10'>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/77949e2ea46912c14e03091f78ef8591a8c17802fdab4a09f105347cc3b5b08b?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731" className="object-cover absolute inset-0 size-full rounded-lg select-none" alt="" />
        <div className="flex relative flex-col items-center max-w-full w-[628px]">
          <div className="flex flex-col w-full text-center text-white">
            <h2 className="text-4xl font-bold leading-10 max-md:max-w-full">
              ¡Únete a Nuestro Viaje de Desarrollo! Suscríbete al Blog Net Coaching
            </h2>
            <p className="mt-6 text-base leading-6 max-md:max-w-full">
              Al suscribirte a nuestro blog, te convertirás en parte de una comunidad apasionada por el desarrollo humano y el bienestar. Recibirás regularmente consejos, historias inspiradoras y recursos exclusivos para impulsar tu crecimiento.
            </p>
          </div>
          <form className="flex flex-wrap gap-2.5 justify-center items-center px-2.5 py-2 mt-10 max-w-full text-base rounded-xl border border-white border-solid w-[557px]">
            <input
              type="email"
              id="email"
              className="outline-none flex-1 shrink gap-2.5 self-stretch px-3 py-4 my-auto leading-snug text-center text-white basis-6 min-w-[240px] bg-transparent"
              placeholder="Déjanos tu correo"
            />
            <button className='flex gap-2 justify-center items-center px-6 py-4 text-base leading-tight bg-red-500 rounded-lg text-zinc-100'>
              <span>Suscríbete</span>
              <i className='far fa-handshake'></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  </>);
}

export default Benefits