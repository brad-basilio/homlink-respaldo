import React from "react"

const HowItWorks = () => {
  return <section className="bg-[#FBF5F1] p-[5%] text-center">
    <h1 className="text-2xl text-center text-[#404040]">
      Hechos a tu medida.<br />
      <span className="font-bold">¿Cómo funciona?</span>
    </h1>
    <button className='bg-[#C5B8D4] text-white text-sm px-4 py-3 rounded my-4'>HAZ EL TEST Y CREA TU FORMULA</button>
    <div className="flex gap-[5%] mt-[5%]">
      <article className="w-1/3 relative">
        <span className="absolute -top-1 -left-1 bg-[#FBF5F1] rounded-full w-6 h-6 p-1 text-xs font-bold border border-[#404040]">1</span>
        <img className="rounded-lg mb-2 w-full aspect-square object-cover object-center" src="/assets/img/steps/step-1.png" alt="" />
        <p className="text-xs">Tomas un rápido test sobre tu cabello.</p>
      </article>
      <article className="w-1/3 relative">
        <span className="absolute -top-1 -left-1 bg-[#FBF5F1] rounded-full w-6 h-6 p-1 text-xs font-bold border border-[#404040]">2</span>
        <img className="rounded-lg mb-2 w-full aspect-square object-cover object-center" src="/assets/img/steps/step-2.png" alt="" />
        <p className="text-xs">Tu fórmula sale del laboratorio a tu casa.</p>
      </article>
      <article className="w-1/3 relative">
        <span className="absolute -top-1 -left-1 bg-[#FBF5F1] rounded-full w-6 h-6 p-1 text-xs font-bold border border-[#404040]">3</span>
        <img className="rounded-lg mb-2 w-full aspect-square object-cover object-center" src="/assets/img/steps/step-3.png" alt="" />
        <p className="text-xs">Si tu cabello cambia, tu vuá tambien lo hace.</p>
      </article>
    </div>
  </section>
}

export default HowItWorks