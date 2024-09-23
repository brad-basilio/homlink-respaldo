import React from "react"

import bgHeader from './images/header.png'

const BlogHeader = () => {
  return <section className="grid md:grid-cols-2 items-center justify-between mt-16 bg-[#F5F7FA]">
    <img src={bgHeader} alt="" className="w-full h-auto aspect-video md:aspect-[16/12] lg:aspect-video object-cover object-center" />
    <div className="p-[5%] w-full">
      <div className="w-full text-2xl lg:text-4xl font-medium text-pink-600">
        <span className="text-slate-700">Mantente siempre</span>{" "}
        <span className="font-bold text-pink-600">Informado</span>{" "}
        <span className="text-slate-700">con nuestra newsletter</span>
      </div>
      <div className="mt-10 w-full max-md:max-w-full">
        <div className="w-full max-md:max-w-full">
          <div className="w-full relative h-max">
            <input className="w-full py-2 px-4 text-slate-900 border-b-2 outline-none bg-transparent" placeholder="Correo electrónico" />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-pink-500">
              <span>Enviar</span>
              <i className="mdi mdi-arrow-top-right ms-1"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 text-base leading-6 text-slate-900 max-md:max-w-full">
        Fusce a magna nec diam blandit hendrerit. In lobortis, est eget ultrices
        pharetra, est tortor pellentesque odio, ut auctor tortor ipsum ac orci.
      </div>
    </div>
  </section>
}

export default BlogHeader