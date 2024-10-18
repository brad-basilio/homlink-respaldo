import React from "react";

const Email = () => {
  return <section className="p-[5%] py-[15%] md:py-[10%] lg:py-[5%] bg-white text-center text-[#404040]">
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl mb-4">¡Por último, para enviárte tu fórmula <br /> personalizada déjanos <b>tu correo!</b></h1>
      <p className="mb-4">y recibe 10% off con un código exclusivo para ti 🤫</p>
      <div className="relative">
        <input className="border text-center border-[#9577B9] text-[#9577B9] bg-white text-sm rounded w-full px-5 py-2.5 outline-none" type="text" placeholder="ESCRIBE AQUÍ"/>
        <button className="absolute top-1/2 -translate-y-1/2 right-3 w-6 h-6 bg-[#A191B8] text-white font-bold rounded-full">
        <i className="mdi mdi-arrow-right"></i>
        </button>
      </div>
    </div>
  </section>
}

export default Email