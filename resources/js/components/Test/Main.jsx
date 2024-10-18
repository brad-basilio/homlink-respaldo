import React from "react"

const Main = ({ test, setTest }) => {
  const onStartTestClicked = () => {
    setTest(old => ({ ...old, has_started: true }))
  }

  return <section className='p-[5%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-white text-center'
    style={{
      backgroundImage: 'url(/assets/img/test/bg-image.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      backgroundRepeat: 'no-repeat'
    }}>
    <div className='max-w-md mx-auto'>
      <h1 className='text-2xl md:text-3xl'>
        Test para <b>crear tu fórmula única.</b>
      </h1>
      <p className='my-[5%] text-sm'>
        Danos dos minutos de tu tiempo y formularemos una rutina de cuidado del cabello única solo para ti.
      </p>
      <button className='bg-[#C5B8D4] text-white text-sm px-8 py-3 rounded border border-white w-max mx-auto md:mx-[12.5%]' onClick={onStartTestClicked}>¡EMPIEZA AHORA!</button>
      <figure className='h-[50vh]'></figure>
    </div>
  </section>
}

export default Main 