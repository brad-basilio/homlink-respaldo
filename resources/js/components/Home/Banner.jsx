import Aos from "aos"
import React, { useEffect } from "react"

const Banner = () => {
  useEffect(() => {
    Aos.init()
  }, [null])
  return <section className='bg-gradient-to-r from-[#c4b8d3] to-[#dbc8c9] md:px-[10%] md:py-[2.5%]' >
    <div className='bg-[#907755] w-full px-[5%] py-[25%] md:px-[7.5%] md:py-[10%] [background-position:left] md:[background-position:center] md:rounded-3xl' style={{
      backgroundImage: 'url(/assets/img/background-animated.gif)',
      // backgroundPosition: 'left',
      backgroundSize: 'cover'
    }}>
      <h1 className='text-2xl text-white w-2/3' data-aos='fade-down'>
        De las miles de <br />
        combinaciones <br />
        que existen, la <br />
        tuya es <span className='font-bold'>única</span>.
      </h1>
      <p className='text-white py-4 w-2/3'>Rutina capilar hecha solo para ti</p>
      <button href='/test' className='bg-[#DAAD9A] text-white text-sm px-4 py-3 rounded border border-white' data-aos='fade-up'>HAZ EL TEST Y CREA TU FORMULA</button>
    </div>
  </section>
}

export default Banner