import React from "react"

const Banner = () => {
  return <section className='bg-gradient-to-r from-[#c4b8d3] to-[#dbc8c9]' >
    <div className='w-full  px-[5%] py-[25%]' style={{
      backgroundImage: 'url(/assets/img/background-animated.gif)',
      backgroundPosition: 'left',
      backgroundSize: 'cover'
    }}>
      <h1 className='text-2xl text-white w-2/3'>
        De las miles de <br />
        combinaciones <br />
        que existen, la <br />
        tuya es <span className='font-bold'>única</span>.
      </h1>
      <p className='text-white py-4 w-2/3'>Rutina capilar hecha solo para ti</p>
      <button className='bg-[#DAAD9A] text-white text-sm px-4 py-3 rounded border border-white'>HAZ EL TEST Y CREA TU FORMULA</button>
    </div>
  </section>
}

export default Banner